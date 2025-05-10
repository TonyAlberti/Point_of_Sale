import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';

export function Rodape() {
  const [dataHora, setDataHora] = useState<string>('');
  useEffect(() => {
    const atualizarDataHora = () => {
      const agora = new Date();
      const dataFormatada = agora.toLocaleString('pt-BR', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
      });
      setDataHora(dataFormatada);
    };
  
    atualizarDataHora();
    const intervalo = setInterval(atualizarDataHora, 1000); 
    return () => clearInterval(intervalo); 
  }, []);
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-1">
      <Card className="rounded-lg shadow-lg bg-gray-900 p-0 text-center">
        <CardContent>
          <p className="text-lg font-semibold text-white ">{dataHora}</p>
        </CardContent>
      </Card>
    </div>
  );
}
