import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import theme from "../../theme";
import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { DatePicker } from "@mui/x-date-pickers";
import Errors from "./Errors";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../REDUX/actions";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useAuth0 } from "@auth0/auth0-react";

export default function SignUp() {
  const loadingImage =
    "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const newUser = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Inicializar email con un valor predeterminado
    birth: "YYYY-MM-DD",
    gender: "Select a gender",
    address: "",
    phone: "",
    contactPhone: "",
    photo: "",
    enrollmentDate: "2023-11-10",
    status: "active",
    systemRole: "User",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [photo, setPhoto] = useState();

  useEffect(() => {
    setUserData((prevData) => ({ ...prevData, photo: photo }));
  }, [photo]);

  const handleChange = (event) => {
    // handles the input changes of the form
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBirth = (value) => {
    // handles the date of birth changes
    console.log("handleBirth: ", value);
    const newDate = formatDate(value);
    setUserData((prevData) => ({ ...prevData, birth: newDate }));
  };

  const formatDate = (value) => {
    console.log("formatDate: ", value);
    const year = value.$y.toString();
    const month =
      value.$M < 10 ? "0" + (value.$M + 1) : (value.$M + 1).toString();
    const day = value.$D < 10 ? "0" + value.$D : value.$D.toString();

    const newDate = `${year}-${month}-${day}`;
    console.log("format date: ", newDate);
    return newDate;
  };

  useEffect(() => {
    if (newUser && newUser.email) {
      // Establecer el valor de email solo si newUser tiene un valor y tiene la propiedad email
      setUserData((prevData) => ({ ...prevData, email: newUser.email }));
    }
    if (newUser && newUser.systemRole) {
      setUserData((prevData) => ({
        ...prevData,
        systemRole: newUser.systemRole,
      }));
    }
    if (newUser && newUser.photo) {
      setPhoto(newUser.photo);
    }
    if (newUser && newUser.firstName) {
      setUserData((prevData) => ({
        ...prevData,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        gender: newUser.gender,
        address: newUser.address,
        phone: newUser.phone,
        contactPhone: newUser.contactPhone,
      }));
    }
    setLoading(false);
  }, [newUser]);

  useEffect(() => {
    if (!newUser.email) setLoading(true);
  }, [user]);

  const handleSubmit = async () => {
    if (userData.birth === "YYYY-MM-DD") {
      window.alert("Select a date of birth");
      return;
    }
    setLoading(true);
    try {
      const userDetailsByIdUrl = `https://gymspacebackend-production-421c.up.railway.app/users/${user.sub}`;
      const { data } = await axios.put(userDetailsByIdUrl, userData);
      if (data) {
        dispatch(getUser(userData));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      window.alert("Could not create user: " + error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
        minWidth: 150,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: "flex",
            padding: 5,
            justifyContent: "center",
            width: "800px",
            alignSelf: "center",
            backgroundColor: "#414141",
          }}
        >
          <img src={loadingImage} className={styles.picture2}></img>
        </Box>
      ) : null}
      <Box
        sx={{
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
          width: "800px",
          alignSelf: "center",
          backgroundColor: "#414141",
        }}
      >
        <Typography variant="h5" color="alternative">
          Edit Profile
        </Typography>
        <TextField // name input
          name="firstName"
          label="Name"
          value={userData.firstName}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
        <TextField // lastname input
          name="lastName"
          label="Lastname"
          value={userData.lastName}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
          width: "800px",
          alignSelf: "center",
          backgroundColor: "#414141",
        }}
      >
        <TextField //adress input
          name="address"
          label="Address"
          value={userData.address}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
        <Select // the gender select with it's 3 options
          labelId="selectGender"
          name="gender"
          label="Gender"
          value={userData.gender}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        >
          <MenuItem id="gender" value={"Select a gender"}>
            Select a gender
          </MenuItem>
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
          label="Birth"
          name="birth"
          format="YYYY-MM-DD"
          value={userData.birth}
          onChange={handleBirth}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
          width: "800px",
          alignSelf: "center",
          backgroundColor: "#414141",
        }}
      >
        <TextField
          name="phone"
          label="Phone"
          value={userData.phone}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
        <TextField //contact phone input
          name="contactPhone"
          label="Contact phone"
          value={userData.contactPhone}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
        <TextField // email input
          disabled
          name="email"
          label="Email"
          value={userData.email}
          onChange={handleChange}
          sx={{ backgroundColor: "white", borderRadius: 4 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
          width: "800px",
          alignSelf: "center",
          backgroundColor: "#414141",
        }}
      >
        <PhotoUpload photo={photo} setPhoto={setPhoto} />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: 5,
          justifyContent: "space-between",
          width: "800px",
          alignSelf: "center",
          backgroundColor: "#414141",
        }}
      >
        <Button // sends the form info to the back-end controller and registers the user
          variant="contained"
          color={theme.primary}
          onClick={() => handleSubmit()}
        >
          {loading ? (
            <img src={loadingImage} className={styles.picture}></img>
          ) : (
            "Save"
          )}
        </Button>
        <Errors
          userData={userData} // errors component
        />
      </Box>
    </Box>
  );
}
