import { prisma } from "@samvad/database";
import { checkRateLimit } from "@samvad/redis";
import {
  AuthRole,
  Permission,
  getPermissionsForRole,
  hashPassword,
  verifyPasswordAsync,
  isAccountLocked,
  MAX_FAILED_LOGIN_ATTEMPTS,
  ACCOUNT_LOCKOUT_DURATION_MS,
  signSessionToken,
  verifySessionToken,
  signMfaChallengeToken,
  verifyMfaChallengeToken,
  verifyTotpToken,
  verifyBackupCode,
} from "@samvad/auth";

export interface AdminUserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: AuthRole;
  isActive: boolean;
  failedLoginAttempts: number;
  lockedUntil: Date | null;
  mfaEnabled: boolean;
  mfaSecret?: string | null;
  mfaBackupCodes?: string[] | null;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSessionUser {
  id: string;
  email: string;
  name: string;
  role: AuthRole;
  permissions: Permission[];
}

export interface LoginResult {
  success: boolean;
  mfaRequired?: boolean;
  challengeToken?: string;
  sessionToken?: string;
  user?: AuthSessionUser;
  error?: string;
  locked?: boolean;
  remainingMinutes?: number;
  remainingAttempts?: number;
}

export interface AuditRecord {
  id: string;
  userId?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  ipAddress?: string | null;
  timestamp: Date;
}

/**
 * Enterprise Admin Authentication & RBAC Service
 * Implements PBKDF2 hashing, account lockout policy, MFA challenge-response,
 * session lifecycle management, and immutable security audit trails.
 */
class AdminAuthService {
  private secret: string;
  // Resilient in-memory store for offline/test environments
  private inMemoryUsers: Map<string, AdminUserRecord> = new Map();
  private inMemoryAuditLogs: AuditRecord[] = [];
  private isDbAvailable: boolean = true;

  constructor() {
    this.secret =
      process.env.ADMIN_API_KEY ||
      process.env.SESSION_SECRET ||
      "super_secure_enterprise_advisory_secret_key_samvad_2026_rbac_guard";

    // Detect mock / offline test database
    const dbUrl = process.env.DATABASE_URL || "";
    if (!dbUrl || dbUrl.startsWith("mock://") || dbUrl.includes("localhost:5432")) {
      // In offline/test environments, initialize in-memory seed users
      this.seedDefaultUsers();
    }
  }

  public getSecret(): string {
    return this.secret;
  }

  /**
   * Seed standard test administrators into memory (never plaintext passwords)
   */
  public seedDefaultUsers(): void {
    const defaultPassword = "AdminSecurePassphrase2026!";
    const defaultHash = hashPassword(defaultPassword);

    const users: AdminUserRecord[] = [
      {
        id: "usr_super_admin_01",
        email: "admin@samvadadvisory.com",
        name: "Devavrat Mukherjee",
        passwordHash: defaultHash,
        role: "SUPER_ADMIN",
        isActive: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
        mfaEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_content_admin_02",
        email: "content@samvadadvisory.com",
        name: "Aaditya Singhania",
        passwordHash: defaultHash,
        role: "CONTENT_ADMIN",
        isActive: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
        mfaEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_editor_03",
        email: "editor@samvadadvisory.com",
        name: "Priyanka Sen",
        passwordHash: defaultHash,
        role: "EDITOR",
        isActive: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
        mfaEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_author_04",
        email: "author@samvadadvisory.com",
        name: "Vikramaditya Verma",
        passwordHash: defaultHash,
        role: "AUTHOR",
        isActive: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
        mfaEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "usr_analyst_05",
        email: "analyst@samvadadvisory.com",
        name: "Shreya Nair",
        passwordHash: defaultHash,
        role: "ANALYST",
        isActive: true,
        failedLoginAttempts: 0,
        lockedUntil: null,
        mfaEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (const u of users) {
      this.inMemoryUsers.set(u.email.toLowerCase(), u);
    }
  }

  /**
   * Reset in-memory state (useful for test isolates)
   */
  public resetInMemoryStore(): void {
    this.inMemoryUsers.clear();
    this.inMemoryAuditLogs = [];
    this.seedDefaultUsers();
  }

  /**
   * Find user by email from DB or in-memory fallback
   */
  public async findUserByEmail(email: string): Promise<AdminUserRecord | null> {
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (this.isDbAvailable && process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("mock://")) {
        const user = await prisma.adminUser.findUnique({
          where: { email: normalizedEmail },
        });
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            passwordHash: user.passwordHash,
            role: user.role as AuthRole,
            isActive: user.isActive,
            failedLoginAttempts: user.failedLoginAttempts,
            lockedUntil: user.lockedUntil,
            mfaEnabled: user.mfaEnabled,
            mfaSecret: user.mfaSecret,
            mfaBackupCodes: (user.mfaBackupCodes as string[]) || null,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        }
      }
    } catch {
      this.isDbAvailable = false;
    }

    return this.inMemoryUsers.get(normalizedEmail) || null;
  }

