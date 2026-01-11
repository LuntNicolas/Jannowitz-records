import {IconType} from 'react-icons';
import {
    FaInstagram,
    FaSoundcloud,
    FaYoutube,
    FaFacebook,
} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";

interface menuLink {
    path: string;
    label: string;
}

interface SocialLink {
    label: string;
    url: string;
    icon: IconType;
}

export const menuLinks: menuLink[] = [
    {path: "/", label: "Home"},
    {path: "/releases", label: "Releases"},
    {path: "/artists", label: "Artists"},
    {path: "https://lnkfi.re/RYANNASTY", label: "Boho"},
    {path: "/about", label: "About"},
]

export const socialLinks: SocialLink[] = [
    {
        label: "Instagram",
        url: "https://www.instagram.com/jannowitz_records/",
        icon: FaInstagram,
    },
    {
        label: "Soundcloud",
        url: "https://soundcloud.com/jannowitz/popular-tracks",
        icon: FaSoundcloud,
    },
    {
        label: "YouTube",
        url: "https://soundcloud.com/jannowitz/popular-tracks",
        icon: FaYoutube,
    },
    {
        label: "X",
        url: "https://x.com/JannowitzRec",
        icon: FaXTwitter,
    },
    {
        label: "Facebook",
        url: "https://www.facebook.com/Jannowitzrecords/?locale=de_DE",
        icon: FaFacebook,
    },
]