import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";
import { buildReq, getUUID } from "../../utils/auth0Utils";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { DatePicker } from "@mui/x-date-pickers";
import Container from "@mui/material/Container";
import { getDate, getDateTimestamp } from "../../utils/shopCartUtils";
import dayjs from "dayjs";
import Card from '@mui/material/Card';
import  { Box }  from "@mui/material";
import { CardMedia } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ShopCart = () => {
  const [productsCart, setproductsCart] = useLocalStorage("product", []);
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
      
      newServices[i]["startDate"] = dayjs(value);
    }if(!timestamp){
      alert('No se a introducido una fecha de inicio')
    } else {
      newServices[i]["startDate"] = dayjs();
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
        (item) => item.productID !== prodServ.productID
      );
      console.log(updatedCart)
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
      
      const { data } = await axios.post(API_URL + "/payments/create-order", {
        userId: userId,
        items: itemsToPay,
      });

      const urlToPay = data.response.init_point;
      console.log(urlToPay)
      if(urlToPay){
        const req = await buildReq({products: productsCart, services:servicesCart},getAccessTokenSilently)
        await axios.put(API_URL + "/cart/"+user.sub,req)
        window.localStorage.clear()
      window.location.href = urlToPay
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{color: "orange", textAlign: "center"}}>Shop Cart</h1>

      {/* Productos */}
      {productsCart && productsCart.length > 0
        ? productsCart.map((product, i) => (
            <div key={i}>
              <div>
                <Card sx={{ display: 'flex', backgroundColor:"white", border:"orange 2px solid"}}>

                <Box sx={{ width: "90%", marginBottom: "40px", display:"flex",flexDirection:"row" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={product.image}
                  style={{
                    color: "#fff",
                    fontStyle: "italic",
                    fontSize: "14px",
                  }}
                  />
                <h3 style={{ marginLeft:"30px", marginTop:"50px"}}>{product.name}</h3>
                <input
                  type="number"
                  style={{
                    border: "orange 1px solid",
                    marginTop:"60px",
                    height: "50px",  
                    marginLeft: "200px"                  
                  }}
                  value={product.quantity}
                  onChange={(e) =>
                    handleAddToCartWithQuantity(product, e.target.value, i)
                  }
                  min="0"
                  max={product.stockNow}
                  />
                  <h3 style={{ color: "black", marginLeft: "500px", marginTop:"60px", marginRight:"100px"}}>{product.price} US$</h3>
              <button style={{
                marginTop:"70px",
                width: "50px",
                height: "50px",
              }}
                key={product.id}
                onClick={() => handleDeleteFromCart(product)}
                >
                <DeleteIcon/>
              </button >
              </Box>
              </Card>
              </div>

            </div>
          ))
        : null}
      {/* Services */}
      {servicesCart && servicesCart.length > 0
        ? servicesCart.map((service, i) => (
            <div key={i}>
              <div>
              <Card sx={{ display: 'flex', backgroundColor:"white", border:"orange 2px solid" }}>

              <Box sx={{ width: "90%", marginBottom: "40px", display:"flex",flexDirection:"row" }}>
              <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={service.image}
                  style={{
                    color: "#fff",
                    fontStyle: "italic",
                    fontSize: "14px",
                  }}
                  />
                <h3 style={{ marginLeft:"30px"}}>{service.name}</h3>
                <input
                  type="number"
                  style={{
                    border: "orange 1px solid",
                    marginTop:"60px",
                    height: "50px",
                    marginLeft: "400px"
                  }}  
                  value={service.quantity}
                  onChange={(e) =>
                    handleAddToCartWithQuantity(service, e.target.value, i)
                  }
                />
                  <h3 style={{ color: "black", marginLeft: "400px", marginTop:"60px", marginRight:"100px"}}>{service.price} US$</h3>
              <button style={{
                marginTop:"70px",
                width: "50px",
                height: "50px"
              }}
                key={service.id}
                onClick={() => handleDeleteFromCart(service)}
                >
                <DeleteIcon/>
              </button>
              </Box>
              <Container style={{marginTop:"60px" }} maxWidth="xs">
                <DatePicker
                  // className={styles.date}
                  label="Start Date"
                  name="birth"
                  format="YYYY-MM-DD"
                  
                  value={dayjs(service.startDate)}
                  
                  onChange={(e)=>handleDate(e,i)}
                  />
              </Container>
              </Card>
              </div>
            </div>
          ))
        : null}

      {/* Mostrar el total */}
      <p style={{ color: "white", textAlign: "center" }}>Total: ${total}</p>
      <button style={{marginLeft:"50%"}} onClick={handleBuy}>Pay</button>
      {/* Botones para eliminar y comprar */}
    </div>
  );
};

export default ShopCart;
