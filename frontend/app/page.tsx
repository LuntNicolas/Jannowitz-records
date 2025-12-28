import React from 'react'
import Hero from "@/components/Hero";
import LandingRelease from "@/components/Landing-release";
import Image from "next/image";

import {releaseQuery} from "@/sanity/queries";
import {sanityFetch} from "@/sanity/live";

async function Page() {
    const {data: releases} = await sanityFetch({query: releaseQuery})

    return (
        <>
            <Hero/>
            <LandingRelease releases={releases}/>
        </>
    )
}

export default Page
