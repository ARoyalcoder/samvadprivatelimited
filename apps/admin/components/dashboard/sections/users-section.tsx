"use client";

import * as React from "react";
import { ShieldCheck, KeyRound, Lock } from "lucide-react";
import { Badge, EmptyState } from "@samvad/ui";
import { AdminUserListItem } from "../../../lib/dashboard/dashboard-service";
import { AuthRole } from "@samvad/auth";

interface UsersSectionProps {
  users: AdminUserListItem[];
  callerRole: string;
  loading: boolean;
  onUpdateRole: (userId: string, newRole: AuthRole) => Promise<void>;
}

export function UsersSection({
  users,
  callerRole,
  loading,
  onUpdateRole,
}: UsersSectionProps) {
  const [roleFilter, setRoleFilter] = React.useState<string>("ALL");
  const [updatingUserId, setUpdatingUserId] = React.useState<string | null>(null);

  const isSuperAdmin = callerRole === "SUPER_ADMIN";

  const filteredUsers = React.useMemo(() => {
    if (roleFilter === "ALL") return users;
    return users.filter((u) => u.role === roleFilter);
  }, [users, roleFilter]);

  const handleRoleChange = async (userId: string, newRole: AuthRole) => {
    setUpdatingUserId(userId);
    await onUpdateRole(userId, newRole);
    setUpdatingUserId(null);
  };

  const roleColors: Record<string, "gold" | "secondary" | "outline"> = {
    SUPER_ADMIN: "gold",
    CONTENT_ADMIN: "gold",
    EDITOR: "secondary",
    AUTHOR: "outline",
    ANALYST: "secondary",
  };

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 rounded border border-zinc-800 bg-zinc-900/40" />
        <div className="h-72 rounded border border-zinc-800 bg-zinc-900/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">
        <div>
          <h2 className="font-serif text-xl font-semibold text-zinc-100">
            Administrative Principals &amp; RBAC Directory
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Authorized operational roles with strict separation of duties and MFA compliance
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isSuperAdmin && (
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
              <Lock className="h-3.5 w-3.5 text-amber-500/80" />
              <span>Role Editing: SUPER_ADMIN Only</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-zinc-500 uppercase text-[10px] mr-1">Filter Role:</span>
        {["ALL", "SUPER_ADMIN", "CONTENT_ADMIN", "EDITOR", "AUTHOR", "ANALYST"].map((r) => (
          <button
            key={r}
            onClick={() => setRoleFilter(r)}
            className={`px-2.5 py-1 rounded border transition-colors ${
              roleFilter === r
                ? "border-gold-500 bg-gold-950/40 text-gold-300 font-semibold"
                : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* 3. Users Table or Empty State */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          code="NO_USERS_FOUND"
          title="No Principals Found"
          description="There are no administrative principals registered under the selected role filter."
        />
      ) : (
        <div className="overflow-x-auto rounded border border-zinc-800 bg-zinc-900/60 shadow-sm">
          <table className="w-full text-left font-sans text-xs">
            <thead className="border-b border-zinc-800/80 bg-zinc-950/80 font-mono text-[10px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-3 px-4">Principal Name &amp; Corporate Email</th>
                <th className="py-3 px-4">Assigned Role</th>
                <th className="py-3 px-4">MFA State</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Authenticated</th>
                {isSuperAdmin && <th className="py-3 px-4 text-right">Modify Role</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-950/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-500/30 bg-gold-950/40 text-gold-400 font-serif font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-serif text-sm font-semibold text-zinc-100 block">
                          {user.name}
                        </span>
                        <span className="font-mono text-[11px] text-zinc-500 block">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-mono text-xs">
                    <Badge variant={roleColors[user.role] || "gold"}>{user.role}</Badge>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    {user.mfaEnabled ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-400">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>TOTP Enforced</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-zinc-500">
                        <KeyRound className="h-3.5 w-3.5" />
                        <span>Password Only</span>
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Active</span>
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-zinc-400">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "Never"}
                  </td>

                  {isSuperAdmin && (
                    <td className="py-3 px-4 text-right">
                      <select
                        value={user.role}
                        disabled={updatingUserId === user.id}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as AuthRole)}
                        className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-[11px] text-zinc-200 focus:border-gold-500 focus:outline-none"
                      >
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        <option value="CONTENT_ADMIN">CONTENT_ADMIN</option>
                        <option value="EDITOR">EDITOR</option>
                        <option value="AUTHOR">AUTHOR</option>
                        <option value="ANALYST">ANALYST</option>
                      </select>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
