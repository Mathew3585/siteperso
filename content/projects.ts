import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;
export type ProjectCategory = "game" | "engine" | "xr" | "ai" | "hardware" | "app";

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
  video?: string; // lien vidéo YouTube
  videoFile?: string; // vidéo hébergée en local (ex: /images/projects/x/teaser.mp4)
  gallery?: string[]; // galerie d'images (carrousel sur la page détail)
  links?: { label: string; href: string }[];
}

export const categoryLabels: Record<ProjectCategory, LocalizedText> = {
  game: { fr: "Jeu / Interactif", en: "Game / Interactive" },
  engine: { fr: "Outils / Asset Store", en: "Tools / Asset Store" },
  xr: { fr: "AR / VR / Simulation", en: "AR / VR / Simulation" },
  ai: { fr: "IA / LLM", en: "AI / LLM" },
  hardware: { fr: "Hardware / DIY", en: "Hardware / DIY" },
  app: { fr: "Application / Client", en: "App / Client work" },
};

/**
 * Projets du portfolio.
 *
 * Les images de chaque projet vivent dans public/images/projects/<slug>/
 * numérotées 1.jpg, 2.jpg, ... (fichiers d'origine, non compressés).
 * `image` = vignette de la carte, `gallery` = carrousel de la page détail.
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
    image: "/images/projects/zone-101/1.jpg",
    video: "https://youtu.be/PN8D60DLA2c",
    gallery: [
      "/images/projects/zone-101/1.jpg",
      "/images/projects/zone-101/2.jpg",
      "/images/projects/zone-101/3.jpg",
      "/images/projects/zone-101/4.jpg",
      "/images/projects/zone-101/5.png",
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
    image: "/images/projects/immersicase/1.jpg",
    video: "https://youtu.be/OydlkUUtXOI",
    gallery: [
      "/images/projects/immersicase/1.jpg",
      "/images/projects/immersicase/2.jpg",
      "/images/projects/immersicase/3.png",
      "/images/projects/immersicase/4.jpg",
      "/images/projects/immersicase/5.png",
    ],
    links: [{ label: "torrusvr.com", href: "https://torrusvr.com/immersicase/" }],
  },
  {
    slug: "ptit-bout-de-lumiere",
    title: "P'tit Bout de Lumière",
    year: "2024",
    categories: ["xr"],
    role: {
      fr: "Développeur (optimisation & navigation) chez TorrusVR",
      en: "Developer (optimization & navigation) at TorrusVR",
    },
    summary: {
      fr: "Expérience VR conçue pour rassurer les enfants chez le dentiste. J'y étais développeur, principalement sur l'optimisation des performances et la navigation du vaisseau.",
      en: "A VR experience designed to reassure children at the dentist. I worked on it as a developer, mainly on performance optimization and the ship's navigation.",
    },
    description: {
      fr: [
        "P'tit Bout de Lumière est une expérience en réalité virtuelle qui accompagne les enfants pendant leurs soins dentaires. Plutôt que de subir l'intervention, l'enfant est embarqué dans un voyage qui capte son attention ailleurs. Le projet a été mené sur un contrat client chez TorrusVR, et s'est étalé sur une longue durée.",
        "Ma principale mission a été l'optimisation. En VR, la contrainte est bien plus dure que sur écran : il faut tenir une fréquence d'images élevée et parfaitement stable, sinon l'immersion casse et l'inconfort arrive vite. Sur ce projet, l'enjeu était encore plus fort, puisque le public visé est un enfant déjà en situation de stress. J'ai donc mené de grosses passes d'optimisation pour faire tenir l'expérience dans le budget de performance du matériel.",
        "J'ai également travaillé sur la navigation et le pathfinding du vaisseau, afin que ses déplacements restent cohérents et lisibles pour l'enfant tout au long du parcours.",
        "En complément du développement, j'ai réalisé quelques modèles 3D pour le projet, ce qui m'a permis de toucher aussi à la partie artistique.",
      ],
      en: [
        "P'tit Bout de Lumière is a virtual reality experience that supports children through their dental treatment. Rather than enduring the procedure, the child is taken on a journey that draws their attention elsewhere. The project ran as a client contract at TorrusVR over a long period.",
        "My main assignment was optimization. In VR the constraint is far tougher than on a screen: you have to hold a high and perfectly stable framerate, otherwise immersion breaks and discomfort sets in quickly. Here the stakes were even higher, since the audience is a child already under stress. I ran major optimization passes to fit the experience within the hardware's performance budget.",
        "I also worked on the ship's navigation and pathfinding, so its movements stayed coherent and readable for the child throughout the journey.",
        "Alongside development, I produced a few 3D models for the project, which let me contribute to the artistic side as well.",
      ],
    },
    stack: ["Unity", "C#", "VR", "Optimisation", "Pathfinding", "Modélisation 3D"],
    image: "/images/projects/ptit-bout-de-lumiere/1.jpg",
    video: "https://youtu.be/IQ8c6_5lLik",
    gallery: [
      "/images/projects/ptit-bout-de-lumiere/1.jpg",
      "/images/projects/ptit-bout-de-lumiere/2.jpg",
      "/images/projects/ptit-bout-de-lumiere/3.jpg",
      "/images/projects/ptit-bout-de-lumiere/4.jpg",
      "/images/projects/ptit-bout-de-lumiere/5.jpg",
    ],
    links: [{ label: "Voir la présentation", href: "https://youtu.be/IQ8c6_5lLik" }],
  },
  {
    slug: "underwater-vr",
    title: "UnderWater",
    year: "2023",
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
    image: "/images/projects/underwater-vr/1.jpg",
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
    image: "/images/projects/easy-screenshot-tool/1.jpg",
    gallery: ["/images/projects/easy-screenshot-tool/1.jpg", "/images/projects/easy-screenshot-tool/2.jpg"],
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
    image: "/images/projects/ghostscript-remover/1.jpg",
    gallery: [
      "/images/projects/ghostscript-remover/1.jpg",
      "/images/projects/ghostscript-remover/2.jpg",
      "/images/projects/ghostscript-remover/3.jpg",
    ],
    links: [
      {
        label: "Unity Asset Store",
        href: "https://assetstore.unity.com/packages/tools/utilities/ghostscriptremover-305607",
      },
    ],
  },
  {
    slug: "gestion-des-prix",
    title: "Gestion des prix",
    year: "2026",
    featured: true,
    categories: ["app"],
    role: { fr: "Développement & mise en production", en: "Development & deployment" },
    summary: {
      fr: "Application mobile de gestion de stock et de prix développée pour un client, adossée à un serveur PocketBase installé dans ses locaux, avec synchronisation en temps réel entre les membres de l'équipe.",
      en: "A mobile stock and pricing app built for a client, backed by a PocketBase server installed on their premises, with real-time sync across the team.",
    },
    description: {
      fr: [
        "Un client avait besoin de piloter ses prix et son stock au quotidien, avec plusieurs personnes travaillant sur les mêmes données en même temps. Les solutions du marché étaient soit surdimensionnées, soit facturées au mois et par utilisateur. J'ai développé une application sur mesure, du back-end à l'interface.",
        "Le catalogue : plus de 200 produits avec photo, recherche instantanée et tris multiples (récents, alphabétique, prix croissant ou décroissant, et surtout par marge). Chaque fiche produit contient le prix d'achat, le prix de vente, le conditionnement (unité ou pack), la quantité et son unité, ainsi que le stock, ajustable par incréments rapides.",
        "À partir de ces données, l'application calcule automatiquement la marge en pourcentage et le prix ramené au litre ou au kilo. C'est ce qui permet de repérer d'un coup d'œil les produits les moins rentables, en triant simplement le catalogue par marge.",
        "Le scan de code-barres va plus loin qu'une simple recherche dans le catalogue : l'application interroge Open Food Facts, la base de données libre et collaborative de produits alimentaires. En scannant un article inconnu, elle reconnaît directement le produit et récupère automatiquement ses informations, ce qui supprime quasiment toute saisie manuelle à l'ajout.",
        "Un module d'étiquettes génère enfin des planches prêtes à imprimer au format A4 : nom du produit, prix, prix au litre et code-barres régénéré, le tout paginé pour couvrir l'ensemble du catalogue.",
        "Côté serveur, j'ai retenu PocketBase et je l'ai installé directement dans les locaux du client. Les données restent chez lui, sans abonnement cloud, et le temps réel est natif : dès qu'une personne modifie un prix ou un stock, la mise à jour apparaît instantanément sur les autres appareils de l'équipe, sans rafraîchissement.",
      ],
      en: [
        "A client needed to manage prices and stock day to day, with several people working on the same data at once. Off-the-shelf solutions were either oversized or billed monthly per user, so I built a tailored application, from the back end to the interface.",
        "The catalogue: over 200 products with photos, instant search and multiple sort options (recent, alphabetical, price ascending or descending, and above all by margin). Each product holds its purchase price, selling price, packaging (unit or pack), quantity and unit, plus stock, adjustable with quick increments.",
        "From that data, the app automatically computes the margin percentage and the price per litre or kilo. That's what lets the team spot the least profitable products at a glance, simply by sorting the catalogue by margin.",
        "Barcode scanning goes beyond a simple catalogue lookup: the app queries Open Food Facts, the free and collaborative food product database. Scanning an unknown item identifies the product directly and pulls in its details automatically, removing almost all manual entry when adding a product.",
        "Finally, a label module generates print-ready A4 sheets: product name, price, price per litre and a regenerated barcode, paginated to cover the whole catalogue.",
        "On the server side I chose PocketBase and installed it directly on the client's premises. Their data stays in-house, with no cloud subscription, and real-time comes built in: as soon as someone changes a price or a stock level, the update appears instantly on the rest of the team's devices, with no refresh.",
      ],
    },
    stack: ["PocketBase", "Android", "Temps réel", "Open Food Facts", "Code-barres", "Auto-hébergé"],
    image: "/images/projects/gestion-des-prix/1.jpg",
    gallery: [
      "/images/projects/gestion-des-prix/1.jpg",
      "/images/projects/gestion-des-prix/2.png",
      "/images/projects/gestion-des-prix/3.png",
      "/images/projects/gestion-des-prix/4.png",
      "/images/projects/gestion-des-prix/5.png",
    ],
  },
  {
    slug: "color-collapse",
    title: "Color Collapse",
    year: "2023",
    categories: ["game"],
    role: { fr: "Développeur (Lodenn Studio)", en: "Developer (Lodenn Studio)" },
    summary: {
      fr: "Mon premier jeu mobile publié : un puzzle où il faut fusionner les cubes de même couleur pour terminer chaque niveau. Plus de 3 500 téléchargements.",
      en: "My first published mobile game: a puzzle where you merge cubes of the same colour to clear each level. Over 3,500 downloads.",
    },
    description: {
      fr: [
        "Color Collapse est un puzzle game mobile sorti sous le label Lodenn Studio. Le principe est simple à comprendre mais difficile à maîtriser : fusionner les cubes de même couleur jusqu'à n'en laisser qu'un seul de chaque teinte sur le plateau.",
        "La difficulté monte progressivement au fil des niveaux, avec de nouveaux obstacles et des règles spéciales qui obligent à anticiper ses fusions plutôt qu'à jouer au hasard. L'ensemble est habillé d'une direction artistique épurée, d'animations fluides et d'une musique calme, pour un jeu de réflexion qui reste détendu.",
        "C'était mon premier jeu publié sur mobile, donc aussi ma première confrontation à tout ce qui entoure le développement : le build, la publication sur le store, les retours des joueurs et les mises à jour. Il a dépassé les 3 500 téléchargements.",
      ],
      en: [
        "Color Collapse is a mobile puzzle game released under the Lodenn Studio label. The concept is easy to grasp but hard to master: merge cubes of the same colour until only one of each shade is left on the board.",
        "Difficulty ramps up across levels, with new obstacles and special rules that force you to plan your merges rather than play at random. It is wrapped in a clean art direction, smooth animations and calm music, for a thinking game that stays relaxing.",
        "It was my first game published on mobile, so also my first encounter with everything around development itself: builds, store publishing, player feedback and updates. It passed 3,500 downloads.",
      ],
    },
    stack: ["Unity", "C#", "Android", "Google Play", "Level design"],
    image: "/images/projects/color-collapse/1.jpg",
    videoFile: "/images/projects/color-collapse/teaser.mp4",
    gallery: [
      "/images/projects/color-collapse/1.jpg",
      "/images/projects/color-collapse/2.jpg",
      "/images/projects/color-collapse/3.jpg",
      "/images/projects/color-collapse/4.jpg",
      "/images/projects/color-collapse/5.jpg",
      "/images/projects/color-collapse/6.jpg",
      "/images/projects/color-collapse/7.jpg",
      "/images/projects/color-collapse/8.jpg",
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.LodennStudio.MergeColor",
      },
    ],
  },
  {
    slug: "fideliter",
    title: "Fideliter",
    year: "2026",
    categories: ["app"],
    role: { fr: "Développement & infrastructure", en: "Development & infrastructure" },
    summary: {
      fr: "Programme de fidélité en deux applications, côté commerçant et côté client : QR code personnel, points calculés sur le montant des factures et récompenses, le tout sur un serveur auto-hébergé accessible partout.",
      en: "A loyalty program in two apps, one for the shop and one for the customer: personal QR code, points earned from receipt amounts and rewards, all on a self-hosted server reachable anywhere.",
    },
    description: {
      fr: [
        "Deuxième application réalisée pour le même client, après la gestion des prix. L'objectif : remplacer la carte de fidélité papier par un système numérique, sans passer par une plateforme payante au mois.",
        "Le projet se compose de deux applications distinctes. Côté commerçant, l'équipe dispose d'un annuaire client consultable par nom, téléphone ou code fidélité, avec création de compte à la volée. Pour créditer des points, il suffit de scanner le QR code du client et de saisir le montant de la facture.",
        "Le barème est entièrement paramétrable : on définit combien d'euros valent un point (par exemple 25 euros pour 1 point), avec un aperçu en direct du résultat. Les points sont proportionnels et fractionnés, donc une facture de 10 euros crédite 0,4 point plutôt que rien du tout. Une section dédiée permet de gérer les récompenses que les points débloquent, comme un café offert.",
        "Côté client, l'application permet de créer son compte, de consulter l'historique de ses dépenses et d'afficher son QR code personnel avec son solde de points, à présenter en caisse.",
        "Côté infrastructure, tout repose sur le serveur PocketBase déjà installé chez le client pour la gestion des prix, avec des bases de données strictement séparées entre les deux projets. Pour que les clients puissent utiliser l'application depuis n'importe où, j'ai exposé le serveur via un tunnel Tailscale Funnel : le service devient accessible en HTTPS depuis l'extérieur sans ouvrir de port sur le réseau du commerçant ni louer une IP publique fixe. Un serveur auto-hébergé, mais joignable partout et à tout moment depuis un téléphone.",
      ],
      en: [
        "The second application built for the same client, after the pricing tool. The goal: replace the paper loyalty card with a digital system, without paying a monthly platform fee.",
        "The project is made of two separate apps. On the shop side, the team gets a customer directory searchable by name, phone or loyalty code, with on-the-spot account creation. To credit points, staff simply scan the customer's QR code and enter the receipt amount.",
        "The earning rate is fully configurable: you set how many euros are worth one point (say 25 euros for 1 point), with a live preview of the result. Points are proportional and fractional, so a 10 euro receipt credits 0.4 points rather than nothing at all. A dedicated section manages the rewards those points unlock, such as a free coffee.",
        "On the customer side, the app lets people create an account, review their spending history and display a personal QR code with their current balance, ready to be scanned at the counter.",
        "Infrastructure-wise, everything runs on the PocketBase server already installed at the client's premises for the pricing tool, with strictly separate databases between the two projects. So customers can use the app from anywhere, I exposed the server through a Tailscale Funnel tunnel: the service becomes reachable over HTTPS from outside without opening a port on the shop's network or renting a fixed public IP. A self-hosted server, yet reachable anywhere and anytime from a phone.",
      ],
    },
    stack: ["PocketBase", "Android", "QR code", "Tailscale Funnel", "Temps réel", "Auto-hébergé"],
    image: "/images/projects/fideliter/1.jpg",
    gallery: [
      "/images/projects/fideliter/1.jpg",
      "/images/projects/fideliter/2.jpg",
      "/images/projects/fideliter/3.png",
      "/images/projects/fideliter/4.png",
      "/images/projects/fideliter/6.png",
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
    image: "/images/projects/clavier-custom/1.jpg",
    video: "https://youtu.be/Hs6-nNDq0qo",
    gallery: [
      "/images/projects/clavier-custom/1.jpg",
      "/images/projects/clavier-custom/2.jpg",
      "/images/projects/clavier-custom/3.jpg",
      "/images/projects/clavier-custom/4.jpg",
      "/images/projects/clavier-custom/5.jpg",
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
      fr: "Un Stream Deck entièrement fait maison : ESP32, matrice de 12 touches mécaniques, firmware écrit à la main et application de bureau développée avec Tauri.",
      en: "A fully homemade Stream Deck: ESP32, a 12-key mechanical matrix, hand-written firmware and a desktop app built with Tauri.",
    },
    description: {
      fr: [
        "Un Stream Deck du commerce coûte entre 100 et 150 euros. Comme je stream de temps en temps sur Twitch et qu'il me restait des switches hot-swap du montage de mon clavier custom, j'ai préféré construire le mien de A à Z, de l'électronique jusqu'au logiciel.",
        "Le matériel : douze switches mécaniques câblés en matrice sur un ESP32, des keycaps assortis à ceux de mon clavier, et un boîtier modélisé puis imprimé en 3D. Le boîtier est incliné pour tomber naturellement sous la main, et la liaison avec le PC se fait en USB.",
        "Le firmware : j'ai écrit moi-même le code embarqué qui scanne la matrice de touches et gère l'anti-rebond. Les contacts mécaniques « rebondissent » à chaque pression et déclencheraient sinon plusieurs appuis pour un seul geste. L'objectif était d'obtenir une latence imperceptible et aucun appui fantôme.",
        "L'application de bureau : développée avec Tauri, elle fait le pont entre le boîtier et le système. Elle écoute les événements envoyés par l'ESP32 et déclenche l'action associée à chaque touche, par exemple une commande OBS (changer de scène, couper le micro) ou un raccourci clavier Windows et macOS. Chaque touche étant configurable, le boîtier ne sert pas qu'au streaming : il s'adapte à n'importe quel usage, du montage vidéo aux raccourcis de développement.",
        "C'est le projet le plus complet que j'aie mené seul : conception électronique, modélisation 3D, firmware embarqué, protocole de communication et interface de configuration. Le tout pour une fraction du prix d'un modèle du commerce, et entièrement adaptable à mes besoins.",
      ],
      en: [
        "An off-the-shelf Stream Deck costs between 100 and 150 euros. Since I stream on Twitch from time to time and had hot-swap switches left over from my custom keyboard build, I decided to build my own from scratch, from the electronics all the way to the software.",
        "The hardware: twelve mechanical switches wired as a matrix on an ESP32, keycaps matching my keyboard, and a case I modelled and 3D-printed. The case is angled so it falls naturally under the hand, and it connects to the PC over USB.",
        "The firmware: I wrote the embedded code myself, scanning the key matrix and handling debounce. Mechanical contacts physically bounce on each press and would otherwise register several presses for a single one. The goal was imperceptible latency and zero ghost presses.",
        "The desktop app: built with Tauri, it bridges the device and the operating system. It listens to the events sent by the ESP32 and triggers the action mapped to each key, for example an OBS command (switch scene, mute the mic) or a Windows and macOS keyboard shortcut. Since every key is configurable, the device isn't limited to streaming: it adapts to any workflow, from video editing to development shortcuts.",
        "It's the most complete project I've built on my own: electronics design, 3D modelling, embedded firmware, a communication protocol and a configuration interface. All for a fraction of the price of a commercial unit, and fully tailored to my needs.",
      ],
    },
    stack: ["ESP32", "C++", "Tauri", "OBS", "Impression 3D"],
    image: "/images/projects/stream-deck-diy/1.jpg",
    gallery: [
      "/images/projects/stream-deck-diy/1.jpg",
      "/images/projects/stream-deck-diy/2.jpg",
      "/images/projects/stream-deck-diy/3.jpg",
      "/images/projects/stream-deck-diy/4.jpg",
      "/images/projects/stream-deck-diy/5.jpg",
      "/images/projects/stream-deck-diy/6.jpg",
      "/images/projects/stream-deck-diy/7.jpg",
      "/images/projects/stream-deck-diy/8.jpg",
      "/images/projects/stream-deck-diy/9.jpg",
      "/images/projects/stream-deck-diy/10.jpg",
      "/images/projects/stream-deck-diy/11.jpg",
      "/images/projects/stream-deck-diy/12.jpg",
    ],
  },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
