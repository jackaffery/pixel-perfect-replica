// Mock data types and realistic banking records for US Finance Bank Solo Admin Workspace
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

export const MOCK_CUSTOMERS: AdminCustomer[] = [
  {
    id: "CUST-109283",
    name: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (555) 234-8901",
    country: "United States",
    countryCode: "US",
    verificationStatus: "Verified",
    riskLevel: "Low",
    status: "Active",
    idType: "Social Security Number (SSN)",
    idNumberMasked: "•••-••-4892",
    address: "742 Evergreen Terrace, Springfield, IL",
    joinedDate: "Oct 12, 2025",
    adminNotes: "Client verified via tier-1 domestic documents. Preferred priority routing enabled.",
    linkedAccountIds: ["ACC-US-001", "ACC-US-002"],
  },
  {
    id: "CUST-401928",
    name: "Liam Davies",
    email: "liam.davies@example.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    countryCode: "GB",
    verificationStatus: "Verified",
    riskLevel: "Low",
    status: "Active",
    idType: "National Insurance (NI) Number",
    idNumberMasked: "•• •• •• 89 C",
    address: "14 Belgrave Square, Westminster, London SW1X 8PS",
    joinedDate: "Nov 03, 2025",
    adminNotes: "London cross-border treasury cleared. Verified proof of address Oct 2026.",
    linkedAccountIds: ["ACC-GB-101"],
  },
  {
    id: "CUST-884910",
    name: "Mathieu Tremblay",
    email: "mathieu.t@example.ca",
    phone: "+1 (416) 555-0182",
    country: "Canada",
    countryCode: "CA",
    verificationStatus: "Pending Review",
    riskLevel: "Medium",
    status: "Restricted",
    idType: "Social Insurance Number (SIN)",
    idNumberMasked: "••• ••• 419",
    address: "88 Bay Street, Toronto, ON M5J 2R8",
    joinedDate: "Yesterday",
    adminNotes: "SIN document verification match awaiting solo admin confirmation.",
    linkedAccountIds: ["ACC-CA-201"],
  },
  {
    id: "CUST-301924",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.mx",
    phone: "+52 55 1234 5678",
    country: "Mexico",
    countryCode: "MX",
    verificationStatus: "Verified",
    riskLevel: "Low",
    status: "Active",
    idType: "CURP / RFC",
    idNumberMasked: "ROMS850215••••••",
    address: "Paseo de la Reforma 222, Cuauhtémoc, CDMX",
    joinedDate: "Dec 18, 2025",
    adminNotes: "Dual RFC verified for commercial accounts.",
    linkedAccountIds: ["ACC-MX-301", "ACC-MX-302"],
  },
  {
    id: "CUST-662914",
    name: "Lukas Weber",
    email: "lukas.weber@example.de",
    phone: "+49 30 1234567",
    country: "Germany",
    countryCode: "DE",
    verificationStatus: "Action Required",
    riskLevel: "High",
    status: "Frozen",
    idType: "Personalausweis / Steuer-ID",
    idNumberMasked: "T2200••••",
    address: "Friedrichstraße 43, 10117 Berlin",
    joinedDate: "Jan 10, 2026",
    adminNotes: "Account frozen due to 3 consecutive unusual offshore wire attempts.",
    linkedAccountIds: ["ACC-DE-401"],
  },
  {
    id: "CUST-994102",
    name: "Kenji Takahashi",
    email: "kenji.takahashi@example.jp",
    phone: "+81 3 5555 0143",
    country: "Japan",
    countryCode: "JP",
    verificationStatus: "Rejected",
    riskLevel: "Flagged",
    status: "Suspended",
    idType: "My Number (Individual Number)",
    idNumberMasked: "•••• •••• 9201",
    address: "Minato-ku, Roppongi 6-10-1, Tokyo",
    joinedDate: "Feb 01, 2026",
    adminNotes: "Identity documents failed biometric match test. Account administratively suspended.",
    linkedAccountIds: ["ACC-JP-501"],
  },
];

