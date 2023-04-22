import { MdCreate } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Colaborador.module.css";
import { useState } from "react";

function Colaborador({ colaborador }) {
  const [trouxe, setTrouxe] = useState(false);

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

  function atualizaTrouxe(e, colaborador) {
    const id = e.target.id;
    const tipo = id.split("-")[0];

    if (tipo === "trouxe") {
      colaborador.trouxe = true;
    } else {
      colaborador.trouxe = false;
    }

    fetch(`http://localhost:8080/colaboradores/${colaborador.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colaborador),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  function isHojeDataDoCafe(dataCafe) {
    let dataDeHoje = new Date();
    let dia = dataDeHoje.getDate();
    let mes = dataDeHoje.getMonth() + 1;
    const ano = dataDeHoje.getFullYear();
    if (dia < 10) {
      dia = `0${dia}`;
    }
    if (mes < 10) {
      mes = `0${mes}`;
    }
    dataDeHoje = `${ano}-${mes}-${dia}`;
    return dataDeHoje === dataCafe;
  }

  return (
    <article className={styles.article}>
      <div className={styles.nomeContainer}>
        <div className={styles.nome}>
          <h2>{colaborador.nome}</h2>
          <Link to={`/edicao/${colaborador.id}`} className={styles.atualizacao}>
            {<MdCreate />}
          </Link>
        </div>
        <p className={styles.cpf}>{formataCPF(colaborador.cpf)}</p>
      </div>

      <div className={styles.opcoesContainer}>
        <p className={styles.opcoes}>{formataOpcoes(colaborador.opcoes)}</p>
      </div>

      <div className={styles.dataContainer}>
        <p className={styles.data}>{formataData(colaborador.data)}</p>
      </div>

      {isHojeDataDoCafe(colaborador.data) && (
        <div className={styles.trouxeContainer}>
          <div className={styles.divTrouxe}>
            <input
              type="radio"
              name={`trouxe-${colaborador.id}`}
              id={`trouxe-${colaborador.id}`}
              onClick={(e) => atualizaTrouxe(e, colaborador)}
              defaultChecked={colaborador.trouxe && true}
              onChange={() => setTrouxe(true)}
            />
            <label
              htmlFor={`trouxe-${colaborador.id}`}
              className={styles.labelTrouxe}
            >
              Trouxe
            </label>
          </div>

          <div>
            <input
              type="radio"
              name={`trouxe-${colaborador.id}`}
              id={`naoTrouxe-${colaborador.id}`}
              onClick={(e) => atualizaTrouxe(e, colaborador)}
              defaultChecked={!colaborador.trouxe && true}
              onChange={() => setTrouxe(false)}
            />
            <label
              htmlFor={`naoTrouxe-${colaborador.id}`}
              className={styles.labelNaoTrouxe}
            >
              Não Trouxe
            </label>
          </div>
        </div>
      )}
    </article>
  );
}

export default Colaborador;
