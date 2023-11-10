import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import style from "./ImageCarousel.module.css";
import { Box } from "@mui/system";

const items = [
  {
    name: "Product 1",
    description: "Description for Product 1",
    imageUrl: "https://png.pngtree.com/background/20230610/original/pngtree-the-gym-scene-where-people-are-sitting-in-a-gym-picture-image_3108802.jpg",
    
  },
  {
    name: "Product 1",
    description: "Description for Product 1",
    imageUrl: "https://png.pngtree.com/background/20230528/original/pngtree-gym-is-reflected-in-an-odd-light-picture-image_2773779.jpg",
    
  },
  {
    name: "Product 1",
    description: "Description for Product 1",
    imageUrl: "https://png.pngtree.com/background/20230528/original/pngtree-gym-is-reflected-in-an-odd-light-picture-image_2773779.jpg",
    
  },
  
  // Agrega más elementos según sea necesario
];

function ImageCarousel() {
  return (
    <Box className={style.carouselContainer}>
      <Carousel>
        {items.map((item, i) => (
          <Paper key={i} className={style.carouselItem}>
            <div className={style.carouselContent}>
            </div>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={style.carouselImage}
            />
          </Paper>
        ))}
      </Carousel>
    </Box>
  );
}

export default ImageCarousel;
