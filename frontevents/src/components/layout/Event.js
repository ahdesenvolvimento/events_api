import { Link } from "react-router-dom";
import styles from "./Event.module.css";
import Card from "../layout/Card";
import { useState, useEffect } from "react"
import MyEventsAuth from "./MyEventsAuth";
export default function Event({ data, status }) {
  // console.log(data)
  // const [dados, setDados] = useState([data]);

  // const controleDados = (e) =>{
  //   setDados(dados);
  //   data={};
  //   console.log(dados)
  // }
  // useEffect(() => {
  //   console.log(dados.length)
  //   dados.length !== 0 ? controleDados() : setDados(data);
  // });
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
        // setDados(d);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      {status == 1 ? (
        <>
          {data.length == 0 && <p className={styles.noEvents}>Sem eventos disponíveis</p>}
          {data.map((event) => (
            <div className="col-md-4 mt-3" key={event.id}>
              <Card title={event.title} styles={styles.minHeight} footer={<><Link to={"/event/" + event.id} className={styles.linkCustom}>
                Saber mais
              </Link></>} content={<><p className={styles.description}>{event.description}</p></>} />
            </div>
          ))}
        </>
      ) : (
        <>
          <MyEventsAuth data={data} deleteEvent={deleteEvent} styles={styles} />
        </>
      )}
    </>
  );
}
