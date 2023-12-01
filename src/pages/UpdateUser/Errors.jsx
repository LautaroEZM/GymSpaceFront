import { useEffect, useState } from "react";
import styles from "./Errors.module.css";
import Container from "@mui/material/Container";

export default function Errors({ userData , error , setError }) {
    // const [error, setError] = useState("");

    useEffect(() => {
        if (userData.firstName?.length < 3) {
            setError("The first name must be longer than 3 characters");
            return;
        }

        if (userData.firstName?.length > 12) {
            setError("The first name must be less than 12 characters");
            return;
        }

        if (userData.lastName?.length < 3) {
            setError("The last name must be longer than 3 characters");
            return;
        }

        if (userData.lastName?.length > 12) {
            setError("The last name must be less than 12 characters");
            return;
        }

        if (!/^[a-zA-Z ]*$/g.test(userData.firstName)) {
            setError("The first name must only contain alphabetic characters");
            return;
        }

        if (!/^[a-zA-Z ]*$/g.test(userData.lastName)) {
            setError("The last name must only contain alphabetic characters");
            return;
        }

        const birthDate = new Date(userData.birth);
        const today = new Date();
        const ageDifference = today.getFullYear() - birthDate.getFullYear();

        if (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
            ageDifference--;
        }

        if (ageDifference < 12) {
            setError("The birth date must be at least 12 years ago");
            return;
        }

        if (!/^\+?\d+$/.test(userData.phone)) {
            setError("Invalid phone number format");
            return;
        }

        if (!/^\+?\d+$/.test(userData.contactPhone)) {
            setError("Invalid contact phone number format");
            return;
        }

        // if (!userData.image) {
        //     setError("You must upload a photo");
        //     return;
        // }

        setError("");
    }, [userData]);

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