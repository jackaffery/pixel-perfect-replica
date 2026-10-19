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
  UserCheck,
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
  ChevronRight,
  Sparkles,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroPhoto from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "US Finance Bank | Online Banking" },
      {
        name: "description",
        content:
          "Welcome to US Finance Bank. Discover a modern digital banking experience designed to make managing your money simple, convenient, and accessible.",
      },
      { property: "og:title", content: "US Finance Bank | Online Banking" },
      {
        property: "og:description",
        content: "Banking Made Simpler. Your Future, Your Finance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "US Finance Bank | Online Banking" },
      {
        name: "twitter:description",
        content: "Banking Made Simpler. Your Future, Your Finance.",
      },
    ],
  }),
  component: Index,
});

/* Navigation links */
const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Personal Banking", href: "#personal" },
  { label: "Business Banking", href: "#business" },
  { label: "Online Banking", href: "#online-banking" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

function BrandLogo({ onHomeClick }: { onHomeClick?: () => void }) {
  return (
    <a
      href="#top"
      onClick={onHomeClick}
      className="group flex min-w-0 items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-ring"
      aria-label="US Finance Bank, Online Banking home"
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/20 transition-transform group-hover:scale-105">
        <Landmark className="h-6 w-6 text-white" />
        <span
          className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-accent"
          aria-hidden="true"
        />
      </div>
      <div className="min-w-0 leading-tight">
        <span className="block text-base font-extrabold tracking-tight text-primary sm:text-lg">
          US FINANCE BANK
        </span>
        <span className="block text-xs font-semibold uppercase tracking-wider text-accent sm:text-[0.72rem]">
          Online Banking
        </span>
      </div>
    </a>
  );
}

export function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication Modals & States
  const [customerModalOpen, setCustomerModalOpen] = useState(false);
  const [staffModalOpen, setStaffModalOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [openAccountModalOpen, setOpenAccountModalOpen] = useState(false);

  // Customer Auth Session
  const [customerUser, setCustomerUser] = useState<string | null>(null);
  const [customerLoginEmail, setCustomerLoginEmail] = useState("");
  const [customerLoginPassword, setCustomerLoginPassword] = useState("");
  const [showCustomerPassword, setShowCustomerPassword] = useState(false);
  const [rememberCustomer, setRememberCustomer] = useState(true);
  const [customerAuthLoading, setCustomerAuthLoading] = useState(false);
  const [customerAuthError, setCustomerAuthError] = useState("");

  // Customer Dashboard Demo State
  const [checkingBalance, setCheckingBalance] = useState(12450.8);
  const [savingsBalance, setSavingsBalance] = useState(48200.0);
  const [transactions, setTransactions] = useState([
    {
      id: "tx-1",
      date: "Today, 10:14 AM",
      desc: "Direct Deposit — US Treasury Payroll",
      category: "Income",
      amount: "+$3,450.00",
      positive: true,
    },
    {
      id: "tx-2",
      date: "Oct 18, 2026",
      desc: "Whole Foods Market — Debit Card",
      category: "Groceries",
      amount: "-$142.35",
      positive: false,
    },
    {
      id: "tx-3",
      date: "Oct 16, 2026",
      desc: "City Power & Electric — Bill Pay",
      category: "Utilities",
      amount: "-$84.10",
      positive: false,
    },
    {
      id: "tx-4",
      date: "Oct 14, 2026",
      desc: "High-Yield Interest Credit",
      category: "Interest",
      amount: "+$182.40",
      positive: true,
    },
  ]);

  // Transfer demo inside Customer Dashboard
  const [transferAmount, setTransferAmount] = useState("");
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferSuccess, setTransferSuccess] = useState("");

  // Staff Auth Session
  const [staffUser, setStaffUser] = useState<{
    name: string;
    role: string;
    id: string;
  } | null>(null);
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [showStaffPassword, setShowStaffPassword] = useState(false);
  const [staffDept, setStaffDept] = useState("Operations");
  const [staffAuthLoading, setStaffAuthLoading] = useState(false);
  const [staffAuthError, setStaffAuthError] = useState("");

  // Forgot password form
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  // Open Account Registration form
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regType, setRegType] = useState("Personal Checking & Savings");
  const [regSubmitted, setRegSubmitted] = useState(false);

  // Contact form
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Handle Customer Sign-In
  const handleCustomerSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomerAuthError("");
    if (!customerLoginEmail.trim()) {
      setCustomerAuthError("Please enter your email or username.");
      return;
    }
    if (!customerLoginPassword.trim()) {
      setCustomerAuthError("Please enter your account password.");
      return;
    }
    setCustomerAuthLoading(true);
    setTimeout(() => {
      setCustomerAuthLoading(false);
      setCustomerUser(
        customerLoginEmail.includes("@")
          ? customerLoginEmail.split("@")[0]
          : customerLoginEmail
      );
      setCustomerModalOpen(false);
      setCustomerLoginPassword("");
    }, 700);
  };

  // Handle Customer Transfer
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
        amount: `-$${amt.toFixed(2)}`,
        positive: false,
      },
      ...prev,
    ]);
    setTransferSuccess(
      `Successfully transferred $${amt.toFixed(2)} to ${transferRecipient || "Recipient"}`
    );
    setTransferAmount("");
    setTransferRecipient("");
    setTimeout(() => setTransferSuccess(""), 4000);
  };

  // Handle Staff Sign-In
  const handleStaffSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffAuthError("");
    if (!staffEmail.trim()) {
      setStaffAuthError("Staff Email or Employee ID is required.");
      return;
    }
    if (!staffPassword.trim()) {
      setStaffAuthError("Staff authentication password is required.");
      return;
    }
    setStaffAuthLoading(true);
    setTimeout(() => {
      setStaffAuthLoading(false);
      setStaffUser({
        name: staffEmail.includes("@")
          ? staffEmail.split("@")[0].toUpperCase()
          : staffEmail.toUpperCase(),
        role: `${staffDept} Officer`,
        id: `STF-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      setStaffModalOpen(false);
      setStaffPassword("");
    }, 750);
  };

  // Handle Contact Form Submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSending(true);
    setTimeout(() => {
      setContactSending(false);
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactSubject("");
      setContactMessage("");
    }, 800);
  };

  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      {/* Accessibility Skip Link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Top Patriotic Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Official Top Bar */}
      <div className="border-b border-border/80 bg-navy-deep text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-accent" />
              US Finance Bank • Official Online Banking Portal
            </span>
            <span className="hidden text-white/40 md:inline">|</span>
            <span className="hidden items-center gap-1 text-white/90 md:inline-flex">
              Contact Handle: <strong className="text-white">@infobank</strong>
            </span>
          </div>
          <div className="flex items-center gap-4">
            {customerUser ? (
              <span className="font-medium text-white">
                Customer: <strong>{customerUser}</strong>
              </span>
            ) : null}
            {staffUser ? (
              <span className="rounded bg-accent/30 px-2 py-0.5 text-xs font-semibold text-white">
                Staff ID: {staffUser.id}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setStaffModalOpen(true)}
                className="flex items-center gap-1.5 font-semibold text-white/90 underline-offset-4 hover:text-white hover:underline focus:outline-none focus:ring-1 focus:ring-white"
              >
                <KeyRound className="h-3 w-3 text-accent" />
                Staff Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Main Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-white/95 shadow-xs backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <BrandLogo
            onHomeClick={() => {
              setCustomerModalOpen(false);
              setStaffModalOpen(false);
            }}
          />

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm font-semibold text-foreground/90">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative py-1 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {customerUser ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCustomerUser(null)}
                className="border-primary/30 text-primary hover:bg-primary/5"
              >
                <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenAccountModalOpen(true)}
                  className="border-primary/20 text-primary hover:border-primary hover:bg-primary/5"
                >
                  Open an Account
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCustomerModalOpen(true)}
                  className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                >
                  <LogIn className="mr-1.5 h-4 w-4 text-accent" />
                  Customer Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded py-2 text-base font-semibold text-primary hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setStaffModalOpen(true);
                  }}
                  className="flex w-full items-center justify-between py-2 text-left text-sm font-semibold text-primary hover:text-accent"
                >
                  <span>Staff Sign-In Portal</span>
                  <KeyRound className="h-4 w-4 text-accent" />
                </button>
              </li>
              <li className="pt-2">
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCustomerModalOpen(true);
                  }}
                >
                  Customer Sign In
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main">
        {/* CUSTOMER DASHBOARD VIEW (Shown when authenticated) */}
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
                      ONLINE BANKING
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Session Active • Encrypted 256-bit
                    </span>
                  </div>
                  <h1
                    id="dashboard-title"
                    className="mt-1 font-display text-2xl font-bold text-primary sm:text-3xl"
                  >
                    Welcome back, {customerUser}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    US Finance Bank Primary Relationship Dashboard
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCustomerUser(null)}
                    className="text-sm"
                  >
                    <LogOut className="mr-1.5 h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </div>

              {/* Account Balances */}
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-border bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Advantage Checking
                    </span>
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-primary">
                    ${checkingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Account # •••• 4892 (Available)
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => alert("Quick deposit instructions sent to your registered email.")}
                      className="text-xs font-semibold text-accent underline underline-offset-4 hover:text-accent/80"
                    >
                      Deposit Check
                    </button>
                    <span className="text-muted-foreground">•</span>
                    <button
                      type="button"
                      onClick={() => alert("Downloading current monthly statement PDF...")}
                      className="text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      Statement
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      High-Yield Savings
                    </span>
                    <TrendingUp className="h-5 w-5 text-accent" />
                  </div>
                  <div className="mt-3 text-3xl font-extrabold text-primary">
                    ${savingsBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Account # •••• 8104 (4.85% APY)
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSavingsBalance((prev) => prev + 500);
                        setCheckingBalance((prev) => prev - 500);
                        alert("Transferred $500.00 from Checking to Savings.");
                      }}
                      className="text-xs font-semibold text-accent underline underline-offset-4 hover:text-accent/80"
                    >
                      + Save $500
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-white p-6 shadow-xs sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Quick Fund Transfer
                    </span>
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <form onSubmit={handleTransfer} className="mt-3 space-y-3">
                    <input
                      type="text"
                      placeholder="Recipient Email or Account"
                      value={transferRecipient}
                      onChange={(e) => setTransferRecipient(e.target.value)}
                      required
                      className="w-full rounded-md border border-input px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Amount ($)"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        required
                        min="1"
                        step="0.01"
                        className="w-full rounded-md border border-input px-3 py-1.5 text-xs focus:border-primary focus:outline-none"
                      />
                      <Button type="submit" size="sm" className="bg-primary text-xs">
                        Send
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
                  <h2 className="text-lg font-bold text-primary">Recent Transactions</h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    Last 30 Days
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

        {/* STAFF DASHBOARD VIEW (Shown when Staff is logged in) */}
        {staffUser && (
          <section
            aria-labelledby="staff-portal-title"
            className="border-b border-border bg-navy-deep text-primary-foreground py-10"
          >
            <div className="mx-auto max-w-7xl px-5">
              <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-accent px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                      Staff Administration Portal
                    </span>
                    <span className="text-xs text-white/70">Role-Based Access Verified</span>
                  </div>
                  <h1
                    id="staff-portal-title"
                    className="mt-1 font-display text-2xl font-bold text-white sm:text-3xl"
                  >
                    Officer {staffUser.name} • {staffUser.role}
                  </h1>
                  <p className="text-sm text-white/70">
                    Employee Record: {staffUser.id} • USFinanceBank Internal Management
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setStaffUser(null)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  <LogOut className="mr-1.5 h-4 w-4" /> Exit Staff Session
                </Button>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-bold tracking-wider text-accent uppercase">
                    Queue Status
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">14 Pending Reviews</div>
                  <p className="mt-1 text-xs text-white/60">
                    Customer applications awaiting identity checks
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-bold tracking-wider text-accent uppercase">
                    Direct Contact Inquiries
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">8 Incoming Messages</div>
                  <p className="mt-1 text-xs text-white/60">Routed via handle @infobank</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-bold tracking-wider text-accent uppercase">
                    System Security Audit
                  </div>
                  <div className="mt-2 text-2xl font-bold text-emerald-400">100% Operational</div>
                  <p className="mt-1 text-xs text-white/60">
                    All cryptographic tokens and database sessions secure
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HERO SECTION */}
        <section
          aria-labelledby="hero-heading"
          className="relative isolate overflow-hidden bg-navy-deep text-primary-foreground min-h-[580px] flex items-center"
        >
          {/* Background Bank Architecture Image */}
          <img
            src={heroPhoto}
            alt="US Finance Bank Modern Financial Headquarters and Banking Office"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center brightness-95"
            fetchPriority="high"
          />

          {/* Color Treatment Overlay (Navy Blue with patriotic gradient) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep/95 via-navy-deep/85 to-primary/75"
          />

          <div className="mx-auto max-w-7xl px-5 py-20 lg:py-28 w-full">
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                US FINANCE BANK • TRUSTED AMERICAN BANKING
              </div>

              {/* Main Heading */}
              <h1
                id="hero-heading"
                className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white drop-shadow-xs"
              >
                Banking Made Simpler.{" "}
                <span className="block text-accent">Your Future, Your Finance.</span>
              </h1>

              {/* Supporting Text */}
              <p className="mt-6 text-base leading-relaxed text-white/90 sm:text-lg lg:text-xl">
                Discover a modern digital banking experience designed to make managing your
                money simple, convenient, and accessible.
              </p>

              {/* Red Accent Divider */}
              <div className="my-7 h-1 w-20 rounded bg-accent" aria-hidden="true" />

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
                  Sign In
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="min-h-12 border-white/30 bg-white/10 px-6 text-base font-bold text-white backdrop-blur-sm hover:bg-white hover:text-primary"
                >
                  <a href="#personal">
                    Explore Banking <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="min-h-12 text-base font-semibold text-white hover:bg-white/10"
                >
                  <a href="#contact">Contact Us</a>
                </Button>
              </div>

              {/* Security Pill */}
              <div className="mt-8 flex items-center gap-3 text-xs text-white/70">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>
                  High-security SSL encryption • Real-time alerts • Dedicated customer support
                </span>
              </div>
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
                  lending to support every chapter of your life.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setOpenAccountModalOpen(true)}
                className="self-start md:self-auto border-primary/20 text-primary"
              >
                Open an Account
              </Button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Wallet,
                  title: "Advantage Checking",
                  desc: "Zero hidden monthly maintenance fees with direct deposit, contactless debit cards, and nationwide fee-free ATM access.",
                  perk: "Zero Minimum Opening Fee",
                },
                {
                  icon: TrendingUp,
                  title: "High-Yield Savings",
                  desc: "Put your money to work with market-competitive interest rates and automatic recurring savings tools.",
                  perk: "4.85% APY Eligible",
                },
                {
                  icon: Landmark,
                  title: "Home & Auto Lending",
                  desc: "Whether purchasing your first vehicle or finding the right mortgage, our lending specialists guide you transparently.",
                  perk: "Competitive Fixed Rates",
                },
                {
                  icon: CreditCard,
                  title: "Cashback Credit Cards",
                  desc: "Earn cash back on groceries, fuel, and online shopping with zero annual fees and robust fraud protection.",
                  perk: "1.5% - 3% Unlimited Cashback",
                },
                {
                  icon: ShieldCheck,
                  title: "Certificates of Deposit (CDs)",
                  desc: "Lock in guaranteed returns with terms from 6 months to 5 years designed to anchor your financial roadmap.",
                  perk: "Guaranteed Return Rate",
                },
                {
                  icon: Smartphone,
                  title: "Mobile Check Deposit",
                  desc: "Deposit checks in seconds through your smartphone camera with instant verification and real-time confirmations.",
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
                COMMERCIAL & ENTERPRISE
              </p>
              <h2
                id="business-heading"
                className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl"
              >
                Business Banking to Fuel Your Growth
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tailored financial solutions for small businesses, commercial operations, and
                organizations driving American industry.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: Building2,
                  title: "Commercial Checking",
                  desc: "Scalable accounts featuring tiered transaction allowances, wire transfers, and multi-user delegation.",
                },
                {
                  icon: DollarSign,
                  title: "Treasury Management",
                  desc: "Automated ACH payroll processing, cash concentration, and liquidity sweeps to optimize working capital.",
                },
                {
                  icon: CreditCard,
                  title: "Merchant Processing",
                  desc: "Accept card payments in-person and online with next-day settlement and transparent fee structures.",
                },
                {
                  icon: FileText,
                  title: "Lines of Credit & Loans",
                  desc: "Equipment financing, commercial real estate loans, and revolving working capital lines of credit.",
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
                  NEXT-GENERATION SECURITY
                </p>
                <h2
                  id="online-heading"
                  className="mt-2 font-display text-3xl font-bold sm:text-4xl text-white"
                >
                  Bank Anywhere with Uncompromising Protection
                </h2>
                <p className="mt-4 leading-relaxed text-white/80">
                  Manage accounts, initiate transfers, monitor credit health, and configure
                  real-time card security straight from your browser or mobile phone.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      title: "Continuous 256-Bit Cryptographic Shield",
                      desc: "Every data transmission is guarded by industry-grade encryption and automated intrusion detection.",
                    },
                    {
                      title: "Biometric & Multi-Factor Verification",
                      desc: "Hardware keys, authenticator apps, and biometric verification prevent unauthorized account access.",
                    },
                    {
                      title: "Instant Card Lock / Unlock Controls",
                      desc: "Misplaced your card? Freeze and unfreeze spending privileges instantly with one tap.",
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
                    Launch Online Banking
                  </Button>
                </div>
              </div>

              {/* Interactive Preview Mockup Card */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-white/60">
                    usfinancebank.secure-login
                  </span>
                </div>
                <div className="mt-6 space-y-4 text-xs">
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="text-white/70">Verified Account Snapshot</div>
                    <div className="mt-1 text-2xl font-bold text-white">$60,650.80 Total Balance</div>
                    <div className="mt-2 text-[0.7rem] text-emerald-400">
                      ✓ Direct Deposit Verified • Checking & Savings Connected
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-white/10 p-3 text-center">
                      <Send className="mx-auto h-5 w-5 text-accent" />
                      <div className="mt-1 font-bold text-white">Instant Wire</div>
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
                OUR COMMITMENT
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
                trustworthy banking services. We blend cutting-edge digital convenience with
                steadfast financial security, dedicated to elevating the economic well-being of
                our customers and American communities.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-border p-6 text-center">
                <Users className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-primary">Customer-First Principles</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Every account feature, rate improvement, and digital service is designed to
                  empower your financial clarity and progress.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6 text-center">
                <ShieldCheck className="mx-auto h-10 w-10 text-accent" />
                <h3 className="mt-4 text-lg font-bold text-primary">Uncompromising Security</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Proactive fraud monitoring and robust authentication protocols keep your assets
                  and personal records rigorously protected.
                </p>
              </div>

              <div className="rounded-xl border border-border p-6 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-primary">Financial Transparency</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Clear terms, plain-language disclosures, and transparent communication ensure
                  you can make financial decisions with certainty.
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
                  Have an inquiry or need assistance with your banking services? Connect with our
                  dedicated support specialists.
                </p>

                {/* Verified Contact Details Box */}
                <div className="mt-8 rounded-xl border border-border bg-white p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-primary">Verified Contact Channel</h3>
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
                    Inquiries sent via our online portal or referencing handle{" "}
                    <strong className="text-primary">@infobank</strong> are prioritized by our
                    member relations and operations desk.
                  </p>
                </div>

                <div className="mt-6 rounded-lg bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
                  <p className="font-semibold flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-700" />
                    Security Notice
                  </p>
                  <p className="mt-1 leading-relaxed">
                    US Finance Bank staff will never ask for your password, PIN, or one-time
                    verification codes via unencrypted email or unsolicited calls.
                  </p>
                </div>
              </div>

              {/* Functional Contact Form */}
              <div className="rounded-2xl border border-border bg-white p-7 shadow-sm">
                <h3 className="text-lg font-bold text-primary">Send an Inquiry to @infobank</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  We typically respond to verified inquiries within one business day.
                </p>

                {contactSuccess ? (
                  <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                    <h4 className="mt-3 text-base font-bold text-emerald-900">
                      Message Sent Successfully
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                      Thank you for contacting US Finance Bank. Your message has been logged under
                      ticket #{Math.floor(100000 + Math.random() * 900000)} for handle{" "}
                      <strong>@infobank</strong>.
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
                        placeholder="Inquiry regarding checking, loans, or online access"
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
                A modern digital banking experience designed to make managing your money simple,
                convenient, and accessible.
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
                    Business Accounts
                  </a>
                </li>
                <li>
                  <a href="#business" className="hover:text-white">
                    Treasury Solutions
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
                    onClick={() => setStaffModalOpen(true)}
                    className="hover:text-white flex items-center gap-1 text-white font-medium underline-offset-2 hover:underline"
                  >
                    <KeyRound className="h-3 w-3 text-accent" /> Staff Sign In
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setOpenAccountModalOpen(true)}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    Open an Account
                  </button>
                </li>
                <li>
                  <a href="#online-banking" className="hover:text-white">
                    Security Protocols
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold tracking-wider uppercase text-accent">Support</h4>
              <ul className="mt-3 space-y-2 text-xs text-white/80">
                <li>
                  <a href="#contact" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <span className="text-white/60">Verified Handle: @infobank</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/60">
            <p className="leading-relaxed">
              Official US Finance Bank portal. Contact handle: @infobank. Deposit insurance,
              licensing, and regulatory information will be displayed in full accordance with
              applicable laws before commercial product distribution. All rights reserved.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} USFinanceBank • US Finance Bank | Online Banking.
            </p>
          </div>
        </div>
      </footer>

      {/* CUSTOMER SIGN-IN MODAL */}
      {customerModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="customer-modal-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-border bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setCustomerModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h3 id="customer-modal-heading" className="text-lg font-bold text-primary">
                  Customer Sign In
                </h3>
                <p className="text-xs text-muted-foreground">US Finance Bank Online Banking</p>
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

            <form onSubmit={handleCustomerSignIn} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="customer-email"
                  className="block text-xs font-bold text-foreground"
                >
                  Email Address or Username
                </label>
                <input
                  id="customer-email"
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
                  <label
                    htmlFor="customer-pass"
                    className="block text-xs font-bold text-foreground"
                  >
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
                    id="customer-pass"
                    type={showCustomerPassword ? "text" : "password"}
                    required
                    value={customerLoginPassword}
                    onChange={(e) => setCustomerLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full rounded-md border border-input px-3.5 py-2 pr-10 text-sm focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCustomerPassword(!showCustomerPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showCustomerPassword ? "Hide password" : "Show password"}
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
                  id="remember-me"
                  type="checkbox"
                  checked={rememberCustomer}
                  onChange={(e) => setRememberCustomer(e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                />
                <label htmlFor="remember-me" className="text-xs text-muted-foreground">
                  Remember this device for faster sign-in
                </label>
              </div>

              <Button
                type="submit"
                disabled={customerAuthLoading}
                className="w-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                {customerAuthLoading ? "Authenticating..." : "Sign In to Account"}
              </Button>
            </form>

            <div className="mt-5 border-t border-border pt-4 text-center text-xs text-muted-foreground">
              Don't have an online banking account yet?{" "}
              <button
                type="button"
                onClick={() => {
                  setCustomerModalOpen(false);
                  setOpenAccountModalOpen(true);
                }}
                className="font-bold text-accent hover:underline"
              >
                Open an Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STAFF SIGN-IN PORTAL MODAL */}
      {staffModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="staff-modal-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl border border-navy-deep/20 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setStaffModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
              aria-label="Close staff modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-deep text-white">
                <KeyRound className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 id="staff-modal-heading" className="text-lg font-bold text-navy-deep">
                  Staff Sign-In Portal
                </h3>
                <p className="text-xs text-muted-foreground">
                  Authorized Personnel & Operations Only
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-md bg-amber-50 p-2.5 text-[0.7rem] leading-relaxed text-amber-800 border border-amber-200">
              Internal staff credentials required. Unauthorized access attempts are monitored and
              logged in accordance with federal security standards.
            </div>

            {staffAuthError && (
              <div
                role="alert"
                className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 p-2.5 text-xs text-red-700 border border-red-200"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{staffAuthError}</span>
              </div>
            )}

            <form onSubmit={handleStaffSignIn} className="mt-4 space-y-3.5">
              <div>
                <label htmlFor="staff-id" className="block text-xs font-bold text-foreground">
                  Staff Email or Employee ID
                </label>
                <input
                  id="staff-id"
                  type="text"
                  required
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="e.g. officer.johnson@usfinancebank.internal"
                  className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="staff-dept" className="block text-xs font-bold text-foreground">
                  Department / Assignment
                </label>
                <select
                  id="staff-dept"
                  value={staffDept}
                  onChange={(e) => setStaffDept(e.target.value)}
                  className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="Operations">Branch Operations</option>
                  <option value="Customer Relations">Member Relations (@infobank)</option>
                  <option value="Underwriting">Credit & Loan Underwriting</option>
                  <option value="Compliance">Security & Compliance</option>
                </select>
              </div>

              <div>
                <label htmlFor="staff-pass" className="block text-xs font-bold text-foreground">
                  Security Passphrase / Token
                </label>
                <div className="relative mt-1">
                  <input
                    id="staff-pass"
                    type={showStaffPassword ? "text" : "password"}
                    required
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                    placeholder="Enter assigned credentials"
                    className="w-full rounded-md border border-input px-3.5 py-2 pr-10 text-sm focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowStaffPassword(!showStaffPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showStaffPassword ? "Hide password" : "Show password"}
                  >
                    {showStaffPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={staffAuthLoading}
                className="w-full bg-navy-deep font-bold text-white hover:bg-navy-deep/90"
              >
                {staffAuthLoading ? "Verifying Credentials..." : "Access Staff Dashboard"}
              </Button>
            </form>

            <div className="mt-4 pt-3 border-t border-border text-center text-[0.72rem] text-muted-foreground">
              Forgot staff credentials? Contact the internal IT Security Helpdesk. Public
              self-registration is disabled.
            </div>
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

            <h3 className="text-lg font-bold text-primary">Reset Account Password</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter your verified email to receive a secure password recovery authorization code.
            </p>

            {resetSent ? (
              <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="mt-2 text-sm font-bold text-emerald-900">Recovery Email Dispatched</h4>
                <p className="mt-1 text-xs text-emerald-800">
                  Instructions have been sent to <strong>{resetEmail}</strong>. Please check your inbox
                  and follow the verification link.
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
                  <label htmlFor="reset-mail" className="block text-xs font-bold text-foreground">
                    Registered Email Address
                  </label>
                  <input
                    id="reset-mail"
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

      {/* OPEN ACCOUNT / REGISTRATION MODAL */}
      {openAccountModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg rounded-2xl border border-border bg-white p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setOpenAccountModalOpen(false);
                setRegSubmitted(false);
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
                <h3 className="text-lg font-bold text-primary">Open a US Finance Bank Account</h3>
                <p className="text-xs text-muted-foreground">
                  Safe, quick, and transparent account opening
                </p>
              </div>
            </div>

            {regSubmitted ? (
              <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                <h4 className="mt-3 text-base font-bold text-emerald-900">
                  Application Logged Successfully
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-emerald-800">
                  Thank you, <strong>{regName}</strong>. Your membership application for{" "}
                  <strong>{regType}</strong> has been assigned reference #
                  {Math.floor(100000 + Math.random() * 900000)}. A confirmation has been routed to{" "}
                  {regEmail}.
                </p>
                <Button
                  size="sm"
                  onClick={() => {
                    setOpenAccountModalOpen(false);
                    setCustomerUser(regName.split(" ")[0] || "Customer");
                  }}
                  className="mt-4 bg-primary text-white"
                >
                  Enter Online Banking Dashboard
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!regName || !regEmail) return;
                  setRegSubmitted(true);
                }}
                className="mt-5 space-y-4"
              >
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-bold text-foreground">
                    Legal Full Name
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Michael Robert Anderson"
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
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="michael@example.com"
                    className="mt-1 w-full rounded-md border border-input px-3.5 py-2 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="reg-type" className="block text-xs font-bold text-foreground">
                    Account Type Requested
                  </label>
                  <select
                    id="reg-type"
                    value={regType}
                    onChange={(e) => setRegType(e.target.value)}
                    className="mt-1 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Advantage Checking & Savings">
                      Personal Checking & High-Yield Savings
                    </option>
                    <option value="Commercial Business Checking">
                      Commercial Business Checking
                    </option>
                    <option value="Certificate of Deposit">Certificate of Deposit (CD)</option>
                  </select>
                </div>

                <div className="rounded-lg bg-secondary/70 p-3 text-xs text-muted-foreground leading-relaxed">
                  By submitting this form, you acknowledge that accounts will be provisioned in
                  accordance with standard customer identification policies (USA PATRIOT Act).
                </div>

                <Button type="submit" className="w-full bg-accent text-accent-foreground font-bold">
                  Submit Membership Application
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
