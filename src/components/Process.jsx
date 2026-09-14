const ETAPES = [
  {
    titre: 'Appel de cadrage',
    texte:
      "On identifie votre besoin réel, le pack qui correspond, et le délai de livraison précis pour votre cas.",
  },
  {
    titre: 'Construction du système',
    texte: 'On bâtit votre espace de pilotage.',
  },
  {
    titre: 'Test et validation ensemble',
    texte: "Rien n'est livré sans que vous ayez vu et validé.",
  },
  {
    titre: 'Formation et transfert complet',
    texte:
      'Le compte est à vous, les accès sont à vous, aucune dépendance à DG Système pour faire tourner votre système.',
  },
  {
    titre: 'Accompagnement de lancement',
    texte: "Pour ajuster ce qui doit l'être.",
  },
];

export default function Process() {
  return (
    <section id="process">
      <div className="section-inner">
        <h2 className="section-title">Comment ça se passe concrètement</h2>

        <ol className="process-list">
          {ETAPES.map((etape, i) => (
            <li key={etape.titre}>
              <span className="process-list__n">{String(i + 1).padStart(2, '0')}</span>
              <div className="process-list__body">
                <strong>{etape.titre}</strong>
                <p>{etape.texte}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="closing-line">
          Vous n'êtes locataire de rien. Le système que vous obtenez est le vôtre.
        </p>
      </div>
    </section>
  );
}
