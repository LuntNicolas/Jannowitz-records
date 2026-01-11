"use client"

import React from 'react'
import Link from 'next/link'
import {ReleaseQueryResult} from '@/sanity/types'
import {urlFor} from "@/sanity/image";
import Image from 'next/image';
import {useRef} from 'react'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {Observer} from "gsap/Observer"
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useMediaQuery} from "react-responsive"

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger)

interface Props {
    releases: ReleaseQueryResult
}

interface HorizontalLoopConfig {
    repeat?: number;
    paused?: boolean;
    speed?: number;
    snap?: number | false;
    paddingRight?: number;
    reversed?: boolean;
}

const LandingRelease = ({releases}: Props) => {
    const isMobile = useMediaQuery({maxWidth: 1000});
    const container = useRef<HTMLDivElement>(null);
    const width = 1000;
    const height = 1000;

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".slider-item");
        const images = gsap.utils.toArray<HTMLElement>(".parallax-img");

        const loop = horizontalLoop(items, {repeat: -1})
        let slow = gsap.to(loop, {timeScale: 0, duration: 0.5});
        loop.timeScale(0);

        // const parallaxImages = images.map(image => {
        //         return gsap.quickSetter(image, "xPercent");
        //     }
        // );
        //
        // gsap.ticker.add(() => {
        //     images.forEach((image, i) => {
        //         const rect = image.getBoundingClientRect();
        //         const winW = window.innerWidth;
        //
        //         const screenProgress = (rect.left + rect.width / 2) / winW;
        //
        //         const movement = (screenProgress - 0.5) * 30;
        //         parallaxImages[i](movement);
        //     });
        // });

        Observer.create({
            target: ".slider-container",
            type: isMobile ? "touch" : "wheel",
            wheelSpeed: -1,
            onChange: self => {
                if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
                    loop.timeScale(-self.deltaX);
                    slow.invalidate().restart();
                }
            }
        });
        Observer.create({
            target: items,
            onHover: self => {
                const meta = (self.target as HTMLElement).querySelector(".meta-release");
                gsap.to(meta, {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    overwrite: true
                })
            },
            onHoverEnd: (self) => {
                const meta = (self.target as HTMLElement).querySelector(".meta-release");
                gsap.to(meta, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3,
                    overwrite: true
                });
            }
        });
    }, {scope: container});


    return (
        <section ref={container} className="h-screen">
            <div className="flex justify-center md:justify-between m-10 items-center">
                <div className="flex flex-col text-center md:text-left">
                    <h1 className="text-white md:text-3xl text-xl">Our latest Releases</h1>
                    <p className="text-white/60 text-base opacity-70">Fresh tracks from our Artists</p>
                </div>
                <div className="hidden md:flex justify-end w-30">
                    <Link className="whitespace-nowrap opacity-70 hover:opacity-100 transition duration-300"
                          href="/releases">View all &#8594;</Link>
                </div>
            </div>
            <div>
                <div className="overflow-hidden">
                    <ul className="slider-container">
                        {releases.map((release) => (
                            <li key={release._id}
                                className="slider-item flex flex-col gap-2 md:px-7">
                                {release.cover ? (
                                    <div className="slider-overlay">
                                        <div className="parallax-img">
                                            <Image
                                                src={urlFor(release.cover).width(width).height(height).url()}
                                                alt={release.title || "Release Cover"}
                                                width={width}
                                                height={height}
                                                className="absolute w-full h-full"
                                                loading="eager"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>No Image</div>
                                )}
                                <div>
                                    <p className="">({release.catalog}) {release.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex md:hidden justify-center m-10">
                <Link className="whitespace-nowrap" href="/releases">View all &#8594;</Link>
            </div>
        </section>
    )
}

function horizontalLoop(items_: string | object | Element | null, config: HorizontalLoopConfig = {}) {
    const items = gsap.utils.toArray(items_) as HTMLDivElement[];
    const tl = gsap.timeline({
        repeat: config.repeat,
        paused: config.paused,
        defaults: {ease: "none"},
        onReverseComplete: () => {
            tl.totalTime(tl.rawTime() + tl.duration() * 100);
        },
    });
    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
        config.snap === false
            ? (v: number) => v
            : gsap.utils.snap(config.snap || 1); // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    let curX;
    let distanceToStart;
    let distanceToLoop;
    let item;
    let i;

    gsap.set(items, {
        // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
            const w = (widths[i] = parseFloat(
                gsap.getProperty(el, "width", "px") as string,
            ));
            xPercents[i] = snap(
                (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
                (gsap.getProperty(el, "xPercent") as number),
            );
            return xPercents[i];
        },
    });
    gsap.set(items, {x: 0});
    const totalWidth =
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
        (config.paddingRight ?? 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = (xPercents[i] / 100) * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop =
            distanceToStart +
            widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(
            item,
            {
                xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                duration: distanceToLoop / pixelsPerSecond,
            },
            0,
        )
            .fromTo(
                item,
                {
                    xPercent: snap(
                        ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
                    ),
                },
                {
                    xPercent: xPercents[i],
                    duration:
                        (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                    immediateRender: false,
                },
                distanceToLoop / pixelsPerSecond,
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }

    type Vars = {
        overwrite?: boolean;
        modifiers?: {
            time?: (index: number) => number;
        };
    };

    function toIndex(index: number, vars: Vars = {}) {
        if (Math.abs(index - curIndex) > length / 2) {
            index += index > curIndex ? -length : length; // always go in the shortest direction
        }
        const newIndex = gsap.utils.wrap(0, length, index);
        let time = times[newIndex];
        if (time > tl.time() !== index > curIndex) {
            // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }

    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
        tl.vars.onReverseComplete?.();
        tl.reverse();
    }

    const extra = {
        next: (vars: Vars) => toIndex(curIndex + 1, vars),
        previous: (vars: Vars) => toIndex(curIndex - 1, vars),
        current: () => curIndex,
        toIndex: (index: number, vars: Vars) => toIndex(index, vars),
        times: times,
    };

    return Object.assign(tl, extra);
}

export default LandingRelease