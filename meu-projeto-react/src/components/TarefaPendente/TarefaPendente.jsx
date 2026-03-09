import { Pencil, Trash2, Check } from "lucide-react";
import "./TarefaPendente.css";
import { useState } from "react";

function TarefaPendente({ tarefa, onConcluir, onExcluir, onEditar }) {

  const [editando, setEditando] = useState(false);

  const [textoEditado, setTextoEditado] = useState(tarefa);

  return (
    <div className="tarefa-pendente">
      <div className="tarefa">
        <Check className="btn concluido" onClick={onConcluir} />
        {editando ? (
          <input
            type="text"
            size={15}
            value={textoEditado}
            onChange={(e) => setTextoEditado(e.target.value)}
          />
        ) : (
          <p>{tarefa}</p>
        )}
      </div>

      <div className="acoes-tarefa">
        {editando ? (
          <Check
            className="btn"
            size={24}
            color="#00ff00"
            onClick={() => {
              setEditando(false);
              onEditar(textoEditado);
            }}
          />
        ) : (
          <Pencil
            className="btn"
            size={24}
            color="#0000ff"
            onClick={() => setEditando(true)}
          />
        )}

        <Trash2 className="btn" size={24} color="#ff0000" onClick={onExcluir} />
      </div>
    </div>
  );
}

export default TarefaPendente;
