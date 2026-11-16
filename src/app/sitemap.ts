import type { MetadataRoute } from "next";
import { allFeatures, solutions } from "@/lib/content";
import { fetchBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://petrozz.com";
  const [blogs, articles] = await Promise.all([
    fetchBlogPosts("blog"),
    fetchBlogPosts("article"),
  ]);
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
    "/faq",
    "/help-centre",
    "/video-tutorials",
    "/resources",
    "/login",
    "/signup",
    "/privacy-policy",
    "/terms",
    "/refund-policy",
    "/cookie-policy",
    ...allFeatures.map((f) => `/features/${f.slug}`),
    ...solutions.map((s) => `/solutions/${s.slug}`),
    ...articles.map((a) => `/help-centre/${a.slug}`),
    ...blogs.map((p) => `/resources/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
