import React from 'react'
import {socialLinks} from "@/constants";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-screen h-fit flex justify-center items-center ">
            <div className="h-full self-stretch flex flex-col gap-4 items-center">
                <div className="flex md:flex-row flex-col md:gap-10 gap-2">
                    <div className="flex flex-col gap-3 md:items-start items-center">
                        <h1 className="uppercase text-sm">Jannowitz Records</h1>
                        <p className="opacity-50 text-xs">Pushing the boundaries of Techno since 2015</p>
                        <ul className="flex gap-4">
                            {socialLinks.map(({label, url, icon: Icon}) => (
                                <li key={label}>
                                    <Link href={url} target="_blank">
                                        <Icon className="opacity-50" size="20"/>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1></h1>
                    </div>
                    <div className="flex flex-col gap-3 md:items-start items-center">
                        <h1 className="font-bold font-sm">Legal</h1>
                        <p className="opacity-50 text-xs">Imprint</p>
                        <p className="opacity-50 text-xs">Privacy Policy</p>
                        <Link className="opacity-50 text-xs" href="mailto:info@jannowitz.com">info@jannowitz.com</Link>
                    </div>
                </div>
                <div className="mb-5">
                    <p className="opacity-50 text-sm">&copy; {new Date().getFullYear()} Jannowitz Records. All rights
                        reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer
