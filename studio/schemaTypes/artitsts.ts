import {defineField, defineType} from "sanity";
import {UserIcon} from '@sanity/icons'

export const artists = defineType({
    name: 'artists',
    title: 'artist',
    type: 'document',
    icon: UserIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 200,
                slugify: input => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'profileImage',
            title: 'Profil Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }),
        defineField({
            name: 'bio',
            type: 'array',
            of: [{type: 'block'}],
        }),
        defineField({
            name: 'pressKit',
            type: 'file',
            options: {
                accept: 'application/pdf'
            }
        }),
        defineField({
            name: 'links',
            title: 'Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'socialLink',
                    fields: [
                        {
                            name: 'platform',
                            type: 'string',
                            options: {list: ['Spotify', 'SoundCloud', 'Beatport', 'Bandcamp', 'Instagram', 'TikTok', 'FaceBook', 'Youtube', 'WebSite']}
                        },
                        {name: 'url', type: 'url'}
                    ]
                }
            ]
        }),
    ]
})