import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";
import { buildReq } from "../../utils/auth0Utils";
import { API_URL } from "../../utils/constants";
import axios from "axios"
import { useAuth0 } from "@auth0/auth0-react";

const ShopCart = () => {
  const [productsCart, setproductsCart] = useLocalStorage("product", "[]");
  const [total, setTotal] = useState(
    productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0)
  );
  const {user, getAccessTokenSilently} = useAuth0()

  useEffect(() => {
    setTotal(productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0));
  }, [productsCart]);


  const handleAddToCartWithQuantity = (quantity, i) => {
    const newproducts = [...productsCart];
    newproducts[i]["quantity"] = parseInt(quantity);
    setproductsCart(newproducts);
  };

  const handleDeleteFromCart = (productId) => {
    // Eliminar el producto del carrito
    const updatedCart = productsCart.filter(
      (item) => item.productID !== productId
    );

    setproductsCart(updatedCart);
  };

  const handleBuy = async() => {
    // Aquí puedes implementar la lógica para la compra
    try{
    
    } catch(error) {

    }
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
                <h3 style={{ color: "white" }}>{product.price} US$</h3>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleAddToCartWithQuantity(e.target.value, i)
                  }
                />
              </div>

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
      <p style={{ color: "white" }}>Total: ${total}</p>
      <button onClick={handleBuy}>
        Pagar
      </button>
      {/* Botones para eliminar y comprar */}
    </div>
  );
};

export default ShopCart;
