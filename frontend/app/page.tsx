import React from 'react'
import Hero from "@/components/Hero";
import LandingRelease from "@/components/Landing-release";
import Image from "next/image";

import {releaseQuery} from "@/sanity/queries";
import {sanityFetch} from "@/sanity/live";
import {urlFor} from "@/sanity/image";

async function Page() {
    const {data: releases} = await sanityFetch({query: releaseQuery})

    return (
        <>
            <Hero/>
            <LandingRelease/>
            <ul className="text-white">
                {releases.map((release) => (
                    <li key={release._id}>
                        <p>{release.title}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Page
