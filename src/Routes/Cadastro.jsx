import { useState } from "react";
import InputMask from "react-input-mask";
import styles from "./Cadastro.module.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataCafe, setDataCafe] = useState("");

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

  function adicionaColaborador() {}

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
          <InputMask
            id="cpf"
            type="text"
            mask="999.999.999-99"
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
      </form>
    </div>
  );
}

export default Cadastro;
