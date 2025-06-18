"use client";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function fetchPosts() {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
}

export default function AdminPage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/new">Create New Post</Link>
        </Button>
      </div>
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post.id} className="border rounded p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">{post.title}</div>
              <div className="text-sm text-gray-500">{post.body.slice(0, 50)}...</div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={`/admin/${post.id}`}>Edit</Link>
              </Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 