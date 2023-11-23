import { Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import style from "../../styles/ComponentStyles";
import styles from "./Profile.module.css";
import { useEffect } from "react";
import { display } from "@mui/system";
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from "../NotFound/NotFound";

export default function Profile() {
  const {user, isAuthenticated } = useAuth0();

  const userProfile = useSelector((state) => state.user);

  if (user && isAuthenticated) {
    return (
      <Container maxWidth="xs">
        <img src={userProfile.photo && userProfile.photo} alt="user.photo" />
        <Box>
          <Typography variant="h1">
            {userProfile.firstName && userProfile.firstName}
          </Typography>
          <Typography variant="h1">{userProfile.lastName && userProfile.lastName}</Typography>
        </Box>
        <Typography variant="h5">Birth: {userProfile.birth && userProfile.birth}</Typography>
        <Typography variant="h5">
          Adress: {userProfile.adress && userProfile.adress}
        </Typography>
        <Typography variant="h5">
          Gender: {userProfile.gender && userProfile.gender}
        </Typography>
        <Typography variant="h5">Phone: {userProfile.phone && userProfile.phone}</Typography>
        <Typography variant="h5">
          Contact phone: {userProfile.contactPhone && userProfile.contactPhone}
        </Typography>
      </Container>
    );
  } else {
    return <NotFound/>
  }
}
