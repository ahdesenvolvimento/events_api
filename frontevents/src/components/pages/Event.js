import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Event.module.css";
import Card from "../layout/Card";
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
        O evento começará as {event.start_time} com término as{" "}
        {event.finish_time} do dia X
      </p>
      <p>{event.total} participantes</p>
      {!statusEvent && (
        <Link to="/" onClick={joinEvent}>
          Confirmar presença
        </Link>
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
