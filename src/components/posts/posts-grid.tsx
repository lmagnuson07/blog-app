import classes from './posts-grid.module.scss';
import PostItem from '@/src/components/posts/post-item';
import { PostSummary } from '@/src/types/posts/posts';

export default function PostsGrid({ posts }: { posts: PostSummary[] }) {
  return (
    <ul className={classes.grid}>
      {posts.map((post: PostSummary) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}
