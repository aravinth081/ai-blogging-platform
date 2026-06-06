import { getPostById, PostData } from "@/actions/posts";
import { Editor } from "@/components/editor/editor";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditorPage({ params }: PageProps) {
  const { id } = await params;

  let initialPost: PostData | null = null;
  if (id !== "new") {
    initialPost = await getPostById(id);
    if (!initialPost) {
      notFound();
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Editor initialPost={initialPost} />
    </div>
  );
}
