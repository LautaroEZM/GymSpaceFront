import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
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
import { useSelector } from "react-redux";

export default function CreateService() {
  const user = useSelector((state) => state.user);

  const loading =
    "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

  const navigate = useNavigate();

  if (user.systemRole === "User" || user.systemRole === "Guest") navigate("/");

  const coachName = `${user.firstName} ${user.lastName}`;

  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    startTime: "",
    duration: 0,
    image: "",
    status: "",
    coachID: user.systemRole === "Coach" ? user.userID : "Select a coach",
    capacity: "",
    areaID: "1",
  });

  const [coaches, setCoaches] = useState(null);
  const [newImage, setNewImage] = useState(undefined);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await axios.get(
          "https://gymspace-backend.onrender.com/coaches"
        );
        const { data } = response;
        if (data) setCoaches(data);
      } catch (error) {
        window.alert(
          "No se pudieron cargar los entrenadores: " + error.message
        );
      }
    };

    fetchCoaches();
  }, []);

  useEffect(() => {
    setServiceData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name === 'duration' || name === 'capacity') value = parseInt(value)
    setServiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTimeChange = (event, fieldName) => {
    const { value } = event.target;

    if (
      value === "" ||
      (fieldName === "startTimeHour" &&
        !isNaN(value) &&
        value >= 0 &&
        value <= 23) ||
      (fieldName === "startTimeMinute" &&
        !isNaN(value) &&
        value >= 0 &&
        value <= 59)
    ) {
      setServiceData((prevData) => {
        const updatedTime = {
          ...prevData,
          [fieldName]: value,
        };
        // Formatear la cadena de tiempo
        if (
          updatedTime.startTimeHour !== undefined &&
          updatedTime.startTimeMinute !== undefined
        ) {
          updatedTime.startTime = formatTime(
            updatedTime.startTimeHour,
            updatedTime.startTimeMinute
          );
        }
        return updatedTime;
      });
    }
  };

  function formatTime(hour, minute) {
    const formattedHour = String(hour).padStart(2, "0");
    const formattedMinute = String(minute).padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
  }

  const handleSubmit = async () => {
    if (serviceData.coachID === "Select a coach") {
      window.alert("Please, select a coach first");
      return;
    }
    try {
      const response = await axios.post(
        "https://gymspace-backend.onrender.com/Services",
        serviceData
      );
      window.alert("Servicio creado");

      navigate("/Services");
    } catch (error) {
      window.alert("No se pudo crear el servicio: " + error.message);
    }
  };

  useEffect(() => {
    console.log(serviceData);
  }, [serviceData]);

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
            name="price"
            label="Price"
            type="number"
            fullWidth
            required
            value={serviceData.price}
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
            name="capacity"
            label="Capacity"
            type="number"
            fullWidth
            required
            value={serviceData.capacity}
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
            name="duration"
            label="Duration"
            type="number"
            fullWidth
            required
            value={serviceData.duration}
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
              name="startTimeMinute"
              label="Min"
              type="number"
              fullWidth
              required
              value={serviceData.startTimeMinute}
              onChange={(event) => handleTimeChange(event, "startTimeMinute")} //
              sx={{
                margin: "2px",
                width: "100px",
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
            <Typography
              variant="body2"
              sx={{
                marginLeft: "8px",
                color: "transparent",
                marginTop: "10px",
              }}
            >
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
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "10px",
              "& .Mui-checked": {
                color: "#ff9721", // Cambia el color del icono cuando está seleccionado
              },
            }}
          >
            <FormControlLabel
              value="available"
              control={<Radio sx={{ color: "white" }} />}
              label="Available"
            />
            <FormControlLabel
              value="unavailable"
              control={<Radio sx={{ color: "white" }} />}
              label="Unavailable"
            />
          </RadioGroup>

          {user.systemRole === "Admin" ? (
            coaches ? (
              <div>
                <InputLabel name="selectCoachs">TRAINER</InputLabel>
                <Select
                  labelId="selectCoach"
                  name="coachID"
                  label="Entrenador"
                  value={serviceData.coachID}
                  onChange={handleChange}
                >
                  <MenuItem value="Select a coach">Select a Coach</MenuItem>
                  {coaches.map((coach, i) => (
                    <MenuItem key={i} id="coachID" value={coach.userID}>
                      {`${coach.firstName} ${coach.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            ) : (
              <img src={loading} alt="loading..."></img>
            )
          ) : (
            <TextField
              name="coach"
              label="Coach"
              fullWidth
              required
              autoFocus
              value={coachName}
              disabled
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
          )}
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
