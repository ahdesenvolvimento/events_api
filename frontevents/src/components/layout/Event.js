import { Link } from "react-router-dom";
import styles from "./Event.module.css";
import Card from "../layout/Card";
import { useState, useEffect } from "react"
import MyEventsAuth from "./MyEventsAuth";
import {useNavigate} from "react-router-dom";
export default function Event({ data, status }) {
  let navigate = useNavigate();
  const [dados, setDados] = useState([]);
  useEffect(() => {
    dados.length !== 0 ? setDados(dados) : setDados(data);
  }, []);
  function deleteEvent(id) {
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token")
      },
    };
    fetch("http://localhost:8000/events/delete/" + id, init)
      .then((response) => response.json())
      .then((d) => {
        setDados(d);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      {status == 1 ? (
        <>
          {dados.length == 0 && <p className={styles.noEvents}>Sem eventos disponíveis</p>}
          {dados.map((event) => (
            <div className="col-md-4 mt-3" key={event.id}>
              <Card title={event.title} styles={styles.minHeight} footer={<><Link to={"/event/" + event.id} className={styles.linkCustom}>
                Saber mais
              </Link></>} content={<><p className={styles.description}>{event.description}</p></>} />
            </div>
          ))}
        </>
      ) : (
        <>
          <MyEventsAuth data={dados} deleteEvent={deleteEvent} styles={styles} />
        </>
      )}
    </>
  );
}
