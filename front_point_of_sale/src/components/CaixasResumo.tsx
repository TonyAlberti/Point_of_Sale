interface CaixaResumoProps {
  titulo: string;
  quantidade: number;
  preco: number;
  total?: number;
  tipo?: 'itens' | 'total' | 'quantidade'; // Para definir o tipo de caixa e aplicar cores diferentes
}

export function CaixaResumo({ titulo, quantidade, preco, total, tipo }: CaixaResumoProps) {
  let bgColor = 'bg-white';
  let borderColor = 'border-gray-300';
  let textColor = 'text-gray-900';

  // Definindo cores diferentes conforme o tipo de caixa
  if (tipo === 'itens') {
    bgColor = 'bg-blue-500';
    borderColor = 'border-blue-400';
    textColor = 'text-white';
  } else if (tipo === 'total') {
    bgColor = 'bg-green-500';
    borderColor = 'border-green-400';
    textColor = 'text-white';
  } else if (tipo === 'quantidade') {
    bgColor = 'bg-yellow-500';
    borderColor = 'border-yellow-400';
    textColor = 'text-white';
  }

  return (
    <div className={`p-4 rounded shadow-md ${bgColor} ${borderColor} border`}>
      <h2 className={`text-xl font-semibold ${textColor}`}>{titulo}</h2>
      {total ? (
        <div className="flex justify-between">
          <span className="text-sm">Total</span>
          <span className={`font-bold text-xl ${textColor}`}>
            R$ {total.toFixed(2).split('.').join(',')}
          </span>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Quantidade</span>
            <span className={`font-medium ${textColor}`}>{quantidade}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm">Valor Unitário</span>
            <span className={`font-medium ${textColor}`}>
              R$ {preco.toFixed(2).split('.').join(',')}
            </span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="text-sm">Valor Total</span>
            <span className={`font-medium ${textColor}`}>
              R$ {(quantidade * preco).toFixed(2).split('.').join(',')}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
