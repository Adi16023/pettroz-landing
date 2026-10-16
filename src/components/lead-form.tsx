"use client";

import { useMemo, useState } from "react";

const field =
  "h-11 w-full cursor-pointer rounded-lg border border-border bg-card px-3 text-sm outline-none";
const labelCls = "mb-1 block text-sm font-medium text-navy";

type Kind = "demo" | "contact";

export function LeadForm({ kind }: { kind: Kind }) {
  const [sent, setSent] = useState(false);
  const [product, setProduct] = useState("Petrol Pump Management");
  const showEmployees = product !== "Petrol Pump Management";
  const showOutlets = product !== "Attendance & Payroll";

  const title = useMemo(
    () => (kind === "demo" ? "Request My Free Demo" : "Submit"),
    [kind],
  );

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <h2 className="text-xl font-semibold text-navy">We’ve got your request.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The Pettroz team will follow up. Your interest is recorded as {product}.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div>
        <label className={labelCls}>Full Name</label>
        <input required className={field} name="name" />
      </div>
      {kind === "demo" ? (
        <div>
          <label className={labelCls}>Business Name</label>
          <input required className={field} name="business" />
        </div>
      ) : null}
      <div>
        <label className={labelCls}>Mobile Number</label>
        <input required className={field} name="mobile" inputMode="tel" />
      </div>
      {kind === "demo" ? (
        <div>
          <label className={labelCls}>WhatsApp Number (optional)</label>
          <input className={field} name="whatsapp" />
        </div>
      ) : null}
      <div>
        <label className={labelCls}>Email Address</label>
        <input required type="email" className={field} name="email" />
      </div>
      {kind === "demo" ? (
        <>
          <div>
            <label className={labelCls}>City</label>
            <input required className={field} name="city" />
          </div>
          <div>
            <label className={labelCls}>State</label>
            <input required className={field} name="state" />
          </div>
          <div>
            <label className={labelCls}>Business Type</label>
            <select required className={field} name="businessType" defaultValue="">
              <option value="" disabled>
                Select
              </option>
              <option>Petrol pump</option>
              <option>Retail</option>
              <option>Office</option>
              <option>Factory</option>
              <option>Restaurant</option>
              <option>Warehouse</option>
              <option>Other</option>
            </select>
          </div>
        </>
      ) : (
        <div>
          <label className={labelCls}>Phone</label>
          <input className={field} name="phone" />
        </div>
      )}
      <div>
        <label className={labelCls}>Interested Product</label>
        <select
          required
          className={field}
          name="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        >
          <option>Petrol Pump Management</option>
          <option>Attendance & Payroll</option>
          <option>Both Products</option>
        </select>
      </div>
      {kind === "contact" ? (
        <div>
          <label className={labelCls}>Enquiry Category</label>
          <select required className={field} name="category" defaultValue="Sales Enquiries">
            <option>Sales Enquiries</option>
            <option>Customer Support</option>
            <option>Partnerships</option>
          </select>
        </div>
      ) : null}
      {kind === "demo" && showEmployees ? (
        <div>
          <label className={labelCls}>Number of Employees</label>
          <input className={field} name="employees" />
        </div>
      ) : null}
      {kind === "demo" && showOutlets ? (
        <div>
          <label className={labelCls}>Number of Petrol Pump Outlets</label>
          <input className={field} name="outlets" />
        </div>
      ) : null}
      {kind === "demo" ? (
        <>
          <div>
            <label className={labelCls}>Preferred Demo Date</label>
            <input required type="date" className={field} name="date" />
          </div>
          <div>
            <label className={labelCls}>Preferred Time</label>
            <input required type="time" className={field} name="time" />
          </div>
        </>
      ) : null}
      <div className="sm:col-span-2">
        <label className={labelCls}>{kind === "demo" ? "Additional Requirements (optional)" : "Message"}</label>
        <textarea className="min-h-28 w-full rounded-lg border border-border bg-card p-3 text-sm" name="message" />
      </div>
      <label className="flex cursor-pointer items-start gap-2 text-sm sm:col-span-2">
        <input type="checkbox" className="mt-1 cursor-pointer" name="consent" />
        <span>I agree to be contacted about Pettroz products. Marketing consent is recorded separately from this enquiry.</span>
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-11 cursor-pointer items-center rounded-lg bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90"
        >
          {title}
        </button>
      </div>
    </form>
  );
}
