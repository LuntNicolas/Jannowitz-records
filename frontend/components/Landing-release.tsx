import React from 'react'
import Link from 'next/link'

const LandingRelease = () => {
    return (
        <section className="h-screen">
            <div className="flex justify-between m-10">
                <div className="w-full flex flex-col">
                    <h1 className="text-xl">Our latest Releases</h1>
                    <p className="text-sm">Fresh tracks from our Artists</p>
                </div>
                <div className="flex items-center justify-end">
                    <Link href="/releases">View all &#8594;</Link>
                </div>
            </div>
        </section>
    )
}
export default LandingRelease
