"use client";
import MediaArtAnimation from "@/components/MediaArtAnimation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from 'next/link';

export default function Home() {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Button animation
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, delay: 5.5, ease: "power3.out" }
    );

  }, []);

  return (
    <main className="relative min-h-screen w-full h-full overflow-hidden flex items-center justify-center flex-col bg-black">
      <div className="fixed top-0 left-0 w-full h-full" style={{ zIndex: 5 }}>
        <MediaArtAnimation />
      </div>

      {/* HTML text removed - using particles only */}

      <Link href="/about" passHref ref={buttonRef} className="opacity-0 absolute bottom-16 px-6 py-3 rounded-full text-white border border-white hover:bg-white hover:text-black transition-all duration-300" style={{ zIndex: 20 }}>
          더 알아보기
      </Link>
    </main>
  );
}
