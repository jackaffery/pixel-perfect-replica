import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Menu,
  X,
  Wallet,
  Landmark,
  Smartphone,
  Headset,
  ArrowRight,
  ShieldCheck,
  Users,
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  TrendingUp,
  FileText,
  KeyRound,
  LogIn,
  LogOut,
  Sparkles,
  Globe2,
  Search,
  Fingerprint,
  FileCheck2,
  HelpCircle,
  ShieldAlert,
  UserCheck,
  UserX,
  ShieldBan,
  SlidersHorizontal,
  RefreshCw,
  Trash2,
  PlusCircle,
  Edit3,
  Inbox,
  MessageSquare,
  Clock,
  History,
  ClipboardList,
  Check,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import usFinanceBuildingHero from "@/assets/us-finance-bank-building.jpg";
import branchCanadaImg from "@/assets/branch-canada.jpg";
import branchUkImg from "@/assets/branch-uk.jpg";
import mobileCardBankingImg from "@/assets/mobile-card-banking.jpg";
import officerSupportImg from "@/assets/officer-support.jpg";
import {
  SUPPORTED_COUNTRIES,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  type CountryConfig,
} from "@/lib/international-banking";
import { SoloAdminDashboard } from "@/components/admin/SoloAdminDashboard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "US Finance Bank | Online Banking" },
      {
        name: "description",
        content:
          "Welcome to US Finance Bank. Modern, secure, multilingual digital banking serving global clients with local currency, ID verification, and 24/7 account protection.",
      },
      { property: "og:title", content: "US Finance Bank | Online Banking" },
      {
        property: "og:description",
        content: "Banking Made Simpler. Your Future, Your Finance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

export interface AdminControlledUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  countryCode: string;
  accountType: string;
  checkingBalance: number;
  savingsBalance: number;
  status: "active" | "frozen" | "pending_kyc" | "suspended";
  idType: string;
  idNumber: string;
  createdAt: string;
}

const INITIAL_USERS: AdminControlledUser[] = [
  {
    id: "USB-US-109283",
    name: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    phone: "+1 (555) 234-8901",
    country: "United States",
    countryCode: "US",
    accountType: "Advantage Checking & Savings",
    checkingBalance: 12450.8,
    savingsBalance: 48200.0,
    status: "active",
    idType: "Social Security Number (SSN)",
    idNumber: "•••-••-4892",
    createdAt: "Oct 12, 2026",
  },
  {
    id: "USB-GB-401928",
    name: "Liam Davies",
    email: "liam.davies@example.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    countryCode: "GB",
    accountType: "Advantage Checking",
    checkingBalance: 8640.0,
    savingsBalance: 22100.0,
    status: "active",
    idType: "National Insurance (NI) Number",
    idNumber: "•• •• •• 89 C",
    createdAt: "Oct 15, 2026",
  },
  {
    id: "USB-CA-884910",
    name: "Mathieu Tremblay",
    email: "mathieu.t@example.ca",
    phone: "+1 (416) 555-0182",
    country: "Canada",
    countryCode: "CA",
    accountType: "Commercial Treasury",
    checkingBalance: 3200.0,
    savingsBalance: 15000.0,
    status: "pending_kyc",
    idType: "Social Insurance Number (SIN)",
    idNumber: "••• ••• 419",
    createdAt: "Today, 08:30 AM",
  },
  {
    id: "USB-MX-301924",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.mx",
    phone: "+52 55 1234 5678",
    country: "Mexico",
    countryCode: "MX",
    accountType: "Advantage Checking & Savings",
    checkingBalance: 45800.0,
    savingsBalance: 120000.0,
    status: "active",
    idType: "CURP / RFC",
    idNumber: "ROMS850215••••••",
    createdAt: "Oct 17, 2026",
  },
  {
    id: "USB-DE-662914",
    name: "Lukas Weber",
    email: "lukas.weber@example.de",
    phone: "+49 30 1234567",
    country: "Germany",
    countryCode: "DE",
    accountType: "High-Yield Savings",
    checkingBalance: 4250.0,
    savingsBalance: 18400.0,
    status: "frozen",
    idType: "Personalausweis / Steuer-ID",
    idNumber: "T2200••••",
    createdAt: "Oct 10, 2026",
  },
  {
    id: "USB-JP-994102",
    name: "Kenji Takahashi",
    email: "kenji.takahashi@example.jp",
    phone: "+81 3 5555 0143",
    country: "Japan",
    countryCode: "JP",
    accountType: "Advantage Checking",
    checkingBalance: 1450000.0,
    savingsBalance: 3800000.0,
    status: "suspended",
    idType: "My Number (Individual Number)",
    idNumber: "•••• •••• 9201",
    createdAt: "Oct 05, 2026",
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
  status: "Pending" | "Under Review" | "Approved" | "Rejected";
  reviewNotes: string;
  submittedAt: string;
  updatedAt?: string;
}

const INITIAL_APPLICATIONS: BankApplication[] = [
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
];

export interface CustomerInquiry {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "Unread" | "In Progress" | "Resolved";
  submittedAt: string;
  adminReply?: string;
  respondedAt?: string;
}

const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: "inq-1",
    ticketNumber: "INF-849102",
    name: "Arthur Pendelton",
    email: "arthur.p@example.com",
    subject: "Wire transfer clearing times to London branch",
    message: "Could you confirm the typical settlement speed for USD to GBP wire transfers initiated on weekends?",
    status: "Unread",
    submittedAt: "Today, 09:14 AM",
  },
  {
    id: "inq-2",
    ticketNumber: "INF-392018",
    name: "Carmen Ortiz",
    email: "carmen.ortiz@example.mx",
    subject: "CURP document verification confirmation",
    message: "I submitted my RFC and CURP documents yesterday. Wanted to confirm if any further notarized forms are required.",
    status: "In Progress",
    submittedAt: "Oct 18, 2026, 03:22 PM",
    adminReply: "Our Mexico compliance team is currently reviewing your document image. You should receive clearance within 24 hours.",
    respondedAt: "Oct 18, 2026, 05:40 PM",
  },
  {
    id: "inq-3",
    ticketNumber: "INF-110293",
    name: "Hans Zimmerman",
    email: "h.zimmerman@example.de",
    subject: "Commercial high-yield interest rate schedule",
    message: "Requesting official documentation regarding fixed APY tiers for commercial business accounts over €100,000.",
    status: "Resolved",
    submittedAt: "Oct 17, 2026, 10:05 AM",
    adminReply: "Full rate schedule transmitted to your registered corporate email. Ticket resolved.",
    respondedAt: "Oct 17, 2026, 01:15 PM",
  },
];

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  action: string;
  category: "User Management" | "Application Review" | "Inquiry Response" | "Security & Access";
  actor: string;
  details: string;
}

const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: "log-1",
    timestamp: "Today, 08:30 AM",
    action: "New Account Application Submitted",
    category: "Application Review",
    actor: "Public Portal (Mathieu Tremblay)",
    details: "Application USB-CA-884910 created with status 'Pending' for Canada jurisdiction.",
  },
  {
    id: "log-2",
    timestamp: "Oct 18, 2026, 05:40 PM",
    action: "Inquiry Response Dispatched",
    category: "Inquiry Response",
    actor: "Super Administrator",
    details: "Dispatched compliance reply to inquiry ticket #INF-392018 (Carmen Ortiz).",
  },
  {
    id: "log-3",
    timestamp: "Oct 17, 2026, 02:15 PM",
    action: "Security Freeze Applied",
    category: "Security & Access",
    actor: "Super Administrator",
    details: "Account USB-DE-662914 (Lukas Weber) frozen due to suspicious login attempt.",
  },
  {
    id: "log-4",
    timestamp: "Oct 15, 2026, 11:25 AM",
    action: "Application Approved",
    category: "Application Review",
    actor: "Super Administrator",
    details: "Application USB-GB-401928 (Liam Davies) approved and provisioned as Active customer.",
  },
  {
    id: "log-5",
    timestamp: "Oct 12, 2026, 03:00 PM",
    action: "Balance Adjusted",
    category: "User Management",
    actor: "Super Administrator",
    details: "Checking balance for Eleanor Vance adjusted to $12,450.80.",
  },
];

