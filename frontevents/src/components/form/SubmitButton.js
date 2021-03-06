import styles from "./SubmitButton.module.css";
export default function SubmitButton({ text }) {
  return (
    <div className={styles.marginTop}>
      <button type="submit" className="btn btn-primary">{text}</button>
    </div>
  );
}
