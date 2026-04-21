import { useEffect, useState } from 'react';

interface HtmlPageProps {
  /** Path to the original HTML file, e.g. '/sections/templates.html' */
  htmlPath: string;
  /** body id to set for CSS selectors, e.g. 'main-templates' */
  bodyId: string;
  /** Optional extra body classes */
  bodyClass?: string;
}

/**
 * HtmlPage Component
 *
 * Generic component that fetches an original static HTML file,
 * extracts the main content (inside #cs-main > .stg-container),
 * and renders it — preserving 100% visual fidelity with the original.
 *
 * The React Header, Footer and Layout are kept; only the page body
 * content is replaced with the original HTML.
 */
const HtmlPage = ({ htmlPath, bodyId, bodyClass }: HtmlPageProps) => {
  const [html, setHtml] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set body id/class to match original page
    const prevId = document.body.id;
    const prevClass = document.body.className;
    document.body.id = bodyId;
    if (bodyClass) document.body.classList.add(bodyClass);

    fetch(htmlPath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${htmlPath}`);
        return res.text();
      })
      .then((rawHtml) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        // Extract content inside #cs-main > .stg-container
        // (the footer inside the original HTML is replaced by our React Footer)
        const container = doc.querySelector('#cs-main .stg-container');
        if (container) {
          // Remove the original footer from the extracted content
          container.querySelector('footer')?.remove();
          container.querySelector('.cs-footer-widgets')?.remove();
          container.querySelector('.cs-footer-line')?.remove();

          let content = container.innerHTML;

          // Fix relative asset paths
          content = content
            .replace(/\.\.\//g, '/') // ../assets/ → /assets/
            .replace(/src="\.\//g, 'src="/') // ./assets/ → /assets/
            .replace(/href="\.\//g, 'href="/'); // ./sections/ → /sections/

          // Fix internal navigation links to use React Router paths
          content = content
            .replace(/href="\/brands\/([^"]+)\.html"/g, 'href="/brands/$1"')
            .replace(/href="\/sections\/([^"]+)\.html"/g, 'href="/sections/$1"')
            .replace(/href="\/sections\/toolkits\/([^"]+)\.html"/g, 'href="/sections/toolkits/$1"')
            .replace(/href="\/sections\/recursos\/([^"]+)\.html"/g, 'href="/sections/recursos/$1"')
            .replace(/href="\/mi-firma\/mi-firma\.html"/g, 'href="/mi-firma"')
            .replace(/href="\/index\.html"/g, 'href="/"');

          setHtml(content);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    return () => {
      document.body.id = prevId;
      if (bodyClass) document.body.classList.remove(bodyClass);
      document.body.className = prevClass;
    };
  }, [htmlPath, bodyId, bodyClass]);

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

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlPage;
