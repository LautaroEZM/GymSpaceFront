import { useEffect, useState } from "react";
import styles from "./Errors.module.css";
import Container from "@mui/material/Container";

export default function Errors({ productData, errors, setErrors }) {
  useEffect(() => {
    if (productData.name.length < 4) {
      setErrors("The name must be longer than 4 characters");
      return;
    }

    if (productData.name.length > 12) {
      setErrors("The name must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(productData.name)) {
      setErrors("The name must only contain alphabetic characters");
      return;
    }
    if (productData.category.length < 4) {
      setErrors("The category must be longer than 4 characters");
      return;
    }

    if (productData.category.length > 12) {
      setErrors("The name must be less than 12 characters");
      return;
    }
    if (!/^[a-zA-Z ]*$/g.test(productData.category)) {
      setErrors("The category must only contain alphabetic characters");
      return;
    }

    if (productData.brand.length < 4) {
      setErrors("The brand must be longer than 4 characters");
      return;
    }

    if (productData.brand.length > 12) {
      setErrors("The brand must be less than 12 characters");
      return;
    }

    if (!/^[a-zA-Z ]*$/g.test(productData.brand)) {
      setErrors("The brand must only contain alphabetic characters");
      return;
    }
    if (!productData.image) {
      setErrors("You must upload an image");
      return;
    }

    if (productData.description.length < 8) {
      setErrors("The description must be longer than 8 characters");
      return;
    }

    if (productData.description.length > 100) {
      setErrors("The description must be shorter than 100 characters");
    }

    if (productData.stockNow < 0) {
      setErrors("Stock can't be below zero");
    }

    if (productData.price < 0) {
      setErrors("Price can't be below zero");
    }

    if (productData.status.length === 1) {
      setErrors("The status must've been selected");
      return;
    }
    setErrors(null);
  }, [productData]);

  return (
    <Container maxWidth="xs" className={styles.container}>
      {errors ? (
        <h4 className={styles.errors}>{errors}</h4>
      ) : (
        <h4 className={styles.noErrors}>All good to go</h4>
      )}
    </Container>
  );
}
