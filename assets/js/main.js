/* Lien de réservation : à remplacer par l'agenda une fois intégré. */
const LIEN_RESERVATION = "#reserver";

document.querySelectorAll("[data-cta]").forEach((a) => {
  a.setAttribute("href", LIEN_RESERVATION);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add(reduceMotion ? "no-motion" : "motion");

/* Bloc 3 : la ligne du parcours se dessine au défilement */
(() => {
  const fig = document.getElementById("parcours");
  if (!fig || reduceMotion) return;
  const ligne = fig.querySelector(".p-ligne");
  const etapes = fig.querySelectorAll(".p-etape");
  const carte = fig.querySelector(".p-carte");
  const fenetres = fig.querySelectorAll(".p-fen");
  const len = ligne.getTotalLength();
  const seuils = [0, 0.22, 0.45, 0.68];
  const clamp = (v) => Math.min(1, Math.max(0, v));
  ligne.style.strokeDasharray = len;

  let attente = false;
  const maj = () => {
    attente = false;
    const vh = window.innerHeight;
    const r = fig.getBoundingClientRect();
    const p = clamp((vh * 0.9 - r.top) / (r.height - vh * 0.05));
    const trace = clamp(p / 0.7);
    ligne.style.strokeDashoffset = len * (1 - trace);
    etapes.forEach((e, i) => e.classList.toggle("on", trace >= seuils[i] && p > 0));
    const t = clamp((p - 0.72) / 0.28);
    const k = 1 - t * t * (3 - 2 * t);
    carte.style.opacity = t;
    fenetres.forEach((f) => {
      const d = f.dataset;
      f.setAttribute("transform",
        `translate(${+d.x + d.dx * k} ${+d.y + d.dy * k}) rotate(${d.r * k} 20 16)`);
    });
  };
  const demander = () => { if (!attente) { attente = true; requestAnimationFrame(maj); } };
  window.addEventListener("scroll", demander, { passive: true });
  window.addEventListener("resize", demander);
  maj();
})();
