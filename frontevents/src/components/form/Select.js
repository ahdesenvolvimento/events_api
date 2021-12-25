import styles from "./Select.module.css";
export default function Input({ text, name, handleOnChange, value, options, multiple }) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="">{text}</label>
      <select
        id={name}
        name={name}
        onChange={handleOnChange}
        multiple={multiple}
      >
        <option value="">Selecione uma opção</option>
        {options.map((option) => (
        <option value={option.value} selected={value == option.value ? 'selected' : ''} key={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  );
}
