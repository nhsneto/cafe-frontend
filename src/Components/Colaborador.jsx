import { MdCreate } from "react-icons/md";
import styles from "./Colaborador.module.css";

function Colaborador() {
  const nome = "Nelson Henrique";
  const cpf = "123.123.123-12";
  const opcoes = "Leite · Café · Bolacha";
  const data = "19/04/2023";

  return (
    <article className={styles.article}>
      <div className={styles.nomeCpf}>
        <div className={styles.nome}>
          <h2>{nome}</h2>
          <a href="" className={styles.atualizacao}>{<MdCreate />}</a>
        </div>
        <p className={styles.cpf}>{cpf}</p>
      </div>

      <p className={styles.opcoes}>{opcoes}</p>

      <p className={styles.data}>{data}</p>

      <div>
        <div className={styles.divTrouxe}>
          <input type="radio" name="trouxe" id="trouxe" />
          <label htmlFor="trouxe" className={styles.labelTrouxe}>
            Trouxe
          </label>
        </div>
        <div>
          <input type="radio" name="trouxe" id="naoTrouxe" defaultChecked/>
          <label htmlFor="naoTrouxe" className={styles.labelNaoTrouxe}>
            Não Trouxe
          </label>
        </div>
      </div>
    </article>
  );
}

export default Colaborador;
