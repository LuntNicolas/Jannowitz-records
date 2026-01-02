import {defineField, defineType} from "sanity";
import {AddUserIcon} from '@sanity/icons'

export const partners = defineType({
    name: 'partners',
    title: 'partners',
    type: 'document',
    icon: AddUserIcon,
    fields: [
        defineField({
            name: 'partner',
            title: 'Partner',
            type: 'string',
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link',
            type: 'url',
            placeholder: 'https://www.example.com',
        })
    ]
})