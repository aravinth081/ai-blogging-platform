"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface CommentData {
  id: string;
  postId: string;
  authorName: string;
  authorEmail: string;
  authorInitials: string;
  content: string;
  parentId: string | null;
  createdAt: string;
  replies: CommentData[];
}

const globalMockStore = global as unknown as { mockComments: CommentData[] };
if (!globalMockStore.mockComments) {
  globalMockStore.mockComments = [
    {
      id: "comment-1",
      postId: "post-1",
      authorName: "Alex Mercer",
      authorEmail: "alex@example.com",
      authorInitials: "AM",
      content: "This is a fantastic analysis. The balance between human creativity and AI efficiency is indeed the sweet spot.",
      parentId: null,
      createdAt: new Date("2026-06-04T12:00:00Z").toISOString(),
      replies: [
        {
          id: "comment-2",
          postId: "post-1",
          authorName: "Sarah Chen",
          authorEmail: "sarah@techcorp.com",
          authorInitials: "SC",
          content: "Completely agree, Alex! Finding that workflow sweet spot takes time but pays off massively.",
          parentId: "comment-1",
          createdAt: new Date("2026-06-04T14:15:00Z").toISOString(),
          replies: []
        }
      ]
    },
    {
      id: "comment-3",
      postId: "post-1",
      authorName: "David K.",
      authorEmail: "david@example.com",
      authorInitials: "DK",
      content: "Which model are you finding best for brainstorming outlines? I get mixed results with Claude vs GPT-4.",
      parentId: null,
      createdAt: new Date("2026-06-05T09:30:00Z").toISOString(),
      replies: []
    }
  ];
}

const mockComments = globalMockStore.mockComments;

// Database query runner with error fallback
async function runDb<T>(dbQuery: () => Promise<T>, fallback: () => T | Promise<T>): Promise<T> {
  try {
    return await dbQuery();
  } catch (error) {
    return await fallback();
  }
}

// Helper to structure flat array of comments into parent-child nested tree
function buildCommentTree(flatComments: any[]): CommentData[] {
  const commentMap: Record<string, CommentData> = {};
  const rootComments: CommentData[] = [];

  // Initialize map with structured objects
  flatComments.forEach((c) => {
    const initials = c.authorName
      ? c.authorName.split(" ").map((n: string) => n[0]).join("").toUpperCase()
      : "??";

    commentMap[c.id] = {
      id: c.id,
      postId: c.postId,
      authorName: c.authorName,
      authorEmail: c.authorEmail,
      authorInitials: initials,
      content: c.content,
      parentId: c.parentId,
      createdAt: c.createdAt,
      replies: []
    };
  });

  // Assign children to their parents
  flatComments.forEach((c) => {
    const structured = commentMap[c.id];
    if (c.parentId && commentMap[c.parentId]) {
      commentMap[c.parentId].replies.push(structured);
    } else {
      rootComments.push(structured);
    }
  });

  // Sort by date (oldest first for threads)
  const sortByDate = (a: CommentData, b: CommentData) =>
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

  rootComments.sort(sortByDate);
  Object.values(commentMap).forEach((c) => c.replies.sort(sortByDate));

  return rootComments;
}

export async function getCommentsForPost(postId: string): Promise<CommentData[]> {
  return runDb(
    async () => {
      const dbComments = await db.comment.findMany({
        where: { postId, status: "APPROVED" },
        include: { author: true },
        orderBy: { createdAt: "asc" }
      });

      const flat = dbComments.map((c: any) => ({
        id: c.id,
        postId: c.postId,
        authorName: c.author.name || "Anonymous",
        authorEmail: c.author.email,
        content: c.content,
        parentId: c.parentId,
        createdAt: c.createdAt.toISOString()
      }));

      return buildCommentTree(flat);
    },
    () => {
      const flat = mockComments.filter((c) => c.postId === postId);
      
      // Need to flatten mock tree structure to rebuild it cleanly
      const flattened: any[] = [];
      const traverse = (c: CommentData) => {
        flattened.push({
          id: c.id,
          postId: c.postId,
          authorName: c.authorName,
          authorEmail: c.authorEmail,
          content: c.content,
          parentId: c.parentId,
          createdAt: c.createdAt
        });
        c.replies.forEach(traverse);
      };

      flat.forEach(traverse);
      return buildCommentTree(flattened);
    }
  );
}

export async function addComment(
  postId: string,
  content: string,
  parentId: string | null = null,
  authorInfo: { name: string; email: string } = { name: "Jane Doe", email: "jane@inksphere.io" }
): Promise<CommentData> {
  const initials = authorInfo.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const newComment: CommentData = {
    id: `comment-${Date.now()}`,
    postId,
    authorName: authorInfo.name,
    authorEmail: authorInfo.email,
    authorInitials: initials,
    content,
    parentId,
    createdAt: new Date().toISOString(),
    replies: []
  };

  return runDb<CommentData>(
    async () => {
      // Find or create user
      let author = await db.user.findFirst({ where: { email: authorInfo.email } });
      if (!author) {
        author = await db.user.create({
          data: {
            name: authorInfo.name,
            email: authorInfo.email,
            passwordHash: ""
          }
        });
      }

      const created = await db.comment.create({
        data: {
          content,
          postId,
          authorId: author.id,
          parentId,
          status: "APPROVED"
        },
        include: { author: true }
      });

      revalidatePath(`/blog`);
      return {
        id: created.id,
        postId: created.postId,
        authorName: created.author.name || "Anonymous",
        authorEmail: created.author.email,
        authorInitials: initials,
        content: created.content,
        parentId: created.parentId,
        createdAt: created.createdAt.toISOString(),
        replies: []
      };
    },
    () => {
      mockComments.push(newComment);
      revalidatePath(`/blog`);
      return newComment;
    }
  );
}
