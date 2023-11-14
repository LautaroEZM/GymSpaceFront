import React from "react";
import { Chip} from "@mui/material";
import {
    Clear as ClearIcon,
  } from "@mui/icons-material";

const ServiceChip = ({ category, handleClearFilter }) => (
  <Chip
    label={category}
    onDelete={() => handleClearFilter(category)}
    deleteIcon={<ClearIcon style={{ color: "black", fontWeight: "bold" }} />}
    color="secondary"
    sx={{
      marginRight: "8px",
      backgroundColor: "#ff9721",
      color: "black",
      fontWeight: "bold",
    }}
  />
);

export default ServiceChip;
