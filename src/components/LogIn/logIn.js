import Container from "@mui/material/Container";
import { Button} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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
        >
          Login
        </Button>
        <Link to="/SignUp">
          <Button injectFirst variant="text" color="primary" fullWidth required>
            Register
          </Button>
        </Link>
      </Container>
    );
  }
}
