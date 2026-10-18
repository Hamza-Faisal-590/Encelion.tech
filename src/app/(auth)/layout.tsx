import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0F19] relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00F0FF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#7000FF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#04171d] border border-[#00B894]/40 shadow-lg shadow-[#00B894]/25 flex items-center justify-center group-hover:scale-105 transition duration-200">
              <img src="/logo.png" alt="Encelion.tech Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Encelion<span className="text-[#00B894]">.tech</span>
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
