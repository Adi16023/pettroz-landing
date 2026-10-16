export function PumpPreview() {
  const bars = [62, 84, 48, 71, 90, 55, 76];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-navy px-4 py-3">
        <p className="text-sm font-medium text-white">Petrol Pump Management</p>
        <p className="text-xs text-white/60">Dashboard preview</p>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {[
          { label: "Today’s sales", value: "₹ 2.4L" },
          { label: "Tanks", value: "4 live" },
          { label: "Open shift", value: "Morning" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl bg-background p-3">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="mt-1 text-lg font-semibold text-navy">{k.value}</p>
          </div>
        ))}
      </div>
      <div className="flex h-36 items-end gap-2 px-4 pb-4">
        {bars.map((h, i) => (
          <div key={i} className="relative h-full flex-1 rounded-t bg-muted">
            <div
              className="chart-grow-y absolute inset-x-0 bottom-0 rounded-t bg-primary"
              style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AttendancePreview() {
  const rows = [
    { name: "Priya S.", status: "Present", color: "text-emerald-600" },
    { name: "Rahul M.", status: "On leave", color: "text-muted-foreground" },
    { name: "Anita K.", status: "Present", color: "text-emerald-600" },
    { name: "Vikram D.", status: "Late", color: "text-primary" },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-navy px-4 py-3">
        <p className="text-sm font-medium text-white">Attendance & Payroll</p>
        <p className="text-xs text-white/60">Live register</p>
      </div>
      <div className="p-4">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="chart-fade flex items-center justify-between border-b border-border py-3 last:border-0"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-semibold text-navy">
                {r.name.slice(0, 1)}
              </span>
              <p className="text-sm font-medium">{r.name}</p>
            </div>
            <p className={`text-sm font-medium ${r.color}`}>{r.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
