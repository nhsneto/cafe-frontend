import { MdAddCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Input from "./Input";
import styles from "./InputOpcoes.module.css";

function InputOpcoes({
  opcao,
  opcaoList,
  setterOpcaoList,
  onChange,
}) {
  function isOpcaoExistente(opcao, opcoes) {
    for (const current of opcoes) {
      if (current.toUpperCase() === opcao.toUpperCase()) {
        return true;
      }
    }

    return false;
  }

  return (
    <div className={styles.container}>
      <div>
        <Input
          label="Opção"
          id="opcao"
          type="text"
          placeholder="Pão"
          value={opcao}
          onClick={(e) => (e.target.value = "")}
          onChange={onChange}
        />
        <MdAddCircle
          className={styles.botaoAdicionar}
          onClick={() => {
            if (opcao && !isOpcaoExistente(opcao, opcaoList)) {
              setterOpcaoList([...opcaoList, opcao]);
            }
          }}
        />
      </div>

      <div>
        <ul>
          {opcaoList &&
            opcaoList.map((item, i) => (
              <li key={i}>
                {item}{" "}
                <FaTrash
                  className={styles.lixeira}
                  onClick={() => {
                    const arr = [];
                    for (const item of opcaoList) {
                      if (item !== opcao) {
                        arr.push(item);
                      }
                    }
                    setterOpcaoList(arr);
                  }}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default InputOpcoes;