export const MOCK_ADMIN_USERS: AdminUserRecord[] = [
  {
    id: "USR-10091",
    name: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (555) 234-8901",
    mailingAddress: "742 Evergreen Terrace, Springfield, IL 62704, United States",
    profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    dateJoined: "2025-10-12",
    displayDateJoined: "Oct 12, 2025",
    onlineAccessStatus: "Active",
    verificationStatus: "Verified",
    linkedCustomerId: "CUST-109283",
    communicationPreferences: {
      emailAlerts: true,
      smsNotifications: true,
      paperlessStatements: true,
      marketingUpdates: false,
    },
    security: {
      twoFactorEnabled: true,
      activeSessionsCount: 2,
      lastSignIn: "Today, 08:34 AM",
      lastSignInIp: "192.0.2.45 (Springfield, US)",
      passwordResetRequired: false,
    },
    adminNotes: [
      "Client requested SMS notifications be redirected to mobile primary. Identity verification confirmed via tier-1 domestic documents.",
      "Profile mailing address re-verified during annual compliance check.",
    ],
    accessChangeHistory: [
      {
        id: "HIS-101",
        timestamp: "Oct 12, 2025, 09:00 AM",
        actor: "System / Provisioning",
        action: "Initial Online Access Provisioned",
        previousState: "None",
        newState: "Active",
        reason: "New account onboarding with verified identity documents.",
      },
    ],
  },
  {
    id: "USR-10092",
    name: "Liam Davies",
    email: "liam.davies@example.co.uk",
    phone: "+44 20 7946 0912",
    mailingAddress: "14 Belgrave Square, Westminster, London SW1X 8PS, United Kingdom",
    profilePicUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    dateJoined: "2025-11-03",
    displayDateJoined: "Nov 03, 2025",
    onlineAccessStatus: "Active",
    verificationStatus: "Verified",
    linkedCustomerId: "CUST-401928",
    communicationPreferences: {
      emailAlerts: true,
      smsNotifications: false,
      paperlessStatements: true,
      marketingUpdates: false,
    },
    security: {
      twoFactorEnabled: true,
      activeSessionsCount: 1,
      lastSignIn: "Yesterday, 04:15 PM",
      lastSignInIp: "198.51.100.12 (London, UK)",
      passwordResetRequired: false,
    },
    adminNotes: [
      "Cross-border treasury permissions cleared. Standard web session limits apply.",
    ],
    accessChangeHistory: [
      {
        id: "HIS-102",
        timestamp: "Nov 03, 2025, 11:20 AM",
        actor: "Solo Administrator",
        action: "Online Access Approved",
        previousState: "Pending",
        newState: "Active",
        reason: "UK jurisdiction identity verification and proof of residence confirmed.",
      },
    ],
  },
  {
    id: "USR-10093",
    name: "Mathieu Tremblay",
    email: "mathieu.t@example.ca",
    phone: "+1 (416) 555-0182",
    mailingAddress: "88 Bay Street, Suite 1400, Toronto, ON M5J 2R8, Canada",
    profilePicUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    dateJoined: "2026-10-19",
    displayDateJoined: "Yesterday",
    onlineAccessStatus: "Active",
    verificationStatus: "Pending Review",
    linkedCustomerId: "CUST-884910",
    communicationPreferences: {
      emailAlerts: true,
      smsNotifications: true,
      paperlessStatements: false,
      marketingUpdates: true,
    },
    security: {
      twoFactorEnabled: false,
      activeSessionsCount: 1,
      lastSignIn: "Yesterday, 02:10 PM",
      lastSignInIp: "203.0.113.88 (Toronto, CA)",
      passwordResetRequired: false,
    },
    adminNotes: [
      "User enrolled yesterday. Online banking access active in probationary state while SIN document is reviewed.",
    ],
    accessChangeHistory: [
      {
        id: "HIS-103",
        timestamp: "Yesterday, 02:00 PM",
        actor: "System / Onboarding",
        action: "Online Account Initialized",
        previousState: "None",
        newState: "Active",
        reason: "Self-service onboarding completed; awaiting final KYC verification.",
      },
    ],
  },
  {
    id: "USR-10094",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.mx",
    phone: "+52 55 1234 5678",
    mailingAddress: "Paseo de la Reforma 222, Piso 8, Cuauhtémoc, 06600 CDMX, Mexico",
    profilePicUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    dateJoined: "2025-12-18",
    displayDateJoined: "Dec 18, 2025",
    onlineAccessStatus: "Active",
    verificationStatus: "Verified",
    linkedCustomerId: "CUST-301924",
    communicationPreferences: {
      emailAlerts: true,
      smsNotifications: true,
      paperlessStatements: true,
      marketingUpdates: true,
    },
    security: {
      twoFactorEnabled: true,
      activeSessionsCount: 3,
      lastSignIn: "Today, 06:12 AM",
      lastSignInIp: "187.189.20.15 (Mexico City, MX)",
      passwordResetRequired: false,
    },
    adminNotes: [
      "Dual commercial and personal profiles linked. Multi-device sign-in authenticated.",
    ],
    accessChangeHistory: [
      {
        id: "HIS-104",
        timestamp: "Dec 18, 2025, 10:45 AM",
        actor: "Solo Administrator",
        action: "Online Access Granted",
        previousState: "Pending",
        newState: "Active",
        reason: "RFC / CURP regulatory clearance satisfied.",
      },
    ],
  },
  {
    id: "USR-10095",
    name: "Lukas Weber",
    email: "lukas.weber@example.de",
    phone: "+49 30 1234567",
    mailingAddress: "Friedrichstraße 43, 10117 Berlin, Germany",
    profilePicUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    dateJoined: "2026-01-10",
    displayDateJoined: "Jan 10, 2026",
    onlineAccessStatus: "Suspended",
    verificationStatus: "Action Required",
    linkedCustomerId: "CUST-662914",
    communicationPreferences: {
      emailAlerts: true,
      smsNotifications: false,
      paperlessStatements: true,
      marketingUpdates: false,
    },
    security: {
      twoFactorEnabled: true,
      activeSessionsCount: 0,
      lastSignIn: "Oct 17, 2026, 09:22 AM",
      lastSignInIp: "85.214.132.117 (Berlin, DE)",
      passwordResetRequired: true,
    },
    adminNotes: [
      "Online portal access suspended pending investigation into abnormal login locations and wire triggers.",
      "Requires re-verification of government photo identification before online reinstatement.",
    ],
    accessChangeHistory: [
      {
        id: "HIS-105",
        timestamp: "Oct 17, 2026, 02:15 PM",
        actor: "Solo Administrator",
        action: "Online Access Suspended",
        previousState: "Active",
        newState: "Suspended",
        reason: "Compliance Alert ALR-001 - Multiple unauthorized offshore login attempts detected.",
      },
      {
        id: "HIS-105-B",
        timestamp: "Oct 17, 2026, 02:16 PM",
        actor: "Solo Administrator",
        action: "Sessions Terminated & Password Reset Flagged",
        previousState: "Standard",
        newState: "Reset Required",
        reason: "Precautionary security isolation.",
      },
    ],
  },
  {
    id: "USR-10096",
    name: "Kenji Takahashi",
    email: "kenji.takahashi@example.jp",
    phone: "+81 3 5555 0143",
    mailingAddress: "Minato-ku, Roppongi 6-10-1, Tokyo 106-6108, Japan",
    profilePicUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    dateJoined: "2026-02-01",
    displayDateJoined: "Feb 01, 2026",
    onlineAccessStatus: "Closed",
    verificationStatus: "Rejected",
    linkedCustomerId: "CUST-994102",
    communicationPreferences: {
      emailAlerts: false,
      smsNotifications: false,
      paperlessStatements: false,
      marketingUpdates: false,
    },
    security: {
      twoFactorEnabled: false,
      activeSessionsCount: 0,
      lastSignIn: "Feb 01, 2026, 03:00 PM",
      lastSignInIp: "133.242.18.2 (Tokyo, JP)",
      passwordResetRequired: true,
    },
    adminNotes: [
      "Online credentials revoked permanently. Identity documents failed biometric validation.",
    ],
    accessChangeHistory: [
      {
        id: "HIS-106",
        timestamp: "Feb 01, 2026, 04:30 PM",
        actor: "Solo Administrator",
        action: "Online Access Closed Permanently",
        previousState: "Active",
        newState: "Closed",
        reason: "Biometric document validation failed. Administrative closure applied.",
      },
    ],
  },
];

