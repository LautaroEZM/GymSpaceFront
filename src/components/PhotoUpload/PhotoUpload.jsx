import { MuiFileInput } from "mui-file-input";
import { Container, Button } from "@mui/material";
import { Fragment, useState } from "react";
import styles from "./PhotoUpload.module.css";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import loadingGIF from "./loading.gif";

export default function PhotoUPload({ photo, setPhoto }) {
  // we receive the poto and setPhoto from the father

  // IMPORTANT: make sure that the photo's local state in the father component is undefined by default

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(false);

  const handlePhoto = (file) => {
    // this formats the file to a blob url string
    if (photo) setPhoto(null); // if there's already a photo this sets it to undefined to make the preview reset
    const name = Math.random().toString(); //sets a random name for the img
    const imageRef = ref(storage, `/${name}`); // sets it for uploading
    setLoading(true); // enables loading gif
    uploadBytes(imageRef, file).then(() => {
      // uploads the image to firebase
      const uploadedImg = ref(storage, name); // saves the info for retrieval of the url
      getDownloadURL(uploadedImg).then((url) => {
        //retrieves the url
        setPhoto(url); // sets the url in the father local state
        setLoading(false); // disables the loading gif
      });
    });
  };

  return (
    <Container
      sx={{
        minWidth: 300,
        minHeight: 300,
      }}
    >
      {photo ? ( // if there's a photo it will ask if you want a preview
        <div className={styles.div}>
          <img className={styles.img} src={photo} alt="Could not load photo" />
        </div>
      ) : (
        // if there's not, it will ask you to submit a photo
        <div>
          {loading ? (
            <img className={styles.img} src={loadingGIF} />
          ) : (
            <h3>Please submit a photo</h3>
          )}
        </div>
      )}
      <MuiFileInput
        value={photo} // the value is passed down throught props by the father
        onChange={handlePhoto} // pretty self-explanatory
        inputProps={{ accept: ".png, .jpeg" }} // makes sure the file uploaded is a png or jpeg
        sx={{ color: "white", border: "1px solid white" }}
      />
    </Container>
  );
}
