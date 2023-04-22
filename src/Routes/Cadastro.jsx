import { useState } from "react";
import styles from "./Cadastro.module.css";
import Input from "../Components/Input";
import InputOpcoes from "../Components/InputOpcoes";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Mensagem from "../Components/Mensagem";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataCafe, setDataCafe] = useState("");
  const [opcao, setOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");

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

    fetch("https://desafio-production.up.railway.app/colaboradores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colaborador),
    })
      .then((res) => {
        if (res.status === 201) {
          setMensagemSucesso("Colaborador cadastrado com sucesso!");
          clearInputs();
        }

        return res.json();
      })
      .then((data) => {
        if (data.erro) {
          setMensagemErro(data.erro);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.botaoVoltarContainer}>
        <MdArrowBack className={styles.botaoVoltar} />
      </Link>

      <h1>Adicionar Colaborador</h1>

      <form onSubmit={adicionaColaborador} className={styles.form}>
        <Input
          label="Nome"
          id="nome"
          type="text"
          placeholder="Nome Sobrenome"
          pattern="^[a-zA-Z\s]{2,}$"
          title="Nome e sobrenome."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          label="CPF"
          id="cpf"
          type="text"
          placeholder="00000000000"
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
        <input
          type="submit"
          value="Adicionar"
          className={styles.botaoAdicionar}
        />
      </form>

      {mensagemSucesso && <Mensagem tipo="sucesso" texto={mensagemSucesso} />}
      {mensagemErro && <Mensagem tipo="erro" texto={mensagemErro} />}
    </div>
  );
}

export default Cadastro;
