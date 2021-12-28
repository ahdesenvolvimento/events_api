import styles from "./Footer.module.css";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <span>
          Desenvolvido por{" "}
          <a
            href="https://github.com/ahdesenvolvimento"
            title="Github Antonio Henrique"
            target="_blank"
            rel="noreferrer"
          >
            Antonio Henrique
          </a>
        </span>
        <span>
          <a
            href="https://github.com/ahdesenvolvimento/events_api"
            target="_blank"
            title="Github do projeto"
            rel="noreferrer"
          >
            Github do projeto
          </a>
        </span>
      </div>
    </footer>
  );
}
