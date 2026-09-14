import { GridVisual, NetworkVisual, PointVisual } from './PackVisuals.jsx';

const PACKS = [
  {
    id: 'communication',
    eyebrow: '1. Être vu',
    titre: 'Pack Communication',
    prix: '497 € au lieu de 997 € (lancement) + 97 €/mois',
    probleme:
      "Aujourd'hui, votre présence s'arrête quand vous fermez l'ordinateur. Un prospect qui vous contacte un dimanche soir attend le lundi, ou va voir ailleurs.",
    inclus: [
      'Un agenda qui prend vos rendez-vous à votre place, 24h/24',
      'Une page de capture qui transforme un visiteur en contact identifié',
      'Votre image (LinkedIn, Google) alignée et cohérente',
      "Un espace de pilotage de base pour suivre qui vous a contacté et où ça en est",
    ],
    change:
      "Un humain travaille 8h par jour. Avec ce pack, votre présence commerciale travaille 24h/24. Vous n'ajoutez pas d'heures à votre journée, vous les multipliez.",
    note:
      "Ce montant remplace ce que vous payez probablement déjà, éparpillé : Calendly, hébergement web, CRM / email marketing, outil de gestion des avis clients. Total remplacé : plus de 250 €/mois.",
    cta: 'Je lance ma visibilité',
    Visual: PointVisual,
  },
  {
    id: 'commercial',
    eyebrow: '2. Gérer et optimiser ma gestion commerciale',
    titre: 'Pack Commercial',
    prix: 'À partir de ~3 000 €',
    probleme:
      "Être visible, c'est bien. Mais si personne ne relance vos prospects, ni ne suit où en est chaque client, vous perdez en coulisses ce que vous gagnez en façade.",
    inclus: [
      'Un pipeline commercial réglé finement : chaque contact sait où il en est, vous aussi',
      "Des séquences d'onboarding automatiques : le client se sent pris en charge dès le premier jour, sans que vous y passiez une heure",
      'Un automatisme de gestion de la relation client qui tourne en fond, en continu',
    ],
    change:
      "Votre savoir-faire et vos process ne restent plus dans votre tête ou dans des notes éparpillées, ils deviennent un patrimoine d'entreprise structuré. Votre back-office devient un moteur, pas une pile de tâches en attente.",
    cta: 'Je structure ma gestion commerciale',
    Visual: GridVisual,
  },
  {
    id: 'marketing',
    eyebrow: '3. Automatiser et booster mon acquisition client',
    titre: 'Pack Marketing',
    prix: '7 000 € et plus',
    probleme:
      "Vous voulez arrêter de dépendre du bouche à oreille et du hasard. Vous voulez une machine commerciale qui va chercher les clients, pas l'inverse.",
    inclus: [
      'Des tunnels de vente complets, pensés pour convertir sans votre présence en direct',
      "Une stratégie d'acquisition à froid sur LinkedIn",
      'Un copywriting stratégique haute performance sur chaque point de contact',
    ],
    change:
      "Vous ne travaillez plus seul face à votre marché. L'IA et vos systèmes tirent la charge d'acquisition à votre place. Vous pilotez, vous ne poussez plus la machine.",
    cta: "J'automatise mon acquisition",
    Visual: NetworkVisual,
  },
];

export default function Packs() {
  return (
    <section id="packs" className="packs" aria-label="Les 3 packs DG Système">
      <div className="packs__intro">
        <h2 className="section-title">Les 3 packs</h2>
        <p className="section-lede">
          Trois niveaux. Chacun inclut le précédent. Vous montez au rythme de votre business,
          pas au rythme d'un logiciel.
        </p>
      </div>

      {PACKS.map(({ Visual, ...pack }) => (
        <article className="pack" key={pack.id} id={pack.id}>
          <div className="pack__inner">
            <div className="pack__text">
              <p className="pack__eyebrow">{pack.eyebrow}</p>
              <h3 className="pack__title">{pack.titre}</h3>
              <p className="pack__price">{pack.prix}</p>
              <p className="pack__problem">{pack.probleme}</p>

              <p className="pack__list-label">Ce qui est inclus</p>
              <ul className="pack__list">
                {pack.inclus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p className="pack__change-label">Ce que ça change concrètement</p>
              <p className="pack__change">{pack.change}</p>

              {pack.note && (
                <div className="pack__note">
                  <p>{pack.note}</p>
                </div>
              )}

              <div className="pack__actions">
                <a className="btn btn--ghost btn--sm" href="#reserver">
                  {pack.cta}
                </a>
              </div>
            </div>
            <div className="pack__visual" aria-hidden="true">
              <Visual />
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
