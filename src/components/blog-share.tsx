"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import {
  FacebookIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/social-icons";
import { cn } from "@/lib/utils";

export function BlogShare({
  url,
  title,
  className,
}: {
  url: string;
  title: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: XIcon,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
    {
      label: "Share on WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      Icon: WhatsAppIcon,
    },
  ] as const;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <p className="text-sm font-medium text-navy/60">Share via</p>
      <ul className="flex items-center gap-4">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="inline-flex text-navy/85 transition-colors hover:text-primary"
            >
              <Icon className="size-6" />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={() => void copyLink()}
            aria-label={copied ? "Link copied" : "Copy link"}
            className={cn(
              "inline-flex cursor-pointer transition-colors",
              copied ? "text-primary" : "text-navy/85 hover:text-primary",
            )}
          >
            {copied ? (
              <Check className="size-6" strokeWidth={1.75} />
            ) : (
              <Link2 className="size-6" strokeWidth={1.75} />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
}
