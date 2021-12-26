import { useEffect, useState } from "react";
import Event from "../layout/Event";
import Card from "../layout/Card";
export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('access-token')
      },
    };
    fetch("http://localhost:8000/events/owner", init)
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <div className="row">
        <Card content={<Event data={events} status="2" />} />
      </div>
    </div>
  );
}
