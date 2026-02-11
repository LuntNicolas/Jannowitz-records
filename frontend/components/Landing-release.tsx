"use client"

import {useState} from 'react'
import Link from 'next/link'
import {LandingReleaseQueryResult} from '@/sanity/types'
import {urlFor} from "@/sanity/image";
import Image from 'next/image';
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {Observer} from "gsap/Observer"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {FaBandcamp, FaFacebook, FaInstagram, FaSoundcloud, FaSpotify, FaTiktok, FaYoutube} from "react-icons/fa";
import {SplitText} from 'gsap/SplitText'
import LightPillar from "./LightPillar";

gsap.registerPlugin(SplitText);

interface Props {
    releases: LandingReleaseQueryResult
}

const socialIcons: Record<string, React.ElementType> = {
    Bandcamp: FaBandcamp,
    FaceBook: FaFacebook,
    Instagram: FaInstagram,
    SoundCloud: FaSoundcloud,
    Spotify: FaSpotify,
    TikTok: FaTiktok,
    Youtube: FaYoutube,
}


// Gradient combinations for backgrounds
const gradients = [
    'linear-gradient(135deg, rgba(103, 58, 183, 0.15) 0%, rgba(244, 143, 177, 0.1) 100%)',
    'linear-gradient(135deg, rgba(26, 35, 126, 0.15) 0%, rgba(142, 36, 170, 0.1) 100%)',
    'linear-gradient(135deg, rgba(13, 71, 161, 0.15) 0%, rgba(3, 155, 229, 0.1) 100%)',
    'linear-gradient(135deg, rgba(0, 77, 64, 0.15) 0%, rgba(0, 150, 136, 0.1) 100%)',
    'linear-gradient(135deg, rgba(191, 54, 12, 0.15) 0%, rgba(255, 87, 34, 0.1) 100%)',
    'linear-gradient(135deg, rgba(74, 20, 140, 0.15) 0%, rgba(156, 39, 176, 0.1) 100%)',
]

