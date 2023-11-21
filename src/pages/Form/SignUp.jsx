import {
  Container,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import theme from "../../theme";
import { useState, useEffect } from "react";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";
import styles from "./Form.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import Errors from "./Errors";
import { MuiFileInput } from "mui-file-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp({ newUser }) {

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Inicializar email con un valor predeterminado
    birth: "YYYY-MM-DD",
    gender: "",
    address: "",
    phone: "",
    contactPhone: "",
    photo: "undefined",
    enrollmentDate: "2023-11-10",
    status: "unregistered",
    systemRole: "User",
  });

  const { user } = newUser || {}; // Desestructurar user solo si newUser tiene un valor

  const handleChange = (event) => {
    // handles the input changes of the form
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBirth = (value) => {
    // handles the date of birth changes
    const newDate = formatDate(value);
    setUserData((prevData) => ({ ...prevData, birth: newDate }));
  };

  const handlePhoto = (file) => {
    if (userData.photo)
      setUserData((prevData) => ({ ...prevData, photo: undefined }));
    const url = URL.createObjectURL(file);
    setUserData((prevData) => ({ ...prevData, photo: url }));
  };

  const formatDate = (value) => {
    const year = value.$y.toString();
    const month = (value.$M + 1).toString();
    const day = value.$D.toString();
    const newDate = `${year}-${month}-${day}`;
    return newDate;
  };

  useEffect(() => {
    console.log(newUser);
    if (newUser && newUser.email) {
      // Establecer el valor de email solo si newUser tiene un valor y tiene la propiedad email
      setUserData((prevData) => ({ ...prevData, email: newUser.email }));
    }
  }, [newUser]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = await axios.post("https://gymspace-backend.onrender.com/Users", userData);
      if (user) {
        window.alert("User created");
        navigate("/");
      }
    } catch (error) {
      window.alert("Could not create user: " + error.message);
    }
  };


  return (
    <Container sx={{ width: 1200, height: 600 }} className={styles.container}>
      <div className={styles.div3}></div>
      <div className={styles.div}>
        <TextField // name input
          name="firstName"
          label="Name"
          value={userData.firstName}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField // lastname input
          name="lastName"
          label="Lastname"
          value={userData.lastName}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField //adress input
          name="address"
          label="Address"
          value={userData.address}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.div2}>
        <InputLabel name="selectGender" className={styles.input3}>
          Gender:
        </InputLabel>
        <Select // the gender select with it's 3 options
          labelId="selectGender"
          name="gender"
          label="Gender"
          value={userData.gender}
          onChange={handleChange}
          className={styles.input2}
        >
          <MenuItem id="gender" value={"male"}>
            Male
          </MenuItem>
          <MenuItem id="gender" value={"female"}>
            Female
          </MenuItem>
          <MenuItem id="gender" value={"prefer not to say"}>
            Prefer not to say
          </MenuItem>
        </Select>
        <DatePicker //the date of birth datePicker
          className={styles.date}
          label="Birth"
          name="birth"
          format="YYYY-MM-DD"
          value={userData.birth}
          onChange={handleBirth}
        />
      </div>
      <div className={styles.div}>
        <TextField
          name="phone"
          label="Phone"
          value={userData.phone}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField //contact phone input
          name="contactPhone"
          label="Contact phone"
          value={userData.contactPhone}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.div}>
        <TextField // email input
          disabled
          name="email"
          label="Email"
          value={userData.email}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <div className={styles.buttonContainer}>
        <Button // sends the form info to the back-end controller and registers the user
          variant="contained"
          color={theme.primary}
          className={styles.button}
          onClick={() => handleSubmit()}
        >
          Sign Up
        </Button>
      </div>
      <Errors
        userData={userData} // errors component
      />
      <div className={styles.photoDiv}>
        {userData.photo ? (
          <img
            className={styles.photo}
            src={userData.photo}
            alt="Could not load photo"
          />
        ) : (
          <div className={styles.photo}>
            <h3>Please submit a photo</h3>
          </div>
        )}
        <MuiFileInput
          name="photo"
          value={userData.photo}
          onChange={handlePhoto}
          className={styles.photoUpload}
          inputProps={{ accept: ".png, .jpeg" }}
        />
      </div>
    </Container>
  );
}
