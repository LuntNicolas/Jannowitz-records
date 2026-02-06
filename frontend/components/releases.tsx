"use client"

import {useRef} from 'react'
import {ReleaseQueryResult} from "@/sanity/types";
import Image from "next/image";
import {urlFor} from "@/sanity/image";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from '@gsap/react';

gsap.registerPlugin(ScrollTrigger)

interface Props {
    releases: ReleaseQueryResult
}

const Releases = ({releases}: Props) => {
    const w = 800;
    const h = 800;
    const container = useRef(null);

    const getSpotifyEmbedUrl = (url: string | undefined) => {
        if (!url) return null;
        // Ersetzt "open.spotify.com/" durch "open.spotify.com/embed/"
        return url.replace("open.spotify.com/", "open.spotify.com/embed/");
    };

    useGSAP(() => {
        const images = gsap.utils.toArray<HTMLElement>(".image-gallery");

        // images.forEach((img, index) => {
        //
        //     // Hover-Animation
        //     img.addEventListener('mouseenter', () => {
        //         gsap.to(img, {
        //             scale: 1.05,
        //             y: -10,
        //             duration: 0.4,
        //             ease: "power2.out"
        //         });
        //     });
        //
        //     img.addEventListener('mouseleave', () => {
        //         gsap.to(img, {
        //             scale: 1,
        //             y: 0,
        //             duration: 0.4,
        //             ease: "power2.out"
        //         });
        //     });
        // });

        ScrollTrigger.batch(".image-gallery", {
            onEnter: batch => gsap.from(batch, {
                y: 100,
                opacity: 0,
                stagger: 0.1,
                markers: true,
                start: "top 80%",
                end: "top 60%",
            })
        })
    }, []);

    return (
        <section className="h-fit release-section pt-5">
            <div className="self-stretch mx-10">
                <h1 className="text-2xl font-semibold text-white">Releases</h1>
                <p className="text-gray-500">Explore our complete catalog of releases. Each record represents our
                    commitment to pushing the boundaries of techno music.</p>
            </div>

            <div className="w-full px-10 my-10">
                <ul className="flex h-fit w-full flex-wrap">
                    {releases.map((release) => (
                        <li key={release._id} className="image-gallery">
                            <div
                                className="flex items-center flex-col m-0 p-1 md:my-0 my-10 md:p-5 md:m-8 w-max">
                                {release.cover ? (
                                    <div className=" relative">
                                        <Image
                                            src={urlFor(release.cover).width(w).height(h).url()}
                                            alt={release.title || "Image"}
                                            width={w}
                                            height={h}
                                            className="md:w-90 w-70 h-fit rounded-xl"
                                        />
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
