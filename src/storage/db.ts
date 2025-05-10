const emptyCart = {
  items: [],
};

export const getCart = () => {
  if (localStorage.getItem("cart") && localStorage.getItem("cart") !== null) {
    return JSON.parse(localStorage.getItem("cart") as string);
  } else {
    localStorage.setItem("cart", JSON.stringify(emptyCart));
    return emptyCart;
  }
};

export const cleanCart = () => {
  localStorage.removeItem("cart");
  getCart();
};

export const addItem = (item: any) => {
  const cart = getCart();
  cart.items.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCart = (items: any) => {
  const cart = getCart();
  cart.items = items;
  localStorage.setItem("cart", JSON.stringify(cart));
};
