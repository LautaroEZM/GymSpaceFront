import { useSelector } from "react-redux";
import styles from "./statusChecker.module.css";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { warning } from "../../REDUX/actions";
import { Box } from "@mui/system";

export const status = (redux, auth0) => {
  
  if (redux.status === "unregistered") {
    return "complete";
  } else if (!auth0) {
    return "log";
  } else {
    return "safe";
  }
};

export function StatusChecker({ status }) {
  const dispatch = useDispatch();

  const message =
    status === "complete"
      ? "You must complete your data to access all functionalities"
      : "You must log in to access all functionalities";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid red",
        height: "40px",
        alignItems: "center",
        alignSelf: 'center',
        backgroundColor: 'crimson'
      }}
    >
      <Typography sx={{color: 'black', marginLeft: 2, marginRight: 2}} variant="h6" color="initial">
        {message && message}
      </Typography>
      <Button sx={{border: '1px solid darkred'}} onClick={() => dispatch(warning(false))}>X</Button>
    </Box>
  );
}
