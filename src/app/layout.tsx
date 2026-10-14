import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Encelion.tech — We Build Intelligent AI Solutions for Modern Businesses',
  description: 'Encelion.tech is a premium AI agency and SaaS company helping businesses automate operations, improve productivity, and increase revenue through advanced AI solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}


