import styles from "./Register.module.css";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login() {
  const [user, setUser] = useState([]);

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
    console.log(user)
    fetch("http://localhost:8000/user/", init)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.content}>
          <h3 className={styles.title}>Login</h3>
          <form action="" method="POST" onSubmit={registerUser}>
            <div className={styles.row}>
              <Input
                name="first_name"
                type="text"
                placeholder="Insira seu usuário"
                text="Primeiro nome"
                handleOnChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <Input
                name="last_name"
                type="text"
                placeholder="Insira seu usuário"
                text="Último nome"
                handleOnChange={handleChange}
              />
            </div>
            <div className={styles.row}>
              <Input
                name="email"
                type="text"
                placeholder="Insira seu usuário"
                text="E-mail"
                handleOnChange={handleChange}
              />
            </div>
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
