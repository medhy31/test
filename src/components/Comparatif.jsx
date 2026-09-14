const LIGNES = [
  { outil: 'Calendly', cout: '20 €', dg: 'Inclus' },
  { outil: 'Hébergement web', cout: '30 €', dg: 'Inclus' },
  { outil: 'CRM / email marketing', cout: '150 €', dg: 'Inclus' },
  { outil: 'Outil de gestion des avis clients', cout: '50 €', dg: 'Inclus' },
];

export default function Comparatif() {
  return (
    <section id="comparatif" className="comparatif">
      <div className="section-inner">
        <h2 className="section-title">Une pile d'outils en moins, un système en plus</h2>

        <table>
          <caption className="visually-hidden">
            Comparatif entre les outils payés séparément et le système DG Système
          </caption>
          <thead>
            <tr>
              <th scope="col">Ce que vous payez aujourd'hui, éparpillé</th>
              <th scope="col">Coût estimé</th>
              <th scope="col">Avec DG Système</th>
            </tr>
          </thead>
          <tbody>
            {LIGNES.map((ligne) => (
              <tr key={ligne.outil}>
                <td>{ligne.outil}</td>
                <td>{ligne.cout}</td>
                <td>{ligne.dg}</td>
              </tr>
            ))}
            <tr className="comparatif__total">
              <td>Total</td>
              <td>250 €+/mois</td>
              <td>97 €/mois</td>
            </tr>
          </tbody>
        </table>

        <p className="closing-line">
          Vous ne payez pas un outil de plus, vous arrêtez d'en payer quatre.
        </p>
      </div>
    </section>
  );
}
