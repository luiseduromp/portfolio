export interface Info {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: Location;
}

export interface ContactLink {
    network: string
    username?: string
    url: string
}

export interface Location {
    city: string;
    region?: string;
    country: string;
    postalCode?: string;
    latlng?: string;
}

export interface Work {
    id: string;
    company: string;
    companyUrl?: string;
    position: string;
    startDate: string;
    endDate: string;
    summary: string;
    tasks?: string[];
    highlights?: string[];
    location: Location
}

export interface Education {
    id: string;
    institution: string;
    major: string;
    minor: string;
    degree: string;
    startDate: string;
    endDate: string;
    content?: string[];
    location: Location;
}

export interface Project {
    id: string
    name: string
    type: string
    url?: string
    infoUrl?: string
    repoUrl?: string
    company?: string
    summary?: string
    description: string
    year?: string
    technologies?: string[]
}

export interface Course {
    institution: string;
    professor?: {
        name: string;
        url?: string;
    };
    name: string;
    endDate: string;
    url?: string;
}
  
export interface SkillCategory {
    category: string;
    skills: string[];
}