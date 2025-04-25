import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Links | Wintour",
  description: "Connect with Maxwell Young on music platforms and social media",
};

export default function LinksPage() {
  const links = [
    {
      href: "https://open.spotify.com/artist/5HONdRTLNvBjlD2LirKp0q?si=158b2846b4f942f3",
      label: "Spotify",
    },
    {
      href: "https://music.apple.com/nz/artist/maxwell-young/1113632139",
      label: "Apple Music",
    },
    { href: "https://instagram.com/maxwell_young", label: "Instagram" },
    { href: "https://twitter.com/internetmaxwell", label: "Twitter" },
  ];

  return (
    <main className="min-h-screen bg-[#d8e3cf] flex flex-col items-center justify-center p-8 space-y-8">
      <h1 className="text-4xl font-bold uppercase tracking-tight">Connect</h1>
      <div className="w-full max-w-sm grid grid-cols-1 gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-center space-x-2 bg-black text-white py-4 px-6 rounded-lg uppercase tracking-widest hover:bg-black/90 transition"
          >
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
