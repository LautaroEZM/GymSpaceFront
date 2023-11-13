import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
  Input,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import Time2 from "../../components/Time2/Time2";
import axios from "axios";
import theme from "../../theme";
import Errors from "./Errors";

export default function CreateService() {
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    startTime: "",
    duration: 0,
    image: undefined,
    status: "",
    coachID: "",
    capacity: 0,
    areaID: "01",
  });

  const [coaches, setCoaches] = useState([]);

  const [newImage, setNewImage] = useState(undefined);

  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const getCoaches = async () => {
      try {
        console.log("Fetching coaches...");
        const response = await axios.get(
          "https://gymspace-backend.onrender.com/coaches"
        );
        const { data } = response;
        setCoaches(data);
        console.log("Coaches loaded:", data);
      } catch (error) {
        console.error("Error loading coaches:", error.message);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          console.error("Status code:", error.response.status);
        } else if (error.request) {
          console.error("No response received from the server.");
        } else {
          console.error("Error setting up the request:", error.message);
        }
        window.alert("Could not load coaches data. See console for details.");
      }
    };

    getCoaches();
  }, []);

  useEffect(() => {
    setServiceData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  useEffect(() => {
    console.log("time changed");
    setServiceData((prevData) => ({ ...prevData, startTime: newTime }));
  }, [newTime]);

  const handleChange = (event) => {
    // handles the input changes of the form
    let { name, value } = event.target;
    if (name === "duration" || name === "price" || name === "capacity")
      value = parseInt(value);
    setServiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("trying to submit");
      const service = await axios.post(
        "https://gymspace-backend.onrender.com/services",
        serviceData
      );

      if (service) {
        window.alert("Service created");
        useNavigate("/");
      } else {
        window.alert("could not create service");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    //debugging
    console.log(serviceData);
  }, [serviceData]);

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
      <TextField // name input
        name="name"
        label="Name"
        value={serviceData.name}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        value={serviceData.description}
        onChange={handleChange}
      />
      <TextField
        name="category"
        label="Category"
        value={serviceData.category}
        onChange={handleChange}
      />
      <PhotoUpload photo={newImage} setPhoto={setNewImage} />
      <Time2 labelName={"Start Time"} time={newTime} setTime={setNewTime} />
      <TextField
        name="duration"
        label="Duration"
        type="number"
        value={serviceData.duration}
        onChange={handleChange}
      />
      <InputLabel name="selectStatus">Status:</InputLabel>
      <Select
        labelId="selectStatus"
        name="status"
        label="Status"
        value={serviceData.status}
        onChange={handleChange}
      >
        <MenuItem id="status" value={"available"}>
          Available
        </MenuItem>
        <MenuItem id="status" value={"unavailable"}>
          Unavailable
        </MenuItem>
      </Select>
      <InputLabel name="selectCoachs">Coach:</InputLabel>
      <Select
        labelId="selectCoach"
        name="coachID"
        label="Coach"
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
      <InputLabel name="durationSelect">Duration:</InputLabel>
      <Select
        labelId="durationSelect"
        name="duration"
        label="Duration"
        value={serviceData.duration}
        onChange={handleChange}
      >
        <MenuItem id="duration" value={"45"}>
          45
        </MenuItem>
        <MenuItem id="duration" value={"60"}>
          60
        </MenuItem>
        <MenuItem id="duration" value={"90"}>
          90
        </MenuItem>
      </Select>
      <Input
        id="capacityInput"
        name="capacity"
        value={serviceData.capacity}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">Capacity:</InputAdornment>
        }
      />
      <Input
        id="priceInput"
        name="price"
        value={serviceData.price}
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">Price: $</InputAdornment>
        }
      />

      <Button
        variant="contained"
        color={theme.primary}
        onClick={() => handleSubmit()}
      >
        Create CLass
      </Button>
      <Errors serviceData={serviceData} />
    </Container>
  );
}
