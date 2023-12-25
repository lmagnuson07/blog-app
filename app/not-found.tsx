'use client';

import './globals.css';
import classes from './not-found.module.scss';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Not Found';
  }, []);
  return (
    <>
      <main className={classes.main}>
        <h1>Not Found</h1>
      </main>
    </>
  );
}
