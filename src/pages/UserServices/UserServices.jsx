import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { API_URL, API_URL_LOCAL } from "../../utils/constants";
import { buildReq } from "../../utils/auth0Utils";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading/loading";
import { useNavigate } from "react-router";
import UserServicesCards from "./UserServicesCards";

export default function UserServices() {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();

  const [isCoach, setIsCoach] = useState(false);

  const [loading, setLoading] = useState(true);

  const getDate = () => {
    let actual = new Date();
    let day = actual.getDate();
    day = day < 10 ? "0" + day : day;
    let month = actual.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let year = actual.getFullYear();
    let today = year + "-" + month + "-" + day;
    return today;
  };

  const checkServiceCoach = (service) => {
    let found = false;
    service.coachIDs.forEach((coachId) => {
      if (coachId === user.userID) found = true;
    });
    return found;
  };

  const today = getDate();

  const [userServices, setUserServices] = useState();

  useEffect(() => {
    const id = user.userID;
    const getUser = async (id) => {
      try {
        const req = await buildReq({}, getAccessTokenSilently);
        // const url = `${API_URL}/userservices?userId=${id}`
        const url = `${API_URL_LOCAL}/userservices?userId=${id}`
        const response = await axios.get(url, req);
        const { data } = response;
        // console.log(data.map((userService) => userService.Service));
        console.log(data);
        if (data) {
          setUserServices(data);
          setLoading(false);
        } else {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.error("Error fetching User:", error);
      }
    };
    if (user.userID) getUser(id);
    if (user.systemRole === "Coach") setIsCoach(true);
  }, [user]);

  useEffect(() => {

  }, [userServices]);

  if (loading) return <Loading loading={loading} />;

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: 150,
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <UserServicesCards
        userServices={userServices}
        disabled={!userServices.length}
        userServiceDisabled={(userService) => userService.finishDate < today}
        title="In course:"
        redirectButtonName="Buy"
      />
      <UserServicesCards
        userServices={userServices}
        disabled={!userServices.length}
        userServiceDisabled={(userService) => userService.finishDate >= today}
        title="Caducated:"
        redirectButtonName="Buy"
      />
      {true || isCoach ? <UserServicesCards
        userServices={userServices}
        disabled={!userServices.length}
        userServiceDisabled={(userService) => userService.finishDate < today && checkServiceCoach(userService)}
        title="Your classes:"
        redirectButtonName="Create service"
      /> : null}
    </Box>
  );
}
