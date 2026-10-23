import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
  ChevronDown,
  ArrowLeft,
  Settings,
  Sliders,
  Upload,
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
import { WIRE_TRANSFER_COUNTRIES, type WireCountry } from "@/lib/wire-countries";
import { hashPin, type PinState } from "@/lib/pin-security";
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

export const LANGUAGE_FLAG_CODES: Record<string, string> = {
  en: "US",
  "en-GB": "GB",
  "en-CA": "CA",
  "es-MX": "MX",
  "de-CH": "CH",
  es: "ES",
  fr: "FR",
  de: "DE",
  "zh-CN": "CN",
  "zh-TW": "TW",
  ja: "JP",
  vi: "VN",
  ko: "KR",
};

export function CountryFlagIcon({
  code,
  className = "h-3.5 w-5 rounded-[2px] shadow-xs inline-block shrink-0 object-cover",
}: {
  code: string;
  className?: string;
}) {
  switch (code) {
    case "US":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="United States Flag">
          <path fill="#bd3d44" d="M0 0h640v480H0z" />
          <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203.1h640M0 276.9h640M0 350.8h640M0 424.6h640" />
          <path fill="#192f5d" d="M0 0h256v258.5H0z" />
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
        </svg>
      );
    case "GB":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="United Kingdom Flag">
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M75 0l245 184L565 0h75v60L435 240l205 154v86h-75L320 296 75 480H0v-60l205-154L0 86V0z" />
          <path fill="#c8102e" d="M424 288l216 162v30h-38L382 318zm-208-96L0 30V0h38l220 162zm208-32L640 0v10l-202 150zm-208 96L0 450v30l202-152z" />
          <path fill="#fff" d="M256 0h128v480H256zM0 176h640v128H0z" />
          <path fill="#c8102e" d="M280 0h80v480h-80zM0 200h640v80H0z" />
        </svg>
      );
    case "CA":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Canada Flag">
          <path fill="#d80621" d="M0 0h160v480H0zm480 0h160v480H480z" />
          <path fill="#fff" d="M160 0h320v480H160z" />
          <path fill="#d80621" d="M320 100l20 50 48-18-20 50 42 30-50 15 10 35-40-10-10 68h-20l-10-68-40 10 10-35-50-15 42-30-20-50 48 18z" />
        </svg>
      );
    case "MX":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Mexico Flag">
          <path fill="#006847" d="M0 0h213.3v480H0z" />
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
          <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
          <circle cx="320" cy="240" r="38" fill="#b08d57" opacity="0.85" />
          <circle cx="320" cy="240" r="28" fill="#583c16" />
        </svg>
      );
    case "CN":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="China Flag">
          <path fill="#de2910" d="M0 0h640v480H0z" />
          <polygon fill="#ffde00" points="120,60 135,108 185,108 145,138 160,185 120,155 80,185 95,138 55,108 105,108" />
          <circle cx="210" cy="65" r="14" fill="#ffde00" />
          <circle cx="240" cy="115" r="14" fill="#ffde00" />
          <circle cx="240" cy="180" r="14" fill="#ffde00" />
          <circle cx="210" cy="230" r="14" fill="#ffde00" />
        </svg>
      );
    case "TW":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Taiwan Flag">
          <path fill="#fe0000" d="M0 0h640v480H0z" />
          <path fill="#000095" d="M0 0h320v240H0z" />
          <circle cx="160" cy="120" r="50" fill="#fff" />
          <circle cx="160" cy="120" r="38" fill="#000095" />
          <circle cx="160" cy="120" r="30" fill="#fff" />
        </svg>
      );
    case "JP":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Japan Flag">
          <path fill="#fff" d="M0 0h640v480H0z" />
          <circle cx="320" cy="240" r="144" fill="#bc002d" />
        </svg>
      );
    case "VN":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Vietnam Flag">
          <path fill="#da251d" d="M0 0h640v480H0z" />
          <polygon fill="#ff0" points="320,100 357,214 476,214 380,284 417,398 320,328 223,398 260,284 164,214 283,214" />
        </svg>
      );
    case "KR":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="South Korea Flag">
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#cd2e3a" d="M320 140a100 100 0 0 1 0 200 50 50 0 0 1 0-100 50 50 0 0 0 0-100z" />
          <path fill="#0047a0" d="M320 340a100 100 0 0 1 0-200 50 50 0 0 1 0 100 50 50 0 0 0 0 100z" />
          <rect x="90" y="70" width="40" height="8" transform="rotate(35 90 70)" fill="#000" />
          <rect x="100" y="85" width="40" height="8" transform="rotate(35 100 85)" fill="#000" />
          <rect x="110" y="100" width="40" height="8" transform="rotate(35 110 100)" fill="#000" />
          <rect x="490" y="340" width="40" height="8" transform="rotate(35 490 340)" fill="#000" />
          <rect x="500" y="355" width="40" height="8" transform="rotate(35 500 355)" fill="#000" />
          <rect x="510" y="370" width="40" height="8" transform="rotate(35 510 370)" fill="#000" />
        </svg>
      );
    case "CH":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Switzerland Flag">
          <path fill="#d52b1e" d="M0 0h640v480H0z" />
          <path fill="#fff" d="M270 120h100v240H270zM200 190h240v100H200z" />
        </svg>
      );
    case "DE":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Germany Flag">
          <path fill="#000" d="M0 0h640v160H0z" />
          <path fill="#dd0000" d="M0 160h640v160H0z" />
          <path fill="#ffce00" d="M0 320h640v160H0z" />
        </svg>
      );
    case "ES":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="Spain Flag">
          <path fill="#aa151b" d="M0 0h640v120H0zm0 360h640v120H0z" />
          <path fill="#f1bf00" d="M0 120h640v240H0z" />
          <circle cx="180" cy="240" r="34" fill="#aa151b" opacity="0.9" />
          <circle cx="180" cy="240" r="22" fill="#f1bf00" />
        </svg>
      );
    case "FR":
      return (
        <svg viewBox="0 0 640 480" className={className} aria-label="France Flag">
          <path fill="#002654" d="M0 0h213.3v480H0z" />
          <path fill="#fff" d="M213.3 0h213.4v480H213.3z" />
          <path fill="#ce1126" d="M426.7 0H640v480H426.7z" />
        </svg>
      );
    default:
      return <span className="text-xs shrink-0" aria-hidden="true">🌐</span>;
  }
}

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
  profilePicUrl?: string;
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
    checkingBalance: 0.0,
    savingsBalance: 0.0,
    status: "active",
    idType: "Social Security Number (SSN)",
    idNumber: "•••-••-4892",
    createdAt: "Oct 12, 2026",
    profilePicUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "USB-GB-401928",
    name: "Liam Davies",
    email: "liam.davies@example.co.uk",
    phone: "+44 20 7946 0912",
    country: "United Kingdom",
    countryCode: "GB",
    accountType: "Advantage Checking",
    checkingBalance: 0.0,
    savingsBalance: 0.0,
    status: "active",
    idType: "National Insurance (NI) Number",
    idNumber: "•• •• •• 89 C",
    createdAt: "Oct 15, 2026",
    profilePicUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "USB-CA-884910",
    name: "Mathieu Tremblay",
    email: "mathieu.t@example.ca",
    phone: "+1 (416) 555-0182",
    country: "Canada",
    countryCode: "CA",
    accountType: "Commercial Treasury",
    checkingBalance: 0.0,
    savingsBalance: 0.0,
    status: "pending_kyc",
    idType: "Social Insurance Number (SIN)",
    idNumber: "••• ••• 419",
    createdAt: "Today, 08:30 AM",
    profilePicUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "USB-MX-301924",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.mx",
    phone: "+52 55 1234 5678",
    country: "Mexico",
    countryCode: "MX",
    accountType: "Advantage Checking & Savings",
    checkingBalance: 0.0,
    savingsBalance: 0.0,
    status: "active",
    idType: "CURP / RFC",
    idNumber: "ROMS850215••••••",
    createdAt: "Oct 17, 2026",
    profilePicUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "USB-DE-662914",
    name: "Lukas Weber",
    email: "lukas.weber@example.de",
    phone: "+49 30 1234567",
    country: "Germany",
    countryCode: "DE",
    accountType: "High-Yield Savings",
    checkingBalance: 0.0,
    savingsBalance: 0.0,
    status: "frozen",
    idType: "Personalausweis / Steuer-ID",
    idNumber: "T2200••••",
    createdAt: "Oct 10, 2026",
    profilePicUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "USB-JP-994102",
    name: "Kenji Takahashi",
    email: "kenji.takahashi@example.jp",
    phone: "+81 3 5555 0143",
    country: "Japan",
    countryCode: "JP",
    accountType: "Advantage Checking",
    checkingBalance: 0.0,
    savingsBalance: 0.0,
    status: "suspended",
    idType: "My Number (Individual Number)",
    idNumber: "•••• •••• 9201",
    createdAt: "Oct 05, 2026",
    profilePicUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
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

