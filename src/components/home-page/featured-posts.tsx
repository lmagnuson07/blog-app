import { PostSummary } from '@/src/types/posts/posts';
import PostsGrid from '@/src/components/posts/posts-grid';
import classes from './featured-posts.module.scss';

export default function FeaturedPosts({ posts }: { posts: PostSummary[] }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
