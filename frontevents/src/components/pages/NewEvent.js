import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import Form from "../form/Form";
import SubmitButton from "../form/SubmitButton";
import styles from "./NewEvent.module.css";
import MyModal from "../../components/layout/MyModal";
export default function NewEvent() {
  const [event, setEvent] = useState([]);
  const [teste, setTeste] = useState([]);
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState();

  const pesquisacep = (cep) => {
    fetch("https://viacep.com.br/ws/" + cep + "/json/")
      .then((response) => response.json())
      .then((data) => {
        delete data.ddd;
        delete data.gia;
        delete data.ibge;
        delete data.siafi;
        let new_object = { ...event, ...data };
        setEvent({ ...new_object });
      })
      .catch((error) => console.log(error));
  };

  const handleShow = (message) => {
    setMessage(message);
    setShow(true);
  };
  const handleClose = () => setShow(false);
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
          setEvent(data[0]);
        })
        .catch((error) => console.log(error));
    } else {
      setEvent([]);
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
        handleShow("Evento cadastrado com sucesso!");
        setEvent([]);
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
        handleShow("Evento editado com sucesso!");
      })
      .catch((error) => console.log(error));
  };
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const content = (
    <>
      <h3 className={styles.title}>
        {id ? "Editar Evento " + event.title : "Cadastrar Evento"}
      </h3>
      <Input
        type="text"
        name="title"
        text="Título do evento"
        placeholder="Insira o título do evento"
        handleOnChange={handleChange}
        value={event.title ? event.title : ""}
        required={true}
      />
      <Input
        type="text"
        name="description"
        text="Descrição do evento"
        placeholder="Insira a descrição do evento"
        handleOnChange={handleChange}
        className={styles.marginCustom}
        value={event.description ? event.description : ""}
        required={true}
      />
      <div className="row">
        <div className="col-md-6">
          <Input
            type="date"
            name="date_start"
            text="Data de início"
            handleOnChange={handleChange}
            value={event.date_start ? event.date_start : ""}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Input
            type="date"
            name="date_finish"
            text="Data do término"
            handleOnChange={handleChange}
            value={event.date_finish ? event.date_finish : ""}
            required={false}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Input
            type="time"
            name="start_time"
            text="Hora de início"
            handleOnChange={handleChange}
            value={event.start_time ? event.start_time : ""}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Input
            type="time"
            name="finish_time"
            text="Hora do término"
            handleOnChange={handleChange}
            value={event.finish_time ? event.finish_time : ""}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Input
            type="text"
            name="cep"
            text="CEP"
            placeholder="CEP"
            handleOnChange={handleChange}
            value={event.cep ? event.cep : ""}
            handleOnBlur={(e) => pesquisacep(e.target.value)}
            required={true}
          />
        </div>
        <div className="col-md-7">
          <Input
            type="text"
            name="logradouro"
            text="Endereço do evento"
            placeholder="Insira o endereço do evento"
            handleOnChange={handleChange}
            value={event.logradouro ? event.logradouro : ""}
            required={true}
          />
        </div>
        <div className="col-md-2">
          <Input
            type="text"
            name="numero"
            text="Número"
            placeholder="Número"
            handleOnChange={handleChange}
            value={event.numero ? event.numero : ""}
            required={false}
          />
        </div>
        <div className="col-md-12">
          <Input
            type="text"
            name="complemento"
            text="Complemento"
            placeholder="Complemento"
            handleOnChange={handleChange}
            value={event.complemento ? event.complemento : ""}
            required={false}
          />
        </div>
        <div className="col-md-5">
          <Input
            type="text"
            name="bairro"
            text="Bairro"
            placeholder="Bairro"
            handleOnChange={handleChange}
            value={event.bairro ? event.bairro : ""}
            required={true}
          />
        </div>
        <div className="col-md-5">
          <Input
            type="text"
            name="localidade"
            text="Cidade"
            placeholder="Cidade"
            handleOnChange={handleChange}
            value={event.localidade ? event.localidade : ""}
            required={true}
          />
        </div>
        <div className="col-md-2">
          <Input
            type="text"
            name="uf"
            text="Estado"
            placeholder="Estado"
            handleOnChange={handleChange}
            value={event.uf ? event.uf : ""}
            required={true}
          />
        </div>
      </div>
      {/* <Input
        type="text"
        name="city"
        text="Cidade do evento"
        placeholder="Insira a descrição do evento"
        handleOnChange={handleChange}
        value={event.city ? event.city : ""}
        required={true}
      /> */}

      <Select
        name="private"
        text="Evento privado?"
        options={options}
        handleOnChange={handleChange}
        value={event.private ? 1 : 0}
      />
      <Input
        type="number"
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
      <MyModal message={message} show={show} handleClose={handleClose} />
    </div>
  );
}
