---
name: fal-ai
description: Branche l'atelier sur fal.ai (images, bruitages, musique générés par IA) - création du compte, clé rangée dans .env (jamais dans la conversation), essai d'image, de bruitage et de musique avec leur prix. L'élève n'est pas développeur - tu fais tout, il crée son compte et colle sa clé. À utiliser pour générer les visuels et les sons d'une pub.
---

# Brancher fal.ai (images, bruitages, musique)

## Comment tu travailles (consignes pour Claude Code)
- L'élève **n'est pas développeur** : une question à la fois, en français simple ; tu exécutes tout toi-même.
- **La clé ne passe jamais par la conversation.** Tu ne la demandes pas, tu ne l'affiches pas, tu ne la mets pas dans un
  fichier suivi par git. L'élève la colle LUI-MÊME dans `.env`.
- Tu annonces le **prix** avant chaque génération et tu attends l'accord de l'élève.
- Aucune marque, aucun artiste, aucune personne réelle dans les consignes envoyées (refus « content_policy_violation »).

## Étape 1 · Le compte (l'élève le fait)
1. Créer un compte sur https://fal.ai et ajouter un peu de crédit (Billing). Quelques dollars suffisent pour une pub.
2. Créer une clé (Dashboard > API Keys > Create).
3. Toi : crée le fichier `.env` dans le dossier du projet avec la ligne `FAL_KEY=` (sans valeur), vérifie qu'il est dans
   `.gitignore` (ajoute-le sinon), puis OUVRE-LE dans l'éditeur de texte de l'élève (Mac : `open -e .env` ; Windows :
   `notepad .env`). Dis-lui : « Un petit fichier vient de s'ouvrir : colle ta clé juste après le signe =, enregistre
   (Cmd + S ou Ctrl + S), ferme-le, puis écris-moi « c'est fait ». »
Ensuite, vérifie que la clé est là SANS jamais afficher sa valeur : `grep -c '^FAL_KEY=.' .env`.

## Étape 2 · Les essais ✋
Le script `scripts/fal-essai.mjs` lit la clé dans `.env` et enregistre le résultat dans `public/essais-fal/`.
1. Image (Flux Pro 1.1, ~0,04 $ l'image) : `node scripts/fal-essai.mjs image "abstract pastel gradient, studio light, no text"`
2. Bruitage (ElevenLabs Sound Effects v2, ~0,002 $ par seconde) : `node scripts/fal-essai.mjs son "soft low whoosh, deep and smooth" 1.5`
3. Musique (ElevenLabs Music, ~0,60 $ la minute) : seulement si l'élève le demande.
Montre chaque résultat et le prix réellement payé (tableau de bord fal.ai > Usage).

## Bonnes pratiques
- Bruitages de motion design : graves et doux (« deep, soft, smooth »), jamais aigus ; générer 2-3 variantes et choisir
  celle dont le pic tombe bien.
- Images : préciser « no text, no logo, no watermark » ; garder la même graine (seed) pour des images cohérentes.
- Musique connue (TikTok, Instagram) : à ajouter dans l'appli au moment de publier ; une pub sponsorisée demande une
  musique sous licence.
