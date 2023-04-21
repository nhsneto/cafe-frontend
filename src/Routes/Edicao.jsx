import { useEffect, useState } from "react";
import styles from "./Edicao.module.css";
import Input from "../Components/Input";
import InputOpcoes from "../Components/InputOpcoes";
import { FaTrash } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Mensagem from "../Components/Mensagem";

function Edicao() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataCafe, setDataCafe] = useState("");
  const [opcao, setOpcao] = useState("");
  const [opcoes, setOpcoes] = useState([]);
  const [colaborador, setColaborador] = useState({});
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [mensagemRemocao, setmensagemRemocao] = useState("");
  const id = useParams().id;

  useEffect(() => {
    fetch(`http://localhost:8080/colaboradores/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setColaborador(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setNome(colaborador.nome || "");
    setCpf(colaborador.cpf || "");
    setDataCafe(colaborador.data || "");
    colaborador.opcoes &&
      setOpcoes(colaborador.opcoes.map((opcao) => opcao.nome));
  }, [colaborador]);

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

  function toOpcoesObjetos(opcoes) {
    const arr = [];
    for (const opcao of opcoes.toSorted()) {
      arr.push({ nome: opcao });
    }
    return arr;
  }

  function atualizaColaborador(e) {
    e.preventDefault();

    const colaborador = {
      nome: nome,
      cpf: cpf,
      opcoes: toOpcoesObjetos(opcoes),
      data: dataCafe,
    };

    fetch(`http://localhost:8080/colaboradores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colaborador),
    })
      .then((res) => {
        if (res.status === 200) {
          setMensagemSucesso("Colaborador atualizado com sucesso.");
        }
        return res.json();
      })
      .then((data) => {
        if (data.erro) {
          setMensagemErro(data.erro);
        }
      })
      .catch((err) => console.log(err));
  }

  function removeColaborador(id) {
    fetch(`http://localhost:8080/colaboradores/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(colaborador),
    })
      .then((res) => {
        if (res.status === 204) {
          setmensagemRemocao("Colaborador removido com sucesso.");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.botaoVoltarContainer}>
        <MdArrowBack className={styles.botaoVoltar} />
      </Link>

      <h1>Editar Colaborador</h1>

      <form onSubmit={atualizaColaborador} className={styles.form}>
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

        <input
          type="submit"
          value="Atualizar"
          className={styles.botaoAtualizar}
        />

        <div className={styles.removerContainer}>
          <a
            type="button"
            className={styles.botaoRemover}
            onClick={() => removeColaborador(id)}
          >
            <FaTrash /> Excluir Colaborador
          </a>
        </div>

        {mensagemSucesso && <Mensagem tipo="sucesso" texto={mensagemSucesso} />}
        {mensagemErro && <Mensagem tipo="erro" texto={mensagemErro} />}
        {mensagemRemocao && <p>{mensagemRemocao}</p>}
      </form>
    </div>
  );
}

export default Edicao;
