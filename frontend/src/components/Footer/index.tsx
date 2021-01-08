import './styles.css';
import { ReactComponent as YouTubeIcon } from '../../assets/youtube.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/linkedin.svg';
import { ReactComponent as InstagramIcon } from '../../assets/instagram.svg';

function Footer() {
  return (
    <footer className="main-footer">
      App desenvolvido durante a 2a ed. do evento Semana DevSuperior
      <div className="footer-icons">
        <a
          href="https://www.youtube.com/c/DevSuperior"
          target="_blank"
          rel="noopener noreferrer"
        >
          <YouTubeIcon />
        </a>
        <a
          href="https://www.linkedin.com/school/devsuperior"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinIcon />
        </a>
        <a
          href="https://www.instagram.com/devsuperior.ig"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
