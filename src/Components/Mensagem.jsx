import { useEffect, useState } from "react";
import styles from "./Mensagem.module.css";

function Mensagem({ tipo, texto }) {
  const [exibir, setExibir] = useState(false);

  useEffect(() => {
    if (!texto) {
      setExibir(false);
      return;
    }

    setExibir(true);

    const tempoMilli = tipo === "sucesso" ? 3000 : 5000;
    const timer = setTimeout(() => {
      setExibir(false);
    }, tempoMilli);

    return () => clearTimeout(timer);
  }, [texto]);

  return (
    <>
      {exibir && (
        <div className={tipo === "sucesso" ? styles.sucesso : styles.erro}>
          <p className={styles}>{texto}</p>
        </div>
      )}
    </>
  );
}

export default Mensagem;
