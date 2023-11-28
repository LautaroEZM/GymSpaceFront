import { useSelector } from "react-redux";
import styles from "./statusChecker.module.css";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button'
import { useDispatch } from "react-redux";
import { warning } from "../../REDUX/actions";

export const status = (redux, auth0) => {
    console.log(auth0);
    if (redux.status === "unregistered") {
      return "complete";
    } else if (!auth0) {
      return "log";
    } else {
      return 'safe';
    }
  };

export function StatusChecker({status}) {

    const dispatch = useDispatch()

  const message =
    status === "complete"
      ? "You must complete your data to access all functionalities"
      : "You must log in to access all functionalities";

  return (
    <div className={styles.container}>
      <Typography variant="h5" color="initial">
        {message && message}
      </Typography>
      <Button className={styles.btn} onClick={() => dispatch(warning(false))} >
        X
      </Button>
    </div>
  );
}
