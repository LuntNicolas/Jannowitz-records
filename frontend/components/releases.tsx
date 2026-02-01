"use client"

import {useState} from 'react'
import {ReleaseQueryResult} from "@/sanity/types";
import Image from "next/image";
import {urlFor} from "@/sanity/image";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from '@gsap/react';


interface Props {
    releases: ReleaseQueryResult
}

const Releases = ({releases}: Props) => {
    const w = 800;
    const h = 800;

    useGSAP(() => {
        const images = gsap.utils.toArray<HTMLElement>(".image-gallery");

        images.forEach((img, index) => {
            gsap.fromTo(
                img,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.92,
                    rotateX: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 85%",
                        end: "top 60%",
                        toggleActions: "play none none none",
                        once: true
                    },
                    delay: (index % 3) * 0.1 // Staggered effect für Items in der gleichen Row
                }
            );

            // Hover-Animation
            img.addEventListener('mouseenter', () => {
                gsap.to(img, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            img.addEventListener('mouseleave', () => {
                gsap.to(img, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });
    }, []);

    return (
        <section className="h-fit">
            <div className="self-stretch mt-20 mx-10">
                <h1 className="text-2xl font-semibold text-white">Releases</h1>
                <p className="text-gray-500">Explore our complete catalog of releases. Each record represents our
                    commitment to pushing the boundaries of techno music.</p>
            </div>

            <div className="w-full px-10 my-10">
                <ul className="flex h-fit w-full flex-wrap">
                    {releases.map((release) => (
                        <li key={release._id}>
                            <div
                                className="flex items-center flex-col m-0 p-1 md:my-0 my-10 md:p-5 md:m-8 w-max">
                                {release.cover ? (
                                    <div className="image-gallery relative">
                                        <Image
                                            src={urlFor(release.cover).width(w).height(h).url()}
                                            alt={release.title || "Image"}
                                            width={w}
                                            height={h}
                                            className="md:w-90 w-70 h-fit rounded-xl"
                                        />
                                        {/*<div className="absolute inset-0 flex flex-col justify-center items-center gap-3  bg-opacity-60 text-white font-bold text-5xl text-center z-10 duration-500 opacity-0 p-4">*/}
                                        {/*    {release.links?.map((link) => (*/}
                                        {/*        <div key={link._key} className="flex gap-4">*/}
                                        {/*            {link.beatport && (*/}
                                        {/*                <a*/}
                                        {/*                    href={link.beatport}*/}
                                        {/*                    target="_blank"*/}
                                        {/*                    rel="noopener noreferrer"*/}
                                        {/*                    className="underline"*/}
                                        {/*                >*/}
                                        {/*                    Beatport*/}
                                        {/*                </a>*/}
                                        {/*            )}*/}

                                        {/*            {link.soundcloud && (*/}
                                        {/*                <a*/}
                                        {/*                    href={link.soundcloud}*/}
                                        {/*                    target="_blank"*/}
                                        {/*                    rel="noopener noreferrer"*/}
                                        {/*                    className="underline"*/}
                                        {/*                >*/}
                                        {/*                    SoundCloud*/}
                                        {/*                </a>*/}
                                        {/*            )}*/}

                                        {/*            {link.spotify && (*/}
                                        {/*                <a*/}
                                        {/*                    href={link.spotify}*/}
                                        {/*                    target="_blank"*/}
                                        {/*                    rel="noopener noreferrer"*/}
                                        {/*                    className="underline"*/}
                                        {/*                >*/}
                                        {/*                    Spotify*/}
                                        {/*                </a>*/}
                                        {/*            )}*/}
                                        {/*        </div>*/}
                                        {/*    ))}*/}
                                        {/*</div>*/}
                                    </div>
                                ) : (
                                    <p>No image</p>
                                )}


                                <div className="release-information">
                                    <h2 className="text-white">{release.title}</h2>
                                    <p className="text-white opacity-50">{release.catalog}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    )
}
export default Releases
