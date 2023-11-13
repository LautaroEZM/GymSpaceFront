// ImageCarousel.js

import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Box } from "@mui/material";

const items = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    imageUrl: "https://png.pngtree.com/background/20230610/original/pngtree-the-gym-scene-where-people-are-sitting-in-a-gym-picture-image_3108802.jpg",
  },
  {
    name: "Product 2",
    description: "Description for Product 2",
    imageUrl: "https://png.pngtree.com/background/20230528/original/pngtree-gym-is-reflected-in-an-odd-light-picture-image_2773779.jpg",
  },
  {
    name: "Product 3",
    description: "Description for Product 3",
    imageUrl: "https://png.pngtree.com/background/20230528/original/pngtree-gym-is-reflected-in-an-odd-light-picture-image_2773779.jpg",
  },
];

function ImageCarousel() {
  const carouselContainerStyle = {
    marginTop: "15px",
  };

  const carouselImageStyle = {
    width: "70%",
    display: "block",
    margin: "0 auto",
  };

  const carouselItemStyle = {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    textAlign: "center",
  };

  const carouselContentStyle = {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  
  return (
    <Box style={carouselContainerStyle}>
      <Carousel>
        {items.map((item, i) => (
          <Paper key={i} style={carouselItemStyle}>
            <div style={carouselContentStyle}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={carouselImageStyle}
              />
            </div>
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