export const MOCK_ACCOUNTS: BankAccountRecord[] = [
  {
    id: "ACC-US-001",
    customerId: "CUST-109283",
    customerName: "Eleanor Vance",
    accountType: "Advantage Checking",
    accountNumberMasked: "••••••••4819",
    routingNumber: "021000089",
    currency: "USD",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Active",
    openedDate: "Oct 12, 2025",
    lastActivity: "Today, 10:14 AM",
  },
  {
    id: "ACC-US-002",
    customerId: "CUST-109283",
    customerName: "Eleanor Vance",
    accountType: "High-Yield Savings",
    accountNumberMasked: "••••••••7721",
    routingNumber: "021000089",
    currency: "USD",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Active",
    openedDate: "Oct 12, 2025",
    lastActivity: "Oct 14, 2026",
  },
  {
    id: "ACC-GB-101",
    customerId: "CUST-401928",
    customerName: "Liam Davies",
    accountType: "Advantage Checking",
    accountNumberMasked: "••••••••9302",
    routingNumber: "123456 (Sort Code)",
    currency: "GBP",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Active",
    openedDate: "Nov 03, 2025",
    lastActivity: "Yesterday, 04:30 PM",
  },
  {
    id: "ACC-CA-201",
    customerId: "CUST-884910",
    customerName: "Mathieu Tremblay",
    accountType: "Commercial Operations",
    accountNumberMasked: "••••••••5519",
    routingNumber: "00010992",
    currency: "CAD",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Under Review",
    openedDate: "Yesterday",
    lastActivity: "Yesterday, 08:30 AM",
  },
  {
    id: "ACC-MX-301",
    customerId: "CUST-301924",
    customerName: "Sofia Rodriguez",
    accountType: "Advantage Checking",
    accountNumberMasked: "••••••••6612",
    routingNumber: "012180004",
    currency: "MXN",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Active",
    openedDate: "Dec 18, 2025",
    lastActivity: "Oct 18, 2026",
  },
  {
    id: "ACC-MX-302",
    customerId: "CUST-301924",
    customerName: "Sofia Rodriguez",
    accountType: "Treasury Money Market",
    accountNumberMasked: "••••••••8814",
    routingNumber: "012180004",
    currency: "MXN",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Active",
    openedDate: "Dec 18, 2025",
    lastActivity: "Oct 15, 2026",
  },
  {
    id: "ACC-DE-401",
    customerId: "CUST-662914",
    customerName: "Lukas Weber",
    accountType: "High-Yield Savings",
    accountNumberMasked: "••••••••1109",
    routingNumber: "DEUTDEDDXXX",
    currency: "EUR",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Frozen",
    openedDate: "Jan 10, 2026",
    lastActivity: "Oct 17, 2026",
  },
  {
    id: "ACC-JP-501",
    customerId: "CUST-994102",
    customerName: "Kenji Takahashi",
    accountType: "Advantage Checking",
    accountNumberMasked: "••••••••3311",
    routingNumber: "0001-992",
    currency: "JPY",
    balance: 0.00,
    availableBalance: 0.00,
    status: "Frozen",
    openedDate: "Feb 01, 2026",
    lastActivity: "Oct 05, 2026",
  },
];

