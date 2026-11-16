export const VIDEO_API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.PETROZZ_API_URL ??
  process.env.PETTROZ_API_URL ??
  "https://petroz-backend.onrender.com";

export type PublicVideoTutorial = {
  id: string;
  slug: string;
  title: string;
  url: string;
  provider: "youtube" | "vimeo" | "other";
  providerId: string;
  thumbnailUrl: string;
  embedUrl: string | null;
  durationSeconds: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export function formatVideoDuration(seconds: number | null | undefined) {
  if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return null;
  const total = Math.round(seconds);
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

export function formatVideoUploadedAt(value?: string | null) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function fetchVideoTutorials(): Promise<PublicVideoTutorial[]> {
  try {
    const response = await fetch(`${VIDEO_API_URL}/api/public/video-tutorials`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return [];
    const rows = (await response.json()) as PublicVideoTutorial[];
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}
