import { useState } from "react";
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
  type AdminCustomer,
  type AdminUserRecord,
  type BankAccountRecord,
  type BankTransactionRecord,
  type ComplianceReviewItem,
  type SupportCase,
  type OperationalAlert,
  type SoloAdminAuditEntry,
} from "./adminData";

interface SoloAdminDashboardProps {
  onSignOut: () => void;
  adminUsername?: string;
}

export function SoloAdminDashboard({
  onSignOut,
  adminUsername = "Solo Master Administrator",
}: SoloAdminDashboardProps) {
  // Navigation
  const [activeSection, setActiveSection] = useState<
    "overview" | "users" | "customers" | "accounts" | "transactions" | "compliance" | "support" | "reports" | "audit" | "settings"
  >("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Core State
  const [adminUsers, setAdminUsers] = useState<AdminUserRecord[]>(MOCK_ADMIN_USERS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(MOCK_CUSTOMERS);
  const [accounts, setAccounts] = useState<BankAccountRecord[]>(MOCK_ACCOUNTS);
  const [transactions, setTransactions] = useState<BankTransactionRecord[]>(MOCK_TRANSACTIONS);
  const [complianceReviews, setComplianceReviews] = useState<ComplianceReviewItem[]>(MOCK_COMPLIANCE_REVIEWS);
  const [supportCases, setSupportCases] = useState<SupportCase[]>(MOCK_SUPPORT_CASES);
  const [alerts, setAlerts] = useState<OperationalAlert[]>(MOCK_ALERTS);
  const [auditLogs, setAuditLogs] = useState<SoloAdminAuditEntry[]>(MOCK_AUDIT_LOGS);

  // Selected Detail Modals
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [userEditModalOpen, setUserEditModalOpen] = useState(false);
  const [userEditForm, setUserEditForm] = useState<{
    name: string;
    phone: string;
    mailingAddress: string;
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

  // Action / Confirmation States
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
      actor: "Solo Administrator",
      section,
      action,
      targetId,
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
      actor: "Solo Administrator",
      action: `Online Access Status changed to ${newStatus}`,
      previousState: oldStatus,
      newState: newStatus,
      reason: reason || "Administrative action executed by Solo Admin",
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
      actor: "Solo Administrator",
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
      actor: "Solo Administrator",
      action: "Enforced Mandatory Password Reset on Next Login",
      previousState: user.security.passwordResetRequired ? "Reset Flagged" : "Standard",
      newState: "Reset Required",
      reason: reason || "Credential rotation policy triggered by Solo Admin",
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
      actor: "Solo Administrator",
      action: "Updated Permitted User Profile Details",
      previousState: "Previous profile snapshot",
      newState: diffs.join(" | "),
      reason: actionReason || "Administrative profile update requested/verified",
    };

    setAdminUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              name: userEditForm.name,
              phone: userEditForm.phone,
              mailingAddress: userEditForm.mailingAddress,
              communicationPreferences: { ...userEditForm.communicationPreferences },
              accessChangeHistory: [historyEntry, ...u.accessChangeHistory],
            }
          : u
      )
    );

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
            communicationPreferences: { ...userEditForm.communicationPreferences },
            accessChangeHistory: [historyEntry, ...prev.accessChangeHistory],
          }
        : prev
    );

    setUserEditModalOpen(false);
    setActionReason("");
  };

  const handleAddInternalAdminNote = (userId: string) => {
    if (!newAdminNoteText.trim()) return;
    const note = `[${new Date().toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} - Solo Admin]: ${newAdminNoteText.trim()}`;

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
              reviewedBy: "Solo Administrator",
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
              reviewedBy: "Solo Administrator",
            }
          : t
      )
    );
    appendAuditLog("Transactions", "Transaction Cleared & Resolved", `Compliance notes: ${notes}`, txId);
    setSelectedTransaction((prev) => (prev ? { ...prev, status: "Resolved", reviewNotes: notes } : null));
    setConfirmActionModal(null);
    setActionReason("");
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
              reviewer: "Solo Administrator",
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
                senderName: "Solo Administrator",
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

  return (
    <div className="flex h-screen w-full bg-[#f4f6f9] font-sans text-slate-800 antialiased overflow-hidden">
      {/* ============================================================ */}
      {/* 1. COLLAPSIBLE LEFT SIDEBAR (White clean with red accents) */}
      {/* ============================================================ */}
      <aside
        className={`flex flex-col border-r border-slate-200 bg-white transition-all duration-300 z-30 shadow-xs ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Admin Profile Area in Left Sidebar matching visual reference */}
        <div className="border-b border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-bold shadow-md shadow-red-500/20 text-sm">
              <User className="h-5 w-5" />
            </div>
            {!sidebarCollapsed && (
              <div className="min-w-0 leading-tight">
                <span className="block font-bold text-slate-800 text-sm truncate">
                  {adminUsername === "Solo Master Administrator" ? "admin admin" : adminUsername}
                </span>
                <span className="inline-block mt-0.5 rounded bg-red-100 px-2 py-0.5 text-[0.68rem] font-bold text-red-700">
                  Admin
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {[
            { id: "overview", label: "Dashboard", icon: BarChart3, badge: unreadAlerts.length ? `${unreadAlerts.length}` : undefined },
            { id: "users", label: "Manage Users", icon: Users, badge: adminUsers.length.toString() },
            { id: "customers", label: "Customer Profiles", icon: UserCheck, badge: customers.length.toString() },
            { id: "accounts", label: "Accounts & Balances", icon: CreditCard, badge: accounts.length.toString() },
            { id: "transactions", label: "Transfer Transactions", icon: ArrowRightLeft, badge: flaggedTxCount > 0 ? `${flaggedTxCount}` : undefined, badgeColor: "bg-red-600" },
            { id: "compliance", label: "Reviews & Compliance", icon: ShieldAlert, badge: pendingReviewsCount > 0 ? `${pendingReviewsCount}` : undefined, badgeColor: "bg-amber-500" },
            { id: "support", label: "Support Cases", icon: Headset, badge: openCasesCount > 0 ? `${openCasesCount}` : undefined },
            { id: "reports", label: "Reports & Analytics", icon: FileText },
            { id: "audit", label: "Audit Ledger", icon: History, badge: auditLogs.length.toString() },
            { id: "settings", label: "Security & Settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveSection(item.id as any);
                  appendAuditLog("Overview", `Navigated to ${item.label}`, `Administrator switched workspace view.`);
                }}
                className={`group flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-red-600 text-white shadow-sm font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-500 group-hover:text-red-600"}`} />
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${
                      isActive
                        ? "bg-white text-red-600"
                        : item.badgeColor ? `${item.badgeColor} text-white` : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
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
      {/* 2. MAIN WORKSPACE CONTAINER */}
      {/* ============================================================ */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOP NAVIGATION BAR — Red Theme matching visual reference */}
        <header className="flex h-16 items-center justify-between bg-red-600 px-6 text-white shadow-md z-20">
          {/* Left: Bank Name & Menu Toggle */}
          <div className="flex items-center gap-4">
            <span className="font-display text-lg font-black tracking-tight text-white select-none">
              US Finance Bank
            </span>
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-lg p-1.5 text-white/90 hover:bg-white/15 hover:text-white transition-colors"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* Center: Search Field */}
          <div className="relative w-72 md:w-96 mx-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Manage users, accounts, deposits..."
              className="w-full rounded-md border-0 bg-white py-1.5 pl-9 pr-8 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-inner"
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
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[0.6rem] font-black text-red-600 shadow-sm">
                    {unreadAlerts.length}
                  </span>
                )}
              </button>

              {/* Notification Center Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl z-50 animate-fadeIn text-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      Operational Alerts ({alerts.length})
                    </h4>
                    <span className="text-[0.65rem] text-slate-500 font-mono">Real-Time Core Feed</span>
                  </div>
                  <div className="mt-3 space-y-2 max-h-80 overflow-y-auto">
                    {alerts.map((al) => (
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
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold">{al.title}</span>
                          <span className="text-[0.65rem] text-slate-500 shrink-0">{al.timestamp}</span>
                        </div>
                        <p className="mt-1 text-[0.72rem] text-slate-600">{al.description}</p>
                        {al.actionRequired && (
                          <div className="mt-2 text-[0.68rem] font-bold text-red-600">
                            → {al.actionRequired}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                title="Admin Profile Menu"
              >
                <User className="h-5 w-5" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-xl z-50 text-slate-800 animate-fadeIn">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">Solo Administrator</p>
                    <p className="text-[0.68rem] text-slate-500">US Finance Bank Internal</p>
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
                      onClick={onSignOut}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-bold"
                    >
                      Sign Out
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
        <main className="flex-1 overflow-y-auto bg-[#f4f6f9] p-6">
          {/* ======================================================== */}
          {/* VIEW 1: MAIN DASHBOARD (RED & WHITE THEME MATCHING SCREENSHOT) */}
          {/* ======================================================== */}
          {activeSection === "overview" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Top Banner Header: Red background with Welcome heading & quick links matching screenshot */}
              <div className="rounded-2xl bg-red-600 p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                      Dashboard
                    </h1>
                    <p className="text-sm text-red-100 mt-1">
                      Welcome, {adminUsername === "Solo Master Administrator" ? "admin admin" : adminUsername}!
                    </p>
                  </div>

                  {/* 3 Quick Links Buttons matching screenshot */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveSection("accounts")}
                      className="rounded-lg bg-emerald-500 hover:bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      Deposits
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("transactions")}
                      className="rounded-lg bg-sky-500 hover:bg-sky-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      Transfers
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("users")}
                      className="rounded-lg bg-purple-600 hover:bg-purple-700 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors"
                    >
                      Users
                    </button>
                  </div>
                </div>
              </div>

              {/* SUMMARY CARDS GRID matching the 7 summary cards in screenshot */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Total Deposit */}
                  <div
                    onClick={() => setActiveSection("accounts")}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <ArrowDownToLine className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Total Deposit</span>
                      <p className="font-display text-lg font-black text-slate-800">$0.00</p>
                    </div>
                  </div>

                  {/* Card 2: Pending Deposit(s) */}
                  <div
                    onClick={() => setActiveSection("compliance")}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                      <RefreshCw className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Pending Deposit(s)</span>
                      <p className="font-display text-lg font-black text-slate-800">$0.00</p>
                    </div>
                  </div>

                  {/* Card 3: Total Transfers */}
                  <div
                    onClick={() => setActiveSection("transactions")}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Total Transfers</span>
                      <p className="font-display text-lg font-black text-slate-800">$12,630,456</p>
                    </div>
                  </div>

                  {/* Card 4: Pending Transfers */}
                  <div
                    onClick={() => setActiveSection("transactions")}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <ArrowRightLeft className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Pending Transfers</span>
                      <p className="font-display text-lg font-black text-slate-800">$0.00</p>
                    </div>
                  </div>

                  {/* Card 5: Total Users */}
                  <div
                    onClick={() => setActiveSection("users")}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Total Users</span>
                      <p className="font-display text-lg font-black text-slate-800">{adminUsers.length}</p>
                    </div>
                  </div>

                  {/* Card 6: Block Users */}
                  <div
                    onClick={() => {
                      setUserFilterStatus("suspended");
                      setActiveSection("users");
                    }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                      <UserMinus className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Block Users</span>
                      <p className="font-display text-lg font-black text-slate-800">
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
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <UserCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Active Users</span>
                      <p className="font-display text-lg font-black text-slate-800">
                        {adminUsers.filter((u) => u.onlineAccessStatus === "Active" || u.onlineAccessStatus === "Reinstated").length}
                      </p>
                    </div>
                  </div>

                  {/* Card 8: Operational System Health */}
                  <div
                    onClick={() => setActiveSection("settings")}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-red-200 hover:bg-red-50/30 cursor-pointer transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-slate-500">Security Clearance</span>
                      <p className="font-display text-sm font-bold text-emerald-600">Solo Admin Active</p>
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
                    <p className="text-xs text-slate-500">Append-only security log records performed by Solo Admin</p>
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
                All Rights Reserved © US Finance Bank {new Date().getFullYear()}
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
                      Solo Admin Authority
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Search and manage individual user profiles, update permitted contact info, and control digital online banking access.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
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
                    Online Access status directly governs a user&apos;s digital credential authentication and mobile/web portal authorization. It is strictly separate from customer legal status and underlying financial account settlement. All password updates, credential revocations, and permitted profile edits are append-only logged with explicit audit reasons. Solo Administrators are barred from viewing passwords, impersonating users, or initiating funds transfers.
                  </p>
                </div>
              </div>

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
                              <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                              <div className="font-mono text-[0.7rem] text-slate-500">{user.id}</div>
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
                                className="border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
                              >
                                Review Profile →
                              </Button>
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
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-red-100 px-2 py-0.5 text-[0.68rem] font-bold text-red-700 border border-red-200">
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
                        <h3 className="mt-2 text-2xl font-black text-slate-900">{selectedUser.name}</h3>
                        <p className="text-xs text-slate-500">
                          Joined on {selectedUser.displayDateJoined} • Customer Link ID: {selectedUser.linkedCustomerId}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedUser(null)}
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
                      >
                        ✕
                      </button>
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

                    {/* Access Controls & Security Actions */}
                    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/50 p-5">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <Lock className="h-4 w-4 text-red-600" />
                          Digital Online Access Controls (Solo Administrator)
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
                      </div>
                    </div>

                    {/* Internal Admin Notes */}
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-red-600" />
                        Internal Administrator Notes
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Private administrative log entries visible only to the Solo Administrator.
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

              {/* MODAL: EDIT PERMITTED PROFILE FIELDS */}
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
                        className="bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs"
                      >
                        Save & Record in Audit Log
                      </Button>
                    </div>
                  </div>
                </div>
              )}
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
                              <div className="font-bold text-white text-sm">{cust.name}</div>
                              <div className="text-[0.68rem] text-slate-500 font-mono">{cust.id} • {cust.email}</div>
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-lg">
                        {selectedCustomer.name.slice(0, 2).toUpperCase()}
                      </div>
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
                  <h2 className="font-display text-2xl font-black text-white">Transactions Oversight</h2>
                  <p className="text-xs text-slate-400">
                    Oversight and review queue. No actions to initiate, alter, or reverse real financial transactions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Status Filter:</span>
                  <select
                    value={txFilterStatus}
                    onChange={(e) => setTxFilterStatus(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
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
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="border-b border-slate-800 bg-slate-900/90 text-[0.7rem] uppercase tracking-wider text-slate-400 font-bold">
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
                    <tbody className="divide-y divide-slate-800/80">
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-800/40 transition-colors font-mono">
                          <td className="px-5 py-3.5">
                            <div className="font-bold text-white">{tx.id}</div>
                            <div className="text-[0.68rem] text-slate-500 font-sans">{tx.timestamp}</div>
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span className="font-semibold text-slate-200">{tx.customerName}</span>
                            <div className="text-[0.68rem] text-slate-500 font-mono">{tx.accountMasked}</div>
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span className="font-medium text-slate-300">{tx.type}</span>
                          </td>
                          <td className="px-5 py-3.5 font-sans text-slate-400 truncate max-w-xs">{tx.counterparty}</td>
                          <td
                            className={`px-5 py-3.5 text-right font-bold ${
                              tx.direction === "credit" ? "text-emerald-400" : "text-slate-200"
                            }`}
                          >
                            {tx.direction === "credit" ? "+" : "-"}
                            {tx.currency} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-5 py-3.5 font-sans">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                                tx.status === "Completed"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : tx.status === "Flagged"
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse"
                                  : tx.status === "Resolved"
                                  ? "bg-teal-500/20 text-teal-300"
                                  : "bg-amber-500/20 text-amber-300"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right font-sans">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedTransaction(tx);
                                appendAuditLog("Transactions", "Inspected Transaction", `Viewed TX ${tx.id} for ${tx.customerName}`, tx.id);
                              }}
                              className="border-slate-700 text-xs text-teal-300 hover:bg-teal-500/20"
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

              {/* Transaction Detail & Flag / Resolve Modal */}
              {selectedTransaction && (
                <div
                  role="dialog"
                  aria-modal="true"
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
                >
                  <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-200 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => setSelectedTransaction(null)}
                      className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                        <ArrowRightLeft className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">Transaction Review: {selectedTransaction.id}</h3>
                        <p className="text-xs text-slate-400">{selectedTransaction.timestamp}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs font-mono">
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex justify-between items-center">
                        <span className="font-sans text-slate-400">Total Settlement:</span>
                        <span className="text-lg font-black text-white">
                          {selectedTransaction.currency}{" "}
                          {selectedTransaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1.5 font-sans">
                        <p><strong className="text-slate-400">Customer:</strong> {selectedTransaction.customerName}</p>
                        <p><strong className="text-slate-400">Target Account:</strong> {selectedTransaction.accountMasked}</p>
                        <p><strong className="text-slate-400">Counterparty:</strong> {selectedTransaction.counterparty}</p>
                        <p><strong className="text-slate-400">Transaction Type:</strong> {selectedTransaction.type}</p>
                        <p><strong className="text-slate-400">Status:</strong> {selectedTransaction.status}</p>
                        {selectedTransaction.flagReason && (
                          <div className="mt-2 rounded-lg bg-rose-950/40 border border-rose-500/30 p-2 text-rose-200">
                            <strong>Flag Reason:</strong> {selectedTransaction.flagReason}
                          </div>
                        )}
                        {selectedTransaction.reviewNotes && (
                          <div className="mt-2 rounded-lg bg-teal-950/40 border border-teal-500/30 p-2 text-teal-200">
                            <strong>Resolution Notes:</strong> {selectedTransaction.reviewNotes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Safeguard Actions: Flag or Resolve with Confirmation */}
                    <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-end gap-2">
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
                          className="bg-rose-600 hover:bg-rose-700 text-xs font-bold"
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-xs font-bold"
                        >
                          <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Resolve & Clear Flag
                        </Button>
                      )}
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
                  <h2 className="font-display text-2xl font-black text-white">Reviews & Compliance Queue</h2>
                  <p className="text-xs text-slate-400">
                    Prioritized queue for pending identity checks, AML alerts, and audit decisions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-bold">Urgency Priority:</span>
                  <select
                    value={reviewFilterPriority}
                    onChange={(e) => setReviewFilterPriority(e.target.value)}
                    className="rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-teal-400 focus:outline-none"
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
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-2 py-0.5 text-[0.65rem] font-black uppercase ${
                            rev.priority === "Urgent"
                              ? "bg-rose-500 text-white animate-pulse"
                              : rev.priority === "High"
                              ? "bg-amber-500 text-slate-950 font-bold"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {rev.priority} Priority
                        </span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-[0.65rem] font-mono text-slate-400">
                          {rev.targetType}
                        </span>
                        <span className="text-[0.7rem] text-slate-500">{rev.submittedAt}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm">{rev.targetName}</h3>
                      <p className="text-xs text-slate-400">{rev.summary}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          rev.status === "Approved" || rev.status === "Cleared"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : rev.status === "Pending Review"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {rev.status}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => setSelectedReview(rev)}
                        className="bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white cursor-pointer"
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
                          Solo Admin Rationale / Compliance Decision Reason:
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
          {/* VIEW 6: SUPPORT CASE MANAGEMENT */}
          {/* ======================================================== */}
          {activeSection === "support" && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">Client Support Cases</h2>
                  <p className="text-xs text-slate-400">
                    Direct communications queue managed exclusively by the Solo Administrator.
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
                  <span className="text-[0.7rem] text-purple-400">Solo Administrator response time: 28 min</span>
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
                  Solo Administrator identity controls, session governance, and credential safeguards.
                </p>
              </div>

              {/* Administrator Profile Card */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 text-slate-950 font-black text-lg">
                    SA
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Designated Solo Administrator</h3>
                    <p className="text-xs text-teal-400 font-mono">ROLE: SOLO_ADMIN (Central Authority)</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 text-xs border-t border-slate-800 pt-4">
                  <div>
                    <span className="text-slate-500">Authorized Operator:</span>
                    <p className="font-bold text-white">admin admin</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Internal Console Address:</span>
                    <p className="font-mono text-white">127.0.0.1 (Local Authenticated)</p>
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
                <p className="text-xs text-slate-400">Confirmation Required by Solo Admin</p>
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
    </div>
  );
}