export const MOCK_TRANSACTIONS: BankTransactionRecord[] = [
  {
    id: "TX-90214",
    accountId: "ACC-US-001",
    accountMasked: "••••••••4819",
    customerId: "CUST-109283",
    customerName: "Eleanor Vance",
    type: "Direct Deposit",
    amount: 0.00,
    currency: "USD",
    direction: "credit",
    counterparty: "Global Enterprise Payroll Inc.",
    timestamp: "Today, 10:14 AM",
    status: "Completed",
    transferStatus: "Completed",
    statusUpdates: [
      {
        id: "UPD-90214-1",
        fromStatus: "Processing",
        toStatus: "Completed",
        updatedBy: "Staff Admin",
        reason: "Verified clearing confirmation from Global Enterprise Payroll Inc.",
        timestamp: "Today, 10:14 AM",
      },
    ],
  },
  {
    id: "TX-90213",
    accountId: "ACC-GB-101",
    accountMasked: "••••••••9302",
    customerId: "CUST-401928",
    customerName: "Liam Davies",
    type: "Wire Transfer",
    amount: 0.00,
    currency: "GBP",
    direction: "credit",
    counterparty: "Barclays Commercial Clearing",
    timestamp: "Today, 09:30 AM",
    status: "Completed",
    transferStatus: "Completed",
    statusUpdates: [
      {
        id: "UPD-90213-1",
        fromStatus: "Processing",
        toStatus: "Completed",
        updatedBy: "Staff Admin",
        reason: "Barclays commercial clearing verified successfully.",
        timestamp: "Today, 09:30 AM",
      },
    ],
  },
  {
    id: "TX-90212",
    accountId: "ACC-DE-401",
    accountMasked: "••••••••1109",
    customerId: "CUST-662914",
    customerName: "Lukas Weber",
    type: "Wire Transfer",
    amount: 0.00,
    currency: "EUR",
    direction: "debit",
    counterparty: "Offshore Vault Ltd. (CY)",
    timestamp: "Oct 17, 2026, 02:10 PM",
    status: "Resolved",
    transferStatus: "On hold",
    flagReason: "Unusual velocity and high-risk counterparty jurisdiction.",
    reviewNotes: "Requires Solo Admin secondary clearance before routing.",
    statusUpdates: [
      {
        id: "UPD-90212-1",
        fromStatus: "Processing",
        toStatus: "On hold",
        updatedBy: "Staff Admin",
        reason: "Temporary compliance hold pending counterparty verification documentation.",
        timestamp: "Oct 17, 2026, 02:15 PM",
      },
    ],
  },
  {
    id: "TX-90211",
    accountId: "ACC-CA-201",
    accountMasked: "••••••••5519",
    customerId: "CUST-884910",
    customerName: "Mathieu Tremblay",
    type: "ACH Debit",
    amount: 0.00,
    currency: "CAD",
    direction: "debit",
    counterparty: "Ontario Commercial Services",
    timestamp: "Yesterday, 08:35 AM",
    status: "Pending Clearing",
    transferStatus: "Processing",
    statusUpdates: [
      {
        id: "UPD-90211-1",
        fromStatus: "On hold",
        toStatus: "Processing",
        updatedBy: "Staff Admin",
        reason: "Initial ACH batch scheduled for interbank clearing.",
        timestamp: "Yesterday, 08:35 AM",
      },
    ],
  },
  {
    id: "TX-90210",
    accountId: "ACC-MX-301",
    accountMasked: "••••••••6612",
    customerId: "CUST-301924",
    customerName: "Sofia Rodriguez",
    type: "Card Settlement",
    amount: 0.00,
    currency: "MXN",
    direction: "debit",
    counterparty: "AeroMexico Booking",
    timestamp: "Oct 18, 2026, 03:15 PM",
    status: "Completed",
    transferStatus: "Completed",
    statusUpdates: [
      {
        id: "UPD-90210-1",
        fromStatus: "Processing",
        toStatus: "Completed",
        updatedBy: "Staff Admin",
        reason: "POS card network batch settlement confirmed.",
        timestamp: "Oct 18, 2026, 03:15 PM",
      },
    ],
  },
  {
    id: "TX-90209",
    accountId: "ACC-US-001",
    accountMasked: "••••••••4819",
    customerId: "CUST-109283",
    customerName: "Eleanor Vance",
    type: "Bill Pay",
    amount: 0.00,
    currency: "USD",
    direction: "debit",
    counterparty: "Consolidated Edison Utility",
    timestamp: "Oct 16, 2026, 05:40 PM",
    status: "Completed",
    transferStatus: "Completed",
    statusUpdates: [
      {
        id: "UPD-90209-1",
        fromStatus: "Processing",
        toStatus: "Completed",
        updatedBy: "Staff Admin",
        reason: "Electronic utility bill settlement completed.",
        timestamp: "Oct 16, 2026, 05:40 PM",
      },
    ],
  },
  {
    id: "TX-90208",
    accountId: "ACC-US-002",
    accountMasked: "••••••••7721",
    customerId: "CUST-109283",
    customerName: "Eleanor Vance",
    type: "Internal Transfer",
    amount: 0.00,
    currency: "USD",
    direction: "credit",
    counterparty: "Checking Transfer (ACC-US-001)",
    timestamp: "Oct 14, 2026, 08:00 AM",
    status: "Completed",
  },
];

