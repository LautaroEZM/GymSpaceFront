import { MuiFileInput } from "mui-file-input";
import { Container, Button } from "@mui/material";
import { Fragment, useState } from "react";
import styles from "./PhotoUpload.module.css";

export default function PhotoUPload({ photo, setPhoto }) {
  // we receive the poto and setPhoto from the father

  // IMPORTANT: make sure that the photo's local state in the father component is undefined by default

  const [preview, setPreview] = useState(false);

  const handlePhoto = (file) => {
    // this formats the file to a blob url string
    if (photo) setPhoto(undefined); // if there's already a photo this sets it to undefined to make the preview reset
    const url = URL.createObjectURL(file);
    setPhoto(url);
  };

  return (
    <Container
      sx={{
        minWidth: 300,
        minHeight: 300,
      }}
    >
      {photo ? ( // if there's a photo it will ask if you want a preview
        !preview ? ( // if you click preview it will show the photo
          <button className={styles.preview} onClick={() => setPreview(true)}>
            {" "}
            Preview{" "}
          </button>
        ) : (
          <div className={styles.div}>
            <img
              className={styles.img}
              src={photo}
              alt="Could not load photo"
            />
            {
              // if you click the X it will close the preview
            }
            <Button
              variant="contained"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={() => setPreview(false)}
            >
              X
            </Button>
          </div>
        )
      ) : (
        // if there's not, it will ask you to submit a photo
        <div>
          <h3>Please submit a photo</h3>
        </div>
      )}
      <MuiFileInput
        value={photo} // the value is passed down throught props by the father
        onChange={handlePhoto} // pretty self-explanatory
        inputProps={{ accept: ".png, .jpeg" }} // makes sure the file uploaded is a png or jpeg
      />
    </Container>
  );
}
