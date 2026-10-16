import type { MetadataRoute } from "next";
import { allFeatures, blogPosts, helpArticles, solutions } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pettroz.in";
  const paths = [
    "",
    "/products",
    "/products/petrol-pump-management",
    "/products/attendance-payroll",
    "/features",
    "/solutions",
    "/pricing",
    "/about",
    "/book-demo",
    "/contact",
    "/help",
    "/blog",
    "/login",
    "/signup",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
    "/cookie-policy",
    ...allFeatures.map((f) => `/features/${f.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...helpArticles.map((a) => `/help/${a.slug}`),
    ...blogPosts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
