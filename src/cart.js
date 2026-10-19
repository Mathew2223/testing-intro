function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }
  if (quantity > product.stock) {
    throw new RangeError("Превышен остаток на складе");
  }
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    if (existingItem.quantity + quantity > product.stock) {
      throw new RangeError("Превышен остаток на складе");
    }
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }
  return cart;
}
function changeQuantity(cart, productId, newQuantity) {
  if (newQuantity <= 0) {
    throw new RangeError("Количество должно быть больше нуля");
  }
  const item = cart.find((item) => item.id === productId);
  if (!item) {
    return cart;
  }
  if (newQuantity > item.stock) {
    throw new RangeError("Превышен остаток на складе");
  }
  item.quantity = newQuantity;
  return cart;
}
function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}
function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  let discount = 0;
  if (promoCode === "SAVE10" && subtotal >= 20000) {
    discount = subtotal * 0.1;
  }
  let delivery = 0;
  if (subtotal < 50000) {
    delivery = 30000;
  }
  const total = subtotal - discount + delivery;
  return { subtotal, discount, delivery, total };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
