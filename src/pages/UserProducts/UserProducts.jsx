import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import { buildReq } from "../../utils/auth0Utils";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading/loading";
import { OrangeContainedButton } from "../../styles/ComponentStyles";
import { useNavigate } from "react-router";
import ProductList from "../Marketplace/ProductList";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { ProductCard } from "../../styles/ComponentStyles";
import { CardMedia } from "@mui/material";
import { CardContent, Rating, CardActions } from "@mui/material";
import {
  SmallOrangeOutlinedButton,
  LinkNoDeco,
} from "../../styles/ComponentStyles";
import UserProductsCard from "./UserProductsCard";

export default function UserServices() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();

  const [loading, setLoading] = useState(true);

  const getDate = () => {
    let actual = new Date();
    let day = actual.getDate();
    day = day < 10 ? "0" + day : day;
    let month = actual.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let year = actual.getFullYear();
    let today = year + "-" + month + "-" + day;
    return today;
  };

  const today = getDate();

  const [userProducts, setUserProducts] = useState();

  useEffect(() => {

    const id = user.userID;
    const getUser = async (id) => {
      try {
        const req = await buildReq({}, getAccessTokenSilently);

        const response = await axios.get(`${API_URL}/userproducts/${id}`, req);
        const { data } = response;
        // console.log(data.User);
        // console.log(data);
        if (data) {
          setUserProducts(data);
          setLoading(false);
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    if (user.userID) getUser(id);
  }, [user]);

  useEffect(() => {
  }, [userProducts]);

  if (loading) return <Loading loading={loading} />;

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: 150,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 7,
        }}
      >
        <Typography variant="h3" color="white">
          Bought products:
        </Typography>
        {userProducts && userProducts.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-evenly', flexWrap: "wrap", padding: 8 }}>
            {userProducts.map((userProduct, i) => (
              <UserProductsCard key={i} userProduct={userProduct} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            {" "}
            <Typography sx={{ paddingBottom: 5 }} variant="h5" color="white">
              {" "}
              Noghing here yet{" "}
            </Typography>
            <OrangeContainedButton onClick={() => navigate("/Marketplace")}>
              Buy
            </OrangeContainedButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
