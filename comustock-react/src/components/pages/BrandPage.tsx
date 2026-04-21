import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBrandStyles } from '../../hooks/useBrandStyles';
import NotFoundPage from './NotFoundPage';

const VALID_BRANDS = ['personal', 'movil', 'fibra', 'flow', 'pay', 'tienda', 'smarthome', 'tech'];

const fixPaths = (html: string): string =>
  html
    .replace(/\.\.\//g, '/')
    .replace(/src="\.\//g, 'src="/')
    .replace(/href="\.\//g, 'href="/')
    .replace(/href="\/brands\/([^"]+)\.html"/g, 'href="/brands/$1"')
    .replace(/href="\/sections\/([^"]+)\.html"/g, 'href="/sections/$1"')
    .replace(/href="\/index\.html"/g, 'href="/"')
    .replace(/href="javascript:;"/g, 'href="#"');

/**
 * BrandPage Component
 *
 * Fetches the original brand HTML, extracts:
 * - #banner (brand header image, outside stg-container)
 * - .brands-container (main brand content)
 * and renders them with the React header/footer preserved.
 */
const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  const [bannerHtml, setBannerHtml] = useState('');
  const [mainHtml, setMainHtml] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useBrandStyles(brandName ?? '');

  useEffect(() => {
    if (!brandName || !VALID_BRANDS.includes(brandName)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const prevId = document.body.id;
    const prevClass = document.body.className;
    document.body.id = brandName;
    document.body.classList.add('brands');

    fetch(`/brands/${brandName}.html`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.text();
      })
      .then((rawHtml) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        // Extract #banner (outside main in original)
        const banner = doc.getElementById('banner');
        if (banner) {
          setBannerHtml(fixPaths(banner.outerHTML));
        }

        // Extract main content — remove footer from it
        const container = doc.querySelector('#cs-main .stg-container');
        if (container) {
          container.querySelector('footer')?.remove();
          container.querySelector('.cs-footer-widgets')?.remove();
          container.querySelector('.cs-footer-line')?.remove();
          setMainHtml(fixPaths(container.innerHTML));
        }

        setLoading(false);
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });

    return () => {
      document.body.id = prevId;
      document.body.className = prevClass;
    };
  }, [brandName]);

  if (loading) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            width: 36,
            height: 36,
            border: '3px solid #eee',
            borderTopColor: 'var(--cs-s-accent, #aa3bff)',
            borderRadius: '50%',
            animation: 'cs-spin 0.8s linear infinite',
          }}
        />
      </div>
    );
  }

  if (notFound) return <NotFoundPage />;

  return (
    <>
      {bannerHtml && <div dangerouslySetInnerHTML={{ __html: bannerHtml }} />}
      <div className="stg-container">
        <div className="brands-container">
          <div className="brands-content" dangerouslySetInnerHTML={{ __html: mainHtml }} />
        </div>
      </div>
    </>
  );
};

export default BrandPage;
