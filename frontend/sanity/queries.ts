import {defineQuery} from 'next-sanity'

export const landingReleaseQuery = defineQuery(`
    *[_type == "releases"] | order(_createdAt desc) [0...5]{
        _id, catalog, cover, title, links
    }
 `)

export const releaseQuery = defineQuery(`
    *[_type == "releases"] | order(_createdAt desc){
        _id, catalog, cover, title, links, releaseDate
    }
 `)

export const partnerQuery = defineQuery(`
    *[_type == "partners"]{
        _id, partner, logo, link
    }
`)

export const artistQuery = defineQuery(`
    *[_type == "artists"]{
      _id, 
      name, 
      slug, 
      profileImage,
      bio, 
      pressKit, 
      links
    }
`)