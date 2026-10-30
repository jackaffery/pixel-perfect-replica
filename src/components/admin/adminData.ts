// Mock data types and realistic banking records for West Side Financial Institution Solo Admin Workspace
// Designed strictly for fictional administrative simulation

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  mailingAddress: string;
  dateJoined: string; // e.g., "2025-10-12"
  displayDateJoined: string;
  onlineAccessStatus: "Active" | "Suspended" | "Reinstated" | "Closed";
  verificationStatus: "Verified" | "Pending Review" | "Action Required" | "Rejected";
  linkedCustomerId: string;
  communicationPreferences: {
    emailAlerts: boolean;
    smsNotifications: boolean;
    paperlessStatements: boolean;
    marketingUpdates: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    activeSessionsCount: number;
    lastSignIn: string;
    lastSignInIp: string;
    passwordResetRequired: boolean;
  };
  profilePicUrl?: string;
  checkingBalance?: number;
  savingsBalance?: number;
  isDormant?: boolean;
  btcBalance?: number;
  dailyTransferLimit?: number;
  dailyWithdrawalLimit?: number;
  adminNotes: string[];
  accessChangeHistory: {
    id: string;
    timestamp: string;
    actor: string;
    action: string;
    previousState: string;
    newState: string;
    reason: string;
  }[];
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  profilePicUrl?: string;
  verificationStatus: "Verified" | "Pending Review" | "Action Required" | "Rejected";
  riskLevel: "Low" | "Medium" | "High" | "Flagged";
  status: "Active" | "Restricted" | "Suspended" | "Frozen";
  idType: string;
  idNumberMasked: string;
  address: string;
  joinedDate: string;
  adminNotes: string;
  linkedAccountIds: string[];
}

export interface BankAccountRecord {
  id: string;
  customerId: string;
  customerName: string;
  accountType: "Advantage Checking" | "High-Yield Savings" | "Treasury Money Market" | "Commercial Operations";
  accountNumberMasked: string;
  routingNumber: string;
  currency: string;
  balance: number;
  availableBalance: number;
  status: "Active" | "Frozen" | "Dormant" | "Under Review";
  openedDate: string;
  lastActivity: string;
}

export interface TransferStatusUpdate {
  id: string;
  fromStatus: string;
  toStatus: "On hold" | "Processing" | "Completed";
  updatedBy: string;
  reason: string;
  timestamp: string;
}

export interface BankTransactionRecord {
  id: string;
  accountId: string;
  accountMasked: string;
  customerId: string;
  customerName: string;
  type: "Direct Deposit" | "Wire Transfer" | "Card Settlement" | "Bill Pay" | "Internal Transfer" | "ACH Debit";
  amount: number;
  currency: string;
  direction: "credit" | "debit";
  counterparty: string;
  timestamp: string;
  status: "Completed" | "Processing" | "On hold" | "Pending Clearing" | "Flagged" | "Blocked" | "Resolved";
  transferStatus?: "On hold" | "Processing" | "Completed";
  statusUpdates?: TransferStatusUpdate[];
  flagReason?: string;
  reviewNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface ComplianceReviewItem {
  id: string;
  targetType: "Customer Identity" | "Transaction Alert" | "Jurisdiction Compliance" | "KYC Document";
  targetId: string;
  targetName: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Pending Review" | "In Review" | "Approved" | "Escalated" | "Dismissed";
  ageHours: number;
  submittedAt: string;
  summary: string;
  details: string;
  reviewer?: string;
  decision?: string;
  decisionReason?: string;
  decisionTimestamp?: string;
}

export interface SupportCase {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  category: "Account Access" | "Wire Settlement" | "Card Dispute" | "KYC / ID Update" | "General";
  priority: "Critical" | "High" | "Normal" | "Low";
  status: "Open" | "In Progress" | "Pending Customer" | "Resolved" | "Closed";
  assignedTo: string; // Solo Admin
  createdAt: string;
  updatedAt: string;
  internalNotes: string[];
  conversation: {
    sender: "customer" | "admin" | "system";
    senderName: string;
    message: string;
    timestamp: string;
  }[];
}

export interface OperationalAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  timestamp: string;
  category: "Security" | "Compliance" | "System" | "Transaction";
  resolved: boolean;
  actionRequired?: string;
}

export interface SoloAdminAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  section: "Overview" | "Users" | "Applications" | "Customers" | "Accounts" | "Transactions" | "Compliance" | "Support" | "Reports" | "Settings" | "Security";
  action: string;
  targetId?: string;
  details: string;
  ipAddress: string;
}

// -------------------------------------------------------------
// INITIAL FAKE DATA (Fictional records only)
// -------------------------------------------------------------

export const MOCK_CUSTOMERS: AdminCustomer[] = [];

export const MOCK_ADMIN_USERS: AdminUserRecord[] = [];

export const MOCK_ACCOUNTS: BankAccountRecord[] = [];

export const MOCK_TRANSACTIONS: BankTransactionRecord[] = [];

export const MOCK_COMPLIANCE_REVIEWS: ComplianceReviewItem[] = [];

export const MOCK_SUPPORT_CASES: SupportCase[] = [];

export const MOCK_ALERTS: OperationalAlert[] = [];

export const MOCK_AUDIT_LOGS: SoloAdminAuditEntry[] = [];

export interface BankApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryName: string;
  countryCode: string;
  region: string;
  accountType: string;
  idType: string;
  idNumber: string;
  status: "Pending" | "Under Review" | "Approved" | "Declined" | "Rejected";
  reviewNotes: string;
  submittedAt: string;
  updatedAt?: string;
  decisionReason?: string;
  decisionBy?: string;
}

export const INITIAL_BANK_APPLICATIONS: BankApplication[] = [];
