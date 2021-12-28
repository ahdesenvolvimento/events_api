import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Event.module.css";
import Card from "../layout/Card";
import Button from "../layout/Button";
import MyModal from "../layout/MyModal";
export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [statusEvent, setStatusEvent] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (message) => {
    setMessage(message);
    setShow(true);
  };
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8000/events/" + id, init)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data[0]);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:8000/events/data/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.owner == true ? setStatusEvent(true) : setStatusEvent(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const joinEvent = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        id: id,
        status: false,
      }),
    };
    fetch("http://localhost:8000/events/join/", init)
      .then((response) => response.json())
      .then((data) => {
        data = (setStatusEvent(true), handleShow(data.message))
          ? handleShow(data.message)
          : "";
      })
      .catch((error) => console.log(error));
  };
  const content = (
    <>
      <h5>Informações sobre o evento:</h5>
      <p>{event.description}</p>
      <p>
        O evento ocorrerá no seguinte endereço{" "}
        <strong>
          {event.logradouro}, número {event.numero}, bairro {event.bairro} -{" "}
          {event.localidade}/{event.uf} - {event.cep}{" "}
        </strong>
        no dia {event.date_start} começando as {event.start_time} e terminando
        as {event.finish_time} do dia {event.date_finish}
      </p>
      <p>{event.total} participantes</p>
      {localStorage.getItem("access-token") ? (
        !statusEvent ? (
          <Link to="/" onClick={joinEvent} className="btn btn-secondary">
            Confirmar presença
          </Link>
        ) : (
          <Button
            type="button"
            className="btn btn-secondary"
            text="Confirmar presença"
            disabled={true}
          />
        )
      ) : (
        <Link to="/login" className="btn btn-secondary">Você precisa fazer o login</Link>
      )}
    </>
  );
  return (
    <div className={styles.content}>
      <Card content={content} title={event.title} />
      <MyModal show={show} handleClose={handleClose} message={message} />
    </div>
  );
}
