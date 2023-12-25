'use client';

import { useFormState } from 'react-dom';

import classes from './contact-form.module.scss';
import { commentHandler } from './contact-form-submission';
import { Contact } from '@/src/types/contact/contact';
import Notification from '@/src/components/ui/notification';
import SubmitBtn from '@/src/components/ui/submit-btn';
import { useEffect, useState } from 'react';

const initialState: Contact = {
  id: '',
  name: '',
  email: '',
  comment: '',
  success: null,
};

export default function ContactForm() {
  const [state, formAction] = useFormState(commentHandler, initialState);
  const [pending, setPending] = useState(false);
  const [hideNotification, setHideNotification] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  let requestStatus: string | undefined | null = null;
  if (pending) {
    requestStatus = 'pending';
  }
  if (state?.success !== null && state?.success === true) {
    requestStatus = 'success';
  } else if (state?.success !== null && state?.success === false) {
    requestStatus = 'error';
  }

  let notification;
  if (requestStatus === 'pending') {
    notification = {
      title: 'Sending message...',
      message: 'Your message is on its way!',
      status: 'pending',
    };
  } else if (requestStatus === 'success') {
    notification = {
      title: 'Success!',
      message: 'Message sent successfully!',
      status: 'success',
    };
  } else if (requestStatus === 'error') {
    notification = {
      title: 'Error!',
      message: 'Message failed to send!',
      status: 'error',
    };
  }

  useEffect(() => {
    setHideNotification(false);
    if (requestStatus === 'error' || requestStatus === 'success') {
      const timer = setTimeout(() => {
        setHideNotification(true);
        setPending(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus, state, buttonClicked]);

  if (hideNotification) {
    notification = null;
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} action={formAction}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" name={'email'} id={'email'} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" name={'name'} id={'name'} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="comment">Your Message</label>
          <textarea name={'comment'} id={'comment'} />
        </div>
        <SubmitBtn
          onClick={() => {
            setPending(true);
            setButtonClicked((prevState) => !prevState);
          }}
        />
        {notification && (
          <Notification
            title={notification.title}
            message={notification.message}
            status={notification.status}
          />
        )}
      </form>
      {state?.success ?
        <p>Success!</p>
      : <>
          <p>{state?.id}</p>
          <p>{state?.name}</p>
          <p>{state?.email}</p>
          <p>{state?.comment}</p>
        </>
      }
    </section>
  );
}
