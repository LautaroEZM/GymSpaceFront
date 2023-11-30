import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState, useEffect } from "react";
import axios from "axios";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { API_URL } from "../../utils/constants";
import { buildReq } from "../../utils/auth0Utils"
import dayjs from "dayjs";
import { OrangeOutlinedButton } from "../../styles/ComponentStyles";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../REDUX/actions";

export default function UpdateUser() {
  const { id } = useParams();

  const reduxUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  const [userUpdate, setUserUpdate] = useState({});
  const [dateval, setDateval] = useState(dayjs("2022-04-17"));

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUser = async (id) => {
      try {
        const req = await buildReq({}, getAccessTokenSilently);
        const response = await axios.get(`${API_URL}/Users/${id}`, req);

        const { data } = response;
        if (data) {
          setUserData(data);
          // setDateval(dayjs(userData.birth));
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    getUser(id);
  }, [id]);

  useEffect(() => {
    setDateval(dayjs(userData.birth));
  }, [userData.birth]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "systemRole" && reduxUser.systemRole !== "Admin") {
      window.alert("You don't have permission to edit this value");
      return;
    }
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    setUserUpdate((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleBirth = (value) => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setUserData((prevData) => ({ ...prevData, birth: formattedDate }));
    setUserUpdate((prevData) => ({ ...prevData, birth: formattedDate }));
  };

  const handleSubmit = async () => {
    try {
      console.log(userUpdate);

      const response = await axios.put(`${API_URL}/Users/${id}`, userUpdate);
      window.alert("Usuario Actualizado");
      if (userData.userID === reduxUser.userID) dispatch(getUser(userData));
      navigate("/Dashboard");
    } catch (error) {
      window.alert("No se pudo actualizar el usuario: " + error.message);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "white",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <OrangeOutlinedButton onClick={() => navigate("/Dashboard")}>
        BACK
      </OrangeOutlinedButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid white",
          width: "70%",
          textAlign: "center",
          backgroundColor: "#212020",
          padding: 4,
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5" marginTop="10px">
          Update User
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            name="firstName"
            label="First Name"
            required
            autoFocus
            value={userData.firstName || ""}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginTop: "15px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />

          <TextField
            name="lastName"
            label="Last Name"
            required
            autoFocus
            value={userData.lastName || ""}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginTop: "15px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <TextField
            name="email"
            label="Email"
            required
            multiline
            value={userData.email || ""}
            InputProps={{ readOnly: true }}
            sx={{
              width: "70%",
              marginTop: "15px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <DatePicker
            label="Birth"
            name="birth"
            // format="YYYY-MM-DD"
            value={dateval}
            onChange={handleBirth}
            sx={{
              width: "70%",
              marginTop: "15px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
            }}
          />
          <Typography component="h1" variant="h6" marginTop="15px">
            Gender
          </Typography>
          <Select
            labelId="gender"
            name="gender"
            label="gender"
            required
            value={userData.gender || ""}
            onChange={handleChange}
            sx={{
              width: "70%",
              "& .MuiInputLabel-root": {
                color: "white !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff9721",
              },
            }}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>
          <TextField
            name="address"
            label="Address"
            required
            value={userData.address || ""}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginTop: "15px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <TextField
            name="phone"
            label="Phone"
            required
            value={userData.phone || ""}
            onChange={handleChange}
            sx={{
              width: "70%",
              marginTop: "15px",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <TextField
            name="contactPhone"
            label="Contact Phone"
            required
            value={userData.contactPhone || ""}
            onChange={handleChange}
            sx={{
              marginTop: "15px",
              width: "70%",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />

          <TextField
            name="enrollmentDate"
            label="Enrollment Date"
            required
            InputProps={{ readOnly: true }}
            value={userData.enrollmentDate || ""}
            onChange={handleChange}
            sx={{
              marginTop: "15px",
              width: "70%",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <TextField
            name="status"
            label="Status"
            required
            value={userData.status || ""}
            onChange={handleChange}
            sx={{
              marginTop: "15px",
              width: "70%",
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
          <Typography component="h1" variant="h6" marginTop="15px">
            System Role
          </Typography>
          <Select
            labelId="systemRole"
            name="systemRole"
            label="systemRole"
            required
            value={userData.systemRole || ""}
            onChange={handleChange}
            sx={{
              width: "70%",
              "& .MuiInputLabel-root": {
                color: "white !important",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff9721",
              },
            }}
          >
            <MenuItem value={"Admin"}>Admin</MenuItem>
            <MenuItem value={"Coach"}>Coach</MenuItem>
            <MenuItem value={"Guest"}>Guest</MenuItem>
            <MenuItem value={"User"}>User</MenuItem>
          </Select>
        </Box>
        <Button
          variant="contained"
          color="orangeButton"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Update User
        </Button>
      </Box>
    </Container>
  );
}
