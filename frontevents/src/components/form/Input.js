import styles from "./Input.module.css";
export default function Input({
  text,
  type,
  name,
  handleOnChange,
  value,
  placeholder,
  required,
  handleOnBlur
}) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor="">{text}</label>
      <input
        type={type}
        id={name}
        name={name}
        onChange={handleOnChange}
        placeholder={placeholder}
        value={value}
        required={required}
        onBlur={handleOnBlur}
      />
    </div>
  );
}
