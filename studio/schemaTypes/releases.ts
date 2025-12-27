import {defineField, defineType} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const releases = defineType({
    name: 'releases',
    title: 'releases',
    type: 'document',
    icon: RocketIcon,
    fields: [
        //Release Titel
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        //Artist
        // defineField({
        //     name: 'artist',
        //     title: 'Artists',
        //     type: 'array',
        //     of: [
        //         {
        //             type: 'reference',
        //             to: [{type: 'artists', name: 'artists'}],
        //         }
        //     ]
        // }),

        //Katalog Nummer
        defineField({
            name: 'catalog',
            title: 'Katalog Nummer',
            type: 'number',
        }),

        // Cover art
        defineField({
            name: 'cover',
            title: 'Cover',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),

        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {name: "beatport", title: "Beatport", type: "url", placeholder: "Beatport Link"},
                        {name: "soundcloud", title: "SoundCloud", type: "url", placeholder: "Soundcloud Link"},
                        {name: "spotify", type: "url", placeholder: "Spotify Link"},
                    ],
                }
            ],
        }),
    ],
})