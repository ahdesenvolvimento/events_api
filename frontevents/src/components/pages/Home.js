import { useEffect, useState } from "react";
import Input from "../form/Input";
import Event from "../layout/Event";
import styles from "./Home.module.css";
export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
  return (
    <div>
      <form action="" method="GET" className={styles.form}>
        <Input
          type="search"
          name="search"
          placeholder="Busque por um evento"
          //   handleOnChange={handleChange}
        />
      </form>
      <h4>Eventos disponíveis</h4>
      <div className="row">
        <Event data={events} status="1"/>

      </div>
      Página HOME, será uma das últimas coisas a se finalizar{" "}
    </div>
  );
}
