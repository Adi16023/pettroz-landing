"use client";

import Link from "next/link";
import { useState } from "react";
import { H1, Kicker, Lead, Section } from "@/components/ui";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  return (
    <Section className="max-w-lg pt-20">
      <Kicker>Login</Kicker>
      <H1>Welcome Back to Pettroz.</H1>
      <Lead>Sign in to access your Pettroz workspace.</Lead>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Email / Mobile Number</label>
          <input required className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            required
            type={show ? "text" : "password"}
            className="h-11 w-full rounded-lg border border-border bg-card px-3 text-sm"
          />
          <button type="button" className="mt-2 cursor-pointer text-sm text-primary" onClick={() => setShow((v) => !v)}>
            {show ? "Hide password" : "Show password"}
          </button>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" className="cursor-pointer" /> Remember Me
        </label>
        <Link href="/contact" className="block cursor-pointer text-sm text-primary">
          Forgot Password
        </Link>
        <button type="submit" className="inline-flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-medium text-white">
          Login
        </button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        After authentication, Petrol Pump Management subscribers open the pump workspace.
        Attendance & Payroll subscribers open the workforce workspace. Businesses on both can
        switch. Employee self-service users see only permitted employee features.
      </p>
    </Section>
  );
}
