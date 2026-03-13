import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {uniquePlugin} from "sanity-plugin-unique";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '7nbhdxti'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const SANITY_STUDIO_PREVIEW_URL = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'

export default defineConfig({
    name: 'default',
    title: 'Studio Jannowitz Records',

    projectId,
    dataset,

    plugins: [structureTool(), visionTool(), uniquePlugin()],

    schema: {
        types: schemaTypes,
    },
})
