import {defineQuery} from 'next-sanity'

export const releaseQuery = defineQuery(`
    *[_type == "releases"]{
    _id, catalog, cover, title, links
    }
 `)