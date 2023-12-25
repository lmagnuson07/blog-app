import Hero from '@/src/components/home-page/hero';
import FeaturedPosts from '@/src/components/home-page/featured-posts';
import { getFeaturedPosts } from '@/src/util/posts-util';

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  return (
    <>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </>
  );
}
