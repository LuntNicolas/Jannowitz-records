import React from 'react'
import {sanityFetch} from "@/sanity/live";
import {landingReleaseQuery} from "@/sanity/queries";
import Releases from "@/components/releases";

async function Page() {
    const {data: releases} = await sanityFetch({query: landingReleaseQuery});
    return (
        <Releases releases={releases}/>
    )
}

export default Page
