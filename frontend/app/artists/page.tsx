import React from 'react'
import {sanityFetch} from "@/sanity/live";
import {artistQuery} from "@/sanity/queries";
import Artists from "@/components/artists";

async function Page() {
    const {data: artists} = await sanityFetch({query: artistQuery})

    return (
        <Artists artists={artists}/>
    )
}

export default Page
