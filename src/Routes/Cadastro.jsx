import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { MdAddCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import styles from "./Cadastro.module.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataCafe, setDataCafe] = useState("");
  const [opcao, setOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  function getDataDeAmanha() {
    const data = new Date();
    data.setDate(data.getDate() + 1);
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    const ano = data.getFullYear();
    if (dia < 10) {
      dia = `0${dia}`;
    }
    if (mes < 10) {
      mes = `0${mes}`;
    }
    return `${ano}-${mes}-${dia}`;
  }

  function isOpcaoExistente(opcao, opcoes) {
    for (const current of opcoes) {
      if (current.toUpperCase() === opcao.toUpperCase()) {
        return true;
      }
    }

    return false;
  }

  function formataOpcoes(opcoes) {
    const arr = [];
    for (const opcao of opcoes.toSorted()) {
      arr.push({ nome: opcao });
    }
    return arr;
  }

  function adicionaColaborador(e) {
    e.preventDefault();

    const colaborador = {
      nome: nome,
      cpf: cpf,
      opcoes: formataOpcoes(opcoes),
      data: dataCafe,
    };

    // useEffect(() => {
    //   fetch("http://localhost:8080/colaboradores", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(colaborador),
    //   });
    // }, []);

    console.log(JSON.stringify(colaborador));
  }

  return (
    <div className={styles.container}>
      <h1>Adicionar Colaborador</h1>
      <form onSubmit={adicionaColaborador}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Nome Sobrenome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            maxLength="11"
            pattern="[0-9]{11}"
            title="CPF com 11 caracteres numéricos."
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="dataCafe">Data do Café</label>
          <input
            id="dataCafe"
            type="date"
            min={getDataDeAmanha()}
            value={dataCafe}
            onChange={(e) => setDataCafe(e.target.value)}
          />
        </div>

        <div className={styles.opcoesContainer}>
          <div>
            <label htmlFor="opcao">Opção</label>
            <input
              id="opcao"
              type="text"
              placeholder="Pão"
              value={opcao}
              onChange={(e) => setOpcao(e.target.value)}
            />
            <MdAddCircle
              className={styles.botaoAdicionar}
              onClick={() => {
                if (opcao && !isOpcaoExistente(opcao, opcoes)) {
                  setOpcoes([...opcoes, opcao]);
                }
                setOpcao("");
              }}
            />
          </div>
          <div>
            <ul>
              {opcoes.map((opcao, i) => (
                <li key={i}>
                  {opcao}{" "}
                  <FaTrash
                    className={styles.lixeira}
                    onClick={() =>
                      setOpcoes(
                        opcoes.filter(
                          (item) => item.toLowerCase() !== opcao.toLowerCase()
                        )
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <input type="submit" value="Adicionar" />
      </form>
    </div>
  );
}

export default Cadastro;
