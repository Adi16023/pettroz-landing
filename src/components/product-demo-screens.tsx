"use client";

import type { ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import { DeskCard, Donut, HorizontalBars, KpiCard, Stamp, TankGauges } from "@/components/product-ui";

export type DemoScreen = "Sales" | "Dip" | "DSR" | "Credit customers" | "Attendance" | "Shifts & Rosters" | "Leave" | "Payroll";

function Action({ children, target, primary = false }: { children: ReactNode; target?: string; primary?: boolean }) {
  return <span data-preview-target={target} className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-medium ${primary ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{children}</span>;
}

function Filters({ labels, children }: { labels: string[]; children?: ReactNode }) {
  return <div className="mb-5 flex items-end gap-3 rounded-xl border border-border bg-white p-4">
    {labels.map((label) => <div key={label}><p className="mb-1.5 text-xs text-muted-foreground">{label}</p><Action>All {label.toLowerCase()}<ChevronDown className="size-3.5" /></Action></div>)}
    <div className="ml-auto flex gap-2">{children}</div>
  </div>;
}

function Tabs({ labels }: { labels: string[] }) {
  return <div className="mb-6 flex gap-6 border-b border-border text-sm">{labels.map((label, index) => <span key={label} className={`border-b-2 px-1 pb-3 ${index === 0 ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground"}`}>{label}</span>)}</div>;
}

function DemoTable({ columns, rows, target }: { columns: string[]; rows: ReactNode[][]; target?: string }) {
  return <DeskCard previewTarget={target}>
    <div className="mb-4 flex items-center justify-between">
      <span className="flex h-10 w-64 items-center gap-2 rounded-lg border border-border px-3 text-sm text-muted-foreground"><Search className="size-4" />Search...</span>
      <span className="text-xs text-muted-foreground">{rows.length} records</span>
    </div>
    <table className="w-full text-left text-sm">
      <thead><tr className="border-y border-border bg-muted/40">{columns.map((column) => <th key={column} className="px-3 py-3 font-medium whitespace-nowrap">{column}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => <tr key={i} className="border-b border-border last:border-0">{row.map((cell, j) => <td key={j} className="px-3 py-5 tabular-nums">{cell}</td>)}</tr>)}</tbody>
    </table>
    <p className="mt-5 text-right text-xs text-muted-foreground">Page 1 of 1</p>
  </DeskCard>;
}

function Heading({ title, hint, children }: { title: string; hint: string; children?: ReactNode }) {
  return <div className="mb-6 flex items-end justify-between gap-4"><div><p className="text-[36.4px] leading-tight tracking-tight">{title}</p><p className="mt-2 text-sm text-muted-foreground">{hint}</p></div>{children}</div>;
}

const demoPeople = ["Demo employee 01", "Demo employee 02", "Demo employee 03", "Demo employee 04"];

// Read-only presentation adapted from the corresponding Petroz desks; all records are synthetic.
export function ProductDemoScreen({ screen, actionComplete }: { screen: DemoScreen; actionComplete: boolean }) {
  switch (screen) {
    case "Sales":
      return <div>
        <Heading title="Sales" hint="Today's sales, from every shift on this day."><div className="flex gap-2"><Action>Today<ChevronDown className="size-3.5" /></Action><Action target="sales-records">View all sales records</Action></div></Heading>
        <div className="mb-6 grid grid-cols-5 gap-4">
          {[["Total sales", "₹2,40,850"], ["Fuel sales", "₹2,32,400"], ["Lube / product", "₹8,450"], ["Cash", "₹1,58,200"], ["Credit", "₹22,450"]].map(([label, value], i) => <KpiCard key={label} label={label} value={value} hint="Today" wash={["bg-emerald-200!", "bg-blue-200!", "bg-violet-200!", "bg-amber-200!", "bg-rose-200!"][i]} />)}
        </div>
        {actionComplete ? <DemoTable target="sales-list" columns={["Bill", "Time", "Product", "Quantity", "Amount", "Payment"]} rows={[
          ["DEMO-1048", "09:40", "Petrol", "25.00 L", "₹2,530.00", "UPI"],
          ["DEMO-1047", "09:37", "Diesel", "40.00 L", "₹3,695.60", "Cash"],
          ["DEMO-1046", "09:35", "Power", "15.00 L", "₹1,710.00", "Card"],
          ["DEMO-1045", "09:32", "Petrol", "10.00 L", "₹1,012.00", "Credit"],
        ]} /> : <div className="grid grid-cols-3 gap-4">
          <DeskCard title="Sales trend" hint="Today, by shift"><div className="flex h-56 items-end justify-around gap-4 border-b border-border pt-5">{[45, 70, 55, 85, 65, 95].map((height, i) => <div key={i} className="flex h-full flex-1 items-end gap-1"><span className="w-1/2 rounded-t bg-primary" style={{ height: `${height}%` }} /><span className="w-1/2 rounded-t bg-[#333333]" style={{ height: `${height * 0.6}%` }} /></div>)}</div><p className="mt-4 text-xs text-muted-foreground">06:00　　　　08:00　　　　10:00</p></DeskCard>
          <DeskCard title="Payment mode"><Donut centerValue="₹2.41L" slices={[{ label: "Cash", value: 158200, color: "#e63425" }, { label: "UPI", value: 45000, color: "#333333" }, { label: "Card", value: 15200, color: "#f59e0b" }, { label: "Credit", value: 22450, color: "#6366f1" }]} /></DeskCard>
          <DeskCard title="Best selling products"><HorizontalBars items={[{ label: "Petrol", value: 128600, display: "₹1,28,600", color: "#e63425" }, { label: "Diesel", value: 86700, display: "₹86,700", color: "#333333" }, { label: "Power", value: 17100, display: "₹17,100", color: "#f59e0b" }, { label: "Lube / Products", value: 8450, display: "₹8,450", color: "#6366f1" }]} /></DeskCard>
        </div>}
      </div>;
    case "Dip":
      return <div>
        <Heading title="Dip" hint="Physical tank dips versus the book. Save a reading or run a quick check first." />
        <Tabs labels={["Overview", "Dip history", "Calibration"]} />
        <div className="mb-5 flex justify-end gap-2"><Action>Quick dip check</Action><Action primary>Enter physical dip</Action></div>
        <div className="mb-6 grid grid-cols-5 gap-4">{[["Total tanks", "3"], ["Readings today", "3"], ["Pending", "0"], ["Physical stock", "48.8 KL"], ["Stock difference", "0.0 KL"]].map(([label, value]) => <KpiCard key={label} label={label} value={value} hint="Demo outlet" />)}</div>
        <DeskCard title="Tank status" hint="The tanker fills against the book" previewTarget="stock-tanks" className="mb-6"><TankGauges tanks={[{ label: "Petrol", live: 16.8, capacity: 24, color: "#e63425" }, { label: "Diesel", live: 22.4, capacity: 32, color: "#333333" }, { label: "Power", live: 9.6, capacity: 16, color: "#f59e0b" }]} /></DeskCard>
        <DemoTable columns={["Tank", "Fuel", "Capacity", "Physical", "System", "Difference", "Fill %", "Status"]} rows={[["Petrol", "Petrol", "24 KL", "16.80 KL", "16.80 KL", "0.00 KL", "70%", <Stamp key="p">Clear</Stamp>], ["Diesel", "Diesel", "32 KL", "22.40 KL", "22.40 KL", "0.00 KL", "70%", <Stamp key="d">Clear</Stamp>], ["Power", "Power", "16 KL", "9.60 KL", "9.60 KL", "0.00 KL", "60%", <Stamp key="s">Clear</Stamp>]]} />
      </div>;
    case "DSR":
      return <div>
        <Heading title="DSR" hint="Daily sales report for this pump. Lock it when the day is counted." />
        <Filters labels={["Shift", "Staff"]}><Action primary target="lock-dsr">{actionComplete ? "Unlock DSR" : "Lock DSR"}</Action><Action>Export PDF</Action><Action>Export Excel</Action><Action>Deposit to Bank</Action></Filters>
        <div className="mb-6 grid grid-cols-4 gap-4">{[["Total sales", "₹2,40,850"], ["Fuel sales", "₹2,32,400"], ["Lube / product", "₹8,450"], ["Credit sales", "₹22,450"], ["Cash collection", "₹1,58,200"], ["UPI Collection", "₹45,000"], ["Expenses", "₹3,500"], ["Net collection", "₹2,37,350"]].map(([label, value], i) => <KpiCard key={label} label={label} value={value} hint="03 Nov 2026" wash={i === 0 ? "bg-emerald-200!" : undefined} />)}</div>
        <DeskCard title="Collection summary" previewTarget="closing-summary" className="mb-6"><div className="grid grid-cols-4 gap-6">{[["Cash", "₹1,58,200"], ["UPI", "₹45,000"], ["POS", "₹15,200"], ["Credit", "₹22,450"]].map(([label, value]) => <div key={label}><p className="text-sm text-muted-foreground">{label}</p><p className="mt-2 text-2xl">{value}</p></div>)}</div></DeskCard>
        <DeskCard title="Notes & DSR status"><div className="flex items-center justify-between"><p className="text-sm text-muted-foreground">All collections reconciled for the day.</p><Stamp tone={actionComplete ? "ok" : "warn"}>{actionComplete ? "Locked" : "Open"}</Stamp></div></DeskCard>
      </div>;
    case "Credit customers":
      return <div>
        <Heading title="Credit customers" hint="Credit limits, outstanding balances and collections.">
          <div className="flex gap-2"><Action>Export</Action><Action primary target="credit-add">Add customer</Action></div>
        </Heading>
        <div className="mb-6 grid grid-cols-4 gap-4">
          <KpiCard label="Customers" value="128" hint="Active credit accounts" />
          <KpiCard label="Outstanding" value="₹80,450" hint="All accounts" wash="bg-rose-200!" />
          <KpiCard label="Collected today" value="₹12,000" hint="3 receipts" wash="bg-emerald-200!" />
          <KpiCard label="Overdue" value="₹18,600" hint="Past due date" wash="bg-amber-200!" />
        </div>
        <DemoTable
          target="credit-list"
          columns={["Customer", "Phone", "Limit", "Outstanding", "Last sale", "Status"]}
          rows={[
            ["Fleet Corp", "98××××8801", "₹1,00,000", "₹48,200", "Yesterday", <Stamp key="c1">Open</Stamp>],
            ["City Cabs", "98××××4412", "₹50,000", "₹22,450", "02 Nov", <Stamp key="c2" tone="warn">Due soon</Stamp>],
            ["Local Workshop", "98××××2145", "₹20,000", "₹9,800", "28 Oct", <Stamp key="c3" tone="warn">Overdue</Stamp>],
            ["Ramesh Kumar", "98××××1099", "₹15,000", "₹0", "Today", <Stamp key="c4">Clear</Stamp>],
          ]}
        />
      </div>;
    case "Attendance":
      return <div>
        <Heading title="Attendance" hint="Track, manage and monitor employee attendance." />
        <div className="mb-5 grid grid-cols-3 gap-4"><KpiCard label="Present" value="45" hint="93.8% of staff" wash="bg-emerald-200!" /><KpiCard label="Absent" value="3" hint="6.3% of staff" wash="bg-rose-200!" /><KpiCard label="Late" value="3" hint="After the assigned shift start" wash="bg-blue-200!" /></div>
        <Filters labels={["Designation", "Shift", "Status"]}><Action>Export Excel</Action><Action>Export PDF</Action><Action primary>Mark attendance</Action></Filters>
        <DemoTable target="attendance-list" columns={["Employee", "Designation", "Shift", "Check in", "Check out", "Work hours", "Status", "Location"]} rows={demoPeople.map((name, i) => [name, i < 2 ? "Operations" : "Sales", "Morning", `09:0${i * 2}`, "—", "—", <Stamp key={name}>Present</Stamp>, "Demo outlet"])} />
      </div>;
    case "Shifts & Rosters":
      return <div>
        <Heading title="Shifts & Rosters" hint="Create shifts, assign people, and build the weekly roster." />
        <Tabs labels={["Shifts", "Rosters"]} />
        <div className="mb-5 grid grid-cols-4 gap-4">{[["Shifts", "2"], ["Open now", "1"], ["Staff on a roster", "48"], ["Next shift", "Evening"]].map(([label, value]) => <KpiCard key={label} label={label} value={value} hint="Demo outlet" />)}</div>
        <div className="mb-5 flex justify-end"><Action>Open shift desk</Action></div>
        <div className="grid grid-cols-[minmax(0,1fr)_18rem] gap-5">
          <DemoTable target="shift-list" columns={["Shift", "Time", "Working hours", "Assigned", "Status", "Outlet"]} rows={[["Morning", "06:00 – 14:00", "8h", "24", <Stamp key="open">Open</Stamp>, "Demo outlet"], ["Evening", "14:00 – 22:00", "8h", "24", <Stamp key="next" tone="warn">Upcoming</Stamp>, "Demo outlet"]]} />
          <DeskCard title="Morning" hint="Open"><dl className="space-y-5 text-sm">{[["Time", "06:00 – 14:00"], ["Working hours", "8h"], ["Assigned", "24"], ["Outlet", "Demo outlet"]].map(([label, value]) => <div key={label} className="flex justify-between gap-2"><dt className="text-muted-foreground">{label}</dt><dd>{value}</dd></div>)}</dl></DeskCard>
        </div>
      </div>;
    case "Leave":
      return <div>
        <Heading title="Leave" hint="Leave requests, approvals, and balances." />
        <Tabs labels={["Leave Requests", "Leave Balance"]} />
        <Filters labels={["Status", "Leave type"]}><Action primary>Add leave request</Action></Filters>
        <DemoTable target="leave-list" columns={["Employee", "Designation", "Leave type", "Start date", "End date", "No. of days", "Reason", "Status"]} rows={[
          ["Demo employee 06", "Operations", "Casual leave", "05 Nov 2026", "06 Nov 2026", "2", "Personal", <Stamp key="pending" tone="warn">Pending</Stamp>],
          ["Demo employee 07", "Sales", "Annual leave", "09 Nov 2026", "11 Nov 2026", "3", "Family event", <Stamp key="approved">Approved</Stamp>],
          ["Demo employee 08", "Administration", "Sick leave", "02 Nov 2026", "03 Nov 2026", "2", "Medical", <Stamp key="sick">Approved</Stamp>],
        ]} />
      </div>;
    case "Payroll":
      return <div>
        <Heading title="Payroll" hint="Salaries, payslips, and advances." />
        <Tabs labels={["Salary Overview", "Payslips", "Advances", "Advance history"]} />
        <div className="mb-5 grid grid-cols-3 gap-4"><KpiCard label="Payrolls" value="4" hint="Demo outlet" /><KpiCard label="To send" value={actionComplete ? "0" : "4"} hint="October 2026" wash="bg-blue-200!" /><KpiCard label="Net" value="₹84,000" hint="Saved this month" wash="bg-emerald-200!" /></div>
        <Filters labels={["Designation", "Status"]}><Action primary target="process-payroll">Process payroll</Action></Filters>
        <DemoTable target="payroll-list" columns={["Employee", "Designation", "Punches", "Hours", "Advances", "Net", "Status", "Actions"]} rows={demoPeople.map((name, i) => [name, i < 2 ? "Operations" : "Sales", "26", "208h", "₹0", "₹21,000", <Stamp key={name} tone={actionComplete ? "ok" : "warn"}>{actionComplete ? "Sent" : "Draft"}</Stamp>, "···"])} />
      </div>;
  }
}
