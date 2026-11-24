import { Link } from 'react-router-dom';
import './Informations.css';

const isExternal = (link) => /^(https?:|mailto:|tel:)/.test(link);

/**
 * Bloco de informações do rodapé.
 * @param {{ title: string, informations: { text: string, link: string }[] }} props
 */
const Informations = ({ title, informations = [] }) => {
  return (
    <div className="informations">
      <h3 className="informations__title">{title}</h3>
      <ul className="informations__list">
        {informations.map(({ text, link }) => (
          <li key={`${text}-${link}`}>
            {isExternal(link) ? <a href={link}>{text}</a> : <Link to={link}>{text}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Informations;
