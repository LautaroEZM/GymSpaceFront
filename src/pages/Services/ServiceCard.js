import React from "react";
import { CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import { SmallOrangeOutlinedButtonLess } from "../../styles/ComponentStyles";
import { ServicesCard, LinkNoDeco } from "../../styles/ComponentStyles";


const ServiceCard = ({ service }) => (
  <ServicesCard>
    <CardMedia
      component="div"
      sx={{
        pt: "56.25%",
        background: `url(${service.image})`,
      }}
    />
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Typography
        color="black"
        align="center"
        fontWeight="bold"
        sx={{
          textTransform: "uppercase",
          backgroundColor: "#ff9721",
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      >
        {service.category}
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        {service.name}
      </Typography>
      <Typography
        color="white"
        align="justify"
        mb={1}
        sx={{ height: "60px", overflow: "hidden" }}
      >
        {service.description}
      </Typography>
    </CardContent>
    <CardActions>
      <LinkNoDeco to= {`/ServiceDetail/${service.serviceID}`}>
      <SmallOrangeOutlinedButtonLess>
        View
      </SmallOrangeOutlinedButtonLess>
      </LinkNoDeco>
      <SmallOrangeOutlinedButtonLess>Edit</SmallOrangeOutlinedButtonLess>
    </CardActions>
  </ServicesCard>
);

export default ServiceCard;
