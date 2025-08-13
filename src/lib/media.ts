import { pub } from "@/lib/config";

export interface ProjectCover {
    type: 'image' | 'video' | 'logo';
    background?: string;
    src: string;
}

export const featuredCovers: Record<string, ProjectCover> = {
    "bayas-freire-website": {
        type: "video",
        src: `${pub.BUCKET_URL}/projects/video-bayasfreire-web.mp4`
    },
    "midokura-rag": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-midokura-rag.webp`,
    },
    "ingelin-website": {
        type: "video",
        src: `${pub.BUCKET_URL}/projects/video-ingelin-web.mp4`
    },
    "ingelin-management": {
        type: "video",
        src: `${pub.BUCKET_URL}/projects/video-ingelin-management.mp4`
    },
}

export const projectCovers: Record<string, ProjectCover> = {
    "personal-rag": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-personal-rag.webp`,
    },
    "ingelin-clients": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-ingelin-clients.webp`
    },
    "portfolio": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-portfolio.webp`
    },
    "workhub": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-workhub.webp`
    },
    "bayas-freire-website": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-bayasfreire-web.webp`
    },
    "midokura-rag": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-midokura-rag.webp`,
    },
    "gesture-detection": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-gesture-recognition.webp`
    },
    "ingelin-website": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-ingelin-web.webp`
    },
    "advmedical-website": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-adv-web.webp`
    },
    "ingelin-management": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-ingelin-management.webp`
    },
    "ingelin-api": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-ingelin-api.webp`,
    },
    "aprosar-web": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-aprosar-web.webp`
    }
};