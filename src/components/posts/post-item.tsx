import Link from 'next/link';
import Image from 'next/image';

import classes from './post-item.module.scss';
import { PostSummary } from '@/src/types/posts/posts';

export default function PostItem({ post }: { post: PostSummary }) {
  const { title, image, excerpt, date, slug } = post;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const imagePath = `/image/posts/${slug}/${image}`;

  return (
    <li className={classes.post}>
      <Link href={`/posts/${slug}`}>
        <div className={classes.image}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            sizes="300px"
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
}
