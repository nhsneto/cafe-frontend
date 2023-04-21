import styles from "./Mensagem.module.css";

function Mensagem({ tipo, texto }) {
  return (
    <div className={tipo === "sucesso" ? styles.sucesso : styles.erro}>
      <p className={styles}>{texto}</p>
    </div>
  );
}

export default Mensagem;
