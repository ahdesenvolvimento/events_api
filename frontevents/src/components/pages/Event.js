import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Event() {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  useEffect(() => {
    const init = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("http://localhost:8000/events/" + id, init)
      .then((response) => response.json())
      .then((data) => {
        setEvent(data[0]);
        // console.log(event);
      })
      .catch((error) => console.log(error));
  }, []);

  const joinEvent = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify({
        id: id,
      }),
    };

    fetch("http://localhost:8000/events/join/", init)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div className="card">
        <h5 className="card-header"> {event.title} </h5>
        <div className="card-body">
          {event.description} {event.start_time} {event.finish_time}
          {event.capacity} {event.private}
          <Link to="/" onClick={joinEvent}>
            Confirmar presença
          </Link>
        </div>
      </div>
    </div>
  );
}
