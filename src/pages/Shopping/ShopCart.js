import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";
import { buildReq, getUUID } from "../../utils/auth0Utils";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { DatePicker } from "@mui/x-date-pickers";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { getDate, getDateTimestamp } from "../../utils/shopCartUtils";

const ShopCart = () => {
  const [productsCart, setproductsCart] = useLocalStorage("product", "[]");
  const [servicesCart, setServicesCart] = useLocalStorage("service", []);
  const [total, setTotal] = useState(
    productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) +
      servicesCart.reduce((acc, p) => acc + p.price * p.quantity, 0)
  );
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    setTotal(
      productsCart.reduce((acc, p) => acc + p.price * p.quantity, 0) +
        servicesCart.reduce((acc, p) => acc + p.price * p.quantity, 0)
    );
  }, [productsCart, servicesCart]);

  const handleDate = (value,i) => {
    const timestamp = value.$d.getTime()
    
    const newServices = [...servicesCart];
    if(timestamp>Date.now()){
      
      newServices[i]["startDate"] = value;
    } else {
      newServices[i]["startDate"] = "";
    }
      setServicesCart(newServices);
  }
  const handleAddToCartWithQuantity = (item, quantity, i) => {
    const { serviceID } = item;
    if (serviceID) {
      const newServices = [...servicesCart];
      newServices[i]["quantity"] = parseInt(quantity);
      setServicesCart(newServices);
    } else {
      const newproducts = [...productsCart];
      newproducts[i]["quantity"] = parseInt(quantity);
      setproductsCart(newproducts);
    }
  };

  const handleDeleteFromCart = (prodServ) => {
    // Eliminar el producto del carrito
    const { serviceID } = prodServ;
    if (serviceID) {
      const updatedCart = servicesCart.filter(
        (item) => item.serviceID !== prodServ.serviceID
      );

      setServicesCart(updatedCart);
    } else {
      const updatedCart = productsCart.filter(
        (item) => item.productID !== prodServ.productId
      );

      setproductsCart(updatedCart);
    }
  };

  const handleBuy = async () => {
    // Aquí puedes implementar la lógica para la compra
    try {
      let itemsToPay = productsCart.map((item) => {
        return {
          id: item.productID,
          quantity: item.quantity,
        };
      });
      itemsToPay = [
        ...itemsToPay,
        ...servicesCart.map((item) => {
          let {startDate} = item
          !startDate ? startDate = new Date():startDate =new Date(startDate)
          let finishDate = startDate.getTime() + (item.quantity * 30 + 1) * 24 * 60 * 60 * 1000
          startDate = getDate(startDate)
          finishDate = getDateTimestamp(finishDate)
          
          return {
            id: item.serviceID,
            quantity: item.quantity,
            startDate: startDate,
            finishDate: finishDate,
            days_notice: 2,
          };
        }),
      ];
      const userId = await getUUID(user.sub);
      console.log(itemsToPay);
      const { data } = await axios.post(API_URL + "/payments/create-order", {
        userId: userId,
        items: itemsToPay,
      });

      const urlToPay = data.response.init_point;
      const external_reference = data.response.external_reference;
      window.open(urlToPay, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Shop Cart</h1>

      {/* Productos */}
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
                    handleAddToCartWithQuantity(product, e.target.value, i)
                  }
                />
              </div>

              <button
                key={product.id}
                onClick={() => handleDeleteFromCart(product)}
              >
                Delete
              </button>
            </div>
          ))
        : null}
      {/* Services */}
      {servicesCart && servicesCart.length > 0
        ? servicesCart.map((service, i) => (
            <div key={i}>
              <div>
                <h3>{service.name}</h3>
                <img src={service.image} />
                <h3 style={{ color: "white" }}>{service.price} US$</h3>
                <input
                  type="number"
                  value={service.quantity}
                  onChange={(e) =>
                    handleAddToCartWithQuantity(service, e.target.value, i)
                  }
                />
              </div>
              <Container maxWidth="xs">
                <DatePicker
                  // className={styles.date}
                  label="Start Date"
                  name="birth"
                  format="YYYY-MM-DD"
                  
                  value={service.startDate}
                  
                  onChange={(e)=>handleDate(e,i)}
                />
              </Container>
              <button
                key={service.id}
                onClick={() => handleDeleteFromCart(service)}
              >
                Delete
              </button>
            </div>
          ))
        : null}

      {/* Mostrar el total */}
      <p style={{ color: "white" }}>Total: ${total}</p>
      <button onClick={handleBuy}>Pay</button>
      {/* Botones para eliminar y comprar */}
    </div>
  );
};

export default ShopCart;
