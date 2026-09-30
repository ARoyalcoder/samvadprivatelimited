import { SubscriberStatus } from "@samvad/validation";

export type NewsletterJobType =
  | "WELCOME_EMAIL"
  | "REACTIVATION_EMAIL"
  | "UNSUBSCRIBE_CONFIRMATION";

export type JobStatus = "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface NewsletterJobPayload {
  subscriberId: string;
  email: string;
  unsubscribeToken: string;
  source?: string;
  consentTimestamp?: string;
  reason?: string;
}

export interface NewsletterJob {
  id: string;
  type: NewsletterJobType;
  payload: NewsletterJobPayload;
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  processedAt?: string;
  completedAt?: string;
  error?: string;
}

export interface SubscribeResult {
  success: boolean;
  message: string;
  subscriberId: string;
  email: string;
  isExisting: boolean;
  status: SubscriberStatus;
  enqueuedJobId?: string;
}

export interface UnsubscribeResult {
  success: boolean;
  message: string;
  emailMasked?: string;
  unsubscribedAt: string;
  isAlreadyUnsubscribed: boolean;
}

export interface SubscriberStats {
  totalSubscribers: number;
  activeSubscribers: number;
  unsubscribedSubscribers: number;
  churnRatePercent: number;
}
