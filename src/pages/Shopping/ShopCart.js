import React, { useEffect, useState } from 'react';
import ProductList from '../Marketplace/ProductList';
import { useLocalStorage } from '../../components/Hooks/useLocalStorage';


const ShopCart = () => {

  const [selectedProducts, setSelectedProducts] = useLocalStorage("product","");
  const [total, setTotal] = useState(0);
  const [CartInfo, setCartInfo] = useLocalStorage("product","");

  if (!Array.isArray(selectedProducts)) {
    setSelectedProducts([]);
  }
  

  const handleAddToCartWithQuantity = (product, quantity) => {
    // Manejar la lógica de agregar al carrito con cantidad
    handleAddToCart(product, quantity);
  
    // Obtener el valor actualizado directamente del localStorage
    const currentSelectedProducts = JSON.parse(localStorage.getItem("product")) || [];
  
    // Actualizar la cantidad del producto en el carrito
    const existingProduct = currentSelectedProducts.find((item) => item.id === product.id);
  
    if (existingProduct) {
      const updatedCart = currentSelectedProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
      );
      setSelectedProducts(updatedCart);
    } else {
      setSelectedProducts([...currentSelectedProducts, { ...product, quantity }]);
    }
  
    // Recalcular el total
    const newTotal = currentSelectedProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
    setTotal(newTotal + product.price * quantity);
  };

  const handleDeleteFromCart = (productId) => {
    // Eliminar el producto del carrito
    const updatedCart = selectedProducts.filter((item) => item.id !== productId);
    setSelectedProducts(updatedCart);

    // Recalcular el total
    const newTotal = updatedCart.reduce((acc, p) => acc + p.price * p.quantity, 0);
    setTotal(newTotal);
  };

  const handleBuy = () => {
    // Aquí puedes implementar la lógica para la compra
    alert('Compra exitosa');
    setSelectedProducts([]);
    setTotal(0);
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {/* Renderizar el componente ProductList y pasar las props necesarias */}
      {/* <label key='productID' onChange={e => setCartInfo(e.target.value)} value={CartInfo}></label>  */}

      {/* Formulario para gestionar cantidades */}
      {selectedProducts.map((product) => (
        <div key={product.id}>
          <label>
            Cantidad para {product.name}:
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleAddToCartWithQuantity(product, e.target.value)}
            />
          </label>
        </div>
      ))}

      {/* Mostrar el total */}
      <p>Total: ${total}</p>

      {/* Botones para eliminar y comprar */}
      <button onClick={handleBuy}>Comprar</button>
      {selectedProducts.map(({product}) => (
        <button key={product.id} onClick={() => handleDeleteFromCart(product.id)}>
          Eliminar {product.name} del Carrito
        </button>
      ))}
    </div>
  );
};

export default ShopCart;
