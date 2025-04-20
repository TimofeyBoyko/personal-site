import type { Metadata } from "next";

import Cursor from "@/components/cursor";
import Layout from "@/components/layout";
import Scrollbar from "@/components/scrollbar";
import Header from "@/components/header";

import { layoutStyles } from "./Layout.styles";
import "./globals.scss";

export const metadata: Metadata = {
  // Basic metadata
  title: "Timofey Boyko | Frontend Developer",
  description:
    "Timofey Boyko is a Frontend Developer with experience in React, NextJS, and frontend development. Discover projects, experience, and skills.",
  keywords: [
    "Timofey Boyko",
    "Frontend Developer",
    "React",
    "NextJS",
    "Web Development",
  ],
  authors: [{ name: "Timofey Boyko" }],
  creator: "Timofey Boyko",
  publisher: "Timofey Boyko",

  // Icons
  icons: {
    icon: "/favicon.png",
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://personal-site-seven-azure.vercel.app/",
    title: "Timofey Boyko | Frontend Developer",
    description:
      "Timofey Boyko is a Frontend Developer with experience in React, NextJS, and frontend development. Discover projects, experience, and skills.",
    siteName: "Timofey Boyko",
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    title: "Timofey Boyko | Frontend Developer",
    description:
      "Timofey Boyko is a Frontend Developer with experience in React, NextJS, and frontend development.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={layoutStyles.body}>
        <Scrollbar>
          <Cursor />
          <Layout>
            <Header />
            {children}
          </Layout>
        </Scrollbar>
      </body>
    </html>
  );
}
