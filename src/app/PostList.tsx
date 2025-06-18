"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

type Post = { id: number; title: string; body: string };

export default function PostList() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['public-posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  const postList = (posts as Post[]) || [];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <div className="space-y-4">
        {postList.map((post: Post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="p-4 hover:bg-gray-50 cursor-pointer">
              <div className="font-semibold text-lg">{post.title}</div>
              <div className="text-gray-500 text-sm mt-1">{post.body.slice(0, 60)}...</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 