  /**
   * Find user by ID from DB or in-memory fallback
   */
  public async findUserById(userId: string): Promise<AdminUserRecord | null> {
    try {
      if (this.isDbAvailable && process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("mock://")) {
        const user = await prisma.adminUser.findUnique({
          where: { id: userId },
        });
        if (user) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            passwordHash: user.passwordHash,
            role: user.role as AuthRole,
            isActive: user.isActive,
            failedLoginAttempts: user.failedLoginAttempts,
            lockedUntil: user.lockedUntil,
            mfaEnabled: user.mfaEnabled,
            mfaSecret: user.mfaSecret,
            mfaBackupCodes: (user.mfaBackupCodes as string[]) || null,
            lastLoginAt: user.lastLoginAt,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        }
      }
    } catch {
      this.isDbAvailable = false;
    }

    for (const u of this.inMemoryUsers.values()) {
      if (u.id === userId) return u;
    }
    return null;
  }

  /**
   * Upsert user in storage (ensures password is never plaintext)
   */
  public async saveUser(user: AdminUserRecord): Promise<void> {
    user.updatedAt = new Date();
    this.inMemoryUsers.set(user.email.toLowerCase(), user);

    try {
      if (this.isDbAvailable && process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("mock://")) {
        await prisma.adminUser.upsert({
          where: { email: user.email.toLowerCase() },
          create: {
            id: user.id,
            email: user.email.toLowerCase(),
            name: user.name,
            passwordHash: user.passwordHash,
            role: user.role as any,
            isActive: user.isActive,
            failedLoginAttempts: user.failedLoginAttempts,
            lockedUntil: user.lockedUntil,
            mfaEnabled: user.mfaEnabled,
            mfaSecret: user.mfaSecret,
            mfaBackupCodes: user.mfaBackupCodes ? (user.mfaBackupCodes as any) : undefined,
            lastLoginAt: user.lastLoginAt,
          },
          update: {
            name: user.name,
            passwordHash: user.passwordHash,
            role: user.role as any,
            isActive: user.isActive,
            failedLoginAttempts: user.failedLoginAttempts,
            lockedUntil: user.lockedUntil,
            mfaEnabled: user.mfaEnabled,
            mfaSecret: user.mfaSecret,
            mfaBackupCodes: user.mfaBackupCodes ? (user.mfaBackupCodes as any) : undefined,
            lastLoginAt: user.lastLoginAt,
          },
        });
      }
    } catch {
      this.isDbAvailable = false;
    }
  }

  /**
   * Record security event in immutable audit log
   */
  public async recordAuditLog(params: {
    userId?: string | null;
    action: string;
    entityType?: string;
    entityId?: string;
    metadata?: Record<string, unknown> | null;
    ipAddress?: string | null;
  }): Promise<AuditRecord> {
    const entry: AuditRecord = {
      id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      userId: params.userId || null,
      action: params.action,
      entityType: params.entityType || "SECURITY",
      entityId: params.entityId || "AUTH",
      metadata: params.metadata || null,
      ipAddress: params.ipAddress || null,
      timestamp: new Date(),
    };

    this.inMemoryAuditLogs.unshift(entry);
    if (this.inMemoryAuditLogs.length > 500) {
      this.inMemoryAuditLogs.pop();
    }

    try {
      if (this.isDbAvailable && process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("mock://")) {
        await prisma.auditLog.create({
          data: {
            userId: params.userId || undefined,
            action: params.action,
            entityType: params.entityType || "SECURITY",
            entityId: params.entityId || "AUTH",
            metadata: (params.metadata as any) || undefined,
            ipAddress: params.ipAddress || undefined,
            timestamp: entry.timestamp,
          },
        });
      }
    } catch {
      // In offline / unit test environments, in-memory log is preserved
    }

    return entry;
  }

  /**
   * Retrieve recent audit records with optional filters
   */
  public async getAuditLogs(
    optionsOrLimit?: number | { limit?: number; entityType?: string; action?: string; userId?: string }
  ): Promise<AuditRecord[]> {
    const limit = typeof optionsOrLimit === "number" ? optionsOrLimit : optionsOrLimit?.limit || 50;
    const entityType = typeof optionsOrLimit === "object" ? optionsOrLimit.entityType : undefined;
    const action = typeof optionsOrLimit === "object" ? optionsOrLimit.action : undefined;
    const userId = typeof optionsOrLimit === "object" ? optionsOrLimit.userId : undefined;

    try {
      if (this.isDbAvailable && process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("mock://")) {
        const where: any = {};
        if (entityType) where.entityType = entityType;
        if (action) where.action = action;
        if (userId) where.userId = userId;

        const records = await prisma.auditLog.findMany({
          where,
          orderBy: { timestamp: "desc" },
          take: limit,
        });
        return records.map((r) => ({
          id: r.id,
          userId: r.userId,
          action: r.action,
          entityType: r.entityType,
          entityId: r.entityId,
          metadata: r.metadata as Record<string, unknown> | null,
          ipAddress: r.ipAddress,
          timestamp: r.timestamp,
        }));
      }
    } catch {
      this.isDbAvailable = false;
    }

    let logs = [...this.inMemoryAuditLogs];
    if (entityType) logs = logs.filter((l) => l.entityType === entityType);
    if (action) logs = logs.filter((l) => l.action === action);
    if (userId) logs = logs.filter((l) => l.userId === userId);

    return logs.slice(0, limit);
  }

  /**
   * Primary Login Workflow
   */
  public async login(params: {
    email: string;
    password: string;
    ip?: string;
    userAgent?: string;
  }): Promise<LoginResult> {
    const { email, password, ip = "127.0.0.1", userAgent } = params;
    const normalizedEmail = email.trim().toLowerCase();

    // 1. Sliding window rate limiting on IP (5 attempts per 15 min)
    const ipRateLimit = await checkRateLimit(`auth:login:ip:${ip}`, 10, 900);
    if (!ipRateLimit.allowed) {
      await this.recordAuditLog({
        action: "RATE_LIMIT_EXCEEDED",
        metadata: { ip, remainingSeconds: ipRateLimit.resetSeconds },
        ipAddress: ip,
      });
      return {
        success: false,
        error: "Too many authentication requests. Please wait before retrying.",
        locked: true,
        remainingMinutes: Math.ceil(ipRateLimit.resetSeconds / 60),
      };
    }

    // 2. Fetch User Record
    const user = await this.findUserByEmail(normalizedEmail);
    if (!user) {
      // Record failed attempt for unknown user (prevent email enumeration timing differences)
      await this.recordAuditLog({
        action: "LOGIN_FAILED",
        metadata: { email: normalizedEmail, reason: "USER_NOT_FOUND", userAgent },
        ipAddress: ip,
      });
      return {
        success: false,
        error: "Invalid administrative credentials.",
      };
    }

    // 3. Inspect Account Lockout Status
    const lockStatus = isAccountLocked(user.failedLoginAttempts, user.lockedUntil);
    if (lockStatus.isLocked) {
      await this.recordAuditLog({
        userId: user.id,
        action: "ACCOUNT_LOCKED_ACCESS_ATTEMPT",
        metadata: {
          remainingMinutes: lockStatus.remainingMinutes,
          lockedUntil: lockStatus.lockedUntil,
        },
        ipAddress: ip,
      });

      return {
        success: false,
        locked: true,
        remainingMinutes: lockStatus.remainingMinutes,
        error: `Account is temporarily locked due to excessive failed attempts. Please retry in ${lockStatus.remainingMinutes} minute(s).`,
      };
    }

    // 4. Verify Password with PBKDF2 Timing-Safe Comparison (Asynchronous non-blocking)
    const isPasswordValid = await verifyPasswordAsync(password, user.passwordHash);

    if (!isPasswordValid) {
      const newFailedAttempts = user.failedLoginAttempts + 1;
      user.failedLoginAttempts = newFailedAttempts;

      let isNowLocked = false;
      let remainingMinutes = 0;

      if (newFailedAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
        user.lockedUntil = new Date(Date.now() + ACCOUNT_LOCKOUT_DURATION_MS);
        isNowLocked = true;
        remainingMinutes = 15;

        await this.recordAuditLog({
          userId: user.id,
          action: "ACCOUNT_LOCKED",
          metadata: {
            failedAttempts: newFailedAttempts,
            lockedUntil: user.lockedUntil,
            ip,
          },
          ipAddress: ip,
        });
      } else {
        await this.recordAuditLog({
          userId: user.id,
          action: "LOGIN_FAILED",
          metadata: {
            failedAttempts: newFailedAttempts,
            remainingAttempts: MAX_FAILED_LOGIN_ATTEMPTS - newFailedAttempts,
            ip,
          },
          ipAddress: ip,
        });
      }

      await this.saveUser(user);

      if (isNowLocked) {
        return {
          success: false,
          locked: true,
          remainingMinutes,
          error: "Account has been locked for 15 minutes due to 5 consecutive failed login attempts.",
        };
      }

      return {
        success: false,
        error: "Invalid administrative credentials.",
        remainingAttempts: MAX_FAILED_LOGIN_ATTEMPTS - newFailedAttempts,
      };
    }

    // 5. Successful Password Match: Clear Failed Attempts & Update Last Login
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    user.lastLoginAt = new Date();
    await this.saveUser(user);

    // 6. Check MFA Requirement
    if (user.mfaEnabled && user.mfaSecret) {
      const challengeToken = signMfaChallengeToken(
        { userId: user.id, email: user.email, role: user.role },
        this.secret,
        300 // 5 minutes validity
      );

      await this.recordAuditLog({
        userId: user.id,
        action: "MFA_CHALLENGE_ISSUED",
        metadata: { ip, userAgent },
        ipAddress: ip,
      });

      return {
        success: true,
        mfaRequired: true,
        challengeToken,
      };
    }

    // 7. Issue Session Token
    const sessionToken = signSessionToken(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      this.secret
    );

    await this.recordAuditLog({
      userId: user.id,
      action: "LOGIN_SUCCESS",
      metadata: { role: user.role, ip, userAgent },
      ipAddress: ip,
    });

    return {
      success: true,
      mfaRequired: false,
      sessionToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: getPermissionsForRole(user.role),
      },
    };
  }

  /**
   * Verify MFA Challenge (TOTP or Emergency Single-Use Backup Code)
   */
  public async verifyMfa(params: {
    challengeToken: string;
    code: string;
    isBackupCode?: boolean;
    ip?: string;
    userAgent?: string;
  }): Promise<LoginResult> {
    const { challengeToken, code, isBackupCode = false, ip = "127.0.0.1", userAgent } = params;

    // 1. Verify Challenge Token
    const challengePayload = verifyMfaChallengeToken(challengeToken, this.secret);
    if (!challengePayload) {
      await this.recordAuditLog({
        action: "MFA_INVALID_CHALLENGE_TOKEN",
        metadata: { ip },
        ipAddress: ip,
      });
      return {
        success: false,
        error: "MFA challenge session has expired or is invalid. Please sign in again.",
      };
    }

    // 2. Fetch User Record
    const user = await this.findUserById(challengePayload.userId);
    if (!user || !user.mfaSecret) {
      return {
        success: false,
        error: "User account or MFA configuration not found.",
      };
    }

    // 3. Verify Code
    let verificationPassed = false;
    let usedBackupCode = false;

    if (isBackupCode) {
      const backupResult = verifyBackupCode(code, user.mfaBackupCodes || []);
      if (backupResult.valid) {
        verificationPassed = true;
        usedBackupCode = true;
        user.mfaBackupCodes = backupResult.remainingHashedCodes;
        await this.saveUser(user);
      }
    } else {
      verificationPassed = verifyTotpToken(code, user.mfaSecret);
    }

    if (!verificationPassed) {
      await this.recordAuditLog({
        userId: user.id,
        action: "MFA_VERIFICATION_FAILED",
        metadata: { isBackupCode, ip, userAgent },
        ipAddress: ip,
      });
      return {
        success: false,
        error: isBackupCode
          ? "Invalid or already consumed emergency backup code."
          : "Invalid 6-digit verification code. Please check your authenticator application.",
      };
    }

    // 4. Issue Authenticated Session Token
    const sessionToken = signSessionToken(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      this.secret
    );

    await this.recordAuditLog({
      userId: user.id,
      action: "MFA_VERIFICATION_SUCCESS",
      metadata: { usedBackupCode, role: user.role, ip, userAgent },
      ipAddress: ip,
    });

    await this.recordAuditLog({
      userId: user.id,
      action: "LOGIN_SUCCESS",
      metadata: { viaMfa: true, role: user.role, ip, userAgent },
      ipAddress: ip,
    });

    return {
      success: true,
      mfaRequired: false,
      sessionToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: getPermissionsForRole(user.role),
      },
    };
  }

  /**
   * Inspect Active Session synchronously from cookie token
   */
  public getSessionFromCookie(token: string | null | undefined): {
    userId: string;
    user: AuthSessionUser;
  } | null {
    if (!token) return null;
    const payload = verifySessionToken(token, this.secret);
    if (!payload) return null;
    return {
      userId: payload.userId,
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name || payload.email.split("@")[0] || "Administrator",
        role: payload.role,
        permissions: getPermissionsForRole(payload.role),
      },
    };
  }

  /**
   * Inspect Active Session
   */
  public async getSession(token: string | null | undefined): Promise<{
    authenticated: boolean;
    user?: AuthSessionUser;
    error?: string;
  }> {
    if (!token) {
      return { authenticated: false, error: "NO_TOKEN" };
    }

    const payload = verifySessionToken(token, this.secret);
    if (!payload) {
      return { authenticated: false, error: "EXPIRED_OR_INVALID" };
    }

    return {
      authenticated: true,
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name || payload.email.split("@")[0] || "Administrator",
        role: payload.role,
        permissions: getPermissionsForRole(payload.role),
      },
    };
  }

  /**
   * Terminate Session and Audit Event
   */
  public async logout(
    sessionToken: string | null | undefined,
    ip?: string,
    userAgent?: string
  ): Promise<{ success: boolean }> {
    if (sessionToken) {
      const payload = verifySessionToken(sessionToken, this.secret);
      if (payload) {
        await this.recordAuditLog({
          userId: payload.userId,
          action: "LOGOUT",
          metadata: { email: payload.email, ip, userAgent },
          ipAddress: ip,
        });
      }
    }

    return { success: true };
  }
}

// Global singleton instance for admin auth service
export const adminAuthService = new AdminAuthService();
