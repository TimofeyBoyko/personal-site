import type { Metadata } from "next";

import Cursor from "@/components/cursor";

import "./globals.scss";
import Layout from "@/components/layout";
import Scrollbar from "@/components/scrollbar";

export const metadata: Metadata = {
  title: "Timofey Boyko",
  description: "Personal site for Timofey Boyko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative max-h-dvh overflow-hidden bg-slate-900 font-sans leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900`}
      >
        <Scrollbar>
          <Cursor />
          <Layout>{children}</Layout>
        </Scrollbar>
      </body>
    </html>
  );
}
