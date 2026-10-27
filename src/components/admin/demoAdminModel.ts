export const sections = ["Overview", "Users", "Applications", "Customers", "Accounts", "Transactions", "Compliance", "Deposits", "Loans", "Cards", "IRS Refunds", "Email Services", "Support", "Reports", "Audit", "Settings"] as const;
export type Section = typeof sections[number];
export type RecordSection = Exclude<Section, "Overview" | "Reports" | "Audit" | "Settings">;
export interface DemoRecord {
  id: string;
  section: RecordSection;
  customerId: string;
  name: string;
  email: string;
  status: string;
  amount: number;
  limit: number;
  detail: string;
  notes: string[];
  sessions: number;
  resetRequired: boolean;
  twoFactor: boolean;
  direction: "credit" | "debit";
  createdAt: string;
  posted: boolean;
}
export interface DemoState {
  demoOnly: true;
  records: DemoRecord[];
  audit: { id: string; at: string; section: Section; action: string; target: string }[];
  settings: { name: string; notifications: boolean; timeout: number };
}
export const statuses: Record<RecordSection, string[]> = {
  Users: ["Active", "Suspended", "Closed", "Dormant"], Customers: ["Active", "Restricted", "Suspended", "Frozen"],
  Applications: ["Pending", "Under Review", "Approved", "Declined"], Accounts: ["Active", "Frozen", "Dormant", "Under Review"],
  Transactions: ["Processing", "On hold", "Completed", "Flagged", "Blocked", "Resolved"], Compliance: ["Pending Review", "In Review", "Approved", "Escalated", "Dismissed"],
  Deposits: ["Pending", "On hold", "Completed", "Rejected"], Loans: ["Pending", "Under Review", "Approved", "Declined"],
  Cards: ["Active", "Frozen", "Cancelled"], "IRS Refunds": ["Pending", "On hold", "Completed", "Rejected"],
  "Email Services": ["Draft", "Simulated sent", "Cancelled"], Support: ["Open", "In Progress", "Pending Customer", "Resolved", "Closed"],
};
export function makeRecord(section: RecordSection, id: string, customerId: string, at: string): DemoRecord {
  return { id, section, customerId, name: "Example Customer", email: "customer@example.invalid", status: statuses[section][0] ?? "Pending", amount: 0, limit: 1000, detail: "Fictional example", notes: [], sessions: 0, resetRequired: false, twoFactor: false, direction: "credit", createdAt: at, posted: false };
}
export function initialDemoState(): DemoState {
  const at = "2026-10-27T12:00:00.000Z";
  const records: DemoRecord[] = [];
  for (const section of Object.keys(statuses) as RecordSection[]) {
    const record = makeRecord(section, `DEMO-${section.replace(/\s/g, "").toUpperCase()}-1`, "DEMO-CUSTOMER-1", at);
    record.amount = section === "Accounts" ? 2500 : ["Transactions", "Deposits", "Loans", "IRS Refunds"].includes(section) ? 100 : 0;
    record.detail = section === "Accounts" ? "Checking" : section === "Support" ? "Example access question" : section === "Email Services" ? "Example welcome message — no delivery" : "Fictional example";
    records.push(record);
  }
  return { demoOnly: true, records, audit: [], settings: { name: "Solo Demo Administrator", notifications: true, timeout: 30 } };
}
export type DemoAction =
  | { type: "save"; record: DemoRecord; at: string }
  | { type: "delete"; id: string; reason: string; at: string }
  | { type: "status"; id: string; status: string; reason: string; at: string }
  | { type: "note"; id: string; text: string; at: string }
  | { type: "security"; id: string; operation: "revoke" | "reset" | "twoFactor"; at: string }
  | { type: "adjust"; id: string; amount: number; direction: "credit" | "debit"; reason: string; at: string }
  | { type: "settings"; settings: DemoState["settings"]; at: string }
  | { type: "log"; section: Section; action: string; at: string };
