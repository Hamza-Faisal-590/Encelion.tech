import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Encelion.tech — We Build Intelligent AI Solutions for Modern Businesses',
  description: 'Encelion.tech is a premium AI agency and SaaS company helping businesses automate operations, improve productivity, and increase revenue through advanced AI solutions.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}


