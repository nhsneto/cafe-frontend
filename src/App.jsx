import coffee from "./assets/coffee.svg";
import Colaborador from "./Components/Colaborador";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    fetch("http://localhost.com/8080/colaboradores", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setColaboradores(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={coffee} alt="Xícara de Café" className={styles.coffee} />
        <h1 className={styles.frase}>Café da Manhã</h1>
      </header>

      <main>
        {colaboradores &&
          colaboradores.map((colaborador) => {
            <Colaborador colaborador={colaborador} />;
          })}
      </main>

      <Link to="/cadastro">
        <MdAddCircle className={styles.botaoAdicionar} />
      </Link>
    </div>
  );
}

export default App;
