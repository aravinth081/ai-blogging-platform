"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// Type definitions matching the schema structure
export interface PostBlock {
  id: string;
  type: string;
  content: string;
}

export interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: any; // JSON block list
  coverImage: string;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  visibility: "PUBLIC" | "PRIVATE" | "MEMBERS_ONLY" | "PREMIUM";
  categoryId?: string | null;
  metaTitle?: string;
  metaDesc?: string;
  publishedAt?: string | null;
  readTime: string;
  authorName: string;
  authorEmail: string;
  views: number;
}

// Global in-memory store for fallback when database is not connected
const globalMockStore = global as unknown as { mockPosts: PostData[] };
if (!globalMockStore.mockPosts) {
  globalMockStore.mockPosts = [
    {
      id: "post-1",
      title: "The Future of AI in Content Creation",
      slug: "future-ai-content",
      excerpt: "Exploring the convergence of artificial intelligence and creative writing in 2026.",
      content: [
        { id: "b1", type: "paragraph", content: "The convergence of artificial intelligence and content creation is reshaping how we communicate ideas. From automated research to intelligent editing, AI is becoming an indispensable co-pilot for writers, creators, and teams." },
        { id: "b2", type: "heading-2", content: "The Paradigm Shift" },
        { id: "b3", type: "paragraph", content: "Generative models like GPT-4, Claude, and Gemini have evolved beyond simple text completion. They now understand tone, context, and structural formatting, allowing creators to collaborate with AI in real-time." },
        { id: "b4", type: "blockquote", content: "AI won't replace writers, but writers who use AI will replace writers who don't." },
        { id: "b5", type: "heading-2", content: "Practical AI Writing Workflows" },
        { id: "b6", type: "paragraph", content: "Effective utilization of AI is about iteration. Start with a structured outline, ask the AI to expand specific sections, and then refine the tone manually to preserve your unique human voice." }
      ],
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      visibility: "PUBLIC",
      categoryId: "Technology",
      metaTitle: "The Future of AI in Content Creation | InkSphere",
      metaDesc: "An in-depth look at how AI is shaping the future of blogging and writing in 2026.",
      publishedAt: new Date("2026-06-04T10:00:00Z").toISOString(),
      readTime: "8 min",
      authorName: "Jane Doe",
      authorEmail: "jane@inksphere.io",
      views: 2451
    },
    {
      id: "post-2",
      title: "Building Scalable SaaS Applications",
      slug: "scalable-saas",
      excerpt: "Best practices and architectural design patterns for engineering high-performance SaaS products.",
      content: [
        { id: "b1", type: "paragraph", content: "Scaling a software-as-a-service platform requires planning for multi-tenancy, database performance, caching, and clean code boundaries right from day one." },
        { id: "b2", type: "heading-2", content: "Data Isolation Models" },
        { id: "b3", type: "paragraph", content: "Depending on your industry compliance, you can pick shared databases with tenant keys, separate schemas, or completely isolated databases. Shared databases are highly cost-efficient but require strict developer hygiene." }
      ],
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
      status: "PUBLISHED",
      visibility: "PUBLIC",
      categoryId: "Engineering",
      metaTitle: "Building Scalable SaaS Applications | InkSphere",
      metaDesc: "Architectural blueprint for building resilient, high-scale multi-tenant applications.",
      publishedAt: new Date("2026-06-03T14:30:00Z").toISOString(),
      readTime: "12 min",
      authorName: "Jane Doe",
      authorEmail: "jane@inksphere.io",
      views: 1832
    },
    {
      id: "post-3",
      title: "Design Systems That Scale",
      slug: "design-systems",
      excerpt: "How to maintain visual consistency and developer velocity with a unified component framework.",
      content: [
        { id: "b1", type: "paragraph", content: "A design system is not just a UI kit in Figma. It is a living contract between design and engineering, implemented via tokens, strict components, and clear accessibility guidelines." }
      ],
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
      status: "DRAFT",
      visibility: "PUBLIC",
      categoryId: "Design",
      metaTitle: "Design Systems That Scale | InkSphere",
      metaDesc: "Learn how to build and maintain robust design systems in React and Tailwind.",
      publishedAt: null,
      readTime: "6 min",
      authorName: "Jane Doe",
      authorEmail: "jane@inksphere.io",
      views: 0
    }
  ];
}

