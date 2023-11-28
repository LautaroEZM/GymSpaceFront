import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";

const ShopCart = () => {
  
  const [productsCart, setproductsCart] = useLocalStorage("product", "");
  const [total, setTotal] = useState(productsCart.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  ));

  useEffect(() => {
    setTotal(productsCart.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    ))
  }, [productsCart]);

  const handleAddToCartWithQuantity = (quantity, i) => {
    
    const newproducts = [...productsCart]
    
    newproducts[i]["quantity"] = parseInt(quantity)
    setproductsCart(newproducts)
  };

  const handleDeleteFromCart = (productId) => {
    // Eliminar el producto del carrito
    const updatedCart = productsCart.filter(
      (item) => item.productID !== productId
    );

    setproductsCart(updatedCart);
  };

  const handleBuy = () => {
    // Aquí puedes implementar la lógica para la compra
    alert("Compra exitosa");
    setSelectedProducts([]);
    setTotal(0);
  };

  return (
    <div>
      <h1>Carrito de Compras</h1>
      {/* Renderizar el componente ProductList y pasar las props necesarias */}
      {/* <label key='productID' onChange={e => setCartInfo(e.target.value)} value={CartInfo}></label>  */}

      {/* Formulario para gestionar cantidades */}
      {productsCart && productsCart.length > 0
        ? productsCart.map((product, i) => (
            <div key={i}>
              <div>
                <h3>{product.name}</h3>
                <img src={product.image} />
                <h3 style={{color:"white"}}>{product.price} US$</h3>
                <input type="number" value={product.quantity} 
                onChange=
                {(e)=>handleAddToCartWithQuantity(e.target.value, i)}
                />
              </div>
              
              <button
                onClick={(e) =>
                  handleAddToCartWithQuantity(e.target.value, i)
                }
              >
                Comprar
              </button>
              <button
                key={product.id}
                onClick={() => handleDeleteFromCart(product.productID)}
              >
                Eliminar {product.name} del Carrito
              </button>
            </div>
          ))
        : null}

      {/* Mostrar el total */}
      <p style={{color:"white"}}>Total: ${total}</p>

      {/* Botones para eliminar y comprar */}
    </div>
  );
};

export default ShopCart;
