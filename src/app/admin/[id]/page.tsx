"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ReactQuill: any = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type Post = { title: string; body: string };

const fetchPost = async (id: string) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return data;
};

const createPost = async (post: any) => {
  const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", post);
  return data;
};

const updatePost = async ({ id, ...post }: any) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, post);
  return data;
};

export default function AdminPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery({
    queryKey: ["admin-post", id],
    queryFn: () => fetchPost(id),
    enabled: !isNew,
  });

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    if (post) {
      setTitle((post as Post).title || "");
      setBody((post as Post).body || "");
    }
  }, [post]);

  const mutation = useMutation({
    mutationFn: isNew ? createPost : updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
      router.push("/admin");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNew) {
      mutation.mutate({ title, body });
    } else {
      mutation.mutate({ id, title, body });
    }
  };

  if (isLoading && !isNew) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{isNew ? "Create Post" : "Edit Post"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <ReactQuill value={body} onChange={setBody as any} />
        <div className="flex gap-2">
          <Button type="submit" disabled={mutation.isPending}>
            {isNew ? "Create" : "Update"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>Cancel</Button>
        </div>
      </form>
    </div>
  );
} 