import React from 'react'
import Image from 'next/image'
import HeroLogo from '@/components/hero-logo'

const Hero = () => {
    return (
        <section className="min-h-screen relative overflow-hidden" id="hero">
            <div className="h-screen w-full overflow-hidden flex justify-center items-center">
                <Image
                    className="opacity-50 object-cover object-center"
                    src="/Hero-image.png"
                    alt="Hero-Club"
                    fill
                />
                <HeroLogo/>
            </div>
        </section>
    )
}
export default Hero
