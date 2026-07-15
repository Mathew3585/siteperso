# Déploiement (VPS + GitHub Actions)

Objectif : **push sur `main` → le site se met à jour tout seul** sur le VPS.

Pipeline : GitHub Action → SSH sur le VPS → `git pull` + `pnpm build` → redémarrage via **PM2**, derrière **Nginx** (+ HTTPS).

> Le site n'est PAS statique (Server Actions du formulaire de contact + optimisation d'images), il tourne donc en serveur Node (`next start`).

---

## Étape 0 — Mettre le code sur GitHub (branche `main`)

Depuis ton PC, dans le dossier du projet :

```bash
git add -A
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/Mathew3585/siteperso.git   # crée d'abord le repo sur github.com
git push -u origin main
```

> Un repo **public** rend le déploiement plus simple (le VPS clone sans authentification).
> Aucun secret n'est versionné (`.env.local` est ignoré par git).

---

## Étape 1 — Préparer le VPS (une seule fois)

Connecte-toi en SSH (Hostinger te donne l'IP et l'accès) :

```bash
ssh root@TON_IP_VPS
```

Puis installe tout :

```bash
# Système
apt update && apt upgrade -y
apt install -y git nginx

# Node.js 22 (LTS) via NodeSource
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# pnpm (via corepack) + PM2
corepack enable pnpm
npm install -g pm2

# (Recommandé si le VPS a peu de RAM : swap de 2 Go pour que le build passe)
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

---

## Étape 2 — Premier déploiement manuel

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/Mathew3585/siteperso.git
cd siteperso

# Crée le fichier des secrets (formulaire de contact). NON versionné.
nano .env.local
```

Contenu de `.env.local` :

```
RESEND_API_KEY=re_ta_cle_resend
CONTACT_TO=mathew.simon2004@gmail.com
```

Puis build + démarrage :

```bash
corepack enable pnpm
pnpm install --frozen-lockfile
pnpm build
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup            # exécute la commande affichée (démarrage auto au reboot)
```

Le site tourne maintenant en local sur le VPS (port 3000). Vérifie :

```bash
curl -I http://127.0.0.1:3000
```

---

## Étape 3 — Nginx (reverse proxy)

```bash
# Copie l'exemple fourni dans le repo puis édite le domaine
cp /var/www/siteperso/deploy/nginx.conf.example /etc/nginx/sites-available/siteperso
nano /etc/nginx/sites-available/siteperso   # remplace ton-domaine.com

ln -s /etc/nginx/sites-available/siteperso /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

---

## Étape 4 — Domaine (Hostinger)

Dans le panneau **Hostinger → ton domaine → DNS / Zone DNS**, crée/édite :

| Type | Nom  | Valeur (pointe vers) |
|------|------|----------------------|
| A    | `@`  | l'IP de ton VPS      |
| A    | `www`| l'IP de ton VPS      |

> La propagation DNS peut prendre de quelques minutes à quelques heures.

---

## Étape 5 — HTTPS (gratuit, Let's Encrypt)

Une fois le domaine qui pointe sur le VPS :

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ton-domaine.com -d www.ton-domaine.com
```

Certbot configure le HTTPS et le renouvellement automatique. Ton site est en ligne. 🎉

---

## Étape 6 — Activer le déploiement automatique (GitHub Actions)

### a) Clé SSH dédiée au déploiement

Sur le VPS :

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
cat ~/.ssh/github_deploy        # <-- copie TOUTE cette clé PRIVÉE
```

### b) Secrets GitHub

Sur le repo GitHub → **Settings → Secrets and variables → Actions → New repository secret**, ajoute :

| Secret          | Valeur                                   |
|-----------------|------------------------------------------|
| `VPS_HOST`      | l'IP de ton VPS                          |
| `VPS_USER`      | `root` (ou ton utilisateur)              |
| `VPS_PORT`      | `22`                                      |
| `VPS_SSH_KEY`   | la clé **privée** copiée ci-dessus       |
| `VPS_APP_DIR`   | `/var/www/siteperso`                     |

### c) C'est prêt

Le workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) tourne à chaque **push sur `main`**.
Tu peux aussi le lancer à la main : onglet **Actions → Deploy to VPS → Run workflow**.

---

## Au quotidien

```bash
# sur ton PC
git add -A && git commit -m "Ajout d'un projet" && git push
```

→ ~1-2 min plus tard, le site est à jour en ligne. C'est tout.

Suivre les déploiements : onglet **Actions** du repo GitHub.
Voir les logs de l'app sur le VPS : `pm2 logs siteperso`.
