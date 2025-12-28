import {defineQuery} from 'next-sanity'

export const releaseQuery = defineQuery(`
    *[_type == "releases"] | order(_createdAt desc) [0...5]{
    _id, catalog, cover, title, links
    }
 `)