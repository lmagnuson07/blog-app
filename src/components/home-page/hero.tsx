import Image from 'next/image';

import classes from './hero.module.scss';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/image/site/logan.jpg'}
          alt={'An image of Logan'}
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <h1>Hi, I&lsquo;m Logan!</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React.
      </p>
    </section>
  );
}
