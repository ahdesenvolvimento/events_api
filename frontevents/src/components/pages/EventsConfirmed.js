import { useEffect, useState } from "react";
import Event from "../layout/Event";
import Card from "../layout/Card";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEdit, faShareSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from "./EventsConfirmed.module.css";
import { Link } from "react-router-dom";
export default function EventsConfirmed() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/events/confirmed/", init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const removePresence = (e) => {
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify({ "id": e })
    };
    fetch("http://localhost:8000/events/signout/" + e, init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }
  const content = (

    events.length == 0 ? <p className={styles.noEvents}>Você não tem nenhum evento cadastrado, clique <Link to="/newevent">aqui</Link> para criar um novo evento</p> : (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>
                Título
              </th>
              <th>
                Descrição
              </th>
              <th>
                Início
              </th>
              <th>
                Fim
              </th>
              <th>Cidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id_event.id}>
                <td>{event.id_event.title}</td>
                <td className={styles.descriptionTable}>
                  {event.id_event.description}
                </td>
                <td>{event.id_event.start_time}</td>
                <td>{event.id_event.finish_time}</td>
                <td>{event.id_event.city}</td>
                <td>
                  <button type="button" className="btn btn-secondary" onClick={(e) => removePresence(event.id_event.id)} title="Remover presença ">
                    <FontAwesomeIcon icon={faShareSquare} /> Remover presença
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )

  )
  return (
    <div className="row">
      <Card content={content} />

    </div>
  );
}
