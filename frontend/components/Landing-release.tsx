"use client";

import React, {useState} from "react";
import Image from "next/image";
import {motion, AnimatePresence} from "framer-motion";
import {urlFor} from "@/sanity/image";
import {ArrowRight, ExternalLink} from "lucide-react";
import {ReleaseQueryResult} from "@/sanity/types";

interface Props {
    releases: ReleaseQueryResult
}

export default function LandingRelease({releases}: Props) {
    const [index, setIndex] = useState(0);

    const nextStep = () => {
        setIndex((prev) => (prev + 1) % releases.length);
    };

    const currentRelease = releases[index];

    return (
        <section className="relative h-[90vh] w-full overflow-hidden bg-black text-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentRelease._id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.8, ease: [0.22, 1, 0.36, 1]}}
                    className="relative h-full w-full"
                >
                    {/* Hintergrundbild mit Zoom-Effekt */}
                    <motion.div
                        initial={{scale: 1.1}}
                        animate={{scale: 1}}
                        transition={{duration: 1.5}}
                        className="absolute inset-0"
                    >
                        {currentRelease.cover ? (
                            <Image
                                // Nutze den Nullish Coalescing Operator (?? ""),
                                // um sicherzustellen, dass immer ein String übergeben wird.
                                src={urlFor(currentRelease.cover).url() ?? ""}
                                alt={currentRelease.title ?? "Release Cover"}
                                fill
                                priority
                                className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-zinc-500">
                                No Cover Art Available
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>
                    </motion.div>

                    {/* Content Overlays */}
                    <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-16 lg:p-24">
                        <motion.span
                            initial={{y: 20, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.2}}
                            className="mb-4 font-mono text-sm tracking-widest text-emerald-400"
                        >
                            #{currentRelease.catalog || "000"} — RELEASE
                        </motion.span>

                        <motion.h2
                            initial={{y: 40, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 0.3, duration: 0.6}}
                            className="text-6xl font-black uppercase leading-none md:text-8xl lg:text-[10rem]"
                        >
                            {currentRelease.title}
                        </motion.h2>

                        <div className="mt-8 flex flex-wrap gap-6">
                            {currentRelease.links?.[0] && Object.entries(currentRelease.links[0]).map(([key, url]) => (
                                url && (
                                    <motion.a
                                        key={key}
                                        href={url as string}
                                        target="_blank"
                                        whileHover={{scale: 1.05}}
                                        className="flex items-center gap-2 border-b border-white/20 pb-1 text-sm uppercase tracking-tighter hover:border-white"
                                    >
                                        {key} <ExternalLink size={14}/>
                                    </motion.a>
                                )
                            ))}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-10 right-10 z-20 flex items-center gap-8">
                <div className="hidden md:block">
                    <span className="text-4xl font-light">0{index + 1}</span>
                    <span className="mx-2 text-white/30">/</span>
                    <span className="text-lg text-white/30">0{releases.length}</span>
                </div>

                <button
                    onClick={nextStep}
                    className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-black"
                >
                    <ArrowRight className="transition-transform group-hover:translate-x-1"/>
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                        <circle
                            cx="40"
                            cy="40"
                            r="38"
                            stroke="currentColor"
                            strokeWidth="1"
                            fill="transparent"
                            className="opacity-20"
                        />
                    </svg>
                </button>
            </div>

            {/* Fortschrittsbalken oben */}
            <div className="absolute top-0 left-0 z-30 h-1 w-full bg-white/10">
                <motion.div
                    key={index}
                    initial={{width: 0}}
                    animate={{width: "100%"}}
                    transition={{duration: 5, ease: "linear"}}
                    onAnimationComplete={nextStep}
                    className="h-full bg-white"
                />
            </div>
        </section>
    );
}