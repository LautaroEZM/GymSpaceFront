import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import Time from "../../components/Time/Time";
import axios from "axios";
import theme from "../../theme";
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

  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    console.log('fetching coaches');
    return async () => {
      try {
        const response = await axios.get("http://localhost:3001/coaches");
        const { data } = response;
        if(data) setCoaches(data);
        console.log(coaches)
      } catch (error) {
        window.alert("could not load coaches", error.message);
      }
    };
  }, [window]);

  useEffect(() => {
    setServiceData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  useEffect(() => {
    console.log("time changed");
    setServiceData((prevData) => ({ ...prevData, startTime: newTime }));
  }, [newTime]);

  const handleChange = (event) => {
    // handles the input changes of the form
    const { name, value } = event.target;
    setServiceData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    return async () => {
      const response = await axios.get("http://localhost:3001/coaches");
      const { data } = response;
      setCoaches(data);
      console.log(coaches);
    };
  }, []);

  const handleSubmit = async () => {
    try {
      console.log("trying to submit");
      const user = await axios.post("http://localhost:3001/users", userData);
      console.log(user);
      if (user) {
        window.alert("User created");
        useNavigate("/");
      }
    } catch (error) {
      window.alert("Could not create user: ", error.message);
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
      <TextField
        name="price"
        label="Price"
        type="number"
        value={serviceData.price}
        onChange={handleChange}
      />
      <PhotoUpload photo={newImage} setPhoto={setNewImage} />
      <Time labelName={"Start Time"} time={newTime} setTime={setNewTime} />
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
      <TextField
        name="capacity"
        label="Capacity"
        type="number"
        value={serviceData.capacity}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color={theme.primary}
        onClick={() => handleSubmit()}
      >
        Create CLass
      </Button>
    </Container>
  );
}
