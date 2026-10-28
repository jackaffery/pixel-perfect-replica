import { describe, expect, it } from "vitest";
import { csvReport, demoReducer, initialDemoState, makeRecord, statuses, type RecordSection } from "@/components/admin/demoAdminModel";
const at = "2026-10-28T12:00:00Z";
describe("Fictional admin controls", () => {
  it("rejects real email addresses and non-demo identifiers", () => {
    const state = initialDemoState();
    const record = makeRecord("Users", "DEMO-NEW", "DEMO-CUSTOMER-NEW", at);
    expect(demoReducer(state, { type: "save", record: { ...record, email: "person@example.com" }, at })).toBe(state);
    expect(demoReducer(state, { type: "save", record: { ...record, id: "REAL-NEW" }, at })).toBe(state);
    expect(demoReducer(state, { type: "save", record, at }).records).toContainEqual(record);
  });
  it("creates, edits, notes, and deletes examples in every record section", () => {
    for (const section of Object.keys(statuses) as RecordSection[]) {
      let state = initialDemoState();
      const record = makeRecord(section, `DEMO-NEW-${section}`, "DEMO-CUSTOMER-NEW", at);
      state = demoReducer(state, { type: "save", record, at });
      state = demoReducer(state, { type: "save", record: { ...record, name: "Edited Example" }, at });
      state = demoReducer(state, { type: "note", id: record.id, text: "Fictional note", at });
      expect(state.records.find(r => r.id === record.id)).toMatchObject({ name: "Edited Example", notes: ["Fictional note"] });
      state = demoReducer(state, { type: "delete", id: record.id, reason: "Remove example", at });
      expect(state.records.find(r => r.id === record.id)).toBeUndefined();
    }
  });
  it("settles a demo deposit exactly once and updates its linked example balance", () => {
    let state = initialDemoState();
    state = demoReducer(state, { type: "status", id: "DEMO-DEPOSITS-1", status: "Completed", reason: "Example approved", at });
    expect(state.records.find(r => r.section === "Accounts")?.amount).toBe(2600);
    expect(demoReducer(state, { type: "status", id: "DEMO-DEPOSITS-1", status: "Completed", reason: "Repeat", at })).toBe(state);
  });
  it("prevents overdrawing or adjusting a frozen demo account", () => {
    const state = initialDemoState();
    expect(demoReducer(state, { type: "adjust", id: "DEMO-ACCOUNTS-1", direction: "debit", amount: 2501, reason: "Example debit", at })).toBe(state);
    const frozen = demoReducer(state, { type: "status", id: "DEMO-ACCOUNTS-1", status: "Frozen", reason: "Example freeze", at });
    expect(demoReducer(frozen, { type: "adjust", id: "DEMO-ACCOUNTS-1", direction: "credit", amount: 10, reason: "Example credit", at })).toBe(frozen);
  });
  it("records a demo credit with a locked transaction and audit entry", () => {
    const state = demoReducer(initialDemoState(), { type: "adjust", id: "DEMO-ACCOUNTS-1", direction: "credit", amount: 50, reason: "Example adjustment", at });
    expect(state.records.find(r => r.section === "Accounts")?.amount).toBe(2550);
    expect(state.records.find(r => r.detail === "Example adjustment")).toMatchObject({ amount: 50, posted: true, status: "Completed" });
    expect(state.audit[0]?.action).toBe("Simulated credit: 50");
  });
  it("approval provisions fictional linked records without real credentials", () => {
    let state = initialDemoState();
    const app = makeRecord("Applications", "DEMO-NEW-APP", "DEMO-CUSTOMER-NEW", at);
    state = demoReducer(state, { type: "save", record: app, at });
    state = demoReducer(state, { type: "status", id: app.id, status: "Approved", reason: "Fictional review", at });
    expect(state.records.filter(r => r.customerId === app.customerId).map(r => r.section)).toEqual(["Applications", "Users", "Customers", "Accounts"]);
    expect(state.records.filter(r => r.customerId === app.customerId).every(r => r.email.endsWith(".invalid"))).toBe(true);
  });
  it("simulates reset and two-factor flags without passwords", () => {
    let state = demoReducer(initialDemoState(), { type: "security", id: "DEMO-USERS-1", operation: "reset", at });
    state = demoReducer(state, { type: "security", id: "DEMO-USERS-1", operation: "twoFactor", at });
    expect(state.records.find(r => r.section === "Users")).toMatchObject({ sessions: 0, resetRequired: true, twoFactor: true });
    expect(state.demoOnly).toBe(true);
  });
  it("exports actual demo data and neutralizes spreadsheet formulas", () => {
    const state = initialDemoState();
    const first = state.records[0];
    if (!first) throw new Error("Missing example");
    first.name = "=1+1";
    expect(csvReport(state)).toContain("not a real bank");
    expect(csvReport(state)).toContain('"\'=1+1"');
    expect(csvReport(state, "Accounts")).toContain('"2500"');
  });
});