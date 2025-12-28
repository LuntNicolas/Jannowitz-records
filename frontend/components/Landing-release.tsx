"use client"

import React from 'react'
import Link from 'next/link'
import {ReleaseQueryResult} from '@/sanity/types'
import {urlFor} from "@/sanity/image";
import Image from 'next/image';
import {useEffect, useRef} from 'react'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {Observer} from "gsap/Observer"
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, Observer, ScrollTrigger)

interface Props {
    releases: ReleaseQueryResult
}

const LandingRelease = ({releases}: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const width = 1000;
    const height = 1000;

    useGSAP(() => {
        const items = gsap.utils.toArray<HTMLElement>(".slider-item");

        const loop = horizontalLoop(items, {repeat: -1})
        let slow = gsap.to(loop, {timeScale: 0, duration: 0.5});
        loop.timeScale(0);

        Observer.create({
            target: ".slider-container",
            type: "pointer,touch,wheel",
            wheelSpeed: -1,
            onChange: self => {
                if (Math.abs(self.deltaX) > Math.abs(self.deltaY)) {
                    // Nur dann bewegen wir den Loop
                    loop.timeScale(-self.deltaX);
                    slow.invalidate().restart(); // Abbrems-Animation starten
                }
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
                <div className="">
                    <ul className="slider-container">
                        {[...releases, ...releases].map((release, index) => (
                            <li key={`${release._id}-${index}`}
                                className="slider-item flex flex-col gap-2 px-10 md:px-15">
                                {release.cover ? (
                                    <div className="slider-overlay">
                                        <div className="relative md:w-100 md:h-100 w-100 h-100 overflow-hidden">
                                            <Image
                                                src={urlFor(release.cover).width(width).height(height).url()}
                                                alt={release.title || "Release Cover"}
                                                width={width}
                                                height={height}
                                                className="absolute w-full h-full"
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

function horizontalLoop(items: HTMLElement[], config: any) {
    items = gsap.utils.toArray(items);
    config = config || {};
    let tl = gsap.timeline({
            repeat: config.repeat,
            paused: config.paused,
            defaults: {ease: "none"},
            onReverseComplete: () => {
                tl.totalTime(tl.rawTime() + tl.duration() * 100)
            }
        }),
        length = items.length,
        startX = items[0].offsetLeft,
        times: number[] = [],
        widths: number[] = [],
        xPercents: number[] = [],
        curIndex = 0,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v: any) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
        totalWidth, curX, distanceToStart, distanceToLoop, item, i;
    gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
        xPercent: (i, el) => {
            let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / w * 100 + (gsap.getProperty(el, "xPercent") as number || 0));
            return xPercents[i];
        }
    });
    gsap.set(items, {x: 0});
    totalWidth = items[length - 1].offsetLeft + xPercents[length - 1] / 100 * widths[length - 1] - startX + items[length - 1].offsetWidth * (gsap.getProperty(items[length - 1], "scaleX") as number || 1) + (parseFloat(config.paddingRight) || 0);
    for (i = 0; i < length; i++) {
        item = items[i];
        curX = xPercents[i] / 100 * widths[i];
        distanceToStart = item.offsetLeft + curX - startX;
        distanceToLoop = distanceToStart + widths[i] * (gsap.getProperty(item, "scaleX") as number || 1);
        tl.to(item, {
            xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
            duration: distanceToLoop / pixelsPerSecond
        }, 0)
            .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {
                xPercent: xPercents[i],
                duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false
            }, distanceToLoop / pixelsPerSecond)
            .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
    }

    function toIndex(index: number, vars: any) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
        let newIndex = gsap.utils.wrap(0, length, index),
            time = times[newIndex];
        if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
            vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
            time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        curIndex = newIndex;
        vars.overwrite = true;
        return tl.tweenTo(time, vars);
    }

    tl.next = (vars: any) => toIndex(curIndex + 1, vars);
    tl.previous = (vars: any) => toIndex(curIndex - 1, vars);
    tl.current = () => curIndex;
    tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
        tl.vars.onReverseComplete?.();
        tl.reverse();
    }
    return tl;
}

export default LandingRelease