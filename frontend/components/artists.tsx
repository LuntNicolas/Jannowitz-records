'use client'

import React from 'react'
import {ArtistQueryResult} from "@/sanity/types";
import Image from "next/image";
import {urlFor} from "@/sanity/image";
import Link from "next/link";
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

interface Props {
    artists: ArtistQueryResult
}

const Artists = ({artists}: Props) => {
    const w = 800;
    const h = 800;

    useGSAP(() => {

        ScrollTrigger.batch(".image-gallery", {
            onEnter: batch => gsap.from(batch, {
                y: 100,
                stagger: 0.1,
                ease: "power1.out",
                opacity: 0,
            })
        })
    }, [])

    return (
        <section className="h-fit">
            <div className="self-stretch pt-5 mx-10">
                <h1 className="text-2xl font-semibold text-white">Artists</h1>
                <p className="text-gray-500">Meet the talented artists who define the Jannowitz Records sound. Each
                    brings their unique vision to our label.</p>
            </div>

            <div className="w-full px-10 my-10">
                <ul className="flex h-fit w-full flex-wrap artist-list">
                    {artists.map((artist) => (
                        <li key={artist._id} className="w-fit image-gallery">
                            <Link
                                className="flex items-center flex-col m-0 p-1 md:my-0 my-10 md:p-5 md:m-8 w-max"
                                href={`/artists/${artist.slug?.current}`}>
                                {artist.profileImage ? (
                                    <div className=" relative ">
                                        <Image
                                            src={urlFor(artist.profileImage).width(w).height(h).url()}
                                            alt={artist.name || "Image"}
                                            width={w}
                                            height={h}
                                            className="md:w-90 w-70 h-fit rounded-xl image-flip-state"
                                            data-flip-id={`img-${artist._id}`}
                                            style={{viewTransitionName: `artist-img-${artist._id}`}}
                                        />
                                    </div>
                                ) : (
                                    <p>No image</p>
                                )}

                                <div className="artist-information ">
                                    <h2 className="text-white">{artist.name}</h2>
                                    <p className="text-white opacity-50">View more &rarr;</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

        </section>
    )
}
export default Artists