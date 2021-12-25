// import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import styles from "./Event.module.css";

import MyEventsAuth from "./MyEventsAuth";
export default function Event({ data, status}) {
  console.log(data.lenght);
  function deleteEvent(id) {
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8000/events/delete/" + id, init)
      .then()
      .catch((error) => console.log(error));
  }
  return (
    <>
      {status == 1 ? (
        <>
          {data.length == 0 && <p className={styles.noEvents}>Sem eventos disponíveis</p>}
          {data.map((event) => (
            <div className="col-md-4 mt-3" key={event.id}>
              <div className={styles.minHeight + " card " + styles.cardCustom}>
                <h5 className="card-header">{event.title}</h5>
                <div className="card-body">
                  <p className={styles.description}>{event.description}</p>
                </div>
                <div className="card-footer">
                  <Link to={"/event/" + event.id} className={styles.linkCustom}>
                    Saber mais
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <MyEventsAuth data={data} deleteEvent={deleteEvent} styles={styles}/>
        </>
      )}
    </>
  );
}
