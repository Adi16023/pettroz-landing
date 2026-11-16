import type { Metadata } from "next";
import { Suspense } from "react";
import { VideoTutorialsBrowse } from "@/components/video-tutorials-browse";
import { Section } from "@/components/ui";
import { fetchVideoTutorials } from "@/lib/video-tutorials";

export const metadata: Metadata = { title: "Video Tutorials" };
export const revalidate = 60;

export default async function VideoTutorialsPage() {
  const videos = await fetchVideoTutorials();

  return (
    <Section className="pt-16 lg:pt-20">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading tutorials…</p>}>
        <VideoTutorialsBrowse videos={videos} />
      </Suspense>
    </Section>
  );
}
