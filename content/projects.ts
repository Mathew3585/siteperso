import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;
export type ProjectCategory = "game" | "engine" | "xr" | "ai" | "hardware";

export interface Project {
  slug: string;
  title: string; // nom propre, non traduit
  year: string;
  featured?: boolean;
  categories: ProjectCategory[];
  role: LocalizedText;
  summary: LocalizedText;
  description: Record<Locale, string[]>; // paragraphes
  stack: string[];
  image?: string; // vignette (sinon dégradé)
  video?: string; // lien vidéo (YouTube...)
  gallery?: string[]; // galerie d'images (carrousel sur la page détail)
  links?: { label: string; href: string }[];
}

export const categoryLabels: Record<ProjectCategory, LocalizedText> = {
  game: { fr: "Jeu / Interactif", en: "Game / Interactive" },
  engine: { fr: "Outils / Asset Store", en: "Tools / Asset Store" },
  xr: { fr: "AR / VR / Simulation", en: "AR / VR / Simulation" },
  ai: { fr: "IA / LLM", en: "AI / LLM" },
  hardware: { fr: "Hardware / DIY", en: "Hardware / DIY" },
};

/**
 * Projets réalisés chez TorrusVR.
 * (Ajoute `image: "/images/mon-screenshot.jpg"` sur un projet pour remplacer le dégradé.)
 */
