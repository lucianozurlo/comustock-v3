import { useEffect } from 'react';
import {
  AudiovisualesSection,
  HeroBlock,
  RecursosSection,
  TemplatesSection,
  ToolkitsSection,
} from '../features';

/**
 * HomePage Component
 *
 * Wraps content in stg-container matching the original HTML structure:
 * <main id="cs-main">
 *   <div class="stg-container">
 *     <section id="intro">...</section>
 *     <section id="templates">...</section>
 *     ...
 *   </div>
 * </main>
 */
const HomePage = () => {
  useEffect(() => {
    document.body.id = 'home';
    document.body.classList.remove('brands');
    return () => {
      document.body.id = '';
    };
  }, []);

  return (
    <div className="stg-container">
      <HeroBlock />
      <TemplatesSection />
      <AudiovisualesSection />
      <RecursosSection />
      <ToolkitsSection />
    </div>
  );
};

export default HomePage;
