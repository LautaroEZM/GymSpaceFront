import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  FormControl,
  Input,
  InputAdornment,
  TextareaAutosize,
  Select,
  MenuItem,
} from "@mui/material";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import theme from "../../theme";
import { useNavigate } from "react-router";

const defaultTheme = createTheme();

export default function CreateProduct() {
  const [productData, setProductData] = React.useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    stockNow: 0,
    brand: "",
    image: undefined,
    status: "",
  });

  const [newImage, setNewImage] = React.useState(undefined);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("trying to submit");
      const product = await axios.post(
        "https://gymspace-backend.onrender.com/products",
        productData
      );
      if (product) {
        window.alert("Product created");
        navigate("/Marketplace");
      } else {
        window.alert("Could not create product");
      }
    } catch (error) {
      console.error("Could not create product: ", error.message);
    }
  };

  React.useEffect(() => {
    setProductData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  React.useEffect(() => {
    console.log(productData);
  }, [productData]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          bgcolor: 'transparent', // Set background color to transparent
        }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Product
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <FormControl>
                <TextField
                  name="name"
                  label="Name"
                  fullWidth
                  required
                  autoFocus
                  value={productData.name}
                  onChange={handleChange}
                />
                <TextField
                  name="category"
                  label="Category"
                  fullWidth
                  required
                  value={productData.category}
                  onChange={handleChange}
                />
                <TextField
                  name="brand"
                  label="Brand"
                  fullWidth
                  required
                  value={productData.brand}
                  onChange={handleChange}
                />
              </FormControl>
              <PhotoUpload photo={newImage} setPhoto={setNewImage} />
              <TextareaAutosize
                aria-label="Minimum height"
                name="description"
                minRows={3}
                placeholder="Description"
                fullWidth
                required
                value={productData.description}
                onChange={handleChange}
              />
              <Select
                label="Status"
                name="status"
                fullWidth
                required
                value={productData.status}
                onChange={handleChange}
              >
                <MenuItem value={"available"}>Available</MenuItem>
                <MenuItem value={"unavailable"}>Unavailable</MenuItem>
              </Select>
              <TextField
                name="stockNow"
                label="Stock now"
                type="number"
                fullWidth
                required
                value={productData.stockNow}
                onChange={handleChange}
              />
              <Input
                name="price"
                type="number"
                fullWidth
                required
                value={productData.price}
                onChange={handleChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color={theme.primary}
              >
                Create Product
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