export const projects: Project[] = [
  {
    slug: "zone-101",
    title: "Zone 101",
    year: "2024",
    featured: true,
    categories: ["game"],
    role: { fr: "Développeur Unity chez TorrusVR", en: "Unity Developer at TorrusVR" },
    summary: {
      fr: "Arène de jeu immersive jusqu'à 6 joueurs : projection interactive, dalles au sol réactives et buzzers lumineux, sur un thème de mission interstellaire.",
      en: "Immersive action arena for up to 6 players: interactive projection, motion-sensitive floor tiles and luminous buzzers, on an interstellar mission theme.",
    },
    description: {
      fr: [
        "Zone 101 est une arène de jeu immersive de 25 m² où jusqu'à 6 joueurs coopèrent pour déjouer une invasion interstellaire. Le jeu met à l'épreuve l'agilité, la réflexion et l'esprit d'équipe.",
        "L'expérience combine une projection interactive de 4 mètres, un son spatialisé 5.1, des dalles au sol réactives et des buzzers lumineux, avec une borne de création d'équipe (photo et classements en direct).",
        "Côté exploitation : interface d'administration pour les Game Masters, diagnostics à distance et mises à jour du contenu, pour une solution clé en main et évolutive.",
      ],
      en: [
        "Zone 101 is a 25 sqm immersive gaming arena where up to 6 players team up to stop an interstellar invasion. The game challenges agility, problem-solving and teamwork.",
        "The experience blends a 4-meter interactive projection, 5.1 spatial audio, motion-sensitive floor tiles and luminous buzzers, with a team-creation kiosk (photos and live leaderboards).",
        "On the operations side: an admin interface for Game Masters, remote diagnostics and content updates, for a turn-key, scalable solution.",
      ],
    },
    stack: ["Unity", "C#", "Projection interactive", "IoT", "Audio 5.1"],
    image: "/images/zone-101.jpg",
    video: "https://youtu.be/PN8D60DLA2c",
    gallery: [
      "/images/projects/zone-1.jpg",
      "/images/projects/zone-2.jpg",
      "/images/projects/zone-3.jpg",
      "/images/projects/zone-4.jpg",
      "/images/projects/zone-5.png",
    ],
    links: [{ label: "torrusvr.com", href: "https://torrusvr.com/zone-101-action-game/" }],
  },
  {
    slug: "immersicase",
    title: "Immersicase",
    year: "2024",
    featured: true,
    categories: ["game"],
    role: { fr: "Développeur Unity chez TorrusVR", en: "Unity Developer at TorrusVR" },
    summary: {
      fr: "Système de projection interactive portable : des mini-jeux contrôlés au corps, déployables en moins de 2 minutes pour l'événementiel et le retail.",
      en: "Portable interactive projection system: body-controlled mini-games, deployable in under 2 minutes for events and retail.",
    },
    description: {
      fr: [
        "Immersicase est une valise de projection interactive tout-en-un : installation en moins de 2 minutes, puis des mini-jeux jouables au corps sur un mur ou au sol.",
        "Le système repose sur une caméra de tracking et de la vision par ordinateur (mouvements de bras, déplacements latéraux, sauts, lancers), le tout piloté depuis une tablette.",
        "Pensée pour l'événementiel, le team building et le retail, la solution propose une bibliothèque de jeux (variations saisonnières), un scoring en temps réel et une personnalisation en marque blanche.",
      ],
      en: [
        "Immersicase is an all-in-one interactive projection case: set up in under 2 minutes, then play body-controlled mini-games on a wall or floor.",
        "It relies on a tracking camera and computer vision (arm movement, lateral motion, jumping, throwing), all driven from a tablet.",
        "Built for events, team building and retail, it offers a game library (seasonal variations), real-time scoring and white-label customization.",
      ],
    },
    stack: ["Unity", "C#", "Vision par ordinateur", "Détection de gestes", "Tablette"],
    image: "/images/immersicase.jpg",
    video: "https://youtu.be/OydlkUUtXOI",
    gallery: [
      "/images/projects/imm-1.jpg",
      "/images/projects/imm-2.jpg",
      "/images/projects/imm-3.png",
      "/images/projects/imm-4.jpg",
      "/images/projects/imm-5.png",
    ],
    links: [{ label: "torrusvr.com", href: "https://torrusvr.com/immersicase/" }],
  },
  {
    slug: "underwater-vr",
    title: "UnderWater",
    year: "2023",
    featured: true,
    categories: ["xr"],
    role: { fr: "Développeur Unity / VR chez TorrusVR", en: "Unity / VR Developer at TorrusVR" },
    summary: {
      fr: "Expérience VR immersive en environnement sous-marin : test d'ambiance, d'immersion et d'interactions aquatiques.",
      en: "Immersive underwater VR experience: a test of atmosphere, immersion and aquatic interaction.",
    },
    description: {
      fr: [
        "Expérience VR immersive plongeant l'utilisateur dans un environnement sous-marin.",
        "Un terrain d'exploration pour travailler l'ambiance, le sentiment d'immersion et les interactions en milieu aquatique.",
      ],
      en: [
        "An immersive VR experience that plunges the user into an underwater environment.",
        "A playground to explore atmosphere, the sense of immersion and interaction in an aquatic setting.",
      ],
    },
    stack: ["Unity", "C#", "VR"],
    image: "/images/underwater.jpg",
    video: "https://youtu.be/4qkHWo-qT-c",
    links: [{ label: "Voir la vidéo", href: "https://youtu.be/4qkHWo-qT-c" }],
  },
  {
    slug: "easy-screenshot-tool",
    title: "Easy Screenshot Tool",
    year: "2024",
    categories: ["engine"],
    role: { fr: "Développeur outil (Unity Asset Store)", en: "Tool developer (Unity Asset Store)" },
    summary: {
      fr: "Outil Unity gratuit pour capturer des screenshots in-game en un clic, compatible Built-in, URP et HDRP.",
      en: "Free Unity tool to capture in-game screenshots in one click, compatible with Built-in, URP and HDRP.",
    },
    description: {
      fr: [
        "Extension Unity légère qui permet de capturer facilement des screenshots depuis une caméra, directement dans un jeu ou une application.",
        "Compatible avec les trois pipelines de rendu (Built-in, URP, HDRP) et publiée gratuitement sur l'Unity Asset Store, où elle est disponible pour tous les développeurs.",
      ],
      en: [
        "A lightweight Unity extension that makes it easy to capture camera screenshots directly inside a game or application.",
        "Compatible with all three render pipelines (Built-in, URP, HDRP) and published for free on the Unity Asset Store, available to every developer.",
      ],
    },
    stack: ["Unity", "C#", "Éditeur Unity", "URP", "HDRP"],
    image: "/images/projects/est-1.jpg",
    gallery: ["/images/projects/est-1.jpg", "/images/projects/est-2.jpg"],
    links: [
      {
        label: "Unity Asset Store",
        href: "https://assetstore.unity.com/packages/tools/camera/easy-screenshot-tool-296926",
      },
    ],
  },
  {
    slug: "ghostscript-remover",
    title: "GhostScriptRemover",
    year: "2025",
    categories: ["engine"],
    role: { fr: "Développeur outil (Unity Asset Store)", en: "Tool developer (Unity Asset Store)" },
    summary: {
      fr: "Outil Unity qui nettoie en un clic les références de scripts manquants (« ghost scripts ») d'un projet.",
      en: "Unity tool that cleans up missing script references ('ghost scripts') in a project, in one click.",
    },
    description: {
      fr: [
        "Utilitaire d'éditeur qui règle un problème courant sous Unity : les références de scripts manquants ou cassés qui traînent dans un projet.",
        "Il détecte et supprime ces « ghost scripts » pour garder un projet propre et sans erreurs. Compatible Built-in, URP et HDRP, publié sur l'Unity Asset Store.",
      ],
      en: [
        "An editor utility that fixes a common Unity problem: leftover missing or broken script references cluttering a project.",
        "It detects and removes these 'ghost scripts' to keep a project clean and error-free. Compatible with Built-in, URP and HDRP, published on the Unity Asset Store.",
      ],
    },
    stack: ["Unity", "C#", "Éditeur Unity", "Outillage"],
    image: "/images/projects/gsr-1.jpg",
    gallery: [
      "/images/projects/gsr-1.jpg",
      "/images/projects/gsr-2.jpg",
      "/images/projects/gsr-3.jpg",
    ],
    links: [
      {
        label: "Unity Asset Store",
        href: "https://assetstore.unity.com/packages/tools/utilities/ghostscriptremover-305607",
      },
    ],
  },
  {
    slug: "clavier-custom",
    title: "Clavier custom",
    year: "2026",
    categories: ["hardware"],
    role: { fr: "Conception & montage", en: "Design & build" },
    summary: {
      fr: "Mon premier clavier custom hot-swap : 1,2 kg, case en chêne massif et palette bois, crème et café.",
      en: "My first custom hot-swap keyboard: 1.2 kg, solid oak case and a wood, cream and coffee palette.",
    },
    description: {
      fr: [
        "Un clavier custom monté entièrement à la main, de la recherche des composants à l'assemblage final. C'était mon premier montage, et le plus long a été de trouver les bonnes pièces pour obtenir exactement le rendu voulu.",
        "Le résultat : 1,2 kg, une case en chêne massif, des switches hot-swap (remplaçables sans soudure) et des keycaps dans une palette bois, crème et café assortie au bois.",
        "J'en ai fait une vidéo où je montre le montage de A à Z, les réparations et le fonctionnement, avec un petit tutoriel sur la différence entre un clavier mécanique et un clavier custom. Grand passionné du sujet.",
      ],
      en: [
        "A custom keyboard built entirely by hand, from sourcing the parts to final assembly. It was my first build, and the longest part was finding the right components to get exactly the look I wanted.",
        "The result: 1.2 kg, a solid oak case, hot-swap switches (replaceable without soldering) and keycaps in a wood, cream and coffee palette matching the case.",
        "I made a video showing the build from start to finish, repairs and how it works, plus a short tutorial on the difference between a mechanical keyboard and a custom one. A topic I'm passionate about.",
      ],
    },
    stack: ["Chêne massif", "Hot-swap", "Keycaps custom", "Montage", "Soudure"],
    image: "/images/projects/clavier-1.jpg",
    video: "https://youtu.be/Hs6-nNDq0qo",
    gallery: [
      "/images/projects/clavier-1.jpg",
      "/images/projects/clavier-2.jpg",
      "/images/projects/clavier-3.jpg",
      "/images/projects/clavier-4.jpg",
      "/images/projects/clavier-5.jpg",
    ],
    links: [{ label: "Voir la vidéo", href: "https://youtu.be/Hs6-nNDq0qo" }],
  },
  {
    slug: "stream-deck-diy",
    title: "Stream Deck DIY",
    year: "2026",
    categories: ["hardware"],
    role: {
      fr: "Électronique, firmware & application",
      en: "Electronics, firmware & app",
    },
    summary: {
      fr: "Mon propre Stream Deck fait maison : ESP32, switches récupérés de mon clavier custom, et une application PC développée sur mesure.",
      en: "My own homemade Stream Deck: ESP32, switches left over from my custom keyboard, and a custom desktop app.",
    },
    description: {
      fr: [
        "Je stream de temps en temps sur Twitch et je ne voulais pas mettre 100 euros dans un Stream Deck du commerce. J'ai donc fabriqué le mien.",
        "Côté matériel : un ESP32, des switches hot-swap qu'il me restait du montage de mon clavier custom, des keycaps assortis et un boîtier imprimé en 3D. J'ai développé moi-même le code embarqué qui détecte les appuis sur les touches.",
        "Côté logiciel : une application de bureau développée avec Tauri, qui fait le pont entre le boîtier et le PC. Chaque touche est associée à une action OBS ou à un raccourci Windows / macOS.",
      ],
      en: [
        "I stream on Twitch from time to time and didn't want to spend 100 euros on an off-the-shelf Stream Deck. So I built my own.",
        "Hardware: an ESP32, hot-swap switches left over from my custom keyboard build, matching keycaps and a 3D-printed case. I wrote the embedded code that detects key presses myself.",
        "Software: a desktop app built with Tauri that bridges the device and the PC. Each key is mapped to an OBS action or a Windows / macOS shortcut.",
      ],
    },
    stack: ["ESP32", "C++", "Tauri", "OBS", "Impression 3D"],
    image: "/images/projects/streamdeck-1.jpg",
    gallery: [
      "/images/projects/streamdeck-1.jpg",
      "/images/projects/streamdeck-2.jpg",
      "/images/projects/streamdeck-3.jpg",
      "/images/projects/streamdeck-4.jpg",
      "/images/projects/streamdeck-5.jpg",
      "/images/projects/streamdeck-6.jpg",
      "/images/projects/streamdeck-7.jpg",
      "/images/projects/streamdeck-8.jpg",
      "/images/projects/streamdeck-9.jpg",
      "/images/projects/streamdeck-10.jpg",
      "/images/projects/streamdeck-11.jpg",
      "/images/projects/streamdeck-12.jpg",
      "/images/projects/streamdeck-13.jpg",
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
