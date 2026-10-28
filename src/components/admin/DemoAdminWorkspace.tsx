import { useEffect, useState } from "react";
import type { SoloAdminDashboardProps } from "./SoloAdminDashboard";
import { Activity, ArrowDownToLine, ArrowUpRight, Bell, Check, Download, Eye, FilePlus2, History, LogOut, Menu, Pencil, Plus, Search, ShieldCheck, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { csvReport, demoReducer, initialDemoState, makeRecord, sections, statuses, type DemoRecord, type DemoState, type RecordSection, type Section } from "./demoAdminModel";

const storageKey = "westside_isolated_demo_workspace_v1";
const fieldClass = "w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";
const amountLabel = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD" });
const now = () => new Date().toISOString();
function download(content: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid min-w-0 gap-1.5 text-sm font-medium">{label}{children}</label>;
}
export function DemoAdminWorkspace({ onSignOut }: SoloAdminDashboardProps) {
  const [state] = useState(initialDemoState);
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<Section>("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<DemoRecord | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reason, setReason] = useState("");
  const [adjustAmount, setAdjustAmount] = useState("");
  const [operation, setOperation] = useState<"credit" | "debit">("credit");
  const [note, setNote] = useState("");
  const [settingsDraft, setSettingsDraft] = useState(state.settings);
  const [resetOpen, setResetOpen] = useState(false);
  const [actionStatus, setActionStatus] = useState("");
  // Temporary demo state only; no public customer storage or external requests.
  const [restored, setRestored] = useState<DemoState | null>(null);
  const working = restored ?? state;
  const send = (action: Parameters<typeof demoReducer>[1]) => {
    const next = demoReducer(working, action);
    if (next === working) { setError("Action not applied. Check the example amount, available balance, status, and required reason."); return false; }
    setRestored(next); setError(""); setNotice("Demo change saved. No real accounts, money, or messages affected."); return true;
  };
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as DemoState;
        if (parsed.demoOnly === true && Array.isArray(parsed.records) && Array.isArray(parsed.audit) && parsed.records.every(r => r.id.startsWith("DEMO-") && r.email.endsWith(".invalid"))) { setRestored(parsed); setSettingsDraft(parsed.settings); }
      }
    } catch { setNotice("Temporary demo data could not be restored; fresh examples are loaded."); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { sessionStorage.setItem(storageKey, JSON.stringify(working)); } catch { setNotice("Browser storage is unavailable. Changes last until you leave this screen."); }
  }, [working, ready]);
  const selected = working.records.find(r => r.id === selectedId);
  const isRecords = section in statuses;
  const recordSection = isRecords ? section as RecordSection : null;
  const rows = working.records.filter(r => r.section === section && (filter === "all" || r.status === filter) && `${r.name} ${r.email} ${r.id} ${r.detail}`.toLowerCase().includes(search.toLowerCase()));
  const go = (next: Section) => { setSection(next); setSearch(""); setFilter("all"); setMenuOpen(false); setSelectedId(null); };
  const open = (record: DemoRecord) => { setSelectedId(record.id); setReason(""); setNote(""); setError(""); setActionStatus(record.status); };
  const exportRows = (all = false) => { download(csvReport(working, all ? undefined : section), `west-side-demo-${all ? "report" : section.toLowerCase().replaceAll(" ", "-")}.csv`); send({ type: "log", section: "Reports", action: "Downloaded fictional CSV", at: now() }); };
  const balance = working.records.filter(r => r.section === "Accounts").reduce((sum, r) => sum + r.amount, 0);
  const count = (s: Section) => working.records.filter(r => r.section === s).length;
  const saveDraft = (e: React.FormEvent) => {
    e.preventDefault(); if (!draft) return;
    if (!draft.email.endsWith(".invalid")) { setError("Use a fictional email ending in .invalid, such as alex@example.invalid."); return; }
    if (send({ type: "save", record: draft, at: now() })) { setDraft(null); open(draft); }
  };
  return <div className="min-h-screen bg-background font-sans text-foreground">
    <div className="border-b border-accent bg-accent px-4 py-3 text-center text-sm font-semibold text-accent-foreground">Demo — not a real bank. Fictional customers and example money only. No email delivery or government connection.</div>
    <div className="flex min-h-screen">
      {menuOpen && <div className="fixed inset-0 z-30 bg-foreground/40 lg:hidden" onClick={() => setMenuOpen(false)} />}
      <aside className={`${menuOpen ? "fixed inset-y-0 left-0 z-40 flex" : "hidden"} w-60 shrink-0 flex-col border-r border-border bg-card lg:sticky lg:top-0 lg:flex lg:h-screen`}>
        <div className="border-b border-border p-5"><ShieldCheck className="mb-3 size-7 text-primary" /><p className="font-semibold">West Side</p><p className="text-xs text-muted-foreground">Financial Institution · Demo</p></div>
        <nav aria-label="Admin sections" className="flex-1 overflow-y-auto p-3">{sections.map(s => <Button key={s} variant={section === s ? "secondary" : "ghost"} onClick={() => go(s)} className="mb-1 w-full justify-between"><span>{s}</span>{s in statuses && <span className="text-xs text-muted-foreground">{count(s)}</span>}</Button>)}</nav>
        <Button variant="ghost" className="m-3 justify-start" onClick={onSignOut}><LogOut />Leave demo</Button>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-card px-4 py-4 sm:px-8">
          <div className="flex items-center gap-3"><Button variant="ghost" size="icon" aria-label="Open admin menu" className="lg:hidden" onClick={() => setMenuOpen(true)}><Menu /></Button><div><h1 className="text-xl font-semibold">Solo Admin Workspace</h1><p className="text-xs text-muted-foreground">{working.settings.name}</p></div></div>
          <div className="flex items-center gap-1"><Button variant="ghost" size="icon" title="View demo activity" aria-label="View demo activity" onClick={() => go("Audit")}><Bell /></Button><Button variant="outline" onClick={onSignOut}><LogOut />Exit</Button></div>
        </header>
        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
          {notice && working.settings.notifications && <div role="status" className="flex items-start justify-between gap-3 rounded-md border border-border bg-secondary p-3 text-sm"><span>{notice}</span><Button size="icon" variant="ghost" className="size-6 shrink-0" aria-label="Dismiss notification" onClick={() => setNotice("")}><X /></Button></div>}
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-display text-2xl font-bold">{section}</h2><div className="flex flex-wrap gap-2">{recordSection && <Button onClick={() => { const id = `DEMO-${Date.now()}-${working.records.length}`; setDraft(makeRecord(recordSection, id, working.records.find(r => r.section === "Customers")?.customerId ?? `DEMO-CUSTOMER-${Date.now()}`, now())); setError(""); }}><Plus />Add example</Button>}{(isRecords || section === "Reports" || section === "Audit") && <Button variant="outline" onClick={() => section === "Audit" ? download(["Demo audit only", "Time,Section,Action,Target", ...working.audit.map(a => [a.at, a.section, a.action, a.target].map(v => JSON.stringify(v)).join(","))].join("\n"), "demo-audit.csv") : exportRows(section === "Reports")}><Download />Export CSV</Button>}</div></div>
          {(section === "Overview" || section === "Reports") && <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[["Fictional customers", count("Customers")], ["Example account balances", amountLabel(balance)], ["Pending reviews", working.records.filter(r => ["Pending", "Pending Review", "Under Review", "Flagged"].includes(r.status)).length], ["Open support cases", working.records.filter(r => r.section === "Support" && !["Closed", "Resolved"].includes(r.status)).length]].map(([label, value]) => <div key={label} className="rounded-md border border-border bg-card p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-3 text-2xl font-semibold">{value}</p></div>)}</div>
            <div className="grid gap-8 xl:grid-cols-2"><section><h3 className="mb-4 font-semibold">Work queues</h3><div className="divide-y divide-border border-y border-border">{(["Applications", "Deposits", "Loans", "Compliance", "Support"] as const).map(s => <Button key={s} variant="ghost" className="h-12 w-full justify-between rounded-none" onClick={() => go(s)}><span>{s}</span><span>{count(s)} examples · View →</span></Button>)}</div></section><section><h3 className="mb-4 font-semibold">Recent activity</h3>{working.audit.length ? <ul className="divide-y divide-border">{working.audit.slice(0, 6).map(a => <li key={a.id} className="py-3 text-sm"><p>{a.action}</p><p className="mt-1 text-xs text-muted-foreground">{a.section} · {new Date(a.at).toLocaleString()}</p></li>)}</ul> : <div className="border-y border-border py-8 text-sm text-muted-foreground">No demo changes yet.</div>}</section></div>
          </>}
          {recordSection && <>
            <div className="flex flex-wrap gap-3"><label className="relative min-w-48 flex-1"><span className="sr-only">Search records</span><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><input aria-label="Search records" className={`${fieldClass} pl-9`} value={search} onChange={e => setSearch(e.target.value)} placeholder="Search examples" /></label><select aria-label="Filter status" className={`${fieldClass} sm:w-48`} value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All statuses</option>{statuses[recordSection].map(s => <option key={s}>{s}</option>)}</select></div>
            <div className="overflow-x-auto border-y border-border"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-muted text-xs text-muted-foreground"><tr>{["Example record", "Customer", "Status", "Example amount / limit", ""].map((h, i) => <th key={i} className="p-3 font-medium">{h}</th>)}</tr></thead><tbody className="divide-y divide-border">{rows.map(r => <tr key={r.id}><td className="p-3"><p className="font-medium">{r.detail}</p><p className="max-w-60 truncate text-xs text-muted-foreground" title={r.id}>{r.id}</p></td><td className="p-3"><p>{r.name}</p><p className="text-xs text-muted-foreground">{r.email}</p></td><td className="p-3"><span className="rounded-md bg-secondary px-2 py-1 text-xs">{r.status}</span></td><td className="p-3 tabular-nums">{amountLabel(r.section === "Cards" ? r.limit : r.amount)}</td><td className="p-3"><Button size="sm" variant="outline" onClick={() => open(r)}><Eye />Open</Button></td></tr>)}</tbody></table>{!rows.length && <div className="p-10 text-center text-sm text-muted-foreground">No matching examples.</div>}</div>
          </>}
          {section === "Audit" && <div className="divide-y divide-border border-y border-border">{working.audit.map(a => <div key={a.id} className="py-4"><p className="text-sm font-medium">{a.action}</p><p className="break-all text-xs text-muted-foreground">{a.section} · {a.target} · {new Date(a.at).toLocaleString()}</p></div>)}{!working.audit.length && <p className="py-8 text-muted-foreground">No demo actions recorded.</p>}</div>}
          {section === "Settings" && <form className="max-w-xl space-y-5" onSubmit={e => { e.preventDefault(); send({ type: "settings", settings: settingsDraft, at: now() }); }}><Field label="Demo administrator display name"><input className={fieldClass} value={settingsDraft.name} onChange={e => setSettingsDraft({ ...settingsDraft, name: e.target.value })} required /></Field><label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={settingsDraft.notifications} onChange={e => setSettingsDraft({ ...settingsDraft, notifications: e.target.checked })} />Show demo action notifications</label><Button type="submit"><Check />Save preferences</Button><div className="border-t border-border pt-6"><Button type="button" variant="destructive" onClick={() => setResetOpen(true)}><Trash2 />Reset demo data</Button></div></form>}
        </main>
      </div>
    </div>
    <Dialog open={Boolean(selected)} onOpenChange={v => { if (!v) setSelectedId(null); }}><DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto"><DialogTitle>{selected?.section} · Demo record</DialogTitle><DialogDescription>Fictional example only. No real money, sign-in changes, messages, cards, or tax services.</DialogDescription>{selected && <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{selected.name}</h3><p className="break-all text-sm text-muted-foreground">{selected.email}</p><p className="text-sm">{selected.status} · {amountLabel(selected.amount)}</p></div><Button variant="outline" disabled={selected.posted} onClick={() => { setDraft({ ...selected }); setSelectedId(null); setError(""); }}><Pencil />Edit</Button></div>
      <p className="text-sm">{selected.detail}</p>
      {selected.section === "Cards" && <div className="rounded-md bg-secondary p-4"><p className="text-xs text-muted-foreground">NON-PAYMENT DEMO CARD</p><p className="mt-2 font-mono">DEMO · •••• · {selected.id.slice(-4)}</p><p className="mt-2 text-sm">Example spending limit {amountLabel(selected.limit)}</p></div>}
      {!selected.posted && <div className="grid gap-3 border-t border-border pt-4"><Field label="Action reason (fictional)"><input className={fieldClass} value={reason} onChange={e => setReason(e.target.value)} /></Field><div className="flex flex-wrap gap-2"><select aria-label="New status" className={`${fieldClass} sm:w-48`} value={actionStatus} onChange={e => setActionStatus(e.target.value)}>{statuses[selected.section].map(s => <option key={s}>{s}</option>)}</select><Button onClick={() => send({ type: "status", id: selected.id, status: actionStatus, reason, at: now() })}><Check />Apply status</Button></div><Button variant="destructive" className="w-fit" disabled={!reason.trim()} onClick={() => { if (send({ type: "delete", id: selected.id, reason, at: now() })) setSelectedId(null); }}><Trash2 />Delete example</Button></div>}
      {selected.posted && <p className="text-sm text-muted-foreground">Posted example entries are locked to prevent duplicate settlement.</p>}
      {selected.section === "Accounts" && <div className="grid gap-3 border-t border-border pt-4"><h4 className="font-semibold">Adjust example balance</h4><div className="grid gap-3 sm:grid-cols-2"><Field label="Example amount"><input className={fieldClass} type="number" min="0.01" step="0.01" value={adjustAmount} onChange={e => setAdjustAmount(e.target.value)} /></Field><Field label="Direction"><select className={fieldClass} value={operation} onChange={e => setOperation(e.target.value as "credit" | "debit")}><option value="credit">Credit</option><option value="debit">Debit</option></select></Field></div><Button className="w-fit" onClick={() => send({ type: "adjust", id: selected.id, amount: Number(adjustAmount), direction: operation, reason, at: now() })}>{operation === "credit" ? <ArrowDownToLine /> : <ArrowUpRight />}Apply example adjustment</Button></div>}
      {selected.section === "Users" && <div className="space-y-3 border-t border-border pt-4"><h4 className="font-semibold">Simulated access & security</h4><p className="text-sm">{selected.sessions} example sessions · Reset {selected.resetRequired ? "required" : "not required"} · Two-factor {selected.twoFactor ? "on" : "off"}</p><div className="flex flex-wrap gap-2">{(["revoke", "reset", "twoFactor"] as const).map(op => <Button key={op} variant="outline" onClick={() => send({ type: "security", id: selected.id, operation: op, at: now() })}>{op === "revoke" ? "Revoke demo sessions" : op === "reset" ? "Flag demo reset" : "Toggle demo two-factor"}</Button>)}<Button variant="outline" onClick={() => { send({ type: "log", section: "Users", action: `Inspected demo profile ${selected.id}`, at: now() }); setNotice(`Demo profile: ${selected.name}. Linked examples remain in this workspace.`); }}><Eye />Inspect demo profile</Button></div></div>}
      <div className="space-y-3 border-t border-border pt-4"><h4 className="font-semibold">{selected.section === "Support" ? "Demo conversation" : "Notes & activity"}</h4>{selected.notes.map((n, i) => <p key={i} className="break-words rounded-md bg-muted p-3 text-sm">{n}</p>)}<Field label={selected.section === "Support" ? "Fictional reply" : "Internal demo note"}><textarea rows={3} className={fieldClass} value={note} onChange={e => setNote(e.target.value)} /></Field><Button variant="outline" onClick={() => { if (send({ type: "note", id: selected.id, text: note, at: now() })) setNote(""); }}><Plus />{selected.section === "Support" ? "Save simulated reply" : "Add note"}</Button></div>
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    </div>}</DialogContent></Dialog>
    <Dialog open={Boolean(draft)} onOpenChange={v => { if (!v) setDraft(null); }}><DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto"><DialogTitle>{draft && working.records.some(r => r.id === draft.id) ? "Edit" : "Add"} fictional {draft?.section.toLowerCase()} example</DialogTitle><DialogDescription>Use made-up names and .invalid emails only. Do not enter personal information or credentials.</DialogDescription>{draft && <form onSubmit={saveDraft} className="space-y-4"><Field label="Fictional customer name"><input className={fieldClass} required value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} /></Field><Field label="Fictional email (.invalid only)"><input className={fieldClass} required type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} /></Field><Field label="Linked example customer"><select className={fieldClass} value={draft.customerId} onChange={e => setDraft({ ...draft, customerId: e.target.value })}><option value={draft.customerId}>{draft.customerId}</option>{working.records.filter(r => r.section === "Customers" && r.customerId !== draft.customerId).map(r => <option key={r.id} value={r.customerId}>{r.name} · {r.customerId}</option>)}</select></Field><Field label="Status"><select className={fieldClass} value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value })}>{statuses[draft.section].filter(s => !["Completed", "Simulated sent"].includes(s)).map(s => <option key={s}>{s}</option>)}</select></Field><div className="grid grid-cols-2 gap-3"><Field label="Example amount"><input className={fieldClass} type="number" min="0" step="0.01" required value={draft.amount} onChange={e => setDraft({ ...draft, amount: Number(e.target.value) })} /></Field><Field label="Example limit"><input className={fieldClass} type="number" min="0" step="0.01" required value={draft.limit} onChange={e => setDraft({ ...draft, limit: Number(e.target.value) })} /></Field></div><Field label="Description / fictional message"><textarea className={fieldClass} value={draft.detail} onChange={e => setDraft({ ...draft, detail: e.target.value })} /></Field><Field label="Example transaction direction"><select className={fieldClass} value={draft.direction} onChange={e => setDraft({ ...draft, direction: e.target.value as "credit" | "debit" })}><option value="credit">Credit</option><option value="debit">Debit</option></select></Field>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit"><Check />Save example</Button></form>}</DialogContent></Dialog>
    <Dialog open={resetOpen} onOpenChange={setResetOpen}><DialogContent><DialogTitle>Reset all demo examples?</DialogTitle><DialogDescription>This discards this tab’s fictional changes and activity history, then restores the starter examples.</DialogDescription><Button variant="destructive" onClick={() => { const fresh = initialDemoState(); setRestored(fresh); setSettingsDraft(fresh.settings); setResetOpen(false); setNotice("Fresh fictional examples restored."); }}><Trash2 />Reset demo</Button></DialogContent></Dialog>
  </div>;
}