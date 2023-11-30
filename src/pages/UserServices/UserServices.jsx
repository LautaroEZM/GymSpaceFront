import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { API_URL } from "../../utils/constants";
import { buildReq } from "../../utils/auth0Utils";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading/loading";
import ServiceCard from "../Services/ServiceCard";
import { OrangeContainedButton } from "../../styles/ComponentStyles";
import { useNavigate } from "react-router";

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
    service.coachIDs.forEach((e) => {
      if (e === user.userID) found = true;
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
        const response = await axios.get(`${API_URL}/userservices/${id}`, req);
        const { data } = response;
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 7,
        }}
      >
        <Typography variant="h3" color="white">
          In course:
        </Typography>
        {userServices.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {userServices.map((service, i) => {
              if (service.finishDate > today) {
                return <ServiceCard key={i} service={service} />;
              }
              <ServiceCard key={i} service={service} />;
            })}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            {" "}
            <Typography sx={{ paddingBottom: 5 }} variant="h5" color="white">
              {" "}
              Noghing here yet{" "}
            </Typography>
            <OrangeContainedButton onClick={() => navigate("/Services")}>
              Buy
            </OrangeContainedButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 3,
        }}
      >
        <Typography variant="h3" color="white">
          Caducated:
        </Typography>
        {userServices.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {userServices.map((service, i) => {
              if (service.finishDate < today) {
                return <ServiceCard key={i} service={service} />;
              }
              <ServiceCard key={i} service={service} />;
            })}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 3,
            }}
          >
            {" "}
            <Typography sx={{ paddingBottom: 5 }} variant="h5" color="white">
              {" "}
              Noghing here yet{" "}
            </Typography>
          </Box>
        )}
      </Box>
      {isCoach ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Typography variant="h3" color="white">
            Your classes:
          </Typography>
          {userServices.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {userServices.map((service, i) => {
                if (service.finishDate > today && checkServiceCoach(service)) {
                  return <ServiceCard key={i} service={service} />;
                }
                <ServiceCard key={i} service={service} />;
              })}
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 3,
              }}
            >
              {" "}
              <Typography sx={{ paddingBottom: 5 }} variant="h5" color="white">
                {" "}
                Noghing here yet{" "}
              </Typography>
              <OrangeContainedButton onClick={() => navigate("/CreateService")}>
                Create service
              </OrangeContainedButton>
            </Box>
          )}
        </Box>
      ) : null}
    </Box>
  );
}
