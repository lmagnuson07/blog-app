import AllPosts from '@/src/components/posts/all-posts';
import { getAllPosts } from '@/src/util/posts-util';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Logan's posts",
  description: "Browse through all of Logan's posts!",
};

export default function PostsPage() {
  const posts = getAllPosts();
  return <AllPosts posts={posts} />;
}
