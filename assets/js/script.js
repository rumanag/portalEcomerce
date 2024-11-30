let cart = JSON.parse(localStorage.getItem('cart')) || [];
 
 
// Manejo de productos dinámico
const products = [
    { id: 1, name: "Laptop", price: 800, img: "pantalla-de-portatil.png" },
    { id: 2, name: "Smartphone", price: 600, img: "smartphone.jpg" },
    { id: 3, name: "Sofá", price: 300, img: "sofa.jpg" },
    { id: 4, name: "Lámpara", price: 50, img: "lamp.jpg" },
    { id: 5, name: "Bicicleta", price: 150, img: "bike.jpg" },
    { id: 6, name: "Balón de fútbol", price: 30, img: "football.jpg" },
  ];
 
  // Agregar producto al carrito
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.dataset.id);
      const product = products.find(p => p.id === productId);
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${product.name} añadido al carrito.`);
    });
  });
 
// Función para añadir productos al carrito
//function addToCart(name, price) {
//  cart.push({ name, price });
//  localStorage.setItem('cart', JSON.stringify(cart));
//  alert(`${name} añadido al carrito.`);
// }
 
// Función para cargar los productos del carrito en carrito.html
function loadCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; // Limpia el contenedor
  let total = 0;
 
  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(div);
    total += parseFloat(item.price);
  });
 
  cartTotal.textContent = total.toFixed(2);
}
 
// Función para eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartItems();
}
 
// Función para cargar el resumen de la compra en compra.html
function loadPurchaseDetails() {
  const purchaseDetails = document.querySelector('.purchase-details');
  let total = 0;
 
  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} - $${item.price}</p>`;
    purchaseDetails.appendChild(div);
    total += parseFloat(item.price);
  });
 
  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  purchaseDetails.appendChild(totalDiv);
}
 
// Evento: añadir al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
  });
});
 
// Evento: proceder al pago
if (document.querySelector('.proceed-to-checkout')) {
  document.querySelector('.proceed-to-checkout').addEventListener('click', () => {
    window.location.href = 'compra.html';
  });
}
 
// Carga dinámica en las páginas
if (document.querySelector('.cart-items')) {
  loadCartItems();
}
 
if (document.querySelector('.purchase-details')) {
  loadPurchaseDetails();
}
 