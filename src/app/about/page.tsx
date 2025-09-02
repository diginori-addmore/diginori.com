import type { Metadata } from "next";
import AboutSection from "./AboutSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "회사 소개",
  description: "디지노리 회사 소개: 청년 데이터 분석팀과 함께",
};

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-[#485e6a]">
      <div className="max-w-5xl w-full">
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-bold text-white">
            디지노리
          </h1>
          <h2 className="text-1xl md:text-2xl font-medium text-white">
            청년 데이터분석 팀과 함께
          </h2>
        </header>

        <br></br>
        <nav className="flex w-full mb-12">
          <a
            href="#about"
            className="flex-1 text-center font-bold text-2xl md:text-3xl text-white py-2 transition-all duration-300 hover:bg-white hover:text-black"
          >
            About
          </a>
          <a
            href="#history"
            className="flex-1 text-center font-bold text-2xl md:text-3xl text-white py-2 transition-all duration-300 hover:bg-white hover:text-black"
          >
            History
          </a>
          <a
            href="#location"
            className="flex-1 text-center font-bold text-2xl md:text-3xl text-white py-2 transition-all duration-300 hover:bg-white hover:text-black"
          >
            Location
          </a>
        </nav>


        <hr></hr>



        <div className="space-y-10 text-lg text-gray-700 leading-relaxed">
          <AboutSection />



        </div>
      </div>
    </main>
  );
}
