import { Container, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from "../NotFound/NotFound";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from "react-router";

export default function Profile() {
  const {user, isAuthenticated } = useAuth0();

  const userProfile = useSelector((state) => state.user);

  const navigate = useNavigate()

  if (user && isAuthenticated) {
    return (
      <Container maxWidth="xs">
        <img src={userProfile.photo && userProfile.photo} alt="user.photo" />
        <Box>
          <Typography variant="h1">
            {userProfile.firstName && userProfile.firstName}
          </Typography>
          <Typography variant="h1">{userProfile.lastName && userProfile.lastName}</Typography>
        <Button onClick={() => {navigate('/signUp')}} > Edit Profile <BorderColorIcon/> </Button>
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
        </Box>
      </Container>
    );
  } else {
    return <NotFound/>
  }
}
