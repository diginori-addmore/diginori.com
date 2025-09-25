import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Suspense } from "react";
import GTM from "@/components/GTM";
import BackgroundStars from "@/components/BackgroundStars";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 디지노리",
    default: "디지노리 - AI, 디지털 시대의 놀이",
  },
  description:
    "15년전 국내 1호 1인 창조기업 법인 한샘뭇씀에서 시작된 디지노리는 미래기획위원회 위원장 표창 기업으로. 이제 AI, 디지털시대의 놀이에 대한 꿈을 다시 더 넓고 깊게 펼처 갑니다. 모든 분들과 놀며 협업 합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navLinks = [
    { href: "/", label: "홈" },
    { href: "/about", label: "회사 소개" },
    {
      href: "https://github.com/orbital-pet/diginori.com.public/wiki/Press",
      label: "언론 보도",
      external: true,
    },
    {
      href: "https://github.com/orbital-pet/diginori.com.public/issues?q=is%3Aissue%20state%3Aopen%20label%3A%EC%B1%84%EC%9A%A9",
      label: "채용",
      external: true,
    },
    {
      href: "https://github.com/orbital-pet/diginori.com.public/wiki/IR",
      label: "IR",
      external: true,
    },
    {
      href: "https://blog.diginori.com",
      label: "BLOG",
      external: true,
    },
    {
      href: "https://orbital-pet.diginori.com",
      label: "PET",
      external: true,
    },
  ];

  return (

    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GTM />
        </Suspense>
        <BackgroundStars />
        <nav className="bg-gray-800 p-4 z-50 relative">
          <div className="container mx-auto flex justify-between">
            <div className="flex space-x-4">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-300"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white hover:text-gray-300"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
