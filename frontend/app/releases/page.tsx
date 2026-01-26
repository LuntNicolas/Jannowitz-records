import React from 'react'
import {sanityFetch} from "@/sanity/live";
import {releaseQuery} from "@/sanity/queries";
import Releases from "@/components/releases";

async function Page() {
    const {data: releases} = await sanityFetch({query: releaseQuery});
    return (
        <Releases releases={releases}/>
    )
}

export default Page
