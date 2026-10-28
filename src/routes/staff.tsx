import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SoloAdminDashboard } from "@/components/admin/SoloAdminDashboard";
import { ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/staff")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Demo Admin Workspace | West Side Financial Institution" },
    { name: "description", content: "Fictional solo administrator workspace. No real banking, credentials, or customer information." },
    { property: "og:title", content: "West Side Financial Institution — Demo Admin" },
    { property: "og:description", content: "Explore administrative workflows with fictional examples only." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: StaffPortalPage,
});
function StaffPortalPage() {
  const [opened, setOpened] = useState(false);
  if (opened) return <SoloAdminDashboard onSignOut={() => setOpened(false)} />;
  return <div className="min-h-screen bg-background text-foreground">
    <div className="bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground">Demo — not a real bank. Fictional examples only.</div>
    <header className="mx-auto max-w-5xl px-6 py-6"><Button variant="ghost" asChild><Link to="/"><ArrowLeft />Return home</Link></Button></header>
    <main className="mx-auto max-w-xl px-6 py-16">
      <ShieldCheck className="mb-6 size-12 text-primary" />
      <p className="mb-3 text-sm text-muted-foreground">West Side Financial Institution</p>
      <h1 className="font-display text-3xl font-bold">Solo Admin Demo</h1>
      <p className="mt-5 text-muted-foreground">This workspace contains made-up customers and example balances. It does not require a password, send messages, connect to government services, or move money.</p>
      <p className="mt-3 text-sm text-muted-foreground">Demo changes stay in this browser tab until you close it or reset the examples.</p>
      <Button size="lg" className="mt-8" onClick={() => setOpened(true)}>Open demo workspace<ArrowRight /></Button>
    </main>
  </div>;
}
