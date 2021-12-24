import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Form from "../form/Form";
import SubmitButton from "../form/SubmitButton";
import styles from "./NewEvent.module.css";
export default function NewEvent() {
  const [event, setEvent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:8000/events/" + id, init)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setEvent(data[0]);
        })
        .catch((error) => console.log(error));
    }else{
      setEvent([])
    }
  }, []);

  const options = [
    {
      value: "1",
      text: "Sim",
    },
    {
      value: "0",
      text: "Não",
    },
  ];
  const newEvent = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify(event),
    };
    fetch("http://localhost:8000/events/", init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  const updateEvent = (e) => {
    e.preventDefault();
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access-token"),
      },
      body: JSON.stringify(event),
    };
    fetch("http://localhost:8000/events/" + id, init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const content = (
    <>
      <h3 className={styles.title}>{ id ? "Editar Evento " + event.title : "Cadastrar Evento"}</h3>
      <Input
        type="text"
        id="title"
        name="title"
        text="Título do evento"
        placeholder="Insira o título do evento"
        handleOnChange={handleChange}
        value={event.title ? event.title : ""}
      />
      <Input
        type="text"
        id="description"
        name="description"
        text="Descrição do evento"
        placeholder="Insira a descrição do evento"
        handleOnChange={handleChange}
        className={styles.marginCustom}
        value={event.description ? event.description : ""}
      />
      <div className="row">
        <div className="col-6">
          <Input
            type="time"
            id="start_time"
            name="start_time"
            text="Hora de início"
            handleOnChange={handleChange}
            value={event.start_time ? event.start_time : ""}
          />
        </div>
        <div className="col-6">
          <Input
            type="time"
            id="finish_time"
            name="finish_time"
            text="Hora do término"
            handleOnChange={handleChange}
            value={event.finish_time ? event.finish_time : ""}
          />
        </div>
      </div>

      <Input
        type="text"
        id="city"
        name="city"
        text="Cidade do evento"
        placeholder="Insira a descrição do evento"
        handleOnChange={handleChange}
        value={event.city ? event.city : ""}
      />

      <Select
        id="private"
        name="private"
        text="Evento privado?"
        options={options}
        handleOnChange={handleChange}
        value={event.private ? 1 : 0}
      />
      <Input
        type="number"
        id="capacity"
        name="capacity"
        text="Capacidade do evento"
        placeholder="Insira a descrição do evento"
        handleOnChange={handleChange}
        value={event.capacity ? event.capacity : ""}
      />

      <SubmitButton text={id ? "Editar Evento" : "Criar Evento"} />
    </>
  );
  return (
    <div className={styles.content}>
      <Form
        method="POST"
        handleOnSubmit={id ? updateEvent : newEvent}
        content={content}
      />
    </div>
  );
}
