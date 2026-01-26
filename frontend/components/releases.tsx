"use client"

import {useState} from 'react'
import {ReleaseQueryResult} from "@/sanity/types";
import Image from "next/image";
import {urlFor} from "@/sanity/image";


interface Props {
    releases: ReleaseQueryResult
}

const Releases = ({releases}: Props) => {
    const w = 800;
    const h = 800;

    return (
        <section className="h-fit">
            <div className="self-stretch mt-20 mx-10">
                <h1 className="text-2xl font-semibold text-white">Releases</h1>
                <p className="text-gray-500">Explore our complete catalog of releases. Each record represents our
                    commitment to pushing the boundaries of techno music.</p>
            </div>

            <div className="w-full px-10">
                <ul className="flex h-fit w-full flex-wrap">
                    {releases.map((release) => (
                        <li key={release._id}>
                            <div
                                className="flex items-center flex-col m-0 p-1 md:my-0 my-10 md:p-5 md:m-8">
                                {release.cover ? (
                                    <div className="relative">
                                        <Image
                                            src={urlFor(release.cover).width(w).height(h).url()}
                                            alt={release.title || "Image"}
                                            width={w}
                                            height={h}
                                            className="md:w-90 w-70 h-fit"
                                        />
                                        <div
                                            className="absolute inset-0 flex flex-col justify-center items-center gap-3  bg-opacity-60 text-white text-center z-10 transition-opacity duration-500 opacity-100 p-4">
                                            {}
                                        </div>
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
