import React from 'react'
import {ReleaseQueryResult} from "@/sanity/types";


interface Props {
    releases: ReleaseQueryResult
}

const Releases = (releases: Props) => {
    return (
        <div className="h-screen text-5xl text-white">Releases</div>
    )
}
export default Releases
