// import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
export default function Event({ data, status }) {
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
          {/* {data.lenght == undefined && <p>Sem eventos cadastrados</p>} */}
          {data.map((event) => (
            <div className="col-md-4 mt-3" key={event.id}>
              <div className="card">
                <h5 className="card-header">{event.title}</h5>
                <div className="card-body">
                  <p>{event.description}</p>
                  <p>Início: {event.start_time}</p>
                  <p>Fim: {event.finish_time}</p>
                  <p>Cidade: {event.city}</p>
                  <p>Capacidade: {event.capacity}</p>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-secondary">
                    Saber mais
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {!data && <p>Sem eventos cadastrados</p>}
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descrição</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Cidade</th>
                <th>Capacidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((event) => (
                <tr key={event.id}>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.start_time}</td>
                  <td>{event.finish_time}</td>
                  <td>{event.city}</td>
                  <td>{event.capacity}</td>
                  <td>
                    <Link to={"/events/" + event.id}>Editar</Link>
                    <button onClick={(e) => deleteEvent(event.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}{" "}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}
