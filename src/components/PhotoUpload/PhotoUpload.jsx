
import { MuiFileInput } from "mui-file-input";
import Container from "@mui/material/Container";

export default function PhotoUPload({photo, setPhoto}) { // we receive the poto and setPhoto from the father

  // IMPORTANT: make sure that the photo's local state in the father component is undefined by default

  const handlePhoto = (file) => { // this formats the file to a blob url string
    if (photo) setPhoto(undefined); // if there's already a photo this sets it to undefined to make the preview reset
    const url = URL.createObjectURL(file);
    setPhoto(url);
  };

  return (
    <Container sx = {{
      minWidth:300,
      minHeight:300,
    }}>
      {photo ? ( // if there's a photo it will display a preview
        <img src={photo} alt="Could not load photo" />
      ) : ( // if there's not, it will ask you to submit a photo
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
