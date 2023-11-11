import { useEffect, useState } from "react";
import styles from "./Errors.module.css";
import Container from "@mui/material/Container";

export default function Errors({ productData }) {
  const [error, setError] = useState("");

  useEffect(() => {
    if (productData.name.length < 4) {
      setError("The name must be longer than 4 characters");
      return;
    }

    if (productData.name.length > 12) {
      setError("The name must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(productData.name)) {
      setError("The name must only contain alphabetic characters");
      return;
    }
    if (productData.category.length < 4) {
      setError("The category must be longer than 4 characters");
      return;
    }

    if (productData.category.length > 12) {
      setError("The name must be less than 12 characters");
      return;
    }
    if (!/^[a-zA-Z ]*$/g.test(productData.category)) {
      setError("The category must only contain alphabetic characters");
      return;
    }

    if (productData.brand.length < 4) {
      setError("The brand must be longer than 4 characters");
      return;
    }

    if (productData.brand.length > 12) {
      setError("The brand must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(productData.brand)) {
      setError("The brand must only contain alphabetic characters");
      return;
    }
    if (!productData.image) {
      setError("You must upload an image");
      return;
    }

    if (productData.description.length < 8) {
      setError("The description must be longer than 8 characters")
      return;
    }

    if (productData.description.length > 100 ){
      setError("The description must be shorter than 100 characters")
    }

    if (productData.stockNow < 0){
      setError("Stock can't be below zero")
    }

    if (productData.price < 0){
      setError("Price can't be below zero")
    }

    if (productData.status.length === 1) {
      setError("The status must've been selected");
      return;
    }
    setError("");
  }, [productData]);

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
