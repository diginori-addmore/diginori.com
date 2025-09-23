"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

// 슬라이더에 표시될 이미지 경로 배열
const slideImages = [
    "/recruit_img/hire1.jpg",
    "/recruit_img/hire2.jpg",
    "/recruit_img/hire3.jpg",
    "/recruit_img/hire4.jpg",
];

export default function CareerPage() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 4초마다 다음 이미지로 전환하는 효과
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
        }, 4000); // 4초

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    return (
        // 👇 이 부분에 relative와 z-10을 추가하여 레이어 문제를 해결합니다.
        <div className="relative bg-white dark:bg-gray-800 min-h-screen">

            {/* 1. 상단 이미지 슬라이더 섹션 */}
            <div className="relative w-full h-80 md:h-96">
                {slideImages.map((src, index) => (
                    <Image
                        key={src}
                        src={src}
                        alt={`Career background image ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0} // 첫 이미지만 우선 로딩
                        // 현재 인덱스와 일치하는 이미지만 보이도록 opacity 조절
                        // transition-opacity와 duration으로 페이드 인/아웃 효과 적용
                        className={`z-10 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-70' : 'opacity-0'
                            }`}
                    />
                ))}

                {/* 이미지 위 중앙 텍스트 */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <h1 className="z-10 text-5xl md:text-6xl font-extrabold text-white">
                        채 용 공 고
                    </h1>
                </div>
            </div>

            {/* 2. 내용 설명 섹션 */}
            <div className="max-w-4xl mx-auto p-8 md:p-12">
                {/* 템플릿: 섹션 제목 */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 border-b-2 pb-2">
                    디지노리 - 청년과 함께 성장하는 기업
                </h2>


                {/* 템플릿: 일반 문단 */}
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pb-20">
                    디지노리는 지난 10여 년간 청년들의 사회 진출 첫걸음을 돕는 인큐베이팅, 멘토링, 교육 활동을 꾸준히 이어온 기업입니다.
                    디지노리는 과천시 청년 및 취업 준비생에게 빅테크 기업 출신 경력자들과 함께 일할 기회를 제공하고자 합니다.
                    또한 지인추천제(합법적 제도) 및 커리어 컨설팅을 통해, 실제 대기업 취업으로 이어지는 사례를 만들어가는 것을 목표로 하고 있습니다.
                </p>


                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    모집분야
                </h3>

                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pb-10">
                    <li>개발: 웹/앱 서비스 개발, 데이터/AI 분야</li>
                    <li>디자인: UI/UX, 그래픽, 브랜드 디자인</li>
                    <li>마케팅: 디지털 마케팅, 콘텐츠 기획, 글로벌 홍보</li>
                    <li>경영지원: 기획, 운영, 재무/회계, 사업관리</li>
                </p>

                <hr className="mt-8 mb-15 border-white"></hr>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    지원 자격
                </h3>

                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pb-10">
                    <li>과천시민 또는 과천에서 활동하는 청년</li>
                    <li>새로운 도전을 통해 성장하고 싶은 취업 준비생</li>
                    <li>빅테크 기업 출신 멘토 및 전문가와 함께 경험을 쌓고 싶은 인재</li>
                </p>

                <hr className="mt-8 mb-15 border-white"></hr>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    혜택
                </h3>

                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pb-10">
                    <li>빅테크 기업 경력자와 협업하며 실무 경험 제공</li>
                    <li>멘토링 및 커리어 컨설팅 지원</li>
                    <li>지인추천제 기반의 대기업 취업 연계 기회</li>
                    <li>창업 및 프로젝트 기반 인큐베이팅 지원</li>
                </p>

                <hr className="mt-8 mb-15 border-white"></hr>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    접수 방법
                </h3>

                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pb-10">
                    <li>과천시 창업지원센터 방문 상담 및 접수 환영</li>
                    <li>이력서 및 자기소개서를 이메일 제출 recruit@diginori.com</li>
                    <li>서류 검토 후 개별 면접 안내</li>
                </p>

                <p className="text-center justify-center text-xl md:text-4xl text-white p-10">
                    디지노리와 함께 도전할 인재를 기다립니다.
                </p>
            </div>
        </div >
    );
}