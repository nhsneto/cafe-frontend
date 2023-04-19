import coffee from "./assets/coffee.svg";
import Colaborador from "./Components/Colaborador";
import { MdAddCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <img src={coffee} alt="Xícara de Café" className={styles.coffee} />
        <h1 className={styles.frase}>Café da Manhã</h1>
      </header>

      <main>
        <p>19/04/2023</p>
        <Colaborador />
      </main>

      <Link to="/edicao">
        <MdAddCircle className={styles.botaoAdicionar} />
      </Link>
    </div>
  );
}

export default App;
