import { useEffect, useState } from "react";
import Event from "../layout/Event";
import Card from "../layout/Card";
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

  return (
    <div className="row">
      <Card />
        <Event data={events} presence="true" status="2"/>
    </div>
  );
}
