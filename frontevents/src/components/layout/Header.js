import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../layout/Button";
import MyModal from "./MyModal";
export default function Header({ token, statusNav, setStatusNav }) {
  let navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (message) => {
    setShow(true);
    setMessage(message);
  };
  console.log(statusNav)
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
        setStatusNav(false);
        // window.location.reload(true)
        navigate("/");
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (token) {
      setStatusNav(true);
    // getNotifications();
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access-token"),
        },
      };
      fetch("http://localhost:8000/notifications/", init)
        .then((response) => response.json())
        .then((data) => {
          setNotifications(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const joinEvent = (e, id_not) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        id: id_not,
        status: true,
      }),
    };

    fetch("http://localhost:8000/events/join/", init)
      .then((response) => response.json())
      .then((data) => {
        data = data.message ? handleShow(data.message) : "";
      })
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
          <Button
            className={styles.btnCustom + " navbar-toggler btn"}
            type="button"
            dataToggle="collapse"
            dataTarget="#collapseNavbar"
            title="Navbar"
            text={<span className="navbar-toggler-icon"></span>}
          />
          <div
            className="collapse navbar-collapse justify-content-end"
            id="collapseNavbar"
          >
            <ul className="navbar-nav">
              <li>
                <Link to="/">Início</Link>
              </li>
              {statusNav ? (
                <>
                  <li>
                    <Link to="/newevent">Criar Evento</Link>
                  </li>
                  <li>
                    <Link to="/events">Meus Eventos</Link>
                  </li>
                  <li>
                    <Link to="/events/confirmed">Minhas Presenças</Link>
                  </li>
                  <li className="dropdown">
                    <a
                      href="/#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      Notificações{" "}
                      <span className="badge badge-dark">
                        {notifications.length}
                      </span>
                    </a>
                    <div className="dropdown-menu">
                      {notifications.length === 0 && (
                        <p>Sem notificações no momento.</p>
                      )}
                      {notifications.map((notification) => (
                        <a
                          href="/#"
                          className="dropdown-item"
                          style={{ color: "black", cursor: "pointer" }}
                          key={notification.id}
                          onClick={(e) =>
                            joinEvent(e, notification.id_event.id)
                          }
                        >
                          Você foi convidado para o evento:
                          <br />
                          {notification.id_event.title}
                        </a>
                      ))}
                    </div>
                  </li>
                  <li>
                    <Link to="/" onClick={logout}>
                      Sair
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Entrar</Link>
                  </li>
                  <li>
                    <Link to="/register">Cadastrar</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
      <MyModal
        show={show}
        handleClose={handleClose}
        message={message}
        title={"Sucesso!"}
      />
    </div>
  );
}
