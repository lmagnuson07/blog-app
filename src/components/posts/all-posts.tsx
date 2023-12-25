import classes from './all-posts.module.scss';
import { PostSummary } from '@/src/types/posts/posts';
import PostsGrid from '@/src/components/posts/posts-grid';

export default function AllPosts({ posts }: { posts: PostSummary[] }) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}
