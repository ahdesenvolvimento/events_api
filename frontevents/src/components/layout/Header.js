import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
export default function Header({ token }) {
  let navigate = useNavigate();
  const logout = (e) => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("refresh-token"),
      }),
    };
    fetch("http://localhost:8000/logout/", init)
      .then((response) => {
        localStorage.removeItem("access-token");
        localStorage.removeItem("refresh-token");
        navigate('/');
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.navbarCustom}>
      <div className="container">
        <nav
          className={
            styles.navbarCustom + " navbar navbar-expand-lg navbar-light"
          }
        >
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
              {token ? (<><li>
                <Link to="/newevent">Criar Evento</Link>
              </li><li>
                  <Link to="/events">Meus Eventos</Link>
                </li><li>
                  <Link to="/events/confirmed">Minhas Presenças</Link>
                </li>
                <li>
                  <Link to="/" onClick={logout}>
                    Sair
                  </Link>
                </li></>) : (
                <><li>
                  <Link to="/login">Entrar</Link>
                </li><li>
                    <Link to="/register">Cadastrar</Link>
                  </li></>)}




            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
