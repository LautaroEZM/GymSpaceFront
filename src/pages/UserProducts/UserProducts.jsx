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
        {userProducts.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-evenly', flexWrap: "wrap", padding: 8 }}>
            {userProducts.map((product, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={2} xl={2}>
              <ProductCard
                sx={{
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image}
                  alt={product.name}
                  style={{
                    color: "#fff",
                    fontStyle: "italic",
                    fontSize: "14px",
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name={`rating-${product.productID}`}
                    value={4}
                    precision={0.5}
                    readOnly
                    sx={{ marginBottom: 1, color: "#ff9721" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", textAlign: "center" }}
                  >
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <LinkNoDeco to={`/Marketplace/detail/${product.productID}`}>
                    <SmallOrangeOutlinedButton>
                      VIEW DETAIL
                    </SmallOrangeOutlinedButton>
                  </LinkNoDeco>
                </CardActions>
              </ProductCard>
            </Grid>
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
