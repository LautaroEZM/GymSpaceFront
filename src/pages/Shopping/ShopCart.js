import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  AddCircleOutline,
  RemoveCircleOutline,
} from '@mui/icons-material';
import {
  Table,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const navigate = useNavigate();

  const handleIncrement = (record) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === record._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (record) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === record._id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    setSubTotal(total);
  }, [cartItems]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
    },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          height="60"
          width="60"
          style={{ borderRadius: '5px' }} // Estilo en línea para la imagen
        />
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <AddCircleOutline
            style={{ cursor: 'pointer', marginRight: '2px' }} // Estilo en línea para el botón
            onClick={() => handleIncrement(params.row)}
          />
          <Typography variant="subtitle1">{params.value}</Typography>
          <RemoveCircleOutline
            style={{ cursor: 'pointer', marginLeft: '2px' }} // Estilo en línea para el botón
            onClick={() => handleDecrement(params.row)}
          />
        </Box>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <DeleteOutlined
          style={{ cursor: 'pointer' }} // Estilo en línea para el icono
          onClick={() => handleDelete(params.row._id)}
        />
      ),
    },
  ];

  const handleSubmit = async (values) => {
    try {
      const newObject = {
        ...values,
        subTotal: subTotal,
        tax: (subTotal * 0.19).toFixed(2),
        totalAmount: (subTotal + subTotal * 0.19).toFixed(2),
        cartItems: cartItems,
        userId: JSON.parse(localStorage.getItem('auth'))._id,
      };

      const response = await axios.post(
        'http://localhost:8080/api/v1/bills/add-bill',
        newObject
      );

      // Verificar el estado de la respuesta (código HTTP)
      if (response.status === 201) {
        // La factura se generó con éxito

        // Limpiar el carrito después de generar la factura
        setCartItems([]);
        setSubTotal(0);

        // Cerrar el modal y navegar a la página de facturas
        setBillPopup(false);
        navigate('/bills');

        // Mensaje de éxito
        console.log('Bill Generated Successfully');
      } else {
        // Manejar otros estados de respuesta según sea necesario
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      console.error('Something went wrong', error);
    }
  };

  return (
    <>
      <h1>Cart Page</h1>
      <Table columns={columns} rows={cartItems} autoHeight />
      <Box display="flex" flexDirection="column" alignItems="flex-end" mt={2}>
        <Typography variant="h6">Sub Total: {subTotal}</Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#ff9721', color: 'white', borderRadius: '5px' }} // Estilo en línea para el botón
          onClick={() => setBillPopup(true)}
        >
          Create Invoice
        </Button>
        <Modal
          open={billPopup}
          onClose={() => setBillPopup(false)}
          aria-labelledby="create-invoice-modal"
        >
          <Box p={3}>
            <Typography variant="h4">Create Invoice</Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                label="Customer Name"
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{ style: { color: 'white' } }} // Estilo en línea para el color del texto
                InputLabelProps={{ style: { color: 'white' } }} // Estilo en línea para el color de la etiqueta
              />
              <TextField
                label="Customer Contact"
                fullWidth
                variant="outlined"
                margin="normal"
                InputProps={{ style: { color: 'white' } }} // Estilo en línea para el color del texto
                InputLabelProps={{ style: { color: 'white' } }} // Estilo en línea para el color de la etiqueta
              />
              <Select
                fullWidth
                variant="outlined"
                label="Payment Method"
                style={{ color: 'white' }} // Estilo en línea para el color del texto
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="digital">Digital</MenuItem>
              </Select>
              <Box mt={2}>
                <Typography variant="h6">Sub Total: {subTotal}</Typography>
                <Typography variant="h5">
                  I.V.A: <b> {(subTotal * 0.19).toFixed(2)}</b>
                </Typography>
                <Typography variant="h4">
                  TOTAL: <b>{Number(subTotal) + Number((subTotal * 0.19).toFixed(2))}</b>
                </Typography>
              </Box>
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#ff9721', color: 'white', borderRadius: '5px' }} // Estilo en línea para el botón
                  onClick={handleSubmit}
                >
                  Generate Bill
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default CartPage