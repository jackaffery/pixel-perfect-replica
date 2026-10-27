import { useState, useEffect } from "react";
import {
  Users,
  CreditCard,
  ArrowRightLeft,
  ShieldAlert,
  Headset,
  BarChart3,
  History,
  Settings,
  Search,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  XCircle,
  X,
  Clock,
  Download,
  AlertCircle,
  Building2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  KeyRound,
  RefreshCw,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Laptop,
  Edit3,
  Menu,
  User,
  ArrowDownToLine,
  ArrowUpRight,
  TrendingUp,
  UserPlus,
  Send,
  HelpCircle,
  FolderPlus,
  UserMinus,
  Check,
  Home,
  HandCoins,
  ChevronDown,
  Network,
  PauseCircle,
  Trash2,
  Landmark,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MOCK_CUSTOMERS,
  MOCK_ADMIN_USERS,
  MOCK_ACCOUNTS,
  MOCK_TRANSACTIONS,
  MOCK_COMPLIANCE_REVIEWS,
  MOCK_SUPPORT_CASES,
  MOCK_ALERTS,
  MOCK_AUDIT_LOGS,
  INITIAL_BANK_APPLICATIONS,
  type BankApplication,
  type AdminCustomer,
  type AdminUserRecord,
  type BankAccountRecord,
  type BankTransactionRecord,
  type TransferStatusUpdate,
  type ComplianceReviewItem,
  type SupportCase,
  type OperationalAlert,
  type SoloAdminAuditEntry,
} from "./adminData";

export interface SoloAdminDashboardProps {
  onSignOut: () => void;
  adminUsername?: string;
  onOpenCustomerDashboard?: (customer: {
    name: string;
    id: string;
    linkedCustomerId: string;
    checkingBalance?: number | undefined;
    savingsBalance?: number | undefined;
    profilePicUrl?: string | undefined;
  }) => void;
}

