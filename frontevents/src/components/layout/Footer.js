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
          >
            Antonio Henrique
          </a>
          ADD GIT HUB DO PROJETO
        </span>
      </div>
    </footer>
  );
}
