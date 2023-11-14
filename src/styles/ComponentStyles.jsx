import { styled } from '@mui/system';
import {
  Button,
  Card,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link } from 'react-router-dom';

//----------------------- BUTTONS

export const OrangeOutlinedButton = styled(Button)`
color: #ff9721;
border: none;
border-radius: 5px;
&:hover {
  background-color: #1c1813;
  border: 1px solid #ff9721;
}
height: 50px;
width: auto;
display: flex;
align-items: center;

`;

export const SmallOrangeOutlinedButton = styled(OrangeOutlinedButton)`
font-size: 12px;
height: auto;
  &:hover {
  border: none;
}
`;

export const SmallOrangeOutlinedButtonLess = styled(SmallOrangeOutlinedButton)`
  &:hover {
background-color: #48443f;
}
`;

export const OrangeButtonFilter = styled(Button)`
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#ff9721")};
  background-color: ${({ isSelected }) =>
    isSelected ? "#ff9721" : "transparent"};
  border: 1px solid #ff9721;
  &:hover {
    background-color: #1c1813;
    border: 1px solid #ff9721;
    color: #fff;
  }
`;

export const OrangeContainedButton = styled(Button)`
background-color: #ff9721;
color: white;
border-radius: 5px;
height: 50px;
width: auto;
display: flex;
align-items: center;
&:hover {
    background-color: #c26c0b;
  }
`;

//----------------------- CARDS

export const ProductCard = styled(Card)`
background-color: transparent;
box-shadow: none;
border: none;
transition: box-shadow 0.3s, border 0.3s;
&:hover {
  border: 1px solid #fff;
  box-shadow: 0px 0px 10px 0px rgba(255,255,255,0.5);
}
`;


export const ServicesCard = styled(Card)`
  margin: 25px;
  width: 300px;
  height: 400px;
  background-color: #414141;
  color: white;
  box-shadow: 0px 0px 5px 1px rgba(207, 207, 207, 0.75);
`;


//----------------------- MENU

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    background-color: #111111f4;
    width: 350px;
    border-radius: 5px;
    transform: translate(0, 5px);
    box-shadow: 0px 0px 5px 1px rgba(207, 207, 207, 0.75);
    color: #ff9721;

  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &:hover {
    background-color: #1c181397;
  }
`;


//----------------------- OTHER ELEMENTS

export const LinkNoDeco = styled(Link)`
text-decoration: none;
`;
