/* Lien de réservation : à remplacer par l'agenda une fois intégré. */
const LIEN_RESERVATION = "#reserver";

document.querySelectorAll("[data-cta]").forEach((a) => {
  a.setAttribute("href", LIEN_RESERVATION);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------
   Fil visuel : une démo d'interface (exemple illustratif).
   Étape 0 repos · 1 outils éparpillés · 2 tout se range dans le suivi,
   la fiche avance au défilement · 3 et 4 prospect réservé.
   ------------------------------------------------------------------ */
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const tpl = document.getElementById("demo-tpl");
const SCENE_W = 360, SCENE_H = 520;

function creerDemo(hote) {
  const demo = tpl.content.firstElementChild.cloneNode(true);
  hote.appendChild(demo);
  const cadre = demo.querySelector(".demo__cadre");
  const ajuster = () => {
    const w = hote.clientWidth - parseFloat(getComputedStyle(hote).paddingLeft) * 2;
    const hMax = hote.dataset.hauteur ? hote.clientHeight - 80 : Infinity;
    const k = Math.min(w / SCENE_W, hMax / SCENE_H, 1.25);
    cadre.style.setProperty("--k", k);
    cadre.style.width = SCENE_W * k + "px";
    cadre.style.height = SCENE_H * k + "px";
  };
  ajuster();
  window.addEventListener("resize", ajuster);
  return demo;
}

function regler(demo, etape, p = 1) {
  const col = etape < 2 ? 0 : etape > 2 ? 2 : p < 0.35 ? 0 : p < 0.7 ? 1 : 2;
  demo.dataset.etape = etape;
  demo.dataset.col = col;
}

/* Mobile : chaque bloc montre son étape, sous son texte. */
const demosMobiles = [...document.querySelectorAll(".fil-etape[data-etape]")].map((fig) => {
  const demo = creerDemo(fig);
  const n = +fig.dataset.etape;
  regler(demo, n, reduceMotion ? 1 : 0);
  return { fig, demo, n };
});

/* Bureau : une seule démo, fixe à droite, qui suit le défilement. */
const hote = document.getElementById("fil");
if (hote) hote.dataset.hauteur = "1";
const demoBureau = hote && creerDemo(hote);
const sections = [...document.querySelectorAll("[data-fil]")];

function suivre() {
  const vh = window.innerHeight;
  if (demoBureau && sections.length) {
    if (reduceMotion) { regler(demoBureau, 4); }
    else {
      let sec = sections[0];
      for (const s of sections) if (s.getBoundingClientRect().top <= vh * 0.5) sec = s;
      const n = +sec.dataset.fil;
      const r = sec.getBoundingClientRect();
      regler(demoBureau, n, clamp((vh * 0.5 - r.top) / r.height));
    }
  }
  if (!reduceMotion) {
    demosMobiles.filter((d) => d.n === 2).forEach(({ fig, demo }) => {
      const r = fig.getBoundingClientRect();
      regler(demo, 2, clamp((vh * 0.8 - r.top) / (vh * 0.55)));
    });
  }
}

let attente = false;
const demander = () => { if (!attente) { attente = true; requestAnimationFrame(() => { attente = false; suivre(); }); } };
window.addEventListener("scroll", demander, { passive: true });
window.addEventListener("resize", demander);
suivre();
