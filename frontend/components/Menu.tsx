"use client"

import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {socialLinks} from "@/constants";
import {menuLinks} from "@/constants";
import {SplitText} from "gsap/SplitText";
import {Observer} from "gsap/Observer";

gsap.registerPlugin(SplitText, Observer)

const Menu = () => {
    const container = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const tl = useRef<gsap.core.Timeline | null>(null);

    useGSAP(() => {
        gsap.set("#overlay-menu", {height: 0})
        //gsap.set(".menu-link-item-holder", {y: 75, opacity: 0})

        tl.current = gsap.timeline({paused: true})
            .to("#overlay-menu", {
                height: "100vh",
                duration: 1,
                ease: "expo.out",
            })

            .fromTo(".menu-link-item-holder, .socials",
                {y: 75, opacity: 0},
                {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.inOut",
                    delay: -0.85,
                    opacity: 1,
                }, "-=0.3")

        const links = gsap.utils.toArray<HTMLElement>(".pages-links");

        links.forEach((link) => {
            const topText = link.querySelector(".menu-text-top");
            const bottomText = link.querySelector(".menu-text-bottom");

            // Splitte beide Texte in Buchstaben
            const splitTop = new SplitText(topText, {type: "chars"});
            const splitBottom = new SplitText(bottomText, {type: "chars"});

            // Initialzustand: Bottom-Texte sind weit unten
            gsap.set(splitBottom.chars, {y: "100%"});

            const hoverTl = gsap.timeline({paused: true});

            hoverTl
                .to(splitTop.chars, {
                    y: "-100%",
                    duration: 0.5,
                    ease: "power3.inOut",
                    stagger: 0.02,
                })
                .to(splitBottom.chars, {
                    y: "0%",
                    duration: 0.5,
                    ease: "power3.inOut",
                    stagger: 0.02,
                }, 0); // Startet gleichzeitig mit der ersten Animation

            link.addEventListener("mouseenter", () => hoverTl.play());
            link.addEventListener("mouseleave", () => hoverTl.reverse());
        });
    }, {scope: container});
    //
    useEffect(() => {
        if (isMenuOpen) {
            tl.current?.play()
        } else {
            tl.current?.reverse()
        }

    }, [isMenuOpen]);

    return (
        <div className="menu-container" ref={container}>
            <nav className="fixed w-screen p-2 grid grid-cols-3 z-20 bg-black">
                <div className="col-start-2 flex items-center justify-center">
                    <Link href="/">
                        <Image
                            src="/logo/JAW-logo-white.png"
                            width={90}
                            height={90}
                            alt="JAW-logo-white"
                            className="cursor-pointer w-20 md:w-25"
                        />
                    </Link>
                </div>
                <div className="menu-open flex items-center justify-end pr-5">
                    <button onClick={toggleMenu}
                            className="self-stretch px-1 py-[5px] inline-flex flex-col justify-center items-center gap-1.5 overflow-hidden">
                        <div
                            className={`h-1 w-7 bg-white rounded-full transition-all duration-600 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-[6px]" : "rotate-0 translate-y-0"}`}
                            style={{transitionTimingFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'}}
                        />
                        <div className={`h-1 w-7 bg-white rounded-full transition-all duration-600 ease-in-out ${
                            isMenuOpen ? "-rotate-45 -translate-y-[6px]" : "rotate-0 translate-y-0"}`}
                             style={{transitionTimingFunction: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'}}
                        />
                    </button>
                </div>
            </nav>

            <div id="overlay-menu"
                 className="fixed top-0 left-0 w-screen h-screen p-2 bg-black z-10 flex items-center flex-col overflow-hidden">
                <div className="font-calora pt-25">
                    {menuLinks.map((link, index) => (
                        <div className="menu-link-item" key={index}>
                            <div className="menu-link-item-holder relative text-center"
                                 onClick={toggleMenu}>
                                <Link href={{pathname: link.path}}
                                      className="text-white text-7xl md:text-8xl">
                                    <span className="wrapper">
                                        <span className="">{link.label}</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div
                    className="md:mt-5 mt-10 w-70 md:w-180 flex flex-wrap justify-center gap-3 text-xl md:text-2xl opacity-80 font-calora">
                    {socialLinks.map((link, index) => (
                        <div key={index} className="socials flex justify-center items-center gap-3">
                            <Link href={link.url} target="_blank"
                                  rel="noopener noreferrer">
                                {link.label}
                            </Link>
                            {index < socialLinks.length - 1 && (
                                <div className="w-[3px] h-[3px] bg-white rounded-full"/>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Menu
