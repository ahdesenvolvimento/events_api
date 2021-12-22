import styles from "./Select.module.css";
export default function Input({ text, name, handleOnChange, value, options }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="">{text}</label>
      <select
        id={name}
        name={name}
        onChange={handleOnChange}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
            <option value={option.value} key={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  );
}
