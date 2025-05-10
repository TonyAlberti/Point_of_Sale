// TeclasDeAtalho.tsx

import axios from "axios";
import { useEffect } from "react";

interface TeclasDeAtalhosProps {
  aoDeletarUltimoItem: () => void;
  onToggleTroco: () => void;
  onImprimir: () => void;
  valorRecebido: number;
  total: number;
}

const abreGaveta = async () => {
  try {
    await axios.get("http://localhost:3000/gaveta");
  } catch (erro) {
    console.error("Erro ao abrir a gaveta:", erro);
  }
};

export function TeclasDeAtalhos({
  aoDeletarUltimoItem,
  onToggleTroco,
  onImprimir,
  valorRecebido,
  total,
}: TeclasDeAtalhosProps) {
  useEffect(() => {
    const lidarComTeclaPressionada = (evento: KeyboardEvent) => {
      if (evento.key === "'") {
        // Quando a tecla ' for pressionada
        evento.preventDefault();

        // Verifique se o valor recebido é suficiente antes de imprimir
        if (valorRecebido >= total) {
          onImprimir(); // Se for, chama a função de impressão
        }
      }

      if (evento.key === "e" || evento.key === "E") {
        // Quando a tecla 'e' for pressionada
        evento.preventDefault();
        aoDeletarUltimoItem(); // Chama a função para deletar o último item
      }

      if (evento.key === "g" || evento.key === "G") {
        // Quando a tecla 'e' for pressionada
        evento.preventDefault();
        abreGaveta(); // Chama a função para deletar o último item
      }

      if (evento.key === "s" || evento.key === "S") {
        // Quando a tecla 's' for pressionada
        evento.preventDefault();
        // Coloca o foco no campo de valor recebido
        onToggleTroco(); // Alterna a visibilidade do formulário de troco
      }
    };

    window.addEventListener("keydown", lidarComTeclaPressionada);

    return () => {
      window.removeEventListener("keydown", lidarComTeclaPressionada);
    };
  }, [aoDeletarUltimoItem, onToggleTroco, onImprimir, valorRecebido, total]);

  return null;
}
