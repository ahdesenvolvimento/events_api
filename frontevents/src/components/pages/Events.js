import { useEffect, useState } from "react";
import Event from "../layout/Event";
export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:"Bearer "+localStorage.getItem('access-token')
      },
    };
    fetch("http://localhost:8000/events/owner", init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div className="row">
        <Event data={events} status="2"/>

      </div>
    </div>
  );
}
