import React from "react";
import { useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useNavigate } from "react-router";
import { OrangeOutlinedButton } from "../../styles/ComponentStyles";
import NotFound from "../NotFound/NotFound";
import styles from "./Profile.module.css";

const Profile = () => {
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
          width: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 1,
            width: "95%",
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
            sx={{ marginTop: "5px" }}
          >
            {" "}
            Edit Profile <BorderColorIcon />{" "}
          </OrangeOutlinedButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "95%",
          }}
        >
          <Typography sx={{ marginY: 2 }}>
            {userProfile.firstName && (
              <>
                <strong>First Name:</strong> {userProfile.firstName}
              </>
            )}
          </Typography>
          <Typography sx={{ marginY: 2 }}>
            {userProfile.lastName && (
              <>
                <strong>Last Name:</strong> {userProfile.lastName}
              </>
            )}
          </Typography>
        </Box>
        {/* Para pantallas grandes */}
        <Box
          sx={{
            justifyContent: "center",
            alignSelf: "center",
            backgroundColor: "#414141",
            width: "95%",
            margin: "5px",
          }}
        >
          {/* Detalles grandes */}
          <Box
            sx={{
              marginY: "5px",
              width: "100%",
            }}
          >
            {userProfile.email && (
              <Typography sx={{ marginY: 2 }}>
                <strong>Email:</strong> {userProfile.email}
              </Typography>
            )}
            {userProfile.address && (
              <Typography sx={{ marginY: 2 }}>
                <strong>Address:</strong> {userProfile.address}
              </Typography>
            )}
            {userProfile.birth && (
              <Typography sx={{ marginY: 2 }}>
                <strong>Birth:</strong> {userProfile.birth}
              </Typography>
            )}
            {userProfile.gender && (
              <Typography sx={{ marginY: 2 }}>
                <strong>Gender:</strong> {userProfile.gender}
              </Typography>
            )}
            {userProfile.phone && (
              <Typography sx={{ marginY: 2 }}>
                <strong>Phone:</strong> {userProfile.phone}
              </Typography>
            )}
            {userProfile.contactPhone && (
              <Typography sx={{ marginY: 2 }}>
                <strong>Contact Phone:</strong> {userProfile.contactPhone}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return <NotFound />;
  }
};

export default Profile;
