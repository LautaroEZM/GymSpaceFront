import { Container, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from "../NotFound/NotFound";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router";
import { OrangeOutlinedButton } from "../../styles/ComponentStyles";
import styles from "./Profile.module.css";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  const userProfile = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (user && isAuthenticated) {
    return (
      <Box
        sx={{
          display: 'flex',
          color: "white",
          minWidth: 150,
          border: "1px solid white",
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <img
            className={styles.img}
            src={userProfile.photo && userProfile.photo}
            alt="user.photo"
          />
          <OrangeOutlinedButton
            onClick={() => {
              navigate("/signUp");
            }}
          >
            {" "}
            Edit Profile <BorderColorIcon />{" "}
          </OrangeOutlinedButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            
          }}
        >
          <Typography variant="h1" sx={{ margin: 2 }}>
            {userProfile.firstName && userProfile.firstName}
          </Typography>
          <Typography variant="h1" sx={{ margin: 2 }}>
            {userProfile.lastName && userProfile.lastName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 5,
            justifyContent: "space-between",
            width: '800px',
            alignSelf: 'center',
            backgroundColor: "#414141",
          }}
        >
          <Typography variant="h5">
            Email: {userProfile.email && userProfile.email}
          </Typography>
          <Typography variant="h5">
            Address: {userProfile.address && userProfile.address}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 5,
            justifyContent: "space-between",
            width: '800px',
            alignSelf: 'center',
            backgroundColor: "#414141",
          }}
        >
          <Typography variant="h5">
            Birth: {userProfile.birth && userProfile.birth}
          </Typography>
          <Typography variant="h5">
            Gender: {userProfile.gender && userProfile.gender}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: 5,
            justifyContent: "space-between",
            width: '800px',
            alignSelf: 'center',
            backgroundColor: "#414141",
          }}
        >
          <Typography variant="h5">
            Phone: {userProfile.phone && userProfile.phone}
          </Typography>
          <Typography variant="h5">
            Contact phone:{" "}
            {userProfile.contactPhone && userProfile.contactPhone}
          </Typography>
        </Box>
      </Box>
    );
  } else {
    return <NotFound />;
  }
}
