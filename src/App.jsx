import Hero from './components/Hero.jsx';
import Comparatif from './components/Comparatif.jsx';
import Process from './components/Process.jsx';
import Packs from './components/Packs.jsx';
import Faq from './components/Faq.jsx';
import BandeauFinal from './components/BandeauFinal.jsx';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <header className="site-header">
        <span className="site-header__mark">DG Système</span>
        <a className="btn btn--accent btn--sm" href="#reserver">
          Réserver un appel
        </a>
      </header>

      <main id="contenu">
        <Hero />
        <Comparatif />
        <Process />
        <Packs />
        <Faq />
        <BandeauFinal />
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} DG Système</span>
        <span>Votre compte, vos données, du premier jour à toujours.</span>
      </footer>
    </>
  );
}
