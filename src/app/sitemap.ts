import type { MetadataRoute } from "next";
import { allFeatures, helpArticles, solutions } from "@/lib/content";
import { fetchBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://pettroz.in";
  const posts = await fetchBlogPosts();
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
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${base}${path}` }));
}
