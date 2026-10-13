import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Encelion.tech - Admin Dashboard',
  description: 'Master Control & AI Operations Console for Encelion.tech',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4F7FB] text-[#0F172A] antialiased selection:bg-[#00B894]/20 selection:text-[#00B894]">
        {children}
      </body>
    </html>
  );
}
