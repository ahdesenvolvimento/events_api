import { useEffect, useState } from "react";
import Input from "../form/Input";
import Event from "../layout/Event";
import styles from "./Home.module.css";
import Form from "../form/Form";
export default function Home() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState();
  const [busca, setBusca] = useState(false);
  
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/", init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const searchEvent = (e) => {
    e.preventDefault();
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
    };
    fetch("http://localhost:8000/?search=" + search, init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvents(data);
        search === "" ? setBusca(false) : setBusca(true);
      })
      .catch((error) => console.log(error));
  };
  const content = (
    <>
      <Input
        type="search"
        name="search"
        placeholder="Busque por um evento"
        handleOnChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
  return (
    <>
      <div className="row">
        <Form
          method="GET"
          handleOnSubmit={searchEvent}
          content={content}
          styles={styles}
          border="none"
        />
      </div>
      <div className={styles.content + " row"}>
        <h4>
          {busca
            ? "Eventos disponíveis relacionados a busca " + search
            : "Todos os eventos disponíveis"}
        </h4>
        <Event data={events} status="1" />
      </div>
    </>
  );
}
