import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import PostHeader from '@/src/components/posts/post-detail/post-header';
import classes from './post-content.module.scss';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);

export default function PostContent({ post }: { post: any }) {
  const imagePath = `/image/posts/${post.slug}/${post.image}`;
  const customRenderers = {
    // img(image: any) {
    //   return (
    //     <Image
    //       src={`/image/posts/${post.slug}/${image.src}`}
    //       alt={post.title}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/image/posts/${post.slug}/${image.properties.src}`}
              alt={post.title}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code: any) {
      const { className, children } = code;
      const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}
