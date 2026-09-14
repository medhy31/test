import { useState } from 'react';

const QUESTIONS = [
  {
    q: 'Est-ce que vous hébergez mon compte GoHighLevel ?',
    a: "Non. Votre compte vous appartient entièrement, du premier jour à toujours. DG Système construit votre système, mais ne gère jamais vos données clients à votre place. C'est un choix, pas une limite.",
  },
  {
    q: 'Combien de temps pour la mise en place ?',
    a: "Chaque pack a un rythme différent : plus léger pour le Pack Communication, plus profond pour le Pack Marketing. Le délai précis pour votre cas se donne pendant l'appel de cadrage, une fois votre complexité réelle connue.",
  },
  {
    q: 'Quelle est la différence entre les 3 packs ?',
    a: "Chaque pack inclut le précédent. Vous montez de niveau quand votre business en a besoin, pas parce qu'un abonnement vous y pousse.",
  },
  {
    q: "Je n'ai jamais utilisé GoHighLevel, est-ce un problème ?",
    a: "Non, c'est justement pour ça que vous prenez un pack DFY plutôt que de vous former seul.",
  },
  {
    q: 'Je peux commencer petit et monter en gamme plus tard ?',
    a: "Oui, c'est la logique même de la structure en 3 packs.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq">
      <div className="section-inner">
        <h2 className="section-title">Questions fréquentes</h2>

        <div className="faq-list">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div className="faq-item" key={item.q} data-open={isOpen}>
                <h3>
                  <button
                    type="button"
                    className="faq-item__q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {item.q}
                    <span className="faq-item__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div className="faq-item__a" id={panelId} role="region">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
