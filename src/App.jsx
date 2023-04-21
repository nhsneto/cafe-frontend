import coffee from "./assets/coffee.svg";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";
import CafeDaManha from "./Components/CafeDaManha";

function App() {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/colaboradores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setColaboradores(data))
      .catch((err) => console.log(err));
  }, []);

  function getDatasCafe(colaboradores) {
    const datas = new Set(colaboradores.map((colaborador) => colaborador.data));
    return Array.from(datas).sort();
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={coffee} alt="Xícara de Café" className={styles.coffee} />
        <h1 className={styles.frase}>Café da Manhã</h1>
      </header>

      <main>
        {colaboradores &&
          getDatasCafe(colaboradores).map((dataCafe, i) => (
            <CafeDaManha
              colaboradores={colaboradores}
              dataCafe={dataCafe}
              key={i}
            />
          ))}
      </main>

      <Link to="/cadastro">
        <MdAddCircle className={styles.botaoAdicionar} />
      </Link>
    </div>
  );
}

export default App;
