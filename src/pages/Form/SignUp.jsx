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

export default function SignUp() {
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    birth: 'YYYY-MM-DD',
    phone: "",
    adress: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState({ // the password is initially hidden
    icon: <VisibilityOffSharpIcon />,
    value: false,
  });

  const handleShowPassword = () => {
    showPassword.value // sets the visibility of the password on/off
      ? setShowPassword({ icon: <VisibilityOffSharpIcon />, value: false })
      : setShowPassword({ icon: <VisibilitySharpIcon />, value: true });
  };

  const handleChange = (event) => { // handles the input changes of the form
    const { name, value } = event.target;
    console.log("event target:", name, value);

    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBirth = (value) => { // handles the date of birth changes
    const newDate = formatDate(value)
    setUserData((prevData) => ({ ...prevData, birth: newDate }));
  };

  const formatDate = (value) => { // formats the date selected by the datePicker into a more friendly view
    const year = value.$y.toString();
    const month = (value.$M + 1).toString();
    const day = value.$D.toString();
    const newDate = `${year}-${month}-${day}`;
    return newDate
  }

  useEffect(() => {  //debugging
    console.log(userData);
  }, [userData]);

  return (
    <Container sx={{ width: 1200, height: 600 }} className={styles.container}>
      <div className={styles.div}>
        <TextField  // name input
          name="name"
          label="Name"
          value={userData.name}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField // lastname input
          name="lastname"
          label="Lastname"
          value={userData.lastname}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField //adress input
          name="adress"
          label="Adress"
          value={userData.adress}
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
          <MenuItem id="gender" value={"non-binary"}>
            Non-binary
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
        <TextField // email input
          name="email"
          label="Email"
          value={userData.email}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField
          name="phone"
          label="Phone"
          value={userData.phone}
          onChange={handleChange}
          className={styles.input}
        />
        <TextField //password input
          name="password"
          type={showPassword.value ? "text" : "password"} //manages the visibility of the password
          label="Password"
          value={userData.password}
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.div}>
          <IconButton // triggers the visibility of the password on/off
            onClick={() => handleShowPassword()}
            className={styles.showPassword}
          >
            {showPassword.icon}
          </IconButton>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <Button // sends the form info to the back-end controller and registers the user
          variant="contained"
          color={theme.primary}
          className={styles.button}
        >
          Sign Up
        </Button>
      </div> 
      <Errors userData={userData} // errors component
       />
    </Container>
  );
}
