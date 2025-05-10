import { useEffect, useState } from "react";
import { Item } from "../types";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
// import { Form } from './ui/form';
import { Input } from "./ui/input";

interface ItemFormProps {
  onAddItem: (item: Omit<Item, "id" | "name">) => void;
}
export function ItemForm({ onAddItem }: ItemFormProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity == 0) {
      setQuantity(1);
    }
    onAddItem({ quantity, price });
    setQuantity(1);
    setPrice(0);
  };

  // run a function called foo when * is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "*") {
        if (price == 0) {
          setPrice(1);
        }
        const newQuantity = price || 1;
        setQuantity(newQuantity);
        setPrice(0);
        document.getElementById("price")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [price]);
  const handleToggleTroco = (e: CustomEvent<any>) => {
    if (e.detail) {
      document.getElementById("price")?.focus();
    }
  };

  window.addEventListener("toggleTroco", handleToggleTroco as EventListener);

  return (
    //TODO lado DIREITO DA PAGINA
    <Card className="fixed w-full p-6 text-gray-100 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl top-80 ">
      <CardHeader>
        <CardTitle>Adicionar Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-4 p-4">
          <label htmlFor="quantity" className="text-sm font-medium text-white">
            Quantidade
          </label>
          {quantity}
          {/* <Input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-24 text-black"
            required
          /> */}
          <label htmlFor="price" className="text-sm font-medium text-white">
            Preço
          </label>
          <Input
            type="number"
            id="price"
            min="0"
            // step="1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-32 text-black"
            required
            autoComplete="false"
          />
          {/* MARK: BOTAO DE ENVIO */}
          <Button
            type="submit"
            className="font-semibold text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
          >
            Adicionar Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
