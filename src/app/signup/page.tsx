"use client";

import { useState } from "react";
import { H1, Kicker, Lead, Section } from "@/components/ui";

const steps = ["Select Product", "Business Information", "Account Verification", "Subscription", "Workspace Setup"];

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState("Petrol Pump Management");

  return (
    <Section className="max-w-xl pt-20">
      <Kicker>Get Started</Kicker>
      <H1>Get Started with Pettroz.</H1>
      <Lead>
        Step {step + 1} of 5 — {steps[step]}. We do not promise a free trial until the business
        decides whether trials are available.
      </Lead>
      {step === 0 ? (
        <div className="mt-8 space-y-3">
          {["Petrol Pump Management", "Attendance & Payroll", "Both Products"].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setProduct(p)}
              className={`block w-full cursor-pointer rounded-xl border p-4 text-left text-sm font-medium ${product === p ? "border-primary bg-card" : "border-border bg-card"}`}
            >
              {p}
            </button>
          ))}
        </div>
      ) : null}
      {step === 1 ? (
        <form className="mt-8 grid gap-3">
          {["Business Name", "Owner/Admin Name", "Email", "Mobile Number", "Business Type", "City", "State"].map((l) => (
            <input key={l} placeholder={l} className="h-11 rounded-lg border border-border bg-card px-3 text-sm" />
          ))}
        </form>
      ) : null}
      {step === 2 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Verify email or mobile through the configured verification service before the workspace
          is created.
        </p>
      ) : null}
      {step === 3 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          Eligible plans or sales-assisted onboarding are shown here once pricing is finalized.
          Interested product: {product}.
        </p>
      ) : null}
      {step === 4 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          We create the matching product workspace and walk you through first-time configuration.
        </p>
      ) : null}
      <div className="mt-8 flex gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="h-11 cursor-pointer rounded-lg bg-navy px-5 text-sm font-medium text-white"
          >
            Back
          </button>
        ) : null}
        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="h-11 cursor-pointer rounded-lg bg-primary px-5 text-sm font-medium text-white"
          >
            Continue
          </button>
        ) : (
          <a href="/book-demo" className="inline-flex h-11 cursor-pointer items-center rounded-lg bg-primary px-5 text-sm font-medium text-white">
            Book a demo instead
          </a>
        )}
      </div>
    </Section>
  );
}
