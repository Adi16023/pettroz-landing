export const BLOG_API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.PETROZZ_API_URL ??
  process.env.PETTROZ_API_URL ??
  "https://petroz-backend.onrender.com";

export type PublicBlogPostType = "blog" | "article";

export type PublicBlogPost = {
  id?: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  tags?: string[];
  category: string;
  type?: PublicBlogPostType;
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

/** Plain-text card description: excerpt first, otherwise a short body preview. */
export function blogCardDescription(post: Pick<PublicBlogPost, "excerpt" | "bodyHtml">) {
  const excerpt = post.excerpt?.trim();
  if (excerpt) return excerpt;
  const html = post.bodyHtml?.trim();
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizePostType(value: string | null | undefined): PublicBlogPostType {
  return value === "article" ? "article" : "blog";
}

export function normalizeBlogPosts(rows: PublicBlogPost[]): PublicBlogPost[] {
  return rows.map((row) => ({
    ...row,
    type: normalizePostType(row.type),
    tags: Array.isArray(row.tags) ? row.tags.filter(Boolean) : [],
    coverUrl: blogAssetUrl(row.coverUrl),
  }));
}

export async function fetchBlogPosts(type?: PublicBlogPostType): Promise<PublicBlogPost[]> {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : "";
    const response = await fetch(`${BLOG_API_URL}/api/public/blog${query}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const rows = (await response.json()) as PublicBlogPost[];
    if (!Array.isArray(rows) || rows.length === 0) return [];
    return normalizeBlogPosts(rows);
  } catch {
    return [];
  }
}

/** Client-safe load for nav mega menus (no Next fetch cache options). */
export async function loadBlogPostsClient(type?: PublicBlogPostType): Promise<PublicBlogPost[]> {
  try {
    const query = type ? `?type=${encodeURIComponent(type)}` : "";
    const response = await fetch(`${BLOG_API_URL}/api/public/blog${query}`, { cache: "no-store" });
    if (!response.ok) return [];
    const rows = (await response.json()) as PublicBlogPost[];
    if (!Array.isArray(rows) || rows.length === 0) return [];
    return normalizeBlogPosts(rows);
  } catch {
    return [];
  }
}

export async function fetchBlogPost(slug: string): Promise<PublicBlogPost | null> {
  try {
    const response = await fetch(`${BLOG_API_URL}/api/public/blog/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const row = (await response.json()) as PublicBlogPost;
    return {
      ...row,
      type: normalizePostType(row.type),
      tags: Array.isArray(row.tags) ? row.tags.filter(Boolean) : [],
      coverUrl: blogAssetUrl(row.coverUrl),
      bodyHtml: row.bodyHtml ? rewriteBlogHtml(row.bodyHtml) : "",
    };
  } catch {
    return null;
  }
}
