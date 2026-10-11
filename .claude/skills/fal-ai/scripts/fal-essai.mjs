// Essai fal.ai : node scripts/fal-essai.mjs image "<consigne>"  |  node scripts/fal-essai.mjs son "<consigne>" [durée_s]
// Lit FAL_KEY dans .env (jamais affichée) ; enregistre le résultat dans public/essais-fal/.
import fs from 'node:fs';
import path from 'node:path';
const env = fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '';
const KEY = (env.match(/^FAL_KEY=(.*)$/m)?.[1] || process.env.FAL_KEY || '').trim().replace(/^["']|["']$/g, '');
if (!KEY) { console.error('FAL_KEY introuvable : ajoute la ligne FAL_KEY=… dans .env'); process.exit(1); }
const [genre, consigne, duree] = process.argv.slice(2);
if (!['image', 'son'].includes(genre) || !consigne) { console.error('Usage : image "<consigne>" | son "<consigne>" [durée_s]'); process.exit(1); }
const modele = genre === 'image' ? 'fal-ai/flux-pro/v1.1' : 'fal-ai/elevenlabs/sound-effects/v2';
const corps = genre === 'image'
  ? {prompt: consigne, image_size: {width: 1024, height: 1024}, num_images: 1, output_format: 'jpeg'}
  : {text: consigne, duration_seconds: Number(duree || 1.5), prompt_influence: 0.6};
const r = await fetch(`https://fal.run/${modele}`, {method: 'POST', headers: {Authorization: `Key ${KEY}`, 'Content-Type': 'application/json'}, body: JSON.stringify(corps)});
if (!r.ok) { console.error(`Échec ${r.status} : ${(await r.text()).slice(0, 300)}`); process.exit(1); }
const o = await r.json();
const url = genre === 'image' ? o.images?.[0]?.url : o.audio?.url;
if (!url) { console.error('Réponse sans fichier.'); process.exit(1); }
fs.mkdirSync('public/essais-fal', {recursive: true});
const dest = path.join('public/essais-fal', `${genre}_${Date.now()}${genre === 'image' ? '.jpg' : '.mp3'}`);
fs.writeFileSync(dest, Buffer.from(await (await fetch(url)).arrayBuffer()));
console.log('enregistré :', dest);
