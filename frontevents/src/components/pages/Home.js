import { useEffect, useState } from "react";
import Input from "../form/Input";
import Event from "../layout/Event";
import styles from "./Home.module.css";
import backGroundImage from "../../img/image.jpg";
export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState();
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/events/", init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchEvent = (e) => {
    e.preventDefault()
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/?search=" + search, init)
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className="row">
        <form
          action=""
          method="GET"
          onSubmit={searchEvent}
          className={styles.form}
        >
          <Input
            type="search"
            name="search"
            placeholder="Busque por um evento"
            handleOnChange={(e) => setSearch(e.target.value)}
            // handleOnChange={handleChange}
          />
        </form>
      </div>
      <div className={styles.content + " row"}>
        <h4>Todos os eventos disponíveis</h4>

        <Event data={events} status="1" />
      </div>
    </>
  );
}
