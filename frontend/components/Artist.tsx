"use client"

import Image from "next/image";
import {urlFor} from "@/sanity/image";
import {ArtistBySlugQueryResult} from "@/sanity/types";
import Link from "next/link";
import {PortableText} from '@portabletext/react'
import {FaBandcamp, FaSpotify, FaTiktok, FaYoutube, FaSoundcloud, FaFacebook, FaInstagram} from 'react-icons/fa'
import {MdOutlineFileDownload} from "react-icons/md";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";

gsap.registerPlugin(SplitText)

interface Props {
    artist: NonNullable<ArtistBySlugQueryResult>;
}

const socialIcons: Record<string, React.ElementType> = {
    Bandcamp: FaBandcamp,
    FaceBook: FaFacebook,
    Instagram: FaInstagram,
    SoundCloud: FaSoundcloud,
    Spotify: FaSpotify,
    TikTok: FaTiktok,
    Youtube: FaYoutube,
}

const Artist = ({artist}: Props) => {
    const w = 800;
    const h = 800;

    useGSAP(() => {
        let biography = SplitText.create(".Biography", {type: "words, lines"})

        gsap.from(biography.lines, {
            duration: 0.8,
            y: 100,       // animate from 100px below
            autoAlpha: 0, // fade in from opacity: 0 and visibility: hidden
            stagger: 0.05 // 0.05 seconds between each
        })
    })

    return (
        <section className="h-fit self-stretch mx-10 flex flex-col gap-10 mb-20">
            <div className="self-stretch mt-20 md:mx-10 mx-0">
                <Link href={"/artists"}>
                    <p className="text-white opacity-50">&#x2190; Back to artists</p>
                </Link>
            </div>
            <div className="flex justify-center gap-9 md:flex-row flex-col">
                <div className="flex flex-col gap-5 animate-in" data-flip-id={`img-${artist._id}`}>
                    {artist.profileImage ? (
                        <Image
                            src={urlFor(artist.profileImage).width(w).height(h).url()}
                            alt={artist.name || "Image"}
                            width={w}
                            height={h}
                            className="md:w-96 md:h-96 w-full rounded-xl image-flip"
                            data-flip-id={`img-${artist._id}`}
                            style={{viewTransitionName: `artist-img-${artist._id}`}}
                        />
                    ) : (
                        <p>No image</p>
                    )}
                    <div className="flex gap-5">
                        {artist.links?.map((link) => {
                            if (!link.platform || !link.url) return null;

                            const Icon = socialIcons[link.platform];
                            if (!Icon) return null;

                            return (
                                <a
                                    key={link._key}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-gray-300 transition-colors"
                                    aria-label={link.platform}
                                >
                                    <Icon size={24}/>
                                </a>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="buttons">
                            <a href="mailto:Bookings@jannowitz.com ">Booking</a>
                        </div>
                        {artist.pressKit && (
                            <div className="buttons">
                                <a
                                    href={`${artist.pressKit}?dl=${artist.slug}-presskit.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full"
                                >
                                    <MdOutlineFileDownload/>
                                    Presskit
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="text-white flex flex-col gap-5">
                    <h1 className="text-3xl font-bold">{artist.name}</h1>
                    <div className="md:w-150 w-75 flex flex-col gap-5 leading-6">
                        <h2 className="text-2xl">Biography</h2>
                        {artist.bio &&
                            <div className="Biography leading-7 opacity-70"><PortableText value={artist.bio}/></div>}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Artist