export const MOCK_COMPLIANCE_REVIEWS: ComplianceReviewItem[] = [
  {
    id: "REV-104",
    targetType: "Transaction Alert",
    targetId: "TX-90212",
    targetName: "EUR 14,200.00 Wire - Lukas Weber",
    priority: "Urgent",
    status: "Pending Review",
    ageHours: 4,
    submittedAt: "Oct 17, 2026, 02:15 PM",
    summary: "High-value cross-border wire to non-EEA account flagged by AML heuristics.",
    details: "Origin: Account ACC-DE-401. Beneficiary: Offshore Vault Ltd. Transaction value represents 65% of account balance.",
  },
  {
    id: "REV-103",
    targetType: "KYC Document",
    targetId: "CUST-884910",
    targetName: "Mathieu Tremblay (Canada)",
    priority: "High",
    status: "Pending Review",
    ageHours: 18,
    submittedAt: "Yesterday, 08:30 AM",
    summary: "New Commercial Treasury application KYC validation.",
    details: "Canada Social Insurance Number and corporate registration documents submitted for verification.",
  },
  {
    id: "REV-102",
    targetType: "Customer Identity",
    targetId: "CUST-994102",
    targetName: "Kenji Takahashi (Japan)",
    priority: "Urgent",
    status: "Approved",
    ageHours: 48,
    submittedAt: "Oct 05, 2026",
    summary: "Biometric ID mismatch review.",
    details: "Facial scan threshold fell below compliance confidence interval.",
    reviewer: "Solo Administrator",
    decision: "Suspended",
    decisionReason: "Documents could not be verified by jurisdictional database.",
    decisionTimestamp: "Oct 05, 2026, 04:30 PM",
  },
  {
    id: "REV-101",
    targetType: "Jurisdiction Compliance",
    targetId: "CUST-401928",
    targetName: "Liam Davies (UK)",
    priority: "Low",
    status: "Approved",
    ageHours: 72,
    submittedAt: "Oct 15, 2026",
    summary: "Annual UK HMRC proof-of-residence review.",
    details: "Utility statement and National Insurance record matched.",
    reviewer: "Solo Administrator",
    decision: "Cleared",
    decisionReason: "All proof-of-address documents valid and authentic.",
    decisionTimestamp: "Oct 15, 2026, 11:30 AM",
  },
];

