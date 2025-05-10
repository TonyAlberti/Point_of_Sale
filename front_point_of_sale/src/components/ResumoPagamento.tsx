import React, { useEffect } from "react";

type ResumoPagamentoProps = {
  total: number; // Total da compra em centavos
  valorRecebido: number; // Valor recebido (em centavos)
  setValorRecebido: React.Dispatch<React.SetStateAction<number>>; // Função para atualizar o valor recebido
};

export function ResumoPagamento({
  total,
  valorRecebido,
  setValorRecebido,
}: ResumoPagamentoProps) {
  useEffect(() => {
    document.getElementById("valorRecebido")?.focus();
  }, []);
  // Converte o valor recebido para reais (centavos para reais)
  const valorRecebidoEmReais = valorRecebido / 100;

  // Calcula o troco (em reais)
  const troco = valorRecebidoEmReais > total ? valorRecebidoEmReais - total : 0;

  // Calcula o valor faltante para completar (em reais)
  const faltaParaPagar = total - valorRecebidoEmReais;

  const textoTroco = `R$ ${troco.toFixed(2).replace(".", ",")}`;
  return (
    <div className="p-10  bg-gray-800 border border-gray-600 rounded-lg shadow-md text-gray-100">
      <h2 className="mb-4 text-xl font-bold text-center">
        Resumo de Pagamento
      </h2>
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-lg">Total da Compra:</span>
        <span>R$ {total.toFixed(2).split(".").join(",")}</span>{" "}
        {/* Total em centavos */}
      </div>
      <div className="mb-4">
        <label
          htmlFor="valorRecebido"
          className="block mb-2 font-medium text-lg"
        >
          Valor Recebido
        </label>
        <input
          id="valorRecebido"
          type="number"
          min={0}
          value={valorRecebido}
          onChange={(e) => setValorRecebido(Number(e.target.value))}
          className="w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Exibe o troco se o valor recebido for maior que o total */}
      {valorRecebidoEmReais >= total && (
        <div className="flex items-center text-lg mt-4">
          <span className="font-semibold mt-0">TROCO</span>
          <div className="flex-grow border-t-2 border-white mx-4"></div>
          <div className=" min-w-40 text-center font-bold border-2 border-green-500 bg-green-600 text-black px-4 py-2 rounded-lg text-xl">
            {textoTroco}
            {/* R$ {troco.toFixed(2).replace(".", ",")} */}
          </div>
        </div>
      )}

      {/* Exibe a diferença caso o valor recebido seja menor que o total */}
      {faltaParaPagar > 0 && (
        <div className="flex items-center text-lg mt-4">
          <span className="font-semibold mt-0">FALTA</span>
          <div className="flex-grow border-t-2 border-white mx-4"></div>
          <span className=" min-w-40 text-center font-bold border-2 border-red-500 bg-red-600 text-white px-4 py-2 rounded-lg text-xl">
            R$ {faltaParaPagar.toFixed(2).replace(".", ",")}
          </span>
        </div>
      )}
    </div>
  );
}
