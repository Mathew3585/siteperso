// Configuration PM2 : fait tourner le serveur Next.js en production (next start).
// Utilisé sur le VPS. Les variables d'environnement (RESEND_API_KEY...) sont lues
// automatiquement par Next depuis le fichier .env.local placé sur le serveur.
module.exports = {
  apps: [
    {
      name: "siteperso",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
