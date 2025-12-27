import {createClient} from "next-sanity";

export const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "7nbhdxti",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: false,
});