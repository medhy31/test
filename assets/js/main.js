/* Lien de réservation : à remplacer par l'agenda une fois intégré. */
const LIEN_RESERVATION = "#reserver";

document.querySelectorAll("[data-cta]").forEach((a) => {
  a.setAttribute("href", LIEN_RESERVATION);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------
   Fil visuel : un seul dessin qui raconte le texte.
   Étape 0 repos · 1 fragments dispersés · 2 système relié
   · 3 trois branches (une par pack) · 4 convergence vers le bouton.
   ------------------------------------------------------------------ */
const NS = "http://www.w3.org/2000/svg";
const ACCENT = "#6C8EFF";
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

const POS = {
  repos:     [[140, 230, 0], [260, 230, 0], [110, 300, 0], [290, 300, 0], [140, 370, 0], [260, 370, 0]],
  disperses: [[80, 120, -12], [310, 90, 10], [50, 320, 7], [335, 290, -9], [115, 500, 11], [295, 480, -6]],
  systeme:   [[200, 140, 0], [330, 220, 0], [330, 380, 0], [200, 460, 0], [70, 380, 0], [70, 220, 0]],
};
const HUB = [200, 300];
/* Anneau puis rayons vers le centre (6 = centre) */
const PAIRES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0], [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]];
const BRANCHES = [
  { x: 80, label: "Présence en ligne" },
  { x: 200, label: "Pilotage commercial" },
  { x: 320, label: "Écosystème" },
];
const Y_BRANCHE = 430;
const PY_DEFAUT = 540;

/* Vecteur d'état : 18 valeurs de nœuds, puis trace, échelle, décalage,
   branches, libellés, convergence, hauteur du point, ligne vers le bouton. */
const I = { trace: 18, s: 19, dy: 20, branche: 21, labels: 22, conv: 23, py: 24, hl: 25 };
const etape = (pos, o) => [...pos.flat(), o.trace, o.s, o.dy, o.branche, o.labels, o.conv, PY_DEFAUT, o.hl ?? 0];
const ETAPES = [
  etape(POS.repos,     { trace: 0, s: 1, dy: 0, branche: 0, labels: 0, conv: 0 }),
  etape(POS.disperses, { trace: 0, s: 1, dy: 0, branche: 0, labels: 0, conv: 0 }),
  etape(POS.systeme,   { trace: 1, s: 1, dy: 0, branche: 0, labels: 0, conv: 0 }),
  etape(POS.systeme,   { trace: 1, s: .5, dy: -150, branche: 1, labels: 1, conv: 0 }),
  etape(POS.systeme,   { trace: 1, s: .5, dy: -150, branche: 1, labels: 0, conv: 1, hl: 1 }),
];
/* Cadrage de chaque étape affichée seule (mobile) */
const CADRAGES = ["0 180 400 240", "0 50 400 510", "0 110 400 400", "0 40 400 450", "0 40 400 560"];

