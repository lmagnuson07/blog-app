import ContactForm from '@/src/components/contact/contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Logan's contact page",
  description: 'Contact us and let us know your thoughts!',
};

export default function ContactPage() {
  return <ContactForm />;
}
