import classNames from 'classnames';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { useStickyHeader } from '../../hooks/useStickyHeader';

/**
 * Header Component
 *
 * Main header component with sticky behavior and frosted effect.
 * Includes logo, navigation, CTA button, and mobile menu toggle.
 *
 * **Validates: Requirements 1.4, 5.2, 5.4, 6.3**
 *
 * Features:
 * - Sticky header with frosted glass effect on scroll
 * - Mobile menu toggle with state management
 * - Dynamic className based on scroll state
 * - Entrance animations with data-appear attributes
 * - Integration with AppContext for global state
 *
 * @component
 * @example
 * ```tsx
 * <Header />
 * ```
 */
const Header = () => {
  const { state, actions } = useAppContext();
  const { isSticky } = useStickyHeader(100);

  // Toggle 'show-menu' class on body element when mobile menu state changes
  useEffect(() => {
    if (state.isMobileMenuOpen) {
      document.body.classList.add('show-menu');
    } else {
      document.body.classList.remove('show-menu');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('show-menu');
    };
  }, [state.isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    actions.toggleMobileMenu();
  };

  return (
    <header
      id="cs-header"
      className={classNames('is-frosted', {
        'is-sticky': isSticky,
      })}
      data-appear="fade-down"
      data-unload="fade-up"
    >
      {/* Desktop Header */}
      <div className="cs-header-inner">
        {/* Left Part - Logo */}
        <div className="cs-header-lp">
          <Link to="/" className="cs-logo">
            <img src="/assets/img/logo-comustock.svg" alt="ComuStock" width="140" height="27" />
          </Link>
        </div>

        {/* Middle Part - Navigation */}
        <div className="cs-header-mp">
          <nav className="cs-nav" aria-label="Navegación principal">
            <ul className="main-menu" data-stagger-appear="fade-down" data-stagger-delay="75">
              {/* Ecosistema Menu */}
              <li>
                <a className="off mob-no">Ecosistema</a>
                <Link to="/brands/personal" className="mob-ok">
                  Ecosistema
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/brands/personal">Personal</Link>
                  </li>
                  <li className="cs-menu-divider"></li>
                  <li className="product">
                    <Link to="/brands/movil">Móvil</Link>
                  </li>
                  <li className="product">
                    <Link to="/brands/fibra">Fibra</Link>
                  </li>
                  <li className="product">
                    <Link to="/brands/flow">Flow</Link>
                  </li>
                  <li className="product">
                    <Link to="/brands/pay">Pay</Link>
                  </li>
                  <li className="product">
                    <Link to="/brands/tienda">Tienda</Link>
                  </li>
                  <li className="product">
                    <Link to="/brands/smarthome">Smarthome</Link>
                  </li>
                  <li className="product">
                    <Link to="/brands/tech">Tech</Link>
                  </li>
                </ul>
              </li>

              {/* Templates Menu */}
              <li>
                <Link to="/sections/templates" className="mob-no">
                  Templates
                </Link>
                <a href="#" className="mob-ok">
                  Templates
                </a>
                <ul className="sub-menu">
                  <li>
                    <Link to="/sections/templates#presentaciones">Presentaciones</Link>
                  </li>
                  <li>
                    <Link to="/sections/templates#e-mails">E-mails</Link>
                  </li>
                  <li>
                    <Link to="/sections/templates#viva-engage">Viva Engage</Link>
                  </li>
                  <li>
                    <Link to="/sections/templates#hojas-membretadas">Hojas membretadas</Link>
                  </li>
                  <li className="cs-menu-divider"></li>
                  <li>
                    <Link to="/mi-firma">Tu firma de e-mail</Link>
                  </li>
                </ul>
              </li>

              {/* Audiovisuales Menu */}
              <li>
                <Link to="/sections/audiovisuales" className="mob-no">
                  Audiovisuales
                </Link>
                <a href="#" className="mob-ok">
                  Audiovisuales
                </a>
                <ul className="sub-menu">
                  <li>
                    <Link to="/sections/audiovisuales#publicidad">Publicidad</Link>
                  </li>
                  <li>
                    <Link to="/sections/audiovisuales#imagenes">Imágenes</Link>
                  </li>
                  <li>
                    <Link to="/sections/audiovisuales#cartelera-interna">Cartelera interna</Link>
                  </li>
                </ul>
              </li>

              {/* Recursos Menu */}
              <li>
                <Link to="/sections/recursos" className="mob-no">
                  Recursos
                </Link>
                <a href="#" className="mob-ok">
                  Recursos
                </a>
                <ul className="sub-menu">
                  <li>
                    <Link to="/sections/recursos#fuentes">Fuentes</Link>
                  </li>
                  <li>
                    <Link to="/sections/recursos#iconos">Íconos</Link>
                  </li>
                  <li>
                    <Link to="/sections/recursos/elementos">Elementos</Link>
                  </li>
                </ul>
              </li>

              {/* Toolkits Menu */}
              <li>
                <Link to="/sections/toolkits" className="mob-no">
                  Toolkits
                </Link>
                <a href="#" className="mob-ok">
                  Toolkits
                </a>
                <ul className="sub-menu">
                  <li>
                    <Link to="/sections/toolkits/disenar">Cómo diseñar</Link>
                  </li>
                  <li>
                    <Link to="/sections/toolkits/redactar">Cómo redactar</Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Part - CTA Button */}
        <div className="cs-header-rp">
          <a href="#HacemosLaComuFacil" className="cs-button">
            #HacemosLaComuFácil
          </a>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="cs-mobile-header-inner">
        <Link to="/" className="cs-logo">
          <img src="/assets/img/logo-comustock.svg" alt="ComuStock" width="140" height="27" />
        </Link>
        <button
          className="cs-mobile-menu-toggler"
          onClick={handleMobileMenuToggle}
          aria-label="Toggle mobile menu"
          aria-expanded={state.isMobileMenuOpen}
        >
          <i className="cs-menu-toggler-icon">
            <span></span>
            <span></span>
            <span></span>
          </i>
        </button>
      </div>
    </header>
  );
};

export default Header;