export const MOCK_SUPPORT_CASES: SupportCase[] = [
  {
    id: "SUP-8491",
    ticketNumber: "TKT-8491",
    customerId: "CUST-109283",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@example.com",
    subject: "Wire transfer clearing speed to London branch",
    category: "Wire Settlement",
    priority: "Normal",
    status: "Open",
    assignedTo: "Solo Administrator",
    createdAt: "Today, 09:14 AM",
    updatedAt: "Today, 09:14 AM",
    internalNotes: ["Customer asking regarding standard settlement window for GBP conversion."],
    conversation: [
      {
        sender: "customer",
        senderName: "Eleanor Vance",
        message: "Could you confirm the typical settlement speed for USD to GBP wire transfers initiated on weekends?",
        timestamp: "Today, 09:14 AM",
      },
    ],
  },
  {
    id: "SUP-3920",
    ticketNumber: "TKT-3920",
    customerId: "CUST-301924",
    customerName: "Sofia Rodriguez",
    customerEmail: "sofia.rodriguez@example.mx",
    subject: "CURP / RFC document validation status",
    category: "KYC / ID Update",
    priority: "High",
    status: "In Progress",
    assignedTo: "Solo Administrator",
    createdAt: "Oct 18, 2026, 03:22 PM",
    updatedAt: "Oct 18, 2026, 05:40 PM",
    internalNotes: ["Checked RFC registry with Mexico tax authority. Match confirmed."],
    conversation: [
      {
        sender: "customer",
        senderName: "Sofia Rodriguez",
        message: "I submitted my RFC and CURP documents yesterday. Wanted to confirm if any further notarized forms are required.",
        timestamp: "Oct 18, 2026, 03:22 PM",
      },
      {
        sender: "admin",
        senderName: "Solo Administrator",
        message: "Your documentation has been validated against regional compliance. No notarized physical papers are required at this stage.",
        timestamp: "Oct 18, 2026, 05:40 PM",
      },
    ],
  },
  {
    id: "SUP-1102",
    ticketNumber: "TKT-1102",
    customerId: "CUST-662914",
    customerName: "Lukas Weber",
    customerEmail: "lukas.weber@example.de",
    subject: "Notice regarding account freeze",
    category: "Account Access",
    priority: "Critical",
    status: "In Progress",
    assignedTo: "Solo Administrator",
    createdAt: "Oct 17, 2026, 03:00 PM",
    updatedAt: "Oct 17, 2026, 03:45 PM",
    internalNotes: ["Client notified of administrative freeze under AML Article 14."],
    conversation: [
      {
        sender: "customer",
        senderName: "Lukas Weber",
        message: "I am unable to access my online banking checking or wire terminal. Please advise immediately.",
        timestamp: "Oct 17, 2026, 03:00 PM",
      },
      {
        sender: "admin",
        senderName: "Solo Administrator",
        message: "Your account is temporarily placed under review by bank administration due to an anomalous transfer pattern. Compliance review REV-104 is currently active.",
        timestamp: "Oct 17, 2026, 03:45 PM",
      },
    ],
  },
];

