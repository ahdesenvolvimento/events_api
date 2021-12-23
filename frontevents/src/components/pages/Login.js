import styles from "./Login.module.css";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { Link } from "react-router-dom";
import { useState } from "react";
import Form from "../form/Form";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  const [user, setUser] = useState([]);
  const login = (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:8000/api/token/", init)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        localStorage.setItem("access-token", data.access);
        localStorage.setItem("refresh-token", data.refresh);
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const content = (
    <>
      <div className={styles.row}>
        <Input
          name="username"
          type="text"
          placeholder="Insira seu usuário"
          text="Usuário"
          handleOnChange={handleChange}
        />
      </div>
      <div className={styles.row}>
        <Input
          name="password"
          type="password"
          placeholder="Insira sua senha"
          text="Senha"
          handleOnChange={handleChange}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.btnLinks}>
          <SubmitButton text="Entrar" />
          <Link to="/register">Não possuo cadastro</Link>
          <Link to="resetPassword">Esqueci minha senha</Link>
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.content}>
          <h3 className={styles.title}>Login</h3>
          <Form method="POST" handleOnSubmit={login} content={content} />
          {/* <form action="" method="POST" onSubmit={login}></form> */}
        </div>
      </div>
    </>
  );
}
