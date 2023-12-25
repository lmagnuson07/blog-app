import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
import { Post } from '@/src/types/posts/posts';

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}

export function getPostData(postIdentifier: string) {
  const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const { data, content } = matter(fileContent);
  const postData: Post = {
    title: data.title,
    image: data.image,
    excerpt: data.excerpt,
    date: data.date,
    isFeatured: data.isFeatured,
  };

  return {
    slug: postSlug,
    ...postData,
    content,
  };
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  return allPosts.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  return allPosts.filter((post) => post.isFeatured);
}
