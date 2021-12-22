import { useEffect, useState } from "react";
import Event from "../layout/Event";
export default function Events() {
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
      {/* <form action="" method="GET" className={styles.form}>
        <Input
          type="search"
          name="search"
          placeholder="Busque por um evento"
          //   handleOnChange={handleChange}
        />
      </form> */}
      <div className="row">
        <Event data={events} status="2"/>

      </div>
    </div>
  );
}
