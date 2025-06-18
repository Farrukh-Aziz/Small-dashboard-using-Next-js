import PostDetails from './PostDetails';
import { useParams } from 'next/navigation';

export default function PostDetailsPage() {
  // Get the id from the params using the server context
  // In Next.js App Router, you can get params from the props
  // But for compatibility, let's use the new convention
  // (If this doesn't work, we can use props: { params })
  const id = typeof window === 'undefined' ? '' : window.location.pathname.split('/').pop() || '';
  return <PostDetails id={id} />;
} 