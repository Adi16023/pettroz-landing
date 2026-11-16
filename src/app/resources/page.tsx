import type { Metadata } from "next";
import { Suspense } from "react";
import { ResourcesBrowse } from "@/components/resources-browse";
import { Section } from "@/components/ui";
import { fetchBlogPosts } from "@/lib/blog";

export const metadata: Metadata = { title: "Resources" };
export const revalidate = 60;

export default async function ResourcesPage() {
  const posts = await fetchBlogPosts("blog");

  return (
    <Section className="pt-16 lg:pt-20">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading articles…</p>}>
        <ResourcesBrowse posts={posts} basePath="/resources" title="Resources" />
      </Suspense>
    </Section>
  );
}