const LandingRelease = ({releases}: Props) => {
    const width = 1000;
    const height = 1000;
    const [currentRelease, setCurrentRelease] = useState(0)
    const [direction, setDirection] = useState(1)
    const [prevReleaseIdx, setPrevReleaseIdx] = useState<number | null>(null);
    const {cover, title, links, releaseDate, artist} = releases[currentRelease];
    const prevCover = prevReleaseIdx !== null ? releases[prevReleaseIdx]?.cover : null;
    const [threadOffset, setThreadOffset] = useState(0);
    console.log(title);

    const nextRelease = () => {
        setPrevReleaseIdx(currentRelease);
        setDirection(1);
        setCurrentRelease((prev) => (prev + 1) % releases.length)
    }

    const prevRelease = () => {
        setPrevReleaseIdx(currentRelease);
        setDirection(-1);
        setCurrentRelease((prev) =>
            prev === 0 ? releases.length - 1 : prev - 1
        )
    }

    useGSAP(() => {
        if (prevReleaseIdx === null) return;
        const tl = gsap.timeline();
        let split = SplitText.create('.release-title', {type: "chars"});
        const target = {val: threadOffset}

        if (direction === 1) {
            tl
                .fromTo(".new-image", {
                    clipPath: "inset(0% 100% 0% 0%)",
                }, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.8,
                    ease: "power2.inOut",
                })
                .fromTo(split.chars, {
                    clipPath: "inset(0% 100% 0% 0%)",
                }, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.9,
                    stagger: 0.01,
                    ease: "power2.inOut"
                }, 0)
                .to(target, {
                    val: threadOffset,
                    duration: 1,
                    ease: "power2.out",
                    onUpdate: () => setThreadOffset(target.val)
                })
        } else {
            tl
                .fromTo(".new-image", {
                    clipPath: "inset(0% 0% 0% 100%)"
                }, {
                    // width: "100%",
                    duration: 0.8,
                    ease: "power2.inOut",
                    clipPath: "inset(0% 0% 0% 0%)",
                })
                .fromTo(split.chars, {
                    clipPath: "inset(0% 0% 0% 100%)",
                }, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    stagger: {
                        each: 0.01,
                        from: "end",
                    },
                    duration: 0.9,
                    ease: "power2.inOut"
                }, 0)

        }
        return () => split.revert();
    }, [currentRelease]);

    return (
        <section>
            <div className="flex justify-center md:justify-between m-10 items-center">
                <div className="flex flex-col text-center md:text-left">
                    <h1 className="text-white md:text-3xl text-xl">Our latest Releases</h1>
                    <p className="text-white/60 text-base opacity-70">Fresh tracks from our Artists</p>
                </div>
                <div className="hidden md:flex justify-end w-30 ">
                    <Link className="whitespace-nowrap opacity-70 hover:opacity-100 transition duration-300 text-white"
                          href="/releases">View all &#8594;</Link>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <LightPillar
                        topColor="#FFFFFF"
                        bottomColor="#444444"
                        intensity={0.5}
                        rotationSpeed={0.3}
                        glowAmount={0.003}
                        pillarWidth={2.9}
                        pillarHeight={0.5}
                        noiseIntensity={0.5}
                        pillarRotation={90}
                        mixBlendMode="screen"
                        quality="high"
                    />
                </div>

                {/*Showcase Release Section*/}
                <div
                    className="relative grid md:grid-cols-2 grid-rows-2 md:grid-rows-none md:gap-24 gap-15 md:mx-20 mx-0 md:py-10 rounded-lg back-div justify-center">
                    <div className="relative md:h-80 md:w-80 w-50 h-50 md:ml-10 ml-4 rounded-lg">
                        {prevCover && (
                            <div className="slider z-10 ">
                                <Image
                                    src={urlFor(prevCover).width(1000).height(1000).url()}
                                    alt="Previous cover"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        )}
                        <div className="new-image absolute inset-0 z-20 overflow-hidden rounded-lg">
                            {cover && (
                                <div className="slider">
                                    <Image
                                        src={urlFor(cover).width(1000).height(1000).url()}
                                        alt="New cover"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="meta-info flex flex-col md:gap-10 gap-4 z-10 justif">
                        <h1 key={currentRelease}
                            className="text-white text-bold md:text-6xl text-xl release-title font-bold md:text-left text-center">
                            {title?.toUpperCase()}
                        </h1>
                        <h2 className="release-title text-white opacity-80 text-sm md:text-left text-center">{artist}</h2>
                        {/*<div className="flex gap-5">*/}
                        {/*    {links?.map((link) => {*/}
                        {/*        if (!link.platform || !link.url) return null;*/}

                        {/*        const Icon = socialIcons[link.platform];*/}
                        {/*        if (!Icon) return null;*/}

                        {/*        return (*/}
                        {/*            <a*/}
                        {/*                key={link._key}*/}
                        {/*                href={link.url}*/}
                        {/*                target="_blank"*/}
                        {/*                rel="noopener noreferrer"*/}
                        {/*                className="text-white hover:text-gray-300 transition-colors"*/}
                        {/*                aria-label={link.platform}*/}
                        {/*            >*/}
                        {/*                <Icon size={24}/>*/}
                        {/*            </a>*/}
                        {/*        );*/}
                        {/*    })}*/}
                        {/*</div>*/}
                        <div className="gap-25 flex">
                            <button
                                className="relative px-6 py-2 border border-white/20 rounded-full overflow-hidden transition-all text-white duration-300 hover:border-white/50 bg-white/5 backdrop-blur-sm w-fit"
                                onClick={prevRelease}>&#x2190;
                            </button>
                            <button
                                className="relative px-6 py-2 border border-white/20 rounded-full overflow-hidden transition-all text-white  duration-300 hover:border-white/50 bg-white/5 backdrop-blur-sm w-fit"
                                onClick={nextRelease}>&#x2192;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingRelease