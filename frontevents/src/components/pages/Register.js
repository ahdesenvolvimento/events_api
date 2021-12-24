import styles from "./Register.module.css";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../form/Form";
export default function Login() {
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState();
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
    console.log(password + ' / ' + user)
    password != user.password ? alert('As senhas não batem') : (
      fetch("http://localhost:8000/user/", init)
        .then((response) => response.json())
        .then((data) => {
          data = data.message ? (alert(data.message)) : (
            navigate('/login')
          )
        })
        .catch((error) => console.log(error))
    );


  };

  const handleInput = (e) => {
    console.log(password + ' / ' + e)
  }
  const content = (
    <><h3 className={styles.title}>Cadastro de usuário</h3><div className="row">
      <div className="col-md-6">
        <Input
          name="first_name"
          type="text"
          placeholder="Insira seu primeiro nome"
          text="Primeiro nome"
          handleOnChange={handleChange} />

      </div>
      <div className="col-md-6">

        <Input
          name="last_name"
          type="text"
          placeholder="Insira seu último nome"
          text="Último nome"
          handleOnChange={handleChange} />
      </div>
    </div><div className={styles.row}>
        <Input
          name="email"
          type="text"
          placeholder="Insira seu e-mail"
          text="E-mail"
          handleOnChange={handleChange} />
      </div><div className={styles.row}>
        <Input
          name="username"
          type="text"
          placeholder="Insira seu usuário"
          text="Usuário"
          handleOnChange={handleChange} />
      </div><div className="row">
        <div className="col-md-6">
          <Input
            name="password"
            type="password"
            placeholder="Insira sua senha"
            text="Senha"
            handleOnChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="col-md-6">
          <Input
            name="password"
            type="password"
            placeholder="Confirme sua senha"
            text="Confirme a senha"
            handleOnChange={handleChange} />
        </div>
      </div><div className={styles.row}>
      </div><div className={styles.row}>
        <div className={styles.btnLinks}>
          <SubmitButton text="Entrar" />
        </div>
      </div></>
  )
  return (
    <>
      <Form method="POST" handleOnSubmit={registerUser} content={content} />
      {/* <div className="card mt-3">
        <div className="card-body">


        </div>
      </div>
      <div className={styles.layout}>
        <div className={styles.content}>
        </div>
      </div> */}
    </>
  );
}
