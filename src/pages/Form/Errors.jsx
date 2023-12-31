import { useEffect, useState } from "react";
import styles from "./Errors.module.css";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography'

export default function Errors({ userData }) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (userData.firstName.length < 4) {
      setError("The name must be longer than 4 characters");
      return;
    }
  
    if (userData.firstName.length > 12) {
      setError("The name must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(userData.name)) {
      setError(
        "The name must only contain alphabetic characters"
      );
      return;
    }

    if (userData.lastName.length < 4) {
        setError("The lastname must be longer than 4 characters");
        return;
      }
    
      if (userData.lastName.length > 12) {
        setError("The lastname must be less than 12 characters");
        return;
      }
  
      if (!/^[a-zA-Z ]*$/g.test(userData.lastname)) {
        setError(
          "The lastname must only contain alphabetic characters"
        );
        return;
      }

    if (!/^[a-zA-Z0-9 ]{4,}$/g.test(userData.adress)) {
      setError(
        "The address must have at least 4 characters, at least one number, and at least one letter"
      );
      return;
    }

    if (userData.gender.length === 0) {
      setError("The gender must've been selected");
      return;
    }

    if (userData.birth === 'YYYY-MM-DD') {
      setError("You must select a date of birth");
      return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g.test(userData.email)) {
      setError("The email is not a valid email");
      return;
    }

    if (!/^[0-9]{10,11}$/g.test(userData.phone)) {
      setError(
        "The phone number must be 10 or 11 characters long, all of which are numbers"
      );
      return;
    }
    if (!/^[0-9]{10,11}$/g.test(userData.contactPhone)) {
      setError(
        "The contact phone number must be 10 or 11 characters long, all of which are numbers"
      );
      return;
    }
    if (userData.photo === undefined) {
      setError("You must upload a profile photo")
      return
    }
    

    setError("");
  }, [userData]);

  return (
    <Box>
      {error.length > 1 ? (
        <Typography variant="h5" color="initial">{error}</Typography>
      ) : (
        <Typography variant="h5" color="alternative">All good to go</Typography>
      )}
    </Box>
  );
}
