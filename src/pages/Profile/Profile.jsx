import { Container, Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from "../NotFound/NotFound";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router";
import { OrangeOutlinedButton } from "../../styles/ComponentStyles";
import styles from "./Profile.module.css";
import { Hidden } from "@mui/material";

export default function Profile() {
  const { user, isAuthenticated } = useAuth0();

  const userProfile = useSelector((state) => state.user);

  const navigate = useNavigate();

  if (user && isAuthenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          color: "white",
          justifyContent: "center",
          flexDirection: "column",
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
          <Typography variant="h2" sx={{ margin: 2 }}>
            {userProfile.firstName && userProfile.firstName}
          </Typography>
          <Typography variant="h2" sx={{ margin: 2 }}>
            {userProfile.lastName && userProfile.lastName}
          </Typography>
        </Box>
        {/*para pantallas grandes*/}
        <Hidden xsDown>
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
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Email: {userProfile.email && userProfile.email}
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: 3, alignSelf: "center" }}
            >
              Address: {userProfile.address && userProfile.address}
            </Typography>
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
            <Typography
              variant="h5"
              sx={{ paddingTop: 3, alignSelf: "center" }}
            >
              Birth: {userProfile.birth && userProfile.birth}
            </Typography>
            <Typography
              variant="h5"
              sx={{ paddingTop: 3, alignSelf: "center" }}
            >
              Gender: {userProfile.gender && userProfile.gender}
            </Typography>
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
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Phone: {userProfile.phone && userProfile.phone}
            </Typography>
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Contact phone:{" "}
              {userProfile.contactPhone && userProfile.contactPhone}
            </Typography>
          </Box>
        </Hidden>
        {/*para pantallas pequeas*/}
        <Hidden smUp>
          <Box
            sx={{
              display: "flex",
              padding: 5,
              flexDirection: "column",
              justifyContent: "center",
              width: "500px",
              alignSelf: "center",
              backgroundColor: "#414141",
            }}
          >
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Email: {userProfile.email && userProfile.email}
            </Typography>
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Address: {userProfile.address && userProfile.address}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              padding: 5,
              flexDirection: "column",
              justifyContent: "center",
              width: "500px",
              alignSelf: "center",
              backgroundColor: "#414141",
            }}
          >
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Birth: {userProfile.birth && userProfile.birth}
            </Typography>
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Gender: {userProfile.gender && userProfile.gender}
            </Typography>
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
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Phone: {userProfile.phone && userProfile.phone}
            </Typography>
            <Typography variant="h5" sx={{ paddingTop: 3, alignSelf: "center" }}>
              Contact phone:{" "}
              {userProfile.contactPhone && userProfile.contactPhone}
            </Typography>
          </Box>
        </Hidden>
      </Box>
    );
  } else {
    return <NotFound />;
  }
}
