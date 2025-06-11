import curriculumData from '@/data/resume-en.json'

export interface Project {
    slug: string
    name: string
    type: string
    url?: string
    infoUrl?: string
    company?: string
    description: string
    year?: string
    technologies?: string[]
}

export async function getCurriculumData(){
    return curriculumData
}