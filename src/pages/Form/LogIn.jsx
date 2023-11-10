import { Container, TextField, IconButton, Button } from "@mui/material";
import theme from "../../theme";
import { useState, useEffect } from "react";
import VisibilitySharpIcon from "@mui/icons-material/VisibilitySharp";
import VisibilityOffSharpIcon from "@mui/icons-material/VisibilityOffSharp";
import styles from "./Form.module.css";

export default function LogIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState({
    icon: <VisibilityOffSharpIcon />,
    value: false,
  });

  const handleShowPassword = () => {
    showPassword.value
      ? setShowPassword({ icon: <VisibilityOffSharpIcon />, value: false })
      : setShowPassword({ icon: <VisibilitySharpIcon />, value: true });
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <Container maxWidth="xs" className={styles.container}>
      <TextField
        id="email"
        label="Email"
        value={userData.email}
        onChange={handleChange}
        className={styles.input}
      />
      <TextField
        id="password"
        type={showPassword.value ? "text" : "password"}
        label="Password"
        value={userData.password}
        onChange={handleChange}
        className={styles.input}
      />
      <IconButton
        onClick={() => handleShowPassword()}
        className={styles.showPassword}
      >
        {showPassword.icon}
      </IconButton> 
      <Container maxWidth="xs" className={styles.buttonContainer} >
      <Button
        variant="contained"
        color={theme.primary}
        className={styles.button}
      >
        Log In
      </Button>
      </Container>

    </Container>
  );
}
