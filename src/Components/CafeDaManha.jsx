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
    return arr;
  }

  return (
    <section className={styles.container}>
      <h2>{formataData(dataCafe)}</h2>
      <div className={styles.colaboradores}>
        {getColaboradoresPorData(dataCafe).map((colaborador) => (
          <Colaborador colaborador={colaborador} key={colaborador.id} />
        ))}
      </div>
    </section>
  );
}

export default CafeDaManha;