export const MOCK_ALERTS: OperationalAlert[] = [
  {
    id: "ALT-01",
    severity: "critical",
    title: "Suspicious Wire Activity Flagged",
    description: "Transaction TX-90212 (EUR 14,200.00) triggered automated AML velocity threshold.",
    timestamp: "2 hours ago",
    category: "Security",
    resolved: false,
    actionRequired: "Review in Compliance queue",
  },
  {
    id: "ALT-02",
    severity: "warning",
    title: "Overdue KYC Document Review",
    description: "Application for Mathieu Tremblay (CUST-884910) has exceeded the 12-hour turnaround target.",
    timestamp: "6 hours ago",
    category: "Compliance",
    resolved: false,
    actionRequired: "Verify Social Insurance Number",
  },
  {
    id: "ALT-03",
    severity: "info",
    title: "Scheduled Maintenance Window",
    description: "Routine internal ledger audit and backup scheduled for 02:00 UTC Sunday.",
    timestamp: "1 day ago",
    category: "System",
    resolved: true,
  },
  {
    id: "ALT-04",
    severity: "warning",
    title: "Failed Authentication Surge (IP: 198.51.100.44)",
    description: "5 failed administrative sign-in attempts recorded from an unregistered network.",
    timestamp: "Yesterday, 11:40 PM",
    category: "Security",
    resolved: false,
    actionRequired: "Confirm IP ban in Security Settings",
  },
];

export const MOCK_AUDIT_LOGS: SoloAdminAuditEntry[] = [
  {
    id: "AUD-9912",
    timestamp: "Today, 10:15 AM",
    actor: "Solo Administrator",
    section: "Customers",
    action: "Viewed Sensitive ID",
    targetId: "CUST-109283",
    details: "Unmasked SSN view for customer Eleanor Vance (reason: support case SUP-8491).",
    ipAddress: "127.0.0.1 (Internal Console)",
  },
  {
    id: "AUD-9911",
    timestamp: "Today, 09:15 AM",
    actor: "Solo Administrator",
    section: "Security",
    action: "Session Authenticated",
    details: "Master Solo Administrator logged into workspace terminal with high privilege.",
    ipAddress: "127.0.0.1 (Internal Console)",
  },
  {
    id: "AUD-9910",
    timestamp: "Yesterday, 05:42 PM",
    actor: "Solo Administrator",
    section: "Support",
    action: "Case Response Dispatched",
    targetId: "TKT-3920",
    details: "Dispatched compliance confirmation to Sofia Rodriguez regarding RFC documents.",
    ipAddress: "127.0.0.1 (Internal Console)",
  },
  {
    id: "AUD-9909",
    timestamp: "Oct 17, 2026, 02:20 PM",
    actor: "Solo Administrator",
    section: "Accounts",
    action: "Account Status Changed",
    targetId: "ACC-DE-401",
    details: "Account frozen following AML flag TX-90212. Available balance locked.",
    ipAddress: "127.0.0.1 (Internal Console)",
  },
  {
    id: "AUD-9908",
    timestamp: "Oct 15, 2026, 11:35 AM",
    actor: "Solo Administrator",
    section: "Compliance",
    action: "Identity Review Cleared",
    targetId: "REV-101",
    details: "Approved proof of address for Liam Davies (UK Jurisdiction).",
    ipAddress: "127.0.0.1 (Internal Console)",
  },
];

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

