import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useNavigate } from "react-router-dom";

export default function CreateService() {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    startTime: "",
    duration: "",
    image: "",
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

  const handleTimeChange = (event, fieldName) => {
    const { value } = event.target;

    if (value === '' || (fieldName === 'startTimeHour' && !isNaN(value) && value >= 0 && value <= 23) ||
      (fieldName === 'startTimeMinute' && !isNaN(value) && value >= 0 && value <= 59)) {
      setServiceData((prevData) => {
        const updatedTime = {
          ...prevData,
          [fieldName]: value,
        };
        // Formatear la cadena de tiempo
        if (updatedTime.startTimeHour !== undefined && updatedTime.startTimeMinute !== undefined) {
          updatedTime.startTime = formatTime(updatedTime.startTimeHour, updatedTime.startTimeMinute);
        }
        return updatedTime;
      });
    }
  };

  function formatTime(hour, minute) {
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://gymspace-backend.onrender.com/Services", serviceData);
      window.alert("Servicio creado");

      navigate("/Services");
    } catch (error) {
      window.alert("No se pudo crear el servicio: " + error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "white",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid white",
          width: "70%",
          textAlign: "center",
          backgroundColor: "#212020",
          padding: 4,
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5" marginTop="10px">
          Create a new service
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="name"
            label="Name"
            fullWidth
            required
            autoFocus
            value={serviceData.name}
            onChange={handleChange}
            sx={{
              marginTop: "10px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />

          <TextField
            name="category"
            label="Category"
            fullWidth
            required
            autoFocus
            value={serviceData.category}
            onChange={handleChange}
            sx={{
              marginTop: "10px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            required
            value={serviceData.description}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            required
            value={serviceData.price}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <TextField
            name="capacity"
            label="Capacity"
            type="number"
            fullWidth
            required
            value={serviceData.capacity}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <TextField
            name="duration"
            label="Duration"
            type="number"
            fullWidth
            required
            value={serviceData.duration}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <Container>
            <TextField
              name="startTimeHour"
              label="Hour"
              type="number"
              fullWidth
              required
              value={serviceData.startTimeHour}
              onChange={(event) => handleTimeChange(event, "startTimeHour")}
              sx={{
                margin: "2px",
                width: "100px",
                marginTop: '10px',
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff9721',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  '&.Mui-focused': {
                    color: '#ff9721',
                  },
                },
              }}
            />

            <TextField
              name="startTimeMinute"
              label="Min"
              type="number"
              fullWidth
              required
              value={serviceData.startTimeMinute}
              onChange={(event) => handleTimeChange(event, "startTimeMinute")}//
              sx={{
                margin: "2px",
                width: "100px",
                marginTop: '10px',
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#ff9721',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                  '&.Mui-focused': {
                    color: '#ff9721',
                  },
                },
              }}
            />
            <Typography variant="body2" sx={{ marginLeft: '8px', color: 'transparent', marginTop: '10px' }}>
              Start Time: {serviceData.startTime}
            </Typography>
          </Container>
          <PhotoUpload photo={newImage} setPhoto={setNewImage} />

          <Typography component="h1" variant="h5" marginTop="10px">
            STATUS
          </Typography>
          <RadioGroup
            aria-label="Status"
            name="status"
            value={serviceData.status}
            onChange={handleChange}
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '10px',
              '& .Mui-checked': {
                color: '#ff9721', // Cambia el color del icono cuando está seleccionado
              },
            }}
          >
            <FormControlLabel
              value="available"
              control={<Radio sx={{ color: 'white' }} />}
              label="Available"
            />
            <FormControlLabel
              value="unavailable"
              control={<Radio sx={{ color: 'white' }} />}
              label="Unavailable"
            />
          </RadioGroup>

          <InputLabel name="selectCoachs">TRAINER</InputLabel>
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

        </Box>
        <Button
          variant="contained"
          color="orangeButton"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Create Service
        </Button>
      </Box>
    </Container>
  );
}
