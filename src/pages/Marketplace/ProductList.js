import React from "react";
import {
  Box,
  Grid,
  Rating,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  SmallOrangeOutlinedButton,
  ProductCard,
} from "../../styles/ComponentStyles";

export default function ProductList({ sortedProducts }) {
  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "90%", marginBottom: "40px" }}>
        <Grid container spacing={2}>
          {sortedProducts().map((product) => (
            <Grid
              item
              key={product.productID}
              xs={12}
              sm={6}
              md={4}
              lg={2}
              xl={2}
            >
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
                  <SmallOrangeOutlinedButton>
                    VIEW DETAIL
                  </SmallOrangeOutlinedButton>
                </CardActions>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
