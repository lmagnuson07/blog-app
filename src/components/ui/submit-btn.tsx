'use client';

import classes from '@/src/components/ui/submit-btn.module.scss';
import { useFormStatus } from 'react-dom';
import { useEffect } from 'react';

export default function SubmitBtn({ onClick }: { onClick: any }) {
  const { pending } = useFormStatus();

  useEffect(() => {
    // console.log(pending);
  }, [pending]);

  return (
    <div className={classes.actions}>
      <button type="submit" disabled={pending} onClick={onClick}>
        {pending ? 'Sending...' : 'Send Message'}
      </button>
    </div>
  );
}
