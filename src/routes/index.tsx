import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Wallet,
  Landmark,
  Smartphone,
  Headset,
  ArrowRight,
  ArrowRightLeft,
  ShieldCheck,
  Users,
  BookOpen,
  Lock,
  Eye,
  EyeOff,
  CreditCard,
  Send,
  Mail,
  Phone,
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
  getCountryConfig,
  getTranslationDict,
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
  const country = getCountryConfig(currentCountryCode);
  const t = getTranslationDict(currentLangCode);

  // Modals & Panels
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [copiedAdminLink, setCopiedAdminLink] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [openAccountModalOpen, setOpenAccountModalOpen] = useState(false);
  const [checkStatusModalOpen, setCheckStatusModalOpen] = useState(false);
  const [adjustBalanceUser, setAdjustBalanceUser] = useState<AdminControlledUser | null>(null);
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);

  // Dedicated Admin Direct Link (Distinct from public home page)
  const adminDedicatedUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?portal=admin`
    : "https://usfinancebank.online/?portal=admin";

  // Check URL on mount: Automatically open Staff Admin Sign-In if visiting dedicated admin link
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash.toLowerCase();
      if (
        params.get("portal") === "admin" ||
        params.get("admin") === "portal" ||
        params.get("admin") === "true" ||
        params.get("admin") === "signin" ||
        params.get("staff") === "admin" ||
        hash.includes("admin")
      ) {
        setAdminModalOpen(true);
      }
    }
  }, []);

  const handleCopyAdminLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(adminDedicatedUrl);
      setCopiedAdminLink(true);
      setTimeout(() => setCopiedAdminLink(false), 3000);
    }
  };

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
  const [selectedCustomerTx, setSelectedCustomerTx] = useState<{
    id: string;
    date: string;
    desc: string;
    category: string;
    amount: string;
    positive: boolean;
    status: string;
    transferStatus?: string;
    counterparty?: string;
    statusUpdates?: {
      id: string;
      fromStatus: string;
      toStatus: string;
      updatedBy: string;
      reason: string;
      timestamp: string;
    }[];
  } | null>(null);

  const [transactions, setTransactions] = useState([
    {
      id: "TX-90214",
      date: "Today, 10:14 AM",
      desc: "Direct Deposit — Official Payroll",
      category: "Income",
      counterparty: "Global Enterprise Payroll Inc.",
      amount: "+$3,450.00",
      positive: true,
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
      id: "TX-90209",
      date: "Oct 16, 2026",
      desc: "Utility Provider — Bill Pay Direct",
      category: "Utilities",
      counterparty: "Consolidated Edison Utility",
      amount: "-$184.20",
      positive: false,
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
      id: "TX-90212",
      date: "Oct 17, 2026",
      desc: "Wire Transfer — International Settlement",
      category: "Wire Transfer",
      counterparty: "Offshore Vault Ltd. (CY)",
      amount: "-$14,200.00",
      positive: false,
      status: "On hold",
      transferStatus: "On hold",
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
      date: "Yesterday, 08:35 AM",
      desc: "Interbank Commercial Transfer",
      category: "Transfer",
      counterparty: "Ontario Commercial Services",
      amount: "-$6,000.00",
      positive: false,
      status: "Processing",
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
  ]);

  // Sync customer transactions with centralized transfer data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_transactions");
      if (saved) {
        try {
          const list = JSON.parse(saved);
          if (Array.isArray(list) && list.length > 0) {
            setTransactions((prev) =>
              prev.map((t) => {
                const match = list.find((item: any) => item.id === t.id);
                if (match) {
                  return {
                    ...t,
                    status: match.transferStatus || match.status,
                    transferStatus: match.transferStatus || match.status,
                    statusUpdates: match.statusUpdates || t.statusUpdates,
                  };
                }
                return t;
              })
            );
          }
        } catch {
          // ignore
        }
      }
    }
  }, [customerUser]);
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
            ? customerLoginEmail.split("@")[0] || customerLoginEmail
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
    const newTxId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
    const nowTime = "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const initialStatus = amt > 10000 ? "On hold" : "Processing";
    const initialReason = amt > 10000
      ? "Large transfer amount flagged for administrative secondary review."
      : "Transfer submitted to interbank clearing queue.";

    const newTx = {
      id: newTxId,
      date: nowTime,
      timestamp: nowTime,
      desc: `Transfer to ${transferRecipient || "External Account"}`,
      type: "Wire Transfer",
      category: "Transfer",
      amount: `-${country.currency.symbol}${amt.toFixed(2)}`,
      numericAmount: amt,
      currency: country.currency.code,
      counterparty: transferRecipient || "External Beneficiary Account",
      accountMasked: "••••••••4819",
      customerId: "CUST-109283",
      customerName: customerUser || "Eleanor Vance",
      positive: false,
      status: initialStatus,
      transferStatus: initialStatus,
      statusUpdates: [
        {
          id: `UPD-${Date.now().toString().slice(-4)}`,
          fromStatus: "Initiated",
          toStatus: initialStatus,
          updatedBy: "System Gateway",
          reason: initialReason,
          timestamp: nowTime,
        },
      ],
    };

    setTransactions((prev) => [newTx, ...prev]);

    // Also sync to localStorage so Admin sees it in Transfer Transactions!
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_transactions");
        const list = saved ? JSON.parse(saved) : [];
        const adminFormatTx = {
          id: newTxId,
          accountId: "ACC-US-001",
          accountMasked: "••••••••4819",
          customerId: "CUST-109283",
          customerName: customerUser || "Eleanor Vance",
          type: "Wire Transfer" as const,
          amount: amt,
          currency: country.currency.code,
          direction: "debit" as const,
          counterparty: transferRecipient || "External Beneficiary Account",
          timestamp: nowTime,
          status: initialStatus,
          transferStatus: initialStatus,
          statusUpdates: newTx.statusUpdates,
        };
        localStorage.setItem("us_finance_bank_transactions", JSON.stringify([adminFormatTx, ...list]));
      } catch {
        // ignore
      }
    }

    setTransferSuccess(
      `Transfer of ${country.currency.symbol}${amt.toFixed(2)} to ${transferRecipient || "Recipient"} initiated. Status: ${initialStatus}.`
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
    const countryObj = getCountryConfig(newUserCountry);
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
        details: "No application matches this reference ID in the central system. Please ensure your ID starts with USB- or contact usfinanceassistance@usfinancebank.online (+1-567-US).",
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
            <span className="hidden text-white/80 md:inline items-center gap-1.5">
              <Mail className="h-3 w-3 text-accent inline mr-1" />
              <a href="mailto:usfinanceassistance@usfinancebank.online" className="text-white hover:underline">
                usfinanceassistance@usfinancebank.online
              </a>
            </span>
            <span className="hidden text-white/30 lg:inline">|</span>
            <span className="hidden text-white/80 lg:inline items-center gap-1.5">
              <Phone className="h-3 w-3 text-accent inline mr-1" />
              <a href="tel:+1-567-US" className="text-white font-bold hover:underline">
                +1-567-US
              </a>
            </span>
          </div>

          {/* Right: Country & Language Selectors */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Country Selector */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded border border-white/15">
              {currentCountryCode === "US" ? (
                <svg
                  className="h-3.5 w-5 rounded-[2px] shadow-xs inline-block shrink-0"
                  viewBox="0 0 640 480"
                  aria-label="United States Flag"
                >
                  <g fillRule="evenodd">
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path
                      fill="#b22234"
                      d="M0 0h640v36.9H0zm0 73.8h640v37H0zm0 73.9h640v37H0zm0 73.8h640v37H0zm0 73.9h640v37H0zm0 73.8h640v37H0zm0 73.9h640v37H0z"
                    />
                    <path fill="#3c3b6e" d="M0 0h256v258.5H0z" />
                    <g fill="#fff">
                      <circle cx="28" cy="24" r="7" /><circle cx="70" cy="24" r="7" /><circle cx="112" cy="24" r="7" /><circle cx="154" cy="24" r="7" /><circle cx="196" cy="24" r="7" /><circle cx="238" cy="24" r="7" />
                      <circle cx="49" cy="48" r="7" /><circle cx="91" cy="48" r="7" /><circle cx="133" cy="48" r="7" /><circle cx="175" cy="48" r="7" /><circle cx="217" cy="48" r="7" />
                      <circle cx="28" cy="72" r="7" /><circle cx="70" cy="72" r="7" /><circle cx="112" cy="72" r="7" /><circle cx="154" cy="72" r="7" /><circle cx="196" cy="72" r="7" /><circle cx="238" cy="72" r="7" />
                      <circle cx="49" cy="96" r="7" /><circle cx="91" cy="96" r="7" /><circle cx="133" cy="96" r="7" /><circle cx="175" cy="96" r="7" /><circle cx="217" cy="96" r="7" />
                      <circle cx="28" cy="120" r="7" /><circle cx="70" cy="120" r="7" /><circle cx="112" cy="120" r="7" /><circle cx="154" cy="120" r="7" /><circle cx="196" cy="120" r="7" /><circle cx="238" cy="120" r="7" />
                      <circle cx="49" cy="144" r="7" /><circle cx="91" cy="144" r="7" /><circle cx="133" cy="144" r="7" /><circle cx="175" cy="144" r="7" /><circle cx="217" cy="144" r="7" />
                      <circle cx="28" cy="168" r="7" /><circle cx="70" cy="168" r="7" /><circle cx="112" cy="168" r="7" /><circle cx="154" cy="168" r="7" /><circle cx="196" cy="168" r="7" /><circle cx="238" cy="168" r="7" />
                      <circle cx="49" cy="192" r="7" /><circle cx="91" cy="192" r="7" /><circle cx="133" cy="192" r="7" /><circle cx="175" cy="192" r="7" /><circle cx="217" cy="192" r="7" />
                      <circle cx="28" cy="216" r="7" /><circle cx="70" cy="216" r="7" /><circle cx="112" cy="216" r="7" /><circle cx="154" cy="216" r="7" /><circle cx="196" cy="216" r="7" /><circle cx="238" cy="216" r="7" />
                    </g>
                  </g>
                </svg>
              ) : (
                <span className="text-sm" aria-hidden="true">
                  {country.flag}
                </span>
              )}
              <select
                aria-label="Select Country"
                value={currentCountryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer"
              >
                {Object.values(SUPPORTED_COUNTRIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-navy-deep text-white">
                    {c.name} ({c.currency.code})
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
                  Staff Admin Active
                </span>
                <button
                  type="button"
                  onClick={() => setSoloAdminUser(null)}
                  className="text-xs text-white/80 hover:text-white underline font-medium"
                >
                  Exit Session
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAdminModalOpen(true)}
                className="flex items-center gap-1.5 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 px-2.5 py-1 text-xs font-bold text-white transition-all shadow-xs"
                title="Staff Sign-In Admin Dashboard"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-accent shrink-0" />
                <span>Staff Sign-In Admin</span>
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
                  <div>
                    <h2 className="text-lg font-bold text-primary">{t.recentTransactions}</h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Select any transfer to review its live status, verified administrative updates, and clearing notes.
                    </p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Format: {country.dateFormat}
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      onClick={() => setSelectedCustomerTx(tx)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-3.5 px-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-primary">{tx.desc}</p>
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
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {tx.date} • {tx.category} • Ref: <span className="font-mono">{tx.id}</span>
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center">
                        <span
                          className={`font-mono font-bold ${
                            tx.positive ? "text-emerald-600" : "text-foreground"
                          }`}
                        >
                          {tx.amount}
                        </span>
                        <span className="text-[0.72rem] text-primary font-semibold hover:underline">
                          View Transfer Details →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CUSTOMER TRANSFER DETAILS & STATUS UPDATES MODAL */}
        {selectedCustomerTx && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto"
          >
            <div className="relative w-full max-w-lg rounded-2xl border border-border bg-white p-6 sm:p-7 shadow-2xl text-foreground max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedCustomerTx(null)}
                className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ArrowRightLeft className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-primary">Customer Transfer Details</h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        (selectedCustomerTx.transferStatus || selectedCustomerTx.status) === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : (selectedCustomerTx.transferStatus || selectedCustomerTx.status) === "On hold"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {selectedCustomerTx.transferStatus || selectedCustomerTx.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Tracking Reference: <span className="font-mono">{selectedCustomerTx.id}</span></p>
                </div>
              </div>

              {/* Transfer Summary */}
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-secondary/30 p-3">
                  <span className="text-muted-foreground">Total Settlement Amount:</span>
                  <span className={`font-mono font-bold text-base ${selectedCustomerTx.positive ? "text-emerald-600" : "text-primary"}`}>
                    {selectedCustomerTx.amount}
                  </span>
                </div>
                <div className="rounded-xl border border-border p-3 space-y-1.5">
                  <p><strong className="text-foreground">Description:</strong> {selectedCustomerTx.desc}</p>
                  <p><strong className="text-foreground">Channel / Category:</strong> {selectedCustomerTx.category}</p>
                  <p><strong className="text-foreground">Date / Timestamp:</strong> {selectedCustomerTx.date}</p>
                  {selectedCustomerTx.counterparty && (
                    <p><strong className="text-foreground">Counterparty Beneficiary:</strong> {selectedCustomerTx.counterparty}</p>
                  )}
                </div>
              </div>

              {/* Transfer Status History & Notes */}
              <div className="mt-4 rounded-xl border border-border bg-slate-50 p-4">
                <div className="flex items-center justify-between border-b border-border pb-2 mb-2.5">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <History className="h-3.5 w-3.5 text-primary" />
                    Transfer Status Updates & Verification History
                  </h4>
                  <span className="text-[0.65rem] text-muted-foreground">Synchronized With Bank Records</span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {!selectedCustomerTx.statusUpdates || selectedCustomerTx.statusUpdates.length === 0 ? (
                    <div className="text-[0.72rem] text-muted-foreground p-3 text-center">
                      Current status ({selectedCustomerTx.transferStatus || selectedCustomerTx.status}) confirmed at initiation.
                    </div>
                  ) : (
                    selectedCustomerTx.statusUpdates.map((upd: any) => (
                      <div key={upd.id} className="rounded-lg border border-border bg-white p-2.5 text-xs shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">
                            Status: <span className="text-muted-foreground font-normal">{upd.fromStatus}</span> → <strong className="text-accent">{upd.toStatus}</strong>
                          </span>
                          <span className="text-[0.68rem] text-muted-foreground font-mono">{upd.timestamp}</span>
                        </div>
                        <p className="mt-1 text-[0.72rem] text-muted-foreground leading-relaxed">
                          <strong className="text-foreground">Verified Note:</strong> {upd.reason}
                        </p>
                        <p className="text-[0.65rem] text-muted-foreground mt-0.5">
                          Logged by: {upd.updatedBy}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Demonstration notice */}
              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-[0.7rem] text-amber-900 leading-relaxed">
                <strong>Demonstration Environment:</strong> Displayed statuses reflect verified administrative tracking only and do not indicate real financial movement.
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => setSelectedCustomerTx(null)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold"
                >
                  Close Transfer Details
                </Button>
              </div>
            </div>
          </div>
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

                  <div className="mt-4 space-y-3.5">
                    {/* Official Email */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">Official Assistance Email</p>
                        <a
                          href="mailto:usfinanceassistance@usfinancebank.online"
                          className="text-sm font-extrabold text-accent hover:underline break-all"
                        >
                          usfinanceassistance@usfinancebank.online
                        </a>
                      </div>
                    </div>

                    {/* Official Phone Number */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs text-muted-foreground">Official Support Telephone</p>
                        <a
                          href="tel:+1-567-US"
                          className="text-base font-extrabold text-primary hover:text-accent hover:underline"
                        >
                          +1-567-US
                        </a>
                      </div>
                    </div>

                    {/* Channel Handle */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Headset className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs text-muted-foreground">Official Communications Handle</p>
                        <p className="text-sm font-bold text-primary">@infobank</p>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground border-t border-border/70 pt-3">
                    All authorized inquiries, verification documentation, and support tickets are coordinated via{" "}
                    <strong className="text-primary">usfinanceassistance@usfinancebank.online</strong> and hotline{" "}
                    <strong className="text-primary">+1-567-US</strong>.
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
                <h3 className="text-lg font-bold text-primary">Send an Inquiry to Official Support</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Direct support: <strong className="text-primary">usfinanceassistance@usfinancebank.online</strong> • Hotline: <strong className="text-primary">+1-567-US</strong>
                </p>

                {contactSuccess ? (
                  <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                    <h4 className="mt-3 text-base font-bold text-emerald-900">
                      Message Dispatched
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                      Thank you for contacting US Finance Bank. Your message has been routed to{" "}
                      <strong>usfinanceassistance@usfinancebank.online</strong> (Hotline: +1-567-US) with ticket #
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
                      {contactSending ? "Transmitting Inquiry..." : "Submit Inquiry"}
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
              <div className="mt-4 space-y-1.5 text-xs">
                <p className="text-white/90">
                  <span className="text-white/60">Email:</span>{" "}
                  <a href="mailto:usfinanceassistance@usfinancebank.online" className="text-accent font-bold hover:underline">
                    usfinanceassistance@usfinancebank.online
                  </a>
                </p>
                <p className="text-white/90">
                  <span className="text-white/60">Tel:</span>{" "}
                  <a href="tel:+1-567-US" className="text-accent font-bold hover:underline">
                    +1-567-US
                  </a>
                </p>
                <p className="text-white/70">
                  <span className="text-white/60">Handle:</span> <span className="text-accent font-bold">@infobank</span>
                </p>
              </div>
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
              Official US Finance Bank portal. Contact: usfinanceassistance@usfinancebank.online • Tel: +1-567-US • Handle: @infobank. Treat the listed countries
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

            <div className="mt-5 border-t border-border pt-4 flex flex-col gap-2 text-center text-xs text-muted-foreground">
              <div>
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

              {/* Staff Sign-In Admin Direct Link inside Sign In dialog */}
              <div className="pt-2 border-t border-dashed border-border/80">
                <button
                  type="button"
                  onClick={() => {
                    setCustomerModalOpen(false);
                    setAdminModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 hover:underline bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Staff Sign-In Admin Dashboard
                </button>
              </div>
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
                    setCustomerUser(appFullName.split(" ")[0] || "");
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
                  {statusSearchResult.date} • Need help? Contact{" "}
                  <a href="mailto:usfinanceassistance@usfinancebank.online" className="text-primary font-bold hover:underline">
                    usfinanceassistance@usfinancebank.online
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+1-567-US" className="text-primary font-bold hover:underline">
                    +1-567-US
                  </a>
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
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-7 text-white shadow-2xl">
            <button
              type="button"
              onClick={() => setAdminModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white sm:text-lg">Staff → Sign In Admin</h3>
                  <span className="rounded bg-red-600/30 border border-red-500/40 px-2 py-0.5 text-[0.68rem] font-bold text-red-300">
                    Staff Portal
                  </span>
                </div>
                <p className="text-xs text-white/60">Dedicated Administration Access • US Finance Bank</p>
              </div>
            </div>

            {/* SEPARATE ADMIN WEB LINK BOX (Distinct from public home page) */}
            <div className="mt-4 rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 text-xs text-white">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-red-200 flex items-center gap-1.5">
                  <Globe2 className="h-3.5 w-3.5 text-red-400" />
                  Separate Admin Web Link
                </span>
                <span className="text-[0.65rem] bg-red-500/20 text-red-200 px-2 py-0.5 rounded font-mono">
                  Distinct from Public Home Page
                </span>
              </div>
              <p className="text-[0.7rem] text-slate-300 mb-2.5">
                Bookmark or share this direct administrative web link to open the admin terminal directly:
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 overflow-hidden rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 font-mono text-[0.72rem] text-red-200 select-all truncate">
                  {adminDedicatedUrl}
                </div>
                <button
                  type="button"
                  onClick={handleCopyAdminLink}
                  className="flex items-center gap-1 rounded-lg bg-red-600 hover:bg-red-700 px-3 py-1.5 text-xs font-bold text-white transition-colors shrink-0 shadow-sm"
                  title="Copy Admin Link"
                >
                  {copiedAdminLink ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-300" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <ClipboardList className="h-3.5 w-3.5" />
                      Copy Link
                    </>
                  )}
                </button>
                <a
                  href={adminDedicatedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 rounded-lg border border-slate-600 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 text-xs font-bold text-white transition-colors shrink-0"
                  title="Open Admin Link in New Tab"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                  Open
                </a>
              </div>
            </div>

            {/* Clearly Labeled Admin Sign-In Option Banner */}
            <div className="mt-4 rounded-lg bg-white/5 border border-white/10 p-2.5 text-xs text-white/80 leading-relaxed flex items-center justify-between">
              <div>
                <span className="font-bold text-white">Admin Sign-In Option:</span>
                <span className="ml-1 text-white/60">Separate from public customer sign-in.</span>
              </div>
            </div>

            {/* Quick Auto-Fill Helper */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  setAdminUsername("admin");
                  setAdminPassword("admin");
                }}
                className="w-full rounded-md border border-red-500/40 bg-red-600/15 px-3 py-1.5 text-xs font-bold text-red-300 hover:bg-red-600/25 transition-colors"
              >
                ⚡ Quick Auto-Fill Admin Credentials (admin / admin)
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
                  Admin Identifier
                </label>
                <input
                  id="adm-id"
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="e.g. admin or admin@usfinancebank.com"
                  className="mt-1 w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 text-sm text-white placeholder-white/40 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="adm-pass" className="block text-xs font-bold text-white/90">
                  Admin Master Passphrase
                </label>
                <div className="relative mt-1">
                  <input
                    id="adm-pass"
                    type={showAdminPassword ? "text" : "password"}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter admin passphrase"
                    className="w-full rounded-md border border-white/20 bg-slate-800 px-3.5 py-2 pr-10 text-sm text-white placeholder-white/40 focus:border-red-500 focus:outline-none"
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
                className="w-full bg-red-600 hover:bg-red-700 font-bold text-white shadow-md shadow-red-600/20 py-2.5"
              >
                {adminAuthLoading ? "Authenticating Admin Authority..." : "Admin Sign In"}
              </Button>
            </form>

            <div className="mt-4 pt-3 border-t border-white/10 text-center text-[0.7rem] text-white/50">
              Only authorized staff credentials can access this administrative console.
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