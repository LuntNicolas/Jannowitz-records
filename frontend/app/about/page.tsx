"use client"

import React from 'react'
import {LuMail} from "react-icons/lu";
import {BsSend} from "react-icons/bs";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useMediaQuery} from "react-responsive";

gsap.registerPlugin(ScrollTrigger)

const Page = () => {
    const isMobile = useMediaQuery({query: "(max-width: 768px)"})
    const d = isMobile ? 0.7 : 0.8

    useGSAP(() => {
        const blocks = gsap.utils.toArray<HTMLParagraphElement>(".about-text");
        let tl = gsap.timeline({
            delay: d,
        });

        blocks.forEach((block) => {
            let split = SplitText.create(block, {type: "lines", mask: "lines", linesClass: "lineParent"})

            tl.from(split.lines, {
                y: 100,
                duration: 0.9,
                ease: "circ.out",
                stagger: 0.04,
            }, "-=" + d)
        })

        gsap.from(".mission", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".mission",
                start: "top 88%",
                toggleActions: "play none none none",
            }
        })

        gsap.from(".demo", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".mission",
                start: "top 70%",
                toggleActions: "play none none none",
            }
        })
    })

    return (
        <section id="about-section">
            <div className="about">
                <div className="description">
                    <h3>
                        About Jannowitz Records
                    </h3>
                    <p className="about-text">
                        THE STORY — HOW EVERYTHING STARTED
                        It all began in 2014, on a cold, dimly lit Berlin night — where the city never truly sleeps.
                        Beneath the massive brick arches of Jannowitz Bridge, directly above the slowly pulsing Spree
                        River, two minds crossed paths with one shared feeling: the scene needed more
                        honesty. <br/>
                    </p>
                    <p className="about-text">
                        Lars Kohl and Linus Elter didn’t talk about trends, charts or hype. They talked about identity,
                        freedom, and the courage to sound different. Right there, between concrete, water and city
                        noise, the core idea of what would later become Jannowitz Records was born:
                        Rearrange your borders. Be authentic. <br/>
                    </p>
                    <p className="about-text">
                        What started as a spark quickly turned into a movement. In a short time, the label resonated
                        with hundreds — and soon thousands — of techno lovers who were searching for music that didn’t
                        follow rules, but created its own. From the very beginning, individuality and personality became
                        the foundation of every release. Jannowitz Records never aimed to fit into a box — instead, it
                        built its own sonic language: groovy, driving techno infused with melodic depth, minimal
                        tension, and a subtle touch of madness.<br/>
                    </p>
                    <p className="about-text">
                        Over the years, the label has grown into a globally
                        respected imprint, collaborating with internationally established artists and forward-thinking
                        producers from across the electronic spectrum. The catalog includes names such as Matt Sassari,
                        Indira Paganotto, Betoko, Alex Stein, Teenage Mutants, Citizen Kain, Township Rebellion, Pavel
                        Petrov, and many more — artists who stand for strong musical identities rather than short-lived
                        hype.<br/>
                    </p>
                    <p className="about-text">
                        Jannowitz Records is not static. It is a living organism, constantly evolving, absorbing new
                        influences, pushing boundaries — yet always staying connected to the pulse of the underground.
                        Like a phoenix, the inner circle rises again and again from the masses, never losing sight of
                        its roots while navigating between underground credibility and wider dancefloor
                        impact.<br/>
                    </p>
                    <p className="about-text">
                        Today, Jannowitz is more than a label. It is a family, a platform, and a statement — born in
                        Berlin, shaped by the city’s raw energy, and heard on dancefloors around the world.
                    </p>
                </div>
                <div className="mission">
                    <h2>Our Mission</h2>
                    <p><i>“We develop groovy techno with a special touch of melodic & minimal madness.”</i><br/>
                        That’s not just a slogan. That’s the reason Jannowitz Records exists.</p>
                </div>

                <div className="demo">
                    <div className="demo-text">
                        <BsSend/> <span>Send Us Your Demo</span>
                    </div>
                    <a href="mailto:demo@jannowitzrecords.com" className="submit-demo">
                        <LuMail/> <span>demo@jannowitzrecords.com</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
export default Page
