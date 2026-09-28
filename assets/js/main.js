/* Lien de réservation : à remplacer par l'agenda une fois intégré. */
const LIEN_RESERVATION = "#reserver";

document.querySelectorAll("[data-cta]").forEach((a) => {
  a.setAttribute("href", LIEN_RESERVATION);
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add(reduceMotion ? "no-motion" : "motion");
