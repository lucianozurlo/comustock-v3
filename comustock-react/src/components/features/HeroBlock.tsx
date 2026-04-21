import { useEffect, useRef, useState } from 'react';
import { EcosistemaSection } from './EcosistemaSection';

/**
 * HeroBlock Component
 *
 * Hero section with video background. Includes the Ecosistema brand buttons
 * inside #intro, matching the original HTML structure.
 *
 * **Validates: Requirements 1.1, 1.4, 3.2, 5.1, 8.2**
 */
export const HeroBlock: React.FC = () => {
  const videoDesktopRef = useRef<HTMLVideoElement>(null);
  const videoMobileRef = useRef<HTMLVideoElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      rootMargin: '200px 0px',
      threshold: 0.01,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShouldLoadVideos(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (heroMediaRef.current) {
      observer.observe(heroMediaRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (shouldLoadVideos) {
      videoDesktopRef.current?.play().catch(() => {});
      videoMobileRef.current?.play().catch(() => {});
    }
  }, [shouldLoadVideos]);

  return (
    <section id="intro" className="backlight-bottom">
      <div className="cs-hero-block cs-hero-type03">
        <div className="cs-hero-media-wrap cs-masked-block">
          <div
            ref={heroMediaRef}
            className="cs-hero-media cs-masked-media"
            data-appear="fade-right"
            data-unload="fade-left"
            data-delay="150"
            data-threshold="0"
          >
            {/* Desktop video — links to Personal brand */}
            <a href="/brands/personal" className="mob-no">
              <video
                ref={videoDesktopRef}
                src={shouldLoadVideos ? '/assets/img/home/home.mp4' : undefined}
                playsInline
                muted
                loop
                autoPlay
                preload="auto"
                poster="/assets/img/home/home-poster.jpg"
              />
            </a>

            {/* Mobile video */}
            <video
              ref={videoMobileRef}
              src={shouldLoadVideos ? '/assets/img/home/home-mobile.mp4' : undefined}
              playsInline
              muted
              loop
              autoPlay
              preload="auto"
              className="mob-ok"
              poster="/assets/img/home/home-mobile-poster.jpg"
            />
          </div>
        </div>
      </div>

      {/* Ecosistema brand buttons — inside #intro as in the original HTML */}
      <EcosistemaSection />
    </section>
  );
};
