---
name: installer-atelier
description: Installe l'atelier de motion design de la formation (les skills, Node.js et le projet Remotion) sur le Mac ou le PC de l'élève, depuis l'application Claude (onglet Code). L'élève n'est pas développeur - il ne tape aucune commande, il répond à tes questions et clique dans les fenêtres que tu lui annonces. À lancer une seule fois, au début de la formation.
---

# Installer l'atelier de motion design

## Qui est l'élève (lis ceci avant tout)
- L'élève n'est **pas développeur**. Il travaille dans l'application Claude (onglet Code). Il ne doit **jamais** ouvrir le
  Terminal ni taper une commande : c'est toi qui exécutes tout.
- **Une question à la fois**, en français simple, sans jargon (« le moteur qui fait tourner l'atelier » plutôt que
  « runtime »). Propose toujours la réponse par défaut : « Je fais comme ça ? Réponds oui. »
- Avant chaque installation, dis en une phrase ce que tu vas faire et attends son « oui ».
- Si une fenêtre va s'ouvrir sur son ordinateur (installateur, autorisation Windows), **préviens-le avant** et dis-lui
  exactement sur quoi cliquer. Puis attends qu'il écrive « c'est fait ».
- Ne demande **jamais** de mot de passe dans la conversation. Si l'ordinateur en veut un, c'est dans une fenêtre du
  système : l'élève le tape lui-même.
- Note l'avancement dans `atelier.md` (dans le dossier de travail) : si on te relance, reprends là où on en était.

## Étape 1 · Ranger les skills
L'élève t'a donné les skills de la formation de l'une de ces deux façons :
- il a **collé leur texte** dans la conversation : chaque fichier y est annoncé par une ligne « === Fichier <chemin> === » ;
  recrée chaque fichier à son emplacement (sans la ligne d'annonce ni les balises ``` qui entourent les scripts) ;
- il a **téléchargé le pack** (`pack_skills_installation.zip`, dans Téléchargements) : dézippe-le.
Range les quatre dossiers (`installer-atelier`, `analyse-image`, `decoupage-reference`, `fal-ai`) dans le dossier des skills de l'élève
(`~/.claude/skills/` ; Windows : `%USERPROFILE%\.claude\skills\`) et rends les scripts .sh exécutables. Dis simplement :
« J'ai rangé tes quatre skills. »

## Étape 2 · Node.js (le moteur qui fait tourner l'atelier)
Vérifie `node --version` : 20 ou plus, rien à faire.
- **Mac** : télécharge l'installateur officiel macOS (.pkg) de la version LTS sur https://nodejs.org, puis ouvre-le
  (`open <fichier>.pkg`). Préviens AVANT : « Une fenêtre d'installation va s'ouvrir : clique Continuer, Accepter, puis
  Installer, et tape le mot de passe de ton Mac si la fenêtre te le demande. Écris-moi « c'est fait » à la fin. »
- **Windows** : `winget install OpenJS.NodeJS.LTS`. Préviens AVANT : « Une fenêtre va te demander l'autorisation :
  clique Oui. »
Vérifie ensuite `node --version`. Si la commande n'est pas encore reconnue, demande à l'élève de quitter puis rouvrir
l'application Claude et de te relancer : tu reprendras à l'étape 3.

## Étape 3 · Le projet Remotion (là où les vidéos sont fabriquées)
Crée le projet dans le dossier de travail avec `npx create-video@latest`, modèle **Blank** (TypeScript), puis
`npm install`. Règle les vidéos à **60 images par seconde**. Explique en une phrase : « Remotion fabrique les vidéos avec
du code : un navigateur invisible photographie chaque image. »
Remotion contient son propre ffmpeg (images, sons, découpage) : utilise `npx remotion ffmpeg` et `npx remotion ffprobe`,
n'installe pas ffmpeg à part.

## Étape 4 · Le test final
1. Ouvre le studio (`npx remotion studio`) et dis : « Le studio Remotion vient de s'ouvrir dans ton navigateur : c'est
   là qu'on verra tes vidéos. »
2. Rends une image fixe de la composition de départ (`npx remotion still`) et montre-la.
3. Récapitule dans `atelier.md`, puis dis : « Ton atelier est prêt. Pour y revenir : application Claude, onglet Code,
   dossier mon-atelier. Tu peux passer au cours 2. »

## Plus tard, seulement si un cours en a besoin
Python (mesurer les couleurs, les mouvements, le tempo d'une musique) : ne l'installe que lorsqu'un cours le demande,
avec l'accord de l'élève et en le prévenant des fenêtres (Mac : les outils de développement d'Apple, fenêtre
« Installer » ; Windows : `winget install Python.Python.3.12`, fenêtre « Oui »), puis un environnement `.venv` avec
numpy, scipy et pillow.
