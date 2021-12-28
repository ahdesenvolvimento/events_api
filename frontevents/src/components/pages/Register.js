import styles from "./Register.module.css";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../form/Form";
import { faGrinBeamSweat } from '@fortawesome/free-solid-svg-icons'
import MyModal from "../layout/MyModal";
export default function Login() {
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const registerUser = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    let dado = password !== user.password ? (handleShow(), setMessage("As senhas não são iguais!")) : (
      fetch("http://localhost:8000/user/", init)
        .then((response) => response.json())
        .then((data) => {
          data = data.message ? (handleShow(), setMessage("Este usuário já está cadastrado no sistema!")) : (
            navigate('/login')
          )
        })
        .catch((error) => console.log(error))
    );
  };
  const content = (
    <><h3 className={styles.title}>Cadastro de usuário</h3><div className="row">
      <div className="col-md-6">
        <Input
          name="first_name"
          type="text"
          placeholder="Insira seu primeiro nome"
          text="Primeiro nome"
          handleOnChange={handleChange}
          required={true}
        />

      </div>
      <div className="col-md-6">

        <Input
          name="last_name"
          type="text"
          placeholder="Insira seu último nome"
          text="Último nome"
          handleOnChange={handleChange}
          required={true}
        />
      </div>
    </div><div className={styles.row}>
        <Input
          name="email"
          type="email"
          placeholder="Insira seu e-mail"
          text="E-mail"
          handleOnChange={handleChange}
          required={true}
        />
      </div><div className={styles.row}>
        <Input
          name="username"
          type="text"
          placeholder="Insira seu usuário"
          text="Usuário"
          handleOnChange={handleChange}
          required={true}
        />
      </div><div className="row">
        <div className="col-md-6">
          <Input
            name="password1"
            type="password"
            placeholder="Insira sua senha"
            text="Senha"
            handleOnChange={(e) => setPassword(e.target.value)}
            required={true}
          />
        </div>
        <div className="col-md-6">
          <Input
            name="password"
            type="password"
            placeholder="Confirme sua senha"
            text="Confirme a senha"
            handleOnChange={handleChange}
            required={true}
          />
        </div>
      </div><div className={styles.row}>
      </div><div className={styles.row}>
        <div className={styles.btnLinks}>
          <SubmitButton text="Criar usuário" />
        </div>
      </div></>
  )
  return (
    <>
      <Form method="POST" handleOnSubmit={registerUser} content={content} />
      <MyModal message={message} show={show} handleClose={handleClose} icon={faGrinBeamSweat} />
    </>
  );
}
