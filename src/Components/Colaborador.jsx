import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Colaborador.module.css";

function Colaborador({ colaborador }) {
  return (
    <article className={styles.article}>
      <div className={styles.nomeCpf}>
        <div className={styles.nome}>
          <h2>{colaborador.nome}</h2>
          <Link to={`/edicao/?id=${colaborador.id}`} className={styles.atualizacao}>
            {<MdCreate />}
          </Link>
        </div>
        <p className={styles.cpf}>{colaborador.cpf}</p>
      </div>

      <p className={styles.opcoes}>{colaborador.opcoes}</p>

      <p className={styles.data}>{colaborador.data}</p>

      <div>
        <div className={styles.divTrouxe}>
          <input type="radio" name="trouxe" id="trouxe" />
          <label htmlFor="trouxe" className={styles.labelTrouxe}>
            Trouxe
          </label>
        </div>
        <div>
          <input type="radio" name="trouxe" id="naoTrouxe" defaultChecked />
          <label htmlFor="naoTrouxe" className={styles.labelNaoTrouxe}>
            Não Trouxe
          </label>
        </div>
      </div>
    </article>
  );
}

export default Colaborador;
