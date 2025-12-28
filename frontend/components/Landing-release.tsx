"use client"

import React from 'react'
import Link from 'next/link'
import {ReleaseQueryResult} from '@/sanity/types'
import {urlFor} from "@/sanity/image";
import Image from 'next/image';
import {useEffect, useRef} from 'react'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {Observer} from "gsap/Observer"
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger)

interface Props {
    releases: ReleaseQueryResult
}

const LandingRelease = ({releases}: Props) => {
    const width = 1000;
    const height = 1000;

    return (
        <section className="h-screen">
            <div className="flex justify-center md:justify-between m-10 items-center">
                <div className="flex flex-col text-center md:text-left">
                    <h1 className="text-white md:text-3xl text-xl">Our latest Releases</h1>
                    <p className="text-white/60 text-base opacity-70">Fresh tracks from our Artists</p>
                </div>
                <div className="hidden md:flex justify-end w-30">
                    <Link className="whitespace-nowrap opacity-70 hover:opacity-100 transition duration-300"
                          href="/releases">View all &#8594;</Link>
                </div>
            </div>
            <div>
                <div className="">
                    <ul className="slider-container">
                        {releases.map(release => (
                            <li key={release._id} className="flex flex-col gap-2 px-10 md:px-15">
                                {release.cover ? (
                                    <div className="slider-overlay">
                                        <div className="relative md:w-100 md:h-100 w-100 h-100 overflow-hidden">
                                            <Image
                                                src={urlFor(release.cover).width(width).height(height).url()}
                                                alt={release.title || "Release Cover"}
                                                width={width}
                                                height={height}
                                                className="absolute w-full h-full"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>No Image</div>
                                )}
                                <div>
                                    <p className="">({release.catalog}) {release.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex md:hidden justify-center m-10">
                <Link className="whitespace-nowrap" href="/releases">View all &#8594;</Link>
            </div>
        </section>
    )
}
export default LandingRelease