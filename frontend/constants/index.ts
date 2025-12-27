interface menuLink {
  path: string;
  label: string;
}

interface SocialLink {
  label: string;
  url: string;
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
    url: "https://www.instagram.com/jannowitz_records/"
  },
  {
    label: "Soundcloud",
    url: "https://soundcloud.com/jannowitz/popular-tracks"
  },
  {
    label: "YouTube",
    url: "https://soundcloud.com/jannowitz/popular-tracks"
  },
  {
    label: "X",
    url: "https://x.com/JannowitzRec"
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/Jannowitzrecords/?locale=de_DE"
  },
]