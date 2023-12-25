import PostContent from '@/src/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/src/util/posts-util';
import { Metadata, ResolvingMetadata } from 'next';

export const revalidate = 600;

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.slug;
  const post = getPostData(id);

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const postFiles = getPostsFiles();
  const slugs = postFiles.map((file) => file.replace(/\.md$/, ''));
  return slugs.map((slug) => ({ params: { slug } }));
}

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = getPostData(slug);
  return <PostContent post={post} />;
}
