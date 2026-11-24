import { Link } from 'react-router-dom';
import './Section.css';

const isInternal = (href = '') => href.startsWith('/');

/**
 * Seção padrão com título (left|center), link opcional à direita e conteúdo filho.
 * @param {{ title: string, titleAlign?: 'left' | 'center', link?: { text: string, href: string }, children: React.ReactNode, className?: string }} props
 */
const Section = ({ title, titleAlign = 'left', link, children, className = '' }) => {
  const align = titleAlign === 'center' ? 'center' : 'left';

  return (
    <section className={`section ${className}`.trim()}>
      {(title || link) && (
        <div className={`section__header section__header--${align}`}>
          {title && <h2 className="section__title">{title}</h2>}
          {link &&
            (isInternal(link.href) ? (
              <Link to={link.href} className="section__link">
                {link.text} <span aria-hidden="true">→</span>
              </Link>
            ) : (
              <a href={link.href} className="section__link">
                {link.text} <span aria-hidden="true">→</span>
              </a>
            ))}
        </div>
      )}
      <div className="section__content">{children}</div>
    </section>
  );
};

export default Section;
