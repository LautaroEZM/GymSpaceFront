import React from "react";
import { StyledMenu, StyledMenuItem } from "../../styles/ComponentStyles";

export default function SortMenu({ anchorEl, handleSortChange, sorting, setAnchorEl }) {
  return (
    <StyledMenu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)} 
    >
      <StyledMenuItem onClick={() => handleSortChange("price")}>
        Sort by Price{" "}
        {sorting.type === "price" && sorting.order === "asc" && "▲"}
        {sorting.type === "price" && sorting.order === "desc" && "▼"}
      </StyledMenuItem>
      <StyledMenuItem onClick={() => handleSortChange("alphabetical")}>
        Sort Alphabetically{" "}
        {sorting.type === "alphabetical" && sorting.order === "asc" && "▲"}
        {sorting.type === "alphabetical" && sorting.order === "desc" && "▼"}
      </StyledMenuItem>
    </StyledMenu>
  );
}
