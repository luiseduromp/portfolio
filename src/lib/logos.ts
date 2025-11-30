import {
    AngularjsLogo,
    ArduinoLogo,
    AwsLogo,
    BootstrapLogo,
    CssLogo,
    DockerLogo,
    FastapiLogo,
    GitLogo,
    GitHubLogo,
    HtmlLogo,
    JavaScriptLogo,
    JiraLogo,
    JWTLogo,
    KubernetesLogo,
    MotionLogo,
    MySQLLogo,
    NextjsLogo,
    NodejsLogo,
    OllamaLogo,
    PhpLogo,
    PostgreSQLLogo,
    PythonLogo,
    RaspberryPiLogo,
    ReactLogo,
    ShadcnUiLogo,
    TailwindLogo,
    TerraformLogo,
    TensorFlowLogo,
    TypeScriptLogo,
    VercelLogo,
    ViteLogo,
    GsapLogo,
    OpenaiLogo,
    RailwayLogo
} from "@/components/icons/brandIcons";
import { pub } from "@/lib/config";

export interface IconType {
    name: string
    category: "hardware" | "software" | "language" | "framework" | "library" | "database" | "social"
    baseColor?: string
    logo?: React.FC<React.SVGProps<SVGSVGElement>>
    img?: string
}

export const icons: Record<string, IconType> = {
    angularjs: { name: "AngularJS", category: "framework", baseColor: "#c4473a", logo: AngularjsLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg" },
    arduino: { name: "Arduino", category: "hardware", baseColor: "#00979c", logo: ArduinoLogo },
    aws: { name: "AWS", category: "software", baseColor: "#252f3e", logo: AwsLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    bootstrap: { name: "Bootstrap", category: "framework", baseColor: "#6c11f4", logo: BootstrapLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
    chromadb: { name: "ChromaDB", category: "database", baseColor: "#ffffff" },
    css: { name: "CSS", category: "language", baseColor: "#1572b6", logo: CssLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    docker: { name: "Docker", category: "software", baseColor: "#019bC6", img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", logo: DockerLogo },
    fastapi: { name: "FastAPI", category: "framework", baseColor: "#049688", logo: FastapiLogo },
    freertos: { name: "FreeRTOS", category: "framework", baseColor: "#87c04f" },
    git: { name: "Git", category: "software", baseColor: "#f34f29", logo: GitLogo },
    github: { name: "GitHub", category: "software", baseColor: "#181616", logo: GitHubLogo },
    gsap: { name: "GSAP", category: "library", baseColor: "#0be44a", logo: GsapLogo },
    html: { name: "HTML", category: "language", baseColor: "#e44d26", logo: HtmlLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    javascript: { name: "JavaScript", category: "language", baseColor: "#f0db4f", logo: JavaScriptLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    jira: { name: "Jira", category: "software", baseColor: "#2684ff", logo: JiraLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
    jwt: { name: "JWT", category: "library", baseColor: "#ffffff", logo: JWTLogo },
    kubernetes: { name: "Kubernetes", category: "software", baseColor: "#326ce5", logo: KubernetesLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg" },
    langchain: { name: "LangChain", category: "library", baseColor: "#ffffff" },
    mbedos: { name: "Mbed OS", category: "library", baseColor: "#048dc1" },
    motion: { name: "Motion", category: "library", baseColor: "#fff312", logo: MotionLogo },
    mysql: { name: "MySQL", category: "database", baseColor: "#00618a", logo: MySQLLogo },
    next: { name: "Next.js", category: "framework", baseColor: "#000000", logo: NextjsLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    node: { name: "Node.js", category: "library", baseColor: "#5fa04e", logo: NodejsLogo, img: "" },
    ollama: { name: "Ollama", category: "software", baseColor: "#ffffff", logo: OllamaLogo },
    openai: { name: "OpenAI API", category: "software", baseColor: "#ffffff", logo: OpenaiLogo },
    openwebui: { name: "Open WebUI", category: "software", baseColor: "#ffffff" },
    php: { name: "PHP", category: "language", baseColor: "#ffffff", logo: PhpLogo },
    postgresq: { name: "PostgreSQL", category: "database", baseColor: "#336791", logo: PostgreSQLLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    python: { name: "Python", category: "language", baseColor: "#ffd845", logo: PythonLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    railway: { name: "Railway", category: "software", baseColor: "#ffffff", logo: RailwayLogo },
    raspberrypi: { name: "RaspberryPi", category: "hardware", baseColor: "#c51850", logo: RaspberryPiLogo },
    react: { name: "React", category: "library", baseColor: "#61dafb", logo: ReactLogo },
    shadcn: { name: "Shadcn/ui", category: "library", baseColor: "", logo: ShadcnUiLogo },
    tailwind: { name: "TailwindCSS", category: "framework", baseColor: "#38bdf8", logo: TailwindLogo },
    terraform: { name: "Terraform", category: "software", baseColor: "#4040b2", logo: TerraformLogo },
    tensorflow: { name: "TensorFlow", category: "library", baseColor: "ff6f00", logo: TensorFlowLogo },
    typescript: { name: "TypeScript", category: "language", baseColor: "", logo: TypeScriptLogo },
    vercel: { name: "Vercel", category: "software", baseColor: "#ffffff", logo: VercelLogo },
    vite: { name: "Vite", category: "software", baseColor: "#646cff", logo: ViteLogo, img: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" },
}

export const companyLogos: Record<string, string> = {
    iag: `${pub.BUCKET_URL}/logo-iag.svg`,
    ingelin: `${pub.BUCKET_URL}/logo-ingelin.svg`,
    midokura: `${pub.BUCKET_URL}/logo-midokura.svg`,
    freelance: `${pub.BUCKET_URL}/logo-lr-dark.svg`,
}

export const universityLogos: Record<string, string> = {
    upc: `${pub.BUCKET_URL}/logo-upc.svg`,
    udla: `${pub.BUCKET_URL}/logo-udla.svg`,
    epn: `${pub.BUCKET_URL}/logo-epn.svg`
}