import {
  TextField,
  Button,
  Select,
  MenuItem,
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
import { getUser, editProfile } from "../../REDUX/actions";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useAuth0 } from "@auth0/auth0-react";
import {
  TextFieldForm,
  OrangeOutlinedButton,
} from "../../styles/ComponentStyles";
import { getPickersLayoutUtilityClass } from "@mui/x-date-pickers/PickersLayout/pickersLayoutClasses";
import dayjs from "dayjs";


export default function SignUp() {
  const loadingImage =
    "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const newUser = useSelector((state) => state.user);

  const editProfile = useSelector((state) => state.editProfile);

  const [pickedDate, setPickedDate] = useState(dayjs())

  const handleBirth = (value) => {
    const newDate = formatDate(value.$d);
    console.log(newDate);
    setPickedDate(value)
    setUserData((prevData) => ({ ...prevData, birth: newDate }));
  };

  const today = dayjs();
  const twelveYearsAgo = today.subtract(12, 'year');

  const formatDate = (value) => {
    const year = value.getFullYear().toString();
    const month = (value.getMonth() + 1).toString().padStart(2, '0');
    const day = value.getDate().toString().padStart(2, '0');
  
    const newDate = `${year}-${month}-${day}`;
    return newDate;
  };

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
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (newUser && newUser.email) {
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
    if (newUser && newUser.firstName && newUser.phone !== 'phone') {
      setUserData((prevData) => ({
        ...prevData,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        gender: newUser.gender,
        address: newUser.address,
        phone: newUser.phone,
        contactPhone: newUser.contactPhone,
      }));
      if(newUser && newUser.birth) {
        const parse = dayjs(newUser.birth, { dateFormat: 'YYYY-MM-DD' })
        handleBirth(parse)
      }
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
        navigate(editProfile ? "/Profile" : "/");
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
        width: "100%",
        alignItems: "center",
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
          width: "95%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#414141",
          maxWidth: "600px",
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <TextFieldForm // name input
            name="firstName"
            label="Name"
            value={userData.firstName}
            onChange={handleChange}
            sx={{ width: "250px" }}
          />
          <TextFieldForm // lastname input
            name="lastName"
            label="Lastname"
            value={userData.lastName}
            onChange={handleChange}
            sx={{ width: "250px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <TextFieldForm //adress input
            name="address"
            label="Address"
            value={userData.address}
            onChange={handleChange}
            sx={{ width: "200px" }}
          />
          <Select // the gender select with it's 3 options
            labelId="selectGender"
            name="gender"
            label="Gender"
            value={userData.gender}
            onChange={handleChange}
            sx={{ width: "250px", height: "60px" }}
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
            maxDate={twelveYearsAgo}
            value={pickedDate}
            onChange={handleBirth}
            sx={{ width: "250px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <TextFieldForm
            name="phone"
            label="Phone"
            value={userData.phone}
            onChange={handleChange}
            sx={{ width: "250px" }}
          />
          <TextFieldForm //contact phone input
            name="contactPhone"
            label="Contact phone"
            value={userData.contactPhone}
            onChange={handleChange}
            sx={{ width: "250px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TextFieldForm // email input
            disabled
            name="email"
            label="Email"
            value={userData.email}
            onChange={handleChange}
            sx={{ width: "250px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <PhotoUpload photo={photo} setPhoto={setPhoto} />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 2,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <Box>
            <Errors
              userData={userData} // errors component
            />
          </Box>
          <OrangeOutlinedButton // sends the form info to the back-end controller and registers the user
            onClick={() => handleSubmit()}
          >
            {loading ? (
              <img src={loadingImage} className={styles.picture}></img>
            ) : (
              "Save"
            )}
          </OrangeOutlinedButton>
        </Box>
      </Box>
    </Box>
  );
}
