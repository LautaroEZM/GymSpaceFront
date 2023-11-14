import React, { useState } from "react";
import {
  Box,
  Collapse,
  TextField,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import { OrangeButtonFilter, OrangeOutlinedButton } from "../../styles/ComponentStyles";

export default function FilterBar({
  allCategories,
  selectedCategories,
  handleCategoryFilter,
  priceRange: propPriceRange,
  handleManualPriceChange,
  handlePriceFilter,
  filterOpen,
  maxProductPrice,
}) {
  const initialPriceRange = [0, maxProductPrice];
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [minPrice, maxPrice] = priceRange;

  if (
    propPriceRange[0] !== priceRange[0] ||
    propPriceRange[1] !== priceRange[1]
  ) {
    setPriceRange(propPriceRange);
  }

  return (
    <Collapse in={filterOpen} timeout="auto" unmountOnExit>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          width: "90%",
          border: "1px solid white",
          boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
          margin: "auto",
        }}
      >
        <Typography variant="h6" sx={{ color: "#ff9721", mb: 1 }}>
          CATEGORY
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          {allCategories.map((category) => (
            <OrangeButtonFilter
              key={category}
              variant="outlined"
              onClick={() => handleCategoryFilter(category)}
              isSelected={selectedCategories.includes(category)}
            >
              {category}
            </OrangeButtonFilter>
          ))}
        </Box>
        <Typography variant="h6" sx={{ color: "#ff9721", mt: 2, mb: 1 }}>
          PRICE
        </Typography>
        <Box
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "#ff9721",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            <TextField
              type="number"
              value={minPrice}
              onChange={(e) => handleManualPriceChange(e, "min")}
              label="Min"
              variant="filled"
              InputLabelProps={{ style: { color: "#ff9721" } }}
              InputProps={{
                inputProps: { min: 0 },
                style: {
                  color: "#ff9721",
                  "& input": { color: "#ff9721" },
                  "& fieldset": { borderColor: "#ff9721" },
                },
              }}
            />
            <Slider
              value={priceRange}
              onChange={handlePriceFilter}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              valueLabelFormat={(value) => `$${value}`}
              max={maxProductPrice}
              sx={{
                width: "calc(100% - 32px)",
                marginLeft: "16px",
                marginRight: "16px",
                color: "#ff9721",
              }}
            />
            <TextField
              type="number"
              value={maxPrice}
              onChange={(e) => handleManualPriceChange(e, "max")}
              label="Max"
              variant="filled"
              InputLabelProps={{ style: { color: "#ff9721" } }}
              InputProps={{
                inputProps: { min: 0 },
                style: {
                  color: "#ff9721",
                  "& input": { color: "#ff9721" },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
}
