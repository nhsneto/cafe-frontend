import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Colaborador.module.css";

function Colaborador({ colaborador }) {
  function formataCPF(cpf) {
    let cpfFormatado = "";

    for (let i = 0; i < cpf.length; i++) {
      cpfFormatado += cpf[i];
      if (i === 2 || i === 5) {
        cpfFormatado += ".";
      }
      if (i === 8) {
        cpfFormatado += "-";
      }
    }

    return cpfFormatado;
  }

  function formataOpcoes(opcoes) {
    let opcoesFormatada = "";

    for (let i = 0; i < opcoes.length; i++) {
      if (i !== opcoes.length - 1) {
        opcoesFormatada += `${opcoes[i].nome} · `;
      } else {
        opcoesFormatada += opcoes[i].nome;
      }
    }

    return opcoesFormatada;
  }

  function formataData(data) {
    let dia = "";
    let mes = "";
    let ano = "";

    [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <article className={styles.article}>
      <div className={styles.nomeCpf}>
        <div className={styles.nome}>
          <h2>{colaborador.nome}</h2>
          <Link to={`/edicao/${colaborador.id}`} className={styles.atualizacao}>
            {<MdCreate />}
          </Link>
        </div>
        <p className={styles.cpf}>{formataCPF(colaborador.cpf)}</p>
      </div>

      <p className={styles.opcoes}>{formataOpcoes(colaborador.opcoes)}</p>

      <p className={styles.data}>{formataData(colaborador.data)}</p>

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
