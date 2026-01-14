import React from 'react'
import Hero from "@/components/Hero";
import LandingRelease from "@/components/Landing-release";
import Image from "next/image";

import {releaseQuery, partnerQuery} from "@/sanity/queries";
import {sanityFetch} from "@/sanity/live";
import Partners from "@/components/Partners";

async function Page() {
    const {data: releases} = await sanityFetch({query: releaseQuery})
    const {data: partners} = await sanityFetch({query: partnerQuery})

    return (
        <>
            <Hero/>
            <LandingRelease releases={releases}/>
            <Partners partners={partners}/>
        </>
    )
}

export default Page
