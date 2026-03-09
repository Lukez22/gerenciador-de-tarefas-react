import "./TarefaConcluida.css";
import { Check, X } from "lucide-react";

function TarefaConcluida({ tarefa, onRemover }) {
  return (
    <div className="tarefa-concluida">
      <div className="nome-tarefa">
        <Check size={24} className="icone-check" color="#00ff00" />
        <p>{tarefa.texto}</p>
      </div>

      <div className="remover-tarefa">
        <X size={20} className="icone-x" onClick={() => onRemover()} />
      </div>
    </div>
  );
}

export default TarefaConcluida;
