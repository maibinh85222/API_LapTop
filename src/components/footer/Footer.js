import "../../styles/footer.css"
import { FooterLink } from "../../data/footer";
import { Link } from "react-router-dom";
import logoshop from "../../assets/logoshop.svg"

const Footer = () => {

    const {categoryLinks, accountLinks, helpLinks, socialLinks} = FooterLink;

  return (
    <footer className="basic-bg flex-row wrap items-start">
      <div className="footer-item footer-links">
        <h6 className="text-uppercase underline">Danh mục</h6>
        <ul className="links">
          {categoryLinks.map(({ id, linkName, url }) => (
            <li key={id}>
              <div className="link">
                {linkName}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-item footer-links">
        <h6 className="text-uppercase underline">Account</h6>
        <ul className="links">
          {accountLinks.map(({ id, linkName, url }) => (
            <li key={id}>
              <Link className="link" to={url}>
                {linkName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer-item footer-links">
        <h6 className="text-uppercase underline">Help</h6>
        <ul className="links">
          {helpLinks.map(({ id, linkName, url }) => (
            <li key={id}>
              <Link className="link" to={url}>
                {linkName}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-column items-center footer-logo">
        <Link to="/" className="navbar-logo no-underline">
          <img className="logo-img" src={logoshop} alt="dazzle" />
          <span className="primary-text">Bamboo</span>
          <span className="secondary-text">Shop</span>
        </Link>
        <small className="m-0 mt-1">© 2023, Bản quyền cấm sao chép</small>
        <small>
          Thiết kế bởi <i className="fas fa-heart"></i> by Aluxury
        </small>
        <div className="mt-1">
          {socialLinks.map(({ id, linkName, url }) => (
            <a
              key={id}
              href={url}
              className="link m-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkName}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