const mockPosts = globalMockStore.mockPosts;

// Try to execute a DB query, fallback to Mock if it errors out
async function runDb<T>(dbQuery: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  try {
    return await dbQuery();
  } catch (error) {
    // If the database is missing or tables aren't migrated, gracefully degrade
    return await fallback();
  }
}

export async function getPostById(id: string): Promise<PostData | null> {
  return runDb<PostData | null>(
    async () => {
      const post = await db.post.findUnique({
        where: { id },
        include: { author: true }
      });
      if (!post) return null;
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content || [],
        coverImage: post.coverImage || "",
        status: post.status as any,
        visibility: post.visibility as any,
        categoryId: post.categoryId,
        metaTitle: post.metaTitle || "",
        metaDesc: post.metaDesc || "",
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        readTime: `${post.readingTime || 5} min`,
        authorName: post.author.name || "Jane Doe",
        authorEmail: post.author.email,
        views: post.seoScore || 0
      };
    },
    () => {
      const match = mockPosts.find((p) => p.id === id);
      return match || null;
    }
  );
}

export async function getPublicPostBySlug(slug: string): Promise<PostData | null> {
  return runDb<PostData | null>(
    async () => {
      const post = await db.post.findFirst({
        where: { slug, status: "PUBLISHED" },
        include: { author: true }
      });
      if (!post) return null;
      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content || [],
        coverImage: post.coverImage || "",
        status: post.status as any,
        visibility: post.visibility as any,
        categoryId: post.categoryId,
        metaTitle: post.metaTitle || "",
        metaDesc: post.metaDesc || "",
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        readTime: `${post.readingTime || 5} min`,
        authorName: post.author.name || "Jane Doe",
        authorEmail: post.author.email,
        views: post.seoScore || 0
      };
    },
    () => {
      const match = mockPosts.find((p) => p.slug === slug && p.status === "PUBLISHED");
      return match || null;
    }
  );
}

export async function getPublicPosts(): Promise<PostData[]> {
  return runDb<PostData[]>(
    async () => {
      const posts = await db.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
        include: { author: true }
      });
      return posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content || [],
        coverImage: post.coverImage || "",
        status: post.status as any,
        visibility: post.visibility as any,
        categoryId: post.categoryId,
        metaTitle: post.metaTitle || "",
        metaDesc: post.metaDesc || "",
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        readTime: `${post.readingTime || 5} min`,
        authorName: post.author.name || "Jane Doe",
        authorEmail: post.author.email,
        views: post.seoScore || 0
      }));
    },
    () => {
      return mockPosts.filter((p) => p.status === "PUBLISHED");
    }
  );
}

export async function getAllDashboardPosts(): Promise<PostData[]> {
  return runDb<PostData[]>(
    async () => {
      const posts = await db.post.findMany({
        orderBy: { updatedAt: "desc" },
        include: { author: true }
      });
      return posts.map((post: any) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content || [],
        coverImage: post.coverImage || "",
        status: post.status as any,
        visibility: post.visibility as any,
        categoryId: post.categoryId,
        metaTitle: post.metaTitle || "",
        metaDesc: post.metaDesc || "",
        publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
        readTime: `${post.readingTime || 5} min`,
        authorName: post.author.name || "Jane Doe",
        authorEmail: post.author.email,
        views: post.seoScore || 0
      }));
    },
    () => {
      return [...mockPosts];
    }
  );
}

