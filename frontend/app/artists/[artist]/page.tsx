import React from 'react'
import {artistBySlugQuery, artistQuery} from "@/sanity/queries";
import Artist from "@/components/Artist";
import {client} from "@/sanity/client";
import {ArtistBySlugQueryResult} from "@/sanity/types";
import {notFound} from "next/navigation";

type PageProps = {
    params: Promise<{
        artist: string;
    }>;
};

async function Page(props: PageProps) {
    const params = await props.params;
    const artist = await client.fetch(artistBySlugQuery, {
        slug: params.artist,
    });

    if (!artist) {
        notFound();
    }

    return (
        <Artist artist={artist}/>
    )
}

export default Page
