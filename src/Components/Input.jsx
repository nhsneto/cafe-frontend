import styles from "./Input.module.css";

function Input({
  id,
  label,
  type,
  title,
  placeholder,
  value,
  maxLength,
  min,
  pattern,
  onChange,
  onClick,
  onFocus,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        id={id}
        type={type}
        title={title}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        min={min}
        pattern={pattern}
        onFocus={onFocus}
        onClick={onClick}
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
