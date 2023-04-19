import coffee from "../assets/coffee.svg";
import Colaborador from "./Colaborador";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <header className={styles.header}>
        <img src={coffee} alt="Xícara de Café" className={styles.coffee} />
        <h1 className={styles.frase}>Café da Manhã</h1>
      </header>
      <main>
        <p>19/04/2023</p>
        <Colaborador />
      </main>
    </>
  );
}

export default Home;
