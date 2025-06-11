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
        type: "logo",
        background: 'bg-linear-to-br from-neutral-100 to-neutral-300',
        src: "/logo_midokura.svg"
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
    "ingelin-clients": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-ingelin-clients.webp`
    },
    "portfolio": {
        type: "logo",
        src: `${pub.BUCKET_URL}/logo-lr-dark.svg`,
        background: 'bg-linear-to-br from-neutral-800 to-black',
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
        type: "logo",
        src: `${pub.BUCKET_URL}/logo-midokura.svg`,
        background: 'bg-linear-to-br from-lime-200 to-sky-200',
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
        type: "logo",
        src: `${pub.BUCKET_URL}/logo-ingelin.svg`,
        background: 'bg-linear-to-br from-teal-100 to-indigo-200',
    },
    "aprosar-web": {
        type: "image",
        src: `${pub.BUCKET_URL}/projects/cover-aprosar-web.webp`
    }
};