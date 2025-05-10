// import { Item } from '../types';

// interface ItemListProps {
//   items: Item[];
// }

// export function ItemList({ items }: ItemListProps) {
//   const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

//   return (
//     <div>
//       <h1>/////////////PARTE ESQUEDAR DA PAGINA </h1>
//       <table className="w-full mb-4">
//         <thead>
//           <tr className="border-b">
//             <th className="py-2 text-left">Item</th>
//             <th className="py-2 text-right">Quantidade</th>
//             <th className="py-2 text-right">Preço Unit.</th>
//             <th className="py-2 text-right">Subtotal</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id} className="border-b">
//               <td className="py-2">{item.name}</td>
//               <td className="py-2 text-right">{item.quantity}</td>
//               <td className="py-2 text-right">R$ {item.price.toFixed(2).split('.').join(',')}</td>
//               <td className="py-2 text-right">
//                 R$ {(item.quantity * item.price).toFixed(2).split('.').join(',')}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="text-xl font-bold text-right">
//         Total: R$ {total.toFixed(2).split('.').join(',')}
//       </div>
//     </div>
//   );
// }