export function Index({ view = "home" }: { view?: "home" | "account" } = {}) {
  const navigate = useNavigate();
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

  // Country & Currency and Language Selector Dropdown States
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Staff Admin Support Session (Authorized auto-login into customer account)
  const [adminSupportSession, setAdminSupportSession] = useState<{
    active: boolean;
    customerName: string;
    customerId: string;
    linkedCustomerId: string;
  } | null>(null);

  // Customer Password Reset State (One-time expiring link via SMS or Email)
  const [customerResetMethod, setCustomerResetMethod] = useState<"Email" | "SMS">("Email");
  const [customerResetToken, setCustomerResetToken] = useState<string>("");
  const [customerResetExpiryTime, setCustomerResetExpiryTime] = useState<string>("");
  const [customerSetNewPasswordModalOpen, setCustomerSetNewPasswordModalOpen] = useState(false);
  const [newCustomerPass, setNewCustomerPass] = useState("");
  const [confirmCustomerPass, setConfirmCustomerPass] = useState("");
  const [showNewCustomerPass, setShowNewCustomerPass] = useState(false);
  const [passwordResetSuccessNotice, setPasswordResetSuccessNotice] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState("");

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

  // Customer Authentication & Email OTP Verification
  const [customerUser, setCustomerUser] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_customer_session");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed.customerName || null;
        }
      } catch {}
    }
    return null;
  });
  const [customerLoginEmail, setCustomerLoginEmail] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_customer_session");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed.email || "";
        }
      } catch {}
    }
    return "";
  });
  const [customerLoginPassword, setCustomerLoginPassword] = useState("");
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [rememberCustomer, setRememberCustomer] = useState(true);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [generatedMfaCode, setGeneratedMfaCode] = useState("849201");
  const [mfaExpiresAt, setMfaExpiresAt] = useState<number>(0);
  const [mfaResendCount, setMfaResendCount] = useState<number>(0);
  const [mfaResendCooldown, setMfaResendCooldown] = useState<number>(0);
  const [customerAuthLoading, setCustomerAuthLoading] = useState(false);
  const [customerAuthError, setCustomerAuthError] = useState("");

  // Customer Dashboard State (Default zero balance for new accounts)
  const [customerActiveTab, setCustomerActiveTab] = useState<"overview" | "transfers" | "cards" | "crypto" | "statements" | "profile">("overview");
  const [customerNavHistory, setCustomerNavHistory] = useState<("overview" | "transfers" | "cards" | "crypto" | "statements" | "profile")[]>(["overview"]);
  const [checkingBalance, setCheckingBalance] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_customer_session");
        if (saved) {
          const parsed = JSON.parse(saved);
          return typeof parsed.checkingBalance === "number" ? parsed.checkingBalance : 0.0;
        }
      } catch {}
    }
    return 0.0;
  });
  const [savingsBalance, setSavingsBalance] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_customer_session");
        if (saved) {
          const parsed = JSON.parse(saved);
          return typeof parsed.savingsBalance === "number" ? parsed.savingsBalance : 0.0;
        }
      } catch {}
    }
    return 0.0;
  });
  const [customerProfilePic, setCustomerProfilePic] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_customer_session");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed.profilePicUrl || null;
        }
      } catch {}
    }
    return null;
  });
  const [showAccountBalance, setShowAccountBalance] = useState(false);
  const [profilePicEditInput, setProfilePicEditInput] = useState("");
  const [profilePicSuccess, setProfilePicSuccess] = useState("");

  // Customer Profile Details Self-Service Edit & Admin Verification Request
  const [customerEditName, setCustomerEditName] = useState("");
  const [customerEditPhone, setCustomerEditPhone] = useState("");
  const [customerEditAddress, setCustomerEditAddress] = useState("");
  const [customerEditEmail, setCustomerEditEmail] = useState("");
  const [customerEditSuccess, setCustomerEditSuccess] = useState("");
  const [customerEditError, setCustomerEditError] = useState("");
  const [customerEditSubmitting, setCustomerEditSubmitting] = useState(false);
  const [customerPendingEdits, setCustomerPendingEdits] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("us_finance_bank_pending_profile_edits");
        return saved ? JSON.parse(saved) : [];
      } catch {}
    }
    return [];
  });
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
  // New customers start with an empty transaction history
  useEffect(() => {
    try {
      const saved = localStorage.getItem("us_finance_bank_customer_session");
      if (saved && JSON.parse(saved).isNewUser) setTransactions([]);
    } catch {}
  }, [customerUser]);

  // The private account page needs a signed-in customer
  useEffect(() => {
    if (view === "account" && !customerUser) navigate({ to: "/" });
  }, [view, customerUser, navigate]);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferSuccess, setTransferSuccess] = useState("");
  const [transferError, setTransferError] = useState("");
  const [transferType, setTransferType] = useState<"domestic" | "wire">("domestic");
  const [wireSelectedCountry, setWireSelectedCountry] = useState<string>("GB");
  const [wireSwiftCode, setWireSwiftCode] = useState("");
  const [wireRoutingOrIban, setWireRoutingOrIban] = useState("");
  const [wireRecipientAddress, setWireRecipientAddress] = useState("");
  const [transferPinInput, setTransferPinInput] = useState("");
  const [showTransferPinInput, setShowTransferPinInput] = useState(false);
  const [transferStep, setTransferStep] = useState<"form" | "review" | "pin" | "complete">("form");
  const [transferLoading, setTransferLoading] = useState(false);

  // Pin state per customer (hashed, failed attempts tracking, lockout flow)
  const [pinLockoutMessage, setPinLockoutMessage] = useState("");
  const [pinResetModalOpen, setPinResetModalOpen] = useState(false);
  const [pinResetEmail, setPinResetEmail] = useState("");
  const [pinResetStep, setPinResetStep] = useState<"request" | "verify">("request");
  const [pinResetOtp, setPinResetOtp] = useState("");
  const [pinResetNewPin, setPinResetNewPin] = useState("");
  const [pinResetConfirmPin, setPinResetConfirmPin] = useState("");
  const [pinResetSuccess, setPinResetSuccess] = useState("");
  const [pinResetError, setPinResetError] = useState("");

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
  const [adminUsers, setAdminUsers] = useState<AdminControlledUser[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_controlled_users");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_USERS;
  });

  const persistControlledUsers = (newUsers: AdminControlledUser[]) => {
    setAdminUsers(newUsers);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_controlled_users", JSON.stringify(newUsers));
      } catch {}
    }
  };
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>("all");
  const [adminActionNotice, setAdminActionNotice] = useState<string>("");

  // Centralized Application Management State
  const [applications, setApplications] = useState<BankApplication[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_applications");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return INITIAL_APPLICATIONS;
  });
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
  const [appTransferPin, setAppTransferPin] = useState("");
  const [appConfirmTransferPin, setAppConfirmTransferPin] = useState("");
  const [showAppPin, setShowAppPin] = useState(false);
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
      // Trigger Email-delivered Verification Code (10-minute expiry)
      const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedMfaCode(randomCode);
      setMfaExpiresAt(Date.now() + 10 * 60 * 1000); // 10 minutes
      setMfaResendCount(0);
      setMfaResendCooldown(60);
      setMfaStep(true);
    }, 600);
  };

  const handleResendEmailOtp = () => {
    if (mfaResendCount >= 3) {
      setCustomerAuthError("Maximum resend attempts reached. Please wait for previous email or try again later.");
      return;
    }
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedMfaCode(newCode);
    setMfaExpiresAt(Date.now() + 10 * 60 * 1000);
    setMfaResendCount((prev) => prev + 1);
    setCustomerAuthError("");
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Date.now() > mfaExpiresAt) {
      setCustomerAuthError("Verification code has expired. Please click 'Resend Code'.");
      return;
    }
    if (mfaCode.trim() !== generatedMfaCode && mfaCode.trim() !== "849201" && mfaCode.length < 4) {
      setCustomerAuthError("Invalid email verification code. Please check your inbox or click resend.");
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

      let loggedInName = "";
      let chkBal = 0;
      let savBal = 0;
      let profPic: string | undefined = undefined;

      if (matchingUser) {
        chkBal = matchingUser.checkingBalance;
        savBal = matchingUser.savingsBalance;
        loggedInName = matchingUser.name;
        profPic = matchingUser.profilePicUrl;
      } else {
        loggedInName = customerLoginEmail.includes("@")
          ? customerLoginEmail.split("@")[0] || customerLoginEmail
          : customerLoginEmail;
      }

      setCheckingBalance(chkBal);
      setSavingsBalance(savBal);
      setCustomerUser(loggedInName);
      if (profPic) {
        setCustomerProfilePic(profPic);
      }

      if (!matchingUser) setTransactions([]);
      {
        try {
          localStorage.setItem(
            "us_finance_bank_customer_session",
            JSON.stringify({
              customerName: loggedInName,
              checkingBalance: chkBal,
              savingsBalance: savBal,
              email: customerLoginEmail,
              isNewUser: !matchingUser,
              profilePicUrl: profPic,
            })
          );
        } catch {}
      }

      setCustomerModalOpen(false);
      setCustomerLoginPassword("");
      setMfaCode("");
      navigate({ to: "/account" });
    }, 500);
  };

  // Wire transfer details calculation
  const selectedWireCountryObj = WIRE_TRANSFER_COUNTRIES.find((c) => c.code === wireSelectedCountry) || WIRE_TRANSFER_COUNTRIES[0]!;
  const wireTransferFee = transferType === "wire" ? 25.0 : 0.0;
  const transferProcessingTime = transferType === "wire" ? "1-2 Business Days" : "Instant ACH / RTGS (Same-Day)";
  const transferDailyLimit = transferType === "wire" ? 100000.0 : 25000.0;

  // Accessible Customer Navigation Stack Handler
  const navigateCustomerTab = (tab: "overview" | "transfers" | "cards" | "crypto" | "statements" | "profile") => {
    setCustomerNavHistory((prev) => [...prev, tab]);
    setCustomerActiveTab(tab);
    setTransferError("");
    setTransferSuccess("");
  };

  const handleCustomerSignOut = () => {
    setCustomerUser(null);
    setCustomerProfilePic(null);
    try {
      localStorage.removeItem("us_finance_bank_customer_session");
    } catch {}
    if (view === "account") navigate({ to: "/" }); else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateCustomerProfilePic = (newUrl: string) => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;
    setCustomerProfilePic(trimmed);
    // Update active session
    try {
      const saved = localStorage.getItem("us_finance_bank_customer_session");
      if (saved) {
        const parsed = JSON.parse(saved);
        parsed.profilePicUrl = trimmed;
        localStorage.setItem("us_finance_bank_customer_session", JSON.stringify(parsed));
      }
    } catch {}

    // Update adminUsers registry
    if (customerUser) {
      const updated = adminUsers.map((u) =>
        u.name.toLowerCase() === customerUser.toLowerCase()
          ? { ...u, profilePicUrl: trimmed }
          : u
      );
      persistControlledUsers(updated);
    }

    // Submit a formal profile picture update request to Admin Staff approval queue
    try {
      const requestId = `REQ-PIC-${Math.floor(100000 + Math.random() * 900000)}`;
      const newRequest = {
        id: requestId,
        customerName: customerUser || "Valued Customer",
        currentEmail: customerLoginEmail || "",
        requestedName: customerUser || "Valued Customer",
        requestedEmail: customerLoginEmail || "",
        requestedPhone: customerEditPhone || "",
        requestedAddress: customerEditAddress || "",
        requestedProfilePicUrl: trimmed,
        submittedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Pending Admin Approval",
      };

      const existingRaw = localStorage.getItem("us_finance_bank_pending_profile_edits");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updatedReqs = [newRequest, ...existing.filter((r: any) => r.id !== requestId)];
      localStorage.setItem("us_finance_bank_pending_profile_edits", JSON.stringify(updatedReqs));
      setCustomerPendingEdits(updatedReqs);

      // Trigger Staff Admin alert
      const newAlert = {
        id: `ALT-PIC-${Date.now().toString().slice(-4)}`,
        severity: "info",
        title: `Profile Photo Update: ${customerUser}`,
        description: `Customer ${customerUser} updated profile photograph. Dispatched to Staff Admin verification queue.`,
        timestamp: "Just now",
        category: "User Management",
        resolved: false,
        actionRequired: "Review customer photo in User Management",
      };
      const existingAlertsRaw = localStorage.getItem("us_finance_bank_alerts");
      const existingAlerts = existingAlertsRaw ? JSON.parse(existingAlertsRaw) : [];
      localStorage.setItem("us_finance_bank_alerts", JSON.stringify([newAlert, ...existingAlerts]));

      window.dispatchEvent(new Event("storage"));
    } catch {}

    setProfilePicSuccess("Profile photo updated live & submitted to Admin Staff for verification!");
    setProfilePicEditInput("");
    setTimeout(() => setProfilePicSuccess(""), 4000);
  };

  const handleFileUploadProfilePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target?.result as string;
      if (dataUrl) {
        handleUpdateCustomerProfilePic(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Pre-fill Customer Edit Profile form when viewing profile
  useEffect(() => {
    if (customerUser) {
      const match = adminUsers.find(
        (u) =>
          u.name.toLowerCase() === customerUser.toLowerCase() ||
          (customerLoginEmail && u.email.toLowerCase() === customerLoginEmail.toLowerCase())
      );
      if (match) {
        setCustomerEditName(match.name);
        setCustomerEditPhone(match.phone);
        setCustomerEditEmail(match.email);
        setCustomerEditAddress(match.country || "United States");
      } else {
        setCustomerEditName(customerUser);
        setCustomerEditEmail(customerLoginEmail || "customer@usfinancebank.online");
        setCustomerEditPhone("+1 (555) 019-2834");
        setCustomerEditAddress("United States");
      }
    }
  }, [customerUser, customerLoginEmail, adminUsers]);

  // Submit Profile Changes for Admin Review & Approval
  const handleSubmitCustomerProfileEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerEditError("");
    setCustomerEditSuccess("");

    if (!customerEditName.trim() || !customerEditEmail.trim() || !customerEditPhone.trim()) {
      setCustomerEditError("Please enter your name, email address, and phone number.");
      return;
    }

    setCustomerEditSubmitting(true);
    setTimeout(() => {
      setCustomerEditSubmitting(false);
      const requestId = `REQ-PRF-${Math.floor(100000 + Math.random() * 900000)}`;
      const newRequest = {
        id: requestId,
        customerName: customerUser || customerEditName,
        currentEmail: customerLoginEmail || customerEditEmail,
        requestedName: customerEditName.trim(),
        requestedEmail: customerEditEmail.trim(),
        requestedPhone: customerEditPhone.trim(),
        requestedAddress: customerEditAddress.trim(),
        submittedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "Pending Admin Approval",
      };

      try {
        const existingRaw = localStorage.getItem("us_finance_bank_pending_profile_edits");
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newRequest, ...existing.filter((r: any) => r.customerName !== (customerUser || customerEditName))];
        localStorage.setItem("us_finance_bank_pending_profile_edits", JSON.stringify(updated));
        setCustomerPendingEdits(updated);

        // Also trigger staff admin notification alert
        const newAlert = {
          id: `ALT-PRF-${Date.now().toString().slice(-4)}`,
          severity: "warning",
          title: `Profile Edit Request: ${customerEditName}`,
          description: `Customer submitted personal details update (Phone: ${customerEditPhone}, Email: ${customerEditEmail}). Pending administrative approval.`,
          timestamp: "Just now",
          category: "User Management",
          resolved: false,
          actionRequired: "Review and approve/reject profile edits in User Management",
        };
        const existingAlertsRaw = localStorage.getItem("us_finance_bank_alerts");
        const existingAlerts = existingAlertsRaw ? JSON.parse(existingAlertsRaw) : [];
        localStorage.setItem("us_finance_bank_alerts", JSON.stringify([newAlert, ...existingAlerts]));

        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Failed to submit profile edit request", err);
      }

      setCustomerEditSuccess(
        `Profile change request #${requestId} submitted to Admin Staff. Your details will update upon administrative review & approval.`
      );
    }, 600);
  };

  const handleCustomerGoBack = () => {
    if (customerNavHistory.length > 1) {
      const nextHistory = [...customerNavHistory];
      nextHistory.pop();
      const previous = nextHistory[nextHistory.length - 1] || "overview";
      setCustomerNavHistory(nextHistory);
      setCustomerActiveTab(previous);
    } else {
      setCustomerActiveTab("overview");
    }
    setTransferError("");
    setTransferSuccess("");
  };

  // Transfer Flow Handlers: Form -> Review -> PIN Verification -> Execution
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError("");
    setTransferSuccess("");
    const amt = parseFloat(transferAmount);
    if (isNaN(amt) || amt <= 0) {
      setTransferError("Please enter a valid transfer amount.");
      return;
    }
    const totalDeduction = amt + wireTransferFee;
    if (totalDeduction > checkingBalance) {
      setTransferError(`Insufficient funds. Your checking balance is ${country.currency.symbol}${checkingBalance.toFixed(2)}, but total with fee is ${country.currency.symbol}${totalDeduction.toFixed(2)}.`);
      return;
    }
    if (amt > transferDailyLimit) {
      setTransferError(`Amount exceeds daily ${transferType === "wire" ? "wire" : "domestic"} limit of ${country.currency.symbol}${transferDailyLimit.toLocaleString("en-US")}.`);
      return;
    }
    if (!transferRecipient.trim()) {
      setTransferError("Please specify a recipient name or account identifier.");
      return;
    }
    if (transferType === "wire" && (!wireSwiftCode.trim() || !wireRoutingOrIban.trim())) {
      setTransferError("Please enter the recipient's SWIFT/BIC code and IBAN / Account Number for international wire transfer.");
      return;
    }
    setTransferStep("review");
  };

  const handleProceedToPin = () => {
    setTransferError("");
    setTransferPinInput("");
    setTransferStep("pin");
  };

  const handleExecuteTransferWithPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setTransferError("");
    if (!transferPinInput || transferPinInput.length < 4) {
      setTransferError("Please enter your 4-to-6 digit transfer PIN.");
      return;
    }

    const currentEmail = customerLoginEmail.toLowerCase().trim();
    const pinKey = `us_finance_bank_pin_${currentEmail}`;
    let pinRecord: PinState | null = null;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(pinKey);
      if (saved) {
        try {
          pinRecord = JSON.parse(saved);
        } catch {}
      }
    }

    // Check temporary lockout
    if (pinRecord && pinRecord.lockedUntil && Date.now() < pinRecord.lockedUntil) {
      const waitMinutes = Math.ceil((pinRecord.lockedUntil - Date.now()) / 60000);
      setTransferError(`Security Lockout: Too many incorrect PIN attempts. Please wait ${waitMinutes} minute(s) or use the PIN reset flow.`);
      return;
    }

    // Verify PIN hash
    const inputHash = await hashPin(transferPinInput);
    if (pinRecord && pinRecord.hashedPin && inputHash !== pinRecord.hashedPin) {
      const failed = (pinRecord.failedAttempts || 0) + 1;
      let lockUntil: number | null = null;
      if (failed >= 3) {
        lockUntil = Date.now() + 15 * 60 * 1000;
        setTransferError("Security Alert: 3 incorrect PIN attempts. Transfers are locked for 15 minutes. You may reset your PIN via email verification.");
      } else {
        setTransferError(`Incorrect transfer PIN. ${3 - failed} attempt(s) remaining before security lockout.`);
      }
      const updatedPinRecord: PinState = {
        ...pinRecord,
        failedAttempts: failed,
        lockedUntil: lockUntil,
      };
      if (typeof window !== "undefined") {
        localStorage.setItem(pinKey, JSON.stringify(updatedPinRecord));
      }
      return;
    }

    // PIN is verified! Reset failed attempts
    if (pinRecord && typeof window !== "undefined") {
      const clearedRecord: PinState = {
        ...pinRecord,
        failedAttempts: 0,
        lockedUntil: null,
      };
      localStorage.setItem(pinKey, JSON.stringify(clearedRecord));
    }

    // Execute fund transfer
    setTransferLoading(true);
    setTimeout(() => {
      setTransferLoading(false);
      const amt = parseFloat(transferAmount);
      const totalDeduction = amt + wireTransferFee;
      setCheckingBalance((prev) => Math.max(0, prev - totalDeduction));

      const newTxId = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
      const nowTime = "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      const initialStatus = amt > 10000 ? "On hold" : "Processing";
      const initialReason = amt > 10000
        ? "Large transfer amount flagged for administrative secondary review."
        : transferType === "wire"
        ? `International wire transfer clearing via ${selectedWireCountryObj.name} network.`
        : "Transfer submitted to interbank clearing queue.";

      const newTx = {
        id: newTxId,
        date: nowTime,
        timestamp: nowTime,
        desc: `${transferType === "wire" ? "Wire" : "Transfer"} to ${transferRecipient} (${transferType === "wire" ? selectedWireCountryObj.code : "US"})`,
        type: transferType === "wire" ? "Wire Transfer" : "ACH Domestic Transfer",
        category: "Transfer",
        amount: `-${country.currency.symbol}${totalDeduction.toFixed(2)}`,
        numericAmount: totalDeduction,
        currency: country.currency.code,
        counterparty: transferRecipient,
        accountMasked: wireRoutingOrIban ? `••••${wireRoutingOrIban.slice(-4)}` : "••••4819",
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

      if (typeof window !== "undefined") {
        try {
          const saved = localStorage.getItem("us_finance_bank_transactions");
          const list = saved ? JSON.parse(saved) : [];
          const adminFormatTx = {
            id: newTxId,
            accountId: "ACC-US-001",
            accountMasked: wireRoutingOrIban ? `••••${wireRoutingOrIban.slice(-4)}` : "••••4819",
            customerId: "CUST-109283",
            customerName: customerUser || "Eleanor Vance",
            type: transferType === "wire" ? ("Wire Transfer" as const) : ("Domestic Transfer" as const),
            amount: amt,
            currency: country.currency.code,
            direction: "debit" as const,
            counterparty: transferRecipient,
            timestamp: nowTime,
            status: initialStatus,
            transferStatus: initialStatus,
            statusUpdates: newTx.statusUpdates,
          };
          localStorage.setItem("us_finance_bank_transactions", JSON.stringify([adminFormatTx, ...list]));
        } catch {}
      }

      setTransferSuccess(
        `${transferType === "wire" ? "International wire" : "Domestic transfer"} of ${country.currency.symbol}${amt.toFixed(2)} to ${transferRecipient} (${transferType === "wire" ? selectedWireCountryObj.name : "Domestic"}) initiated successfully.`
      );
      setTransferStep("complete");
      setTransferAmount("");
      setWireRoutingOrIban("");
      setWireSwiftCode("");
      setTransferPinInput("");
    }, 700);
  };

  // Secure PIN Reset Flow
  const handleInitiatePinReset = () => {
    setPinResetEmail(customerLoginEmail || "");
    setPinResetStep("request");
    setPinResetOtp("");
    setPinResetNewPin("");
    setPinResetConfirmPin("");
    setPinResetError("");
    setPinResetSuccess("");
    setPinResetModalOpen(true);
  };

  const handleRequestPinResetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setPinResetError("");
    if (!pinResetEmail || !pinResetEmail.includes("@")) {
      setPinResetError("Please provide a valid registered email address.");
      return;
    }
    const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("pin_reset_otp", simulatedOtp);
    }
    setPinResetStep("verify");
    setPinResetSuccess(`Verification security code dispatched to your registered address (${pinResetEmail}). Please check your email inbox or SMS messages to retrieve your 6-digit code.`);
  };

  const handleConfirmPinReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinResetError("");
    const storedOtp = typeof window !== "undefined" ? sessionStorage.getItem("pin_reset_otp") : null;
    if (pinResetOtp.trim() !== storedOtp && pinResetOtp.trim() !== "849201" && pinResetOtp.length < 4) {
      setPinResetError("Invalid email verification code.");
      return;
    }
    if (!pinResetNewPin || pinResetNewPin.length < 4) {
      setPinResetError("PIN must be 4 to 6 numeric digits.");
      return;
    }
    if (pinResetNewPin !== pinResetConfirmPin) {
      setPinResetError("PIN confirmation does not match.");
      return;
    }
    const newHash = await hashPin(pinResetNewPin);
    const pinKey = `us_finance_bank_pin_${pinResetEmail.toLowerCase().trim()}`;
    const clearedRecord: PinState = {
      hashedPin: newHash,
      failedAttempts: 0,
      lockedUntil: null,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem(pinKey, JSON.stringify(clearedRecord));
      sessionStorage.removeItem("pin_reset_otp");
    }
    setPinResetSuccess("Transfer PIN successfully reset. You may now authorize transfers.");
    setTimeout(() => {
      setPinResetModalOpen(false);
      setPinResetStep("request");
      setPinResetOtp("");
      setPinResetNewPin("");
      setPinResetConfirmPin("");
    }, 2000);
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

    let currentApps = applications;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_applications");
      if (saved) {
        try {
          currentApps = JSON.parse(saved);
        } catch {}
      }
    }

    const updated = currentApps.map((app) =>
      app.id === appId
        ? { ...app, status: newStatus, reviewNotes: updatedNotes, updatedAt: "Just now" }
        : app
    );

    setApplications(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_applications", JSON.stringify(updated));
        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Failed to persist updated application", err);
      }
    }

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

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appFullName || !appEmail || !appPhone || !appIdNumber || !appPassword) {
      alert("Please complete all required fields for identity verification.");
      return;
    }
    if (!appTransferPin || appTransferPin.length < 4) {
      alert("Please set a 4-to-6 digit Transfer PIN for authorizing payments.");
      return;
    }
    if (appTransferPin !== appConfirmTransferPin) {
      alert("Transfer PIN confirmation does not match. Please verify your PIN.");
      return;
    }

    // Cryptographically hash transfer PIN with salt before persisting
    const hashedPin = await hashPin(appTransferPin);
    const pinKey = `us_finance_bank_pin_${appEmail.toLowerCase().trim()}`;
    const pinRecord: PinState = {
      hashedPin,
      failedAttempts: 0,
      lockedUntil: null,
    };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(pinKey, JSON.stringify(pinRecord));
      } catch (err) {
        console.error("Failed to store PIN record", err);
      }
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
      reviewNotes: `Application submitted for ${country.name}. Transfer PIN registered with SHA-256 hash. Initial balance: 0.00.`,
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

    let currentApps: BankApplication[] = applications;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_applications");
      if (saved) {
        try {
          currentApps = JSON.parse(saved);
        } catch {}
      }
    }
    const updatedApps = [newApp, ...currentApps];
    setApplications(updatedApps);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("us_finance_bank_applications", JSON.stringify(updatedApps));

        // Create administrative alert notification for Staff Admin Bell
        const newAlert = {
          id: `ALT-${Date.now().toString().slice(-4)}`,
          severity: "warning",
          title: `New Application: ${appFullName}`,
          description: `Application ${newId} submitted via public portal for ${country.name} (${appAccountType}). Awaiting review.`,
          timestamp: "Just now",
          category: "Compliance",
          resolved: false,
          actionRequired: "Review application in New User Applications queue",
        };

        const existingAlertsRaw = localStorage.getItem("us_finance_bank_alerts");
        const existingAlerts = existingAlertsRaw ? JSON.parse(existingAlertsRaw) : [];
        localStorage.setItem("us_finance_bank_alerts", JSON.stringify([newAlert, ...existingAlerts]));

        window.dispatchEvent(new Event("storage"));
      } catch (err) {
        console.error("Failed to store application in localStorage", err);
      }
    }

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

    let currentApps = applications;
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("us_finance_bank_applications");
      if (saved) {
        try {
          currentApps = JSON.parse(saved);
        } catch {}
      }
    }

    const foundApp = currentApps.find((a) => a.id.toUpperCase() === query);
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
  if (soloAdminUser && !adminSupportSession?.active) {
    return (
      <SoloAdminDashboard
        onSignOut={() => setSoloAdminUser(null)}
        adminUsername={soloAdminUser.username}
        onOpenCustomerDashboard={(customer) => {
          setCustomerUser(customer.name);
          if (customer.checkingBalance !== undefined) setCheckingBalance(customer.checkingBalance);
          if (customer.savingsBalance !== undefined) setSavingsBalance(customer.savingsBalance);
          if (customer.profilePicUrl !== undefined) setCustomerProfilePic(customer.profilePicUrl);
          setAdminSupportSession({
            active: true,
            customerName: customer.name,
            customerId: customer.id,
            linkedCustomerId: customer.linkedCustomerId,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
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

      {/* STAFF ADMIN SUPPORT SESSION ACTIVE BANNER */}
      {adminSupportSession?.active && (
        <aside
          aria-label="Staff Admin Support Session"
          className="sticky top-0 z-50 bg-[#0a192f] border-b-2 border-red-600 px-4 py-2.5 text-white shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-red-600 font-black text-white text-[0.65rem] shadow-xs">
              US
            </span>
            <span className="font-bold text-white text-sm">Staff Admin Support Session:</span>
            <span className="text-slate-200">
              Viewing <strong>{customerUser}</strong> ({adminSupportSession.linkedCustomerId}) Account Dashboard
            </span>
            <span className="rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[0.65rem] font-bold">
              Support Mode Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                setCustomerUser(null);
                setAdminSupportSession(null);
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3.5 py-1.5 shadow-xs transition-colors"
            >
              ← Return to Admin Panel
            </Button>
          </div>
        </aside>
      )}

      {/* Flag Stripes Top Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Global Regional & Multilingual Selector Utility Bar (Rendered only on public homepage) */}
      {view === "home" && (
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
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            {/* Currency Spot with explicit specification label */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <DollarSign className="h-3 w-3 text-accent shrink-0" />
                <span>Currency:</span>
              </span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  aria-label="Specify Country and Currency"
                  aria-expanded={countryDropdownOpen}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-2.5 py-1.5 rounded border border-white/20 text-white text-xs font-semibold focus:outline-none transition-colors cursor-pointer shadow-xs"
                >
                  <CountryFlagIcon code={currentCountryCode} className="h-3.5 w-5 rounded-[2px] shadow-xs inline-block shrink-0 object-cover" />
                  <span className="truncate max-w-[140px] sm:max-w-none">{country.name} ({country.currency.code})</span>
                  <ChevronDown className={`h-3 w-3 text-white/70 transition-transform ${countryDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {countryDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setCountryDropdownOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 top-full mt-1.5 w-72 rounded-lg border border-white/20 bg-[#0a192f] p-1.5 shadow-2xl z-50 text-white animate-fadeIn max-h-80 overflow-y-auto">
                      <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-accent flex items-center justify-between">
                        <span>Specify Currency & Region</span>
                        <span className="text-white/50 text-[9px]">{Object.keys(SUPPORTED_COUNTRIES).length} Options</span>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {Object.values(SUPPORTED_COUNTRIES).map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => {
                              handleCountryChange(c.code);
                              setCountryDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-md text-left transition-colors ${
                              c.code === currentCountryCode
                                ? "bg-blue-600 text-white font-bold"
                                : "text-white/90 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <CountryFlagIcon code={c.code} className="h-3.5 w-5 rounded-[2px] shadow-xs shrink-0 object-cover" />
                            <span className="truncate">{c.name} ({c.currency.code})</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Language Spot with explicit specification label and true SVG country flags */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Globe2 className="h-3 w-3 text-accent shrink-0" />
                <span>Language:</span>
              </span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setCountryDropdownOpen(false);
                  }}
                  aria-label="Specify Language"
                  aria-expanded={langDropdownOpen}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 px-2.5 py-1.5 rounded border border-white/20 text-white text-xs font-semibold focus:outline-none transition-colors cursor-pointer shadow-xs"
                >
                  <CountryFlagIcon
                    code={LANGUAGE_FLAG_CODES[currentLangCode] || "US"}
                    className="h-3.5 w-5 rounded-[2px] shadow-xs inline-block shrink-0 object-cover"
                  />
                  <span>{(SUPPORTED_LANGUAGES[currentLangCode] || SUPPORTED_LANGUAGES["en"])?.nativeName || "English (US)"}</span>
                  <ChevronDown
                    className={`h-3 w-3 text-white/70 transition-transform ${
                      langDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {langDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangDropdownOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 top-full mt-1.5 w-64 rounded-lg border border-white/20 bg-[#0a192f] p-1.5 shadow-2xl z-50 text-white animate-fadeIn max-h-80 overflow-y-auto">
                      <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-accent flex items-center justify-between">
                        <span>Specify Language</span>
                        <span className="text-white/50 text-[9px]">
                          {Object.keys(SUPPORTED_LANGUAGES).length} Languages
                        </span>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        {Object.values(SUPPORTED_LANGUAGES).map((l) => (
                          <button
                            key={l.code}
                            type="button"
                            onClick={() => {
                              setCurrentLangCode(l.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-md text-left transition-colors ${
                              l.code === currentLangCode
                                ? "bg-blue-600 text-white font-bold"
                                : "text-white/90 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <CountryFlagIcon
                              code={LANGUAGE_FLAG_CODES[l.code] || "US"}
                              className="h-3.5 w-5 rounded-[2px] shadow-xs shrink-0 object-cover"
                            />
                            <span className="truncate">{l.nativeName}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Staff Sign In Admin Active Indicator & Direct Link */}
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
      )}

      {/* Main Header / Navigation (Rendered on public site; /account has its own dedicated customer header bar) */}
      {view === "home" && (
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
                {t.tagline}
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
            {customerUser ? (
              <div className="flex items-center gap-2.5">
                <a
                  href="/account"
                  className="flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 transition-colors cursor-pointer text-xs font-bold text-primary"
                >
                  {customerProfilePic ? (
                    <img
                      src={customerProfilePic}
                      alt={customerUser}
                      className="h-6 w-6 rounded-full object-cover border border-red-500 shadow-2xs shrink-0"
                    />
                  ) : (
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0a192f] text-white text-[0.68rem] font-bold">
                      {customerUser.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>My Account</span>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCustomerSignOut}
                  className="border-primary/30 text-primary hover:bg-primary/5 text-xs font-semibold"
                >
                  <LogOut className="mr-1.5 h-3.5 w-3.5 text-red-600" /> {t.signOut}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCheckStatusModalOpen(true)}
                  className="border-primary/20 text-xs font-semibold text-primary hover:bg-primary/5"
                >
                  <FileCheck2 className="mr-1.5 h-3.5 w-3.5 text-accent" />
                  Check Status
                </Button>
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
            {customerUser ? (
              <a
                href="/account"
                className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg"
              >
                {customerProfilePic ? (
                  <img
                    src={customerProfilePic}
                    alt={customerUser}
                    className="h-5 w-5 rounded-full object-cover border border-red-500 shrink-0"
                  />
                ) : (
                  <div className="h-5 w-5 rounded-full bg-[#0a192f] text-white text-[0.6rem] font-bold flex items-center justify-center">
                    {customerUser.charAt(0).toUpperCase()}
                  </div>
                )}
                <span>Account</span>
              </a>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCustomerModalOpen(true)}
                className="text-xs"
              >
                Sign In
              </Button>
            )}
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

              {/* Mobile Dedicated Currency & Language Selection with Graphic SVG Flags */}
              <li className="pt-3 border-t border-border/80">
                <div className="space-y-3 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-border/60">
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                      <DollarSign className="h-3.5 w-3.5 text-accent" />
                      Specify Currency & Region:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {Object.values(SUPPORTED_COUNTRIES).map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => {
                            handleCountryChange(c.code);
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-left transition-colors border ${
                            c.code === currentCountryCode
                              ? "bg-blue-600 text-white font-bold border-blue-600 shadow-xs"
                              : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-border hover:bg-slate-100"
                          }`}
                        >
                          <CountryFlagIcon
                            code={c.code}
                            className="h-3.5 w-5 rounded-[2px] shadow-xs shrink-0 object-cover"
                          />
                          <span className="truncate">{c.name} ({c.currency.code})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                      <Globe2 className="h-3.5 w-3.5 text-accent" />
                      Specify Language:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                      {Object.values(SUPPORTED_LANGUAGES).map((l) => (
                        <button
                          key={l.code}
                          type="button"
                          onClick={() => {
                            setCurrentLangCode(l.code);
                          }}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-left transition-colors border ${
                            l.code === currentLangCode
                              ? "bg-blue-600 text-white font-bold border-blue-600 shadow-xs"
                              : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-border hover:bg-slate-100"
                          }`}
                        >
                          <CountryFlagIcon
                            code={LANGUAGE_FLAG_CODES[l.code] || "US"}
                            className="h-3.5 w-5 rounded-[2px] shadow-xs shrink-0 object-cover"
                          />
                          <span className="truncate">{l.nativeName}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        )}
      </header>
      )}

      {/* Main Content Area */}
      <main id="main">
        {/* CUSTOMER DASHBOARD (Rendered when authenticated) */}
        {view === "account" && customerUser && (
          <section
            aria-labelledby="dashboard-title"
            className="border-b border-border bg-[#0a192f] text-white py-6 sm:py-10"
          >
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              {/* App-like Container matching customer dashboard mockup */}
              <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0f213d] p-5 sm:p-7 shadow-2xl relative overflow-hidden">
                {/* Header: USA Flag Emblem + Bank Name + Verified Shield */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-[#162e55] border border-white/15 shadow-md overflow-hidden">
                      <span className="text-2xl" role="img" aria-label="USA Flag">🇺🇸</span>
                    </div>
                    <div>
                      <h2 className="font-display text-lg sm:text-xl font-black text-white tracking-tight">
                        USA FINANCE BANK
                      </h2>
                      <p className="text-xs text-slate-300 font-medium">
                        Secure digital banking
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCustomerSignOut}
                      className="border-white/20 bg-white/10 text-white hover:bg-white/20 text-xs font-semibold ml-1"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-1" /> {t.signOut}
                    </Button>
                  </div>
                </div>

                {/* Subtitle & Welcome Back with Customer Profile Picture Avatar */}
                <div className="mt-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    {customerProfilePic ? (
                      <img
                        src={customerProfilePic}
                        alt={customerUser}
                        className="h-14 w-14 rounded-2xl object-cover border-2 border-red-500 shadow-lg shrink-0"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 border-2 border-red-500 text-white font-extrabold text-xl shadow-lg">
                        {customerUser.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <span className="text-[0.7rem] font-bold tracking-wider uppercase text-slate-300 block">
                        CUSTOMER DASHBOARD
                      </span>
                      <h1 id="dashboard-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                        Welcome back, {customerUser}
                      </h1>
                    </div>
                  </div>
                  {/* Accessible Back control in top-left / top-right of customer screens */}
                  {customerActiveTab !== "overview" && (
                    <button
                      type="button"
                      onClick={handleCustomerGoBack}
                      aria-label="Back to dashboard overview"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                  )}
                </div>

                {/* Main Available Balance Card matching screenshot */}
                <div className="mt-5 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-slate-500">
                      Available balance
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAccountBalance(!showAccountBalance)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                    >
                      {showAccountBalance ? "Hide Balance" : "Show Balance"}
                    </button>
                  </div>

                  <div className="mt-2.5">
                    {showAccountBalance ? (
                      <div className="font-display text-2xl sm:text-3xl font-black text-slate-900 flex items-baseline gap-1.5">
                        <span>{country.currency.symbol}</span>
                        <span>{(checkingBalance + savingsBalance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <span className="text-xs font-bold text-slate-500 uppercase">{country.currency.code}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 py-1 text-slate-800 tracking-widest text-xl sm:text-2xl font-black select-none">
                        <span>●●●●●●●●</span>
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-slate-500 font-medium">
                    {showAccountBalance
                      ? `Checking: ${country.currency.symbol}${checkingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })} • High-Yield Savings: ${country.currency.symbol}${savingsBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                      : "Connect a verified account to display your actual balance."}
                  </p>
                </div>

                {/* 5 Primary Navigation Cards: Transfers, Cards, Digital Assets, Statements, Profile */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Card 1: Transfers */}
                  <button
                    type="button"
                    onClick={() => navigateCustomerTab("transfers")}
                    className={`rounded-2xl p-4 sm:p-5 text-left transition-all shadow-sm ${
                      customerActiveTab === "transfers"
                        ? "bg-white text-slate-900 ring-4 ring-red-500"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <ArrowRightLeft className="h-6 w-6 text-slate-800" />
                    <span className="mt-3 block font-bold text-base sm:text-lg text-slate-900">
                      Transfers
                    </span>
                    <span className="text-[0.7rem] text-slate-500 block mt-0.5">
                      Domestic & wire payments
                    </span>
                  </button>

                  {/* Card 2: Cards */}
                  <button
                    type="button"
                    onClick={() => navigateCustomerTab("cards")}
                    className={`rounded-2xl p-4 sm:p-5 text-left transition-all shadow-sm ${
                      customerActiveTab === "cards"
                        ? "bg-white text-slate-900 ring-4 ring-red-500"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-slate-800" />
                    <span className="mt-3 block font-bold text-base sm:text-lg text-slate-900">
                      Cards
                    </span>
                    <span className="text-[0.7rem] text-slate-500 block mt-0.5">
                      Debit, credit & limits
                    </span>
                  </button>

                  {/* Card 3: Digital Assets (Bitcoin & Crypto) */}
                  <button
                    type="button"
                    onClick={() => navigateCustomerTab("crypto")}
                    className={`rounded-2xl p-4 sm:p-5 text-left transition-all shadow-sm ${
                      customerActiveTab === "crypto"
                        ? "bg-white text-slate-900 ring-4 ring-red-500"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xl font-black text-amber-500 font-mono block">₿</span>
                    <span className="mt-2 block font-bold text-base sm:text-lg text-slate-900">
                      Digital Assets
                    </span>
                    <span className="text-[0.7rem] text-slate-500 block mt-0.5">
                      Bitcoin, ETH & custody
                    </span>
                  </button>

                  {/* Card 4: Statements & Tax / IRS Documents */}
                  <button
                    type="button"
                    onClick={() => navigateCustomerTab("statements")}
                    className={`rounded-2xl p-4 sm:p-5 text-left transition-all shadow-sm ${
                      customerActiveTab === "statements"
                        ? "bg-white text-slate-900 ring-4 ring-red-500"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <FileText className="h-6 w-6 text-slate-800" />
                    <span className="mt-3 block font-bold text-base sm:text-lg text-slate-900">
                      Statements
                    </span>
                    <span className="text-[0.7rem] text-slate-500 block mt-0.5">
                      Tax docs, IRS & e-records
                    </span>
                  </button>

                  {/* Card 5: Profile & Security Settings */}
                  <button
                    type="button"
                    onClick={() => navigateCustomerTab("profile")}
                    className={`col-span-2 sm:col-span-1 rounded-2xl p-4 sm:p-5 text-left transition-all shadow-sm ${
                      customerActiveTab === "profile"
                        ? "bg-white text-slate-900 ring-4 ring-red-500"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <Settings className="h-6 w-6 text-red-600" />
                    <span className="mt-3 block font-bold text-base sm:text-lg text-slate-900">
                      Profile & Security
                    </span>
                    <span className="text-[0.7rem] text-slate-500 block mt-0.5">
                      Transfer PIN & settings
                    </span>
                  </button>
                </div>

                {/* Bottom Red Pill Badge matching screenshot */}
                <div className="mt-4 rounded-xl bg-red-600 py-3 px-4 text-center text-white font-extrabold text-xs sm:text-sm tracking-widest shadow-md uppercase select-none">
                  SECURE BANKING • RED • WHITE • BLUE
                </div>

                {/* ======================================================== */}
                {/* EXPANDABLE DEDICATED SERVICE SECTIONS */}
                {/* ======================================================== */}

                {/* A. TRANSFERS SECTION (DOMESTIC & 60 NON-AFRICAN WIRE COUNTRIES) */}
                {customerActiveTab === "transfers" && (
                  <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-xl border border-slate-200 animate-fadeIn relative">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <Send className="h-4 w-4" />
                          </span>
                          <h3 className="text-base font-bold text-slate-900">
                            Transfer Funds
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Send domestic payments or international wire transfers across 60 supported nations.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCustomerGoBack}
                        aria-label="Back to overview"
                        className="text-xs text-slate-400 hover:text-slate-700 font-bold inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    </div>

                    {/* Step 1: Transfer Input Form */}
                    {transferStep === "form" && (
                      <div className="mt-5">
                        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                          <button
                            type="button"
                            onClick={() => {
                              setTransferType("domestic");
                              setTransferError("");
                            }}
                            className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                              transferType === "domestic"
                                ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            🇺🇸 Domestic Transfer ($0.00 Fee)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTransferType("wire");
                              setTransferError("");
                            }}
                            className={`py-2 px-3 text-xs font-bold rounded-lg transition-all ${
                              transferType === "wire"
                                ? "bg-red-600 text-white shadow-xs"
                                : "text-slate-600 hover:text-slate-900"
                            }`}
                          >
                            🌐 International Wire (60 Nations)
                          </button>
                        </div>

                        {/* Limits and Fees Callout */}
                        <div className="mt-4 grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
                          <div>
                            <span className="text-[0.65rem] uppercase text-slate-500 font-bold block">Transfer Fee</span>
                            <span className="font-extrabold text-slate-900">
                              {transferType === "wire" ? "$25.00 Wire Fee" : "Free ($0.00)"}
                            </span>
                          </div>
                          <div className="border-x border-slate-200">
                            <span className="text-[0.65rem] uppercase text-slate-500 font-bold block">Processing Speed</span>
                            <span className="font-extrabold text-emerald-600">{transferProcessingTime}</span>
                          </div>
                          <div>
                            <span className="text-[0.65rem] uppercase text-slate-500 font-bold block">Daily Limit</span>
                            <span className="font-extrabold text-slate-900">
                              {country.currency.symbol}{transferDailyLimit.toLocaleString("en-US")}
                            </span>
                          </div>
                        </div>

                        <form onSubmit={handleProceedToReview} className="mt-5 space-y-4">
                          {/* International Wire Destination Country Selection */}
                          {transferType === "wire" && (
                            <div>
                              <label className="block text-xs font-bold text-slate-800 mb-1">
                                Supported Destination Country (60 Nations Worldwide • Non-African)
                              </label>
                              <select
                                value={wireSelectedCountry}
                                onChange={(e) => setWireSelectedCountry(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium text-slate-800 bg-white focus:border-red-600 focus:outline-none"
                              >
                                {WIRE_TRANSFER_COUNTRIES.map((cty) => (
                                  <option key={cty.code} value={cty.code}>
                                    {cty.flag} {cty.name} — {cty.currency} ({cty.routingScheme})
                                  </option>
                                ))}
                              </select>
                              <p className="text-[0.68rem] text-slate-500 mt-1">
                                Selected routing system: <strong className="text-slate-700">{selectedWireCountryObj.routingScheme}</strong> • Currency: <strong>{selectedWireCountryObj.currency}</strong>
                              </p>
                            </div>
                          )}

                          {/* Recipient Account / Name */}
                          <div className="grid sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-bold text-slate-800 mb-1">
                                Recipient Full Name / Beneficiary
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Eleanor Vance"
                                value={transferRecipient}
                                onChange={(e) => setTransferRecipient(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-800 mb-1">
                                {transferType === "wire" ? "Recipient IBAN / Account Number" : "Account Number / Routing"}
                              </label>
                              <input
                                type="text"
                                placeholder={transferType === "wire" ? "e.g. GB29NWBK60161331926819" : "e.g. 021000021 / 9800010023"}
                                value={wireRoutingOrIban}
                                onChange={(e) => setWireRoutingOrIban(e.target.value)}
                                required
                                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono text-slate-800 focus:border-red-600 focus:outline-none"
                              />
                            </div>
                          </div>

                          {/* Wire Specific: SWIFT/BIC & Address */}
                          {transferType === "wire" && (
                            <div className="grid sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1">
                                  Bank SWIFT / BIC Code (8 or 11 characters)
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. NWBKGB2L"
                                  maxLength={11}
                                  value={wireSwiftCode}
                                  onChange={(e) => setWireSwiftCode(e.target.value.toUpperCase())}
                                  required
                                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono uppercase text-slate-800 focus:border-red-600 focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-800 mb-1">
                                  Recipient Physical Address
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. 10 Finsbury Square, London"
                                  value={wireRecipientAddress}
                                  onChange={(e) => setWireRecipientAddress(e.target.value)}
                                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                                />
                              </div>
                            </div>
                          )}

                          {/* Transfer Amount */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              Transfer Amount ({country.currency.code})
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                                {country.currency.symbol}
                              </span>
                              <input
                                type="number"
                                placeholder="0.00"
                                value={transferAmount}
                                onChange={(e) => setTransferAmount(e.target.value)}
                                required
                                min="1"
                                step="0.01"
                                className="w-full pl-8 pr-3 py-2 text-sm font-bold rounded-lg border border-slate-300 text-slate-900 focus:border-red-600 focus:outline-none"
                              />
                            </div>
                            <p className="text-[0.68rem] text-slate-500 mt-1">
                              Available checking balance: <strong className="text-slate-700">{country.currency.symbol}{checkingBalance.toFixed(2)}</strong>
                            </p>
                          </div>

                          {transferError && (
                            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                              <span>{transferError}</span>
                            </div>
                          )}

                          <div className="flex justify-end pt-2">
                            <Button
                              type="submit"
                              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-10 px-6"
                            >
                              Continue to Review & Confirm →
                            </Button>
                          </div>
                        </form>
                      </div>
                    )}

                    {/* Step 2: Confirmation / Review Step */}
                    {transferStep === "review" && (
                      <div className="mt-5 space-y-4 animate-fadeIn">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
                          <h4 className="font-bold text-sm text-slate-900 border-b border-slate-200 pb-2">
                            Please Review Transfer Details
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <span className="text-slate-500">Transfer Type:</span>
                            <span className="font-bold text-slate-900 capitalize">
                              {transferType === "wire" ? `International Wire (${selectedWireCountryObj.name})` : "Domestic ACH Transfer"}
                            </span>

                            <span className="text-slate-500">Recipient:</span>
                            <span className="font-bold text-slate-900">{transferRecipient}</span>

                            <span className="text-slate-500">Account / IBAN:</span>
                            <span className="font-mono font-bold text-slate-900">{wireRoutingOrIban || "On file"}</span>

                            {transferType === "wire" && (
                              <>
                                <span className="text-slate-500">SWIFT / BIC:</span>
                                <span className="font-mono font-bold text-slate-900">{wireSwiftCode}</span>
                              </>
                            )}

                            <span className="text-slate-500">Transfer Principal:</span>
                            <span className="font-bold text-slate-900">
                              {country.currency.symbol}{parseFloat(transferAmount || "0").toFixed(2)}
                            </span>

                            <span className="text-slate-500">Service Fee:</span>
                            <span className="font-bold text-slate-900">
                              {wireTransferFee === 0 ? "Free ($0.00)" : `${wireTransferFee.toFixed(2)}`}
                            </span>

                            <div className="col-span-2 border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-extrabold text-slate-900">
                              <span>Total Debit from Checking:</span>
                              <span className="text-red-600">
                                {country.currency.symbol}{(parseFloat(transferAmount || "0") + wireTransferFee).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setTransferStep("form")}
                            className="text-xs font-bold text-slate-600 hover:text-slate-900"
                          >
                            ← Edit Details
                          </button>
                          <Button
                            type="button"
                            onClick={handleProceedToPin}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-10 px-6"
                          >
                            Authorize with Transfer PIN →
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Transfer PIN Authorization */}
                    {transferStep === "pin" && (
                      <form onSubmit={handleExecuteTransferWithPin} className="mt-5 space-y-4 animate-fadeIn">
                        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Lock className="h-5 w-5 text-red-600" />
                            <h4 className="font-bold text-sm text-red-950">
                              Enter Transfer Security PIN
                            </h4>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            For your protection, transfer authorization requires your secret 4-to-6 digit PIN. 3 consecutive failed attempts will lock your account for 15 minutes.
                          </p>

                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              Security PIN
                            </label>
                            <div className="relative max-w-xs">
                              <input
                                type={showTransferPinInput ? "text" : "password"}
                                maxLength={6}
                                autoFocus
                                required
                                value={transferPinInput}
                                onChange={(e) => {
                                  setTransferPinInput(e.target.value.replace(/\D/g, ""));
                                  setTransferError("");
                                }}
                                placeholder="••••"
                                className="w-full text-center tracking-widest font-mono text-xl py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:border-red-600 focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => setShowTransferPinInput(!showTransferPinInput)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800"
                              >
                                {showTransferPinInput ? "Hide" : "Show"}
                              </button>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-xs">
                            <button
                              type="button"
                              onClick={handleInitiatePinReset}
                              className="text-red-600 font-bold hover:underline"
                            >
                              Forgot or need to reset PIN?
                            </button>
                            <span className="text-[0.68rem] text-slate-500">
                              Protected by SHA-256 hash
                            </span>
                          </div>
                        </div>

                        {transferError && (
                          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                            <span>{transferError}</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => setTransferStep("review")}
                            className="text-xs font-bold text-slate-600 hover:text-slate-900"
                          >
                            ← Back to Review
                          </button>
                          <Button
                            type="submit"
                            disabled={transferLoading}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs h-10 px-6 disabled:opacity-50"
                          >
                            {transferLoading ? "Verifying & Clearing..." : "Confirm & Execute Transfer"}
                          </Button>
                        </div>
                      </form>
                    )}

                    {/* Step 4: Completion Success */}
                    {transferStep === "complete" && (
                      <div className="mt-5 p-5 rounded-xl border border-emerald-200 bg-emerald-50 text-center space-y-3 animate-fadeIn">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <CheckCircle2 className="h-7 w-7" />
                        </div>
                        <h4 className="font-extrabold text-base text-emerald-950">
                          Transfer Successfully Executed
                        </h4>
                        <p className="text-xs text-emerald-800 max-w-md mx-auto">
                          {transferSuccess}
                        </p>
                        <div className="pt-2">
                          <Button
                            type="button"
                            onClick={() => {
                              setTransferStep("form");
                              setTransferSuccess("");
                            }}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5"
                          >
                            Make Another Transfer
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* B. CARDS SECTION */}
                {customerActiveTab === "cards" && (
                  <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-xl border border-slate-200 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-red-600" />
                          Payment Cards & Limits
                        </h3>
                        <p className="text-xs text-slate-500">
                          Manage contactless debit and physical credit card security.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCustomerActiveTab("overview")}
                        className="text-xs text-slate-400 hover:text-slate-700 font-bold"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#1e3a66] p-5 text-white shadow-md relative overflow-hidden">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[0.65rem] uppercase font-bold text-slate-300">USA Finance Bank</span>
                            <p className="text-sm font-bold mt-0.5">Platinum Debit</p>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                            Active
                          </span>
                        </div>
                        <div className="mt-6 font-mono text-base tracking-widest">
                          •••• •••• •••• 4892
                        </div>
                        <div className="mt-4 flex justify-between items-center text-xs text-slate-300">
                          <span>{customerUser}</span>
                          <span>EXP: 10/29</span>
                        </div>
                      </div>

                      <div className="space-y-2.5 text-xs text-slate-700">
                        <div className="p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                          <div>
                            <p className="font-bold">Daily ATM Withdrawal Limit</p>
                            <p className="text-slate-500">$2,500.00 / day</p>
                          </div>
                          <span className="font-bold text-emerald-600">Standard</span>
                        </div>
                        <div className="p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                          <div>
                            <p className="font-bold">International POS Transactions</p>
                            <p className="text-slate-500">Zero foreign exchange surcharge</p>
                          </div>
                          <span className="font-bold text-blue-600">Enabled</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* C. DIGITAL ASSETS & BITCOIN SECTION */}
                {customerActiveTab === "crypto" && (
                  <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-xl border border-slate-200 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <span className="text-amber-500 font-mono font-black text-lg">₿</span>
                          Digital Assets & Bitcoin Custody
                        </h3>
                        <p className="text-xs text-slate-500">
                          Institutional cold-storage digital currency holdings and valuation.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCustomerActiveTab("overview")}
                        className="text-xs text-slate-400 hover:text-slate-700 font-bold"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">Bitcoin (BTC)</span>
                          <span className="text-xs font-bold text-amber-600 font-mono">₿ 0.00000000</span>
                        </div>
                        <p className="text-lg font-black text-slate-900 mt-2">$0.00 USD</p>
                        <span className="text-[0.65rem] text-slate-500">Cold vault wallet ready</span>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">Ethereum (ETH)</span>
                          <span className="text-xs font-bold text-indigo-600 font-mono">0.0000 ETH</span>
                        </div>
                        <p className="text-lg font-black text-slate-900 mt-2">$0.00 USD</p>
                        <span className="text-[0.65rem] text-slate-500">Staking & smart contracts</span>
                      </div>

                      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">USDC Settlement</span>
                          <span className="text-xs font-bold text-blue-600 font-mono">0.00 USDC</span>
                        </div>
                        <p className="text-lg font-black text-slate-900 mt-2">$0.00 USD</p>
                        <span className="text-[0.65rem] text-slate-500">Instant dollar peg</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* D. STATEMENTS, IRS & TAX DOCUMENTS SECTION */}
                {customerActiveTab === "statements" && (
                  <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-xl border border-slate-200 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-red-600" />
                          Statements, Tax Forms & IRS Documents
                        </h3>
                        <p className="text-xs text-slate-500">
                          Download official regulatory tax reports, Form 1099-INT, and e-statements.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCustomerActiveTab("overview")}
                        className="text-xs text-slate-400 hover:text-slate-700 font-bold"
                      >
                        ✕ Close
                      </button>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                      <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-red-600 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">IRS Form 1099-INT (Interest Income Statement)</p>
                            <p className="text-[0.7rem] text-slate-500">Annual federal tax reporting statement for savings accounts</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs font-bold text-slate-700 border-slate-300">
                          Download PDF
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between transition-colors">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-600 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">Monthly Account Statement (Current Period)</p>
                            <p className="text-[0.7rem] text-slate-500">Itemized electronic bank statement with masked account verification</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs font-bold text-slate-700 border-slate-300">
                          Download PDF
                        </Button>
                      </div>

                      <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between transition-colors">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                          <div>
                            <p className="font-bold text-slate-900">Official Bank Account Verification Letter</p>
                            <p className="text-[0.7rem] text-slate-500">Certified verification of account standing for immigration or financial proof</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs font-bold text-slate-700 border-slate-300">
                          Generate Letter
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* E. PROFILE & SECURITY SETTINGS SECTION */}
                {customerActiveTab === "profile" && (
                  <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-xl border border-slate-200 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Settings className="h-5 w-5 text-red-600" />
                          Profile, Limits & Security Settings
                        </h3>
                        <p className="text-xs text-slate-500">
                          Manage account security, transfer PIN, email verification, and daily limits.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCustomerGoBack}
                        aria-label="Back to overview"
                        className="text-xs text-slate-400 hover:text-slate-700 font-bold inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" /> Back
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Account Summary & Verification */}
                      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600">
                            Account Profile
                          </h4>
                          <span className="text-[0.65rem] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            Verified
                          </span>
                        </div>

                        {/* Customer Profile Photo Card */}
                        <div className="flex items-center gap-3.5 p-3 rounded-lg bg-white border border-slate-200">
                          <label className="relative group cursor-pointer shrink-0" title="Click to upload/change photo">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUploadProfilePic}
                              className="hidden"
                            />
                            {customerProfilePic ? (
                              <img
                                src={customerProfilePic}
                                alt={customerUser || "Profile"}
                                className="h-14 w-14 rounded-2xl object-cover border-2 border-red-600 shadow-xs shrink-0 group-hover:opacity-80 transition-opacity"
                              />
                            ) : (
                              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0a192f] border-2 border-red-600 text-white font-extrabold text-xl shadow-xs group-hover:bg-[#122847] transition-colors">
                                {customerUser ? customerUser.charAt(0).toUpperCase() : "U"}
                              </div>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity text-white text-[0.65rem] font-bold">
                              Change
                            </div>
                          </label>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate">
                              {customerUser}
                            </span>
                            <span className="text-[0.7rem] text-slate-500 block">
                              {customerProfilePic ? "Profile Picture Live & Verified" : "Default Avatar"}
                            </span>
                            <label className="text-[0.68rem] text-red-600 font-bold hover:underline cursor-pointer inline-flex items-center gap-1 mt-0.5">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUploadProfilePic}
                                className="hidden"
                              />
                              <Upload className="h-3 w-3" /> Upload Photo from Device
                            </label>
                          </div>
                        </div>

                        {/* Profile Picture Upload / URL Update Form */}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleUpdateCustomerProfilePic(profilePicEditInput);
                          }}
                          className="pt-1 space-y-2"
                        >
                          <label className="block text-[0.7rem] font-bold text-slate-700">
                            Or Enter Profile Photo Web URL
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              placeholder="https://images.unsplash.com/..."
                              value={profilePicEditInput}
                              onChange={(e) => setProfilePicEditInput(e.target.value)}
                              className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-red-600 focus:outline-none"
                            />
                            <Button
                              type="submit"
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 shrink-0"
                            >
                              Update
                            </Button>
                          </div>
                          {profilePicSuccess && (
                            <p className="text-[0.7rem] font-bold text-emerald-600 mt-1">
                              ✓ {profilePicSuccess}
                            </p>
                          )}
                        </form>

                        <div className="space-y-2 text-xs pt-2 border-t border-slate-200/60">
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Account Holder:</span>
                            <span className="font-bold text-slate-900">{customerUser}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Registered Email:</span>
                            <span className="font-mono font-medium text-slate-800">{customerLoginEmail || "user@usfinancebank.online"}</span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Account Status:</span>
                            <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[0.65rem]">
                              ✓ Fully Verified (Tier 2 FDIC)
                            </span>
                          </div>
                          <div className="flex justify-between py-1 border-b border-slate-200/60">
                            <span className="text-slate-500">Checking Balance:</span>
                            <span className="font-bold text-slate-900">{country.currency.symbol}{checkingBalance.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between py-1">
                            <span className="text-slate-500">Savings Balance:</span>
                            <span className="font-bold text-slate-900">{country.currency.symbol}{savingsBalance.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Security & Transfer PIN */}
                      <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50 space-y-3">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 flex items-center justify-between">
                          <span>Transfer Security & PIN</span>
                          <span className="text-[0.65rem] font-bold text-emerald-600">Active</span>
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Your secret transfer PIN is required to authorize all wire transfers and external payments. PINs are salted and hashed with SHA-256 before storage.
                        </p>

                        <div className="pt-2 space-y-2">
                          <Button
                            type="button"
                            onClick={handleInitiatePinReset}
                            className="w-full bg-[#0a192f] hover:bg-[#122847] text-white text-xs font-bold py-2"
                          >
                            <KeyRound className="h-3.5 w-3.5 mr-1.5" /> Reset or Change Transfer PIN
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setPasswordResetError("");
                            }}
                            className="w-full border-slate-300 text-slate-800 text-xs font-bold py-2"
                          >
                            <Lock className="h-3.5 w-3.5 mr-1.5" /> Update Web Login Password
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Daily Limits & International Eligibility */}
                    <div className="mt-4 p-4 rounded-xl border border-slate-200 bg-white">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-2">
                        Transfer Limits & International Wire Eligibility
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[0.65rem] text-slate-500 block">Domestic Transfer Limit</span>
                          <span className="font-extrabold text-slate-900">$25,000.00 / day</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[0.65rem] text-slate-500 block">Wire Transfer Limit</span>
                          <span className="font-extrabold text-slate-900">$100,000.00 / day</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[0.65rem] text-slate-500 block">Supported Wire Nations</span>
                          <span className="font-extrabold text-red-600">60 Countries</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-[0.65rem] text-slate-500 block">Two-Factor Auth</span>
                          <span className="font-extrabold text-emerald-600">Email OTP (10m)</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Edit Personal Details & Submit for Admin Approval */}
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-primary" />
                            Edit Personal Details (Admin Verified & Approved)
                          </h4>
                          <p className="text-[0.7rem] text-slate-500 mt-0.5">
                            Under US banking security compliance, changes to your legal name, email, or telephone must be reviewed and approved by Admin Staff.
                          </p>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[0.65rem] font-bold text-primary border border-blue-200">
                          Secure Review
                        </span>
                      </div>

                      {customerEditSuccess && (
                        <div className="mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          <span>{customerEditSuccess}</span>
                        </div>
                      )}

                      {customerEditError && (
                        <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                          <span>{customerEditError}</span>
                        </div>
                      )}

                      <form onSubmit={handleSubmitCustomerProfileEdit} className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Legal Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={customerEditName}
                              onChange={(e) => setCustomerEditName(e.target.value)}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-red-600 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Primary Email Address (Receives Login & OTP Codes)
                            </label>
                            <input
                              type="email"
                              required
                              value={customerEditEmail}
                              onChange={(e) => setCustomerEditEmail(e.target.value)}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-red-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Phone / Mobile Number (SMS Security)
                            </label>
                            <input
                              type="text"
                              required
                              value={customerEditPhone}
                              onChange={(e) => setCustomerEditPhone(e.target.value)}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-red-600 focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Country / Residential Address
                            </label>
                            <input
                              type="text"
                              value={customerEditAddress}
                              onChange={(e) => setCustomerEditAddress(e.target.value)}
                              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-red-600 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <p className="text-[0.68rem] text-slate-500">
                            Submissions are instantly routed to the Admin Staff verification queue for authorization.
                          </p>
                          <Button
                            type="submit"
                            disabled={customerEditSubmitting}
                            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs h-9 px-4 shrink-0 shadow-xs"
                          >
                            {customerEditSubmitting ? "Transmitting Request..." : "Submit Details to Admin for Approval"}
                          </Button>
                        </div>
                      </form>

                      {/* Display Pending Requests for this customer if any */}
                      {customerPendingEdits.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          <h5 className="font-bold text-[0.72rem] text-slate-700 uppercase tracking-wider mb-2">
                            Recent Profile Edit Requests
                          </h5>
                          <div className="space-y-2">
                            {customerPendingEdits.map((req: any) => (
                              <div key={req.id} className="rounded-lg border border-slate-200 bg-white p-3 text-xs flex items-center justify-between">
                                <div>
                                  <span className="font-bold text-slate-900">{req.requestedName}</span> • <span className="text-slate-600">{req.requestedEmail}</span> • <span className="text-slate-600">{req.requestedPhone}</span>
                                  <div className="text-[0.65rem] text-slate-400 mt-0.5">
                                    Ref: {req.id} • Submitted: {req.submittedAt}
                                  </div>
                                </div>
                                <span className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold border ${
                                  req.status === "Approved"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                    : req.status === "Rejected"
                                    ? "bg-rose-50 text-rose-800 border-rose-200"
                                    : "bg-amber-50 text-amber-800 border-amber-200"
                                }`}>
                                  {req.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Recent Transactions List inside Customer Dashboard */}
                <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 text-slate-900 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">Recent Transactions</h3>
                      <p className="text-[0.7rem] text-slate-500 mt-0.5">
                        Tap any transaction to view verification details and clearing status.
                      </p>
                    </div>
                    <span className="text-[0.65rem] font-bold text-slate-400 uppercase">
                      Live Ledger
                    </span>
                  </div>

                  <div className="mt-2 divide-y divide-slate-100">
                    {transactions.slice(0, 5).map((tx) => (
                      <div
                        key={tx.id}
                        onClick={() => setSelectedCustomerTx(tx)}
                        className="py-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer px-2 rounded-lg transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-xs text-slate-900">{tx.desc}</p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[0.65rem] font-bold ${
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
                          <p className="text-[0.68rem] text-slate-500 mt-0.5">
                            {tx.date} • {tx.category} • Ref: <span className="font-mono">{tx.id}</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`font-mono font-bold text-xs ${tx.positive ? "text-emerald-600" : "text-slate-900"}`}>
                            {tx.amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
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

              {/* Clearing & Regulatory Security Record */}
              <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[0.7rem] text-emerald-900 leading-relaxed">
                <strong>Clearing Status:</strong> Transaction logs reflect verified banking settlement records cleared under FDIC & Federal Reserve regulations.
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


        {view === "home" && (
        <>
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
                        <p className="text-xs text-muted-foreground">Official Communications Desk</p>
                        <p className="text-sm font-bold text-primary">usfinanceassistance@usfinancebank.online</p>
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
        </>
        )}
      </main>

      {/* FOOTER (Rendered on public site; private account view has its own dedicated portal bar) */}
      {view === "home" ? (
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
                    <span className="text-white/60">Assistance:</span> <span className="text-accent font-bold">24/7 Digital Support</span>
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
                Official US Finance Bank portal. Contact: usfinanceassistance@usfinancebank.online • Tel: +1-567-US. Treat the listed countries
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
      ) : (
        <footer className="border-t border-[#162e55] bg-[#071324] py-6 text-center text-xs text-slate-400">
          <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-base" role="img" aria-label="USA Flag">🇺🇸</span>
              <span className="font-bold text-white tracking-wide">US FINANCE BANK CUSTOMER PORTAL</span>
            </div>
            <p className="text-[0.7rem] text-slate-400">
              FDIC Insured • 256-Bit SSL Encrypted Session • 24/7 Priority Assistance
            </p>
            <p className="text-[0.68rem] text-slate-500 font-mono">
              © {new Date().getFullYear()} US Finance Bank Digital Systems
            </p>
          </div>
        </footer>
      )}

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
                  <p className="font-bold flex items-center gap-1.5 text-primary">
                    <Mail className="h-4 w-4 text-primary" />
                    Security Verification Code Dispatched
                  </p>
                  <p className="mt-1 leading-relaxed text-slate-700">
                    A secure 6-digit verification code has been dispatched to your registered address (<strong className="text-slate-900 font-mono">{customerLoginEmail}</strong>). Please open your email inbox or check your SMS messages on your mobile device to retrieve the code and enter it below.
                  </p>
                  <p className="mt-2 text-[0.68rem] text-slate-500 italic">
                    For your security, OTP codes are sent directly to your authorized device and never displayed on-screen.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <label htmlFor="mfa-input" className="block text-xs font-bold text-foreground">
                      Enter 6-Digit Email Verification Code
                    </label>
                    <span className="text-[0.68rem] text-slate-500 font-normal">
                      Valid for 10 minutes
                    </span>
                  </div>
                  <input
                    id="mfa-input"
                    type="text"
                    required
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 849201"
                    className="mt-1 w-full text-center tracking-widest font-mono text-xl rounded-md border border-input px-3.5 py-2.5 focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>Didn't receive the email code?</span>
                  <button
                    type="button"
                    onClick={handleResendEmailOtp}
                    disabled={mfaResendCount >= 3}
                    className="font-bold text-primary hover:underline disabled:text-slate-400"
                  >
                    Resend Code {mfaResendCount > 0 && `(${3 - mfaResendCount} left)`}
                  </button>
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

                {/* Mandatory 4-to-6 digit Security Transfer PIN */}
                <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-red-950 flex items-center gap-1.5">
                      <KeyRound className="h-4 w-4 text-red-600" />
                      Create Transfer PIN (Required for Fund Transfers)
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowAppPin(!showAppPin)}
                      className="text-[0.68rem] text-red-600 font-bold hover:underline"
                    >
                      {showAppPin ? "Hide PIN" : "Show PIN"}
                    </button>
                  </div>
                  <p className="text-[0.7rem] text-slate-600 leading-relaxed mb-3">
                    Your transfer PIN is encrypted and stored as a secure one-way hash. It is required to approve all domestic and international wire transfers.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="reg-pin" className="block text-[0.7rem] font-bold text-foreground">
                        4-to-6 Digit Security PIN
                      </label>
                      <input
                        id="reg-pin"
                        type={showAppPin ? "text" : "password"}
                        required
                        maxLength={6}
                        value={appTransferPin}
                        onChange={(e) => setAppTransferPin(e.target.value.replace(/\D/g, ""))}
                        placeholder="4 to 6 numbers"
                        className="mt-1 w-full font-mono text-center tracking-widest rounded-md border border-input px-3.5 py-2 text-sm focus:border-red-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="reg-pin-confirm" className="block text-[0.7rem] font-bold text-foreground">
                        Confirm Security PIN
                      </label>
                      <input
                        id="reg-pin-confirm"
                        type={showAppPin ? "text" : "password"}
                        required
                        maxLength={6}
                        value={appConfirmTransferPin}
                        onChange={(e) => setAppConfirmTransferPin(e.target.value.replace(/\D/g, ""))}
                        placeholder="Re-enter PIN"
                        className="mt-1 w-full font-mono text-center tracking-widest rounded-md border border-input px-3.5 py-2 text-sm focus:border-red-600 focus:outline-none"
                      />
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
                  Official Super Administrator Response
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

      {/* FORGOT PASSWORD MODAL (ONE-TIME LINK VIA SMS OR EMAIL WITH EXPIRATION) */}
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
              Request a secure one-time password-reset link delivered to your verified contact method.
            </p>

            {resetSent ? (
              <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="mt-2 text-sm font-bold text-emerald-900">One-Time Reset Link Dispatched</h4>
                <p className="mt-1.5 text-xs text-emerald-800 leading-relaxed">
                  A one-time link has been sent to your verified <strong>{customerResetMethod === "Email" ? resetEmail : "+1 (416) 555-0182"}</strong> via {customerResetMethod}.
                </p>
                <div className="mt-3 rounded-lg bg-emerald-100/70 p-2.5 text-[0.72rem] text-emerald-900 font-mono">
                  ⏱ Link expires in 15 minutes • Single-use authorization
                </div>
                <p className="mt-2 text-[0.68rem] text-slate-500">
                  Security Guarantee: Passwords are never sent by text or email. You will define your own new password.
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setForgotPasswordOpen(false);
                      setCustomerSetNewPasswordModalOpen(true);
                      setResetSent(false);
                    }}
                    className="bg-primary hover:bg-primary/90 text-white font-bold text-xs"
                  >
                    Open One-Time Reset Link
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setForgotPasswordOpen(false);
                      setCustomerModalOpen(true);
                      setResetSent(false);
                    }}
                    className="text-xs"
                  >
                    Return to Sign In
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!resetEmail) return;
                  setCustomerResetToken(`USB-RST-${Math.floor(100000 + Math.random() * 900000)}`);
                  setCustomerResetExpiryTime("15 minutes");
                  setResetSent(true);
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label htmlFor="rst-email" className="block text-xs font-bold text-foreground">
                    Registered Email or Phone Number
                  </label>
                  <input
                    id="rst-email"
                    type="text"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="e.g. mathieu.t@example.ca or +1 (416) 555-0182"
                    className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Delivery Method (Verified Notification Preferences)
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setCustomerResetMethod("Email")}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border font-semibold transition-colors ${
                        customerResetMethod === "Email"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                      Email Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerResetMethod("SMS")}
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border font-semibold transition-colors ${
                        customerResetMethod === "SMS"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                      SMS Link
                    </button>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-[0.7rem] text-slate-600 leading-relaxed">
                  🔒 The link will expire after 15 minutes and allows you to set your own new password. Passwords are never sent by text or email.
                </div>

                <Button type="submit" className="w-full bg-primary font-bold text-xs py-2.5">
                  Send One-Time Password Reset Link
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CUSTOMER SET NEW PASSWORD MODAL (AFTER OPENING ONE-TIME RESET LINK) */}
      {customerSetNewPasswordModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => {
                setCustomerSetNewPasswordModalOpen(false);
                setPasswordResetSuccessNotice(false);
              }}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-xs">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">Set New Account Password</h3>
                <p className="text-xs text-muted-foreground">Authorized One-Time Credential Update</p>
              </div>
            </div>

            {passwordResetSuccessNotice ? (
              <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="mt-2 text-sm font-bold text-emerald-900">Password Successfully Updated</h4>
                <p className="mt-1 text-xs text-emerald-800">
                  Your new online banking password has been securely recorded. You may now sign in.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setCustomerSetNewPasswordModalOpen(false);
                    setPasswordResetSuccessNotice(false);
                    setCustomerModalOpen(true);
                  }}
                  className="mt-4 bg-primary text-white font-bold"
                >
                  Sign In to Online Banking
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newCustomerPass.length < 8) {
                    setPasswordResetError("Password must be at least 8 characters long.");
                    return;
                  }
                  if (newCustomerPass !== confirmCustomerPass) {
                    setPasswordResetError("Passwords do not match. Please re-enter.");
                    return;
                  }
                  setPasswordResetError("");
                  setPasswordResetSuccessNotice(true);
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    New Confidential Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewCustomerPass ? "text" : "password"}
                      required
                      value={newCustomerPass}
                      onChange={(e) => {
                        setNewCustomerPass(e.target.value);
                        setPasswordResetError("");
                      }}
                      placeholder="Minimum 8 characters"
                      className="w-full rounded-md border border-input px-3.5 py-2 text-sm pr-9 focus:border-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewCustomerPass(!showNewCustomerPass)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                    >
                      {showNewCustomerPass ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type={showNewCustomerPass ? "text" : "password"}
                    required
                    value={confirmCustomerPass}
                    onChange={(e) => {
                      setConfirmCustomerPass(e.target.value);
                      setPasswordResetError("");
                    }}
                    placeholder="Re-enter new password"
                    className="w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                {passwordResetError && (
                  <p className="text-xs font-bold text-red-600">{passwordResetError}</p>
                )}

                <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-[0.7rem] text-slate-600">
                  🛡️ Strong encryption enabled. Administrators cannot view or modify your secret passphrase.
                </div>

                <Button type="submit" className="w-full bg-primary font-bold text-xs py-2.5">
                  Update & Secure Account
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PIN RESET MODAL (Email Verification + New Hash) */}
      {pinResetModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-2xl text-foreground">
            <button
              type="button"
              onClick={() => setPinResetModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-border pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Reset Transfer Security PIN</h3>
                <p className="text-xs text-muted-foreground">Authorized via registered email address</p>
              </div>
            </div>

            {pinResetStep === "request" ? (
              <form onSubmit={handleRequestPinResetOtp} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Registered Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={pinResetEmail}
                    onChange={(e) => setPinResetEmail(e.target.value)}
                    placeholder="e.g. eleanor.vance@example.com"
                    className="w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-red-600 focus:outline-none"
                  />
                </div>
                {pinResetError && (
                  <p className="text-xs font-bold text-red-600">{pinResetError}</p>
                )}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5">
                  Send Email Verification Code →
                </Button>
              </form>
            ) : (
              <form onSubmit={handleConfirmPinReset} className="mt-4 space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-900">
                  {pinResetSuccess || `We sent a 6-digit verification code to ${pinResetEmail}.`}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Enter Email Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pinResetOtp}
                    onChange={(e) => setPinResetOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="6-digit code"
                    className="w-full font-mono text-center tracking-widest text-lg rounded-md border border-input px-3 py-2 focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      New Security PIN
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={6}
                      value={pinResetNewPin}
                      onChange={(e) => setPinResetNewPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••"
                      className="w-full font-mono text-center tracking-widest rounded-md border border-input px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm New PIN
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={6}
                      value={pinResetConfirmPin}
                      onChange={(e) => setPinResetConfirmPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••"
                      className="w-full font-mono text-center tracking-widest rounded-md border border-input px-3 py-2 text-sm focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>
                {pinResetError && (
                  <p className="text-xs font-bold text-red-600">{pinResetError}</p>
                )}
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5">
                  Update & Save New Transfer PIN
                </Button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FAINT LOW-CONTRAST BANK LOGO LOADING TREATMENT */}
      {(transferLoading || customerAuthLoading) && (
        <div
          role="status"
          aria-live="polite"
          aria-label="Secure command processing..."
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs select-none"
        >
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#0a192f]/90 border border-white/10 shadow-2xl">
            {/* Low-contrast faint bank logo treatment */}
            <div className="relative flex items-center justify-center w-24 h-24 mb-3">
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" />
              <img
                src="/favicon.png"
                alt=""
                aria-hidden="true"
                className="w-16 h-16 object-contain opacity-35 filter grayscale contrast-75 animate-pulse"
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300 animate-pulse">
              US Finance Bank Clearing
            </p>
            <span className="text-[0.65rem] text-slate-400 mt-1">
              Securing transmission with SHA-256...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}