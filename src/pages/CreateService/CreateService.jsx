import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    startTime: "",
    duration: "",
    image: "", // Agregado para la imagen
    status: "",
    coachID: "",
    capacity: "",
    areaID: "1",
  });
  

  const [coaches, setCoaches] = useState([]);
  const [newImage, setNewImage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get("https://gymspace-backend.onrender.com/Coaches");
        const { data } = response;
        if (data) setCoaches(data);
      } catch (error) {
        window.alert("No se pudieron cargar los entrenadores: " + error.message);
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    setServiceData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setServiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTimeChange = (event) => {
    const { value } = event.target;

    // Verificar que el valor esté dentro del rango de 1 a 24
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 24) {
      setServiceData((prevData) => ({ ...prevData, startTime: `${parsedValue}` }));
    } else {
      // Mostrar una alerta o tomar alguna acción en caso de valor no válido
      window.alert("Por favor, ingrese una hora válida entre 1 y 24.");
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://gymspace-backend.onrender.com/Services", serviceData);
      window.alert("Servicio creado");

      // Navegar a la ruta /Marketplace después de crear el servicio
      navigate("/Marketplace");
    } catch (error) {
      window.alert("No se pudo crear el servicio: " + error.message);
    }
  };

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 300,
      }}
    >
      <TextField
        name="name"
        label="Nombre"
        value={serviceData.name}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Descripción"
        value={serviceData.description}
        onChange={handleChange}
      />
      <TextField
        name="category"
        label="Categoría"
        value={serviceData.category}
        onChange={handleChange}
      />
      <TextField
        name="price"
        label="Precio"
        type="number"
        value={serviceData.price}
        onChange={handleChange}
      />
      <PhotoUpload photo={newImage} setPhoto={setNewImage} />
      <TextField
        name="startTime"
        label="Hora de inicio"
        type="number"
        inputProps={{
          min: 1,
          max: 24,
        }}
        value={serviceData.startTime}
        onChange={handleTimeChange}
      />
      <TextField
        name="duration"
        label="Duración"
        type="number"
        value={serviceData.duration}
        onChange={handleChange}
      />
      <InputLabel name="selectStatus">Estado:</InputLabel>
      <Select
        labelId="selectStatus"
        name="status"
        label="Estado"
        value={serviceData.status}
        onChange={handleChange}
      >
        <MenuItem id="status" value={"disponible"}>
          Disponible
        </MenuItem>
        <MenuItem id="status" value={"no disponible"}>
          No Disponible
        </MenuItem>
      </Select>
      <InputLabel name="selectCoachs">Entrenador:</InputLabel>
      <Select
        labelId="selectCoach"
        name="coachID"
        label="Entrenador"
        value={serviceData.coachID}
        onChange={handleChange}
      >
        {coaches
          ? coaches.map((coach, i) => (
            <MenuItem key={i} id="coachID" value={coach.userID}>
              {`${coach.firstName} ${coach.lastName}`}
            </MenuItem>
          ))
          : null}
      </Select>
      <TextField
        name="capacity"
        label="Capacidad"
        type="number"
        value={serviceData.capacity}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color={theme.primary}
        onClick={handleSubmit}
      >
        Crear Clase
      </Button>
    </Container>
  );
}
