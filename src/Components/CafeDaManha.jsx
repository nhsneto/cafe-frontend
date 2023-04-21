import Colaborador from "./Colaborador";
import styles from "./CafeDaManha.module.css";

function CafeDaManha({ colaboradores, dataCafe }) {
  function formataData(data) {
    let dia = "";
    let mes = "";
    let ano = "";

    [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function getColaboradoresPorData(data) {
    const arr = [];
    for (const colaborador of colaboradores) {
      if (colaborador.data === data) {
        arr.push(colaborador);
      }
    }
    arr.sort((a, b) => {
      if (a.nome > b.nome) return 1;
      if (a.nome < b.nome) return -1;
      return 0;
    });
    return arr;
  }

  return (
    <section className={styles.container}>
      <h2>{formataData(dataCafe)}</h2>
      {getColaboradoresPorData(dataCafe).map((colaborador) => (
        <Colaborador colaborador={colaborador} key={colaborador.id} />
      ))}
    </section>
  );
}

export default CafeDaManha;
