# 💻 Point of Sale (POS)

Este é um sistema de **Ponto de Venda (PDV)** moderno e funcional desenvolvido em **React** (frontend) e **Node.js** (backend), ideal para estabelecimentos comerciais como mercadinhos ou lojas de bairro. Ele permite registrar vendas, calcular totais, imprimir comprovantes e gerenciar a lista de itens vendidos em tempo real.

---

## 🧩 Funcionalidades

- Adição de itens com valor e quantidade
- Cálculo automático do total da venda
- Impressão de cupom (com integração via backend)
- Teclas de atalho para ações como:
  - Deletar último item
  - Limpar carrinho
  - Imprimir cupom
  - Abrir formulário de troco
- Simulação de cupom com nome do comércio e CNPJ
- Layout limpo e responsivo com Tailwind CSS

---

## 🛠️ Tecnologias utilizadas

### Front-end
- [React]
- [TypeScript]
- [Tailwind CSS]
- `localStorage` para persistência local
- Axios para requisições HTTP

### Back-end
- [Node.js]
- Express (servidor HTTP simples para impressão)
- Suporte a integração com impressoras via rota `/print`
