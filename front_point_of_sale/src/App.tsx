import { useEffect, useState } from "react";
// import { CaixaResumo } from './components/CaixasResumo';
import axios from "axios";
import { ItemForm } from "./components/ItemForm";
// import { ItemList } from './components/ItemList';
import { ResumoPagamento } from "./components/ResumoPagamento";
import { Rodape } from "./components/Rodape.js";
import { TeclasDeAtalhos } from "./components/TeclasDeAtalho.js";
import { addItem, cleanCart, getCart, updateCart } from "./storage/db.js";
import { Item } from "./types";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [mostrarTroco, setMostrarTroco] = useState<boolean>(false); // Estado para controlar a exibição do formulário de troco
  const [valorRecebido, setValorRecebido] = useState<number>(0); // Valor recebido do cliente
  // calcula o total das comprass

  // Função para adicionar um item
  const handleAddItem = (newItem: Omit<Item, "id" | "name">) => {
    const item: Item = {
      id: crypto.randomUUID(),
      name: "Diversos", // Nome fixo para todos os itens
      ...newItem,
    };
    item.price = item.price / 100;
    setItems([...items, item]);
    addItem(item);
  };

  // Função para limpar todos os itens
  const handleClearList = () => {
    setItems([]);
    cleanCart();
  };

  // Função para deletar o último item da lista
  const handleDeleteLastItem = () => {
    if (items.length > 0) {
      // Remove o último item usando slice
      setItems(items.slice(0, items.length - 1));
      updateCart(items.slice(0, items.length - 1));
    }
  };

  const handlePrint = () => {
    const total = items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const troco = valorRecebido / 100 - total;

    const body = {
      items,
      troco,
    };

    if (troco >= 0) {
      axios
        .post("http://localhost:3000/print", body)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    setItems(getCart().items);
    // cleanCart();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "p") {
        // handlePrint();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Função para alternar a visibilidade do formulário do troco
  const handleToggleTroco = () => {
    setMostrarTroco((prev) => !prev);
    // Dispara um evento customizado
    const event = new CustomEvent("toggleTroco", { detail: mostrarTroco });
    window.dispatchEvent(event);
  };
  return (
    <div>
      {/* TODO Parte da esquerda */}
      {/* tecla de atalho */}
      <TeclasDeAtalhos
        aoDeletarUltimoItem={handleDeleteLastItem}
        onToggleTroco={handleToggleTroco} // Passa a função handleToggleTroco
        onImprimir={handlePrint} // Passa a função handlePrint
        valorRecebido={valorRecebido} // Passa o valor recebido
        total={items.reduce(
          (total, item) => total + item.quantity * item.price,
          0
        )} // Calcula o total
      />{" "}
      {mostrarTroco && (
        <div className="absolute bottom-50 left-0 w-1/2 p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
          <ResumoPagamento
            total={items.reduce(
              (total, item) => total + item.quantity * item.price,
              0
            )}
            valorRecebido={valorRecebido}
            setValorRecebido={setValorRecebido}
          />
        </div>
      )}
      <div className="flex">
        <div
          className="flex flex-col w-1/2 p-2 space-y-6"
          style={{ maxHeight: "80vh" }}
        >
          {/* TODO cupom */}
          {/* MARK: cupom */}
          <div className="p-6 text-gray-100 bg-gray-800 border border-gray-600 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-extrabold text-center text-white">
              Mercadinho Livradam
            </h2>
            <div className="mt-2 font-semibold text-white text-x1">
              Quantidade de Produtos:
              {items.reduce((total, item) => total + item.quantity, 0)}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-300">CNPJ: 123.456.789-00</p>
              <p className="text-sm text-gray-300">Obrigado por sua compra!</p>
              <div className="my-4 border-t border-gray-600"></div>
              <div style={{ maxHeight: "35vh", overflowY: "auto" }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-lg font-medium"
                  >
                    <span className="w-1/4 text-gray-200">
                      {item.quantity + "X"}
                    </span>
                    <span className="w-1/2 text-gray-200">{item.name}</span>
                    <span className="w-1/4 text-right text-gray-100">
                      R$ {item.price.toFixed(2).split(".").join(",")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="my-4 border-t border-gray-500"></div>
              <div className="text-2xl font-bold text-gray-100">
                Total: R${" "}
                {items
                  .reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                  )
                  .toFixed(2)
                  .split(".")
                  .join(",")}
              </div>
            </div>
          </div>
        </div>

        {/* TODO Parte da direita:  */}
        {/* MARK: Parte da direita:  */}
        <div className="w-1/2 p-2">
          <ItemForm onAddItem={handleAddItem} />

          <button
            onClick={handleClearList}
            className="w-full px-4 py-2 font-semibold text-white transition-all  bg-red-600 rounded-lg shadow-md hover:bg-red-800 focus:ring-2 focus:ring-red-400"
          >
            Limpar Lista
          </button>
          <button
            onClick={handleDeleteLastItem}
            className="w-full px-4 py-2 font-semibold text-white transition-all  bg-blue-700 rounded-lg shadow-md hover:bg-blue-900 focus:ring-2 focus:ring-blue-300"
          >
            Deletar Último Item
          </button>

          <button
            onClick={handlePrint}
            className="w-full px-4 py-2 font-semibold text-white transition-all bg-orange-500 rounded-lg shadow-md hover:bg-orange-800 focus:ring-2 focus:ring-blue-300"
          >
            imprimir
          </button>
          <div className="w-full p-6 mt-6 text-white bg-gray-900 rounded-lg shadow-lg">
            <div className="text-2xl font-bold text-center">
              Total: R${" "}
              {items
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)
                .split(".")
                .join(",")}
            </div>
          </div>
        </div>
      </div>
      <Rodape />
    </div>
  );
}
export default App;
