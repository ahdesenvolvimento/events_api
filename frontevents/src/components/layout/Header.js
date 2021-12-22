import { Link } from "react-router-dom";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles.navbarCustom}>
      <div className="container">
        <nav className={styles.navbarCustom + " navbar navbar-expand-lg navbar-light"}>
          <button
            className={styles.btnCustom + " navbar-toggler btn"}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapseNavbar"
          >
            <ul className="navbar-nav">
              <li>
                <Link to="/">Início</Link>
              </li>
              <li>
                <Link to="/newevent">Criar Evento</Link>
              </li>
              <li>
                <Link to="/events">Listar Eventos</Link>
              </li>
              <li>
                <Link to="/">Entrar</Link>
              </li>
              <li>
                <Link to="/">Sair</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
