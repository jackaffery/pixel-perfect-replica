import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SoloAdminDashboard } from "@/components/admin/SoloAdminDashboard";
import { ShieldCheck, Lock, Eye, EyeOff, Building2, SlidersHorizontal, ArrowLeft, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/staff")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Staff Sign In | Solo Admin Portal | West Side Financial Institution" },
      { name: "description", content: "Dedicated Solo Staff Administrator portal for West Side Financial Institution." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: StaffPortalPage,
});

function StaffPortalPage() {
  const [soloAdminUser, setSoloAdminUser] = useState<{
    username: string;
    role: string;
    authenticatedAt: string;
  } | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("westside_active_solo_admin_session");
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return null;
  });

  const [adminUsername, setAdminUsername] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (!adminUsername.trim() || !adminPassword.trim()) {
      setAuthError("Solo administrator credentials are required.");
      return;
    }

    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      const session = {
        username: adminUsername.trim() === "admin" ? "Master Solo Administrator" : adminUsername.trim(),
        role: "Root Solo Authority",
        authenticatedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("westside_active_solo_admin_session", JSON.stringify(session));
        } catch {}
      }
      setSoloAdminUser(session);
    }, 600);
  };

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("westside_active_solo_admin_session");
      } catch {}
    }
    setSoloAdminUser(null);
  };

  const handle1ClickLaunch = () => {
    const session = {
      username: "Master Solo Administrator",
      role: "Root Solo Authority",
      authenticatedAt: "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("westside_active_solo_admin_session", JSON.stringify(session));
      } catch {}
    }
    setSoloAdminUser(session);
  };

  // If authenticated, render the complete Solo Admin Dashboard
  if (soloAdminUser) {
    return (
      <SoloAdminDashboard
        onSignOut={handleSignOut}
        adminUsername={soloAdminUser.username}
        onOpenCustomerDashboard={() => {
          window.location.href = "/account";
        }}
      />
    );
  }

  // Otherwise, render the dedicated Staff Sign In screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003882] via-[#0055b8] to-[#0066d6] flex flex-col justify-between text-white font-sans p-4 sm:p-6">
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4">
        <a href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-xs font-semibold">
          <ArrowLeft className="h-4 w-4" /> Return to Public Bank Home
        </a>
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Tier-1 Encrypted Solo Terminal</span>
        </div>
      </header>

      {/* Main Sign-In Card */}
      <main className="max-w-md w-full mx-auto my-auto bg-slate-900/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e60028] text-white shadow-lg shadow-red-600/30 mb-4">
            <SlidersHorizontal className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-black text-white">Staff Sign In</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mt-1">Solo Administrator Console</p>
          <p className="text-xs text-slate-300 mt-2">
            Centralized root authority to control all customer users, balances, applications, and security.
          </p>
        </div>

        {/* 1-Click Fast Launch Option */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handle1ClickLaunch}
            className="w-full rounded-xl bg-gradient-to-r from-red-600 to-[#e60028] hover:from-red-500 hover:to-red-600 p-3 text-xs font-black text-white shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span>✨ 1-Click Instant Solo Admin Launch</span>
          </button>
        </div>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900 px-3 text-slate-400">or sign in with credentials</span>
          </div>
        </div>

        {authError && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-500/20 border border-rose-500/40 p-3 text-xs text-rose-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Solo Administrator Identifier
            </label>
            <input
              type="text"
              required
              value={adminUsername}
              onChange={(e) => setAdminUsername(e.target.value)}
              placeholder="e.g. admin or admin@westsidebank.online"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#0066d6] focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-200">
                Master Passphrase
              </label>
              <button
                type="button"
                onClick={() => {
                  setAdminUsername("admin");
                  setAdminPassword("admin");
                }}
                className="text-[0.68rem] text-blue-400 hover:underline"
              >
                Auto-fill (admin/admin)
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin passphrase"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 pr-10 text-sm text-white placeholder-slate-500 focus:border-[#0066d6] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={authLoading}
            className="w-full bg-[#0066d6] hover:bg-[#0055b8] text-white font-extrabold py-3 rounded-xl shadow-lg shadow-blue-600/30 text-sm transition-all"
          >
            {authLoading ? "Authenticating Authority..." : "Sign In to Solo Admin Console"}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[0.7rem] text-slate-400">
          West Side Financial Institution • Central Administrator Governance
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-xs text-white/60">
        &copy; {new Date().getFullYear()} West Side Financial Institution. All rights reserved. Authorized staff only.
      </footer>
    </div>
  );
}
