/* Lien de réservation : à remplacer par l'agenda une fois intégré. */
const LIEN_RESERVATION = "#reserver";

document.querySelectorAll("[data-cta]").forEach((a) => {
  a.setAttribute("href", LIEN_RESERVATION);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Maquettes : dessinées à taille fixe, mises à l'échelle de leur colonne. */
function ajusterMaquettes() {
  document.querySelectorAll(".mq__echelle").forEach((e) => {
    const c = e.firstElementChild;
    const k = Math.min(1, e.clientWidth / c.offsetWidth);
    c.style.setProperty("--k", k);
    e.style.height = c.offsetHeight * k + "px";
  });
}
ajusterMaquettes();
window.addEventListener("resize", ajusterMaquettes);
document.fonts && document.fonts.ready.then(ajusterMaquettes);

/* Apparition douce de chaque maquette quand elle arrive à l'écran. */
if (!reduceMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js");
  const obs = new IntersectionObserver((entrees) => {
    entrees.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll(".reveler").forEach((el) => obs.observe(el));
}
