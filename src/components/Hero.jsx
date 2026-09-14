import { useRef } from 'react';
import GlassCore from '../three/GlassCore.jsx';

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__grid">
        <div className="hero__content">
          <h1 className="hero__title">
            Un système qui travaille pendant que vous êtes ailleurs.
          </h1>
          <p className="hero__lede">
            La plupart des entrepreneurs utilisent leurs outils comme ils utilisent Word, à
            10 % de leurs capacités. DG Système ne vous vend pas des fonctionnalités.
          </p>
          <div className="hero__actions">
            {/* TODO : brancher le vrai lien de prise de rendez-vous (Calendly / espace de pilotage). */}
            <a className="btn btn--accent" href="#reserver">
              Réserver un appel stratégique
            </a>
          </div>
        </div>
        <div className="hero__stage">
          <GlassCore heroRef={heroRef} />
        </div>
      </div>
    </section>
  );
}
