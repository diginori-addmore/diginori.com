"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    useEffect(() => {
        gsap.utils.toArray(".animate-section").forEach((section: any) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        once: true,
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);


    return (
        <>
            <br id="about"></br>
            <div className="flex flex-col md:flex-row items-center mb-12 w-full gap-8 animate-section">
                {/* 이미지 */}
                <div className="w-full md:w-[57%]">
                    <Image
                        src="/diginori_member.webp"
                        alt="디지노리 팀원"
                        width={1024}
                        height={576}
                        className="rounded-lg shadow-md w-full h-auto"
                        priority
                    />
                </div>

                {/* 텍스트 */}
                <div className="w-full md:flex-1 flex flex-col justify-center animate-section">
                    <section>
                        <p className="text-4xl text-white leading-relaxed font-bold">
                            디지노리를 소개합니다
                        </p>
                        <br></br>
                        <p className="text-lg text-white leading-relaxed">
                            과천시 지식정보타운의 완공과 함께, 디지노리는 청년과 함께하는 창업의 새로운 베이스캠프로 자리매김하고 있습니다.
                        </p>
                        <p className="text-lg text-white leading-relaxed">
                            네이버 출신의 25년 개발 경력을 자랑하는 민경국 대표를 중심으로,
                            마케팅, 개발, 디자인 분야의 재능 있는 청년 4명이 모였습니다.
                            또한 우리의 부족함을 채우기 위한 조선의협객전을 개발하고
                            아직도 LLM AI 을 사용하는 현직 개발자 선배님도 고문으로 위촉 하였습니다.
                        </p>
                        <br></br>
                        <p className="text-lg text-white leading-relaxed font-bold">
                            우리는 과천이라는 고향에서 새로운 성공 신화를 만들고자 합니다.
                        </p>
                    </section>
                </div>
            </div>
            <section className="p-6 mb-12 text-white animate-section">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">비전과 협력</h2>
                <p className="text-lg leading-relaxed">
                    디지노리는 단순한 스타트업이 아닙니다. 우리는 카카오, 넷마블, 클로바 등 국내 유수 IT 기업 출신 경력자들과의 긴밀한 협업 네트워크를 구축하고 있습니다. 이는 민경국 대표가 오픈소스 커뮤니티 활동, 아파치 제플린 에반젤리스트, 그리고 청년 멘토링 등 다양한 공익 활동을 통해 다져온 소중한 관계 덕분입니다. 이를 통해 지역 청년들은 최고의 전문가들과 함께 실무 경험을 쌓으며 성장할 수 있는 특별한 기회를 갖게 될 것입니다.
                </p>
            </section>

            <section className="p-6 mb-12 text-white animate-section">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">우주를 향한 도전: 새로운 게임</h2>
                <p className="text-lg leading-relaxed">
                    디지노리의 첫 번째 야심작은 모든 연령을 위한 우주 게임입니다. 플레이어는 &apos;줍스&apos;와 함께 우주 쓰레기를 청소하며, 인류의 오랜 꿈인 우주 개발과 여행에 대한 이야기를 재미있게 체험하게 됩니다. 이미 글로벌 100개국에 티저 사이트를 배포했으며, 젊은 감각의 마케팅 및 데이터 분석팀이 성공적인 론칭을 위해 밤낮없이 열띤 논의를 이어가고 있습니다.
                </p>
            </section>

            <section className="p-6 mb-12 text-white animate-section">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">든든한 지지</h2>
                <p className="text-lg leading-relaxed">
                    민경국 대표가 시작한 &apos;데이터야놀자&apos; 컨퍼런스는 10년간 성공적으로 이어져 오며 데이터 분석 분야의 대표적인 행사로 자리 잡았습니다. 이러한 성공을 지켜본 IT 업계의 실력자들이 디지노리의 비전에 공감하며 든든한 지지자로 나서고 있습니다. 우리는 이 응원에 힘입어 힘차게 출발합니다.
                </p>
            </section>

            <section className="p-6 mb-12 text-white animate-section">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">실패 140</h2>
                <p className="text-lg leading-relaxed">
                    140번 정도는 실패하고도 살아 남을 팀워크를 보유했습니다. 무수한 실패가 있을 것을 예상하고 있습니다. 딱 140번 실패하겠습니다. 우리는 우리의 부족함을 알기에 우리 모두와 나누고 협력합니다.
                </p>
            </section>

            <hr id='history' className='animate-section text-white'></hr>

            <p className="text-5xl text-white leading-relaxed font-bold text-center animate-section">
                디지노리가 걸어온 길
            </p>

            <div className="flex flex-col md:flex-row items-center mb-12 w-full gap-4 animate-section">
                <div className="w-full md:w-1/2">
                    <Image
                        src="/diginori_logo.webp"
                        alt="디지노리 팀원"
                        width={1024}
                        height={576}
                        className="rounded-lg shadow-md w-full h-auto"
                        priority
                    />
                </div>

                <div className="w-full md:w-1/2">
                    <Image
                        src="/gukak-hs.webp"
                        alt="디지노리 팀원"
                        width={1024}
                        height={576}
                        className="rounded-lg shadow-md w-full h-auto"
                        priority
                    />
                </div>
            </div>

            <section className="p-6 mb-12 text-white animate-section">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">멀리 가려면 함께 가라</h2>
                <p className="text-lg leading-relaxed">
                    세계 최초 스마트폰 사물놀이 - 디지털 시대의 풍물놀이의 대동 세상은 계속 됩니다.
                    동시에 성대 제거 수술을 받으신 분들이 보다 자연스러운 목소리를 표현하기를 바라는 뜻에서 시작된 스마트폰 인공성대 프로토타입(아시아 문화중심도시 미디어아트 부분)도 그분들의 간절한 소망을 잊지 않았습니다. 포기 하지 않았습니다.
                    기술과 예술 그리고 배우고 가르치고 함께 서로 배우다 국립국악고등학교 방과후 수업 진행을 통한 디지노리 예약당 공연과 같이 최고의 무대에 여려분과 함께 서겠습니다.
                </p>
            </section>

            <hr id='location' className='animate-section text-white'></hr>

            <p className="text-5xl text-white leading-relaxed font-bold text-center animate-section">
                찾아오시는 길
            </p>

            <section>
                <p className="text-lg leading-relaxed text-white">
                    경기도 과천시 과천대로7길 65 과천상상자이타워 B동 126호
                </p>
            </section>

        </>
    );
}
