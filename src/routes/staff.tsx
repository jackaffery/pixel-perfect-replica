import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SoloAdminDashboard } from "@/components/admin/SoloAdminDashboard";
import { ShieldCheck, ArrowLeft, ArrowRight, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/staff")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Staff Sign In | West Side Financial Institution" },
      { name: "description", content: "Solo Administrator Management Portal for West Side Financial Institution." },
      { property: "og:title", content: "West Side Financial Institution — Staff Sign In" },
      { property: "og:description", content: "Staff Sign In and Administrative Console." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StaffPortalPage,
});

function StaffPortalPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("westside_active_solo_admin_session");
        return !!saved;
      } catch {}
    }
    return false;
  });

  const [username, setUsername] = useState("Admin123");
  const [password, setPassword] = useState("Admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError("Please enter both staff username and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      // Support Admin123 / Admin123 as requested (as well as admin/admin)
      const isValid =
        (cleanUsername.toLowerCase() === "admin123" && cleanPassword === "Admin123") ||
        (cleanUsername.toLowerCase() === "admin" && cleanPassword.toLowerCase() === "admin");

      if (!isValid) {
        setError("Invalid staff credentials. Expected username: Admin123, password: Admin123");
        return;
      }

      const adminSession = {
        username: cleanUsername,
        role: "Root Solo Authority",
        authenticatedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("westside_active_solo_admin_session", JSON.stringify(adminSession));
        } catch {}
      }

      setAuthenticated(true);
    }, 400);
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("westside_active_solo_admin_session");
      } catch {}
    }
    setAuthenticated(false);
  };

  if (authenticated) {
    return <SoloAdminDashboard onSignOut={handleSignOut} adminUsername={username || "Admin123"} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="w-full bg-[#0055b8] text-white py-4 px-6 shadow-md border-b border-blue-800">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white shadow-inner">
              <ShieldCheck className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <span className="text-[0.68rem] uppercase tracking-widest font-black text-blue-200 block">
                West Side Financial Institution
              </span>
              <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                Staff Administration Terminal
              </h2>
            </div>
          </div>

          <Button variant="ghost" asChild className="text-white hover:bg-white/10 text-xs font-semibold">
            <Link to="/">
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Return home
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Login Form Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-200">
          <div className="bg-slate-900 px-6 py-5 text-white flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider font-extrabold text-red-400 block">
                Authorized Personnel Only
              </span>
              <h1 className="text-lg font-bold text-white">Staff Sign In</h1>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Instruction Notice with exact requested credentials */}
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-3.5 text-xs text-blue-900 space-y-1">
              <p className="font-bold">Staff Access Credentials</p>
              <p className="text-[0.75rem] text-blue-800">
                Please enter your administrator username and password to access the management dashboard:
              </p>
              <div className="pt-1 flex items-center gap-3 font-mono text-[0.75rem] bg-white border border-blue-200 rounded-lg p-2 text-slate-800">
                <span>Username: <strong className="text-[#0055b8]">Admin123</strong></span>
                <span className="text-slate-300">|</span>
                <span>Password: <strong className="text-[#0055b8]">Admin123</strong></span>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-700"
              >
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="staff-user" className="block text-xs font-bold text-slate-800 mb-1">
                  Username
                </label>
                <input
                  id="staff-user"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin123"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-medium focus:border-[#0055b8] focus:ring-1 focus:ring-[#0055b8] outline-none"
                />
              </div>

              <div>
                <label htmlFor="staff-pass" className="block text-xs font-bold text-slate-800 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="staff-pass"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Admin123"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 pr-10 text-sm font-medium focus:border-[#0055b8] focus:ring-1 focus:ring-[#0055b8] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0055b8] hover:bg-blue-700 text-white font-bold py-3 text-sm shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
              >
                {loading ? "Authenticating..." : "Sign In to Admin Workspace"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
