# NEO ARCHIVE — site personnel

Site sombre de type archive numérique, avec :
- Accueil
- Galerie Images
- Musiques
- Textes
- About
- interface `/admin` prévue pour Decap CMS

## Déploiement GitHub Pages

1. Crée un dépôt GitHub, par exemple `neo-archive`.
2. Envoie tous les fichiers de ce dossier dans la branche `main`.
3. Dans GitHub : Settings → Pages → Source → GitHub Actions.
4. Le workflow `.github/workflows/deploy.yml` construira et publiera le site.
5. L'adresse sera généralement `https://TON-PSEUDO.github.io/neo-archive/`.

## Important pour l'interface /admin

Le site peut être hébergé uniquement par GitHub Pages, mais Decap CMS a besoin d'un mécanisme d'authentification OAuth pour permettre à une interface web de modifier ton dépôt GitHub en sécurité. Le fichier `public/admin/config.yml` est déjà préparé pour le backend GitHub.

Pour une première mise en ligne, le site public fonctionne sans CMS.
Pour activer `/admin`, il faudra ensuite configurer l'authentification GitHub (je recommande de le faire dans une deuxième étape plutôt que de mettre un token GitHub directement dans le navigateur).

## Modifier le contenu

Le dossier `src/data/` contient les données d'exemple. Une fois Decap CMS activé, tu pourras les gérer visuellement depuis `/admin`.
