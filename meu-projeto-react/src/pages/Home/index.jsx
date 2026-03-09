import TarefaConcluida from "../../components/TarefaConcluida/TarefaConcluida.jsx";
import TarefaPendente from "../../components/TarefaPendente/TarefaPendente.jsx";
import "./style.css";
import { Sun, Moon, Plus } from "lucide-react";
import { useState, useEffect } from "react";

function Home() {
  const [tarefas, setTarefas] = useState(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const [tarefaInput, setTarefaInput] = useState("");

  const pendentes = tarefas.filter((tarefa) => !tarefa.concluida);
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida);

  const total = tarefas.length;

  const porcentagem = total === 0 ? 0 : (concluidas.length / total) * 100;

  const [temaEscuro, setTemaEscuro] = useState(() => {
    const temaSalvo = localStorage.getItem("tema");
    return temaSalvo === "escuro" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("tema", temaEscuro ? "escuro" : "");
  }, [temaEscuro]);

  function adicionarTarefa() {
    if (tarefaInput.trim() === "") return;

    const novaTarefa = {
      id: Date.now(),
      texto: tarefaInput,
      concluida: false,
    };

    setTarefas([...tarefas, novaTarefa]);
    setTarefaInput("");
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: true } : tarefa,
      ),
    );
  }

  function excluirTarefa(id) {
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  }

  function editarTarefa(id, novoTexto) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, texto: novoTexto } : tarefa,
      ),
    );
  }

  return (
    <div className={`container ${temaEscuro ? "escuro" : ""}`}>
      <div className={`container-gerenciador ${temaEscuro ? "escuro" : ""}`}>
        <header className="menu">
          <h1>Gerenciador de Tarefas</h1>
          <div className="tema">
            <button
              className="botao-tema"
              onClick={() => setTemaEscuro(!temaEscuro)}
            >
              {temaEscuro ? <Sun color="#ffffff" /> : <Moon color="#ffffff" />}
            </button>
          </div>
        </header>
        <div className="container-add-tarefas">
          <div className="adicionar-tarefa">
            <input
              type="text"
              maxLength={50}
              placeholder="Adicione uma nova tarefa..."
              value={tarefaInput}
              onChange={(e) => setTarefaInput(e.target.value)}
            />
            <button type="button" onClick={adicionarTarefa}>
              <Plus size={21} color="#ffffff" />
              <span className="texto-btn-add">Adicionar</span>
            </button>
          </div>
        </div>
        <div className="tarefas">
          <div className="tarefas-pendentes">
            <h2>Tarefas Pendentes</h2>
            <hr className="linha" />
            <ul>
              {pendentes.length === 0 && (
                <li className="sem-tarefas">Você não possui nenhuma tarefa</li>
              )}
              {pendentes.map((tarefa) => (
                <li key={tarefa.id}>
                  <TarefaPendente
                    tarefa={tarefa.texto}
                    onConcluir={() => concluirTarefa(tarefa.id)}
                    onExcluir={() => excluirTarefa(tarefa.id)}
                    onEditar={(novoTexto) => editarTarefa(tarefa.id, novoTexto)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="tarefas-concluidas">
            <h2>Tarefas Concluídas</h2>
            <hr className="linha" />
            <ul>
              {concluidas.length === 0 && (
                <li className="sem-tarefas">Nenhuma tarefa concluída</li>
              )}
              {concluidas.map((tarefa) => (
                <li key={tarefa.id}>
                  <TarefaConcluida
                    tarefa={tarefa}
                    onRemover={() => excluirTarefa(tarefa.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="contador-tarefas">
          <div className="container-contador">
            <p>
              <b>{pendentes.length}</b> Tarefas Pendentes
            </p>
            <p>
              <b>{concluidas.length}</b> Tarefas Concluídas
            </p>
          </div>
        </div>
        <div className="progresso">
          <div className="container-progresso">
            <div className="barra-progresso">
              <div
                className="progresso-concluido"
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
            <p>{porcentagem.toFixed(2)}% Concluído</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