export function Index() {
  // Localization State
  const [currentCountryCode, setCurrentCountryCode] = useState<string>("US");
  const [currentLangCode, setCurrentLangCode] = useState<string>("en");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active configurations
  const country = SUPPORTED_COUNTRIES[currentCountryCode] || SUPPORTED_COUNTRIES.US;
  const t = TRANSLATIONS[currentLangCode] || TRANSLATIONS.en;

  // Modals & Panels
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [openAccountModalOpen, setOpenAccountModalOpen] = useState(false);
  const [checkStatusModalOpen, setCheckStatusModalOpen] = useState(false);
  const [adjustBalanceUser, setAdjustBalanceUser] = useState<AdminControlledUser | null>(null);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  // Customer Authentication & Multi-Factor Authentication (MFA)
  const [customerUser, setCustomerUser] = useState<string | null>(null);
  const [customerLoginEmail, setCustomerLoginEmail] = useState("");
  const [customerLoginPassword, setCustomerLoginPassword] = useState("");
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [rememberCustomer, setRememberCustomer] = useState(true);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [generatedMfaCode, setGeneratedMfaCode] = useState("849201");
  const [customerAuthLoading, setCustomerAuthLoading] = useState(false);
  const [customerAuthError, setCustomerAuthError] = useState("");

  // Customer Dashboard State
  const [checkingBalance, setCheckingBalance] = useState(12450.8);
  const [savingsBalance, setSavingsBalance] = useState(48200.0);
  const [transactions, setTransactions] = useState([
    {
      id: "tx-1",
      date: "Today, 10:14 AM",
      desc: "Direct Deposit — Official Payroll",
      category: "Income",
      amount: "+$3,450.00",
      positive: true,
    },
    {
      id: "tx-2",
      date: "Oct 18, 2026",
      desc: "Merchant Transaction — Contactless",
      category: "Groceries",
      amount: "-$142.35",
      positive: false,
    },
    {
      id: "tx-3",
      date: "Oct 16, 2026",
      desc: "Utility Provider — Bill Pay Direct",
      category: "Utilities",
      amount: "-$84.10",
      positive: false,
    },
    {
      id: "tx-4",
      date: "Oct 14, 2026",
      desc: "High-Yield Interest Accrual",
      category: "Interest",
      amount: "+$182.40",
      positive: true,
    },
  ]);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferSuccess, setTransferSuccess] = useState("");

  // Solo Master Admin & User Management State
  const [soloAdminUser, setSoloAdminUser] = useState<{
    username: string;
    role: string;
    authenticatedAt: string;
  } | null>(null);
  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminAuthLoading, setAdminAuthLoading] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState("");

  // Controlled Users Registry
  const [adminUsers, setAdminUsers] = useState<AdminControlledUser[]>(INITIAL_USERS);
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>("all");
  const [adminActionNotice, setAdminActionNotice] = useState<string>("");

  // Centralized Application Management State
  const [applications, setApplications] = useState<BankApplication[]>(INITIAL_APPLICATIONS);
  const [appStatusFilter, setAppStatusFilter] = useState<string>("all");
  const [editingApp, setEditingApp] = useState<BankApplication | null>(null);
  const [appReviewNotes, setAppReviewNotes] = useState<string>("");
  const [appNewStatus, setAppNewStatus] = useState<"Pending" | "Under Review" | "Approved" | "Rejected">("Pending");

  // Centralized Customer Inquiry Management State
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(INITIAL_INQUIRIES);
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>("all");
  const [replyingInquiry, setReplyingInquiry] = useState<CustomerInquiry | null>(null);
  const [adminReplyText, setAdminReplyText] = useState<string>("");

  // Centralized Audit Log State
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(INITIAL_AUDIT_LOGS);
  const [auditCategoryFilter, setAuditCategoryFilter] = useState<string>("all");

  // Dashboard Navigation Tab
  const [adminActiveTab, setAdminActiveTab] = useState<"overview" | "users" | "applications" | "inquiries" | "logs">("overview");

  // Balance Adjustment Modal State
  const [adjustCheckingAmt, setAdjustCheckingAmt] = useState("");
  const [adjustSavingsAmt, setAdjustSavingsAmt] = useState("");

  // Provision New User State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPhone, setNewUserPhone] = useState("");
  const [newUserCountry, setNewUserCountry] = useState("US");
  const [newUserAccountType, setNewUserAccountType] = useState("Advantage Checking & Savings");
  const [newUserChecking, setNewUserChecking] = useState("5000");
  const [newUserSavings, setNewUserSavings] = useState("10000");

  // Password Recovery State
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Application / Registration State
  const [appFullName, setAppFullName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appPhone, setAppPhone] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [showAppPassword, setShowAppPassword] = useState(false);
  const [appRegion, setAppRegion] = useState(country.regions[0] || "");
  const [appAddress, setAppAddress] = useState("");
  const [appSelectedIdType, setAppSelectedIdType] = useState(country.idTypes[0]?.id || "");
  const [appIdNumber, setAppIdNumber] = useState("");
  const [appAccountType, setAppAccountType] = useState("Checking & Savings");
  const [appSourceOfFunds, setAppSourceOfFunds] = useState("Employment / Salary");
  const [appConsent, setAppConsent] = useState(false);
  const [appSubmissionSuccess, setAppSubmissionSuccess] = useState<string | null>(null);

  // Application Status Lookup
  const [statusSearchId, setStatusSearchId] = useState("");
  const [statusSearchResult, setStatusSearchResult] = useState<{
    id: string;
    status: string;
    date: string;
    details: string;
  } | null>(null);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Handlers
  const handleCountryChange = (newCode: string) => {
    setCurrentCountryCode(newCode);
    const newCountry = SUPPORTED_COUNTRIES[newCode];
    if (newCountry) {
      setAppRegion(newCountry.regions[0] || "");
      setAppSelectedIdType(newCountry.idTypes[0]?.id || "");
      // Switch to language if supported by country
      if (newCountry.languages[0] && SUPPORTED_LANGUAGES[newCountry.languages[0]]) {
        setCurrentLangCode(newCountry.languages[0]);
      }
    }
  };

  const handleCustomerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerAuthError("");
    const identifier = customerLoginEmail.trim();
    if (!identifier || !customerLoginPassword.trim()) {
      setCustomerAuthError("Please provide both email/username and password.");
      return;
    }

    // Check if user is controlled by Admin and has active restrictions
    const matchingUser = adminUsers.find(
      (u) =>
        u.email.toLowerCase() === identifier.toLowerCase() ||
        u.name.toLowerCase() === identifier.toLowerCase()
    );

    if (matchingUser) {
      if (matchingUser.status === "frozen") {
        setCustomerAuthError(
          "ACCOUNT FROZEN: This customer account has been temporarily frozen by the Solo Bank Administrator. Contact administration."
        );
        return;
      }
      if (matchingUser.status === "suspended") {
        setCustomerAuthError(
          "ACCOUNT SUSPENDED: Administrative access revoked by the Solo Bank Administrator."
        );
        return;
      }
      if (matchingUser.status === "pending_kyc") {
        setCustomerAuthError(
          "KYC REVIEW PENDING: Your account registration is awaiting verification and approval from the Solo Bank Administrator."
        );
        return;
      }
    }

    setCustomerAuthLoading(true);
    setTimeout(() => {
      setCustomerAuthLoading(false);
      // Trigger MFA Step
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedMfaCode(randomCode);
      setMfaStep(true);
    }, 600);
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mfaCode.trim() !== generatedMfaCode && mfaCode.trim() !== "849201" && mfaCode.length < 4) {
      setCustomerAuthError("Invalid verification code. Please check the simulated OTP.");
      return;
    }
    setCustomerAuthLoading(true);
    setTimeout(() => {
      setCustomerAuthLoading(false);
      setMfaStep(false);

      const identifier = customerLoginEmail.trim();
      const matchingUser = adminUsers.find(
        (u) =>
          u.email.toLowerCase() === identifier.toLowerCase() ||
          u.name.toLowerCase() === identifier.toLowerCase()
      );

      if (matchingUser) {
        setCheckingBalance(matchingUser.checkingBalance);
        setSavingsBalance(matchingUser.savingsBalance);
        setCustomerUser(matchingUser.name);
      } else {
        setCustomerUser(
          customerLoginEmail.includes("@")
            ? customerLoginEmail.split("@")[0]
            : customerLoginEmail
        );
      }

      setCustomerModalOpen(false);
      setCustomerLoginPassword("");
      setMfaCode("");
    }, 500);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) return;
    if (amt > checkingBalance) {
      alert("Insufficient funds in checking account.");
      return;
    }
    setCheckingBalance((prev) => prev - amt);
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        date: "Just now",
        desc: `Transfer to ${transferRecipient || "External Account"}`,
        category: "Transfer",
        amount: `-${country.currency.symbol}${amt.toFixed(2)}`,
        positive: false,
      },
      ...prev,
    ]);
    setTransferSuccess(
      `Transferred ${country.currency.symbol}${amt.toFixed(2)} to ${transferRecipient || "Recipient"}`
    );
    setTransferAmount("");
    setTransferRecipient("");
    setTimeout(() => setTransferSuccess(""), 4000);
  };

  // Audit Logging Helper
  const logAdminAction = (
    action: string,
    category: AdminAuditLog["category"],
    details: string
  ) => {
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      action,
      category,
      actor: soloAdminUser ? "Super Administrator" : "System / Public Portal",
      details,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Staff Sign In Admin Authentication
  const handleSoloAdminSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAuthError("");
    if (!adminUsername.trim() || !adminPassword.trim()) {
      setAdminAuthError("Master Administrator credentials are required.");
      return;
    }
    setAdminAuthLoading(true);
    setTimeout(() => {
      setAdminAuthLoading(false);
      setSoloAdminUser({
        username: "admin admin",
        role: "Admin",
        authenticatedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
      setAdminModalOpen(false);
      setAdminPassword("");
      setAdminActionNotice("Staff Sign-In Admin authenticated.");
      logAdminAction("Admin Authenticated", "Security & Access", "Staff Admin session started.");
      setTimeout(() => setAdminActionNotice(""), 6000);
    }, 500);
  };

  const handleToggleFreezeUser = (userId: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "frozen" ? "active" : "frozen";
          setAdminActionNotice(`Account ${u.name} (${u.id}) is now ${nextStatus.toUpperCase()}.`);
          logAdminAction(
            nextStatus === "frozen" ? "Account Frozen" : "Account Unfrozen",
            "Security & Access",
            `Account ${u.id} (${u.name}) security status changed to ${nextStatus}.`
          );
          setTimeout(() => setAdminActionNotice(""), 4000);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleToggleSuspendUser = (userId: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "suspended" ? "active" : "suspended";
          setAdminActionNotice(`Account ${u.name} (${u.id}) is now ${nextStatus.toUpperCase()}.`);
          logAdminAction(
            nextStatus === "suspended" ? "Account Suspended" : "Account Reactivated",
            "Security & Access",
            `Account ${u.id} (${u.name}) administrative suspension toggled to ${nextStatus}.`
          );
          setTimeout(() => setAdminActionNotice(""), 4000);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleApproveKycUser = (userId: string) => {
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          setAdminActionNotice(`KYC Approved: ${u.name} is now ACTIVE with full banking privileges.`);
          logAdminAction(
            "KYC Approved",
            "Application Review",
            `Customer ${u.name} (${u.id}) approved and activated with full online banking access.`
          );
          setTimeout(() => setAdminActionNotice(""), 4000);
          return { ...u, status: "active" };
        }
        return u;
      })
    );
    // Also update applications list if exists
    setApplications((prev) =>
      prev.map((app) =>
        app.id === userId
          ? { ...app, status: "Approved", reviewNotes: "Identity and KYC verified by Super Administrator." }
          : app
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    const target = adminUsers.find((u) => u.id === userId);
    if (!target) return;
    if (confirm(`Are you sure you want to permanently delete user account ${target.name} (${target.id})?`)) {
      setAdminUsers((prev) => prev.filter((u) => u.id !== userId));
      setAdminActionNotice(`User account ${target.name} has been permanently deleted.`);
      logAdminAction(
        "User Deleted",
        "User Management",
        `User account ${target.id} (${target.name}) permanently purged from bank database.`
      );
      setTimeout(() => setAdminActionNotice(""), 4000);
    }
  };

  const handleResetUserPassword = (userId: string) => {
    const target = adminUsers.find((u) => u.id === userId);
    if (!target) return;
    const tempPass = `USB#${Math.floor(100000 + Math.random() * 900000)}`;
    alert(`Temporary one-time password generated for ${target.name} (${target.email}):\n\n${tempPass}\n\nThis temporary pass has been saved.`);
    setAdminActionNotice(`Password reset for ${target.name}. Temporary key dispatched.`);
    logAdminAction(
      "Password Reset",
      "Security & Access",
      `One-time temporary access code generated for ${target.name} (${target.email}).`
    );
    setTimeout(() => setAdminActionNotice(""), 4000);
  };

  const handleOpenAdjustBalanceModal = (user: AdminControlledUser) => {
    setAdjustBalanceUser(user);
    setAdjustCheckingAmt(user.checkingBalance.toString());
    setAdjustSavingsAmt(user.savingsBalance.toString());
  };

  const handleSaveBalanceAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustBalanceUser) return;
    const newChecking = parseFloat(adjustCheckingAmt);
    const newSavings = parseFloat(adjustSavingsAmt);
    if (isNaN(newChecking) || isNaN(newSavings)) {
      alert("Please enter valid numeric balance amounts.");
      return;
    }
    setAdminUsers((prev) =>
      prev.map((u) => {
        if (u.id === adjustBalanceUser.id) {
          return { ...u, checkingBalance: newChecking, savingsBalance: newSavings };
        }
        return u;
      })
    );
    if (customerUser && adjustBalanceUser.name.toLowerCase() === customerUser.toLowerCase()) {
      setCheckingBalance(newChecking);
      setSavingsBalance(newSavings);
    }
    setAdminActionNotice(
      `Balances updated for ${adjustBalanceUser.name}: Checking: $${newChecking.toFixed(2)}, Savings: $${newSavings.toFixed(2)}.`
    );
    logAdminAction(
      "Balance Adjusted",
      "User Management",
      `Adjusted deposits for ${adjustBalanceUser.name} (${adjustBalanceUser.id}): Checking: $${newChecking.toFixed(2)}, Savings: $${newSavings.toFixed(2)}.`
    );
    setAdjustBalanceUser(null);
    setTimeout(() => setAdminActionNotice(""), 4000);
  };

  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert("Name and email are required.");
      return;
    }
    const countryObj = SUPPORTED_COUNTRIES[newUserCountry] || SUPPORTED_COUNTRIES.US;
    const newId = `USB-${countryObj.code}-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdUser: AdminControlledUser = {
      id: newId,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      phone: newUserPhone.trim() || "+1 (555) 000-0000",
      country: countryObj.name,
      countryCode: countryObj.code,
      accountType: newUserAccountType,
      checkingBalance: parseFloat(newUserChecking) || 0.0,
      savingsBalance: parseFloat(newUserSavings) || 0.0,
      status: "active",
      idType: countryObj.idTypes[0]?.label || "Passport / ID",
      idNumber: `ID-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: "Today",
    };
    setAdminUsers((prev) => [createdUser, ...prev]);
    logAdminAction(
      "User Provisioned",
      "User Management",
      `Direct administrative creation of customer account ${newId} (${createdUser.name}, ${countryObj.name}).`
    );
    setNewUserModalOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPhone("");
    setAdminActionNotice(`New customer account ${createdUser.name} (${createdUser.id}) provisioned successfully.`);
    setTimeout(() => setAdminActionNotice(""), 4000);
  };

  const handleLoginAsCustomer = (user: AdminControlledUser) => {
    setCustomerUser(user.name);
    setCheckingBalance(user.checkingBalance);
    setSavingsBalance(user.savingsBalance);
    setCustomerModalOpen(false);
    setAdminActionNotice(`Switched view to customer: ${user.name}`);
    logAdminAction(
      "Customer Impersonation",
      "Security & Access",
      `Super Administrator opened customer dashboard view for ${user.name} (${user.id}).`
    );
    setTimeout(() => setAdminActionNotice(""), 4000);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Application Review & Decision Handlers
  const handleUpdateApplicationStatus = (
    appId: string,
    newStatus: "Pending" | "Under Review" | "Approved" | "Rejected",
    notes?: string
  ) => {
    const updatedNotes =
      notes ||
      (newStatus === "Approved"
        ? "All identity credentials verified. Account approved by Super Administrator."
        : newStatus === "Rejected"
        ? "Documentation did not meet verification standards. Application rejected."
        : newStatus === "Under Review"
        ? "Under active review by regulatory compliance desk."
        : "Application placed in review queue.");

    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, status: newStatus, reviewNotes: updatedNotes, updatedAt: "Just now" }
          : app
      )
    );

    // Synchronize user status in registry
    if (newStatus === "Approved") {
      setAdminUsers((prev) =>
        prev.map((u) => (u.id === appId ? { ...u, status: "active" } : u))
      );
    } else if (newStatus === "Rejected") {
      setAdminUsers((prev) =>
        prev.map((u) => (u.id === appId ? { ...u, status: "suspended" } : u))
      );
    }

    logAdminAction(
      `Application ${newStatus}`,
      "Application Review",
      `Application ${appId} status changed to '${newStatus}'. Decision Note: "${updatedNotes}".`
    );
    setAdminActionNotice(`Application ${appId} marked as ${newStatus}.`);
    setEditingApp(null);
    setTimeout(() => setAdminActionNotice(""), 4000);
  };

  // Customer Inquiries Handler
  const handleReplyInquiry = (
    inquiryId: string,
    replyMessage: string,
    newStatus: "In Progress" | "Resolved"
  ) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? {
              ...inq,
              status: newStatus,
              adminReply: replyMessage,
              respondedAt: "Just now",
            }
          : inq
      )
    );
    const targetInq = inquiries.find((i) => i.id === inquiryId);
    logAdminAction(
      `Inquiry ${newStatus}`,
      "Inquiry Response",
      `Responded to ticket #${targetInq?.ticketNumber || inquiryId} (${targetInq?.name}): "${replyMessage}"`
    );
    setAdminActionNotice(`Response dispatched to ticket #${targetInq?.ticketNumber || inquiryId}. Marked as ${newStatus}.`);
    setReplyingInquiry(null);
    setAdminReplyText("");
    setTimeout(() => setAdminActionNotice(""), 4000);
  };

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appFullName || !appEmail || !appPhone || !appIdNumber || !appPassword) {
      alert("Please complete all required fields for identity verification.");
      return;
    }
    const newId = `USB-${country.code}-${Math.floor(100000 + Math.random() * 900000)}`;

    const newApp: BankApplication = {
      id: newId,
      fullName: appFullName,
      email: appEmail,
      phone: appPhone,
      countryName: country.name,
      countryCode: country.code,
      region: appRegion || country.regions[0] || "",
      accountType: `${appAccountType} (${country.currency.code})`,
      idType: appSelectedIdType || country.idTypes[0]?.label || "Identity Document",
      idNumber: appIdNumber,
      status: "Pending",
      reviewNotes: `Application submitted for ${country.name}. Awaiting Super Administrator evaluation.`,
      submittedAt: "Today, Just now",
    };

    const newUserRecord: AdminControlledUser = {
      id: newId,
      name: appFullName,
      email: appEmail,
      phone: appPhone,
      country: country.name,
      countryCode: country.code,
      accountType: `${appAccountType} (${country.currency.code})`,
      checkingBalance: 0.0,
      savingsBalance: 0.0,
      status: "pending_kyc",
      idType: appSelectedIdType || country.idTypes[0]?.label || "Identity Document",
      idNumber: appIdNumber,
      createdAt: "Today",
    };

    setApplications((prev) => [newApp, ...prev]);
    setAdminUsers((prev) => [newUserRecord, ...prev]);
    logAdminAction(
      "Application Submitted",
      "Application Review",
      `New application ${newId} submitted via public portal by ${appFullName} (${country.name}).`
    );
    setAppSubmissionSuccess(newId);
  };

  const handleStatusSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = statusSearchId.trim().toUpperCase();
    if (!query) return;

    const foundApp = applications.find((a) => a.id.toUpperCase() === query);
    if (foundApp) {
      setStatusSearchResult({
        id: foundApp.id,
        status: foundApp.status,
        date: foundApp.submittedAt,
        details: foundApp.reviewNotes,
      });
    } else {
      setStatusSearchResult({
        id: query,
        status: "Application Not Found",
        date: "N/A",
        details: "No application matches this reference ID in the central system. Please ensure your ID starts with USB- or contact handle @infobank.",
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSending(true);
    setTimeout(() => {
      setContactSending(false);
      setContactSuccess(true);
      const ticketNum = `INF-${Math.floor(100000 + Math.random() * 900000)}`;

      const newInquiry: CustomerInquiry = {
        id: `inq-${Date.now()}`,
        ticketNumber: ticketNum,
        name: contactName,
        email: contactEmail,
        subject: contactSubject || `General inquiry regarding ${country.name} banking`,
        message: contactMessage,
        status: "Unread",
        submittedAt: "Today, Just now",
      };

      setInquiries((prev) => [newInquiry, ...prev]);
      logAdminAction(
        "Inquiry Received",
        "Inquiry Response",
        `Customer inquiry ticket #${ticketNum} received from ${contactName} (${contactEmail}).`
      );

      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
    }, 800);
  };

  const filteredUsers = adminUsers.filter((u) => {
    const q = adminSearchQuery.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.country.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q);
    if (adminStatusFilter === "all") return matchesSearch;
    return matchesSearch && u.status === adminStatusFilter;
  });

  const totalDeposits = adminUsers.reduce(
    (sum, u) => sum + u.checkingBalance + u.savingsBalance,
    0
  );
  const pendingKycCount = adminUsers.filter((u) => u.status === "pending_kyc").length;
  const activeCount = adminUsers.filter((u) => u.status === "active").length;
  const frozenUsersCount = adminUsers.filter((u) => u.status === "frozen").length;
  const suspendedUsersCount = adminUsers.filter((u) => u.status === "suspended").length;

  const filteredApplications = applications.filter((app) => {
    const q = adminSearchQuery.toLowerCase();
    const matchesSearch =
      app.fullName.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.id.toLowerCase().includes(q) ||
      app.countryName.toLowerCase().includes(q);
    if (appStatusFilter === "all") return matchesSearch;
    return matchesSearch && app.status.toLowerCase() === appStatusFilter.toLowerCase();
  });

  const filteredInquiries = inquiries.filter((inq) => {
    const q = adminSearchQuery.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      inq.ticketNumber.toLowerCase().includes(q) ||
      inq.subject.toLowerCase().includes(q);
    if (inquiryStatusFilter === "all") return matchesSearch;
    return matchesSearch && inq.status.toLowerCase().replace(" ", "_") === inquiryStatusFilter.toLowerCase();
  });

  const filteredAuditLogs = auditLogs.filter((log) => {
    const q = adminSearchQuery.toLowerCase();
    const matchesSearch =
      log.action.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q);
    if (auditCategoryFilter === "all") return matchesSearch;
    return matchesSearch && log.category.toLowerCase() === auditCategoryFilter.toLowerCase();
  });

  const unreadInquiriesCount = inquiries.filter((i) => i.status === "Unread").length;
  const pendingAppsCount = applications.filter((a) => a.status === "Pending" || a.status === "Under Review").length;

  const currentIdConfig =
    country.idTypes.find((it) => it.id === appSelectedIdType) || country.idTypes[0];

  // If authenticated as Staff Sign-In Admin, render the full dedicated dashboard interface matching the reference layout
  if (soloAdminUser) {
    return (
      <SoloAdminDashboard
        onSignOut={() => setSoloAdminUser(null)}
        adminUsername={soloAdminUser.username}
      />
    );
  }

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      {/* Skip to Content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Flag Stripes Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Global Regional & Multilingual Selector Utility Bar */}
      <div className="border-b border-border/80 bg-navy-deep text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-2 text-xs">
          {/* Left: Branding & Regulatory Disclaimer */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold tracking-wide">
              <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
              US Finance Bank • Global Digital Portal
            </span>
            <span className="hidden text-white/30 sm:inline">|</span>
            <span className="hidden text-white/80 md:inline">
              Official Channel: <strong className="text-white">@infobank</strong>
            </span>
          </div>

          {/* Right: Country & Language Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Country Selector */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded border border-white/15">
              <span className="text-sm" aria-hidden="true">
                {country.flag}
              </span>
              <select
                aria-label="Select Country"
                value={currentCountryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {Object.values(SUPPORTED_COUNTRIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-navy-deep text-white">
                    {c.flag} {c.name} ({c.currency.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded border border-white/15">
              <Globe2 className="h-3.5 w-3.5 text-accent shrink-0" />
              <select
                aria-label="Select Language"
                value={currentLangCode}
                onChange={(e) => setCurrentLangCode(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {Object.values(SUPPORTED_LANGUAGES).map((l) => (
                  <option key={l.code} value={l.code} className="bg-navy-deep text-white">
                    {l.flag} {l.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Staff Sign In Admin Shortcut */}
            {soloAdminUser ? (
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-white shadow-xs flex items-center gap-1">
                  <SlidersHorizontal className="h-3 w-3" />
                  Super Administrator Active
                </span>
                <button
                  type="button"
                  onClick={() => setSoloAdminUser(null)}
                  className="text-xs text-white/80 hover:text-white underline"
                >
                  Exit Session
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="flex items-center gap-1.5 font-semibold text-white/90 underline-offset-4 hover:text-white hover:underline focus:outline-none"
                title="Staff Sign-In Admin Dashboard"
              >
                <SlidersHorizontal className="h-3 w-3 text-accent shrink-0" />
                <span className="hidden xl:inline">Staff Sign-In Admin Dashboard</span>
                <span className="xl:hidden">Staff Sign-In Admin</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/95 shadow-xs backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          {/* Logo */}
          <a
            href="#top"
            className="group flex min-w-0 items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-ring"
            aria-label="US Finance Bank, Online Banking home"
          >
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20 transition-transform group-hover:scale-105">
              <Landmark className="h-6 w-6 text-white" />
              <span
                className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-accent"
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0 leading-tight">
              <span className="block text-base font-extrabold tracking-tight text-primary sm:text-lg">
                US FINANCE BANK
              </span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-accent sm:text-[0.72rem]">
                {t.tagline} • {country.currency.code} ({country.currency.symbol})
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-semibold text-foreground/90">
              <li>
                <a href="#top" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#personal" className="hover:text-primary">
                  {t.personalBanking}
                </a>
              </li>
              <li>
                <a href="#business" className="hover:text-primary">
                  {t.businessBanking}
                </a>
              </li>
              <li>
                <a href="#online-banking" className="hover:text-primary">
                  {t.onlineBanking}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary">
                  {t.aboutUs}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary">
                  {t.contactUs}
                </a>
              </li>
            </ul>
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCheckStatusModalOpen(true)}
              className="border-primary/20 text-xs font-semibold text-primary hover:bg-primary/5"
            >
              <FileCheck2 className="mr-1.5 h-3.5 w-3.5 text-accent" />
              Check Status
            </Button>

            {customerUser ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCustomerUser(null)}
                className="border-primary/30 text-primary hover:bg-primary/5"
              >
                <LogOut className="mr-1.5 h-4 w-4" /> {t.signOut}
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenAccountModalOpen(true)}
                  className="border-primary/20 text-primary hover:bg-primary/5"
                >
                  <Sparkles className="mr-1.5 h-4 w-4 text-accent" />
                  {t.createAccount}
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCustomerModalOpen(true)}
                  className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <LogIn className="mr-1.5 h-4 w-4 text-accent" />
                  {t.signIn}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Drawer Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCustomerModalOpen(true)}
              className="text-xs"
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile menu"
            className="border-t border-border bg-white px-5 py-4 shadow-lg lg:hidden"
          >
            <ul className="space-y-3">
              <li>
                <a
                  href="#top"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-base font-semibold text-primary"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#personal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-base font-semibold text-primary"
                >
                  {t.personalBanking}
                </a>
              </li>
              <li>
                <a
                  href="#business"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-base font-semibold text-primary"
                >
                  {t.businessBanking}
                </a>
              </li>
              <li>
                <a
                  href="#online-banking"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-base font-semibold text-primary"
                >
                  {t.onlineBanking}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-base font-semibold text-primary"
                >
                  {t.aboutUs}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-base font-semibold text-primary"
                >
                  {t.contactUs}
                </a>
              </li>
              <li className="pt-2 border-t border-border flex gap-2">
                <Button
                  variant="outline"
                  className="w-1/2 text-xs"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setOpenAccountModalOpen(true);
                  }}
                >
                  {t.createAccount}
                </Button>
                <Button
                  className="w-1/2 bg-primary text-xs"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCustomerModalOpen(true);
                  }}
                >
                  {t.signIn}
                </Button>
              </li>
              <li className="pt-1">
                <Button
                  variant="ghost"
                  className="w-full text-xs text-muted-foreground justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAdminModalOpen(true);
                  }}
                >
                  <SlidersHorizontal className="mr-1.5 h-3.5 w-3.5 text-accent shrink-0" />
                  Staff Sign-In Admin Dashboard
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Main Content Area */}
      <main id="main">
        {/* CUSTOMER DASHBOARD (Rendered when authenticated) */}
        {customerUser && (
          <section
            aria-labelledby="dashboard-title"
            className="border-b border-border bg-secondary/50 py-10"
          >
            <div className="mx-auto max-w-7xl px-5">
              <div className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-white p-6 shadow-sm md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                      {t.onlineBanking.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {country.name} • 256-Bit Encrypted Session
                    </span>
                  </div>
                  <h1
                    id="dashboard-title"
                    className="mt-1 font-display text-2xl font-bold text-primary sm:text-3xl"
                  >
                    {t.welcomeBack}, {customerUser}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    US Finance Bank • Multi-Currency Account Management ({country.currency.code})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCustomerUser(null)}
                    className="text-sm"
                  >
                    <LogOut className="mr-1.5 h-4 w-4" /> {t.signOut}
                  </Button>
                </div>
              </div>

              {/* Balances */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t.checking}
                    </span>
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-primary">
                    {country.currency.symbol}
                    {checkingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                    <span className="text-sm font-semibold text-muted-foreground">
                      {country.currency.code}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Account # •••• 4892 (Available)
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t.savings}
                    </span>
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-primary">
                    {country.currency.symbol}
                    {savingsBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}{" "}
                    <span className="text-sm font-semibold text-muted-foreground">
                      {country.currency.code}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Account # •••• 8104 (4.85% APY)
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-white p-6 shadow-xs sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {t.quickTransfer}
                    </span>
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <form onSubmit={handleTransfer} className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Recipient Identifier / IBAN / Account"
                      value={transferRecipient}
                      onChange={(e) => setTransferRecipient(e.target.value)}
                      required
                      className="w-full rounded-md border border-input px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder={`Amount in ${country.currency.code}`}
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        required
                        min="1"
                        step="0.01"
                        className="w-full rounded-md border border-input px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                      />
                      <Button type="submit" size="sm" className="bg-primary text-xs">
                        {t.sendFunds}
                      </Button>
                    </div>
                    {transferSuccess && (
                      <p className="text-xs font-medium text-emerald-600">{transferSuccess}</p>
                    )}
                  </form>
                </div>
              </div>

              {/* Transactions Ledger */}
              <div className="mt-6 rounded-xl border border-border bg-white p-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <h2 className="text-lg font-bold text-primary">{t.recentTransactions}</h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    Format: {country.dateFormat}
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between py-3.5 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-primary">{tx.desc}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.date} • {tx.category}
                        </p>
                      </div>
                      <span
                        className={`font-mono font-bold ${
                          tx.positive ? "text-emerald-600" : "text-foreground"
                        }`}
                      >
                        {tx.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* STAFF SIGN-IN ADMIN DASHBOARD */}
        {soloAdminUser && (
          <section
            aria-labelledby="solo-admin-title"
            className="border-b-4 border-accent bg-slate-950 text-white py-10 shadow-2xl"
          >
            <div className="mx-auto max-w-7xl px-5">
              {/* Header Bar */}
              <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:flex-row md:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-accent px-2.5 py-0.5 text-xs font-black text-white uppercase tracking-wider">
                      STAFF SIGN-IN ADMIN
                    </span>
                    <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                      Staff Authority Active
                    </span>
                    <span className="text-xs text-white/60">
                      Session Authenticated: {soloAdminUser.authenticatedAt}
                    </span>
                  </div>
                  <h1
                    id="solo-admin-title"
                    className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl"
                  >
                    Staff Sign-In Admin Dashboard
                  </h1>
                  <p className="text-sm text-white/70">
                    Administration console for customer accounts, banking applications, client inquiries (@infobank), and security audit logs.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => setNewUserModalOpen(true)}
                    className="bg-accent text-accent-foreground font-bold hover:bg-accent/90 text-xs sm:text-sm"
                  >
                    <PlusCircle className="mr-1.5 h-4 w-4" /> Provision New User
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      logAdminAction("Admin Signed Out", "Security & Access", "Super Administrator closed active session.");
                      setSoloAdminUser(null);
                    }}
                    className="border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm"
                  >
                    <LogOut className="mr-1.5 h-4 w-4" /> Exit Session
                  </Button>
                </div>
              </div>

              {/* Action Notice Alert */}
              {adminActionNotice && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs text-emerald-200 animate-fadeIn">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold">{adminActionNotice}</span>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                <button
                  type="button"
                  onClick={() => setAdminActiveTab("overview")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    adminActiveTab === "overview"
                      ? "bg-accent text-white shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  System Overview & KPIs
                </button>
                <button
                  type="button"
                  onClick={() => setAdminActiveTab("users")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    adminActiveTab === "users"
                      ? "bg-accent text-white shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  User Accounts ({adminUsers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminActiveTab("applications")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    adminActiveTab === "applications"
                      ? "bg-accent text-white shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <ClipboardList className="h-4 w-4" />
                  Applications & KYC ({applications.length})
                  {pendingAppsCount > 0 && (
                    <span className="rounded-full bg-amber-500 px-1.5 py-0.2 text-[0.65rem] text-slate-950 font-black">
                      {pendingAppsCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAdminActiveTab("inquiries")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    adminActiveTab === "inquiries"
                      ? "bg-accent text-white shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Customer Inquiries ({inquiries.length})
                  {unreadInquiriesCount > 0 && (
                    <span className="rounded-full bg-rose-500 px-1.5 py-0.2 text-[0.65rem] text-white font-black animate-pulse">
                      {unreadInquiriesCount}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setAdminActiveTab("logs")}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    adminActiveTab === "logs"
                      ? "bg-accent text-white shadow-md"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <History className="h-4 w-4" />
                  Activity Log ({auditLogs.length})
                </button>
              </div>

              {/* TAB 1: SYSTEM OVERVIEW & KPIS */}
              {adminActiveTab === "overview" && (
                <div className="mt-6 space-y-6">
                  {/* Summary Metrics */}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between text-xs font-bold tracking-wider text-accent uppercase">
                        <span>Total Customers</span>
                        <Users className="h-4 w-4 text-accent" />
                      </div>
                      <div className="mt-2 text-2xl font-black text-white">{adminUsers.length} Users</div>
                      <p className="mt-1 text-xs text-white/60">
                        {activeCount} Active • {frozenUsersCount + suspendedUsersCount} Restricted
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between text-xs font-bold tracking-wider text-emerald-400 uppercase">
                        <span>Controlled Assets</span>
                        <DollarSign className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="mt-2 text-2xl font-black text-emerald-400">
                        ${totalDeposits.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                      <p className="mt-1 text-xs text-white/60">Across checking and high-yield savings</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between text-xs font-bold tracking-wider text-amber-400 uppercase">
                        <span>Pending Applications</span>
                        <ClipboardList className="h-4 w-4 text-amber-400" />
                      </div>
                      <div className="mt-2 text-2xl font-black text-amber-400">{pendingAppsCount} Submissions</div>
                      <p className="mt-1 text-xs text-white/60">Awaiting Super Admin clearance</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between text-xs font-bold tracking-wider text-blue-400 uppercase">
                        <span>Inquiries (@infobank)</span>
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                      </div>
                      <div className="mt-2 text-2xl font-black text-blue-400">{unreadInquiriesCount} Unread</div>
                      <p className="mt-1 text-xs text-white/60">{inquiries.length} total customer tickets</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center justify-between text-xs font-bold tracking-wider text-rose-400 uppercase">
                        <span>Security Flags</span>
                        <ShieldBan className="h-4 w-4 text-rose-400" />
                      </div>
                      <div className="mt-2 text-2xl font-black text-rose-400">
                        {frozenUsersCount + suspendedUsersCount} Blocked
                      </div>
                      <p className="mt-1 text-xs text-white/60">Frozen or administratively suspended</p>
                    </div>
                  </div>

                  {/* Operational Quick View Grids */}
                  <div className="grid gap-6 lg:grid-cols-2">
                    {/* Actionable Applications */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ClipboardList className="h-5 w-5 text-amber-400" />
                          <h3 className="font-bold text-white text-base">Recent Submitted Applications</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAdminActiveTab("applications")}
                          className="text-xs text-accent font-semibold hover:underline"
                        >
                          View All ({applications.length}) →
                        </button>
                      </div>
                      <div className="mt-4 space-y-3">
                        {applications.slice(0, 3).map((app) => (
                          <div
                            key={app.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-white/5 bg-slate-900/60 p-3.5 text-xs"
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">{app.fullName}</span>
                                <span className="font-mono text-white/50 text-[0.7rem]">{app.id}</span>
                              </div>
                              <p className="text-white/60 text-[0.72rem] mt-0.5">
                                {app.countryName} • {app.accountType} • {app.idType}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded px-2 py-0.5 text-[0.68rem] font-bold ${
                                  app.status === "Approved"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : app.status === "Pending"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : app.status === "Under Review"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                }`}
                              >
                                {app.status}
                              </span>
                              {app.status !== "Approved" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleUpdateApplicationStatus(app.id, "Approved")}
                                  className="h-6 text-[0.68rem] bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2"
                                >
                                  Approve
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actionable Inquiries */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-5 w-5 text-blue-400" />
                          <h3 className="font-bold text-white text-base">Customer Inquiries (@infobank)</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAdminActiveTab("inquiries")}
                          className="text-xs text-accent font-semibold hover:underline"
                        >
                          View All ({inquiries.length}) →
                        </button>
                      </div>
                      <div className="mt-4 space-y-3">
                        {inquiries.slice(0, 3).map((inq) => (
                          <div
                            key={inq.id}
                            className="rounded-xl border border-white/5 bg-slate-900/60 p-3.5 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">{inq.name} ({inq.email})</span>
                              <span
                                className={`rounded px-2 py-0.5 text-[0.68rem] font-bold ${
                                  inq.status === "Resolved"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : inq.status === "In Progress"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                                }`}
                              >
                                {inq.status}
                              </span>
                            </div>
                            <p className="text-white/80 font-medium text-[0.75rem]">{inq.subject}</p>
                            <p className="text-white/50 text-[0.7rem] line-clamp-1">{inq.message}</p>
                            <div className="pt-1 flex items-center justify-between">
                              <span className="text-[0.65rem] text-white/40">{inq.ticketNumber} • {inq.submittedAt}</span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setReplyingInquiry(inq);
                                  setAdminReplyText(inq.adminReply || "");
                                }}
                                className="h-6 text-[0.68rem] text-accent hover:bg-accent/20 px-2"
                              >
                                Reply / Resolve →
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: USER ACCOUNT MANAGEMENT */}
              {adminActiveTab === "users" && (
                <div className="mt-6 space-y-4">
                  {/* Search & Filter Toolbar */}
                  <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        value={adminSearchQuery}
                        onChange={(e) => setAdminSearchQuery(e.target.value)}
                        placeholder="Search customers by name, email, phone, ID, or territory..."
                        className="w-full rounded-lg border border-white/10 bg-slate-900/90 pl-9 pr-4 py-2 text-xs text-white placeholder-white/40 focus:border-accent focus:outline-none"
                      />
                      {adminSearchQuery && (
                        <button
                          type="button"
                          onClick={() => setAdminSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setAdminStatusFilter("all")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                          adminStatusFilter === "all"
                            ? "bg-accent text-white"
                            : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        All ({adminUsers.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminStatusFilter("active")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                          adminStatusFilter === "active"
                            ? "bg-emerald-600 text-white"
                            : "bg-white/5 text-emerald-300/80 hover:bg-white/10"
                        }`}
                      >
                        Active ({activeCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminStatusFilter("pending_kyc")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                          adminStatusFilter === "pending_kyc"
                            ? "bg-amber-600 text-white"
                            : "bg-white/5 text-amber-300/80 hover:bg-white/10"
                        }`}
                      >
                        Pending KYC ({pendingKycCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminStatusFilter("frozen")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                          adminStatusFilter === "frozen"
                            ? "bg-cyan-600 text-white"
                            : "bg-white/5 text-cyan-300/80 hover:bg-white/10"
                        }`}
                      >
                        Frozen ({frozenUsersCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setAdminStatusFilter("suspended")}
                        className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                          adminStatusFilter === "suspended"
                            ? "bg-rose-600 text-white"
                            : "bg-white/5 text-rose-300/80 hover:bg-white/10"
                        }`}
                      >
                        Suspended ({suspendedUsersCount})
                      </button>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60 shadow-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/5 text-white/70 uppercase tracking-wider text-[0.7rem]">
                        <tr>
                          <th className="px-4 py-3.5 font-bold">Customer Details</th>
                          <th className="px-4 py-3.5 font-bold">Jurisdiction & ID</th>
                          <th className="px-4 py-3.5 font-bold">Account Balances</th>
                          <th className="px-4 py-3.5 font-bold">Status</th>
                          <th className="px-4 py-3.5 font-bold text-right">Super Administrator Controls</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-white/50">
                              No customer accounts match the filter.
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((u) => (
                            <tr key={u.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-3.5">
                                <div className="font-bold text-white text-sm">{u.name}</div>
                                <div className="text-white/60 text-[0.72rem]">{u.email}</div>
                                <div className="text-white/40 text-[0.7rem] font-mono">
                                  ID: {u.id} • {u.phone}
                                </div>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="font-semibold text-white/90">{u.country}</div>
                                <div className="text-white/60 text-[0.72rem]">{u.idType}</div>
                                <div className="text-accent/90 text-[0.7rem] font-mono">{u.idNumber}</div>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="font-bold text-white">
                                  Checking: <span className="text-emerald-400">${u.checkingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="text-white/70 text-[0.72rem]">
                                  Savings: <span className="text-accent">${u.savingsBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="text-white/40 text-[0.68rem]">{u.accountType}</div>
                              </td>
                              <td className="px-4 py-3.5">
                                {u.status === "active" && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-300 border border-emerald-500/30">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    Active
                                  </span>
                                )}
                                {u.status === "pending_kyc" && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-amber-300 border border-amber-500/30 animate-pulse">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                    Pending KYC
                                  </span>
                                )}
                                {u.status === "frozen" && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/20 px-2.5 py-0.5 font-bold text-cyan-300 border border-cyan-500/30">
                                    <ShieldBan className="h-3 w-3 text-cyan-300" />
                                    Frozen
                                  </span>
                                )}
                                {u.status === "suspended" && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 px-2.5 py-0.5 font-bold text-rose-300 border border-rose-500/30">
                                    <UserX className="h-3 w-3 text-rose-300" />
                                    Suspended
                                  </span>
                                )}
                              </td>
                              <td className="px-4 py-3.5 text-right">
                                <div className="flex flex-wrap items-center justify-end gap-1.5">
                                  {u.status === "pending_kyc" && (
                                    <Button
                                      size="sm"
                                      onClick={() => handleApproveKycUser(u.id)}
                                      className="h-7 bg-emerald-600 hover:bg-emerald-700 text-white text-[0.7rem] font-bold px-2.5"
                                    >
                                      <UserCheck className="mr-1 h-3 w-3" /> Approve KYC
                                    </Button>
                                  )}
                                  {u.status === "frozen" ? (
                                    <Button
                                      size="sm"
                                      onClick={() => handleToggleFreezeUser(u.id)}
                                      className="h-7 bg-cyan-600 hover:bg-cyan-700 text-white text-[0.7rem] font-bold px-2.5"
                                    >
                                      <ShieldCheck className="mr-1 h-3 w-3" /> Unfreeze
                                    </Button>
                                  ) : u.status === "active" ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleToggleFreezeUser(u.id)}
                                      className="h-7 border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 text-[0.7rem] px-2.5"
                                    >
                                      <ShieldBan className="mr-1 h-3 w-3" /> Freeze
                                    </Button>
                                  ) : null}
                                  {u.status === "suspended" ? (
                                    <Button
                                      size="sm"
                                      onClick={() => handleToggleSuspendUser(u.id)}
                                      className="h-7 bg-emerald-600 hover:bg-emerald-700 text-white text-[0.7rem] font-bold px-2.5"
                                    >
                                      <UserCheck className="mr-1 h-3 w-3" /> Reactivate
                                    </Button>
                                  ) : u.status === "active" ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleToggleSuspendUser(u.id)}
                                      className="h-7 border-rose-500/40 text-rose-300 hover:bg-rose-500/20 text-[0.7rem] px-2.5"
                                    >
                                      <UserX className="mr-1 h-3 w-3" /> Suspend
                                    </Button>
                                  ) : null}
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleOpenAdjustBalanceModal(u)}
                                    className="h-7 text-[0.7rem] bg-white/10 text-white hover:bg-white/20 px-2.5"
                                  >
                                    <DollarSign className="mr-0.5 h-3 w-3 text-accent" /> Adjust Funds
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleResetUserPassword(u.id)}
                                    className="h-7 border-white/20 text-white/80 hover:bg-white/10 hover:text-white text-[0.7rem] px-2"
                                    title="Reset Password"
                                  >
                                    <RefreshCw className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleLoginAsCustomer(u)}
                                    className="h-7 text-white/70 hover:text-white hover:bg-white/10 text-[0.7rem] px-2"
                                    title="Switch View to Customer"
                                  >
                                    <LogIn className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="h-7 text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 text-[0.7rem] px-2"
                                    title="Delete Customer Account"
                                  >
                                    <Trash2 className="h-3 w-3" />
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
              )}

              {/* TAB 3: APPLICATION & KYC MANAGEMENT */}
              {adminActiveTab === "applications" && (
                <div className="mt-6 space-y-4">
                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-white/60 font-semibold mr-1">Status Filter:</span>
                      {["all", "Pending", "Under Review", "Approved", "Rejected"].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setAppStatusFilter(st)}
                          className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                            appStatusFilter === st
                              ? "bg-accent text-white"
                              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {st === "all" ? `All (${applications.length})` : st}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-white/50">
                      Applications dynamically sync with customer "Check Status" search.
                    </span>
                  </div>

                  {/* Applications Cards Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredApplications.length === 0 ? (
                      <div className="col-span-2 rounded-xl border border-white/10 bg-slate-900/60 p-8 text-center text-white/50 text-xs">
                        No applications found under current filter.
                      </div>
                    ) : (
                      filteredApplications.map((app) => (
                        <div
                          key={app.id}
                          className="rounded-xl border border-white/10 bg-slate-900/70 p-5 shadow-lg space-y-3"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-white text-base">{app.fullName}</h4>
                                <span className="font-mono text-accent text-xs font-bold">{app.id}</span>
                              </div>
                              <p className="text-xs text-white/60">{app.email} • {app.phone}</p>
                            </div>
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                app.status === "Approved"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : app.status === "Pending"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                                  : app.status === "Under Review"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              }`}
                            >
                              {app.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 rounded-lg bg-white/5 p-3 text-xs text-white/70">
                            <div>
                              <span className="text-white/40 block text-[0.68rem]">Jurisdiction & Region:</span>
                              <strong className="text-white">{app.countryName}</strong> ({app.region})
                            </div>
                            <div>
                              <span className="text-white/40 block text-[0.68rem]">Account Desired:</span>
                              <strong className="text-white">{app.accountType}</strong>
                            </div>
                            <div className="col-span-2 pt-1 border-t border-white/5">
                              <span className="text-white/40 block text-[0.68rem]">Identity Verification:</span>
                              <span className="text-white">{app.idType}:</span>{" "}
                              <span className="font-mono text-accent">{app.idNumber}</span>
                            </div>
                          </div>

                          <div className="rounded-lg bg-slate-950/80 p-2.5 text-xs text-white/80 border border-white/5">
                            <span className="text-white/40 text-[0.68rem] block">Administrator Review Notes:</span>
                            <p className="mt-0.5 text-white/90 italic text-[0.72rem]">"{app.reviewNotes}"</p>
                            <span className="text-white/40 text-[0.65rem] block mt-1">Submitted: {app.submittedAt}</span>
                          </div>

                          {/* Quick Decision Buttons */}
                          <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-white/10">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateApplicationStatus(app.id, "Approved")}
                              className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                            >
                              <Check className="mr-1 h-3.5 w-3.5" /> Approve & Activate
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateApplicationStatus(app.id, "Under Review")}
                              className="h-7 text-xs border-blue-500/40 text-blue-300 hover:bg-blue-500/20"
                            >
                              <Clock className="mr-1 h-3.5 w-3.5" /> Set Under Review
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateApplicationStatus(app.id, "Rejected")}
                              className="h-7 text-xs border-rose-500/40 text-rose-300 hover:bg-rose-500/20"
                            >
                              <XCircle className="mr-1 h-3.5 w-3.5" /> Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingApp(app);
                                setAppNewStatus(app.status);
                                setAppReviewNotes(app.reviewNotes);
                              }}
                              className="h-7 text-xs text-white/70 hover:text-white"
                            >
                              <Edit3 className="mr-1 h-3.5 w-3.5" /> Edit Notes
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: CUSTOMER INQUIRY MANAGEMENT (@INFOBANK) */}
              {adminActiveTab === "inquiries" && (
                <div className="mt-6 space-y-4">
                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-white/60 font-semibold mr-1">Inquiry Status:</span>
                      {["all", "Unread", "In Progress", "Resolved"].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setInquiryStatusFilter(st)}
                          className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                            inquiryStatusFilter === st
                              ? "bg-accent text-white"
                              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {st === "all" ? `All (${inquiries.length})` : st}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-white/50">
                      Coordinated under verified official communication handle <strong>@infobank</strong>.
                    </span>
                  </div>

                  {/* Inquiries Cards */}
                  <div className="space-y-3">
                    {filteredInquiries.length === 0 ? (
                      <div className="rounded-xl border border-white/10 bg-slate-900/60 p-8 text-center text-white/50 text-xs">
                        No customer inquiries found.
                      </div>
                    ) : (
                      filteredInquiries.map((inq) => (
                        <div
                          key={inq.id}
                          className="rounded-xl border border-white/10 bg-slate-900/70 p-5 shadow-md space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-accent text-xs font-bold">{inq.ticketNumber}</span>
                                <h4 className="font-bold text-white text-sm">{inq.name}</h4>
                                <span className="text-xs text-white/50">({inq.email})</span>
                              </div>
                              <p className="text-xs text-white/90 font-medium mt-1">{inq.subject}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                  inq.status === "Resolved"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : inq.status === "In Progress"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : "bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse"
                                }`}
                              >
                                {inq.status}
                              </span>
                              <span className="text-[0.7rem] text-white/40">{inq.submittedAt}</span>
                            </div>
                          </div>

                          <div className="rounded-lg bg-black/30 p-3 text-xs text-white/80 leading-relaxed">
                            <span className="text-white/40 text-[0.68rem] block mb-1">Customer Inquiry Body:</span>
                            {inq.message}
                          </div>

                          {inq.adminReply && (
                            <div className="rounded-lg bg-blue-950/50 border border-blue-500/20 p-3 text-xs text-blue-200">
                              <div className="flex items-center justify-between text-[0.68rem] text-blue-300 font-bold mb-1">
                                <span>Official Administrator Response (@infobank):</span>
                                <span>{inq.respondedAt}</span>
                              </div>
                              <p className="leading-relaxed">{inq.adminReply}</p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <Button
                              size="sm"
                              onClick={() => {
                                setReplyingInquiry(inq);
                                setAdminReplyText(inq.adminReply || "");
                              }}
                              className="h-7 text-xs bg-accent text-accent-foreground font-bold hover:bg-accent/90"
                            >
                              <MessageSquare className="mr-1 h-3.5 w-3.5" /> Dispatch Response
                            </Button>
                            {inq.status !== "Resolved" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReplyInquiry(inq.id, inq.adminReply || "Inquiry reviewed and resolved by Super Administrator.", "Resolved")}
                                className="h-7 text-xs border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                              >
                                <Check className="mr-1 h-3.5 w-3.5" /> Mark Resolved
                              </Button>
                            )}
                            {inq.status === "Unread" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleReplyInquiry(inq.id, inq.adminReply || "Routing to regional specialist.", "In Progress")}
                                className="h-7 text-xs border-blue-500/40 text-blue-300 hover:bg-blue-500/20"
                              >
                                <Clock className="mr-1 h-3.5 w-3.5" /> Mark In Progress
                              </Button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: ADMINISTRATOR ACTIVITY & AUDIT LOG */}
              {adminActiveTab === "logs" && (
                <div className="mt-6 space-y-4">
                  {/* Category Filter Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-white/60 font-semibold mr-1">Audit Category:</span>
                      {["all", "User Management", "Application Review", "Inquiry Response", "Security & Access"].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setAuditCategoryFilter(cat)}
                          className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                            auditCategoryFilter === cat
                              ? "bg-accent text-white"
                              : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {cat === "all" ? `All Events (${auditLogs.length})` : cat}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-white/50">
                      Immutable chronologically ordered audit stream.
                    </span>
                  </div>

                  {/* Audit Trail Table */}
                  <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60 shadow-xl">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-white/10 bg-white/5 text-white/70 uppercase tracking-wider text-[0.7rem]">
                        <tr>
                          <th className="px-4 py-3.5 font-bold">Timestamp</th>
                          <th className="px-4 py-3.5 font-bold">Action</th>
                          <th className="px-4 py-3.5 font-bold">Category</th>
                          <th className="px-4 py-3.5 font-bold">Actor</th>
                          <th className="px-4 py-3.5 font-bold">Audit Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredAuditLogs.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-white/50">
                              No audit logs match current filter.
                            </td>
                          </tr>
                        ) : (
                          filteredAuditLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-3 font-mono text-[0.7rem] text-white/60 whitespace-nowrap">
                                {log.timestamp}
                              </td>
                              <td className="px-4 py-3 font-bold text-white whitespace-nowrap">
                                {log.action}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`rounded px-2 py-0.5 text-[0.65rem] font-bold ${
                                    log.category === "Security & Access"
                                      ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                      : log.category === "Application Review"
                                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                      : log.category === "Inquiry Response"
                                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  }`}
                                >
                                  {log.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-white/70 text-[0.72rem] whitespace-nowrap">
                                {log.actor}
                              </td>
                              <td className="px-4 py-3 text-white/80 text-xs">
                                {log.details}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* HERO SECTION WITH USER UPLOADED BANK BUILDING PHOTOGRAPH */}
        <section
          aria-labelledby="hero-heading"
          className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground min-h-[640px] flex items-center"
        >
          {/* USER'S EXACT US FINANCE BANK HEADQUARTERS PHOTOGRAPH */}
          <img
            src={usFinanceBuildingHero}
            alt="US Finance Bank Modern Financial Headquarters Tower"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-top brightness-90 contrast-105"
            fetchPriority="high"
          />

          {/* Elegant Patriotic Gradient Overlay for readability and American styling */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/80 to-primary/60"
          />

          <div className="mx-auto max-w-7xl px-5 py-20 lg:py-28 w-full">
            <div className="max-w-2xl">
              {/* Badge with motto from building facade */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                {t.motto.toUpperCase()}
              </div>

              {/* Main Heading */}
              <h1
                id="hero-heading"
                className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-md"
              >
                {t.heroHeadline}
              </h1>

              {/* Supporting Text */}
              <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                {t.heroSubheadline}
              </p>

              {/* Red Accent Divider */}
              <div className="my-7 h-1 w-20 rounded bg-accent" aria-hidden="true" />

              {/* Country Service Banner */}
              <div className="mb-6 rounded-lg bg-white/10 p-3.5 backdrop-blur-sm border border-white/15 text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <span>{country.flag}</span>
                  <span>Currently Viewing: {country.name} ({country.currency.code} - {country.currency.symbol})</span>
                </div>
                <p className="mt-1 text-white/75 text-[0.7rem] leading-relaxed">
                  {country.regulatoryNote}
                </p>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    if (customerUser) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      setCustomerModalOpen(true);
                    }
                  }}
                  className="min-h-12 bg-accent px-6 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {t.signIn}
                </Button>
                <Button
                  size="lg"
                  onClick={() => setOpenAccountModalOpen(true)}
                  className="min-h-12 border-white/30 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-sm hover:bg-white hover:text-primary"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  {t.createAccount}
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="min-h-12 text-base font-semibold text-white hover:bg-white/10"
                >
                  <a href="#contact">{t.contactUs}</a>
                </Button>
              </div>

              {/* Security Pill */}
              <div className="mt-8 flex items-center gap-3 text-xs text-white/70">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>
                  Bank-grade encryption • Multi-factor authentication • Global identity verification
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STEP BY STEP BRANCHES & DIGITAL GALLERY (No write-up, clean Step 1 to 5) */}
        <section aria-label="Our Branches & Operations" className="border-b border-border bg-slate-50/70 py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mb-10 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                GLOBAL PRESENCE & OPERATIONS
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">
                Our Branches & Digital Banking
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 bg-accent" />
            </div>

            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {/* Step 1: Canada Branch */}
              <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border/80 bg-white shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={branchCanadaImg}
                    alt="Step 1: US Finance Bank Canada Branch"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-navy-deep/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-xs">
                    Step 1
                  </div>
                </div>
              </div>

              {/* Step 2: United Kingdom Branch */}
              <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border/80 bg-white shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={branchUkImg}
                    alt="Step 2: US Finance Bank United Kingdom Branch"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-navy-deep/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-xs">
                    Step 2
                  </div>
                </div>
              </div>

              {/* Step 3: Digital Card & Mobile Banking */}
              <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border/80 bg-white shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={mobileCardBankingImg}
                    alt="Step 3: Mobile Banking and Debit Card"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-navy-deep/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-xs">
                    Step 3
                  </div>
                </div>
              </div>

              {/* Step 4: Officer Customer Support */}
              <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm overflow-hidden rounded-2xl border border-border/80 bg-white shadow-xs transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={officerSupportImg}
                    alt="Step 4: Banking Officer Support Desk"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 rounded-md bg-navy-deep/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white shadow-sm backdrop-blur-xs">
                    Step 4
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10 SUPPORTED COUNTRIES CAROUSEL / GRID */}
        <section className="border-y border-border bg-white py-12">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  GLOBAL REACH
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-primary sm:text-3xl">
                  Intended International Service Coverage
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select your country to adapt banking requirements, currencies, and verification methods.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCheckStatusModalOpen(true)}
                className="self-start sm:self-auto border-primary/20 text-xs"
              >
                <Search className="mr-1.5 h-3.5 w-3.5 text-accent" />
                Track Application Status
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {Object.values(SUPPORTED_COUNTRIES).map((c) => {
                const isSelected = c.code === currentCountryCode;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleCountryChange(c.code)}
                    className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-xs"
                        : "border-border bg-white hover:border-primary/40 hover:bg-secondary/20"
                    }`}
                  >
                    <div className="text-2xl">{c.flag}</div>
                    <div className="mt-2 text-sm font-bold text-primary">{c.name}</div>
                    <div className="mt-0.5 text-xs font-mono text-accent">
                      {c.currency.code} ({c.currency.symbol})
                    </div>
                    <div className="mt-2 text-[0.68rem] text-muted-foreground">
                      ID: {c.idTypes[0]?.label.split("(")[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-lg bg-secondary/50 p-3 text-[0.7rem] text-muted-foreground leading-relaxed">
              <strong>Compliance Notice:</strong> This country list represents US Finance Bank's intended service coverage. All country-specific identity, tax, and AML requirements are configurable and must be verified by local qualified legal and regulatory professionals prior to commercial onboarding.
            </div>
          </div>
        </section>

        {/* PERSONAL BANKING SECTION */}
        <section id="personal" aria-labelledby="personal-heading" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  PERSONAL SOLUTIONS
                </p>
                <h2
                  id="personal-heading"
                  className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl"
                >
                  Personal Banking Built Around You
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Simple everyday accounts, high-yield savings opportunities, and flexible
                  international currency options tailored for your lifestyle.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setOpenAccountModalOpen(true)}
                className="self-start md:self-auto border-primary/20 text-primary"
              >
                {t.createAccount}
              </Button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Wallet,
                  title: "Advantage Checking",
                  desc: "Zero hidden monthly maintenance fees with qualifying deposits, contactless cards, and international fee-free ATM access.",
                  perk: "Zero Minimum Opening Fee",
                },
                {
                  icon: TrendingUp,
                  title: "High-Yield Savings",
                  desc: "Put your money to work with market-competitive interest rates and automatic recurring savings rules.",
                  perk: "4.85% APY Eligible",
                },
                {
                  icon: Landmark,
                  title: "Cross-Border & Home Lending",
                  desc: "Whether purchasing a residential home or seeking credit facilities, our specialists provide transparent guidance.",
                  perk: "Competitive Fixed Rates",
                },
                {
                  icon: CreditCard,
                  title: "Cashback Credit Cards",
                  desc: "Earn cash rewards on groceries, travel, and online purchases with multi-currency protections and zero foreign transaction fees.",
                  perk: "Unlimited Cashback",
                },
                {
                  icon: ShieldCheck,
                  title: "Certificates of Deposit (CDs)",
                  desc: "Lock in guaranteed returns with terms from 6 months to 5 years designed to anchor your financial roadmap.",
                  perk: "Guaranteed Return Rate",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Check & Instant Transfer",
                  desc: "Deposit funds in seconds through camera capture with instant verification and real-time biometric authorization.",
                  perk: "24/7 Rapid Clearing",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative rounded-xl border border-border bg-white p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs">
                    <span className="font-semibold text-accent">{item.perk}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BUSINESS BANKING SECTION */}
        <section
          id="business"
          aria-labelledby="business-heading"
          className="border-t border-border bg-secondary/40 py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-5">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                COMMERCIAL & GLOBAL TREASURY
              </p>
              <h2
                id="business-heading"
                className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl"
              >
                Business Banking to Fuel Your Growth
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tailored financial solutions for small businesses, commercial operations, and
                multinational companies.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Building2,
                  title: "Commercial Checking",
                  desc: "Scalable multi-currency accounts featuring tiered transaction allowances, SWIFT wire transfers, and role delegation.",
                },
                {
                  icon: DollarSign,
                  title: "Treasury Management",
                  desc: "Automated ACH payroll, cash concentration, and liquidity sweeps to optimize operating capital.",
                },
                {
                  icon: CreditCard,
                  title: "Merchant Processing",
                  desc: "Accept payments in-person and online across all 10 supported regional currencies with next-day settlement.",
                },
                {
                  icon: FileText,
                  title: "Lines of Credit & Loans",
                  desc: "Equipment financing, commercial real estate loans, and revolving trade credit facilities.",
                },
              ].map((biz) => (
                <div
                  key={biz.title}
                  className="rounded-xl border border-border bg-white p-6 shadow-xs"
                >
                  <biz.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-base font-bold text-primary">{biz.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{biz.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ONLINE & DIGITAL BANKING SECTION */}
        <section
          id="online-banking"
          aria-labelledby="online-heading"
          className="bg-navy-deep text-primary-foreground py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  SECURITY & MULTI-FACTOR DEFENSE
                </p>
                <h2
                  id="online-heading"
                  className="mt-2 font-display text-3xl font-bold sm:text-4xl text-white"
                >
                  Bank Anywhere with Uncompromising Protection
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  {t.securityNotice}
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      title: "256-Bit Cryptographic Shield",
                      desc: "All traffic is secured by TLS 1.3 encryption. Passwords and sensitive documents are hashed with modern salting algorithms.",
                    },
                    {
                      title: "Multi-Factor Authentication (MFA / 2FA)",
                      desc: "Automated one-time security codes safeguard sign-ins, balance transfers, and password recovery operations.",
                    },
                    {
                      title: "Instant Card Lock / Unlock",
                      desc: "Freeze and unfreeze card privileges directly from your phone in real-time.",
                    },
                  ].map((feat) => (
                    <div key={feat.title} className="flex gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">{feat.title}</h3>
                        <p className="text-xs leading-relaxed text-white/70">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex gap-4">
                  <Button
                    onClick={() => setCustomerModalOpen(true)}
                    className="bg-accent text-accent-foreground font-bold hover:bg-accent/90"
                  >
                    {t.signIn}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setCheckStatusModalOpen(true)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Check Application Status
                  </Button>
                </div>
              </div>

              {/* Digital Mockup */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-white/60">
                    usfinancebank.global/verify/{country.code.toLowerCase()}
                  </span>
                </div>
                <div className="mt-6 space-y-4 text-xs">
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="text-white/70">Verified Account Snapshot</div>
                    <div className="mt-1 text-2xl font-bold text-white">
                      {country.currency.symbol}60,650.80 {country.currency.code}
                    </div>
                    <div className="mt-2 text-[0.7rem] text-emerald-400">
                      ✓ Biometric 2FA Active • {country.name} Banking Channel
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/10 p-3 text-center">
                      <Send className="mx-auto h-5 w-5 text-accent" />
                      <div className="mt-1 font-bold text-white">Global SWIFT</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-3 text-center">
                      <Lock className="mx-auto h-5 w-5 text-accent" />
                      <div className="mt-1 font-bold text-white">Card Security</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" aria-labelledby="about-heading" className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-5">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                {t.aboutUs.toUpperCase()}
              </p>
              <h2
                id="about-heading"
                className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl"
              >
                About US Finance Bank
              </h2>
              <div className="mx-auto my-4 h-1 w-16 bg-accent" />
              <p className="text-base leading-relaxed text-muted-foreground">
                US Finance Bank is committed to delivering accessible, transparent, and
                trustworthy banking services across the United States and international markets.
                We blend cutting-edge digital convenience with steadfast financial security.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-border p-6 text-center">
                <Users className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-primary">Customer-First Principles</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Accounts, interest schedules, and digital services designed for your financial
                  empowerment and transparency.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6 text-center">
                <ShieldCheck className="mx-auto h-10 w-10 text-accent" />
                <h3 className="mt-4 text-lg font-bold text-primary">Uncompromising Security</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Proactive fraud monitoring and robust multi-factor authentication protocols keep
                  your personal records and assets secure.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-primary">Multilingual Transparency</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Full localization across 9 languages ensures you can understand terms,
                  disclosures, and requirements with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT US SECTION */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="border-t border-border bg-secondary/30 py-16 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  GET IN TOUCH
                </p>
                <h2
                  id="contact-heading"
                  className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl"
                >
                  Contact US Finance Bank
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Have questions about opening an account, regional verification, or digital
                  banking services? Connect with our dedicated support desk.
                </p>

                {/* Verified Contact Details Box */}
                <div className="mt-8 rounded-xl border border-border bg-white p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-primary">Verified Official Contact</h3>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Headset className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs text-muted-foreground">Official Communications Handle</p>
                      <p className="text-base font-extrabold text-accent">@infobank</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    All authorized inquiries and customer care updates are coordinated under handle{" "}
                    <strong className="text-primary">@infobank</strong>.
                  </p>
                </div>

                <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
                  <p className="font-semibold flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                    Security Notice
                  </p>
                  <p className="mt-1 leading-relaxed">
                    US Finance Bank officials will never ask for your password, PIN, or one-time
                    verification codes via unsolicited email or phone.
                  </p>
                </div>
              </div>

              {/* Functional Contact Form */}
              <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-lg font-bold text-primary">Send an Inquiry to @infobank</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  We respond to verified inquiries within one business day.
                </p>

                {contactSuccess ? (
                  <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                    <h4 className="mt-3 text-base font-bold text-emerald-900">
                      Message Dispatched
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                      Thank you for contacting US Finance Bank. Your message has been routed to the{" "}
                      <strong>@infobank</strong> desk with ticket #
                      {Math.floor(100000 + Math.random() * 900000)}.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setContactSuccess(false)}
                      className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-bold text-foreground">
                        Your Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold text-foreground">
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-bold text-foreground">
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        placeholder={`Inquiry regarding ${country.name} services or accounts`}
                        className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-msg" className="block text-xs font-bold text-foreground">
                        Message
                      </label>
                      <textarea
                        id="contact-msg"
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Describe how we can assist you..."
                        className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={contactSending}
                      className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                    >
                      {contactSending ? "Transmitting to @infobank..." : "Submit Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-4 border-accent bg-navy-deep text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Landmark className="h-6 w-6 text-accent" />
                <span className="font-display font-bold text-lg text-white">US FINANCE BANK</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/70">
                Stronger Together for a Brighter Future. Modern digital banking with multilingual
                cross-border capabilities and 256-bit security standards.
              </p>
              <p className="mt-4 text-xs font-semibold text-white">
                Contact Handle: <span className="text-accent font-bold">@infobank</span>
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-accent">Banking</h4>
              <ul className="mt-3 space-y-2 text-xs text-white/80">
                <li>
                  <a href="#personal" className="hover:text-white">
                    Personal Checking
                  </a>
                </li>
                <li>
                  <a href="#personal" className="hover:text-white">
                    High-Yield Savings
                  </a>
                </li>
                <li>
                  <a href="#business" className="hover:text-white">
                    Commercial Checking
                  </a>
                </li>
                <li>
                  <a href="#business" className="hover:text-white">
                    Global Treasury
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-accent">Security & Access</h4>
              <ul className="mt-3 space-y-2 text-xs text-white/80">
                <li>
                  <button
                    type="button"
                    onClick={() => setCustomerModalOpen(true)}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    Customer Sign In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenAccountModalOpen(true)}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    Create Account / Apply
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setCheckStatusModalOpen(true)}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    Check Application Status
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setAdminModalOpen(true)}
                    className="hover:text-white flex items-center gap-1.5 text-white font-medium underline-offset-2 hover:underline"
                  >
                    <SlidersHorizontal className="h-3 w-3 text-accent" /> Staff Sign-In Admin Dashboard
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-accent">Service Countries</h4>
              <p className="mt-3 text-xs text-white/70 leading-relaxed">
                United States (USA), UK, Canada, Mexico, China, Taiwan, Japan, Vietnam, South Korea, Switzerland, Germany.
              </p>
              <div className="mt-3 text-xs text-white/60">
                Regional Currency: <strong className="text-white">{country.currency.name} ({country.currency.symbol})</strong>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
            <p className="leading-relaxed">
              Official US Finance Bank portal. Contact handle: @infobank. Treat the listed countries
              as the bank's intended service coverage, not as a claim of completed licensing or
              charter. Country-specific compliance, tax reporting, and KYC frameworks are
              customized per jurisdiction and subject to legal review before production launch.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} USFinanceBank • US Finance Bank | Online Banking.
            </p>
          </div>
        </div>
      </footer>

      {/* CUSTOMER LOGIN MODAL (WITH MULTI-FACTOR AUTHENTICATION) */}
      {customerModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setCustomerModalOpen(false);
                setMfaStep(false);
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{t.signIn}</h3>
                <p className="text-xs text-muted-foreground">
                  US Finance Bank • {country.name} Portal
                </p>
              </div>
            </div>

            {customerAuthError && (
              <div
                role="alert"
                className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 border border-red-200"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{customerAuthError}</span>
              </div>
            )}

            {!mfaStep ? (
              <form onSubmit={handleCustomerLoginSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="c-email" className="block text-xs font-bold text-foreground">
                    Email Address or Username
                  </label>
                  <input
                    id="c-email"
                    type="text"
                    required
                    value={customerLoginEmail}
                    onChange={(e) => setCustomerLoginEmail(e.target.value)}
                    placeholder="e.g. member@usfinancebank.com"
                    className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="c-pass" className="block text-xs font-bold text-foreground">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setCustomerModalOpen(false);
                        setForgotPasswordOpen(true);
                      }}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative mt-1">
                    <input
                      id="c-pass"
                      type={showCustomerPassword ? "text" : "password"}
                      required
                      value={customerLoginPassword}
                      onChange={(e) => setCustomerLoginPassword(e.target.value)}
                      placeholder="Enter account password"
                      className="w-full rounded-md border border-input px-3.5 py-2 pr-10 text-sm focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCustomerPassword(!showCustomerPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showCustomerPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="c-rem"
                    type="checkbox"
                    checked={rememberCustomer}
                    onChange={(e) => setRememberCustomer(e.target.checked)}
                    className="h-4 w-4 rounded border-input text-primary"
                  />
                  <label htmlFor="c-rem" className="text-xs text-muted-foreground">
                    Remember this device for trusted sign-ins
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={customerAuthLoading}
                  className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {customerAuthLoading ? "Verifying Credentials..." : "Continue to Security Check"}
                </Button>
              </form>
            ) : (
              /* MULTI-FACTOR AUTHENTICATION (MFA) STEP */
              <form onSubmit={handleMfaSubmit} className="mt-5 space-y-4">
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-xs text-blue-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <Fingerprint className="h-4 w-4 text-primary" />
                    {t.mfaTitle}
                  </p>
                  <p className="mt-1 leading-relaxed">{t.mfaPrompt}</p>
                  <div className="mt-3 rounded bg-white p-2 font-mono text-center text-sm font-bold text-primary border border-blue-200">
                    Simulated One-Time Code: <span className="text-accent">{generatedMfaCode}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="mfa-input" className="block text-xs font-bold text-foreground">
                    Enter 6-Digit One-Time Code (OTP)
                  </label>
                  <input
                    id="mfa-input"
                    type="text"
                    required
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    placeholder="e.g. 849201"
                    className="mt-1 w-full text-center tracking-widest font-mono text-lg rounded-md border border-input px-3.5 py-2 focus:border-primary focus:outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={customerAuthLoading}
                  className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {customerAuthLoading ? "Authorizing Session..." : "Verify & Sign In"}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setMfaStep(false)}
                    className="text-xs font-semibold text-muted-foreground hover:underline"
                  >
                    Back to password login
                  </button>
                </div>
              </form>
            )}

            <div className="mt-5 border-t border-border pt-4 text-center text-xs text-muted-foreground">
              New customer in {country.name}?{" "}
              <button
                type="button"
                onClick={() => {
                  setCustomerModalOpen(false);
                  setOpenAccountModalOpen(true);
                }}
                className="font-bold text-accent hover:underline"
              >
                Apply for an Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OPEN ACCOUNT / SIGN-UP REGISTRATION MODAL WITH JURISDICTION KYC */}
      {openAccountModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-xl rounded-2xl border border-border bg-white p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setOpenAccountModalOpen(false);
                setAppSubmissionSuccess(null);
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Open an Account • {country.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Tailored to local banking framework & currency ({country.currency.code})
                </p>
              </div>
            </div>

            {appSubmissionSuccess ? (
              <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <h4 className="mt-3 text-base font-bold text-emerald-900">
                  Application Logged Successfully
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                  Thank you, <strong>{appFullName}</strong>. Your account application has been
                  assigned tracking ID:
                </p>
                <div className="my-3 rounded bg-white p-3 font-mono text-base font-extrabold text-primary border border-emerald-300">
                  {appSubmissionSuccess}
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Confirmation routed to {appEmail}. You can track this application anytime using the
                  "Check Status" button.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setOpenAccountModalOpen(false);
                    setCustomerUser(appFullName.split(" ")[0]);
                    setAppSubmissionSuccess(null);
                  }}
                  className="mt-4 bg-primary text-white"
                >
                  Enter Online Banking Dashboard
                </Button>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="mt-5 space-y-4">
                {/* Notice explaining why information is required */}
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-xs text-blue-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Why we collect this:</span> Financial regulations
                    require identity verification (KYC/AML) to prevent fraud. Data is encrypted end-to-end and passwords are never stored in plain text.
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reg-name" className="block text-xs font-bold text-foreground">
                      Legal Full Name (as on ID)
                    </label>
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={appFullName}
                      onChange={(e) => setAppFullName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-email" className="block text-xs font-bold text-foreground">
                      Email Address
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      value={appEmail}
                      onChange={(e) => setAppEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reg-phone" className="block text-xs font-bold text-foreground">
                      Phone Number ({country.phoneCode})
                    </label>
                    <input
                      id="reg-phone"
                      type="tel"
                      required
                      value={appPhone}
                      onChange={(e) => setAppPhone(e.target.value)}
                      placeholder={`${country.phoneCode} ${country.phoneFormat}`}
                      className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="reg-pass" className="block text-xs font-bold text-foreground">
                      Create Strong Password
                    </label>
                    <div className="relative mt-1">
                      <input
                        id="reg-pass"
                        type={showAppPassword ? "text" : "password"}
                        required
                        value={appPassword}
                        onChange={(e) => setAppPassword(e.target.value)}
                        placeholder="At least 8 characters"
                        className="w-full rounded-md border border-input px-3.5 py-2 pr-10 text-sm focus:border-primary focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowAppPassword(!showAppPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showAppPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Country Specific Region & Address */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reg-region" className="block text-xs font-bold text-foreground">
                      {country.regionsLabel}
                    </label>
                    <select
                      id="reg-region"
                      value={appRegion}
                      onChange={(e) => setAppRegion(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      {country.regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reg-addr" className="block text-xs font-bold text-foreground">
                      Street Address
                    </label>
                    <input
                      id="reg-addr"
                      type="text"
                      required
                      value={appAddress}
                      onChange={(e) => setAppAddress(e.target.value)}
                      placeholder="Street, City, Postal Code"
                      className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                {/* Country Specific ID Verification */}
                <div className="rounded-xl border border-border p-4 bg-secondary/20">
                  <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                    <Fingerprint className="h-4 w-4 text-accent" />
                    Jurisdiction Identity Verification ({country.name})
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="id-type" className="block text-[0.7rem] font-bold text-foreground">
                        Document Type
                      </label>
                      <select
                        id="id-type"
                        value={appSelectedIdType}
                        onChange={(e) => setAppSelectedIdType(e.target.value)}
                        className="mt-1 w-full rounded-md border border-input bg-white px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
                      >
                        {country.idTypes.map((it) => (
                          <option key={it.id} value={it.id}>
                            {it.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="id-number" className="block text-[0.7rem] font-bold text-foreground">
                        Document Identification Number
                      </label>
                      <input
                        id="id-number"
                        type="text"
                        required
                        value={appIdNumber}
                        onChange={(e) => setAppIdNumber(e.target.value)}
                        placeholder={currentIdConfig?.placeholder}
                        className="mt-1 w-full rounded-md border border-input px-2.5 py-1.5 text-xs focus:border-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  <p className="mt-2 text-[0.68rem] text-muted-foreground italic">
                    Reason required: {currentIdConfig?.reason}
                  </p>
                </div>

                {/* Account Type & Funding */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="reg-type" className="block text-xs font-bold text-foreground">
                      Account Type Requested
                    </label>
                    <select
                      id="reg-type"
                      value={appAccountType}
                      onChange={(e) => setAppAccountType(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="Checking & Savings">
                        Advantage Checking & High-Yield Savings ({country.currency.code})
                      </option>
                      <option value="Commercial Business">
                        Commercial Business Account ({country.currency.code})
                      </option>
                      <option value="Fixed CD">Certificate of Deposit (CD)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reg-funds" className="block text-xs font-bold text-foreground">
                      Source of Funds (AML Requirement)
                    </label>
                    <select
                      id="reg-funds"
                      value={appSourceOfFunds}
                      onChange={(e) => setAppSourceOfFunds(e.target.value)}
                      className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      <option value="Employment / Salary">Employment / Salary</option>
                      <option value="Business Revenue">Business Revenue</option>
                      <option value="Investments / Savings">Investments / Savings</option>
                      <option value="Inheritance / Family">Inheritance / Family</option>
                    </select>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    id="reg-consent"
                    type="checkbox"
                    required
                    checked={appConsent}
                    onChange={(e) => setAppConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-input text-primary"
                  />
                  <label htmlFor="reg-consent" className="text-[0.72rem] text-muted-foreground leading-snug">
                    I verify that all submitted identity details are authentic. I agree to the
                    standard {country.name} regulatory disclosure and understand that US Finance
                    Bank will never request my password or one-time codes.
                  </label>
                </div>

                <Button type="submit" className="w-full bg-accent text-accent-foreground font-bold">
                  Submit Verified Application
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CHECK APPLICATION STATUS MODAL */}
      {checkStatusModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setCheckStatusModalOpen(false);
                setStatusSearchResult(null);
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">Check Application Status</h3>
                <p className="text-xs text-muted-foreground">Track real-time KYC & compliance progress</p>
              </div>
            </div>

            <form onSubmit={handleStatusSearch} className="mt-5 space-y-4">
              <div>
                <label htmlFor="status-id" className="block text-xs font-bold text-foreground">
                  Application Tracking ID
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    id="status-id"
                    type="text"
                    required
                    value={statusSearchId}
                    onChange={(e) => setStatusSearchId(e.target.value)}
                    placeholder="e.g. USB-GB-849201"
                    className="w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none font-mono uppercase"
                  />
                  <Button type="submit" className="bg-primary shrink-0">
                    Search
                  </Button>
                </div>
              </div>
            </form>

            {statusSearchResult && (
              <div className="mt-5 rounded-xl border border-border bg-secondary/30 p-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-primary">{statusSearchResult.id}</span>
                  <span className="rounded bg-amber-100 px-2 py-0.5 font-semibold text-amber-900 text-[0.68rem]">
                    {statusSearchResult.status}
                  </span>
                </div>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {statusSearchResult.details}
                </p>
                <div className="mt-3 text-[0.7rem] text-muted-foreground border-t border-border pt-2">
                  {statusSearchResult.date} • Need help? Contact handle <strong>@infobank</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STAFF SIGN IN ADMIN PORTAL LOGIN MODAL */}
      {adminModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setAdminModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white sm:text-lg">Staff Sign-In Admin Dashboard</h3>
                <p className="text-xs text-white/60">Unified Master System • Control All Users, Applications & Inquiries</p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-white/5 border border-white/10 p-3 text-xs text-white/80 leading-relaxed">
              Master administrative credentials grant complete control over customer accounts, KYC approvals, balances, and global security flags.
            </div>

            {/* Quick Auto-Fill Helper */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  setAdminUsername("admin");
                  setAdminPassword("admin");
                }}
                className="w-full rounded-md border border-accent/40 bg-accent/15 px-3 py-1.5 text-xs font-bold text-accent hover:bg-accent/25 transition-colors"
              >
                ⚡ Quick Auto-Fill Staff Sign In Admin Credentials (admin / admin)
              </button>
            </div>

            {adminAuthError && (
              <div
                role="alert"
                className="mt-3 flex items-center gap-2 rounded-lg bg-rose-500/20 border border-rose-500/30 p-2.5 text-xs text-rose-200"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{adminAuthError}</span>
              </div>
            )}

            <form onSubmit={handleSoloAdminSignIn} className="mt-4 space-y-4">
              <div>
                <label htmlFor="adm-id" className="block text-xs font-bold text-white/90">
                  Staff Sign In Admin Identifier
                </label>
                <input
                  id="adm-id"
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="e.g. admin or admin@usfinancebank.com"
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="adm-pass" className="block text-xs font-bold text-white/90">
                  Master Security Passphrase
                </label>
                <div className="relative mt-1">
                  <input
                    id="adm-pass"
                    type={showAdminPassword ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin passphrase"
                    className="w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 pr-10 text-sm text-white placeholder-white/40 focus:border-accent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                  >
                    {showAdminPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={adminAuthLoading}
                className="w-full bg-accent font-bold text-accent-foreground hover:bg-accent/90"
              >
                {adminAuthLoading ? "Verifying Master Authority..." : "Access Staff Sign In Admin Control Center"}
              </Button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 text-center text-[0.7rem] text-white/50">
              Only one solo administrator session is authorized per organization.
            </div>
          </div>
        </div>
      )}

      {/* ADJUST USER BALANCE MODAL */}
      {adjustBalanceUser && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setAdjustBalanceUser(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Adjust User Balances</h3>
                <p className="text-xs text-white/60">
                  {adjustBalanceUser.name} • {adjustBalanceUser.id}
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-white/5 p-3 text-xs text-white/70">
              User Jurisdiction: <strong className="text-white">{adjustBalanceUser.country}</strong> ({adjustBalanceUser.accountType})
            </div>

            <form onSubmit={handleSaveBalanceAdjustment} className="mt-4 space-y-4">
              <div>
                <label htmlFor="adj-check" className="block text-xs font-bold text-white/90">
                  Checking Account Balance (USD $)
                </label>
                <input
                  id="adj-check"
                  type="number"
                  step="0.01"
                  required
                  value={adjustCheckingAmt}
                  onChange={(e) => setAdjustCheckingAmt(e.target.value)}
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="adj-save" className="block text-xs font-bold text-white/90">
                  High-Yield Savings Balance (USD $)
                </label>
                <input
                  id="adj-save"
                  type="number"
                  step="0.01"
                  required
                  value={adjustSavingsAmt}
                  onChange={(e) => setAdjustSavingsAmt(e.target.value)}
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAdjustBalanceUser(null)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
                  Save & Apply Balances
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROVISION NEW CUSTOMER MODAL */}
      {newUserModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-7 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setNewUserModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
                <PlusCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Provision New Customer Account</h3>
                <p className="text-xs text-white/60">Admin Direct Account Creation</p>
              </div>
            </div>

            <form onSubmit={handleCreateNewUser} className="mt-5 space-y-4">
              <div>
                <label htmlFor="nu-name" className="block text-xs font-bold text-white/90">
                  Full Customer Name
                </label>
                <input
                  id="nu-name"
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. David Sterling"
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="nu-email" className="block text-xs font-bold text-white/90">
                    Email Address
                  </label>
                  <input
                    id="nu-email"
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="david.s@example.com"
                    className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="nu-phone" className="block text-xs font-bold text-white/90">
                    Phone Number
                  </label>
                  <input
                    id="nu-phone"
                    type="text"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="+1 (555) 302-8921"
                    className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="nu-country" className="block text-xs font-bold text-white/90">
                    Jurisdiction / Territory
                  </label>
                  <select
                    id="nu-country"
                    value={newUserCountry}
                    onChange={(e) => setNewUserCountry(e.target.value)}
                    className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  >
                    {Object.values(SUPPORTED_COUNTRIES).map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="nu-type" className="block text-xs font-bold text-white/90">
                    Account Classification
                  </label>
                  <select
                    id="nu-type"
                    value={newUserAccountType}
                    onChange={(e) => setNewUserAccountType(e.target.value)}
                    className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  >
                    <option value="Advantage Checking & Savings">Advantage Checking & Savings</option>
                    <option value="Commercial Treasury">Commercial Treasury</option>
                    <option value="High-Yield Savings">High-Yield Savings</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="nu-check" className="block text-xs font-bold text-white/90">
                    Initial Checking Deposit ($)
                  </label>
                  <input
                    id="nu-check"
                    type="number"
                    step="0.01"
                    value={newUserChecking}
                    onChange={(e) => setNewUserChecking(e.target.value)}
                    className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="nu-save" className="block text-xs font-bold text-white/90">
                    Initial Savings Deposit ($)
                  </label>
                  <input
                    id="nu-save"
                    type="number"
                    step="0.01"
                    value={newUserSavings}
                    onChange={(e) => setNewUserSavings(e.target.value)}
                    className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setNewUserModalOpen(false)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent text-accent-foreground font-bold hover:bg-accent/90">
                  Provision Customer Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REPLY TO CUSTOMER INQUIRY MODAL */}
      {replyingInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setReplyingInquiry(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Respond to Customer Inquiry</h3>
                <p className="text-xs text-white/60">
                  Ticket #{replyingInquiry.ticketNumber} • {replyingInquiry.name} ({replyingInquiry.email})
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-white/5 p-3 text-xs text-white/80 border border-white/10">
              <span className="text-accent font-bold block mb-1">Subject: {replyingInquiry.subject}</span>
              <p className="leading-relaxed text-white/70">"{replyingInquiry.message}"</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!adminReplyText.trim()) return;
                handleReplyInquiry(replyingInquiry.id, adminReplyText.trim(), "Resolved");
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label htmlFor="inq-reply" className="block text-xs font-bold text-white/90">
                  Official Super Administrator Response (@infobank)
                </label>
                <textarea
                  id="inq-reply"
                  rows={4}
                  required
                  value={adminReplyText}
                  onChange={(e) => setAdminReplyText(e.target.value)}
                  placeholder="Enter authorized response to customer..."
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 p-3 text-xs text-white placeholder-white/40 focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setReplyingInquiry(null)}
                  className="border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    if (!adminReplyText.trim()) return;
                    handleReplyInquiry(replyingInquiry.id, adminReplyText.trim(), "In Progress");
                  }}
                  className="bg-white/10 text-white hover:bg-white/20 text-xs"
                >
                  Save as In Progress
                </Button>
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground font-bold hover:bg-accent/90 text-xs"
                >
                  Dispatch Response & Resolve
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPDATE APPLICATION STATUS & DECISION MODAL */}
      {editingApp && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setEditingApp(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-white shadow-lg">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Review Banking Application</h3>
                <p className="text-xs text-white/60">
                  {editingApp.id} • {editingApp.fullName}
                </p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateApplicationStatus(editingApp.id, appNewStatus, appReviewNotes);
              }}
              className="mt-4 space-y-4 text-xs"
            >
              <div>
                <label className="block text-xs font-bold text-white/90">
                  Application Decision Status
                </label>
                <select
                  value={appNewStatus}
                  onChange={(e) => setAppNewStatus(e.target.value as any)}
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 p-2.5 text-xs text-white focus:border-accent focus:outline-none"
                >
                  <option value="Pending">Pending (Awaiting Evaluation)</option>
                  <option value="Under Review">Under Review (Compliance Screening)</option>
                  <option value="Approved">Approved (Clearance Granted)</option>
                  <option value="Rejected">Rejected (Declined)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/90">
                  Administrator Compliance Notes
                </label>
                <textarea
                  rows={3}
                  value={appReviewNotes}
                  onChange={(e) => setAppReviewNotes(e.target.value)}
                  placeholder="Notes visible to applicant during status lookup..."
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 p-2.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingApp(null)}
                  className="border-white/20 text-white hover:bg-white/10 text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent text-accent-foreground font-bold hover:bg-accent/90 text-xs">
                  Save Decision
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {forgotPasswordOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setForgotPasswordOpen(false);
                setResetSent(false);
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-bold text-primary">Recover Account Password</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter your registered email address to receive an authorized password reset link.
            </p>

            {resetSent ? (
              <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="mt-2 text-sm font-bold text-emerald-900">Recovery Link Dispatched</h4>
                <p className="mt-1 text-xs text-emerald-800">
                  Password reset verification has been sent to <strong>{resetEmail}</strong>.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setForgotPasswordOpen(false);
                    setCustomerModalOpen(true);
                    setResetSent(false);
                  }}
                  className="mt-4 bg-emerald-700 text-white"
                >
                  Return to Sign In
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!resetEmail) return;
                  setResetSent(true);
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label htmlFor="rst-email" className="block text-xs font-bold text-foreground">
                    Registered Email Address
                  </label>
                  <input
                    id="rst-email"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary font-bold">
                  Send Recovery Link
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}