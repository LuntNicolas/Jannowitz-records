import React from 'react'
import Hero from "@/components/Hero";
import LandingRelease from "@/components/Landing-release";
import {type SanityDocument} from 'next-sanity'

import {client} from '@/sanity/lib/client'
import {releaseQuery} from "@/sanity/lib/queries";

const options = {next: {revalidate: 30}}

async function Page() {
    const releases = await client.fetch<SanityDocument[]>(releaseQuery, {}, options)
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
