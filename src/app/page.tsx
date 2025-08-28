"use client";
import MediaArtAnimation from "@/components/MediaArtAnimation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the text after the main animation settles
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, delay: 5.5, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="relative min-h-screen w-full h-full overflow-hidden flex items-center justify-center">
      <MediaArtAnimation />
      <div
        ref={textRef}
        className="absolute w-full p-8 text-center text-white mt-[30vh] sm:mt-[40vh]"
      >
        <p className="text-sm md:text-base max-w-2xl mx-auto leading-relaxed" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
          국내 최초 1호 1인 창조기업으로 시작해 대통령 표창을 받은 디지노리는, 이제 AI 디지털 시대의 새로운 놀이를 지역 청년들과 함께 만들어갑니다. 모두와 함께 놀고, 나누고, 협업합니다.
        </p>
      </div>
    </main>
  );
}
