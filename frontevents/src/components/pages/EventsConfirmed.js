import { useEffect, useState } from "react";
import Event from "../layout/Event";
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
    fetch("http://localhost:8000/events/confimed/", init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data[0]);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div className="row">
        <Event data={events} status="2"/>
    </div>
  );
}
