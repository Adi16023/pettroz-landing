import { blogPosts as staticBlogPosts } from "@/lib/content";

export const BLOG_API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.PETTROZ_API_URL ??
  "https://petroz-backend.onrender.com";

export type PublicBlogPost = {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string;
  coverUrl?: string | null;
  bodyHtml?: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
};

export function blogAssetUrl(path: string | null | undefined) {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${BLOG_API_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function rewriteBlogHtml(html: string) {
  return html
    .replaceAll('src="/api/public/blog/media/', `src="${BLOG_API_URL}/api/public/blog/media/`)
    .replaceAll("src='/api/public/blog/media/", `src='${BLOG_API_URL}/api/public/blog/media/`);
}

export function fallbackBlogPosts(): PublicBlogPost[] {
  return staticBlogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    bodyHtml: "",
  }));
}

export function normalizeBlogPosts(rows: PublicBlogPost[]): PublicBlogPost[] {
  return rows.map((row) => ({
    ...row,
    coverUrl: blogAssetUrl(row.coverUrl),
  }));
}

export async function fetchBlogPosts(): Promise<PublicBlogPost[]> {
  try {
    const response = await fetch(`${BLOG_API_URL}/api/public/blog`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return fallbackBlogPosts();
    const rows = (await response.json()) as PublicBlogPost[];
    if (!Array.isArray(rows) || rows.length === 0) return fallbackBlogPosts();
    return normalizeBlogPosts(rows);
  } catch {
    return fallbackBlogPosts();
  }
}

/** Client-safe load for nav mega menus (no Next fetch cache options). */
export async function loadBlogPostsClient(): Promise<PublicBlogPost[]> {
  try {
    const response = await fetch(`${BLOG_API_URL}/api/public/blog`, { cache: "no-store" });
    if (!response.ok) return fallbackBlogPosts();
    const rows = (await response.json()) as PublicBlogPost[];
    if (!Array.isArray(rows) || rows.length === 0) return fallbackBlogPosts();
    return normalizeBlogPosts(rows);
  } catch {
    return fallbackBlogPosts();
  }
}

export async function fetchBlogPost(slug: string): Promise<PublicBlogPost | null> {
  try {
    const response = await fetch(`${BLOG_API_URL}/api/public/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (response.ok) {
      const row = (await response.json()) as PublicBlogPost;
      return {
        ...row,
        coverUrl: blogAssetUrl(row.coverUrl),
        bodyHtml: row.bodyHtml ? rewriteBlogHtml(row.bodyHtml) : "",
      };
    }
  } catch {
    // fall through to static
  }
  const fallback = staticBlogPosts.find((post) => post.slug === slug);
  if (!fallback) return null;
  return {
    slug: fallback.slug,
    title: fallback.title,
    excerpt: fallback.excerpt,
    category: fallback.category,
    bodyHtml: "",
  };
}
