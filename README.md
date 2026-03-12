## Jannowitz Records – Label Website

A professional web platform built for the techno label Jannowitz Records. This project focuses on seamless content management, artist discovery, and a premium visual identity.
[**Live Demo**](https://jannowitz-records-git-main-lennart-lunts-projects.vercel.app) | [**GitHub Repo**](https://github.com/LuntNicolas/Jannowitz-records)

## Key Features

* **Headless Content Management:** Integrated Sanity.io to provide the label owners with a custom Studio to manage artists, releases, and tour dates dynamically.
* **Next.js Architecture:** Leveraged Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) for lightning-fast page loads and optimal SEO.
* **Dynamic Artist Profiles:** Automated generation of artist pages based on CMS data, ensuring a consistent look across the entire roster.
* **Immersive UI Animations:** Used GSAP to implement sophisticated transitions and micro-interactions that reflect the label's aesthetic.


## TechStack

* **Frontend:** Next.js (React)
* **CMS:** Sanity.io (GROQ for querying)
* **Styling:** Tailwind CSS
* **Animation:** [GSAP](https://gsap.com)
* **Deployment:** [Vercel](https://vercel.com/lennart-lunts-projects)


## Project Overview

The frontend application and CMS Studio are maintained as separate environments.

**Local development:**
Run ```npm run dev``` in the respective project directories.
* Frontend: http://localhost:3000
* Studio: http://localhost:3333

Type generation (Sanity schemas):
```
npx sanity@latest schema extract
npx sanity@latest typegen generate
```

**Deployment:**
Push the main branch to the repository; automated deployment runs via Vercel.

## The Client
**Jannowitz Records**, founded by the renowned artist **BOHO**, is a prominent international techno label known for its minimal and high-tech sound. I developed this platform to translate their dark, sophisticated aesthetic into a high-end digital experience.

* **Label:** [Jannowitz Records on Instagram](https://www.instagram.com/jannowitz_records?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==)
* **Founder:** [BOHO on Instagram](https://www.instagram.com/boho_jaw?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==)