export const INITIAL_BANK_APPLICATIONS: BankApplication[] = [
  {
    id: "USB-CA-884910",
    fullName: "Mathieu Tremblay",
    email: "mathieu.t@example.ca",
    phone: "+1 (416) 555-0182",
    countryName: "Canada",
    countryCode: "CA",
    region: "Ontario",
    accountType: "Commercial Treasury",
    idType: "Social Insurance Number (SIN)",
    idNumber: "••• ••• 419",
    status: "Pending",
    reviewNotes: "Initial documentation uploaded. Awaiting regulatory screening.",
    submittedAt: "Oct 19, 2026, 08:30 AM",
  },
  {
    id: "USB-GB-401928",
    fullName: "Liam Davies",
    email: "liam.davies@example.co.uk",
    phone: "+44 20 7946 0912",
    countryName: "United Kingdom",
    countryCode: "GB",
    region: "England",
    accountType: "Advantage Checking",
    idType: "National Insurance (NI) Number",
    idNumber: "•• •• •• 89 C",
    status: "Approved",
    reviewNotes: "KYC and address proof verified. Advantage Checking account active.",
    submittedAt: "Oct 15, 2026, 11:20 AM",
  },
  {
    id: "USB-US-109283",
    fullName: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (555) 234-8901",
    countryName: "United States",
    countryCode: "US",
    region: "California",
    accountType: "Advantage Checking & Savings",
    idType: "Social Security Number (SSN)",
    idNumber: "•••-••-4892",
    status: "Approved",
    reviewNotes: "Domestic identification verified. Welcome bonus activated.",
    submittedAt: "Oct 12, 2026, 02:45 PM",
  },
  {
    id: "USB-VN-552019",
    fullName: "Nguyen Van Minh",
    email: "minh.nguyen@example.vn",
    phone: "+84 24 3825 0123",
    countryName: "Vietnam",
    countryCode: "VN",
    region: "Hanoi",
    accountType: "Advantage Checking",
    idType: "Citizen Identity Card (CCCD)",
    idNumber: "00109•••••••",
    status: "Under Review",
    reviewNotes: "Cross-border ID match in progress with regional compliance team.",
    submittedAt: "Oct 18, 2026, 04:10 PM",
  },
  {
    id: "USB-MX-331092",
    fullName: "Sofia Ramirez",
    email: "sofia.ramirez@example.mx",
    phone: "+52 55 4912 8840",
    countryName: "Mexico",
    countryCode: "MX",
    region: "Ciudad de México",
    accountType: "Personal Checking",
    idType: "CURP / INE Credential",
    idNumber: "ROMS850215••••••",
    status: "Pending",
    reviewNotes: "RFC tax identification uploaded. Pending dual-factor identity validation.",
    submittedAt: "Oct 20, 2026, 10:15 AM",
  },
  {
    id: "USB-CH-771204",
    fullName: "Marc Hodel",
    email: "marc.hodel@example.ch",
    phone: "+41 22 730 51 11",
    countryName: "Switzerland",
    countryCode: "CH",
    region: "Zurich",
    accountType: "Private Wealth Multi-Currency",
    idType: "Swiss Identity Card / AHV-Nr.",
    idNumber: "756.9281.3304.12",
    status: "Pending",
    reviewNotes: "High-value cross-border account application submitted under Swiss FINMA AML protocol.",
    submittedAt: "Oct 20, 2026, 01:45 PM",
  },
];