function validEmail(email: string) { return /^[^\s@]+@[^\s@]+\.invalid$/i.test(email); }
function money(value: number) { return Math.round(value * 100) / 100; }
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  let records = state.records;
  let settings = state.settings;
  let section: Section = "Settings";
  let description = "";
  let target = "";
  if (action.type === "save") {
    const record = action.record;
    if (!record.id.startsWith("DEMO-") || !record.customerId.startsWith("DEMO-") || !validEmail(record.email) || !record.name.trim() || !Number.isFinite(record.amount) || record.amount < 0 || !Number.isFinite(record.limit) || record.limit < 0 || !statuses[record.section].includes(record.status)) return state;
    if (records.some(r => r.id === record.id && r.posted)) return state;
    records = records.some(r => r.id === record.id) ? records.map(r => r.id === record.id ? { ...record, amount: money(record.amount) } : r) : [...records, { ...record, amount: money(record.amount) }];
    section = record.section; target = record.id; description = "Saved demo record";
  } else if (action.type === "settings") {
    if (!action.settings.name.trim() || !Number.isFinite(action.settings.timeout) || action.settings.timeout < 1) return state;
    settings = action.settings; description = "Saved demo preferences";
  } else if (action.type === "log") {
    section = action.section; description = action.action;
  } else {
    const record = records.find(r => r.id === action.id);
    if (!record) return state;
    section = record.section; target = record.id;
    if (action.type === "delete") {
      if (!action.reason.trim() || record.posted) return state;
      records = records.filter(r => r.id !== record.id);
      if (record.section === "Customers") records = records.filter(r => r.customerId !== record.customerId);
      description = `Deleted demo record: ${action.reason}`;
    } else if (action.type === "note") {
      if (!action.text.trim()) return state;
      records = records.map(r => r.id === record.id ? { ...r, notes: [...r.notes, action.text.trim()] } : r);
      description = "Added demo note / reply";
    } else if (action.type === "security") {
      records = records.map(r => r.id === record.id ? { ...r, sessions: action.operation === "twoFactor" ? r.sessions : 0, resetRequired: action.operation === "reset" ? true : r.resetRequired, twoFactor: action.operation === "twoFactor" ? !r.twoFactor : r.twoFactor } : r);
      description = `Simulated security action: ${action.operation}`;
    } else if (action.type === "adjust") {
      if (record.section !== "Accounts" || record.status !== "Active" || !Number.isFinite(action.amount) || action.amount <= 0 || !action.reason.trim()) return state;
      const delta = money(action.amount) * (action.direction === "credit" ? 1 : -1);
      if (record.amount + delta < 0) return state;
      records = records.map(r => r.id === record.id ? { ...r, amount: money(r.amount + delta) } : r);
      const tx = makeRecord("Transactions", `DEMO-TX-${action.at}-${state.audit.length}`, record.customerId, action.at);
      records = [...records, { ...tx, name: record.name, email: record.email, status: "Completed", amount: money(action.amount), direction: action.direction, posted: true, detail: action.reason }];
      description = `Simulated ${action.direction}: ${money(action.amount)}`;
    } else if (action.type === "status") {
      if (!action.reason.trim() || !statuses[record.section].includes(action.status) || record.posted) return state;
      const settles = ["Transactions", "Deposits", "IRS Refunds"].includes(record.section) && action.status === "Completed";
      if (settles) {
        const account = records.find(r => r.section === "Accounts" && r.customerId === record.customerId && r.status === "Active");
        const delta = record.amount * (record.direction === "debit" ? -1 : 1);
        if (!account || account.amount + delta < 0) return state;
        records = records.map(r => r.id === account.id ? { ...r, amount: money(r.amount + delta) } : r);
      }
      records = records.map(r => r.id === record.id ? { ...r, status: action.status, posted: settles, notes: [...r.notes, action.reason] } : r);
      if (record.section === "Applications" && action.status === "Approved" && !records.some(r => r.section === "Users" && r.customerId === record.customerId)) {
        for (const s of ["Users", "Customers", "Accounts"] as const) records = [...records, { ...makeRecord(s, `DEMO-${s}-${record.id}`, record.customerId, action.at), name: record.name, email: record.email }];
      }
      description = `Changed to ${action.status}: ${action.reason}`;
    }
  }
  return { demoOnly: true, records, settings, audit: [{ id: `DEMO-AUDIT-${state.audit.length + 1}`, at: action.at, section, action: description, target }, ...state.audit] };
}
export function csvReport(state: DemoState, section?: Section): string {
  const quote = (value: string | number) => `"${String(value).replace(/^[=+@-]/, "'$&").replaceAll('"', '""')}"`;
  const rows = state.records.filter(r => !section || r.section === section);
  return ["Demo only,not a real bank", "ID,Section,Customer,Status,Example amount", ...rows.map(r => [r.id, r.section, r.name, r.status, r.amount].map(quote).join(","))].join("\n");
}