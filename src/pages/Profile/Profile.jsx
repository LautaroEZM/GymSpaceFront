import Container from "@mui/material/Container";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Typography from '@mui/material/Typography'
import style from '../../styles/ComponentStyles'

export default function Profile() {

  const user = useSelector((state) => state.user)

  return <Container maxWidth="xs">
    <img src={user.photo} alt="user.photo" />
    <Typography variant="h1" color="initial">{user.firstname && user.firstname}</Typography>
  </Container>;
}