function nouveau(nom, attrs, parent) {
  const e = document.createElementNS(NS, nom);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

function construireFil() {
  const svg = nouveau("svg", { viewBox: "0 0 400 600", fill: "none", "aria-hidden": "true", focusable: "false" });
  const trait = { stroke: ACCENT, "stroke-width": 1.5, "stroke-linecap": "round", fill: "none", pathLength: 1, "stroke-dasharray": 1, "vector-effect": "non-scaling-stroke" };

  const sys = nouveau("g", {}, svg);
  const lignes = PAIRES.map(() => nouveau("path", trait, sys));
  const hub = nouveau("circle", { cx: HUB[0], cy: HUB[1], r: 7, fill: ACCENT }, sys);
  const noeuds = POS.repos.map(() => {
    const g = nouveau("g", {}, sys);
    nouveau("rect", { x: -23, y: -15, width: 46, height: 30, rx: 6, fill: "#2A3A5C", stroke: "rgba(237,242,249,.45)", "stroke-width": 1.25 }, g);
    nouveau("path", { d: "M-14 -4h20M-14 4h28", stroke: "rgba(237,242,249,.5)", "stroke-width": 2, "stroke-linecap": "round" }, g);
    return g;
  });

  const branches = BRANCHES.map((b) => {
    const chemin = nouveau("path", trait, svg);
    const point = nouveau("circle", { cx: b.x, cy: Y_BRANCHE, r: 6, fill: "#14213D", stroke: ACCENT, "stroke-width": 1.5 }, svg);
    const texte = nouveau("text", { x: b.x, y: Y_BRANCHE + 32, "text-anchor": "middle", class: "f-label" }, svg);
    texte.textContent = b.label;
    return { chemin, point, texte, x: b.x };
  });

  const convergences = BRANCHES.map(() => nouveau("path", trait, svg));
  const versBouton = nouveau("path", trait, svg);
  const cible = nouveau("circle", { cx: 200, cy: PY_DEFAUT, r: 8, fill: ACCENT }, svg);

  function rendre(v) {
    const s = v[I.s], dy = v[I.dy], trace = v[I.trace], py = v[I.py];
    sys.setAttribute("transform", `translate(0 ${dy}) translate(200 300) scale(${s}) translate(-200 -300)`);
    const pt = (k) => (k === 6 ? HUB : [v[k * 3], v[k * 3 + 1]]);
    noeuds.forEach((g, k) => g.setAttribute("transform", `translate(${v[k * 3]} ${v[k * 3 + 1]}) rotate(${v[k * 3 + 2]})`));
    lignes.forEach((l, k) => {
      const [a, b] = PAIRES[k];
      const A = pt(a), B = pt(b);
      const p = clamp(trace * PAIRES.length - k);
      l.setAttribute("d", `M${A[0]} ${A[1]}L${B[0]} ${B[1]}`);
      l.style.strokeDashoffset = 1 - p;
      l.style.opacity = p > 0.001 ? 1 : 0;
    });
    hub.style.opacity = clamp(trace * 1.5 - 0.5);

    const oy = 300 + 175 * s + dy;
    branches.forEach((b, k) => {
      const p = clamp(v[I.branche] * 1.6 - k * 0.3);
      b.chemin.setAttribute("d", `M200 ${oy}C200 ${oy + 80} ${b.x} ${Y_BRANCHE - 90} ${b.x} ${Y_BRANCHE}`);
      b.chemin.style.strokeDashoffset = 1 - p;
      b.chemin.style.opacity = p > 0.001 ? 1 : 0;
      const fin = clamp((p - 0.8) * 5);
      b.point.style.opacity = fin;
      b.texte.style.opacity = fin * v[I.labels];
    });

    const c = v[I.conv];
    convergences.forEach((l, k) => {
      const x = BRANCHES[k].x, y0 = Y_BRANCHE + 7, h = py - y0;
      const p = clamp(c * 1.6 - k * 0.3);
      l.setAttribute("d", `M${x} ${y0}C${x} ${y0 + h * 0.6} 200 ${py - h * 0.6} 200 ${py}`);
      l.style.strokeDashoffset = 1 - p;
      l.style.opacity = p > 0.001 ? 1 : 0;
    });
    const fin = clamp(c * 2 - 1);
    cible.setAttribute("cy", py);
    cible.style.opacity = fin;
    versBouton.setAttribute("d", `M200 ${py}H0`);
    const h = fin * v[I.hl];
    versBouton.style.strokeDashoffset = 1 - h;
    versBouton.style.opacity = h > 0.001 ? 1 : 0;
  }

  return { svg, rendre, cible };
}

/* Mobile : chaque bloc montre son étape, sous son texte. */
document.querySelectorAll(".fil-etape[data-etape]").forEach((fig) => {
  const n = +fig.dataset.etape;
  const f = construireFil();
  f.svg.setAttribute("viewBox", CADRAGES[n]);
  fig.appendChild(f.svg);
  const v = ETAPES[n].slice();
  v[I.hl] = 0;
  f.rendre(v);
});

/* Bureau : un seul fil, fixe à droite, qui évolue avec le défilement. */
(() => {
  const hote = document.getElementById("fil");
  if (!hote) return;
  const f = construireFil();
  hote.appendChild(f.svg);
  const sections = [...document.querySelectorAll("[data-fil]")];
  const bouton = document.querySelector("[data-convergence]");
  const bureau = window.matchMedia("(min-width: 1024px)");
  if (!sections.length) return;

  if (reduceMotion) {
    f.rendre(ETAPES[4]);
    return;
  }

  const actuel = ETAPES[0].slice();
  let boucle = false;

  const cible = () => {
    const vh = window.innerHeight;
    let sec = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top <= vh * 0.5) sec = s;
    const n = +sec.dataset.fil;
    const t = ETAPES[n].slice();
    if (sec.dataset.trace === "defilement") {
      const r = sec.getBoundingClientRect();
      t[I.trace] = clamp((vh * 0.6 - r.top) / (r.height * 0.7));
    }
    if (n === 4 && bouton) {
      const r = bouton.getBoundingClientRect();
      const m = f.svg.getScreenCTM();
      if (m) {
        const p = new DOMPoint(0, r.top + r.height / 2).matrixTransform(m.inverse());
        t[I.py] = clamp(p.y, 480, 585);
      }
    }
    return t;
  };

  const image = () => {
    const t = cible();
    let ecart = 0;
    for (let k = 0; k < actuel.length; k++) {
      actuel[k] += (t[k] - actuel[k]) * 0.1;
      ecart = Math.max(ecart, Math.abs(t[k] - actuel[k]));
    }
    f.rendre(actuel);
    if (ecart > 0.002) requestAnimationFrame(image);
    else boucle = false;
  };

  const relancer = () => {
    if (!bureau.matches || boucle) return;
    boucle = true;
    requestAnimationFrame(image);
  };

  f.rendre(actuel);
  window.addEventListener("scroll", relancer, { passive: true });
  window.addEventListener("resize", relancer);
  relancer();
})();
