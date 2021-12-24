import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Event.module.css";
export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
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
      }),
    };

    fetch("http://localhost:8000/events/join/", init)
      .then((response) => response.json())
      .then((data) => {
        data = data.message ? alert(data.message) : ''
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={styles.content}>
      <div className="card">
        <h5 className="card-header"> {event.title} </h5>
        <div className="card-body">
          <h5>Informações sobre o evento:</h5>
          <p>{event.description}</p>
          <p>O evento começará as {event.start_time} com término as {event.finish_time} do dia X</p>
          <p>{event.total} participantes</p>
          <Link to="/" onClick={joinEvent}>
            Confirmar presença
          </Link>
        </div>
      </div>
    </div>
  );
}