export function SoloAdminDashboard({
  onSignOut,
  adminUsername = "Solo Master Administrator",
  onOpenCustomerDashboard,
}: SoloAdminDashboardProps) {
  // Navigation
  const [adminDisplayName, setAdminDisplayName] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("westside_admin_profile");
        if (saved) return JSON.parse(saved).name || "Master Bank Administrator";
      } catch {}
    }
    return "Master Bank Administrator";
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("westside_admin_profile");
        if (saved) return JSON.parse(saved).email || "admin@westsidebank.online";
      } catch {}
    }
    return "admin@westsidebank.online";
  });
  const [adminPhotoUrl, setAdminPhotoUrl] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("westside_admin_profile");
        if (saved) return JSON.parse(saved).photoUrl || "";
      } catch {}
    }
    return "";
  });
  const [activeSection, setActiveSection] = useState<
    | "overview"
    | "users"
    | "applications"
    | "customers"
    | "accounts"
    | "transactions"
    | "compliance"
    | "support"
    | "reports"
    | "audit"
    | "settings"
    | "deposits"
    | "loans"
    | "cards"
    | "irs"
    | "email-services"
  >("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Core State
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_users");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return MOCK_ADMIN_USERS;
  });

  const persistAdminUsers = (newUsers: AdminUserRecord[]) => {
    setAdminUsers(newUsers);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_users", JSON.stringify(newUsers));
      } catch (err) {
        console.error("Failed to persist admin users", err);
      }
    }
  };

  const [applications, setApplications] = useState<BankApplication[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_applications");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_BANK_APPLICATIONS;
  });

  const persistApplications = (newApps: BankApplication[]) => {
    setApplications(newApps);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_applications", JSON.stringify(newApps));
      } catch (err) {
        console.error("Failed to persist applications", err);
      }
    }
  };

  useEffect(() => {
    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === "us_finance_bank_applications" && e.newValue) {
        try {
          setApplications(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === "us_finance_bank_users" && e.newValue) {
        try {
          setAdminUsers(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === "us_finance_bank_alerts" && e.newValue) {
        try {
          setAlerts(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === "us_finance_bank_pending_profile_edits" && e.newValue) {
        try {
          setPendingProfileEdits(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, []);

  // Customer Profile Edit Requests state (submitted by customers in their account portal)
  const [pendingProfileEdits, setPendingProfileEdits] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_pending_profile_edits");
        return saved ? JSON.parse(saved) : [];
      } catch {}
    }
    return [];
  });

  const persistPendingProfileEdits = (newEdits: any[]) => {
    setPendingProfileEdits(newEdits);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_pending_profile_edits", JSON.stringify(newEdits));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Failed to persist pending profile edits", err);
      }
    }
  };
  const [customers, setCustomers] = useState<AdminCustomer[]>(MOCK_CUSTOMERS);
  const [accounts, setAccounts] = useState<BankAccountRecord[]>(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState<BankTransactionRecord[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_transactions");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return MOCK_TRANSACTIONS;
  });
  const [complianceReviews, setComplianceReviews] = useState<ComplianceReviewItem[]>(MOCK_COMPLIANCE_REVIEWS);
  const [supportCases, setSupportCases] = useState<SupportCase[]>(MOCK_SUPPORT_CASES);
  const [alerts, setAlerts] = useState<OperationalAlert[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_alerts");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return MOCK_ALERTS;
  });

  const persistAlerts = (newAlerts: OperationalAlert[]) => {
    setAlerts(newAlerts);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_alerts", JSON.stringify(newAlerts));
      } catch (err) {
        console.error("Failed to persist alerts", err);
      }
    }
  };
  const [auditLogs, setAuditLogs] = useState<SoloAdminAuditEntry[]>(MOCK_AUDIT_LOGS);

  // Transfer Status Management State
  const [transferStatusSelected, setTransferStatusSelected] = useState<"On hold" | "Processing" | "Completed">("Processing");
  const [transferStatusReason, setTransferStatusReason] = useState("");
  const [transferStatusError, setTransferStatusError] = useState("");

  // Selected Detail Modals
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [userEditModalOpen, setUserEditModalOpen] = useState(false);
  const [userEditForm, setUserEditForm] = useState<{
    name: string;
    phone: string;
    mailingAddress: string;
    profilePicUrl: string;
    communicationPreferences: {
      emailAlerts: boolean;
      smsNotifications: boolean;
      paperlessStatements: boolean;
      marketingUpdates: boolean;
    };
  }>({
    name: "",
    phone: "",
    mailingAddress: "",
    profilePicUrl: "",
    communicationPreferences: {
      emailAlerts: true,
      smsNotifications: true,
      paperlessStatements: true,
      marketingUpdates: false,
    },
  });
  const [newAdminNoteText, setNewAdminNoteText] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<BankAccountRecord | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<BankTransactionRecord | null>(null);
  const [selectedReview, setSelectedReview] = useState<ComplianceReviewItem | null>(null);
  const [selectedCase, setSelectedCase] = useState<SupportCase | null>(null);

  // Customer Profile Support Inspection State (Read-only, Admin Session Isolated, Audited)
  const [customerProfileInspectionUser, setCustomerProfileInspectionUser] = useState<AdminUserRecord | null>(null);
  const [profileAuthModalOpen, setProfileAuthModalOpen] = useState(false);
  const [pendingProfileInspectionUser, setPendingProfileInspectionUser] = useState<AdminUserRecord | null>(null);
  const [profileAuthReason, setProfileAuthReason] = useState("Customer requested account assistance & transfer verification");
  const [profileAuthError, setProfileAuthError] = useState("");

  // Password Reset Management States (One-time expiring links & Admin Reset Oversight)
  const [passwordResetConfirmUser, setPasswordResetConfirmUser] = useState<AdminUserRecord | null>(null);
  const [passwordResetConfirmMethod, setPasswordResetConfirmMethod] = useState<"Email" | "SMS">("Email");
  const [adminResetPasswordModalUser, setAdminResetPasswordModalUser] = useState<AdminUserRecord | null>(null);
  const [adminResetPasswordOption, setAdminResetPasswordOption] = useState<"link" | "enforce_next" | "revoke_sessions">("link");
  const [adminResetPasswordReason, setAdminResetPasswordReason] = useState("Customer account recovery and verified support request");
  const [adminResetPasswordError, setAdminResetPasswordError] = useState("");

  // Action / Confirmation States
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "United States",
    accountType: "Advantage Checking & Savings",
    initialBalance: "0.00",
    mailingAddress: "",
  });
  const [confirmActionModal, setConfirmActionModal] = useState<{
    title: string;
    description: string;
    confirmLabel: string;
    danger?: boolean;
    requiresReauth?: boolean;
    onConfirm: () => void;
  } | null>(null);
  const [actionReason, setActionReason] = useState("");
  const [actionNotification, setActionNotification] = useState("");

  // 17 Account Actions State
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [creditDebitModal, setCreditDebitModal] = useState<{
    type: "credit" | "debit";
    user: AdminUserRecord;
  } | null>(null);
  const [creditDebitAmount, setCreditDebitAmount] = useState("");
  const [creditDebitAccountType, setCreditDebitAccountType] = useState<"checking" | "savings">("checking");
  const [creditDebitDescription, setCreditDebitDescription] = useState("");

  const [generateTxModal, setGenerateTxModal] = useState<AdminUserRecord | null>(null);
  const [genTxType, setGenTxType] = useState<"Direct Deposit" | "Wire Transfer" | "Card Settlement" | "Bill Pay" | "Internal Transfer" | "ACH Debit">("Direct Deposit");
  const [genTxDirection, setGenTxDirection] = useState<"credit" | "debit">("credit");
  const [genTxAmount, setGenTxAmount] = useState("");
  const [genTxCounterparty, setGenTxCounterparty] = useState("");
  const [genTxStatus, setGenTxStatus] = useState<"Completed" | "Processing" | "On hold">("Completed");

  const [editBalanceModal, setEditBalanceModal] = useState<AdminUserRecord | null>(null);
  const [editCheckingAmount, setEditCheckingAmount] = useState("");
  const [editSavingsAmount, setEditSavingsAmount] = useState("");

  const [accountUsageLimitsModal, setAccountUsageLimitsModal] = useState<AdminUserRecord | null>(null);
  const [dailyTransferLimitInput, setDailyTransferLimitInput] = useState("50000");
  const [dailyWithdrawalLimitInput, setDailyWithdrawalLimitInput] = useState("10000");

  const [changeProfilePicModal, setChangeProfilePicModal] = useState<AdminUserRecord | null>(null);
  const [profilePicUrlInput, setProfilePicUrlInput] = useState("");

  const [sendEmailModal, setSendEmailModal] = useState<AdminUserRecord | null>(null);
  const [emailSubjectInput, setEmailSubjectInput] = useState("");
  const [emailMessageInput, setEmailMessageInput] = useState("");

  const [loginActivityModal, setLoginActivityModal] = useState<AdminUserRecord | null>(null);
  const [userToDeleteModal, setUserToDeleteModal] = useState<AdminUserRecord | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteConfirmChecked, setDeleteConfirmChecked] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [userToSuspendModal, setUserToSuspendModal] = useState<{
    user: AdminUserRecord;
    targetStatus: "Active" | "Suspended";
  } | null>(null);
  const [suspendReason, setSuspendReason] = useState("");

  const [editingUserRecord, setEditingUserRecord] = useState<AdminUserRecord | null>(null);
  const [editUserFormData, setEditUserFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    mailingAddress: string;
    onlineAccessStatus: AdminUserRecord["onlineAccessStatus"];
    verificationStatus: AdminUserRecord["verificationStatus"];
    editReason: string;
  }>({
    name: "",
    email: "",
    phone: "",
    mailingAddress: "",
    onlineAccessStatus: "Active",
    verificationStatus: "Verified",
    editReason: "",
  });

  // Applications Queue Management State
  const [appSearchQuery, setAppSearchQuery] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState<string>("all");
  const [selectedAppModal, setSelectedAppModal] = useState<BankApplication | null>(null);
  const [appDecisionModal, setAppDecisionModal] = useState<{
    app: BankApplication;
    decision: "Approved" | "Declined" | "Under Review";
  } | null>(null);
  const [appDecisionReason, setAppDecisionReason] = useState("");
  const [autoProvisionUser, setAutoProvisionUser] = useState(true);

  // Filters
  const [userFilterStatus, setUserFilterStatus] = useState("all");
  const [userFilterVerification, setUserFilterVerification] = useState("all");
  const [userFilterSearch, setUserFilterSearch] = useState("");
  const [userFilterDateSort, setUserFilterDateSort] = useState<"newest" | "oldest">("newest");
  const [customerFilterStatus, setCustomerFilterStatus] = useState("all");
  const [accountFilterType, setAccountFilterType] = useState("all");
  const [txFilterStatus, setTxFilterStatus] = useState("all");
  const [reviewFilterPriority, setReviewFilterPriority] = useState("all");
  const [caseFilterStatus, setCaseFilterStatus] = useState("all");
  const [auditFilterSection, setAuditFilterSection] = useState("all");
  const [reportDateRange, setReportDateRange] = useState("30d");

  // Re-authentication simulated prompt for high-risk settings
  const [reauthModalOpen, setReauthModalOpen] = useState(false);
  const [reauthPassword, setReauthPassword] = useState("");
  const [reauthError, setReauthError] = useState("");
  const [pendingSensitiveAction, setPendingSensitiveAction] = useState<(() => void) | null>(null);

  // Unmask sensitive info state
  const [unmaskedCustomerIds, setUnmaskedCustomerIds] = useState<Record<string, boolean>>({});

  // Helper to log administrative actions to append-only audit trail
  const appendAuditLog = (
    section: SoloAdminAuditEntry["section"],
    action: string,
    details: string,
    targetId?: string
  ) => {
    const entry: SoloAdminAuditEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      section,
      action,
      targetId: targetId ?? "",
      details,
      ipAddress: "127.0.0.1 (Secure Console)",
    };
    setAuditLogs((prev) => [entry, ...prev]);
    setActionNotification(`${action}: ${details}`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  // User Access Management Actions
  const handleUpdateUserOnlineAccess = (
    userId: string,
    newStatus: AdminUserRecord["onlineAccessStatus"],
    reason: string
  ) => {
    const user = adminUsers.find((u) => u.id === userId);
    if (!user) return;
    const oldStatus = user.onlineAccessStatus;

    const historyEntry = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      action: `Online Access Status changed to ${newStatus}`,
      previousState: oldStatus,
      newState: newStatus,
      reason: reason || "Administrative action executed by Staff Admin",
    };

    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              onlineAccessStatus: newStatus,
              security: {
                ...u.security,
                // If closing or suspending, wipe active sessions
                activeSessionsCount: newStatus === "Suspended" || newStatus === "Closed" ? 0 : u.security.activeSessionsCount,
              },
              accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
            }
          : u
      )
    );

    appendAuditLog(
      "Users",
      `User Access Changed: ${newStatus}`,
      `User: ${user.name} (${user.email}) | Previous: ${oldStatus} -> New: ${newStatus} | Reason: ${reason || "Solo admin discretion"}`,
      userId
    );

    setSelectedUser((prev) =>
      prev && prev.id === userId
        ? {
            ...prev,
            onlineAccessStatus: newStatus,
            security: {
              ...prev.security,
              activeSessionsCount: newStatus === "Suspended" || newStatus === "Closed" ? 0 : prev.security.activeSessionsCount,
            },
            accessChangeHistory: [historyEntry, ...prev.accessChangeHistory],
          }
        : prev
    );

    setConfirmActionModal(null);
    setActionReason("");
  };

  const handleForceUserSignOut = (userId: string, reason: string) => {
    const user = adminUsers.find((u) => u.id === userId);
    if (!user) return;

    const historyEntry = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      action: "Revoked All Active Web & Mobile Sessions",
      previousState: `${user.security.activeSessionsCount} active sessions`,
      newState: "0 active sessions",
      reason: reason || "Forced administrative revocation",
    };

    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              security: { ...u.security, activeSessionsCount: 0 },
              accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
            }
          : u
      )
    );

    appendAuditLog(
      "Users",
      "Revoked Active User Sessions",
      `User: ${user.name} | Terminated all active sessions (Previously ${user.security.activeSessionsCount}) | Reason: ${reason || "Session kill instruction"}`,
      userId
    );

    setSelectedUser((prev) =>
      prev && prev.id === userId
        ? {
            ...prev,
            security: { ...prev.security, activeSessionsCount: 0 },
            accessChangeHistory: [historyEntry, ...prev.accessChangeHistory],
          }
        : prev
    );

    setConfirmActionModal(null);
    setActionReason("");
  };

  const handleRequirePasswordReset = (userId: string, reason: string) => {
    const user = adminUsers.find((u) => u.id === userId);
    if (!user) return;

    const historyEntry = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      action: "Enforced Mandatory Password Reset on Next Login",
      previousState: user.security.passwordResetRequired ? "Reset Flagged" : "Standard",
      newState: "Reset Required",
      reason: reason || "Credential rotation policy triggered by Staff Admin",
    };

    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              security: { ...u.security, passwordResetRequired: true, activeSessionsCount: 0 },
              accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
            }
          : u
      )
    );

    appendAuditLog(
      "Users",
      "Mandated User Password Reset",
      `User: ${user.name} | Password reset flag set to TRUE, sessions killed. Reason: ${reason || "Security caution"}`,
      userId
    );

    setSelectedUser((prev) =>
      prev && prev.id === userId
        ? {
            ...prev,
            security: { ...prev.security, passwordResetRequired: true, activeSessionsCount: 0 },
            accessChangeHistory: [historyEntry, ...prev.accessChangeHistory],
          }
        : prev
    );

    setConfirmActionModal(null);
    setActionReason("");
  };

  const handleSaveUserProfileEdits = (userId: string) => {
    const user = adminUsers.find((u) => u.id === userId);
    if (!user) return;

    // Track field level diff for audit log
    const diffs: string[] = [];
    if (user.name !== userEditForm.name) {
      diffs.push(`Name: '${user.name}' -> '${userEditForm.name}'`);
    }
    if (user.phone !== userEditForm.phone) {
      diffs.push(`Phone: '${user.phone}' -> '${userEditForm.phone}'`);
    }
    if (user.mailingAddress !== userEditForm.mailingAddress) {
      diffs.push(`Address: '${user.mailingAddress}' -> '${userEditForm.mailingAddress}'`);
    }
    if ((user.profilePicUrl || "") !== (userEditForm.profilePicUrl || "")) {
      diffs.push(`Profile Picture changed`);
    }
    if (user.communicationPreferences.emailAlerts !== userEditForm.communicationPreferences.emailAlerts) {
      diffs.push(`Email Alerts: ${user.communicationPreferences.emailAlerts} -> ${userEditForm.communicationPreferences.emailAlerts}`);
    }
    if (user.communicationPreferences.smsNotifications !== userEditForm.communicationPreferences.smsNotifications) {
      diffs.push(`SMS: ${user.communicationPreferences.smsNotifications} -> ${userEditForm.communicationPreferences.smsNotifications}`);
    }
    if (user.communicationPreferences.paperlessStatements !== userEditForm.communicationPreferences.paperlessStatements) {
      diffs.push(`Paperless: ${user.communicationPreferences.paperlessStatements} -> ${userEditForm.communicationPreferences.paperlessStatements}`);
    }
    if (user.communicationPreferences.marketingUpdates !== userEditForm.communicationPreferences.marketingUpdates) {
      diffs.push(`Marketing: ${user.communicationPreferences.marketingUpdates} -> ${userEditForm.communicationPreferences.marketingUpdates}`);
    }

    if (diffs.length === 0) {
      setUserEditModalOpen(false);
      return;
    }

    const historyEntry = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      action: "Updated Permitted User Profile Details",
      previousState: "Previous profile snapshot",
      newState: diffs.join(" | "),
      reason: actionReason || "Administrative profile update requested/verified",
    };

    const updatedUsersList = adminUsers.map((u) =>
      u.id === userId
        ? {
            ...u,
            name: userEditForm.name,
            phone: userEditForm.phone,
            mailingAddress: userEditForm.mailingAddress,
            profilePicUrl: userEditForm.profilePicUrl,
            communicationPreferences: { ...userEditForm.communicationPreferences },
            accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
          }
        : u
    );

    persistAdminUsers(updatedUsersList);

    // Also update customer session and accounts if matching
    if (typeof window !== "undefined") {
      try {
        const sessRaw = localStorage.getItem("us_finance_bank_customer_session");
        if (sessRaw) {
          const sess = JSON.parse(sessRaw);
          if (sess.customerName === user.name || sess.linkedCustomerId === user.linkedCustomerId) {
            sess.customerName = userEditForm.name;
            sess.profilePicUrl = userEditForm.profilePicUrl;
            localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(sess));
          }
        }
      } catch {}
    }

    appendAuditLog(
      "Users",
      "Updated User Profile Fields",
      `User: ${user.name} (${userId}) | Changes: ${diffs.join("; ")} | Justification: ${actionReason || "Verified documentation"}`,
      userId
    );

    setSelectedUser((prev) =>
      prev && prev.id === userId
        ? {
            ...prev,
            name: userEditForm.name,
            phone: userEditForm.phone,
            mailingAddress: userEditForm.mailingAddress,
            profilePicUrl: userEditForm.profilePicUrl,
            communicationPreferences: { ...userEditForm.communicationPreferences },
            accessChangeHistory: [historyEntry, ...prev.accessChangeHistory],
          }
        : prev
    );

    setActionNotification(`Changes saved for ${userEditForm.name}.`);
    setTimeout(() => setActionNotification(""), 4000);

    setUserEditModalOpen(false);
    setActionReason("");
  };

  // Staff Admin Approval or Rejection of Customer Profile Edit Requests
  const handleApproveCustomerProfileEdit = (requestId: string, approve: boolean, adminReason: string) => {
    const targetReq = pendingProfileEdits.find((r) => r.id === requestId);
    if (!targetReq) return;

    if (approve) {
      // Find matching user record in adminUsers
      const updatedAdminUsers = adminUsers.map((u) => {
        if (
          u.name.toLowerCase() === targetReq.customerName.toLowerCase() ||
          u.email.toLowerCase() === targetReq.currentEmail.toLowerCase()
        ) {
          const historyEntry = {
            id: `HIS-${Date.now().toString().slice(-4)}`,
            timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            actor: "Staff Admin",
            action: targetReq.requestedProfilePicUrl
              ? "Customer Profile Photo & Details Approved"
              : "Customer Profile Self-Edit Request Approved",
            previousState: `Name: ${u.name}, Phone: ${u.phone}, Email: ${u.email}`,
            newState: `Name: ${targetReq.requestedName}, Phone: ${targetReq.requestedPhone}, Email: ${targetReq.requestedEmail}${targetReq.requestedProfilePicUrl ? " (Photo Updated)" : ""}`,
            reason: adminReason || "Verified customer identity and approved profile edit",
          };
          return {
            ...u,
            name: targetReq.requestedName || u.name,
            email: targetReq.requestedEmail || u.email,
            phone: targetReq.requestedPhone || u.phone,
            mailingAddress: targetReq.requestedAddress || u.mailingAddress,
            profilePicUrl: targetReq.requestedProfilePicUrl || u.profilePicUrl,
            accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
          };
        }
        return u;
      });

      persistAdminUsers(updatedAdminUsers);

      // If active customer session in localStorage matches, update it too
      if (typeof window !== "undefined") {
        try {
          const sessRaw = localStorage.getItem("us_finance_bank_customer_session");
          if (sessRaw) {
            const sess = JSON.parse(sessRaw);
            if (
              sess.customerName?.toLowerCase() === targetReq.customerName.toLowerCase() ||
              sess.email?.toLowerCase() === targetReq.currentEmail.toLowerCase()
            ) {
              sess.customerName = targetReq.requestedName || sess.customerName;
              sess.email = targetReq.requestedEmail || sess.email;
              if (targetReq.requestedProfilePicUrl) {
                sess.profilePicUrl = targetReq.requestedProfilePicUrl;
              }
              localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(sess));
            }
          }
        } catch {}
      }

      appendAuditLog(
        "Users",
        "Approved Customer Profile Edit",
        `Request ${requestId} for ${targetReq.customerName}: New Name '${targetReq.requestedName}', Email '${targetReq.requestedEmail}', Phone '${targetReq.requestedPhone}'. Staff Admin Reason: ${adminReason || "Approved after review"}`,
        requestId
      );
      setActionNotification(`Customer profile edit request #${requestId} APPROVED and applied to live account.`);
    } else {
      appendAuditLog(
        "Users",
        "Rejected Customer Profile Edit",
        `Request ${requestId} for ${targetReq.customerName} rejected by Staff Admin. Reason: ${adminReason || "Documentation not accepted"}`,
        requestId
      );
      setActionNotification(`Customer profile edit request #${requestId} DECLINED.`);
    }

    // Update pending edits status
    const updatedEdits = pendingProfileEdits.map((r) =>
      r.id === requestId
        ? {
            ...r,
            status: approve ? "Approved" : "Rejected",
            reviewedAt: "Today, Just now",
            reviewedBy: "Staff Admin",
            reviewNote: adminReason,
          }
        : r
    );
    persistPendingProfileEdits(updatedEdits);
    setTimeout(() => setActionNotification(""), 6000);
  };

  const handleAddInternalAdminNote = (userId: string) => {
    if (!newAdminNoteText.trim()) return;
    const note = `[${new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} - Staff Admin]: ${newAdminNoteText.trim()}`;

    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              adminNotes: [note, ...u.adminNotes],
            }
          : u
      )
    );

    appendAuditLog("Users", "Appended Internal Admin Note", `Note added to user record: "${newAdminNoteText.trim()}"`, userId);

    setSelectedUser((prev) =>
      prev && prev.id === userId
        ? {
            ...prev,
            adminNotes: [note, ...prev.adminNotes],
          }
        : prev
    );

    setNewAdminNoteText("");
  };

  // Safe User Provisioning with Audit Trail
  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name.trim() || !newUserData.email.trim()) return;

    const newId = `USB-USR-${Math.floor(100000 + Math.random() * 900000)}`;
    const linkedCustId = `CUST-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: AdminUserRecord = {
      id: newId,
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      phone: newUserData.phone.trim() || "+1 (555) 000-0000",
      mailingAddress: newUserData.mailingAddress.trim() || "100 Financial Way, Suite 400, New York, NY 10005",
      linkedCustomerId: linkedCustId,
      onlineAccessStatus: "Active",
      verificationStatus: "Verified",
      dateJoined: new Date().toISOString().slice(0, 10),
      displayDateJoined: "Today, " + new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
      security: {
        twoFactorEnabled: false,
        activeSessionsCount: 1,
        lastSignIn: "Just now",
        lastSignInIp: "127.0.0.1",
        passwordResetRequired: false,
      },
      communicationPreferences: {
        emailAlerts: true,
        smsNotifications: true,
        paperlessStatements: true,
        marketingUpdates: false,
      },
      adminNotes: [
        `[${new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} - Staff Admin]: Account registered through Staff Admin dashboard.`
      ],
      accessChangeHistory: [
        {
          id: `HIS-${Date.now().toString().slice(-4)}`,
          timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          actor: "Staff Admin",
          action: "Provisioned New User Account",
          previousState: "None",
          newState: "Active Online Access",
          reason: "Direct administrative registration",
        }
      ],
    };

    const updatedUsers = [newRecord, ...adminUsers];
    persistAdminUsers(updatedUsers);

    // Also provision customer profile and bank accounts so the user can immediately access their dashboard
    const newCust: AdminCustomer = {
      id: linkedCustId,
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      phone: newUserData.phone.trim() || "+1 (555) 000-0000",
      country: newUserData.country || "United States",
      countryCode: newUserData.country === "United Kingdom" ? "GB" : newUserData.country === "Canada" ? "CA" : "US",
      verificationStatus: "Verified",
      riskLevel: "Low",
      status: "Active",
      idType: "Government Photo ID (Staff Registered)",
      idNumberMasked: "••••" + Math.floor(1000 + Math.random() * 9000),
      address: newUserData.mailingAddress.trim() || "100 Financial Way, Suite 400, New York, NY",
      joinedDate: "Today",
      adminNotes: "Customer provisioned directly through Staff Solo Admin console.",
      linkedAccountIds: [`ACC-${newId.slice(-4)}-1`],
    };
    const updatedCusts = [newCust, ...customers];
    setCustomers(updatedCusts);
    try {
      localStorage.setItem("us_finance_bank_customers", JSON.stringify(updatedCusts));
    } catch {}

    const initBal = parseFloat(newUserData.initialBalance || "0") || 0;
    const newAcc: BankAccountRecord = {
      id: `ACC-${newId.slice(-4)}-1`,
      customerId: linkedCustId,
      customerName: newUserData.name.trim(),
      accountType:
        newUserData.accountType === "High-Yield Savings" ||
        newUserData.accountType === "Treasury Money Market" ||
        newUserData.accountType === "Commercial Operations"
          ? newUserData.accountType
          : "Advantage Checking",
      accountNumberMasked: `••••••••${Math.floor(1000 + Math.random() * 9000)}`,
      routingNumber: "021000089",
      currency: newUserData.country === "United Kingdom" ? "GBP" : newUserData.country === "Germany" ? "EUR" : "USD",
      balance: initBal,
      availableBalance: initBal,
      status: "Active",
      openedDate: "Today",
      lastActivity: "Just now",
    };
    const updatedAccs = [newAcc, ...accounts];
    setAccounts(updatedAccs);
    try {
      localStorage.setItem("us_finance_bank_accounts", JSON.stringify(updatedAccs));
    } catch {}

    // Synchronize to controlled users pool for home page login
    try {
      const controlledRaw = localStorage.getItem("us_finance_bank_controlled_users");
      const list = controlledRaw ? JSON.parse(controlledRaw) : [];
      const controlledUserObj = {
        id: newId,
        name: newUserData.name.trim(),
        email: newUserData.email.trim().toLowerCase(),
        phone: newUserData.phone.trim() || "+1 (555) 000-0000",
        country: newUserData.country || "United States",
        countryCode: "US",
        accountType: newUserData.accountType || "Advantage Checking",
        checkingBalance: initBal,
        savingsBalance: 0,
        status: "active",
        idType: "Government Photo ID",
        idNumber: "••••••••",
        createdAt: "Today",
      };
      localStorage.setItem("us_finance_bank_controlled_users", JSON.stringify([controlledUserObj, ...list]));
    } catch {}

    appendAuditLog(
      "Users",
      "Created User Record",
      `Administrator safely provisioned new user record for ${newRecord.name} (${newRecord.email}) with initial status Active and funded balance $${initBal.toFixed(2)}.`,
      newId
    );
    setCreateUserModalOpen(false);
    setSelectedUser(newRecord);
    setActiveSection("users");
    setActionNotification(`User record for ${newRecord.name} created successfully.`);
    setTimeout(() => setActionNotification(""), 5000);
    setNewUserData({
      name: "",
      email: "",
      phone: "",
      country: "United States",
      accountType: "Advantage Checking & Savings",
      initialBalance: "0.00",
      mailingAddress: "",
    });
  };

  // Open Customer Profile in Support Mode (Strict Authorization & Activity History Log)
  const handleInitiateOpenCustomerProfile = (user: AdminUserRecord) => {
    // Record profile access in the admin activity history
    appendAuditLog(
      "Users",
      "Authorized Administrator Support Session",
      `Staff Admin (${adminUsername}) initiated support session and logged into customer main bank account profile dashboard for ${user.name} (${user.id}, ${user.linkedCustomerId}) automatically. Impersonation/credentials bypassed.`,
      user.id
    );

    if (onOpenCustomerDashboard) {
      const userAccounts = accounts.filter((a) => a.customerId === user.linkedCustomerId);
      const checkingAcc = userAccounts.find((a) => a.accountType.toLowerCase().includes("checking"));
      const savingsAcc = userAccounts.find((a) => a.accountType.toLowerCase().includes("savings"));
      onOpenCustomerDashboard({
        name: user.name,
        id: user.id,
        linkedCustomerId: user.linkedCustomerId,
        checkingBalance: checkingAcc?.balance,
        savingsBalance: savingsAcc?.balance,
        profilePicUrl: user.profilePicUrl,
      });
      return;
    }

    setPendingProfileInspectionUser(user);
    setProfileAuthReason("Customer requested account assistance & transfer verification");
    setProfileAuthError("");
    setProfileAuthModalOpen(true);
  };

  const handleConfirmAuthorizeCustomerProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!profileAuthReason.trim()) {
      setProfileAuthError("Please provide an official support authorization reason.");
      return;
    }
    if (!pendingProfileInspectionUser) return;

    // Record profile access in the admin activity history
    appendAuditLog(
      "Users",
      "Opened Customer Profile for Support",
      `Staff Admin (${adminUsername}) authorized support inspection of customer account page for ${pendingProfileInspectionUser.name} (User ID: ${pendingProfileInspectionUser.id}, Customer Link: ${pendingProfileInspectionUser.linkedCustomerId}). Reason: "${profileAuthReason.trim()}". Admin session isolated; impersonation, password viewing, and fund transfers are prohibited.`,
      pendingProfileInspectionUser.id
    );

    setCustomerProfileInspectionUser(pendingProfileInspectionUser);
    setProfileAuthModalOpen(false);
    setPendingProfileInspectionUser(null);
  };

  // Dispatch One-Time Password Reset Link (via SMS or Email based on preferences)
  const handleConfirmSendPasswordResetLink = (user: AdminUserRecord, method: "Email" | "SMS") => {
    const destination = method === "Email" ? user.email : user.phone;
    appendAuditLog(
      "Users",
      "Dispatched One-Time Password Reset Link",
      `Staff Admin (${adminUsername}) dispatched 15-minute one-time password reset link to ${user.name} (${user.id}) via ${method} (${destination}). Passwords are never sent by text or email, and administrators cannot view customer passwords.`,
      user.id
    );

    setPasswordResetConfirmUser(null);
    setActionNotification(`One-time password reset link safely dispatched to ${user.name} via ${method}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  // Reset Customer Password from Admin Dashboard
  const handleExecuteAdminPasswordReset = (
    user: AdminUserRecord,
    option: "link" | "enforce_next" | "revoke_sessions",
    reason: string
  ) => {
    if (!reason.trim()) {
      setAdminResetPasswordError("Please enter an official audit justification for this credential reset.");
      return;
    }

    if (option === "enforce_next") {
      setAdminUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                security: {
                  ...u.security,
                  passwordResetRequired: true,
                },
              }
            : u
        )
      );
    } else if (option === "revoke_sessions") {
      setAdminUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                security: {
                  ...u.security,
                  activeSessionsCount: 0,
                  passwordResetRequired: true,
                },
              }
            : u
        )
      );
    }

    appendAuditLog(
      "Users",
      "Reset Customer Password",
      `Staff Admin (${adminUsername}) executed password reset for ${user.name} (${user.id}). Action: ${
        option === "link"
          ? "Sent One-Time 15-minute Reset Link"
          : option === "enforce_next"
          ? "Enforced Mandatory Password Reset on Next Login"
          : "Revoked Active Sessions & Enforced Credential Reset"
      }. Justification: "${reason.trim()}". Administrator did not view or set password directly.`,
      user.id
    );

    setAdminResetPasswordModalUser(null);
    setAdminResetPasswordReason("");
    setAdminResetPasswordError("");
    setActionNotification(`Customer password reset action successfully applied to ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  // Safe User Deletion with Audit Trail & Safeguard Review
  const handleDeleteUser = (userId: string, reason: string) => {
    const userToDelete = adminUsers.find((u) => u.id === userId);
    if (!userToDelete) return;

    const updated = adminUsers.filter((u) => u.id !== userId);
    persistAdminUsers(updated);
    appendAuditLog(
      "Users",
      "Deleted User Record",
      `Administrator permanently deleted individual user record for ${userToDelete.name} (${userToDelete.email}, ID: ${userToDelete.id}). Justification: ${reason || "Administrative user deletion policy"}`,
      userId
    );
    setSelectedUser(null);
    setUserToDeleteModal(null);
    setActionNotification(`Individual user record for ${userToDelete.name} successfully deleted.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  // Safe Execute Deletion from Confirmation Safeguard Modal
  const handleExecuteDeleteUser = () => {
    if (!userToDeleteModal) return;
    if (!deleteReason.trim() || deleteReason.trim().length < 5) {
      setDeleteError("A detailed administrative justification (minimum 5 characters) is required.");
      return;
    }
    if (!deleteConfirmChecked) {
      setDeleteError("You must verify the checkbox confirmation before proceeding.");
      return;
    }

    const targetUser = userToDeleteModal;
    const updated = adminUsers.filter((u) => u.id !== targetUser.id);
    persistAdminUsers(updated);

    appendAuditLog(
      "Users",
      "Permanently Deleted User Account",
      `Administrator permanently deleted individual user account for ${targetUser.name} (${targetUser.email}, ID: ${targetUser.id}). Justification: ${deleteReason.trim()}`,
      targetUser.id
    );

    setUserToDeleteModal(null);
    setSelectedUser(null);
    setDeleteReason("");
    setDeleteConfirmChecked(false);
    setDeleteError("");
    setActionNotification(`User record for ${targetUser.name} (${targetUser.id}) has been permanently deleted and logged.`);
    setTimeout(() => setActionNotification(""), 6000);
  };

  // Execute User Suspend / Reinstate Toggle with Reason
  const handleExecuteSuspendUser = () => {
    if (!userToSuspendModal) return;
    const { user, targetStatus } = userToSuspendModal;
    const reason = suspendReason.trim() || (targetStatus === "Suspended" ? "Administrative safety freeze" : "Administrative access reinstatement");

    const historyEntry = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      action: `Online Access Status changed to ${targetStatus}`,
      previousState: user.onlineAccessStatus,
      newState: targetStatus,
      reason,
    };

    const updatedUsers = adminUsers.map((u) =>
      u.id === user.id
        ? {
            ...u,
            onlineAccessStatus: targetStatus,
            accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
          }
        : u
    );

    persistAdminUsers(updatedUsers);

    appendAuditLog(
      "Users",
      targetStatus === "Suspended" ? "Suspended User Access" : "Reinstated User Access",
      `Online access for ${user.name} (${user.id}) changed to ${targetStatus}. Justification: ${reason}`,
      user.id
    );

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) => (prev ? { ...prev, onlineAccessStatus: targetStatus } : null));
    }

    setUserToSuspendModal(null);
    setSuspendReason("");
    setActionNotification(`Access for ${user.name} successfully updated to ${targetStatus}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  // Execute User Profile Edit with Diff Audit Log
  const handleSaveEditUser = () => {
    if (!editingUserRecord) return;
    if (!editUserFormData.editReason.trim()) {
      alert("Please provide an administrative reason for editing this user profile.");
      return;
    }

    const targetUser = editingUserRecord;
    const diffs: string[] = [];
    if (editUserFormData.name !== targetUser.name) diffs.push(`Name: ${targetUser.name} → ${editUserFormData.name}`);
    if (editUserFormData.email !== targetUser.email) diffs.push(`Email: ${targetUser.email} → ${editUserFormData.email}`);
    if (editUserFormData.phone !== targetUser.phone) diffs.push(`Phone: ${targetUser.phone} → ${editUserFormData.phone}`);
    if (editUserFormData.mailingAddress !== targetUser.mailingAddress) diffs.push(`Address: ${targetUser.mailingAddress} → ${editUserFormData.mailingAddress}`);
    if (editUserFormData.onlineAccessStatus !== targetUser.onlineAccessStatus) diffs.push(`Access: ${targetUser.onlineAccessStatus} → ${editUserFormData.onlineAccessStatus}`);
    if (editUserFormData.verificationStatus !== targetUser.verificationStatus) diffs.push(`KYC: ${targetUser.verificationStatus} → ${editUserFormData.verificationStatus}`);

    const historyEntry = {
      id: `HIS-${Date.now().toString().slice(-4)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      actor: "Staff Admin",
      action: "Profile Record Edited",
      previousState: "Previous profile snapshot",
      newState: diffs.join(" | ") || "Minor profile update",
      reason: editUserFormData.editReason,
    };

    const updatedUsers = adminUsers.map((u) =>
      u.id === targetUser.id
        ? {
            ...u,
            name: editUserFormData.name,
            email: editUserFormData.email,
            phone: editUserFormData.phone,
            mailingAddress: editUserFormData.mailingAddress,
            onlineAccessStatus: editUserFormData.onlineAccessStatus,
            verificationStatus: editUserFormData.verificationStatus,
            accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
          }
        : u
    );

    persistAdminUsers(updatedUsers);

    appendAuditLog(
      "Users",
      "Edited User Record",
      `Updated user profile for ${editUserFormData.name} (${targetUser.id}). Changes: ${diffs.join(", ") || "General profile update"}. Reason: ${editUserFormData.editReason}`,
      targetUser.id
    );

    if (selectedUser?.id === targetUser.id) {
      setSelectedUser((prev) =>
        prev
          ? {
              ...prev,
              name: editUserFormData.name,
              email: editUserFormData.email,
              phone: editUserFormData.phone,
              mailingAddress: editUserFormData.mailingAddress,
              onlineAccessStatus: editUserFormData.onlineAccessStatus,
              verificationStatus: editUserFormData.verificationStatus,
            }
          : null
      );
    }

    setEditingUserRecord(null);
    setActionNotification(`Profile for ${editUserFormData.name} (${targetUser.id}) updated and recorded.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  // 17 Account Actions Handlers
  const handleExecuteCreditDebit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!creditDebitModal) return;
    const amt = parseFloat(creditDebitAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }
    const user = creditDebitModal.user;
    const isCredit = creditDebitModal.type === "credit";
    const accTypeLabel = creditDebitAccountType === "checking" ? "Advantage Checking" : "High-Yield Savings";

    // Adjust user accounts
    let targetAcc = accounts.find(
      (a) => a.customerId === user.linkedCustomerId && a.accountType.toLowerCase().includes(creditDebitAccountType)
    );
    if (!targetAcc) {
      targetAcc = accounts.find((a) => a.customerId === user.linkedCustomerId) || accounts[0];
    }

    let finalNewBal = 0;
    if (targetAcc) {
      finalNewBal = isCredit ? targetAcc.balance + amt : Math.max(0, targetAcc.balance - amt);
      const updatedAccounts = accounts.map((a) =>
        a.id === targetAcc!.id
          ? { ...a, balance: finalNewBal, availableBalance: finalNewBal, lastActivity: "Today, Just now" }
          : a
      );
      setAccounts(updatedAccounts);
      try {
        localStorage.setItem("us_finance_bank_accounts", JSON.stringify(updatedAccounts));
      } catch {}
    }

    // Sync active customer session and controlled users so balance immediately updates everywhere
    if (typeof window !== "undefined") {
      try {
        // Update customer session if this user is signed into customer portal
        const sessRaw = localStorage.getItem("us_finance_bank_customer_session");
        if (sessRaw) {
          const sess = JSON.parse(sessRaw);
          if (
            sess.customerName?.toLowerCase() === user.name.toLowerCase() ||
            sess.linkedCustomerId === user.linkedCustomerId
          ) {
            if (creditDebitAccountType === "checking") {
              sess.checkingBalance = finalNewBal;
            } else {
              sess.savingsBalance = finalNewBal;
            }
            localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(sess));
          }
        }

        // Update controlled users registry
        const ctrlRaw = localStorage.getItem("us_finance_bank_controlled_users");
        if (ctrlRaw) {
          const ctrlList = JSON.parse(ctrlRaw);
          if (Array.isArray(ctrlList)) {
            const updatedCtrl = ctrlList.map((c: any) => {
              if (c.name?.toLowerCase() === user.name.toLowerCase() || c.id === user.id) {
                return {
                  ...c,
                  checkingBalance: creditDebitAccountType === "checking" ? finalNewBal : c.checkingBalance,
                  savingsBalance: creditDebitAccountType === "savings" ? finalNewBal : c.savingsBalance,
                };
              }
              return c;
            });
            localStorage.setItem("us_finance_bank_controlled_users", JSON.stringify(updatedCtrl));
          }
        }

        // Send Email and SMS notification to customer with verification code / alert
        const alertCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existingDispatches = localStorage.getItem("westside_email_dispatch_log");
        const dispatchesList = existingDispatches ? JSON.parse(existingDispatches) : [];
        const timeNow = "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        dispatchesList.unshift({
          id: `DISP-${Date.now()}`,
          to: user.email || `${user.name.toLowerCase().replace(/\s+/g, ".")}@westsidebank.online`,
          phone: user.phone || "+1 (555) 019-2834",
          subject: `${isCredit ? "Credit Alert" : "Debit Alert"}: $${amt.toFixed(2)} ${isCredit ? "Credited to" : "Debited from"} ${accTypeLabel}`,
          sms: `WSB ${isCredit ? "Credit" : "Debit"} Notice: $${amt.toFixed(2)} was ${isCredit ? "credited to" : "debited from"} your ${accTypeLabel}. New Balance: $${finalNewBal.toFixed(2)}. Auth Ref Code: ${alertCode}.`,
          timestamp: timeNow,
          status: "Delivered (Live Relay)",
        });
        localStorage.setItem("westside_email_dispatch_log", JSON.stringify(dispatchesList.slice(0, 50)));

        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Error syncing customer session on credit/debit", err);
      }
    }

    // Create realistic transaction ledger record
    const newTx: BankTransactionRecord = {
      id: `TX-${Date.now().toString().slice(-6)}`,
      accountId: targetAcc ? targetAcc.id : "ACC-101",
      accountMasked: targetAcc ? targetAcc.accountNumberMasked : "•••• 4892",
      customerId: user.linkedCustomerId,
      customerName: user.name,
      type: isCredit ? "Direct Deposit" : "ACH Debit",
      amount: amt,
      currency: "USD",
      direction: isCredit ? "credit" : "debit",
      counterparty: creditDebitDescription.trim() || (isCredit ? "Administrative Credit Provision" : "Administrative Account Debit"),
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Completed",
      transferStatus: "Completed",
    };

    const nextTxs = [newTx, ...transactions];
    setTransactions(nextTxs);
    try {
      localStorage.setItem("us_finance_bank_transactions", JSON.stringify(nextTxs));
    } catch {}

    appendAuditLog(
      "Accounts",
      `${isCredit ? "Credit" : "Debit"} Account Applied`,
      `${isCredit ? "Credited" : "Debited"} $${amt.toFixed(2)} to ${accTypeLabel} for ${user.name} (${user.id}). Note: ${creditDebitDescription || "Admin action"}`,
      user.id
    );

    setActionNotification(`Successfully ${isCredit ? "credited" : "debited"} $${amt.toFixed(2)} for ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
    setCreditDebitModal(null);
    setCreditDebitAmount("");
    setCreditDebitDescription("");
  };

  const handleExecuteGenerateTransaction = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!generateTxModal) return;
    const amt = parseFloat(genTxAmount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    const user = generateTxModal;
    const userAcc = accounts.find((a) => a.customerId === user.linkedCustomerId) || accounts[0];

    const newTx: BankTransactionRecord = {
      id: `TX-${Date.now().toString().slice(-6)}`,
      accountId: userAcc ? userAcc.id : "ACC-GEN",
      accountMasked: userAcc ? userAcc.accountNumberMasked : "•••• 4892",
      customerId: user.linkedCustomerId,
      customerName: user.name,
      type: genTxType,
      amount: amt,
      currency: "USD",
      direction: genTxDirection,
      counterparty: genTxCounterparty.trim() || "Generated Transaction",
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: genTxStatus,
      transferStatus: genTxStatus,
    };

    // If completed and credit/debit, adjust account
    let finalGenBal = 0;
    if (userAcc && genTxStatus === "Completed") {
      finalGenBal = genTxDirection === "credit" ? userAcc.balance + amt : Math.max(0, userAcc.balance - amt);
      const updatedAccounts = accounts.map((a) =>
        a.id === userAcc.id ? { ...a, balance: finalGenBal, availableBalance: finalGenBal } : a
      );
      setAccounts(updatedAccounts);
      try {
        localStorage.setItem("us_finance_bank_accounts", JSON.stringify(updatedAccounts));
      } catch {}

      if (typeof window !== "undefined") {
        try {
          const sessRaw = localStorage.getItem("us_finance_bank_customer_session");
          if (sessRaw) {
            const sess = JSON.parse(sessRaw);
            if (
              sess.customerName?.toLowerCase() === user.name.toLowerCase() ||
              sess.linkedCustomerId === user.linkedCustomerId
            ) {
              if (userAcc.accountType.toLowerCase().includes("savings")) {
                sess.savingsBalance = finalGenBal;
              } else {
                sess.checkingBalance = finalGenBal;
              }
              localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(sess));
            }
          }
          window.dispatchEvent(new Event("storage"));
        } catch {}
      }
    }

    const nextTxs = [newTx, ...transactions];
    setTransactions(nextTxs);
    try {
      localStorage.setItem("us_finance_bank_transactions", JSON.stringify(nextTxs));
    } catch {}

    appendAuditLog(
      "Transactions",
      "Administrative Transaction Generated",
      `Generated ${genTxType} of $${amt.toFixed(2)} (${genTxDirection}) for ${user.name} (${user.id}). Counterparty: ${genTxCounterparty || "N/A"}. Status: ${genTxStatus}`,
      user.id
    );

    setActionNotification(`Generated transaction ${newTx.id} of $${amt.toFixed(2)} for ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
    setGenerateTxModal(null);
    setGenTxAmount("");
    setGenTxCounterparty("");
  };

  const handleExecuteEditBalance = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editBalanceModal) return;
    const checkAmt = parseFloat(editCheckingAmount);
    const savAmt = parseFloat(editSavingsAmount);
    if (isNaN(checkAmt) || isNaN(savAmt)) {
      alert("Please enter valid numeric balance amounts.");
      return;
    }
    const user = editBalanceModal;

    const updatedAccounts = accounts.map((a) => {
      if (a.customerId === user.linkedCustomerId) {
        if (a.accountType.toLowerCase().includes("checking")) {
          return { ...a, balance: checkAmt, availableBalance: checkAmt };
        }
        if (a.accountType.toLowerCase().includes("savings")) {
          return { ...a, balance: savAmt, availableBalance: savAmt };
        }
      }
      return a;
    });

    setAccounts(updatedAccounts);
    try {
      localStorage.setItem("us_finance_bank_accounts", JSON.stringify(updatedAccounts));
    } catch {}

    // Sync active customer session and controlled users so customer sees updated balance immediately
    if (typeof window !== "undefined") {
      try {
        const sessRaw = localStorage.getItem("us_finance_bank_customer_session");
        if (sessRaw) {
          const sess = JSON.parse(sessRaw);
          if (
            sess.customerName?.toLowerCase() === user.name.toLowerCase() ||
            sess.linkedCustomerId === user.linkedCustomerId
          ) {
            sess.checkingBalance = checkAmt;
            sess.savingsBalance = savAmt;
            localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(sess));
          }
        }

        const ctrlRaw = localStorage.getItem("us_finance_bank_controlled_users");
        if (ctrlRaw) {
          const ctrlList = JSON.parse(ctrlRaw);
          if (Array.isArray(ctrlList)) {
            const updatedCtrl = ctrlList.map((c: any) => {
              if (c.name?.toLowerCase() === user.name.toLowerCase() || c.id === user.id) {
                return { ...c, checkingBalance: checkAmt, savingsBalance: savAmt };
              }
              return c;
            });
            localStorage.setItem("us_finance_bank_controlled_users", JSON.stringify(updatedCtrl));
          }
        }

        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Error syncing customer session on balance edit", err);
      }
    }

    appendAuditLog(
      "Accounts",
      "Direct Balance Edit Applied",
      `Edited ledger balances for ${user.name} (${user.id}): Checking $${checkAmt.toFixed(2)}, Savings $${savAmt.toFixed(2)}.`,
      user.id
    );

    setActionNotification(`Balances updated for ${user.name}: Checking $${checkAmt.toFixed(2)}, Savings $${savAmt.toFixed(2)}.`);
    setTimeout(() => setActionNotification(""), 5000);
    setEditBalanceModal(null);
  };

  const handleExecuteSaveLimits = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!accountUsageLimitsModal) return;
    const transferLim = parseFloat(dailyTransferLimitInput);
    const withdrawLim = parseFloat(dailyWithdrawalLimitInput);
    if (isNaN(transferLim) || isNaN(withdrawLim)) {
      alert("Please enter valid numeric limits.");
      return;
    }
    const user = accountUsageLimitsModal;

    const updatedUsers = adminUsers.map((u) =>
      u.id === user.id
        ? { ...u, dailyTransferLimit: transferLim, dailyWithdrawalLimit: withdrawLim }
        : u
    );
    persistAdminUsers(updatedUsers);

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) =>
        prev ? { ...prev, dailyTransferLimit: transferLim, dailyWithdrawalLimit: withdrawLim } : null
      );
    }

    appendAuditLog(
      "Users",
      "Account Usage Limits Updated",
      `Set daily transfer limit to $${transferLim.toLocaleString()} and withdrawal limit to $${withdrawLim.toLocaleString()} for ${user.name} (${user.id}).`,
      user.id
    );

    setActionNotification(`Updated usage limits for ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
    setAccountUsageLimitsModal(null);
  };

  const handleToggleTwoFactorAction = (user: AdminUserRecord) => {
    const nextState = !user.security.twoFactorEnabled;
    const updatedUsers = adminUsers.map((u) =>
      u.id === user.id ? { ...u, security: { ...u.security, twoFactorEnabled: nextState } } : u
    );
    persistAdminUsers(updatedUsers);

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) =>
        prev ? { ...prev, security: { ...prev.security, twoFactorEnabled: nextState } } : null
      );
    }

    appendAuditLog(
      "Users",
      "Two-Factor Authentication Toggled",
      `Staff Admin ${nextState ? "Enabled" : "Disabled"} 2FA for ${user.name} (${user.id}).`,
      user.id
    );

    setActionNotification(`2FA for ${user.name} is now ${nextState ? "Enabled" : "Disabled"}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  const handleExecuteSaveProfilePic = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!changeProfilePicModal) return;
    const user = changeProfilePicModal;
    const url = profilePicUrlInput.trim();

    const updatedUsers = adminUsers.map((u) =>
      u.id === user.id ? { ...u, profilePicUrl: url } : u
    );
    persistAdminUsers(updatedUsers);

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) => (prev ? { ...prev, profilePicUrl: url } : null));
    }

    appendAuditLog(
      "Users",
      "Profile Picture Updated",
      `Updated profile picture avatar for ${user.name} (${user.id}).`,
      user.id
    );

    setActionNotification(`Profile picture updated for ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
    setChangeProfilePicModal(null);
    setProfilePicUrlInput("");
  };

  const handleToggleDormantAction = (user: AdminUserRecord) => {
    const nextDormant = !user.isDormant;
    const updatedUsers = adminUsers.map((u) =>
      u.id === user.id ? { ...u, isDormant: nextDormant } : u
    );
    persistAdminUsers(updatedUsers);

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) => (prev ? { ...prev, isDormant: nextDormant } : null));
    }

    appendAuditLog(
      "Users",
      nextDormant ? "Account Marked Dormant" : "Dormant Account Re-Activated",
      `Staff Admin toggled dormant status for ${user.name} (${user.id}) to ${nextDormant ? "Dormant" : "Active"}.`,
      user.id
    );

    setActionNotification(`Dormant status for ${user.name}: ${nextDormant ? "Turned On (Dormant)" : "Turned Off (Active)"}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  const handleExecuteClearAccount = (user: AdminUserRecord) => {
    // Zero out fiat accounts
    const updatedAccounts = accounts.map((a) =>
      a.customerId === user.linkedCustomerId ? { ...a, balance: 0, availableBalance: 0 } : a
    );
    setAccounts(updatedAccounts);
    try {
      localStorage.setItem("us_finance_bank_accounts", JSON.stringify(updatedAccounts));
    } catch {}

    // Sync active customer session and controlled users so customer sees updated balance immediately
    if (typeof window !== "undefined") {
      try {
        const sessRaw = localStorage.getItem("us_finance_bank_customer_session");
        if (sessRaw) {
          const sess = JSON.parse(sessRaw);
          if (
            sess.customerName?.toLowerCase() === user.name.toLowerCase() ||
            sess.linkedCustomerId === user.linkedCustomerId
          ) {
            sess.checkingBalance = 0;
            sess.savingsBalance = 0;
            localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(sess));
          }
        }

        const ctrlRaw = localStorage.getItem("us_finance_bank_controlled_users");
        if (ctrlRaw) {
          const ctrlList = JSON.parse(ctrlRaw);
          if (Array.isArray(ctrlList)) {
            const updatedCtrl = ctrlList.map((c: any) => {
              if (c.name?.toLowerCase() === user.name.toLowerCase() || c.id === user.id) {
                return { ...c, checkingBalance: 0, savingsBalance: 0 };
              }
              return c;
            });
            localStorage.setItem("us_finance_bank_controlled_users", JSON.stringify(updatedCtrl));
          }
        }

        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Error syncing customer session on balance clear", err);
      }
    }

    appendAuditLog(
      "Accounts",
      "Account Balances Cleared to $0.00",
      `Staff Admin cleared all fiat cash balances to $0.00 for ${user.name} (${user.id}).`,
      user.id
    );

    setActionNotification(`Cleared all account balances to $0.00 for ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  const handleExecuteClearBTC = (user: AdminUserRecord) => {
    const updatedUsers = adminUsers.map((u) =>
      u.id === user.id ? { ...u, btcBalance: 0 } : u
    );
    persistAdminUsers(updatedUsers);

    if (selectedUser?.id === user.id) {
      setSelectedUser((prev) => (prev ? { ...prev, btcBalance: 0 } : null));
    }

    appendAuditLog(
      "Accounts",
      "BTC Balance Cleared to 0.00000000",
      `Staff Admin cleared Bitcoin balance to 0 BTC for ${user.name} (${user.id}).`,
      user.id
    );

    setActionNotification(`Cleared BTC balance to 0.00000000 BTC for ${user.name}.`);
    setTimeout(() => setActionNotification(""), 5000);
  };

  const handleExecuteSendEmail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!sendEmailModal) return;
    const user = sendEmailModal;

    appendAuditLog(
      "Users",
      "Administrative Email Dispatched",
      `Dispatched email to ${user.name} (${user.email}). Subject: "${emailSubjectInput}". Message length: ${emailMessageInput.length} chars.`,
      user.id
    );

    setActionNotification(`Official email dispatched to ${user.email}.`);
    setTimeout(() => setActionNotification(""), 5000);
    setSendEmailModal(null);
    setEmailSubjectInput("");
    setEmailMessageInput("");
  };

  // Applications Review & Decision Handler
  const handleExecuteApplicationDecision = () => {
    if (!appDecisionModal) return;
    const { app, decision } = appDecisionModal;
    if (!appDecisionReason.trim()) {
      alert("A clear decision justification / reason is mandatory for regulatory compliance.");
      return;
    }

    const updatedNotes = `${decision === "Approved" ? "Application approved" : decision === "Declined" ? "Application declined" : "Application marked under review"} by Staff Admin: ${appDecisionReason.trim()}`;

    const updatedApps: BankApplication[] = applications.map((a) =>
      a.id === app.id
        ? {
            ...a,
            status: decision,
            reviewNotes: updatedNotes,
            decisionReason: appDecisionReason.trim(),
            decisionBy: "Staff Admin",
            updatedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }
        : a
    );

    persistApplications(updatedApps);

    // If Approved and autoProvisionUser is checked, add user to adminUsers if not already there
    if (decision === "Approved" && autoProvisionUser) {
      const exists = adminUsers.some((u) => u.email.toLowerCase() === app.email.toLowerCase() || u.id === app.id);
      if (!exists) {
        const newUser: AdminUserRecord = {
          id: app.id,
          name: app.fullName,
          email: app.email,
          phone: app.phone,
          mailingAddress: `${app.region}, ${app.countryName}`,
          dateJoined: new Date().toISOString().split("T")[0] || "2026-10-20",
          displayDateJoined: new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }),
          onlineAccessStatus: "Active",
          verificationStatus: "Verified",
          linkedCustomerId: `CUST-${app.id.replace(/\D/g, "") || Math.floor(100000 + Math.random() * 900000)}`,
          communicationPreferences: {
            emailAlerts: true,
            smsNotifications: true,
            paperlessStatements: true,
            marketingUpdates: false,
          },
          security: {
            twoFactorEnabled: false,
            activeSessionsCount: 0,
            lastSignIn: "Never",
            lastSignInIp: "N/A",
            passwordResetRequired: true,
          },
          adminNotes: [
            `[${new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} - Staff Admin]: Auto-provisioned upon approving application ${app.id}. Reason: ${appDecisionReason.trim()}`,
          ],
          accessChangeHistory: [
            {
              id: `HIS-${Date.now().toString().slice(-4)}`,
              timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              actor: "Staff Admin",
              action: "User Account Provisioned from Approved Application",
              previousState: "None (New Applicant)",
              newState: "Active / Verified",
              reason: appDecisionReason.trim(),
            },
          ],
        };
        const updatedUsers = [newUser, ...adminUsers];
        persistAdminUsers(updatedUsers);
      }
    }

    appendAuditLog(
      "Applications",
      `Application ${decision}`,
      `Application ${app.id} for ${app.fullName} (${app.countryName}) marked as ${decision}. Justification: ${appDecisionReason.trim()}`,
      app.id
    );

    setAppDecisionModal(null);
    if (selectedAppModal?.id === app.id) {
      setSelectedAppModal((prev) =>
        prev
          ? {
              ...prev,
              status: decision,
              reviewNotes: updatedNotes,
              decisionReason: appDecisionReason.trim(),
              decisionBy: "Staff Admin",
            }
          : null
      );
    }
    setAppDecisionReason("");
    setActionNotification(`Application ${app.id} (${app.fullName}) has been marked as ${decision}. Decision recorded in audit log.`);
    setTimeout(() => setActionNotification(""), 6000);
  };

  // Safe Customer Status Changer
  const handleUpdateCustomerStatus = (
    customerId: string,
    newStatus: AdminCustomer["status"],
    reason: string
  ) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, status: newStatus } : c))
    );
    appendAuditLog(
      "Customers",
      `Customer Status Changed to ${newStatus}`,
      `Reason: ${reason || "Solo admin executive discretion"}`,
      customerId
    );
    setSelectedCustomer((prev) => (prev ? { ...prev, status: newStatus } : null));
    setConfirmActionModal(null);
    setActionReason("");
  };

  // Safe Account Status Changer
  const handleUpdateAccountStatus = (
    accountId: string,
    newStatus: BankAccountRecord["status"],
    reason: string
  ) => {
    setAccounts((prev) =>
      prev.map((a) => (a.id === accountId ? { ...a, status: newStatus } : a))
    );
    appendAuditLog(
      "Accounts",
      `Account Status Changed to ${newStatus}`,
      `Reason: ${reason || "Solo admin risk policy"}`,
      accountId
    );
    setSelectedAccount((prev) => (prev ? { ...prev, status: newStatus } : null));
    setConfirmActionModal(null);
    setActionReason("");
  };

  // Flag or Resolve Transaction
  const handleFlagTransaction = (txId: string, reason: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === txId
          ? {
              ...t,
              status: "Flagged",
              flagReason: reason,
              reviewedAt: "Today, " + new Date().toLocaleTimeString(),
              reviewedBy: "Staff Admin",
            }
          : t
      )
    );
    appendAuditLog("Transactions", "Transaction Flagged for Compliance", `Reason: ${reason}`, txId);
    setSelectedTransaction((prev) => (prev ? { ...prev, status: "Flagged", flagReason: reason } : null));
    setConfirmActionModal(null);
    setActionReason("");
  };

  const handleResolveTransaction = (txId: string, notes: string) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === txId
          ? {
              ...t,
              status: "Resolved",
              reviewNotes: notes,
              reviewedAt: "Today, " + new Date().toLocaleTimeString(),
              reviewedBy: "Staff Admin",
            }
          : t
      )
    );
    appendAuditLog("Transactions", "Transaction Cleared & Resolved", `Compliance notes: ${notes}`, txId);
    setSelectedTransaction((prev) => (prev ? { ...prev, status: "Resolved", reviewNotes: notes } : null));
    setConfirmActionModal(null);
    setActionReason("");
  };

  // Transfer Status Review & Update Handlers
  const handleSelectTransactionForReview = (tx: BankTransactionRecord) => {
    setSelectedTransaction(tx);
    const curr = (tx.transferStatus ||
      (tx.status === "Completed" ? "Completed" : tx.status === "On hold" ? "On hold" : "Processing")) as
      | "On hold"
      | "Processing"
      | "Completed";
    setTransferStatusSelected(curr);
    setTransferStatusReason("");
    setTransferStatusError("");
    appendAuditLog("Transactions", "Inspected Customer Transfer", `Viewed transfer ${tx.id} for ${tx.customerName}`, tx.id);
  };

  const handleUpdateTransferStatus = (
    txId: string,
    newStatus: "On hold" | "Processing" | "Completed",
    reason: string
  ) => {
    if (!reason.trim()) {
      setTransferStatusError("A specific, verified administrative reason is required for any transfer status change.");
      return;
    }

    const targetTx = transactions.find((t) => t.id === txId);
    if (!targetTx) return;

    const prevStatus = targetTx.transferStatus || (targetTx.status === "Completed" ? "Completed" : targetTx.status === "On hold" ? "On hold" : "Processing");
    const nowTimestamp = "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const statusUpdate: TransferStatusUpdate = {
      id: `UPD-${Date.now().toString().slice(-4)}`,
      fromStatus: prevStatus,
      toStatus: newStatus,
      updatedBy: "Staff Admin",
      reason: reason.trim(),
      timestamp: nowTimestamp,
    };

    const updatedTransactions = transactions.map((t) =>
      t.id === txId
        ? {
            ...t,
            status: newStatus,
            transferStatus: newStatus,
            reviewNotes: reason.trim(),
            reviewedAt: nowTimestamp,
            reviewedBy: "Staff Admin",
            statusUpdates: [statusUpdate, ...(t.statusUpdates || [])],
          }
        : t
    );

    setTransactions(updatedTransactions);
    if (typeof window !== "undefined") {
      localStorage.setItem("us_finance_bank_transactions", JSON.stringify(updatedTransactions));
    }

    appendAuditLog(
      "Transactions",
      "Updated Transfer Status",
      `Transfer ${txId} (${targetTx.customerName}): Status updated from '${prevStatus}' to '${newStatus}'. Administrator: Staff Admin. Reason: ${reason.trim()} [DEMONSTRATION: Non-settlement tracking record]`,
      txId
    );

    setSelectedTransaction((prev) =>
      prev && prev.id === txId
        ? {
            ...prev,
            status: newStatus,
            transferStatus: newStatus,
            reviewNotes: reason.trim(),
            reviewedAt: nowTimestamp,
            reviewedBy: "Staff Admin",
            statusUpdates: [statusUpdate, ...(prev.statusUpdates || [])],
          }
        : prev
    );

    setActionNotification(`Transfer ${txId} status successfully updated to ${newStatus}. Recorded in activity history.`);
    setTimeout(() => setActionNotification(""), 5000);
    setTransferStatusReason("");
    setTransferStatusError("");
  };

  // Compliance Decision
  const handleComplianceDecision = (
    reviewId: string,
    decision: "Approved" | "Escalated" | "Dismissed",
    reason: string
  ) => {
    setComplianceReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status: decision,
              decision,
              decisionReason: reason,
              reviewer: "Staff Admin",
              decisionTimestamp: "Today, " + new Date().toLocaleTimeString(),
            }
          : r
      )
    );
    appendAuditLog("Compliance", `Compliance Item ${decision}`, `Reason: ${reason}`, reviewId);
    setSelectedReview(null);
    setActionReason("");
  };

  // Support Case Update & Message Dispatch
  const [replyMessage, setReplyMessage] = useState("");
  const handleSendCaseReply = (caseId: string) => {
    if (!replyMessage.trim()) return;
    setSupportCases((prev) =>
      prev.map((sc) => {
        if (sc.id === caseId) {
          return {
            ...sc,
            status: "In Progress",
            updatedAt: "Just now",
            conversation: [
              ...sc.conversation,
              {
                sender: "admin",
                senderName: "Staff Admin",
                message: replyMessage.trim(),
                timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ],
          };
        }
        return sc;
      })
    );
    appendAuditLog("Support", "Dispatched Case Response", `Case ${caseId}: Response sent to client.`, caseId);
    setReplyMessage("");
  };

  // Filtered views
  const filteredUsers = adminUsers.filter((u) => {
    const q = (userFilterSearch || globalSearch).toLowerCase();
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.mailingAddress.toLowerCase().includes(q);
    const matchesStatus =
      userFilterStatus === "all" || u.onlineAccessStatus.toLowerCase() === userFilterStatus.toLowerCase();
    const matchesVerification =
      userFilterVerification === "all" || u.verificationStatus.toLowerCase() === userFilterVerification.toLowerCase();
    return matchesSearch && matchesStatus && matchesVerification;
  }).sort((a, b) => {
    if (userFilterDateSort === "newest") {
      return new Date(b.dateJoined).getTime() - new Date(a.dateJoined).getTime();
    }
    return new Date(a.dateJoined).getTime() - new Date(b.dateJoined).getTime();
  });

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      c.email.toLowerCase().includes(globalSearch.toLowerCase()) ||
      c.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
      c.country.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesStatus = customerFilterStatus === "all" || c.status.toLowerCase() === customerFilterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredAccounts = accounts.filter((a) => {
    const matchesSearch =
      a.customerName.toLowerCase().includes(globalSearch.toLowerCase()) ||
      a.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
      a.accountNumberMasked.includes(globalSearch);
    const matchesType = accountFilterType === "all" || a.accountType === accountFilterType;
    return matchesSearch && matchesType;
  });

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.customerName.toLowerCase().includes(globalSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(globalSearch.toLowerCase()) ||
      t.counterparty.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesStatus = txFilterStatus === "all" || t.status.toLowerCase() === txFilterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredReviews = complianceReviews.filter((r) => {
    const matchesSearch =
      r.targetName.toLowerCase().includes(globalSearch.toLowerCase()) ||
      r.summary.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesPriority = reviewFilterPriority === "all" || r.priority.toLowerCase() === reviewFilterPriority.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  const filteredSupport = supportCases.filter((sc) => {
    const matchesSearch =
      sc.customerName.toLowerCase().includes(globalSearch.toLowerCase()) ||
      sc.subject.toLowerCase().includes(globalSearch.toLowerCase()) ||
      sc.ticketNumber.toLowerCase().includes(globalSearch.toLowerCase());
    const matchesStatus = caseFilterStatus === "all" || sc.status.toLowerCase() === caseFilterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredAudit = auditLogs.filter((entry) => {
    const matchesSearch =
      entry.action.toLowerCase().includes(globalSearch.toLowerCase()) ||
      entry.details.toLowerCase().includes(globalSearch.toLowerCase()) ||
      (entry.targetId && entry.targetId.toLowerCase().includes(globalSearch.toLowerCase()));
    const matchesSection = auditFilterSection === "all" || entry.section.toLowerCase() === auditFilterSection.toLowerCase();
    return matchesSearch && matchesSection;
  });

  // KPI Calculations
  const activeAccountsCount = accounts.filter((a) => a.status === "Active").length;
  const pendingReviewsCount = complianceReviews.filter((r) => r.status === "Pending Review" || r.status === "In Review").length;
  const openCasesCount = supportCases.filter((c) => c.status === "Open" || c.status === "In Progress").length;
  const flaggedTxCount = transactions.filter((t) => t.status === "Flagged").length;
  const unreadAlerts = alerts.filter((a) => !a.resolved);

  // Dynamic Ledger Calculations (Zero dummy/test numbers - computed directly from actual records)
  const dynamicTotalTransfers = transactions
    .filter((t) => (t.transferStatus || t.status) === "Completed")
    .reduce((sum, t) => sum + (typeof t.amount === "number" ? t.amount : 0), 0);

  const dynamicPendingTransfers = transactions
    .filter((t) => (t.transferStatus || t.status) === "Processing" || (t.transferStatus || t.status) === "On hold" || t.status === "Pending Clearing")
    .reduce((sum, t) => sum + (typeof t.amount === "number" ? t.amount : 0), 0);

  const dynamicTotalDeposits = accounts
    .reduce((sum, a) => sum + (typeof a.balance === "number" ? a.balance : 0), 0);

  const dynamicPendingDeposits = 0; // Stays $0.00 unless pending deposit queue items exist

  return (
    <div className="flex h-screen w-full bg-[#f4f6f9] font-sans text-slate-800 antialiased overflow-hidden">
      {/* ============================================================ */}
      {/* 1. MOBILE OVERLAY SIDEBAR DRAWER (< md) */}
      {/* ============================================================ */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="fixed inset-y-0 left-0 z-55 w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col md:hidden animate-in slide-in-from-left duration-200"
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0a192f] text-white font-bold text-sm border-2 border-red-600 shadow-sm">
                  <User className="h-5 w-5" />
                </div>
                <div className="min-w-0 leading-tight">
                  <span className="block font-bold text-slate-800 text-sm truncate">
                    {adminUsername === "Solo Master Administrator" ? "admin admin" : adminUsername}
                  </span>
                  <span className="inline-block mt-0.5 rounded bg-red-600 px-2 py-0.5 text-[0.65rem] font-bold text-white">
                    Admin
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
              {[
                { id: "overview", label: "Dashboard", icon: Home },
                { id: "users", label: "Manage Users", icon: User },
                { id: "deposits", label: "Users Deposits", icon: ArrowDownToLine },
                { id: "loans", label: "Loan Applications", icon: Landmark },
                { id: "cards", label: "Virtual Cards", icon: CreditCard },
                { id: "irs", label: "IRS Refunds", icon: Sparkles },
                { id: "email-services", label: "Email Services", icon: Mail },
                { id: "compliance", label: "Grant Applications", icon: HandCoins, hasSubmenu: true },
                { id: "create-user", label: "Create New user", icon: UserPlus },
                { id: "applications", label: "New User Application(s)", icon: UserCheck },
                { id: "transactions", label: "Transfer Transactions", icon: ArrowUpRight },
                { id: "history", label: "Transaction History", icon: History, hasSubmenu: true },
              ].map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeSection === item.id ||
                  (item.id === "create-user" && createUserModalOpen) ||
                  (item.id === "history" && activeSection === "transactions");
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setMobileSidebarOpen(false);
                      if (item.id === "create-user") {
                        setCreateUserModalOpen(true);
                      } else if (item.id === "history") {
                        setActiveSection("transactions");
                        appendAuditLog("Overview", "Navigated to Transaction History", "Administrator accessed transaction history.");
                      } else if (item.id === "applications") {
                        setActiveSection("applications");
                        appendAuditLog("Applications", "Navigated to New User Applications Queue", "Administrator opened live applications queue.");
                      } else {
                        setActiveSection(item.id as any);
                        appendAuditLog("Overview", `Navigated to ${item.label}`, `Administrator switched workspace view.`);
                      }
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#0a192f] text-white shadow-sm font-bold border-l-4 border-red-600 pl-2.5"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0a192f]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.id === "applications" && (
                      <span className="ml-auto rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 text-[0.65rem] font-bold">
                        {applications.filter((a) => a.status === "Pending" || a.status === "Under Review").length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Sidebar Footer */}
            <div className="border-t border-slate-100 p-3">
              <button
                type="button"
                onClick={onSignOut}
                className="flex w-full items-center gap-2 rounded-lg p-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4 text-red-600" />
                <span>Sign Out</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* ============================================================ */}
      {/* 2. DESKTOP COLLAPSIBLE SIDEBAR (Hidden on mobile) */}
      {/* ============================================================ */}
      <aside
        className={`hidden md:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 shadow-xs z-30 shrink-0 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Admin Profile Area in Left Sidebar matching visual reference */}
        <div className="border-b border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a192f] text-white font-bold shadow-md shadow-slate-900/10 text-sm border-2 border-red-600">
              <User className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 leading-tight">
                <span className="block font-bold text-slate-800 text-sm truncate">
                  {adminUsername === "Solo Master Administrator" ? "admin admin" : adminUsername}
                </span>
                <span className="inline-block mt-0.5 rounded bg-red-600 px-2 py-0.5 text-[0.68rem] font-bold text-white shadow-2xs">
                  Admin
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation Items matching exact labels from reference screenshot */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {[
            { id: "overview", label: "Dashboard", icon: Home },
            { id: "users", label: "Manage Users", icon: User },
            { id: "deposits", label: "Users Deposits", icon: ArrowDownToLine },
            { id: "loans", label: "Loan Applications", icon: Landmark },
            { id: "cards", label: "Virtual Cards", icon: CreditCard },
            { id: "irs", label: "IRS Refunds", icon: Sparkles },
            { id: "email-services", label: "Email Services", icon: Mail },
            { id: "compliance", label: "Grant Applications", icon: HandCoins, hasSubmenu: true },
            { id: "create-user", label: "Create New user", icon: UserPlus },
            { id: "applications", label: "New User Application(s)", icon: UserCheck },
            { id: "transactions", label: "Transfer Transactions", icon: ArrowUpRight },
            { id: "history", label: "Transaction History", icon: History, hasSubmenu: true },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id || (item.id === "create-user" && createUserModalOpen) || (item.id === "history" && activeSection === "transactions");
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === "create-user") {
                    setCreateUserModalOpen(true);
                  } else if (item.id === "history") {
                    setActiveSection("transactions");
                    appendAuditLog("Overview", "Navigated to Transaction History", "Administrator accessed transaction history.");
                  } else if (item.id === "applications") {
                    setActiveSection("applications");
                    appendAuditLog("Applications", "Navigated to New User Applications Queue", "Administrator opened live applications queue.");
                  } else {
                    setActiveSection(item.id as any);
                    appendAuditLog("Overview", `Navigated to ${item.label}`, `Administrator switched workspace view.`);
                  }
                }}
                className={`group flex w-full items-center gap-3 rounded-lg px-3.5 py-3 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#0a192f] text-white shadow-sm font-bold border-l-4 border-red-600 pl-2.5"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[#0a192f]"
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-red-600"}`} />
                {!sidebarCollapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.id === "applications" && (
                      <span className="ml-auto rounded-full bg-amber-500/20 text-amber-400 border border-amber-400/30 px-2 py-0.5 text-[0.65rem] font-bold">
                        {applications.filter((a) => a.status === "Pending" || a.status === "Under Review").length}
                      </span>
                    )}
                  </>
                )}
                {!sidebarCollapsed && (item as any).hasSubmenu && (
                  <ChevronDown className={`h-3 w-3 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={onSignOut}
            className={`flex w-full items-center gap-2 rounded-lg p-2 text-xs font-semibold text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
            title="Sign Out of Admin Workspace"
          >
            <LogOut className="h-4 w-4 text-red-600" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* 3. MAIN WORKSPACE CONTAINER */}
      {/* ============================================================ */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0 w-full">
        {/* TOP NAVIGATION BAR — Navy Blue, White, and Red Theme (US Flag Inspired) */}
        <header className="flex h-16 items-center justify-between bg-[#0a192f] border-b-4 border-red-600 px-3 sm:px-6 text-white shadow-md z-20 shrink-0">
          {/* Left: Bank Name & Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setMobileSidebarOpen(true);
                } else {
                  setSidebarCollapsed(!sidebarCollapsed);
                }
              }}
              className="rounded-lg p-1.5 text-white/90 hover:bg-white/15 hover:text-white transition-colors shrink-0"
              title="Toggle Menu"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-red-600 text-white shadow-xs shrink-0">
                <Landmark className="h-4 w-4" />
              </span>
              <span className="font-display text-base sm:text-lg font-black tracking-tight text-white select-none truncate">
                West Side Financial Institution
              </span>
            </div>
          </div>

          {/* Center: Search Field matching screenshot */}
          <div className="relative hidden sm:block w-48 md:w-80 lg:w-96 mx-2 sm:mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Manage users"
              className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-8 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-inner"
            />
            {globalSearch && (
              <button
                type="button"
                onClick={() => setGlobalSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right: Operational Alert & Admin Profile Menu */}
          <div className="flex items-center gap-3">
            {/* Operational Alerts Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-full p-2 text-white/90 hover:bg-white/15 hover:text-white transition-colors"
                title="Operational Alerts"
              >
                <Bell className="h-5 w-5" />
                {unreadAlerts.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[0.6rem] font-black text-white shadow-sm border border-white">
                    {unreadAlerts.length}
                  </span>
                )}
              </button>

              {/* Notification Center Dropdown */}
              {showNotifications && (
                <div className="fixed sm:absolute inset-x-2 sm:inset-x-auto right-auto sm:right-0 top-16 sm:top-auto sm:mt-2 w-[calc(100vw-16px)] sm:w-[540px] md:w-[620px] rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xl z-50 animate-fadeIn text-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 flex items-center gap-2">
                        <Bell className="h-4 w-4 text-red-600" />
                        Operational Alerts ({alerts.length})
                      </h4>
                      <p className="text-[0.7rem] text-slate-500 font-medium">
                        {unreadAlerts.length > 0 ? `${unreadAlerts.length} Unread Notifications needing review` : "All notifications read"}
                      </p>
                    </div>
                    {unreadAlerts.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const marked = alerts.map((a) => ({ ...a, resolved: true }));
                          persistAlerts(marked);
                        }}
                        className="text-[0.72rem] font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg px-2.5 py-1.5 transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="mt-3 space-y-2.5 max-h-[70vh] sm:max-h-96 overflow-y-auto pr-1">
                    {alerts.length === 0 ? (
                      <div className="py-10 text-center text-xs text-slate-400">
                        No operational notifications at this time.
                      </div>
                    ) : (
                      alerts.map((al) => (
                        <div
                          key={al.id}
                          onClick={() => {
                            if (!al.resolved) {
                              const updated = alerts.map((item) =>
                                item.id === al.id ? { ...item, resolved: true } : item
                              );
                              persistAlerts(updated);
                            }
                            if (al.category === "Compliance" || al.title.includes("Application")) {
                              setActiveSection("applications");
                              setShowNotifications(false);
                            } else if (al.category === "Security" || al.title.includes("Wire")) {
                              setActiveSection("transactions");
                              setShowNotifications(false);
                            }
                          }}
                          className={`rounded-xl border p-3.5 text-xs cursor-pointer transition-all ${
                            !al.resolved
                              ? al.severity === "critical"
                                ? "border-red-300 bg-red-50/90 text-red-900 shadow-sm"
                                : al.severity === "warning"
                                ? "border-amber-300 bg-amber-50/90 text-amber-900 shadow-sm"
                                : "border-blue-300 bg-blue-50/90 text-blue-900 shadow-sm"
                              : "border-slate-200 bg-slate-50 text-slate-600 opacity-80 hover:opacity-100"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              {!al.resolved && (
                                <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
                              )}
                              <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">{al.title}</span>
                            </div>
                            <span className="text-[0.68rem] text-slate-500 shrink-0 whitespace-nowrap">{al.timestamp}</span>
                          </div>
                          <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">{al.description}</p>
                          {al.actionRequired && (
                            <div className="mt-2.5 text-xs font-bold text-red-600 flex items-center justify-between pt-1 border-t border-slate-200/60">
                              <span>→ {al.actionRequired}</span>
                              <span className="text-[0.68rem] text-slate-500 underline font-normal">Tap to inspect</span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center justify-center h-9 w-9 rounded-full overflow-hidden border border-red-500 bg-white/20 hover:bg-white/30 text-white transition-colors shadow-sm"
                title="Admin Profile Menu"
              >
                {adminPhotoUrl ? (
                  <img src={adminPhotoUrl} alt="Admin" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-xl z-50 text-slate-800 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">Staff Admin</p>
                    <p className="text-[0.68rem] text-slate-500">West Side Financial Institution Internal</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection("settings");
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    Security & Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection("audit");
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    Audit Ledger
                  </button>
                  <div className="border-t border-slate-100 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this Admin profile and clear the active session?")) {
                          try {
                            localStorage.removeItem("westside_admin_profile");
                            localStorage.removeItem("westside_active_solo_admin_session");
                          } catch {}
                          onSignOut();
                        }
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center justify-between"
                    >
                      <span>Delete Admin Profile</span>
                      <Trash2 className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="w-full text-left px-4 py-2 text-xs text-slate-600 hover:bg-slate-50 font-medium"
                    >
                      Sign Out Only
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Global Action Banner Toast */}
        {actionNotification && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs flex items-center justify-between shadow-md animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{actionNotification}</span>
            </div>
            <button
              type="button"
              onClick={() => setActionNotification("")}
              className="text-white/80 hover:text-white text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto bg-[#f4f6f9] p-3 sm:p-6 min-w-0">
          {/* ======================================================== */}
          {/* VIEW 1: MAIN DASHBOARD (RED & WHITE THEME MATCHING SCREENSHOT) */}
          {/* ======================================================== */}
          {activeSection === "overview" && (
            <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
              {/* Top Banner Header: Navy Blue & Red accent matching US flag colors */}
              <div className="rounded-t-2xl bg-gradient-to-r from-[#0a192f] via-[#102747] to-[#183964] border-b-4 border-red-600 p-4 sm:p-8 text-white shadow-md relative overflow-hidden pb-10 sm:pb-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="min-w-0">
                    <h1 className="font-display text-xl sm:text-3xl font-extrabold tracking-tight truncate">
                      Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 truncate">
                      Welcome, {adminUsername === "Solo Master Administrator" ? "admin admin" : adminUsername}!
                    </p>
                  </div>

                  {/* 4 Quick Links Buttons */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveSection("accounts")}
                      className="rounded-lg bg-emerald-500 hover:bg-emerald-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors text-center"
                    >
                      Deposits
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("transactions")}
                      className="rounded-lg bg-sky-500 hover:bg-sky-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors text-center"
                    >
                      Transfers
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("users")}
                      className="rounded-lg bg-purple-600 hover:bg-purple-700 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors text-center"
                    >
                      Users
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("applications")}
                      className="rounded-lg bg-amber-600 hover:bg-amber-700 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors text-center"
                    >
                      Applications ({applications.filter((a) => a.status === "Pending" || a.status === "Under Review").length})
                    </button>
                  </div>
                </div>
              </div>

              {/* SUMMARY CARDS GRID matching the 7 summary cards in screenshot */}
              <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-6 shadow-sm -mt-6 sm:-mt-8 relative z-10 mx-0 sm:mx-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                  {/* Card 1: Total Deposit */}
                  <div
                    onClick={() => setActiveSection("accounts")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <ArrowDownToLine className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Total Deposit</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        ${dynamicTotalDeposits.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Pending Deposit(s) */}
                  <div
                    onClick={() => setActiveSection("compliance")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                      <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Pending Deposit(s)</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        ${dynamicPendingDeposits.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Total Transfers */}
                  <div
                    onClick={() => setActiveSection("transactions")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Total Transfers</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        ${dynamicTotalTransfers.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Pending Transfers */}
                  <div
                    onClick={() => setActiveSection("transactions")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <ArrowRightLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Pending Transfers</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        ${dynamicPendingTransfers.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  </div>

                  {/* Card 5: Total Users */}
                  <div
                    onClick={() => setActiveSection("users")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Total Users</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">{adminUsers.length}</p>
                    </div>
                  </div>

                  {/* Card 6: Block Users */}
                  <div
                    onClick={() => {
                      setUserFilterStatus("suspended");
                      setActiveSection("users");
                    }}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <UserMinus className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Block Users</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        {adminUsers.filter((u) => u.onlineAccessStatus === "Suspended" || u.onlineAccessStatus === "Closed").length}
                      </p>
                    </div>
                  </div>

                  {/* Card 7: Active Users */}
                  <div
                    onClick={() => {
                      setUserFilterStatus("active");
                      setActiveSection("users");
                    }}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <UserCheck className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Active Users</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        {adminUsers.filter((u) => u.onlineAccessStatus === "Active" || u.onlineAccessStatus === "Reinstated").length}
                      </p>
                    </div>
                  </div>

                  {/* Card 8: Security Clearance */}
                  <div
                    onClick={() => setActiveSection("settings")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <Network className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Security Clearance</span>
                      <p className="font-display text-xs sm:text-sm font-bold text-emerald-600 truncate">Staff Admin Active</p>
                    </div>
                  </div>

                  {/* Card 9: New Applications */}
                  <div
                    onClick={() => setActiveSection("applications")}
                    className="flex items-center gap-3.5 sm:gap-4 p-3 sm:p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all min-w-0 shadow-2xs"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-500 block truncate">Portal Applications</span>
                      <p className="font-display text-base sm:text-lg font-black text-slate-800 truncate">
                        {applications.filter((a) => a.status === "Pending" || a.status === "Under Review").length} Pending
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity & Operational Queue Sections */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* 7-day Trajectory Bar Graph in Clean White/Red Styling */}
                <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-bold text-sm text-slate-800">Core Volume & Transfer Trajectory</h3>
                      <p className="text-xs text-slate-500">Simulated 7-day transaction velocity and throughput</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1">
                      {["7d", "30d", "90d"].map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setReportDateRange(range)}
                          className={`rounded px-2.5 py-1 text-xs font-bold transition-colors ${
                            reportDateRange === range ? "bg-red-600 text-white" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {range.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex h-48 items-end gap-3 px-2">
                    {[
                      { day: "Mon", vol: 48, label: "$48k" },
                      { day: "Tue", vol: 65, label: "$65k" },
                      { day: "Wed", vol: 82, label: "$82k" },
                      { day: "Thu", vol: 54, label: "$54k" },
                      { day: "Fri", vol: 95, label: "$95k" },
                      { day: "Sat", vol: 38, label: "$38k" },
                      { day: "Sun", vol: 42, label: "$42k" },
                    ].map((bar) => (
                      <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                        <span className="text-[0.65rem] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.label}
                        </span>
                        <div
                          style={{ height: `${bar.vol}%` }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-red-700 to-red-400 group-hover:brightness-110 transition-all"
                        />
                        <span className="text-xs font-bold text-slate-500">{bar.day}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[0.72rem] text-slate-500">
                    <span>Average Daily Settlement: <strong>$60,571.00 USD</strong></span>
                    <span className="text-red-600 font-bold">100% Mock Safe Simulation Data</span>
                  </div>
                </div>

                {/* Urgent Alerts Queue in Clean Light Theme */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" /> Operational Alerts
                    </h3>
                    <span className="rounded bg-red-100 px-2 py-0.5 text-[0.65rem] font-bold text-red-700">
                      {unreadAlerts.length} Unresolved
                    </span>
                  </div>

                  <div className="mt-3 flex-1 space-y-3 overflow-y-auto max-h-64">
                    {alerts.slice(0, 4).map((al) => (
                      <div
                        key={al.id}
                        className={`rounded-xl border p-3 text-xs ${
                          al.severity === "critical"
                            ? "border-red-200 bg-red-50 text-red-900"
                            : al.severity === "warning"
                            ? "border-amber-200 bg-amber-50 text-amber-900"
                            : "border-slate-200 bg-slate-50 text-slate-800"
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>{al.title}</span>
                          <span className="text-[0.65rem] text-slate-500 font-normal">{al.timestamp}</span>
                        </div>
                        <p className="mt-1 text-[0.7rem] text-slate-600 leading-snug">{al.description}</p>
                        {al.actionRequired && (
                          <button
                            type="button"
                            onClick={() => {
                              if (al.category === "Compliance") setActiveSection("compliance");
                              else if (al.category === "Security") setActiveSection("settings");
                              else setActiveSection("transactions");
                            }}
                            className="mt-2 text-[0.68rem] font-bold text-red-600 hover:underline inline-block"
                          >
                            Resolve Alert →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Real-Time Activity Snapshot */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">Recent Core Administrative Activity</h3>
                    <p className="text-xs text-slate-500">Append-only security log records performed by Staff Admin</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setActiveSection("audit")}
                    className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    View Complete Audit Log →
                  </Button>
                </div>

                <div className="mt-4 divide-y divide-slate-100">
                  {auditLogs.slice(0, 4).map((entry) => (
                    <div key={entry.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] font-bold text-slate-700 font-mono">
                          {entry.section}
                        </span>
                        <div>
                          <span className="font-bold text-slate-800">{entry.action}</span>
                          <span className="text-slate-500 ml-2">({entry.details})</span>
                        </div>
                      </div>
                      <span className="text-slate-400 text-[0.7rem] font-mono shrink-0">{entry.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Copyright Footer matching screenshot */}
              <div className="pt-4 pb-2 text-center text-xs text-slate-500 border-t border-slate-200">
                All Rights Reserved © West Side Financial Institution {new Date().getFullYear()}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 1.5: USER MANAGEMENT */}
          {/* ======================================================== */}
          {activeSection === "users" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">User Management</h2>
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200">
                      Staff Admin Authority
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Search and manage individual user profiles, update permitted contact info, and control digital online banking access.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {/* Search Input for Users */}
                  <div className="relative flex-1 min-w-[240px] max-w-sm">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={userFilterSearch}
                      onChange={(e) => setUserFilterSearch(e.target.value)}
                      placeholder="Search users by name, email, ID, phone..."
                      className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-7 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none shadow-xs"
                    />
                    {userFilterSearch && (
                      <button
                        type="button"
                        onClick={() => setUserFilterSearch("")}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Status Filter */}
                  <select
                    value={userFilterStatus}
                    onChange={(e) => setUserFilterStatus(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-red-500 focus:outline-none shadow-xs"
                  >
                    <option value="all">All Access Statuses ({adminUsers.length})</option>
                    <option value="active">Active Online Access</option>
                    <option value="suspended">Suspended Access</option>
                    <option value="reinstated">Reinstated</option>
                    <option value="closed">Closed Access</option>
                  </select>

                  {/* Verification Filter */}
                  <select
                    value={userFilterVerification}
                    onChange={(e) => setUserFilterVerification(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-red-500 focus:outline-none shadow-xs"
                  >
                    <option value="all">All KYC Statuses</option>
                    <option value="verified">Verified Only</option>
                    <option value="pending review">Pending Review</option>
                    <option value="action required">Action Required</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {/* Date Joined Sort */}
                  <button
                    type="button"
                    onClick={() => setUserFilterDateSort((prev) => (prev === "newest" ? "oldest" : "newest"))}
                    className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
                    title="Toggle Date Joined Sort"
                  >
                    <Clock className="h-3.5 w-3.5 text-red-600" />
                    <span>Joined: {userFilterDateSort === "newest" ? "Newest First" : "Oldest First"}</span>
                  </button>
                </div>
              </div>

              {/* Status Notice: Clear separation of Online Access vs Financial Products */}
              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 text-xs text-slate-700 flex items-start gap-3 shadow-xs">
                <ShieldCheck className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-red-900">Important Access & Safety Architecture Notice:</span>
                  <p className="text-[0.72rem] text-slate-600 leading-relaxed">
                    Online Access status directly governs a user&apos;s digital credential authentication and mobile/web portal authorization. It is strictly separate from customer legal status and underlying financial account settlement. All password updates, credential revocations, and permitted profile edits are append-only logged with explicit audit reasons. Staff Admins are barred from viewing passwords, impersonating users, or initiating funds transfers.
                  </p>
                </div>
              </div>

              {/* Customer Profile Self-Edit Approval Queue */}
              {pendingProfileEdits.length > 0 && (
                <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50/40 p-4 sm:p-5 shadow-sm space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-200/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5 text-amber-700" />
                      <div>
                        <h3 className="font-display font-black text-sm text-slate-900">
                          Customer Profile Edit Requests Awaiting Staff Admin Approval
                        </h3>
                        <p className="text-[0.7rem] text-slate-600">
                          Customers have submitted personal details updates from their online banking dashboard. Review and verify before applying changes.
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-900">
                      {pendingProfileEdits.filter((r) => r.status === "Pending Admin Approval").length} Pending
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {pendingProfileEdits.map((req) => (
                      <div
                        key={req.id}
                        className="rounded-xl border border-amber-200 bg-white p-3.5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono font-bold text-slate-500 text-[0.68rem]">{req.id}</span>
                            <span className="font-bold text-slate-900">{req.customerName}</span>
                            <span className="text-[0.68rem] text-slate-400">({req.submittedAt})</span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold border ${
                                req.status === "Approved"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : req.status === "Rejected"
                                  ? "bg-rose-50 text-rose-800 border-rose-200"
                                  : "bg-amber-100 text-amber-900 border-amber-300"
                              }`}
                            >
                              {req.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[0.72rem] text-slate-700 pt-1">
                            <div>
                              <span className="text-slate-400 block text-[0.65rem]">Requested Name:</span>
                              <strong className="text-slate-900">{req.requestedName}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[0.65rem]">Requested Email:</span>
                              <strong className="text-slate-900 font-mono">{req.requestedEmail}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[0.65rem]">Requested Phone & Region:</span>
                              <strong className="text-slate-900">{req.requestedPhone}</strong>
                              {req.requestedAddress && <span className="text-slate-500 block text-[0.65rem]">{req.requestedAddress}</span>}
                            </div>
                          </div>
                          {req.requestedProfilePicUrl && (
                            <div className="flex items-center gap-2 pt-2 border-t border-amber-100">
                              <span className="text-slate-500 text-[0.68rem] font-bold">Uploaded Photo:</span>
                              <img
                                src={req.requestedProfilePicUrl}
                                alt={req.requestedName}
                                className="h-9 w-9 rounded-xl object-cover border border-amber-400 shadow-2xs"
                              />
                              <span className="text-emerald-700 font-bold text-[0.65rem]">New photo awaiting verification</span>
                            </div>
                          )}
                        </div>

                        {req.status === "Pending Admin Approval" ? (
                          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                            <Button
                              size="sm"
                              onClick={() => {
                                const reason = prompt("Enter administrative approval verification notes for audit log:") || "Verified customer identity and KYC compliance.";
                                handleApproveCustomerProfileEdit(req.id, true, reason);
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-8 px-3 shadow-xs"
                            >
                              ✓ Approve Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const reason = prompt("Enter administrative decline reason for audit log:") || "Documentation does not match official bank records.";
                                handleApproveCustomerProfileEdit(req.id, false, reason);
                              }}
                              className="border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs h-8 px-3 shadow-xs"
                            >
                              ✕ Decline
                            </Button>
                          </div>
                        ) : (
                          <div className="text-right text-[0.68rem] text-slate-500">
                            <span>Reviewed by: {req.reviewedBy || "Staff Admin"}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Users Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="border-b border-slate-200 bg-slate-50 text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">
                      <tr>
                        <th className="px-5 py-3.5">User & ID</th>
                        <th className="px-5 py-3.5">Contact Details</th>
                        <th className="px-5 py-3.5">Date Joined</th>
                        <th className="px-5 py-3.5">KYC Status</th>
                        <th className="px-5 py-3.5">Online Access</th>
                        <th className="px-5 py-3.5">Active Sessions</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                            No users match the search and filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                {user.profilePicUrl ? (
                                  <img
                                    src={user.profilePicUrl}
                                    alt={user.name}
                                    className="h-9 w-9 rounded-full object-cover border border-slate-300 shadow-2xs shrink-0"
                                  />
                                ) : (
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0a192f] text-white font-bold text-xs shadow-2xs">
                                    {user.name.charAt(0)}
                                  </div>
                                )}
                                <div>
                                  <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                                  <div className="font-mono text-[0.7rem] text-slate-500">{user.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <div className="text-slate-800">{user.email}</div>
                              <div className="text-[0.7rem] text-slate-500">{user.phone}</div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="font-mono text-slate-600">{user.displayDateJoined}</span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold border ${
                                  user.verificationStatus === "Verified"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                    : user.verificationStatus === "Pending Review"
                                    ? "border-amber-200 bg-amber-50 text-amber-800"
                                    : user.verificationStatus === "Action Required"
                                    ? "border-blue-200 bg-blue-50 text-blue-800"
                                    : "border-red-200 bg-red-50 text-red-800"
                                }`}
                              >
                                {user.verificationStatus}
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold border ${
                                  user.onlineAccessStatus === "Active"
                                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                    : user.onlineAccessStatus === "Reinstated"
                                    ? "border-blue-200 bg-blue-50 text-blue-800"
                                    : user.onlineAccessStatus === "Suspended"
                                    ? "border-red-200 bg-red-50 text-red-800"
                                    : "border-slate-300 bg-slate-100 text-slate-600"
                                }`}
                              >
                                {user.onlineAccessStatus} Access
                              </span>
                            </td>
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`h-2 w-2 rounded-full ${
                                    user.security.activeSessionsCount > 0 ? "bg-emerald-500 animate-pulse" : "bg-slate-300"
                                  }`}
                                />
                                <span className="text-slate-700 text-xs font-mono">
                                  {user.security.activeSessionsCount} active
                                </span>
                              </div>
                              {user.security.passwordResetRequired && (
                                <span className="mt-1 inline-block text-[0.65rem] font-bold text-amber-600">
                                  ⚠ Reset Mandatory
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-4 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    appendAuditLog(
                                      "Users",
                                      "Inspected User Profile",
                                      `Opened comprehensive profile drawer for ${user.name} (${user.id}).`,
                                      user.id
                                    );
                                  }}
                                  className="border-slate-300 bg-white text-xs font-semibold text-[#0a192f] hover:bg-[#0a192f] hover:text-white transition-colors"
                                  title="Review full profile and active sessions"
                                >
                                  Review
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingUserRecord(user);
                                    setEditUserFormData({
                                      name: user.name,
                                      email: user.email,
                                      phone: user.phone,
                                      mailingAddress: user.mailingAddress,
                                      onlineAccessStatus: user.onlineAccessStatus,
                                      verificationStatus: user.verificationStatus,
                                      editReason: "",
                                    });
                                  }}
                                  className="border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100"
                                  title="Edit user contact details and KYC status"
                                >
                                  <Edit3 className="mr-1 h-3 w-3 text-slate-500" />
                                  Edit
                                </Button>

                                {user.onlineAccessStatus === "Active" || user.onlineAccessStatus === "Reinstated" ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setUserToSuspendModal({ user, targetStatus: "Suspended" });
                                      setSuspendReason("");
                                    }}
                                    className="border-amber-200 bg-amber-50/50 text-xs font-semibold text-amber-700 hover:bg-amber-100"
                                    title="Suspend digital banking access"
                                  >
                                    <UserX className="mr-1 h-3 w-3" />
                                    Suspend
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setUserToSuspendModal({ user, targetStatus: "Active" });
                                      setSuspendReason("");
                                    }}
                                    className="border-emerald-200 bg-emerald-50/50 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
                                    title="Reinstate digital banking access"
                                  >
                                    <UserCheck className="mr-1 h-3 w-3" />
                                    Reinstate
                                  </Button>
                                )}

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setUserToDeleteModal(user);
                                    setDeleteReason("");
                                    setDeleteConfirmChecked(false);
                                    setDeleteError("");
                                  }}
                                  className="border-rose-200 bg-rose-50/40 text-xs font-semibold text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                                  title="Permanently delete individual user account"
                                >
                                  <Trash2 className="mr-1 h-3 w-3" />
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* USER PROFILE & ACCESS CONTROL DRAWER MODAL */}
              {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
                  <div className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-800">
                    {/* Top Bar with Back Control and Actions Dropdown (Matching Screenshot 1) */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setSelectedUser(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
                      >
                        <ChevronLeft className="h-4 w-4 text-slate-500" />
                        <span>back</span>
                      </button>

                      {/* Purple Actions Dropdown with 17 Features */}
                      <div className="relative">
                        <Button
                          size="sm"
                          type="button"
                          onClick={() => setActionsDropdownOpen(!actionsDropdownOpen)}
                          className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Actions</span>
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>

                        {actionsDropdownOpen && (
                          <div
                            className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white py-1.5 shadow-2xl z-50 text-xs font-semibold text-slate-700 animate-fadeIn divide-y divide-slate-100"
                            onClick={() => setActionsDropdownOpen(false)}
                          >
                            <div className="py-1">
                              {/* 1. Credit Account */}
                              <button
                                type="button"
                                onClick={() => {
                                  setCreditDebitModal({ type: "credit", user: selectedUser });
                                  setCreditDebitAmount("");
                                  setCreditDebitDescription("");
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <ArrowDownToLine className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                                <span>Credit Account</span>
                              </button>

                              {/* 2. Debit Account */}
                              <button
                                type="button"
                                onClick={() => {
                                  setCreditDebitModal({ type: "debit", user: selectedUser });
                                  setCreditDebitAmount("");
                                  setCreditDebitDescription("");
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <ArrowUpRight className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                                <span>Debit Account</span>
                              </button>

                              {/* 3. Generate Transaction */}
                              <button
                                type="button"
                                onClick={() => {
                                  setGenerateTxModal(selectedUser);
                                  setGenTxAmount("");
                                  setGenTxCounterparty("");
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <FileText className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                                <span>Generate Transaction</span>
                              </button>

                              {/* 4. Edit Balance */}
                              <button
                                type="button"
                                onClick={() => {
                                  const userAccounts = accounts.filter((a) => a.customerId === selectedUser.linkedCustomerId);
                                  const chk = userAccounts.find((a) => a.accountType.toLowerCase().includes("checking"));
                                  const sav = userAccounts.find((a) => a.accountType.toLowerCase().includes("savings"));
                                  setEditCheckingAmount((chk?.balance ?? 0).toString());
                                  setEditSavingsAmount((sav?.balance ?? 0).toString());
                                  setEditBalanceModal(selectedUser);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <Edit3 className="h-3.5 w-3.5 text-indigo-600 shrink-0" />
                                <span>Edit Balance</span>
                              </button>

                              {/* 5. Account Usage Limits */}
                              <button
                                type="button"
                                onClick={() => {
                                  setDailyTransferLimitInput((selectedUser.dailyTransferLimit ?? 50000).toString());
                                  setDailyWithdrawalLimitInput((selectedUser.dailyWithdrawalLimit ?? 10000).toString());
                                  setAccountUsageLimitsModal(selectedUser);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <TrendingUp className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                <span>Account Usage Limits</span>
                              </button>

                              {/* 6. Manage Two-Factor Auth */}
                              <button
                                type="button"
                                onClick={() => handleToggleTwoFactorAction(selectedUser)}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <KeyRound className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                                <span>Manage Two-Factor Auth</span>
                              </button>

                              {/* 7. Change Profile Pics */}
                              <button
                                type="button"
                                onClick={() => {
                                  setProfilePicUrlInput(selectedUser.profilePicUrl || "");
                                  setChangeProfilePicModal(selectedUser);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <User className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                                <span>Change Profile Pics</span>
                              </button>

                              {/* 8. Reset Password */}
                              <button
                                type="button"
                                onClick={() => handleConfirmSendPasswordResetLink(selectedUser, "Email")}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <Lock className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                                <span>Reset Password</span>
                              </button>

                              {/* 9. Turn Off Dormant Account */}
                              <button
                                type="button"
                                onClick={() => handleToggleDormantAction(selectedUser)}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <PauseCircle className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                                <span>{selectedUser.isDormant ? "Turn Off Dormant Account" : "Turn On Dormant Account"}</span>
                              </button>

                              {/* 10. Clear Account */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to clear all cash account balances to $0.00 for ${selectedUser.name}?`)) {
                                    handleExecuteClearAccount(selectedUser);
                                  }
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <RefreshCw className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                                <span>Clear Account</span>
                              </button>

                              {/* 11. Clear BTC Account */}
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Are you sure you want to clear the Bitcoin account to 0 BTC for ${selectedUser.name}?`)) {
                                    handleExecuteClearBTC(selectedUser);
                                  }
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <span className="font-mono font-bold text-amber-500 shrink-0 text-xs">₿</span>
                                <span>Clear BTC Account</span>
                              </button>

                              {/* 12. Edit (Profile) */}
                              <button
                                type="button"
                                onClick={() => {
                                  setUserEditForm({
                                    name: selectedUser.name,
                                    phone: selectedUser.phone,
                                    mailingAddress: selectedUser.mailingAddress,
                                    profilePicUrl: selectedUser.profilePicUrl || "",
                                    communicationPreferences: { ...selectedUser.communicationPreferences },
                                  });
                                  setUserEditModalOpen(true);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <Edit3 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                                <span>Edit Profile</span>
                              </button>

                              {/* 13. Send Email */}
                              <button
                                type="button"
                                onClick={() => {
                                  setEmailSubjectInput(`Notice regarding your West Side Financial Institution Account`);
                                  setEmailMessageInput(`Dear ${selectedUser.name},\n\nWe are writing to update you regarding your account...\n\nSincerely,\nWest Side Financial Institution Support`);
                                  setSendEmailModal(selectedUser);
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <Mail className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                                <span>Send Email</span>
                              </button>
                            </div>

                            <div className="py-1">
                              {/* 14. Login as [Customer Name] in green */}
                              <button
                                type="button"
                                onClick={() => handleInitiateOpenCustomerProfile(selectedUser)}
                                className="w-full text-left px-3.5 py-2 hover:bg-emerald-50 text-emerald-600 font-bold flex items-center gap-2 cursor-pointer"
                              >
                                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">Login as {selectedUser.name}</span>
                              </button>

                              {/* 15. Login Activity */}
                              <button
                                type="button"
                                onClick={() => setLoginActivityModal(selectedUser)}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 cursor-pointer text-slate-800"
                              >
                                <Laptop className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                                <span>Login Activity</span>
                              </button>

                              {/* 16. Block / Suspend Account */}
                              <button
                                type="button"
                                onClick={() => {
                                  const targetStatus = selectedUser.onlineAccessStatus === "Suspended" ? "Active" : "Suspended";
                                  setUserToSuspendModal({ user: selectedUser, targetStatus });
                                  setSuspendReason("");
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-amber-700 flex items-center gap-2 cursor-pointer"
                              >
                                <UserX className="h-3.5 w-3.5 shrink-0" />
                                <span>{selectedUser.onlineAccessStatus === "Suspended" ? "Unblock Account" : "Block"}</span>
                              </button>

                              {/* 17. Delete [Customer Name] in red */}
                              <button
                                type="button"
                                onClick={() => {
                                  setUserToDeleteModal(selectedUser);
                                  setDeleteReason("");
                                  setDeleteConfirmChecked(false);
                                  setDeleteError("");
                                }}
                                className="w-full text-left px-3.5 py-2 hover:bg-red-50 text-red-600 font-bold flex items-center gap-2 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">Delete {selectedUser.name}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-3.5">
                        {selectedUser.profilePicUrl ? (
                          <img
                            src={selectedUser.profilePicUrl}
                            alt={selectedUser.name}
                            className="h-14 w-14 shrink-0 rounded-2xl object-cover border-2 border-red-600 shadow-sm"
                          />
                        ) : (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a192f] text-white font-bold text-xl border-2 border-red-600 shadow-sm">
                            {selectedUser.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="rounded bg-[#0a192f] px-2 py-0.5 text-[0.68rem] font-bold text-white border border-[#0a192f]">
                              USER ID: {selectedUser.id}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${
                                selectedUser.onlineAccessStatus === "Active"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                  : "bg-red-100 text-red-800 border border-red-200"
                              }`}
                            >
                              Online Access: {selectedUser.onlineAccessStatus}
                            </span>
                          </div>
                          <h3 className="mt-1.5 text-2xl font-black text-[#0a192f]">{selectedUser.name}</h3>
                          <p className="text-xs text-slate-500">
                            Joined on {selectedUser.displayDateJoined} • Customer Link ID: {selectedUser.linkedCustomerId}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2.5">
                        {/* Clearly labeled "Open customer profile" action */}
                        <Button
                          size="sm"
                          onClick={() => handleInitiateOpenCustomerProfile(selectedUser)}
                          className="bg-[#0a192f] hover:bg-[#152e55] text-white text-xs font-bold shadow-xs border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5 text-red-500" />
                          Open customer profile
                        </Button>
                        <button
                          type="button"
                          onClick={() => setSelectedUser(null)}
                          className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Quick Profile Summary Cards */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">Email Address</span>
                        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-900 truncate">
                          <Mail className="h-3.5 w-3.5 text-red-600 shrink-0" />
                          <span className="truncate">{selectedUser.email}</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">Phone Number</span>
                        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-900">
                          <Phone className="h-3.5 w-3.5 text-red-600 shrink-0" />
                          <span>{selectedUser.phone}</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">MFA / 2FA Status</span>
                        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-900">
                          <KeyRound className="h-3.5 w-3.5 text-red-600 shrink-0" />
                          <span>{selectedUser.security.twoFactorEnabled ? "Hardware / App 2FA Enabled" : "Not Enrolled"}</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">Active Sessions</span>
                        <div className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-900">
                          <Laptop className="h-3.5 w-3.5 text-red-600 shrink-0" />
                          <span>{selectedUser.security.activeSessionsCount} Live Session(s)</span>
                        </div>
                      </div>
                    </div>

                    {/* Mailing Address & Edit Profile Trigger */}
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-red-600" />
                          Registered Mailing Address
                        </span>
                        <p className="mt-1 text-xs text-slate-800">{selectedUser.mailingAddress}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setUserEditForm({
                            name: selectedUser.name,
                            phone: selectedUser.phone,
                            mailingAddress: selectedUser.mailingAddress,
                            profilePicUrl: selectedUser.profilePicUrl || "",
                            communicationPreferences: { ...selectedUser.communicationPreferences },
                          });
                          setUserEditModalOpen(true);
                        }}
                        className="border-red-200 bg-red-50 text-xs font-bold text-red-700 hover:bg-red-600 hover:text-white shrink-0 transition-colors"
                      >
                        <Edit3 className="mr-1.5 h-3.5 w-3.5" />
                        Edit Permitted Profile Details
                      </Button>
                    </div>

                    {/* Communication Preferences */}
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">
                        User Communication Preferences
                      </span>
                      <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                        <div className={`p-2 rounded-xl border ${selectedUser.communicationPreferences.emailAlerts ? "border-red-200 bg-red-50 text-red-800" : "border-slate-200 bg-white text-slate-400"}`}>
                          Email Alerts: {selectedUser.communicationPreferences.emailAlerts ? "Enabled" : "Off"}
                        </div>
                        <div className={`p-2 rounded-xl border ${selectedUser.communicationPreferences.smsNotifications ? "border-red-200 bg-red-50 text-red-800" : "border-slate-200 bg-white text-slate-400"}`}>
                          SMS Push: {selectedUser.communicationPreferences.smsNotifications ? "Enabled" : "Off"}
                        </div>
                        <div className={`p-2 rounded-xl border ${selectedUser.communicationPreferences.paperlessStatements ? "border-red-200 bg-red-50 text-red-800" : "border-slate-200 bg-white text-slate-400"}`}>
                          Paperless: {selectedUser.communicationPreferences.paperlessStatements ? "Active" : "Off"}
                        </div>
                        <div className={`p-2 rounded-xl border ${selectedUser.communicationPreferences.marketingUpdates ? "border-red-200 bg-red-50 text-red-800" : "border-slate-200 bg-white text-slate-400"}`}>
                          Marketing: {selectedUser.communicationPreferences.marketingUpdates ? "Subscribed" : "Opted Out"}
                        </div>
                      </div>
                    </div>

                    {/* Linked Bank Accounts (Masked by default) */}
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-red-600" />
                          Linked Financial Accounts (Masked Numbers)
                        </h4>
                        <span className="text-[0.68rem] text-slate-500 font-mono">
                          Safety: Never reveal full PAN or account secret
                        </span>
                      </div>
                      <div className="mt-3 space-y-2">
                        {accounts
                          .filter((a) => a.customerId === selectedUser.linkedCustomerId)
                          .map((acc) => (
                            <div
                              key={acc.id}
                              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center text-red-700 font-bold">
                                  {acc.currency}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900">{acc.accountType}</div>
                                  <div className="font-mono text-[0.7rem] text-slate-500">
                                    Number: {acc.accountNumberMasked} • Routing: {acc.routingNumber}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-mono font-bold text-slate-900">
                                  {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </div>
                                <span className="rounded bg-slate-200 px-2 py-0.5 text-[0.65rem] text-slate-700 font-semibold">
                                  Account Status: {acc.status}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Customer Transfer Status & History Section (Manage Users) */}
                    {(() => {
                      const userTransfers = transactions.filter(
                        (t) =>
                          t.customerName.toLowerCase() === selectedUser.name.toLowerCase() ||
                          t.customerId === selectedUser.linkedCustomerId
                      );
                      return (
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div>
                              <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                                <ArrowRightLeft className="h-4 w-4 text-red-600" />
                                Transfer Status & Oversight
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Review user transfers and update displayed status to On hold, Processing, or Completed.
                              </p>
                            </div>
                            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[0.68rem] font-bold text-red-700">
                              {userTransfers.length} Transfer(s)
                            </span>
                          </div>

                          {userTransfers.length === 0 ? (
                            <div className="p-4 text-center text-xs text-slate-400">
                              No transfer transactions recorded for this user profile yet.
                            </div>
                          ) : (
                            <div className="mt-3 divide-y divide-slate-100">
                              {userTransfers.map((tx) => (
                                <div
                                  key={tx.id}
                                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono font-bold text-slate-900">{tx.id}</span>
                                      <span className="text-slate-400">•</span>
                                      <span className="text-slate-700 font-semibold">{tx.type}</span>
                                      <span className="text-slate-400">•</span>
                                      <span className="text-slate-500">{tx.timestamp}</span>
                                    </div>
                                    <p className="text-slate-500 text-[0.72rem] mt-0.5">
                                      Counterparty: <strong className="text-slate-700">{tx.counterparty}</strong> • Masked Account: <span className="font-mono">{tx.accountMasked}</span>
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="text-right">
                                      <span
                                        className={`font-mono font-bold ${
                                          tx.direction === "credit" ? "text-emerald-600" : "text-slate-900"
                                        }`}
                                      >
                                        {tx.direction === "credit" ? "+" : "-"}
                                        {tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                      </span>
                                    </div>
                                    <span
                                      className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold ${
                                        (tx.transferStatus || tx.status) === "Completed"
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                          : (tx.transferStatus || tx.status) === "On hold"
                                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                                          : "bg-blue-50 text-blue-700 border border-blue-200"
                                      }`}
                                    >
                                      {tx.transferStatus || tx.status}
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleSelectTransactionForReview(tx)}
                                      className="border-red-200 bg-white text-xs font-semibold text-red-600 hover:bg-red-50 hover:border-red-300"
                                    >
                                      Review Status →
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Access Controls & Security Actions */}
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-5">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <Lock className="h-4 w-4 text-red-600" />
                          Digital Online Access Controls (Staff Admin)
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Modifying digital access does not reverse or alter settled bank funds. Re-authentication password is required for audit confirmation.
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2.5">
                        {selectedUser.onlineAccessStatus !== "Active" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Reinstate Online Access for ${selectedUser.name}?`,
                                description: "Reinstates digital credentials and allows the user to log back into online banking.",
                                confirmLabel: "Reinstate Access",
                                danger: false,
                                onConfirm: () => handleUpdateUserOnlineAccess(selectedUser.id, "Active", actionReason),
                              })
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs"
                          >
                            <UserCheck className="mr-1.5 h-3.5 w-3.5" />
                            Reinstate Online Access
                          </Button>
                        )}

                        {selectedUser.onlineAccessStatus !== "Suspended" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Suspend Online Access for ${selectedUser.name}?`,
                                description: "Immediately blocks portal authentication and terminates live sessions. Bank accounts remain on record.",
                                confirmLabel: "Suspend Digital Access",
                                danger: true,
                                requiresReauth: true,
                                onConfirm: () => handleUpdateUserOnlineAccess(selectedUser.id, "Suspended", actionReason),
                              })
                            }
                            className="bg-red-600 hover:bg-red-700 text-xs font-bold shadow-xs text-white"
                          >
                            <UserX className="mr-1.5 h-3.5 w-3.5" />
                            Suspend Online Access
                          </Button>
                        )}

                        {selectedUser.onlineAccessStatus !== "Closed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Permanently Close Online Access for ${selectedUser.name}?`,
                                description: "Deactivates digital credentials permanently. Requires new onboarding to regain web access.",
                                confirmLabel: "Close Online Access",
                                danger: true,
                                requiresReauth: true,
                                onConfirm: () => handleUpdateUserOnlineAccess(selectedUser.id, "Closed", actionReason),
                              })
                            }
                            className="border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold"
                          >
                            Close Digital Access
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setConfirmActionModal({
                              title: `Force Sign-Out All Active Sessions for ${selectedUser.name}?`,
                              description: "Invalidates all active JSON web tokens, mobile app sessions, and cookies. User must re-authenticate.",
                              confirmLabel: "Terminate All Sessions",
                              danger: false,
                              onConfirm: () => handleForceUserSignOut(selectedUser.id, actionReason),
                            })
                          }
                          className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs"
                        >
                          <Laptop className="mr-1.5 h-3.5 w-3.5 text-amber-500" />
                          Sign Out Active Sessions
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setConfirmActionModal({
                              title: `Require Password Reset on Next Login for ${selectedUser.name}?`,
                              description: "Marks credential as expired. The user will be prompted to choose a new secure passphrase upon their next sign-in.",
                              confirmLabel: "Enforce Password Reset",
                              danger: false,
                              onConfirm: () => handleRequirePasswordReset(selectedUser.id, actionReason),
                            })
                          }
                          className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold shadow-xs"
                        >
                          <KeyRound className="mr-1.5 h-3.5 w-3.5 text-red-600" />
                          Require Password Reset
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPasswordResetConfirmMethod(selectedUser.communicationPreferences.smsNotifications ? "SMS" : "Email");
                            setPasswordResetConfirmUser(selectedUser);
                          }}
                          className="border-slate-300 bg-white text-slate-800 hover:bg-slate-50 text-xs font-bold shadow-xs flex items-center gap-1.5"
                        >
                          <Mail className="h-3.5 w-3.5 text-blue-600" />
                          Send password reset
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setAdminResetPasswordModalUser(selectedUser);
                            setAdminResetPasswordOption("link");
                            setAdminResetPasswordReason("Customer account recovery and verified support request");
                            setAdminResetPasswordError("");
                          }}
                          className="border-red-300 text-red-700 bg-red-50/60 hover:bg-red-600 hover:text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                        >
                          <KeyRound className="h-3.5 w-3.5" />
                          Reset Customer Password
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            setUserToDeleteModal(selectedUser);
                            setDeleteReason("");
                            setDeleteConfirmChecked(false);
                            setDeleteError("");
                          }}
                          className="bg-red-700 hover:bg-red-800 text-xs font-bold text-white shadow-xs ml-auto"
                        >
                          <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                          Delete User
                        </Button>
                      </div>
                    </div>

                    {/* Internal Admin Notes */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-600" />
                        Internal Administrator Notes
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Private administrative log entries visible only to the Staff Admin.
                      </p>

                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={newAdminNoteText}
                          onChange={(e) => setNewAdminNoteText(e.target.value)}
                          placeholder="Add new internal administrative note..."
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddInternalAdminNote(selectedUser.id);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleAddInternalAdminNote(selectedUser.id)}
                          className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shrink-0 shadow-xs"
                        >
                          Add Note
                        </Button>
                      </div>

                      <div className="mt-4 space-y-2">
                        {selectedUser.adminNotes.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No administrative notes recorded yet.</p>
                        ) : (
                          selectedUser.adminNotes.map((note, idx) => (
                            <div
                              key={idx}
                              className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 leading-relaxed shadow-2xs"
                            >
                              {note}
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* History of Profile and Access Changes */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <History className="h-4 w-4 text-red-600" />
                        History of Profile and Access Changes
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Append-only history of administrative updates and access modifications for this user.
                      </p>

                      <div className="mt-4 divide-y divide-slate-200">
                        {selectedUser.accessChangeHistory.map((item) => (
                          <div key={item.id} className="py-3 text-xs">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-slate-900">{item.action}</span>
                              <span className="text-[0.7rem] font-mono text-slate-500">{item.timestamp}</span>
                            </div>
                            <div className="mt-1 text-[0.72rem] text-slate-600">
                              <span className="font-semibold text-slate-800">Operator:</span> {item.actor} |{" "}
                              <span className="font-semibold text-slate-800">Reason:</span> {item.reason}
                            </div>
                            <div className="mt-1 text-[0.68rem] font-mono text-red-800 bg-red-50 p-2 rounded-lg border border-red-200">
                              State Change: {item.newState}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Close Drawer Footer */}
                    <div className="mt-6 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedUser(null)}
                        className="border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        Close Profile Drawer
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL: CREATE NEW USER */}
              {createUserModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base">Create New User Record</h3>
                          <span className="rounded bg-red-100 px-2 py-0.5 text-[0.65rem] font-bold text-red-700">
                            Staff Authority
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Provision new user credentials & linked digital banking profile
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCreateUserModalOpen(false)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleCreateUser} className="mt-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Full Legal Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={newUserData.name}
                            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                            placeholder="e.g. Alexander Vance"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                            placeholder="e.g. alexander.vance@example.com"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                          <input
                            type="text"
                            value={newUserData.phone}
                            onChange={(e) => setNewUserData({ ...newUserData, phone: e.target.value })}
                            placeholder="+1 (555) 019-2831"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Country Jurisdiction</label>
                          <select
                            value={newUserData.country}
                            onChange={(e) => setNewUserData({ ...newUserData, country: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                          >
                            <option value="United States">United States (USD)</option>
                            <option value="United Kingdom">United Kingdom (GBP)</option>
                            <option value="Canada">Canada (CAD)</option>
                            <option value="Germany">Germany (EUR)</option>
                            <option value="Mexico">Mexico (MXN)</option>
                            <option value="Japan">Japan (JPY)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Account Product</label>
                          <select
                            value={newUserData.accountType}
                            onChange={(e) => setNewUserData({ ...newUserData, accountType: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                          >
                            <option value="Advantage Checking & Savings">Advantage Checking & Savings</option>
                            <option value="High-Yield Savings">High-Yield Savings</option>
                            <option value="Commercial Treasury">Commercial Treasury</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Initial Opening Balance ($)</label>
                          <input
                            type="number"
                            value={newUserData.initialBalance}
                            onChange={(e) => setNewUserData({ ...newUserData, initialBalance: e.target.value })}
                            placeholder="0.00"
                            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mailing Address</label>
                        <textarea
                          rows={2}
                          value={newUserData.mailingAddress}
                          onChange={(e) => setNewUserData({ ...newUserData, mailingAddress: e.target.value })}
                          placeholder="e.g. 742 Evergreen Terrace, Springfield, OR 97477"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div className="rounded-xl border border-red-100 bg-red-50/50 p-3 text-[0.72rem] text-slate-600 leading-relaxed">
                        <strong className="text-red-700 block mb-0.5">Administrative Safeguard:</strong>
                        System will generate secure, randomly seeded credentials and send a verifiable activation link. The administrator cannot view or enter passwords.
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCreateUserModalOpen(false)}
                          className="border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs"
                        >
                          Create User Record
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {/* 17 ACTIONS INTERACTIVE DIALOG MODALS */}

              {/* 1 & 2: Credit / Debit Account Modal */}
              {creditDebitModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${creditDebitModal.type === "credit" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {creditDebitModal.type === "credit" ? <ArrowDownToLine className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base">
                            {creditDebitModal.type === "credit" ? "Credit Customer Account" : "Debit Customer Account"}
                          </h3>
                          <p className="text-xs text-slate-500">For {creditDebitModal.user.name} ({creditDebitModal.user.id})</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCreditDebitModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleExecuteCreditDebit} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Target Account</label>
                        <select
                          value={creditDebitAccountType}
                          onChange={(e) => setCreditDebitAccountType(e.target.value as "checking" | "savings")}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        >
                          <option value="checking">Advantage Checking</option>
                          <option value="savings">High-Yield Savings</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Amount (USD $)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          placeholder="e.g. 500.00"
                          value={creditDebitAmount}
                          onChange={(e) => setCreditDebitAmount(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Description / Memo</label>
                        <input
                          type="text"
                          placeholder={creditDebitModal.type === "credit" ? "e.g. Administrative Credit Adjustment" : "e.g. Processing Fee Settlement"}
                          value={creditDebitDescription}
                          onChange={(e) => setCreditDebitDescription(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCreditDebitModal(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className={`text-xs font-bold text-white shadow-xs ${creditDebitModal.type === "credit" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
                        >
                          Apply {creditDebitModal.type === "credit" ? "Credit" : "Debit"}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 3: Generate Transaction Modal */}
              {generateTxModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Generate Transaction Record</h3>
                        <p className="text-xs text-slate-500">Creating custom ledger transaction for {generateTxModal.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setGenerateTxModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleExecuteGenerateTransaction} className="mt-4 space-y-3.5">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Type</label>
                          <select
                            value={genTxType}
                            onChange={(e) => setGenTxType(e.target.value as any)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                          >
                            <option value="Direct Deposit">Direct Deposit</option>
                            <option value="Wire Transfer">Wire Transfer</option>
                            <option value="Card Settlement">Card Settlement</option>
                            <option value="Bill Pay">Bill Pay</option>
                            <option value="Internal Transfer">Internal Transfer</option>
                            <option value="ACH Debit">ACH Debit</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Direction</label>
                          <select
                            value={genTxDirection}
                            onChange={(e) => setGenTxDirection(e.target.value as "credit" | "debit")}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                          >
                            <option value="credit">Credit (+)</option>
                            <option value="debit">Debit (-)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Amount ($ USD)</label>
                          <input
                            type="number"
                            step="0.01"
                            required
                            placeholder="0.00"
                            value={genTxAmount}
                            onChange={(e) => setGenTxAmount(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                          <select
                            value={genTxStatus}
                            onChange={(e) => setGenTxStatus(e.target.value as any)}
                            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                          >
                            <option value="Completed">Completed</option>
                            <option value="Processing">Processing</option>
                            <option value="On hold">On hold</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Counterparty / Merchant / Origin</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Federal Reserve Bank / Payroll Direct"
                          value={genTxCounterparty}
                          onChange={(e) => setGenTxCounterparty(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setGenerateTxModal(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs"
                        >
                          Generate Record
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 4: Edit Balance Modal */}
              {editBalanceModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Edit Account Balances</h3>
                        <p className="text-xs text-slate-500">Direct adjustment for {editBalanceModal.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditBalanceModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleExecuteEditBalance} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Checking Account Balance ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={editCheckingAmount}
                          onChange={(e) => setEditCheckingAmount(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">High-Yield Savings Balance ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={editSavingsAmount}
                          onChange={(e) => setEditSavingsAmount(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setEditBalanceModal(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white shadow-xs"
                        >
                          Save Balances
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 5: Account Usage Limits Modal */}
              {accountUsageLimitsModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Account Usage Limits</h3>
                        <p className="text-xs text-slate-500">Configure transfer & withdrawal limits for {accountUsageLimitsModal.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAccountUsageLimitsModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleExecuteSaveLimits} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Daily Transfer Limit ($)</label>
                        <input
                          type="number"
                          step="100"
                          required
                          value={dailyTransferLimitInput}
                          onChange={(e) => setDailyTransferLimitInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Daily ATM / Cash Withdrawal Limit ($)</label>
                        <input
                          type="number"
                          step="50"
                          required
                          value={dailyWithdrawalLimitInput}
                          onChange={(e) => setDailyWithdrawalLimitInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setAccountUsageLimitsModal(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-amber-600 hover:bg-amber-700 text-xs font-bold text-white shadow-xs"
                        >
                          Save Limits
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 7: Change Profile Pics Modal */}
              {changeProfilePicModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Change Profile Picture</h3>
                        <p className="text-xs text-slate-500">Update avatar image URL for {changeProfilePicModal.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setChangeProfilePicModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleExecuteSaveProfilePic} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Profile Photo Image URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={profilePicUrlInput}
                          onChange={(e) => setProfilePicUrlInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setChangeProfilePicModal(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs"
                        >
                          Save Avatar
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 13: Send Email Modal */}
              {sendEmailModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Send Official Administrative Email</h3>
                        <p className="text-xs text-slate-500">To: {sendEmailModal.name} &lt;{sendEmailModal.email}&gt;</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSendEmailModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleExecuteSendEmail} className="mt-4 space-y-3.5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                        <input
                          type="text"
                          required
                          value={emailSubjectInput}
                          onChange={(e) => setEmailSubjectInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Message Body</label>
                        <textarea
                          rows={5}
                          required
                          value={emailMessageInput}
                          onChange={(e) => setEmailMessageInput(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSendEmailModal(null)}
                          className="text-xs"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs flex items-center gap-1.5"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Dispatch Email</span>
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* 15: Login Activity Modal */}
              {loginActivityModal && (
                <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Customer Login Activity</h3>
                        <p className="text-xs text-slate-500">Security and session audit trail for {loginActivityModal.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLoginActivityModal(null)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-700">Last Sign-In Timestamp:</span>
                          <span className="font-mono text-slate-900">{loginActivityModal.security.lastSignIn}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-bold text-slate-700">Origin IP Address:</span>
                          <span className="font-mono text-slate-900">{loginActivityModal.security.lastSignInIp}</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-bold text-slate-700">Active Live Sessions:</span>
                          <span className="font-bold text-emerald-600">{loginActivityModal.security.activeSessionsCount} Active</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="font-bold text-slate-700">2FA Protection:</span>
                          <span className={`font-bold ${loginActivityModal.security.twoFactorEnabled ? "text-emerald-600" : "text-amber-600"}`}>
                            {loginActivityModal.security.twoFactorEnabled ? "Enabled" : "Disabled"}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">Recent Access Change Events</h4>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {loginActivityModal.accessChangeHistory.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No access modifications recorded.</p>
                        ) : (
                          loginActivityModal.accessChangeHistory.map((item) => (
                            <div key={item.id} className="p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-[0.72rem]">
                              <div className="flex items-center justify-between text-slate-600">
                                <span className="font-bold text-slate-800">{item.action}</span>
                                <span>{item.timestamp}</span>
                              </div>
                              <p className="text-slate-500 mt-0.5">{item.reason}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end pt-4 border-t border-slate-100 mt-4">
                      <Button
                        type="button"
                        onClick={() => setLoginActivityModal(null)}
                        className="bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white shadow-xs"
                      >
                        Close Activity Log
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {userEditModalOpen && selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                  <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Edit Permitted Profile Details</h3>
                        <p className="text-xs text-slate-500">Updating record for {selectedUser.name}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUserEditModalOpen(false)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                        <input
                          type="text"
                          value={userEditForm.name}
                          onChange={(e) => setUserEditForm({ ...userEditForm, name: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={userEditForm.phone}
                          onChange={(e) => setUserEditForm({ ...userEditForm, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Mailing Address</label>
                        <textarea
                          rows={2}
                          value={userEditForm.mailingAddress}
                          onChange={(e) => setUserEditForm({ ...userEditForm, mailingAddress: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Communication Preferences</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={userEditForm.communicationPreferences.emailAlerts}
                              onChange={(e) =>
                                setUserEditForm({
                                  ...userEditForm,
                                  communicationPreferences: {
                                    ...userEditForm.communicationPreferences,
                                    emailAlerts: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span>Email Security & Transaction Alerts</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={userEditForm.communicationPreferences.smsNotifications}
                              onChange={(e) =>
                                setUserEditForm({
                                  ...userEditForm,
                                  communicationPreferences: {
                                    ...userEditForm.communicationPreferences,
                                    smsNotifications: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span>SMS Notifications</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={userEditForm.communicationPreferences.paperlessStatements}
                              onChange={(e) =>
                                setUserEditForm({
                                  ...userEditForm,
                                  communicationPreferences: {
                                    ...userEditForm.communicationPreferences,
                                    paperlessStatements: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span>Paperless Electronic Statements</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={userEditForm.communicationPreferences.marketingUpdates}
                              onChange={(e) =>
                                setUserEditForm({
                                  ...userEditForm,
                                  communicationPreferences: {
                                    ...userEditForm.communicationPreferences,
                                    marketingUpdates: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                            />
                            <span>Marketing & Product Announcements</span>
                          </label>
                        </div>
                      </div>

                      {/* Profile Picture Upload & Preview */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Profile Picture (Upload or URL)</label>
                        <div className="flex items-center gap-3">
                          {userEditForm.profilePicUrl ? (
                            <img
                              src={userEditForm.profilePicUrl}
                              alt="Customer avatar"
                              className="h-12 w-12 rounded-xl object-cover border-2 border-red-500 shadow-xs shrink-0"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 border border-slate-300 text-slate-600 font-bold text-sm shrink-0">
                              {userEditForm.name ? userEditForm.name.charAt(0).toUpperCase() : "U"}
                            </div>
                          )}
                          <div className="flex-1 space-y-1">
                            <input
                              type="text"
                              value={userEditForm.profilePicUrl}
                              onChange={(e) => setUserEditForm({ ...userEditForm, profilePicUrl: e.target.value })}
                              placeholder="Image URL https://..."
                              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                            />
                            <label className="cursor-pointer inline-flex items-center gap-1.5 text-[0.7rem] font-bold text-red-600 hover:text-red-700">
                              <Upload className="h-3 w-3" /> Upload picture file
                              <input
                                type="file"
                                accept="image/*"
                                className="sr-only"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const res = reader.result as string;
                                      setUserEditForm((prev) => ({ ...prev, profilePicUrl: res }));
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">
                          Reason for Profile Update (Required for Audit Log):
                        </label>
                        <input
                          type="text"
                          value={actionReason}
                          onChange={(e) => setActionReason(e.target.value)}
                          placeholder="e.g., Customer verified documentation change request"
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setUserEditModalOpen(false)}
                        className="border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handleSaveUserProfileEdits(selectedUser.id)}
                        className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs px-4 py-2"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* INDIVIDUAL USER DELETION SAFEGUARD CONFIRMATION MODAL */}
          {userToDeleteModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            >
              <div className="relative w-full max-w-lg rounded-3xl border-2 border-rose-600 bg-white p-6 sm:p-7 shadow-2xl text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                {/* Alert Header */}
                <div className="flex items-start gap-3.5 border-b border-rose-100 pb-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 border border-rose-200">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-rose-600 px-2 py-0.5 text-[0.65rem] font-black uppercase text-white tracking-wider">
                        Safeguard Review
                      </span>
                      <span className="text-xs text-rose-600 font-bold">Individual Account Deletion</span>
                    </div>
                    <h3 className="mt-1 font-display text-lg font-black text-slate-900 leading-tight">
                      Permanently Delete User Account?
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      This sensitive operation requires clear target verification and mandatory audit logging.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserToDeleteModal(null);
                      setDeleteReason("");
                      setDeleteConfirmChecked(false);
                      setDeleteError("");
                    }}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Target Affected Account Card */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-500 uppercase tracking-wider text-[0.68rem]">
                      Account To Be Affected:
                    </span>
                    <span className="font-mono font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      {userToDeleteModal.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 block text-[0.68rem]">Full Legal Name:</span>
                      <span className="font-bold text-slate-900 text-sm">{userToDeleteModal.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[0.68rem]">Online Access Status:</span>
                      <span className="font-bold text-slate-800">{userToDeleteModal.onlineAccessStatus}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[0.68rem]">Email Address:</span>
                      <span className="text-slate-800 truncate block">{userToDeleteModal.email}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[0.68rem]">Phone Number:</span>
                      <span className="text-slate-800 font-mono">{userToDeleteModal.phone}</span>
                    </div>
                  </div>

                  {/* Linked Financial Assets Review */}
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block text-[0.68rem] font-bold uppercase tracking-wider">
                      Linked Financial Accounts & Balances:
                    </span>
                    {(() => {
                      const linkedAccs = accounts.filter((a) => a.customerId === userToDeleteModal.linkedCustomerId);
                      if (linkedAccs.length === 0) {
                        return (
                          <p className="text-[0.72rem] text-slate-500 mt-1 italic">
                            No active deposit accounts linked to customer ID {userToDeleteModal.linkedCustomerId}.
                          </p>
                        );
                      }
                      return (
                        <div className="mt-1 space-y-1">
                          {linkedAccs.map((acc) => (
                            <div key={acc.id} className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 text-[0.72rem]">
                              <span className="font-medium text-slate-700">
                                {acc.accountType} ({acc.accountNumberMasked})
                              </span>
                              <span className="font-mono font-bold text-slate-900">
                                {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Warning Notice */}
                <div className="mt-3.5 rounded-xl border border-rose-200 bg-rose-50/70 p-3 text-xs text-rose-950 flex items-start gap-2.5">
                  <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <p className="text-[0.72rem] leading-relaxed">
                    <strong>Permanent Deletion Notice:</strong> Purging this user removes their digital credentials and profile records. To preserve regulatory integrity, this action will be permanently recorded in the administrative activity history.
                  </p>
                </div>

                {/* Mandatory Reason Field */}
                <div className="mt-4 space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Reason for Deletion (Required for Audit Ledger): <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={deleteReason}
                    onChange={(e) => {
                      setDeleteReason(e.target.value);
                      if (deleteError) setDeleteError("");
                    }}
                    placeholder="e.g., Verified customer written GDPR/CCPA erasure request, or duplicate profile created during branch onboarding..."
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-rose-500 focus:outline-none"
                  />
                </div>

                {/* Confirmation Checkbox */}
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={deleteConfirmChecked}
                      onChange={(e) => {
                        setDeleteConfirmChecked(e.target.checked);
                        if (deleteError) setDeleteError("");
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                    />
                    <span className="leading-snug">
                      I confirm that I have reviewed the specific user details for <strong>{userToDeleteModal.name}</strong> ({userToDeleteModal.id}) and approve permanent deletion of this individual account only.
                    </span>
                  </label>
                </div>

                {deleteError && (
                  <p className="mt-2 text-xs font-bold text-rose-600 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {deleteError}
                  </p>
                )}

                {/* Actions */}
                <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setUserToDeleteModal(null);
                      setDeleteReason("");
                      setDeleteConfirmChecked(false);
                      setDeleteError("");
                    }}
                    className="border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel / Keep Account
                  </Button>
                  <Button
                    type="button"
                    onClick={handleExecuteDeleteUser}
                    disabled={!deleteConfirmChecked || deleteReason.trim().length < 5}
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Permanently Delete User Account
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* INDIVIDUAL USER SUSPEND / REINSTATE MODAL */}
          {userToSuspendModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            >
              <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${userToSuspendModal.targetStatus === "Suspended" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {userToSuspendModal.targetStatus === "Suspended" ? <UserX className="h-5 w-5" /> : <UserCheck className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-black text-slate-900">
                      {userToSuspendModal.targetStatus === "Suspended" ? "Suspend Digital Banking Access" : "Reinstate Digital Banking Access"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Target: {userToSuspendModal.user.name} ({userToSuspendModal.user.id})
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {userToSuspendModal.targetStatus === "Suspended"
                    ? "Suspending digital access immediately revokes user portal sessions and prevents further logins. Underlying bank records and account balances remain safely intact."
                    : "Reinstating access re-authorizes the user to sign in to their online banking portal."}
                </p>

                <div className="mt-4 space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Reason for {userToSuspendModal.targetStatus === "Suspended" ? "Suspension" : "Reinstatement"} (Required):
                  </label>
                  <textarea
                    rows={2}
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    placeholder={`Enter regulatory reason for ${userToSuspendModal.targetStatus.toLowerCase()} access...`}
                    className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
                  />
                </div>

                <div className="mt-5 flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setUserToSuspendModal(null);
                      setSuspendReason("");
                    }}
                    className="border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleExecuteSuspendUser}
                    className={`text-xs font-bold text-white shadow-xs ${userToSuspendModal.targetStatus === "Suspended" ? "bg-amber-600 hover:bg-amber-700" : "bg-emerald-600 hover:bg-emerald-700"}`}
                  >
                    {userToSuspendModal.targetStatus === "Suspended" ? "Confirm Suspension" : "Confirm Reinstatement"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* COMPREHENSIVE USER EDIT MODAL */}
          {editingUserRecord && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            >
              <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-display text-lg font-black text-slate-900">Edit User Profile Record</h3>
                    <p className="text-xs text-slate-500">Target ID: {editingUserRecord.id}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingUserRecord(null)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-4 space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={editUserFormData.name}
                      onChange={(e) => setEditUserFormData({ ...editUserFormData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={editUserFormData.email}
                        onChange={(e) => setEditUserFormData({ ...editUserFormData, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={editUserFormData.phone}
                        onChange={(e) => setEditUserFormData({ ...editUserFormData, phone: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mailing Address</label>
                    <input
                      type="text"
                      value={editUserFormData.mailingAddress}
                      onChange={(e) => setEditUserFormData({ ...editUserFormData, mailingAddress: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Online Access Status</label>
                      <select
                        value={editUserFormData.onlineAccessStatus}
                        onChange={(e) => setEditUserFormData({ ...editUserFormData, onlineAccessStatus: e.target.value as any })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                      >
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                        <option value="Reinstated">Reinstated</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">KYC Verification Status</label>
                      <select
                        value={editUserFormData.verificationStatus}
                        onChange={(e) => setEditUserFormData({ ...editUserFormData, verificationStatus: e.target.value as any })}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-800 focus:border-red-500 focus:outline-none"
                      >
                        <option value="Verified">Verified</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Action Required">Action Required</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Reason for Profile Edit (Required for Audit Trail) <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={editUserFormData.editReason}
                      onChange={(e) => setEditUserFormData({ ...editUserFormData, editReason: e.target.value })}
                      placeholder="Document customer request or verified documentation change..."
                      className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingUserRecord(null)}
                    className="border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSaveEditUser}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs px-4 py-2"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 1.8: NEW USER APPLICATION(S) QUEUE */}
          {/* ======================================================== */}
          {activeSection === "applications" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">New User Application(s)</h2>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                      {applications.filter((a) => a.status === "Pending" || a.status === "Under Review").length} Pending Review
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Review onboarding submissions from the public bank portal, inspect verification documents, and approve or decline accounts with recorded regulatory justification.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const saved = localStorage.getItem("us_finance_bank_applications");
                        if (saved) {
                          try {
                            setApplications(JSON.parse(saved));
                          } catch {}
                        }
                      }
                      setActionNotification("Applications queue synchronized with live portal storage.");
                      setTimeout(() => setActionNotification(""), 3500);
                    }}
                    className="border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-red-600" />
                    Refresh Queue
                  </Button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs">
                  <span className="text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">Total Applications</span>
                  <div className="mt-1 font-display text-xl sm:text-2xl font-black text-slate-900">{applications.length}</div>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-2xs">
                  <span className="text-[0.7rem] uppercase tracking-wider text-amber-700 font-bold">Pending Review</span>
                  <div className="mt-1 font-display text-xl sm:text-2xl font-black text-amber-900">
                    {applications.filter((a) => a.status === "Pending").length}
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-2xs">
                  <span className="text-[0.7rem] uppercase tracking-wider text-emerald-700 font-bold">Approved</span>
                  <div className="mt-1 font-display text-xl sm:text-2xl font-black text-emerald-900">
                    {applications.filter((a) => a.status === "Approved").length}
                  </div>
                </div>
                <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 shadow-2xs">
                  <span className="text-[0.7rem] uppercase tracking-wider text-rose-700 font-bold">Declined / Rejected</span>
                  <div className="mt-1 font-display text-xl sm:text-2xl font-black text-rose-900">
                    {applications.filter((a) => a.status === "Declined" || a.status === "Rejected").length}
                  </div>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[260px] max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={appSearchQuery}
                    onChange={(e) => setAppSearchQuery(e.target.value)}
                    placeholder="Search by applicant name, ID, email, country, or phone..."
                    className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none shadow-xs"
                  />
                  {appSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setAppSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
                  {[
                    { id: "all", label: `All (${applications.length})` },
                    { id: "Pending", label: `Pending (${applications.filter((a) => a.status === "Pending").length})` },
                    { id: "Under Review", label: `Under Review (${applications.filter((a) => a.status === "Under Review").length})` },
                    { id: "Approved", label: `Approved (${applications.filter((a) => a.status === "Approved").length})` },
                    { id: "Declined", label: `Declined (${applications.filter((a) => a.status === "Declined" || a.status === "Rejected").length})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setAppStatusFilter(tab.id)}
                      className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                        appStatusFilter === tab.id
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Applications Table on Desktop / Responsive Cards on Mobile */}
              {(() => {
                const filtered = applications.filter((app) => {
                  const q = appSearchQuery.toLowerCase().trim();
                  const matchesSearch =
                    !q ||
                    app.fullName.toLowerCase().includes(q) ||
                    app.id.toLowerCase().includes(q) ||
                    app.email.toLowerCase().includes(q) ||
                    app.phone.toLowerCase().includes(q) ||
                    app.countryName.toLowerCase().includes(q) ||
                    app.idNumber.toLowerCase().includes(q) ||
                    app.accountType.toLowerCase().includes(q);
                  const matchesStatus =
                    appStatusFilter === "all" ||
                    (appStatusFilter === "Declined"
                      ? app.status === "Declined" || app.status === "Rejected"
                      : app.status === appStatusFilter);
                  return matchesSearch && matchesStatus;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                      <UserCheck className="mx-auto h-12 w-12 text-slate-300" />
                      <h3 className="mt-3 font-display font-bold text-slate-800 text-sm">No Applications Found</h3>
                      <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        No portal applications match the selected status filter or search query. New public account submissions will appear here automatically.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">
                          <tr>
                            <th className="px-5 py-3.5">Ref ID & Date</th>
                            <th className="px-5 py-3.5">Applicant Details</th>
                            <th className="px-5 py-3.5">Country & Account</th>
                            <th className="px-5 py-3.5">ID Verification</th>
                            <th className="px-5 py-3.5">Status</th>
                            <th className="px-5 py-3.5">Review Notes / Reason</th>
                            <th className="px-5 py-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filtered.map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-5 py-4">
                                <div className="font-mono font-bold text-slate-900">{app.id}</div>
                                <div className="text-[0.7rem] text-slate-500 flex items-center gap-1 mt-0.5">
                                  <Clock className="h-3 w-3 text-slate-400" />
                                  {app.submittedAt}
                                </div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="font-bold text-slate-900 text-sm">{app.fullName}</div>
                                <div className="text-slate-500 text-[0.72rem]">{app.email}</div>
                                <div className="text-slate-400 font-mono text-[0.68rem]">{app.phone}</div>
                              </td>
                              <td className="px-5 py-4">
                                <div className="font-semibold text-slate-800">{app.countryName}</div>
                                <div className="text-slate-500 text-[0.72rem]">{app.accountType}</div>
                                {app.region && <div className="text-[0.68rem] text-slate-400">{app.region}</div>}
                              </td>
                              <td className="px-5 py-4">
                                <div className="text-slate-800 font-medium">{app.idType}</div>
                                <div className="font-mono text-slate-500 text-[0.7rem]">{app.idNumber}</div>
                              </td>
                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold border ${
                                    app.status === "Approved"
                                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                      : app.status === "Declined" || app.status === "Rejected"
                                      ? "bg-rose-50 text-rose-800 border-rose-200"
                                      : app.status === "Under Review"
                                      ? "bg-sky-50 text-sky-800 border-sky-200"
                                      : "bg-amber-50 text-amber-800 border-amber-200"
                                  }`}
                                >
                                  {app.status === "Approved" && <CheckCircle2 className="h-3 w-3 text-emerald-600" />}
                                  {(app.status === "Declined" || app.status === "Rejected") && <XCircle className="h-3 w-3 text-rose-600" />}
                                  {app.status === "Under Review" && <Eye className="h-3 w-3 text-sky-600" />}
                                  {app.status === "Pending" && <Clock className="h-3 w-3 text-amber-600" />}
                                  {app.status}
                                </span>
                              </td>
                              <td className="px-5 py-4 max-w-xs">
                                <p className="text-[0.72rem] text-slate-600 line-clamp-2" title={app.reviewNotes || app.decisionReason}>
                                  {app.reviewNotes || app.decisionReason || "Awaiting review."}
                                </p>
                                {app.updatedAt && (
                                  <span className="text-[0.65rem] text-slate-400 block mt-0.5">Updated: {app.updatedAt}</span>
                                )}
                              </td>
                              <td className="px-5 py-4 text-right">
                                <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedAppModal(app)}
                                    className="border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-slate-100"
                                  >
                                    Review
                                  </Button>
                                  {app.status !== "Approved" && (
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        setAppDecisionModal({ app, decision: "Approved" });
                                        setAppDecisionReason("Identity verified and all documentation meets regulatory compliance.");
                                      }}
                                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs"
                                    >
                                      Approve
                                    </Button>
                                  )}
                                  {app.status !== "Declined" && app.status !== "Rejected" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        setAppDecisionModal({ app, decision: "Declined" });
                                        setAppDecisionReason("Provided identity documentation could not be verified against national registries.");
                                      }}
                                      className="border-rose-200 bg-rose-50/50 text-rose-700 hover:bg-rose-100 text-xs font-bold"
                                    >
                                      Decline
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* APPLICATION DETAILS INSPECTION MODAL */}
          {selectedAppModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            >
              <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xl text-slate-800 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
                <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#0a192f] px-2 py-0.5 text-[0.68rem] font-bold text-white">
                        APPLICATION: {selectedAppModal.id}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold border ${
                          selectedAppModal.status === "Approved"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : selectedAppModal.status === "Declined" || selectedAppModal.status === "Rejected"
                            ? "bg-rose-50 text-rose-800 border-rose-200"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        Status: {selectedAppModal.status}
                      </span>
                    </div>
                    <h3 className="mt-2 text-2xl font-black text-slate-900">{selectedAppModal.fullName}</h3>
                    <p className="text-xs text-slate-500">
                      Submitted on {selectedAppModal.submittedAt} via Public Bank Portal
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedAppModal(null)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                  >
                    ✕
                  </button>
                </div>

                {/* Structured Details Grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                    <span className="text-[0.68rem] uppercase font-bold text-slate-500">Contact Information</span>
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-red-600" />
                      {selectedAppModal.email}
                    </div>
                    <div className="font-mono text-slate-700 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-red-600" />
                      {selectedAppModal.phone}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                    <span className="text-[0.68rem] uppercase font-bold text-slate-500">Jurisdiction & Residence</span>
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-red-600" />
                      {selectedAppModal.countryName} ({selectedAppModal.countryCode})
                    </div>
                    <div className="text-slate-600">Region: {selectedAppModal.region || "Standard Region"}</div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                    <span className="text-[0.68rem] uppercase font-bold text-slate-500">Identity Verification Document</span>
                    <div className="font-semibold text-slate-900">{selectedAppModal.idType}</div>
                    <div className="font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                      Number: {selectedAppModal.idNumber}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-1">
                    <span className="text-[0.68rem] uppercase font-bold text-slate-500">Requested Financial Product</span>
                    <div className="font-bold text-slate-900 text-sm">{selectedAppModal.accountType}</div>
                    <div className="text-slate-500 text-[0.72rem]">Initial Deposit: $0.00 (Pending Approval)</div>
                  </div>
                </div>

                {/* Review Notes / Decision History */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <span className="text-[0.68rem] uppercase font-bold text-slate-500 block mb-1">
                    Application Notes & Decision Record:
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {selectedAppModal.reviewNotes || "No review notes recorded yet."}
                  </p>
                  {selectedAppModal.updatedAt && (
                    <p className="text-[0.7rem] text-slate-400 mt-2">
                      Last Decision Recorded: {selectedAppModal.updatedAt} by {selectedAppModal.decisionBy || "Staff Admin"}
                    </p>
                  )}
                </div>

                {/* Action Decision Controls */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() => {
                        setAppDecisionModal({ app: selectedAppModal, decision: "Approved" });
                        setAppDecisionReason("Identity verified and all documentation meets regulatory compliance.");
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve Application
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setAppDecisionModal({ app: selectedAppModal, decision: "Declined" });
                        setAppDecisionReason("Provided identity documentation could not be verified against national registries.");
                      }}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Decline Application
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setAppDecisionModal({ app: selectedAppModal, decision: "Under Review" });
                        setAppDecisionReason("Application placed in escalated regulatory review pending additional address verification.");
                      }}
                      className="border-sky-300 text-sky-800 bg-sky-50 hover:bg-sky-100 text-xs font-semibold"
                    >
                      Mark Under Review
                    </Button>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedAppModal(null)}
                    className="border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* APPLICATION DECISION MODAL WITH REASON REQUIREMENT */}
          {appDecisionModal && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
            >
              <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-800 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      appDecisionModal.decision === "Approved"
                        ? "bg-emerald-100 text-emerald-700"
                        : appDecisionModal.decision === "Declined"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-sky-100 text-sky-700"
                    }`}
                  >
                    {appDecisionModal.decision === "Approved" && <CheckCircle2 className="h-5 w-5" />}
                    {appDecisionModal.decision === "Declined" && <XCircle className="h-5 w-5" />}
                    {appDecisionModal.decision === "Under Review" && <Eye className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="font-display text-base font-black text-slate-900">
                      {appDecisionModal.decision === "Approved"
                        ? "Approve Application"
                        : appDecisionModal.decision === "Declined"
                        ? "Decline Application"
                        : "Set Under Review"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Applicant: {appDecisionModal.app.fullName} ({appDecisionModal.app.id})
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Decision Reason / Regulatory Justification (Required): <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={appDecisionReason}
                      onChange={(e) => setAppDecisionReason(e.target.value)}
                      placeholder="Specify reason for decision (e.g., identity verified against national database, invalid document, etc.)..."
                      className="w-full rounded-xl border border-slate-300 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  {appDecisionModal.decision === "Approved" && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                      <label className="flex items-start gap-2.5 cursor-pointer text-xs text-emerald-950 font-medium">
                        <input
                          type="checkbox"
                          checked={autoProvisionUser}
                          onChange={(e) => setAutoProvisionUser(e.target.checked)}
                          className="mt-0.5 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>
                          Automatically provision active online banking user account for <strong>{appDecisionModal.app.fullName}</strong> in User Management.
                        </span>
                      </label>
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setAppDecisionModal(null);
                      setAppDecisionReason("");
                    }}
                    className="border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleExecuteApplicationDecision}
                    disabled={!appDecisionReason.trim()}
                    className={`text-xs font-bold text-white shadow-xs disabled:opacity-50 ${
                      appDecisionModal.decision === "Approved"
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : appDecisionModal.decision === "Declined"
                        ? "bg-rose-600 hover:bg-rose-700"
                        : "bg-sky-600 hover:bg-sky-700"
                    }`}
                  >
                    Confirm & Record Decision
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 2: CUSTOMERS DIRECTORY & PROFILES */}
          {/* ======================================================== */}
          {activeSection === "customers" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">Customer Management</h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive customer identity records, KYC tier statuses, and administrative restrictions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Filter Status:</span>
                  <select
                    value={customerFilterStatus}
                    onChange={(e) => setCustomerFilterStatus(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="all">All Statuses ({customers.length})</option>
                    <option value="active">Active Only</option>
                    <option value="restricted">Restricted</option>
                    <option value="frozen">Frozen</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Customers Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="border-b border-slate-800 bg-slate-900/90 text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold">
                      <tr>
                        <th className="px-5 py-3.5">Customer & ID</th>
                        <th className="px-5 py-3.5">Jurisdiction</th>
                        <th className="px-5 py-3.5">Verification</th>
                        <th className="px-5 py-3.5">Risk Rating</th>
                        <th className="px-5 py-3.5">Account Status</th>
                        <th className="px-5 py-3.5">Linked Accounts</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredCustomers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                            No customers match the current filter criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredCustomers.map((cust) => (
                          <tr key={cust.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                {(() => {
                                  const matchingUser = adminUsers.find((u) => u.linkedCustomerId === cust.id || u.name === cust.name);
                                  const pic = matchingUser?.profilePicUrl || cust.profilePicUrl;
                                  return pic ? (
                                    <img
                                      src={pic}
                                      alt={cust.name}
                                      className="h-8 w-8 rounded-full object-cover border border-slate-700 shrink-0"
                                    />
                                  ) : (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-teal-400 font-bold text-xs border border-slate-700">
                                      {cust.name.charAt(0)}
                                    </div>
                                  );
                                })()}
                                <div>
                                  <div className="font-bold text-white text-sm">{cust.name}</div>
                                  <div className="text-[0.68rem] text-slate-500 font-mono">{cust.id} • {cust.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5">
                              <span className="font-semibold text-slate-200">{cust.country}</span>
                              <div className="text-[0.68rem] text-slate-500">{cust.countryCode}</div>
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                                  cust.verificationStatus === "Verified"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : cust.verificationStatus === "Pending Review"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                }`}
                              >
                                {cust.verificationStatus}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`rounded px-2 py-0.5 text-[0.65rem] font-bold ${
                                  cust.riskLevel === "Low"
                                    ? "bg-slate-800 text-slate-300"
                                    : cust.riskLevel === "Medium"
                                    ? "bg-amber-500/20 text-amber-300"
                                    : "bg-rose-500/20 text-rose-300"
                                }`}
                              >
                                {cust.riskLevel}
                              </span>
                            </td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`inline-block font-bold capitalize ${
                                  cust.status === "Active"
                                    ? "text-emerald-400"
                                    : cust.status === "Frozen"
                                    ? "text-rose-400"
                                    : "text-amber-400"
                                }`}
                              >
                                {cust.status}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 font-mono text-[0.7rem] text-slate-400">
                              {cust.linkedAccountIds.length} Linked
                            </td>
                            <td className="px-5 py-3.5 text-right">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedCustomer(cust);
                                  appendAuditLog("Customers", "Inspected Customer Profile", `Opened profile for ${cust.name}`, cust.id);
                                }}
                                className="border-slate-700 text-xs text-teal-300 hover:bg-teal-500/20 hover:border-teal-500"
                              >
                                View Profile →
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Customer Profile Drawer / Modal */}
              {selectedCustomer && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                >
                  <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(null)}
                      className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      {(() => {
                        const matchingUser = adminUsers.find((u) => u.linkedCustomerId === selectedCustomer.id || u.name === selectedCustomer.name);
                        const pic = matchingUser?.profilePicUrl || selectedCustomer.profilePicUrl;
                        return pic ? (
                          <img
                            src={pic}
                            alt={selectedCustomer.name}
                            className="h-12 w-12 rounded-xl object-cover border border-slate-700"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg">
                            {selectedCustomer.name.slice(0, 2).toUpperCase()}
                          </div>
                        );
                      })()}
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedCustomer.name}</h3>
                        <p className="text-xs text-slate-400 font-mono">
                          Customer ID: {selectedCustomer.id} • Joined: {selectedCustomer.joinedDate}
                        </p>
                      </div>
                    </div>

                    {/* Detailed Attributes */}
                    <div className="mt-5 grid gap-4 sm:grid-cols-2 text-xs">
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                        <span className="text-[0.68rem] font-bold text-slate-500 uppercase">Contact Information</span>
                        <div className="mt-2 space-y-1">
                          <p><strong className="text-slate-400">Email:</strong> {selectedCustomer.email}</p>
                          <p><strong className="text-slate-400">Phone:</strong> {selectedCustomer.phone}</p>
                          <p><strong className="text-slate-400">Address:</strong> {selectedCustomer.address}</p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                        <span className="text-[0.68rem] font-bold text-slate-500 uppercase">Identity & KYC Verification</span>
                        <div className="mt-2 space-y-1">
                          <p><strong className="text-slate-400">ID Document:</strong> {selectedCustomer.idType}</p>
                          <div className="flex items-center gap-2">
                            <strong className="text-slate-400">ID Number:</strong>
                            <span className="font-mono">
                              {unmaskedCustomerIds[selectedCustomer.id]
                                ? "982-41-8821 (Fictional Unmasked)"
                                : selectedCustomer.idNumberMasked}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const nextState = !unmaskedCustomerIds[selectedCustomer.id];
                                setUnmaskedCustomerIds((prev) => ({ ...prev, [selectedCustomer.id]: nextState }));
                                appendAuditLog(
                                  "Customers",
                                  nextState ? "Unmasked Sensitive ID" : "Masked Sensitive ID",
                                  `Administrator toggled mask for ${selectedCustomer.name}`,
                                  selectedCustomer.id
                                );
                              }}
                              className="text-teal-400 hover:text-teal-300 p-0.5"
                              title="Toggle Mask"
                            >
                              {unmaskedCustomerIds[selectedCustomer.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                            </button>
                          </div>
                          <p>
                            <strong className="text-slate-400">KYC Status:</strong>{" "}
                            <span className="text-emerald-400 font-bold">{selectedCustomer.verificationStatus}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs">
                      <span className="text-[0.68rem] font-bold text-slate-500 uppercase">Administrative Notes</span>
                      <p className="mt-1 text-slate-300 italic">{selectedCustomer.adminNotes}</p>
                    </div>

                    {/* Linked Bank Accounts */}
                    <div className="mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Linked Accounts ({selectedCustomer.linkedAccountIds.length})
                      </h4>
                      <div className="space-y-2">
                        {accounts
                          .filter((a) => selectedCustomer.linkedAccountIds.includes(a.id))
                          .map((acc) => (
                            <div key={acc.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs">
                              <div>
                                <span className="font-bold text-white">{acc.accountType}</span>
                                <span className="text-slate-500 font-mono ml-2">{acc.accountNumberMasked}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-mono font-bold text-white">
                                  {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                                <span className={`block text-[0.65rem] font-bold ${acc.status === "Active" ? "text-emerald-400" : "text-rose-400"}`}>
                                  {acc.status}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Safe Status Actions with Audit Confirmation */}
                    <div className="mt-6 border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="text-[0.7rem] text-slate-500">
                        Current Status: <strong className="text-white">{selectedCustomer.status}</strong>
                      </div>
                      <div className="flex items-center gap-2">
                        {selectedCustomer.status !== "Active" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Restore Active Access for ${selectedCustomer.name}?`,
                                description: "This will restore full customer sign-in and transactional permissions.",
                                confirmLabel: "Activate Customer",
                                onConfirm: () => handleUpdateCustomerStatus(selectedCustomer.id, "Active", actionReason),
                              })
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold"
                          >
                            Activate Account
                          </Button>
                        )}
                        {selectedCustomer.status !== "Frozen" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Freeze Customer ${selectedCustomer.name}?`,
                                description: "Freezing restricts all customer logins and pauses automated clearing until unfreezed.",
                                confirmLabel: "Freeze Account",
                                danger: true,
                                onConfirm: () => handleUpdateCustomerStatus(selectedCustomer.id, "Frozen", actionReason),
                              })
                            }
                            className="bg-rose-600 hover:bg-rose-700 text-xs font-bold"
                          >
                            Freeze Account
                          </Button>
                        )}
                        {selectedCustomer.status !== "Suspended" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Suspend Customer ${selectedCustomer.name}?`,
                                description: "Suspension revokes online banking credentials. Requires manual admin reinstatement.",
                                confirmLabel: "Suspend Account",
                                danger: true,
                                onConfirm: () => handleUpdateCustomerStatus(selectedCustomer.id, "Suspended", actionReason),
                              })
                            }
                            className="border-rose-500/50 text-rose-300 hover:bg-rose-950 text-xs font-bold"
                          >
                            Suspend Access
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 3: BANK ACCOUNTS DIRECTORY */}
          {/* ======================================================== */}
          {activeSection === "accounts" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">Bank Accounts Register</h2>
                  <p className="text-xs text-slate-400">
                    Checking, high-yield savings, and commercial treasury accounts with masked numbers.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Account Type:</span>
                  <select
                    value={accountFilterType}
                    onChange={(e) => setAccountFilterType(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="all">All Types ({accounts.length})</option>
                    <option value="Advantage Checking">Advantage Checking</option>
                    <option value="High-Yield Savings">High-Yield Savings</option>
                    <option value="Treasury Money Market">Treasury Money Market</option>
                    <option value="Commercial Operations">Commercial Operations</option>
                  </select>
                </div>
              </div>

              {/* Accounts Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="border-b border-slate-800 bg-slate-900/90 text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold">
                      <tr>
                        <th className="px-5 py-3.5">Account ID & Type</th>
                        <th className="px-5 py-3.5">Linked Customer</th>
                        <th className="px-5 py-3.5">Masked Account Number</th>
                        <th className="px-5 py-3.5">Status</th>
                        <th className="px-5 py-3.5 text-right">Ledger Balance</th>
                        <th className="px-5 py-3.5 text-right">Available Balance</th>
                        <th className="px-5 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredAccounts.map((acc) => (
                        <tr key={acc.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                          <td className="px-5 py-3.5 font-sans">
                            <div className="font-bold text-white">{acc.accountType}</div>
                            <div className="text-[0.68rem] text-slate-500 font-mono">{acc.id}</div>
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span className="font-semibold text-slate-200">{acc.customerName}</span>
                            <div className="text-[0.68rem] text-slate-500 font-mono">{acc.customerId}</div>
                          </td>
                          <td className="px-5 py-3.5 text-slate-400">{acc.accountNumberMasked}</td>
                          <td className="px-5 py-3.5 font-sans">
                            <span
                              className={`inline-block font-bold capitalize ${
                                acc.status === "Active"
                                  ? "text-emerald-400"
                                  : acc.status === "Frozen"
                                  ? "text-rose-400"
                                  : "text-amber-400"
                              }`}
                            >
                              {acc.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right font-bold text-white">
                            {acc.currency} {acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-5 py-3.5 text-right text-slate-300">
                            {acc.currency} {acc.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-5 py-3.5 text-right font-sans">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedAccount(acc);
                                appendAuditLog("Accounts", "Inspected Account Detail", `Viewed account ${acc.id} (${acc.customerName})`, acc.id);
                              }}
                              className="border-slate-700 text-xs text-teal-300 hover:bg-teal-500/20 hover:border-teal-500"
                            >
                              Inspect Details →
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Account Detail Modal */}
              {selectedAccount && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                >
                  <div className="relative w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => setSelectedAccount(null)}
                      className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{selectedAccount.accountType}</h3>
                        <p className="text-xs text-slate-400 font-mono">
                          ID: {selectedAccount.id} • Customer: {selectedAccount.customerName}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs font-mono">
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                        <span className="text-[0.65rem] text-slate-500 uppercase font-sans font-bold">Ledger Balance</span>
                        <p className="text-lg font-black text-white mt-1">
                          {selectedAccount.currency} {selectedAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                        <span className="text-[0.65rem] text-slate-500 uppercase font-sans font-bold">Available Balance</span>
                        <p className="text-lg font-black text-teal-400 mt-1">
                          {selectedAccount.currency} {selectedAccount.availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs space-y-1">
                      <p><strong className="text-slate-400">Account Number:</strong> {selectedAccount.accountNumberMasked} (Masked)</p>
                      <p><strong className="text-slate-400">Routing Number:</strong> {selectedAccount.routingNumber}</p>
                      <p><strong className="text-slate-400">Last Activity:</strong> {selectedAccount.lastActivity}</p>
                      <p><strong className="text-slate-400">Date Opened:</strong> {selectedAccount.openedDate}</p>
                    </div>

                    {/* Account Status Safeguard Actions */}
                    <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400">
                        Status: <strong className="text-white capitalize">{selectedAccount.status}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedAccount.status !== "Active" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Reactivate Account ${selectedAccount.id}?`,
                                description: "This will restore standard transaction processing for this account.",
                                confirmLabel: "Reactivate Account",
                                onConfirm: () => handleUpdateAccountStatus(selectedAccount.id, "Active", actionReason),
                              })
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold"
                          >
                            Reactivate
                          </Button>
                        )}
                        {selectedAccount.status !== "Frozen" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Freeze Account ${selectedAccount.id}?`,
                                description: "This pauses all automated debits, wires, and withdrawals.",
                                confirmLabel: "Freeze Account",
                                danger: true,
                                onConfirm: () => handleUpdateAccountStatus(selectedAccount.id, "Frozen", actionReason),
                              })
                            }
                            className="bg-rose-600 hover:bg-rose-700 text-xs font-bold"
                          >
                            Freeze Account
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 4: TRANSACTIONS OVERSIGHT & FLAGGED QUEUE */}
          {/* ======================================================== */}
          {activeSection === "transactions" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">Transfer Transactions</h2>
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200">
                      Oversight Ledger
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Administrative oversight and transaction history ledger. Real-time bank transfer records.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-bold">Status Filter:</span>
                  <select
                    value={txFilterStatus}
                    onChange={(e) => setTxFilterStatus(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-red-500 focus:outline-none shadow-xs"
                  >
                    <option value="all">All Transactions ({transactions.length})</option>
                    <option value="completed">Completed</option>
                    <option value="flagged">Flagged ({flaggedTxCount})</option>
                    <option value="pending clearing">Pending Clearing</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="border-b border-slate-200 bg-slate-50 text-[0.7rem] uppercase tracking-wider text-slate-500 font-bold">
                      <tr>
                        <th className="px-5 py-3.5">Transaction ID & Date</th>
                        <th className="px-5 py-3.5">Customer & Account</th>
                        <th className="px-5 py-3.5">Type & Channel</th>
                        <th className="px-5 py-3.5">Counterparty</th>
                        <th className="px-5 py-3.5 text-right">Amount</th>
                        <th className="px-5 py-3.5">Review Status</th>
                        <th className="px-5 py-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-slate-900 font-mono">{tx.id}</div>
                            <div className="text-[0.68rem] text-slate-500 font-sans">{tx.timestamp}</div>
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span className="font-semibold text-slate-800">{tx.customerName}</span>
                            <div className="text-[0.68rem] text-slate-500 font-mono">{tx.accountMasked}</div>
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span className="font-medium text-slate-700">{tx.type}</span>
                          </td>
                          <td className="px-5 py-3.5 font-sans text-slate-600 truncate max-w-xs">{tx.counterparty}</td>
                          <td className="px-5 py-3.5 text-right font-sans">
                            <div
                              className={`font-mono font-bold text-xs ${
                                tx.direction === "credit" ? "text-emerald-600" : "text-slate-800"
                              }`}
                            >
                              {tx.direction === "credit" ? "+" : "-"}{tx.currency}
                            </div>
                            <div
                              className={`font-mono font-black text-sm ${
                                tx.direction === "credit" ? "text-emerald-600" : "text-slate-900"
                              }`}
                            >
                              {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                                (tx.transferStatus || tx.status) === "Completed"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : (tx.transferStatus || tx.status) === "On hold"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : (tx.transferStatus || tx.status) === "Processing"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : tx.status === "Flagged"
                                  ? "bg-red-50 text-red-700 border border-red-200 animate-pulse"
                                  : tx.status === "Resolved"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {tx.transferStatus || tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right font-sans">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSelectTransactionForReview(tx)}
                              className="border-red-200 bg-white text-xs text-red-600 hover:bg-red-50 hover:border-red-300 font-bold shadow-2xs"
                            >
                              Review →
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Transaction Detail & Transfer Status Review Modal */}
              {selectedTransaction && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
                >
                  <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 text-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
                    <button
                      type="button"
                      onClick={() => setSelectedTransaction(null)}
                      className="absolute right-5 top-5 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                    >
                      ✕
                    </button>

                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-600 text-white shadow-md shadow-red-600/20">
                        <ArrowRightLeft className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-slate-900">
                            Transfer Review: {selectedTransaction.id}
                          </h3>
                          <span className="rounded bg-red-100 px-2 py-0.5 text-[0.65rem] font-bold text-red-700 border border-red-200">
                            Staff Admin Review
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Customer: <strong className="text-slate-700">{selectedTransaction.customerName}</strong> • {selectedTransaction.timestamp}
                        </p>
                      </div>
                    </div>

                    {/* Transfer Summary Cards */}
                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.68rem] uppercase font-bold text-slate-500 tracking-wider">Total Amount</span>
                        <div className="mt-1 flex items-baseline gap-1">
                          <span className={`text-xl font-black font-mono ${selectedTransaction.direction === "credit" ? "text-emerald-600" : "text-slate-900"}`}>
                            {selectedTransaction.direction === "credit" ? "+" : "-"}{selectedTransaction.currency} {selectedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[0.7rem] text-slate-500 font-semibold">({selectedTransaction.direction.toUpperCase()})</span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.68rem] uppercase font-bold text-slate-500 tracking-wider">Target / Source Account</span>
                        <p className="mt-1 font-mono font-bold text-sm text-slate-900">{selectedTransaction.accountMasked}</p>
                        <p className="text-[0.7rem] text-slate-500">{selectedTransaction.type}</p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.68rem] uppercase font-bold text-slate-500 tracking-wider">Counterparty Beneficiary</span>
                        <p className="mt-1 font-semibold text-slate-800 text-xs truncate">{selectedTransaction.counterparty}</p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <span className="text-[0.68rem] uppercase font-bold text-slate-500 tracking-wider">Current Displayed Status</span>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              (selectedTransaction.transferStatus || selectedTransaction.status) === "Completed"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : (selectedTransaction.transferStatus || selectedTransaction.status) === "On hold"
                                ? "bg-amber-100 text-amber-800 border border-amber-200"
                                : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}
                          >
                            {selectedTransaction.transferStatus || selectedTransaction.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DEDICATED TRANSFER STATUS SECTION */}
                    <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/40 p-5">
                      <div className="flex items-center justify-between border-b border-red-200/60 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white shadow-xs">
                            <ArrowRightLeft className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">Transfer Status Control</h4>
                            <p className="text-[0.7rem] text-slate-500">
                              Update displayed status to On hold, Processing, or Completed with customer sync.
                            </p>
                          </div>
                        </div>
                        <span className="rounded bg-red-100 px-2.5 py-0.5 text-[0.68rem] font-bold text-red-700">
                          Active Status: {selectedTransaction.transferStatus || selectedTransaction.status}
                        </span>
                      </div>

                      {/* Status Selector Segmented Control */}
                      <div className="mt-4">
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          Select New Transfer Status:
                        </label>
                        <div className="grid grid-cols-3 gap-2.5">
                          {/* On hold */}
                          <button
                            type="button"
                            onClick={() => {
                              setTransferStatusSelected("On hold");
                              setTransferStatusError("");
                            }}
                            className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border font-bold text-xs transition-all ${
                              transferStatusSelected === "On hold"
                                ? "border-amber-400 bg-amber-50 text-amber-900 ring-2 ring-amber-400/50 shadow-xs"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <PauseCircle className="h-5 w-5 text-amber-600" />
                            <span>On hold</span>
                            <span className="text-[0.65rem] font-normal text-slate-500">Verification Pending</span>
                          </button>

                          {/* Processing */}
                          <button
                            type="button"
                            onClick={() => {
                              setTransferStatusSelected("Processing");
                              setTransferStatusError("");
                            }}
                            className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border font-bold text-xs transition-all ${
                              transferStatusSelected === "Processing"
                                ? "border-blue-400 bg-blue-50 text-blue-900 ring-2 ring-blue-400/50 shadow-xs"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <RefreshCw className="h-5 w-5 text-blue-600" />
                            <span>Processing</span>
                            <span className="text-[0.65rem] font-normal text-slate-500">Interbank Clearing</span>
                          </button>

                          {/* Completed */}
                          <button
                            type="button"
                            onClick={() => {
                              setTransferStatusSelected("Completed");
                              setTransferStatusError("");
                            }}
                            className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border font-bold text-xs transition-all ${
                              transferStatusSelected === "Completed"
                                ? "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400/50 shadow-xs"
                                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            <span>Completed</span>
                            <span className="text-[0.65rem] font-normal text-slate-500">Verified & Confirmed</span>
                          </button>
                        </div>
                      </div>

                      {/* Mandatory Reason Input */}
                      <div className="mt-4">
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Reason for Status Change <span className="text-red-600">*</span> (Recorded in Activity History):
                        </label>
                        <textarea
                          rows={2}
                          value={transferStatusReason}
                          onChange={(e) => {
                            setTransferStatusReason(e.target.value);
                            setTransferStatusError("");
                          }}
                          placeholder="e.g. Customer provided verified wire confirmation documents / automated clearing verified..."
                          className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder-slate-400 focus:border-red-500 focus:outline-none"
                        />
                        {transferStatusError && (
                          <p className="mt-1 text-[0.72rem] font-bold text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" />
                            {transferStatusError}
                          </p>
                        )}
                      </div>

                      {/* Safety & Demonstration Disclaimer */}
                      <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-[0.7rem] text-amber-900 leading-relaxed flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                        <div>
                          <strong>Demonstration Environment Notice:</strong> Status updates reflect verified administrative record tracking only. Modifying a transfer status does not initiate, release, or complete an actual financial transfer of funds.
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-4 flex items-center justify-end gap-2">
                        <Button
                          type="button"
                          onClick={() =>
                            handleUpdateTransferStatus(
                              selectedTransaction.id,
                              transferStatusSelected,
                              transferStatusReason
                            )
                          }
                          className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs px-5 py-2"
                        >
                          Update Transfer Status & Sync
                        </Button>
                      </div>
                    </div>

                    {/* STATUS UPDATES & ACTIVITY HISTORY LOG */}
                    <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-2">
                          <History className="h-4 w-4 text-red-600" />
                          Transfer Status Updates & Activity History
                        </h4>
                        <span className="text-[0.65rem] text-slate-500 font-mono">Immutable Audit Record</span>
                      </div>

                      <div className="mt-3 space-y-2.5 max-h-48 overflow-y-auto pr-1">
                        {!selectedTransaction.statusUpdates || selectedTransaction.statusUpdates.length === 0 ? (
                          <div className="p-3 text-center text-xs text-slate-400">
                            Initial transfer status recorded upon creation. No subsequent status updates logged.
                          </div>
                        ) : (
                          selectedTransaction.statusUpdates.map((upd) => (
                            <div
                              key={upd.id}
                              className="rounded-xl border border-slate-200 bg-white p-3 text-xs space-y-1 shadow-2xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-slate-800">
                                  Status Updated: <span className="text-slate-500 font-normal">{upd.fromStatus}</span> → <strong className="text-red-700">{upd.toStatus}</strong>
                                </span>
                                <span className="text-[0.68rem] text-slate-400 font-mono">{upd.timestamp}</span>
                              </div>
                              <p className="text-[0.72rem] text-slate-600">
                                <strong className="text-slate-700">Reason:</strong> {upd.reason}
                              </p>
                              <div className="text-[0.65rem] text-slate-400">
                                Recorded by: <strong className="text-slate-600">{upd.updatedBy}</strong>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Secondary Flag / Resolve Actions */}
                    <div className="mt-5 border-t border-slate-100 pt-4 flex items-center justify-between">
                      <span className="text-[0.7rem] text-slate-500">
                        Transaction Ref: <strong className="font-mono text-slate-700">{selectedTransaction.id}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedTransaction.status !== "Flagged" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Flag Transaction ${selectedTransaction.id} for Review?`,
                                description: "Enter mandatory AML / risk reason to flag this item in the compliance queue.",
                                confirmLabel: "Flag Transaction",
                                danger: true,
                                onConfirm: () => handleFlagTransaction(selectedTransaction.id, actionReason),
                              })
                            }
                            className="bg-rose-600 hover:bg-rose-700 text-xs font-bold shadow-xs text-white"
                          >
                            <AlertTriangle className="mr-1.5 h-3.5 w-3.5" /> Flag for Review
                          </Button>
                        )}
                        {selectedTransaction.status === "Flagged" && (
                          <Button
                            size="sm"
                            onClick={() =>
                              setConfirmActionModal({
                                title: `Resolve Flag on ${selectedTransaction.id}?`,
                                description: "Confirm that compliance screening is satisfied and enter resolution rationale.",
                                confirmLabel: "Resolve & Clear Flag",
                                onConfirm: () => handleResolveTransaction(selectedTransaction.id, actionReason),
                              })
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs"
                          >
                            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Resolve & Clear Flag
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTransaction(null)}
                          className="border-slate-200 text-xs text-slate-700 hover:bg-slate-100"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 5: COMPLIANCE & REVIEWS QUEUE */}
          {/* ======================================================== */}
          {activeSection === "compliance" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">Grant Applications & Verification</h2>
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 border border-red-200">
                      Compliance Queue
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Prioritized queue for grant applications, identity verification, AML alerts, and onboarding decisions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600 font-bold">Urgency Priority:</span>
                  <select
                    value={reviewFilterPriority}
                    onChange={(e) => setReviewFilterPriority(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-red-500 focus:outline-none shadow-xs"
                  >
                    <option value="all">All Priorities ({complianceReviews.length})</option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="space-y-3">
                {filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-red-200 hover:bg-red-50/10 transition-all shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-[0.65rem] font-bold uppercase ${
                            rev.priority === "Urgent"
                              ? "bg-red-100 text-red-700 border border-red-200 animate-pulse"
                              : rev.priority === "High"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {rev.priority} Priority
                        </span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[0.65rem] font-mono text-slate-600">
                          {rev.targetType}
                        </span>
                        <span className="text-[0.7rem] text-slate-400">{rev.submittedAt}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{rev.targetName}</h3>
                      <p className="text-xs text-slate-500">{rev.summary}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          rev.status === "Approved"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : rev.status === "Pending Review"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {rev.status}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => setSelectedReview(rev)}
                        className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs cursor-pointer"
                      >
                        Execute Review →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compliance Decision Modal */}
              {selectedReview && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                >
                  <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => setSelectedReview(null)}
                      className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                      <ShieldAlert className="h-6 w-6 text-amber-400" />
                      <div>
                        <h3 className="font-bold text-base text-white">Compliance Item: {selectedReview.id}</h3>
                        <p className="text-xs text-slate-400">{selectedReview.targetName}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3">
                        <strong className="text-slate-400 block mb-1">Detailed Findings:</strong>
                        <p className="text-slate-300 leading-relaxed">{selectedReview.details}</p>
                      </div>

                      {selectedReview.decision && (
                        <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-3 text-teal-200">
                          <p><strong>Decision Recorded:</strong> {selectedReview.decision}</p>
                          <p><strong>Rationale:</strong> {selectedReview.decisionReason}</p>
                          <p className="text-[0.65rem] text-slate-400 mt-1">
                            Recorded by {selectedReview.reviewer} at {selectedReview.decisionTimestamp}
                          </p>
                        </div>
                      )}

                      <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">
                          Staff Admin Rationale / Compliance Decision Reason:
                        </label>
                        <textarea
                          rows={3}
                          value={actionReason}
                          onChange={(e) => setActionReason(e.target.value)}
                          placeholder="State justification for regulatory audit compliance..."
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-800 pt-4 flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleComplianceDecision(selectedReview.id, "Dismissed", actionReason || "No violation determined.")}
                        className="border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                      >
                        Dismiss Flag
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleComplianceDecision(selectedReview.id, "Approved", actionReason || "Passed administrative KYC verification.")}
                        className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white cursor-pointer"
                      >
                        Approve & Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: USERS DEPOSITS */}
          {/* ======================================================== */}
          {activeSection === "deposits" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">Users Deposits</h2>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                      Live Queue
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage, review, and clear pending customer direct check deposits, domestic ACH credits, and incoming wire settlements.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">Total Inflow Today:</span>
                  <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    $0.00 USD
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 mb-3">
                  <ArrowDownToLine className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Deposit Ledger & Settlement Portal</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  There are currently 0 active deposits awaiting administrative settlement. New customer checks and inbound ACH credits will populate here automatically.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: LOAN APPLICATIONS */}
          {/* ======================================================== */}
          {activeSection === "loans" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">Loan Applications</h2>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 border border-blue-200">
                      Credit Underwriting
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Review and underwrite personal mortgages, commercial revolving credit lines, and SME enterprise financing requests.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">Active Applications:</span>
                  <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                    0 Applications
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0055b8] border border-blue-100 mb-3">
                  <Landmark className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Underwriting & Credit Facility Queue</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  No pending loan or credit facility submissions logged in the system. Credit scores, tax forms, and applicant debt ratios will appear here upon submission.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: VIRTUAL CARDS */}
          {/* ======================================================== */}
          {activeSection === "cards" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">Virtual Cards</h2>
                    <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-purple-800 border border-purple-200">
                      Visa / Mastercard
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Issue, freeze, reissue, and set spending limits on customer virtual debit and corporate expense cards.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">Issued Cards:</span>
                  <span className="text-sm font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                    0 Active Cards
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 mb-3">
                  <CreditCard className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">Virtual Card Issuance Terminal</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Zero virtual debit cards are currently active. Customers can generate virtual cards for merchant payments directly from their account portal.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: IRS REFUNDS */}
          {/* ======================================================== */}
          {activeSection === "irs" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">IRS Refunds</h2>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200">
                      Treasury Direct Routing
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Monitor and release United States Internal Revenue Service (IRS) tax refunds and federal treasury settlements.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">Pending Treasury Holds:</span>
                  <span className="text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                    0 Pending
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 mb-3">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-800 text-base">IRS & Government Direct Deposit Hub</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  No federal tax refunds or government treasury credits queued at this moment. IRS ACH files match automatically against customer SSN and routing identifiers.
                </p>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: EMAIL SERVICES */}
          {/* ======================================================== */}
          {activeSection === "email-services" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-2xl font-black text-slate-800">Email Services</h2>
                    <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-800 border border-blue-200">
                      Dispatch Engine
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage transaction notifications, customer welcome emails, verification OTP dispatches, and secure correspondence.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-bold">Mail Gateway Status:</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                    SMTP Active (DKIM/SPF Validated)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#0055b8]" />
                    Welcome Dispatches
                  </h4>
                  <p className="text-xs text-slate-500">
                    Automated welcome briefings dispatched immediately upon new customer onboarding with personalized banking credentials.
                  </p>
                  <div className="mt-3 text-xs font-bold text-slate-700">Status: Automated Trigger Active</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    Security OTP Delivery
                  </h4>
                  <p className="text-xs text-slate-500">
                    One-time authentication codes generated with cryptographically secure PRNG and delivered with 5-minute expiry windows.
                  </p>
                  <div className="mt-3 text-xs font-bold text-slate-700">Status: Real-time Dispatch Active</div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                  <h4 className="font-bold text-sm text-slate-800 mb-1 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-amber-600" />
                    KYC & Review Notices
                  </h4>
                  <p className="text-xs text-slate-500">
                    Official correspondence notifying customers regarding identity document approval, conditional hold, or request for supplementary information.
                  </p>
                  <div className="mt-3 text-xs font-bold text-slate-700">Status: Admin Initiated</div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 6: SUPPORT CASE MANAGEMENT */}
          {/* ======================================================== */}
          {activeSection === "support" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">Client Support Cases</h2>
                  <p className="text-xs text-slate-400">
                    Direct communications queue managed exclusively by the Staff Admin.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Case Status:</span>
                  <select
                    value={caseFilterStatus}
                    onChange={(e) => setCaseFilterStatus(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="all">All Cases ({supportCases.length})</option>
                    <option value="open">Open</option>
                    <option value="in progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>

              {/* Cases Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredSupport.map((sc) => (
                  <div
                    key={sc.id}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between hover:border-slate-700 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                        <span className="font-mono text-xs font-bold text-teal-400">{sc.ticketNumber}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${
                            sc.status === "Open"
                              ? "bg-rose-500/20 text-rose-300"
                              : sc.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {sc.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-white text-sm mt-3">{sc.subject}</h3>
                      <p className="text-xs text-slate-400 mt-1">Customer: {sc.customerName} ({sc.customerEmail})</p>
                      <div className="mt-3 rounded-lg bg-slate-950 p-2.5 text-xs text-slate-300 italic">
                        "{sc.conversation[0]?.message}"
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[0.68rem] text-slate-500">Updated: {sc.updatedAt}</span>
                      <Button
                        size="sm"
                        onClick={() => setSelectedCase(sc)}
                        className="bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white cursor-pointer"
                      >
                        Open Case Terminal →
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Case Terminal Modal */}
              {selectedCase && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                >
                  <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl flex flex-col max-h-[90vh]">
                    <button
                      type="button"
                      onClick={() => setSelectedCase(null)}
                      className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>

                    <div className="border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-teal-400">{selectedCase.ticketNumber}</span>
                        <span className="text-xs text-slate-400">• {selectedCase.customerName}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{selectedCase.subject}</h3>
                    </div>

                    {/* Conversation Feed */}
                    <div className="flex-1 overflow-y-auto my-4 space-y-3 p-2">
                      {selectedCase.conversation.map((msg, i) => (
                        <div
                          key={i}
                          className={`rounded-xl p-3 text-xs max-w-[85%] ${
                            msg.sender === "admin"
                              ? "ml-auto bg-blue-600 text-white"
                              : "mr-auto bg-slate-800 text-slate-200"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[0.65rem] opacity-75 mb-1">
                            <span className="font-bold">{msg.senderName}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p className="leading-relaxed">{msg.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Reply Input */}
                    <div className="border-t border-slate-800 pt-3 space-y-2">
                      <textarea
                        rows={2}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                        placeholder="Type official administrator response to customer..."
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSendCaseReply(selectedCase.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white cursor-pointer"
                        >
                          Send Response
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 7: ANALYTICS & COMPLIANCE REPORTS */}
          {/* ======================================================== */}
          {activeSection === "reports" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">System Reports & Metrics</h2>
                  <p className="text-xs text-slate-400">
                    High-level transaction trends, customer account metrics, and downloadable mock reports.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    appendAuditLog("Reports", "Exported Sample Non-Sensitive Report", "CSV digest downloaded.");
                    alert("Mock Report Export complete: Non-sensitive aggregated summary generated.");
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-xs font-bold text-white cursor-pointer"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Export Non-Sensitive Sample Report (CSV)
                </Button>
              </div>

              {/* Synthetic Metrics Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase">Total Deposit Volume</span>
                  <p className="text-2xl font-black text-white mt-2">$284,500.50 USD</p>
                  <span className="text-[0.7rem] text-emerald-400">Across 10 Jurisdictions</span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase">Compliance Turnaround</span>
                  <p className="text-2xl font-black text-white mt-2">4.2 Hours Avg</p>
                  <span className="text-[0.7rem] text-teal-400">Exceeds 12-hour SLA</span>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                  <span className="text-xs font-bold text-slate-400 uppercase">Support Resolution Rate</span>
                  <p className="text-2xl font-black text-white mt-2">92%</p>
                  <span className="text-[0.7rem] text-purple-400">Staff Admin response time: 28 min</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 8: APPEND-ONLY AUDIT LOG */}
          {/* ======================================================== */}
          {activeSection === "audit" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">Append-Only Audit Ledger</h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive, immutable record of every sensitive access and administrative write action.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Filter Section:</span>
                  <select
                    value={auditFilterSection}
                    onChange={(e) => setAuditFilterSection(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
                  >
                    <option value="all">All Sections ({auditLogs.length})</option>
                    <option value="customers">Customers</option>
                    <option value="accounts">Accounts</option>
                    <option value="transactions">Transactions</option>
                    <option value="compliance">Compliance</option>
                    <option value="support">Support</option>
                    <option value="security">Security</option>
                  </select>
                </div>
              </div>

              {/* Audit Table */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 font-mono">
                    <thead className="border-b border-slate-800 bg-slate-900/90 text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold font-sans">
                      <tr>
                        <th className="px-5 py-3.5">Log ID & Timestamp</th>
                        <th className="px-5 py-3.5">Actor</th>
                        <th className="px-5 py-3.5">Section</th>
                        <th className="px-5 py-3.5">Action Taken</th>
                        <th className="px-5 py-3.5">Target ID</th>
                        <th className="px-5 py-3.5">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredAudit.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="px-5 py-3.5">
                            <span className="font-bold text-white">{log.id}</span>
                            <div className="text-[0.68rem] text-slate-500 font-sans">{log.timestamp}</div>
                          </td>
                          <td className="px-5 py-3.5 font-sans font-semibold text-slate-200">{log.actor}</td>
                          <td className="px-5 py-3.5">
                            <span className="rounded bg-slate-800 px-2 py-0.5 text-[0.65rem] text-slate-300 font-bold">
                              {log.section}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-sans font-bold text-teal-300">{log.action}</td>
                          <td className="px-5 py-3.5 text-slate-400">{log.targetId || "—"}</td>
                          <td className="px-5 py-3.5 font-sans text-slate-400 max-w-sm truncate">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW 9: SECURITY & SETTINGS */}
          {/* ======================================================== */}
          {activeSection === "settings" && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h2 className="font-display text-2xl font-black text-white">Security & Workspace Controls</h2>
                <p className="text-xs text-slate-400">
                  Staff Admin identity controls, session governance, and credential safeguards.
                </p>
              </div>

              {/* Administrator Profile Card & Full Reset/Re-add Controls */}
              <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {adminPhotoUrl ? (
                      <img
                        src={adminPhotoUrl}
                        alt="Staff Admin Profile"
                        className="h-14 w-14 rounded-2xl object-cover border-2 border-red-500 shadow-md shrink-0"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white font-black text-xl shadow-md shrink-0">
                        SA
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-white text-base">{adminDisplayName}</h3>
                        <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[0.65rem] font-bold">
                          ACTIVE SOLO ADMIN
                        </span>
                      </div>
                      <p className="text-xs text-red-400 font-mono">CENTRAL BANK AUTHORITY • {adminEmail}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        // Completely delete admin profile and active session
                        if (confirm("Are you sure you want to delete this Admin profile and sign out? All custom credentials, photo, and active admin session will be completely cleared.")) {
                          try {
                            localStorage.removeItem("westside_admin_profile");
                            localStorage.removeItem("westside_active_solo_admin_session");
                          } catch {}
                          setAdminDisplayName("Master Bank Administrator");
                          setAdminEmail("admin@westsidebank.online");
                          setAdminPhotoUrl("");
                          appendAuditLog(
                            "Security",
                            "Admin Profile Deleted",
                            "Solo Staff Admin profile and active session were permanently deleted.",
                            "ADMIN-01"
                          );
                          onSignOut();
                        }
                      }}
                      className="rounded-lg border border-red-500/50 bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete Admin Profile & Session
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Reset/delete current admin profile and re-add fresh
                        localStorage.removeItem("westside_admin_profile");
                        setAdminDisplayName("Master Bank Administrator");
                        setAdminEmail("admin@westsidebank.online");
                        setAdminPhotoUrl("");
                        appendAuditLog(
                          "Security",
                          "Admin Profile Reset & Re-Added",
                          "Master Staff Admin profile was refreshed and freshly re-initialized.",
                          "ADMIN-01"
                        );
                        alert("Admin profile cleared and re-added to clean defaults.");
                      }}
                      className="rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-bold text-slate-300 transition-colors flex items-center gap-1.5"
                    >
                      <RefreshCw className="h-3.5 w-3.5" /> Reset to Defaults
                    </button>
                  </div>
                </div>

                {/* Edit & Re-add Admin Profile Form */}
                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Configure Admin Profile Details</h4>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Admin Display Name</label>
                      <input
                        type="text"
                        value={adminDisplayName}
                        onChange={(e) => {
                          setAdminDisplayName(e.target.value);
                          const prof = { name: e.target.value, email: adminEmail, photoUrl: adminPhotoUrl };
                          localStorage.setItem("westside_admin_profile", JSON.stringify(prof));
                        }}
                        placeholder="e.g. Master Bank Administrator"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white text-xs focus:border-red-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-semibold mb-1">Official Administrative Email</label>
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => {
                          setAdminEmail(e.target.value);
                          const prof = { name: adminDisplayName, email: e.target.value, photoUrl: adminPhotoUrl };
                          localStorage.setItem("westside_admin_profile", JSON.stringify(prof));
                        }}
                        placeholder="e.g. admin@westsidebank.online"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white text-xs focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Profile Picture Upload & Re-Add */}
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1 text-xs">Admin Avatar / Profile Photograph</label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        value={adminPhotoUrl}
                        onChange={(e) => {
                          setAdminPhotoUrl(e.target.value);
                          const prof = { name: adminDisplayName, email: adminEmail, photoUrl: e.target.value };
                          localStorage.setItem("westside_admin_profile", JSON.stringify(prof));
                        }}
                        placeholder="Enter image URL or choose file below..."
                        className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white text-xs focus:border-red-500 focus:outline-none"
                      />
                      <label className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3.5 py-2 text-xs font-bold text-white transition-colors shrink-0">
                        <Upload className="h-3.5 w-3.5 text-red-400" />
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const result = reader.result as string;
                                setAdminPhotoUrl(result);
                                const prof = { name: adminDisplayName, email: adminEmail, photoUrl: result };
                                localStorage.setItem("westside_admin_profile", JSON.stringify(prof));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs border-t border-slate-800 pt-3">
                    <div>
                      <span className="text-slate-500">Security Access Level:</span>
                      <p className="font-bold text-white">Full Solo Administrator (Tier-1 Root)</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Workspace Status:</span>
                      <p className="font-mono text-emerald-400">Authenticated & Provisioned</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Preferences */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Lock className="h-4 w-4 text-teal-400" /> Administrative Protections
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <div>
                      <p className="font-bold text-white">Strict Session Timeout</p>
                      <p className="text-slate-400 text-[0.7rem]">Automatically lock terminal after 15 minutes of inactivity.</p>
                    </div>
                    <span className="rounded bg-teal-500/20 px-2 py-0.5 text-xs font-bold text-teal-300">Enabled</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <div>
                      <p className="font-bold text-white">Re-authentication for High-Risk Overrides</p>
                      <p className="text-slate-400 text-[0.7rem]">Require password verification prior to freezing or deleting records.</p>
                    </div>
                    <span className="rounded bg-teal-500/20 px-2 py-0.5 text-xs font-bold text-teal-300">Enforced</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-3.5">
                    <div>
                      <p className="font-bold text-white">Public Staff Self-Registration</p>
                      <p className="text-slate-400 text-[0.7rem]">Disallow public registration for unauthorized staff members.</p>
                    </div>
                    <span className="rounded bg-rose-500/20 px-2 py-0.5 text-xs font-bold text-rose-300">Disabled (Secured)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================ */}
      {/* 3. SAFETY CONFIRMATION MODAL WITH REASON & AUDIT RECORD */}
      {/* ============================================================ */}
      {confirmActionModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  confirmActionModal.danger ? "bg-rose-600 text-white" : "bg-teal-600 text-white"
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{confirmActionModal.title}</h3>
                <p className="text-xs text-slate-400">Confirmation Required by Staff Admin</p>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-300 leading-relaxed">
              {confirmActionModal.description}
            </p>

            {confirmActionModal.requiresReauth && (
              <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-950/20 p-3">
                <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
                  <Lock className="h-3.5 w-3.5 text-rose-400" />
                  <span>Re-Authentication Required for Sensitive Action</span>
                </div>
                <p className="mt-1 text-[0.68rem] text-rose-200/70">
                  Solo master clearance requires entry of your administrative verification passphrase.
                </p>
                <input
                  type="password"
                  value={reauthPassword}
                  onChange={(e) => {
                    setReauthPassword(e.target.value);
                    setReauthError("");
                  }}
                  placeholder="Enter admin passphrase (e.g. admin)"
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-rose-400 focus:outline-none"
                />
                {reauthError && (
                  <p className="mt-1 text-[0.68rem] text-rose-400 font-bold">{reauthError}</p>
                )}
              </div>
            )}

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-400 mb-1">
                Reason / Audit Justification (Required):
              </label>
              <textarea
                rows={2}
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder="Enter formal justification for audit ledger..."
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-2.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
              />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setConfirmActionModal(null);
                  setActionReason("");
                }}
                className="border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  if (confirmActionModal.requiresReauth) {
                    if (reauthPassword !== "admin" && reauthPassword !== "password") {
                      setReauthError("Invalid admin security passphrase. Action canceled.");
                      return;
                    }
                  }
                  setReauthPassword("");
                  setReauthError("");
                  confirmActionModal.onConfirm();
                }}
                className={`text-xs font-bold ${
                  confirmActionModal.danger ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                {confirmActionModal.confirmLabel}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 4. CUSTOMER PROFILE SUPPORT AUTHORIZATION MODAL */}
      {/* ============================================================ */}
      {profileAuthModalOpen && pendingProfileInspectionUser && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0a192f] border border-red-500 text-red-500 shadow-md">
                <ShieldCheck className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Authorize Customer Profile Access</h3>
                <p className="text-xs text-slate-400">Support Verification Clearance Required</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-blue-500/30 bg-blue-950/20 p-3.5 text-xs text-blue-200 leading-relaxed">
              <p className="font-semibold text-white">
                Customer: {pendingProfileInspectionUser.name} ({pendingProfileInspectionUser.linkedCustomerId})
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-300">
                You are requesting to view the customer’s account page in <strong>Read-Only Support Mode</strong>. Impersonation, password entry, and execution of funds are strictly barred. Your administrative session remains completely isolated and audited.
              </p>
            </div>

            <form onSubmit={handleConfirmAuthorizeCustomerProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Support / Verification Reason (Logged to Activity History):
                </label>
                <input
                  type="text"
                  value={profileAuthReason}
                  onChange={(e) => {
                    setProfileAuthReason(e.target.value);
                    setProfileAuthError("");
                  }}
                  placeholder="e.g., Customer inquiry assistance, transaction status verification"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
                  autoFocus
                />
                {profileAuthError && (
                  <p className="mt-1.5 text-xs text-red-400 font-bold">{profileAuthError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setProfileAuthModalOpen(false);
                    setPendingProfileInspectionUser(null);
                  }}
                  className="border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Authorize & Open Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 5. CUSTOMER PROFILE & ACCOUNT PAGE VIEW (READ-ONLY SUPPORT MODE) */}
      {/* ============================================================ */}
      {customerProfileInspectionUser && (() => {
        const userAccounts = accounts.filter(
          (a) => a.customerId === customerProfileInspectionUser.linkedCustomerId
        );
        const userTransfers = transactions.filter(
          (t) =>
            t.customerName.toLowerCase() === customerProfileInspectionUser.name.toLowerCase() ||
            t.customerId === customerProfileInspectionUser.linkedCustomerId
        );
        const checkingAcc = userAccounts.find((a) => a.accountType.toLowerCase().includes("checking")) || userAccounts[0];
        const savingsAcc = userAccounts.find((a) => a.accountType.toLowerCase().includes("savings")) || userAccounts[1];

        return (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-5xl rounded-3xl border border-slate-200 bg-[#f8fafc] shadow-2xl max-h-[92vh] overflow-y-auto text-slate-800 flex flex-col">
              {/* Top Navy Blue & Red Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between bg-[#0a192f] border-b-4 border-red-600 px-6 py-4 text-white shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 text-white shadow-xs">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-base tracking-tight text-white">
                        Customer Account Page (Support Mode)
                      </span>
                      <span className="rounded bg-red-600 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white">
                        Read-Only View
                      </span>
                      <span className="hidden sm:inline-block rounded bg-white/10 px-2 py-0.5 text-[0.62rem] font-semibold text-slate-300">
                        Admin Session Isolated
                      </span>
                    </div>
                    <p className="text-[0.7rem] text-slate-300 mt-0.5">
                      Customer: <strong>{customerProfileInspectionUser.name}</strong> • Customer Link ID: {customerProfileInspectionUser.linkedCustomerId} • Logged Under Audit
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCustomerProfileInspectionUser(null)}
                    className="border-slate-600 bg-white/10 text-white hover:bg-white/20 text-xs font-bold"
                  >
                    Close Account View ✕
                  </Button>
                </div>
              </div>

              {/* Safety & Compliance Assurance Notice */}
              <div className="bg-red-50 border-b border-red-200 px-6 py-3 text-xs text-red-900 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
                  <span>
                    <strong>Support Safety Policy:</strong> Viewing account page in verified support mode. Password viewing or modification is prohibited. Customer impersonation and direct fund movement are strictly barred.
                  </span>
                </div>
                <span className="text-[0.68rem] text-red-700 font-mono hidden md:inline-block">
                  Staff Admin: {adminUsername}
                </span>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                {/* Customer Identity Banner */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {customerProfileInspectionUser.profilePicUrl ? (
                        <img
                          src={customerProfileInspectionUser.profilePicUrl}
                          alt={customerProfileInspectionUser.name}
                          className="h-14 w-14 shrink-0 rounded-2xl object-cover border-2 border-red-600 shadow-md"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a192f] text-white font-bold text-xl border-2 border-red-600 shadow-md">
                          {customerProfileInspectionUser.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black text-[#0a192f]">
                            {customerProfileInspectionUser.name}
                          </h2>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              customerProfileInspectionUser.onlineAccessStatus === "Active"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                : "bg-red-100 text-red-800 border border-red-200"
                            }`}
                          >
                            Online Access: {customerProfileInspectionUser.onlineAccessStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Customer ID: <span className="font-mono font-bold text-slate-700">{customerProfileInspectionUser.linkedCustomerId}</span> • Enrolled: {customerProfileInspectionUser.displayDateJoined} • Support Case Audit Linked
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          appendAuditLog(
                            "Users",
                            "Dispatched Password Reset Link from Support View",
                            `Sent secure password reset link to ${customerProfileInspectionUser.email}. Customer credentials not accessed.`,
                            customerProfileInspectionUser.id
                          );
                          setActionNotification(`Password reset link safely sent to ${customerProfileInspectionUser.email}.`);
                          setTimeout(() => setActionNotification(""), 4000);
                        }}
                        className="border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        <Mail className="mr-1.5 h-3.5 w-3.5 text-blue-600" />
                        Send Password Reset Link
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          handleForceUserSignOut(
                            customerProfileInspectionUser.id,
                            "Staff Admin support view active session termination"
                          );
                        }}
                        className="border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-100"
                      >
                        <Laptop className="mr-1.5 h-3.5 w-3.5 text-amber-600" />
                        Sign Out Active Sessions
                      </Button>
                    </div>
                  </div>

                  {/* Registered Customer Details */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs">
                    <div>
                      <span className="text-[0.68rem] uppercase font-bold text-slate-400">Verified Email</span>
                      <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                        <Mail className="h-3.5 w-3.5 text-red-600 shrink-0" />
                        {customerProfileInspectionUser.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.68rem] uppercase font-bold text-slate-400">Verified Phone</span>
                      <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5 text-red-600 shrink-0" />
                        {customerProfileInspectionUser.phone}
                      </p>
                    </div>
                    <div>
                      <span className="text-[0.68rem] uppercase font-bold text-slate-400">Mailing Address</span>
                      <p className="font-semibold text-slate-900 mt-0.5 flex items-center gap-1.5 truncate">
                        <MapPin className="h-3.5 w-3.5 text-red-600 shrink-0" />
                        <span className="truncate">{customerProfileInspectionUser.mailingAddress}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Balances Grid (Customer View Representation) */}
                <div>
                  <h3 className="font-bold text-sm text-[#0a192f] flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4 text-red-600" />
                    Customer Accounts & Live Balances (Read-Only)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Checking Account */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {checkingAcc ? checkingAcc.accountType : "Advantage Checking"}
                        </span>
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800">
                          {checkingAcc ? checkingAcc.status : "Active"}
                        </span>
                      </div>
                      <div className="mt-3 text-2xl font-black text-[#0a192f]">
                        {checkingAcc?.currency || "USD"}{" "}
                        {(checkingAcc?.balance ?? 128450).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="mt-2 text-xs text-slate-500 font-mono">
                        Account: {checkingAcc?.accountNumberMasked || "•••• 4892"} • Routing: {checkingAcc?.routingNumber || "021000021"}
                      </div>
                    </div>

                    {/* Savings Account */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {savingsAcc ? savingsAcc.accountType : "High-Yield Savings"}
                        </span>
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-800">
                          4.85% APY
                        </span>
                      </div>
                      <div className="mt-3 text-2xl font-black text-[#0a192f]">
                        {savingsAcc?.currency || "USD"}{" "}
                        {(savingsAcc?.balance ?? 45210).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="mt-2 text-xs text-slate-500 font-mono">
                        Account: {savingsAcc?.accountNumberMasked || "•••• 8104"} • Routing: {savingsAcc?.routingNumber || "021000021"}
                      </div>
                    </div>

                    {/* Platinum Debit Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          West Side Financial Institution Platinum Debit
                        </span>
                        <span className="rounded bg-blue-100 px-2 py-0.5 text-[0.65rem] font-bold text-blue-800">
                          Active
                        </span>
                      </div>
                      <div className="mt-3 text-base font-black font-mono text-slate-800">
                        •••• •••• •••• 5519
                      </div>
                      <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                        <span>Expires: 09/29</span>
                        <span className="text-[0.68rem] text-slate-400 font-mono">Chip & Contactless</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Transfer Transactions & Live Status */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-[#0a192f] flex items-center gap-2">
                        <ArrowRightLeft className="h-4 w-4 text-red-600" />
                        Customer Transfer Details & Live Status
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Transfers show the exact status visible to the customer (On hold, Processing, Completed).
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {userTransfers.length} Transfer(s) On File
                    </span>
                  </div>

                  {userTransfers.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No transfer records found for this customer profile.
                    </div>
                  ) : (
                    <div className="mt-3 divide-y divide-slate-100">
                      {userTransfers.map((tx) => {
                        const displayedStatus = tx.transferStatus || tx.status;
                        return (
                          <div
                            key={tx.id}
                            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-slate-900">{tx.id}</span>
                                <span className="text-slate-400">•</span>
                                <span className="font-semibold text-slate-700">{tx.type}</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500">{tx.timestamp}</span>
                              </div>
                              <p className="text-slate-600 text-[0.72rem] mt-0.5">
                                Counterparty: <strong>{tx.counterparty}</strong> • Masked Account: <span className="font-mono">{tx.accountMasked}</span>
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span
                                className={`font-mono font-bold text-sm ${
                                  tx.direction === "credit" ? "text-emerald-600" : "text-slate-900"
                                }`}
                              >
                                {tx.direction === "credit" ? "+" : "-"}
                                {tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                              </span>

                              <span
                                className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold ${
                                  displayedStatus === "Completed"
                                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                                    : displayedStatus === "On hold"
                                    ? "bg-amber-100 text-amber-800 border border-amber-200"
                                    : "bg-blue-100 text-blue-800 border border-blue-200"
                                }`}
                              >
                                {displayedStatus}
                              </span>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setCustomerProfileInspectionUser(null);
                                  handleSelectTransactionForReview(tx);
                                }}
                                className="border-slate-200 text-xs font-semibold text-slate-700 hover:bg-red-50 hover:text-red-700"
                              >
                                Update Status →
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <span className="text-xs text-slate-500">
                    Staff Support Mode • Administrative actions are permanently recorded in Activity History.
                  </span>
                  <Button
                    onClick={() => setCustomerProfileInspectionUser(null)}
                    className="bg-[#0a192f] hover:bg-[#152e55] text-white text-xs font-bold shadow-xs"
                  >
                    Done Reviewing Customer Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================ */}
      {/* 6. SEND PASSWORD RESET CONFIRMATION MODAL */}
      {/* ============================================================ */}
      {passwordResetConfirmUser && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Send One-Time Password Reset</h3>
                <p className="text-xs text-slate-400">Verified Contact Delivery Confirmation</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-white">
                Customer: {passwordResetConfirmUser.name} ({passwordResetConfirmUser.id})
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-400">
                A secure one-time password-reset link will be delivered to the customer's verified channel. The link expires after <strong>15 minutes</strong>.
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Delivery Channel (Verified Preferences):
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPasswordResetConfirmMethod("Email")}
                  className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border font-semibold transition-colors ${
                    passwordResetConfirmMethod === "Email"
                      ? "border-blue-500 bg-blue-950 text-blue-300"
                      : "border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Mail className="h-3.5 w-3.5" />
                  Email ({passwordResetConfirmUser.email.slice(0, 3)}...ca)
                </button>
                <button
                  type="button"
                  onClick={() => setPasswordResetConfirmMethod("SMS")}
                  className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border font-semibold transition-colors ${
                    passwordResetConfirmMethod === "SMS"
                      ? "border-blue-500 bg-blue-950 text-blue-300"
                      : "border-slate-800 text-slate-400 hover:bg-slate-800"
                  }`}
                >
                  <Phone className="h-3.5 w-3.5" />
                  SMS (+1 ...{passwordResetConfirmUser.phone.slice(-4)})
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-amber-950/20 border border-amber-500/30 p-3 text-[0.7rem] text-amber-300">
              🛡️ <strong>Security Standard:</strong> Passwords are never sent by text or email. Administrators cannot view or define customer passwords. Action is logged in activity history.
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPasswordResetConfirmUser(null)}
                className="border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleConfirmSendPasswordResetLink(passwordResetConfirmUser, passwordResetConfirmMethod)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                Dispatch Reset Link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. RESET CUSTOMER PASSWORD FROM ADMIN DASHBOARD MODAL */}
      {/* ============================================================ */}
      {adminResetPasswordModalUser && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Reset Customer Password</h3>
                <p className="text-xs text-slate-400">Admin Dashboard Credential Governance</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-3.5 text-xs text-slate-300 leading-relaxed">
              <p className="font-semibold text-white">
                Customer: {adminResetPasswordModalUser.name} ({adminResetPasswordModalUser.id})
              </p>
              <p className="mt-1 text-[0.7rem] text-slate-400">
                Email: {adminResetPasswordModalUser.email} • Phone: {adminResetPasswordModalUser.phone}
              </p>
            </div>

            <div className="mt-4 space-y-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Select Password Reset Strategy:
              </label>

              <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                adminResetPasswordOption === "link"
                  ? "border-red-500 bg-red-950/20 text-white"
                  : "border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-850"
              }`}>
                <input
                  type="radio"
                  name="admin-reset-strategy"
                  checked={adminResetPasswordOption === "link"}
                  onChange={() => setAdminResetPasswordOption("link")}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <p className="text-xs font-bold text-white">Dispatch One-Time Password Reset Link</p>
                  <p className="text-[0.68rem] text-slate-400 mt-0.5">
                    Sends an encrypted 15-minute one-time link to customer's verified channel for them to choose a new password.
                  </p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                adminResetPasswordOption === "enforce_next"
                  ? "border-red-500 bg-red-950/20 text-white"
                  : "border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-850"
              }`}>
                <input
                  type="radio"
                  name="admin-reset-strategy"
                  checked={adminResetPasswordOption === "enforce_next"}
                  onChange={() => setAdminResetPasswordOption("enforce_next")}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <p className="text-xs font-bold text-white">Enforce Mandatory Reset on Next Sign-In</p>
                  <p className="text-[0.68rem] text-slate-400 mt-0.5">
                    Marks credential expired. Upon their next portal sign-in, the customer is immediately required to define a new password.
                  </p>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                adminResetPasswordOption === "revoke_sessions"
                  ? "border-red-500 bg-red-950/20 text-white"
                  : "border-slate-800 bg-slate-950/60 text-slate-300 hover:bg-slate-850"
              }`}>
                <input
                  type="radio"
                  name="admin-reset-strategy"
                  checked={adminResetPasswordOption === "revoke_sessions"}
                  onChange={() => setAdminResetPasswordOption("revoke_sessions")}
                  className="mt-0.5 text-red-600 focus:ring-red-500"
                />
                <div>
                  <p className="text-xs font-bold text-white">Revoke Active Sessions & Enforce Credential Reset</p>
                  <p className="text-[0.68rem] text-slate-400 mt-0.5">
                    Immediately terminates all live mobile and web sessions, expiring the password for instant re-establishment.
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Administrative Audit Justification (Required):
              </label>
              <textarea
                rows={2}
                value={adminResetPasswordReason}
                onChange={(e) => {
                  setAdminResetPasswordReason(e.target.value);
                  setAdminResetPasswordError("");
                }}
                placeholder="Enter justification for audit log..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-xs text-white placeholder-slate-500 focus:border-red-500 focus:outline-none"
              />
              {adminResetPasswordError && (
                <p className="mt-1 text-xs text-red-400 font-bold">{adminResetPasswordError}</p>
              )}
            </div>

            <div className="mt-3 rounded-lg bg-amber-950/20 border border-amber-500/30 p-2.5 text-[0.68rem] text-amber-300">
              🔒 <strong>Compliance Safeguard:</strong> Administrators cannot view or set customer passwords directly. The action will be permanently recorded in the Admin Activity History.
            </div>

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAdminResetPasswordModalUser(null)}
                className="border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() =>
                  handleExecuteAdminPasswordReset(
                    adminResetPasswordModalUser,
                    adminResetPasswordOption,
                    adminResetPasswordReason
                  )
                }
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
              >
                <KeyRound className="h-3.5 w-3.5" />
                Execute Password Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