export async function upsertPost(post: Partial<PostData> & { title: string }): Promise<PostData> {
  const finalId = post.id || `post-${Date.now()}`;
  const finalSlug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const words = JSON.stringify(post.content || "").split(/\s+/).length;
  const computedReadTime = `${Math.max(1, Math.ceil(words / 200))} min`;

  const input: PostData = {
    id: finalId,
    title: post.title,
    slug: finalSlug,
    excerpt: post.excerpt || "",
    content: post.content || [],
    coverImage: post.coverImage || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
    status: post.status || "DRAFT",
    visibility: post.visibility || "PUBLIC",
    categoryId: post.categoryId || "General",
    metaTitle: post.metaTitle || `${post.title} | InkSphere`,
    metaDesc: post.metaDesc || post.excerpt || "",
    publishedAt: post.status === "PUBLISHED" ? (post.publishedAt || new Date().toISOString()) : null,
    readTime: computedReadTime,
    authorName: post.authorName || "Jane Doe",
    authorEmail: post.authorEmail || "jane@inksphere.io",
    views: post.views || 0
  };

  return runDb<PostData>(
    async () => {
      // Find or create mock author
      let author = await db.user.findFirst({ where: { email: input.authorEmail } });
      if (!author) {
        author = await db.user.create({
          data: {
            name: input.authorName,
            email: input.authorEmail,
            passwordHash: ""
          }
        });
      }

      // Find or create workspace
      let workspace = await db.workspace.findFirst();
      if (!workspace) {
        let org = await db.organization.findFirst();
        if (!org) {
          org = await db.organization.create({ data: { name: "Default Org", slug: "default-org" } });
        }
        workspace = await db.workspace.create({
          data: {
            organizationId: org.id,
            name: "Default Workspace",
            slug: "default"
          }
        });
      }

      const postPayload = {
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        coverImage: input.coverImage,
        status: input.status as any,
        visibility: input.visibility as any,
        categoryId: input.categoryId,
        metaTitle: input.metaTitle,
        metaDesc: input.metaDesc,
        publishedAt: input.publishedAt ? new Date(input.publishedAt) : null,
        readingTime: parseInt(input.readTime),
        authorId: author.id,
        workspaceId: workspace.id
      };

      const upserted = await db.post.upsert({
        where: { id: finalId },
        update: postPayload,
        create: {
          id: finalId,
          ...postPayload
        },
        include: { author: true }
      });

      revalidatePath("/blog");
      revalidatePath(`/blog/${input.slug}`);
      revalidatePath("/dashboard/posts");

      return {
        id: upserted.id,
        title: upserted.title,
        slug: upserted.slug,
        excerpt: upserted.excerpt || "",
        content: upserted.content || [],
        coverImage: upserted.coverImage || "",
        status: upserted.status as any,
        visibility: upserted.visibility as any,
        categoryId: upserted.categoryId,
        metaTitle: upserted.metaTitle || "",
        metaDesc: upserted.metaDesc || "",
        publishedAt: upserted.publishedAt ? upserted.publishedAt.toISOString() : null,
        readTime: `${upserted.readingTime || 5} min`,
        authorName: upserted.author.name || "Jane Doe",
        authorEmail: upserted.author.email,
        views: upserted.seoScore || 0
      };
    },
    () => {
      const idx = mockPosts.findIndex((p) => p.id === finalId);
      if (idx > -1) {
        mockPosts[idx] = { ...mockPosts[idx], ...input };
      } else {
        mockPosts.push(input);
      }
      revalidatePath("/blog");
      revalidatePath(`/blog/${input.slug}`);
      revalidatePath("/dashboard/posts");
      return input;
    }
  );
}

export async function deletePost(id: string): Promise<boolean> {
  return runDb(
    async () => {
      await db.post.delete({ where: { id } });
      revalidatePath("/blog");
      revalidatePath("/dashboard/posts");
      return true;
    },
    () => {
      const idx = mockPosts.findIndex((p) => p.id === id);
      if (idx > -1) {
        mockPosts.splice(idx, 1);
        revalidatePath("/blog");
        revalidatePath("/dashboard/posts");
        return true;
      }
      return false;
    }
  );
}
