export default function BandeauFinal() {
  return (
    <section id="reserver" className="bandeau">
      <div className="bandeau__inner">
        <div className="bandeau__text">
          <h2 className="bandeau__title">Pas sûr par où commencer ?</h2>
          <p className="bandeau__sub">
            La plupart des clients démarrent par le Pack Communication et montent quand le
            système montre déjà des résultats. Aucune pression, juste une conversation sur où
            vous en êtes.
          </p>
        </div>
        {/* TODO : brancher le vrai lien de prise de rendez-vous. */}
        <a className="btn btn--accent" href="#reserver">
          Réserver un appel stratégique
        </a>
      </div>
    </section>
  );
}
