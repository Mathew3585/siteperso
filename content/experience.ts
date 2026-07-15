import type { LocalizedText } from "./projects";

export interface ExperienceItem {
  period: string;
  company: string;
  role: LocalizedText;
  contract?: LocalizedText;
  location?: LocalizedText;
  description: LocalizedText;
}

export interface EducationItem {
  period: string;
  school: string;
  detail: LocalizedText;
}

/** Parcours professionnel (du plus récent au plus ancien). */
export const experience: ExperienceItem[] = [
  {
    period: "juil. 2023 - aujourd'hui",
    company: "TorrusVR",
    role: { fr: "Développeur Unity", en: "Unity Developer" },
    contract: { fr: "Stage puis CDD", en: "Internship then fixed-term" },
    location: { fr: "À distance", en: "Remote" },
    description: {
      fr: "Conception de simulateurs et d'expériences immersives basées sur la physique avec Unity, avec un volet réalité virtuelle. Environnements immersifs et interactifs pensés pour les besoins clients, collaboration avec des équipes pluridisciplinaires (graphistes, designers, chefs de projet), optimisation des performances sur des appareils aux ressources limitées, tests et correction de bugs, et échanges directs avec les clients pour intégrer leurs retours.",
      en: "Building physics-based simulators and immersive experiences with Unity, including virtual reality. Immersive, interactive environments tailored to client needs, working with cross-disciplinary teams (artists, designers, project managers), optimizing performance on resource-constrained devices, testing and fixing bugs, and interacting directly with clients to fold in their feedback.",
    },
  },
  {
    period: "mars 2024 - janv. 2025",
    company: "Lodenn Studio",
    role: { fr: "Fondateur & Co-fondateur", en: "Founder & Co-founder" },
    contract: { fr: "Studio de jeux vidéo", en: "Game studio" },
    location: { fr: "À distance", en: "Remote" },
    description: {
      fr: "Création de mon propre studio de jeux vidéo, avec 3 jeux mobiles sortis. J'ai travaillé sur la conception de gameplay, la programmation et la création de contenus visuels, un vrai laboratoire pour tester des idées et recueillir les retours des joueurs. L'aventure s'est arrêtée faute de financement, mais elle a été extrêmement formatrice sur le développement comme sur la gestion de projet.",
      en: "Founded my own game studio and shipped 3 mobile games. I worked on gameplay design, programming and visual content, a real playground to test ideas and gather player feedback. The venture stopped for lack of funding, but it was hugely formative, both technically and on the project-management side.",
    },
  },
];

/** Formation. */
export const education: EducationItem[] = [
  {
    period: "2021 - 2024",
    school: "3axes institut",
    detail: {
      fr: "École de jeux vidéo. Spécialisation développement 3D et Android. Diplômé major de promotion.",
      en: "Video game school. Specialized in 3D and Android development. Graduated top of my class.",
    },
  },
];

// Compétences détaillées affichées sur la page Parcours
export const skillSet: { label: string; items: string[] }[] = [
  { label: "Langages", items: ["C#", "C++", "Python", "TypeScript"] },
  { label: "Moteurs & outils", items: ["Unity", "XR Toolkit", "Android", "Git", "Profilers"] },
  { label: "Domaines", items: ["Gameplay", "3D", "AR/VR", "Mobile", "IA / LLM"] },
];
