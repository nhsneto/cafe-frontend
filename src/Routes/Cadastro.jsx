import { useState } from "react";
import styles from "./Cadastro.module.css";
import { useLocation } from "react-router-dom";
import Input from "../Components/Input";
import InputOpcoes from "../Components/InputOpcoes";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataCafe, setDataCafe] = useState("");
  const [opcao, setOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);

  const location = useLocation().pathname;

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

  function formataOpcoes(opcoes) {
    const arr = [];
    for (const opcao of opcoes.toSorted()) {
      arr.push({ nome: opcao });
    }
    return arr;
  }

  function clearInputs() {
    setNome("");
    setCpf("");
    setDataCafe("");
    setOpcoes([]);
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
    console.log(location);

    clearInputs();
  }

  return (
    <div className={styles.container}>
      <h1>Adicionar Colaborador</h1>
      <form onSubmit={adicionaColaborador} className={styles.form}>
        <Input
          label="Nome"
          id="nome"
          type="text"
          placeholder="Nome Sobrenome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          label="CPF"
          id="cpf"
          type="text"
          maxLength="11"
          pattern="[0-9]{11}"
          title="O CPF deve conter 11 caracteres numéricos."
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <Input
          label="Data do Café"
          id="dataCafe"
          type="date"
          title="A data de realização do café deve ser maior que a data atual."
          min={getDataDeAmanha()}
          value={dataCafe}
          onChange={(e) => setDataCafe(e.target.value)}
        />

        <InputOpcoes
          opcao={opcao}
          opcaoList={opcoes}
          setterOpcaoList={setOpcoes}
          onChange={(e) => setOpcao(e.target.value)}
        />
        <input type="submit" value="Adicionar" />
      </form>
    </div>
  );
}

export default Cadastro;
