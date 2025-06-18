"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card } from '@/components/ui/card';

const fetchPost = async (id: string) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return data;
};

type Post = { title: string; body: string };

export default function PostDetails({ id }: { id: string }) {
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['public-post', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !post) return <div>Post not found.</div>;

  const { title, body } = post as Post;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <div className="prose" dangerouslySetInnerHTML={{ __html: body }} />
      </Card>
    </div>
  );
} 