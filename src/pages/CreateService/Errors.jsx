import { useEffect, useState } from "react";
import styles from "./Errors.module.css";
import Container from "@mui/material/Container";

export default function Errors({ serviceData }) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (serviceData.name.length < 4) {
      setError("The name must be longer than 4 characters");
      return;
    }

    if (serviceData.name.length > 12) {
      setError("The name must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(serviceData.name)) {
      setError("The name must only contain alphabetic characters");
      return;
    }

    if (serviceData.category.length < 4) {
      setError("The lastname must be longer than 4 characters");
      return;
    }

    if (serviceData.category.length > 12) {
      setError("The lastname must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(serviceData.category)) {
      setError("The lastname must only contain alphabetic characters");
      return;
    }

    if (serviceData.description < 8) {
      setError("The description must be over 8 characters");
      return;
    }

    if (!serviceData.image) {
      setError("You must upload a photo");
      return;
    }

    if (serviceData.price < 0) {
      setError("Price can't be below zero");
      return;
    }

    if (serviceData.duration < 0) {
      setError("Duration can't be below zero");
      return;
    }

    if (serviceData.capacity < 0) {
      setError("Capacity can't be below zero");
      return;
    }

    if (serviceData.status === "") {
      setError("A status must be selected");
      return;
    }

    if (serviceData.coachID === "") {
      setError("A coach must be selected");
      return;
    }
    setError("");
  }, [serviceData]);

  return (
    <Container maxWidth="xs" className={styles.container}>
      {error.length > 1 ? (
        <h4 className={styles.errors}>{error}</h4>
      ) : (
        <h4 className={styles.noErrors}>All good to go</h4>
      )}
    </Container>
  );
}
