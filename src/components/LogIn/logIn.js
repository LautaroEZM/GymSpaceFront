import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from './login.module.css'

export default function logIn() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  if (isAuthenticated) {
    return (
      <Button
        variant="contained"
        color="regularButton"
        fullWidth
        required
        onClick={() => logout()}
        className={style.button}
      >
        Logout
      </Button>
    );
  } else {
    return (
      <Container maxWidth="xs">
        <Button
          variant="contained"
          color="regularButton"
          fullWidth
          required
          onClick={() => loginWithRedirect()}
          className={style.button}
        >
          Login
        </Button>
        <Link to="/SignUp">
          <Button className={style.button} injectFirst variant="text" color="primary" fullWidth required>
            Register
          </Button>
        </Link>
      </Container>
    );
  }
}
