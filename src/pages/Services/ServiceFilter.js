import React from "react";
import { Container } from "@mui/material";
import {
  Category as CategoryIcon,
  AddCircleOutline as AddCircleOutlineIcon,
} from "@mui/icons-material";
import {
  LinkNoDeco,
  OrangeOutlinedButton,
  StyledMenu,
  StyledMenuItem,
} from "../../styles/ComponentStyles";

const ServiceFilter = ({
  categories,
  selectedCategories,
  anchorEl,
  handleMenuClick,
  handleMenuItemClick,
  handleClose,
}) => (
  <Container
    sx={{
      height: "40px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
    }}
    spacing={2}
  >
    <LinkNoDeco to="/CreateService">
      <OrangeOutlinedButton
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
      >
        ADD SERVICE
      </OrangeOutlinedButton>
    </LinkNoDeco>
    <OrangeOutlinedButton
      variant="outlined"
      onClick={handleMenuClick}
      startIcon={<CategoryIcon />}
    >
      {selectedCategories.length > 0
        ? "Selected Categories"
        : "Select Category"}
    </OrangeOutlinedButton>
    <StyledMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      {categories.map((category) => (
        <StyledMenuItem
          key={category}
          onClick={() => handleMenuItemClick(category)}
        >
          {category}
        </StyledMenuItem>
      ))}
    </StyledMenu>
  </Container>
);

export default ServiceFilter;
