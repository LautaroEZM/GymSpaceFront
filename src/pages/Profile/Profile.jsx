import Container from "@mui/material/Container";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuth0();

  const [userInfo, setUserInfo] = useState()

  useEffect(() => {
    const sendUser = async () => {
        console.log(user);
      try {
        const response = await axios.get(
          "https://gymspacebackend-production-421c.up.railway.app/users",
          user
        );
        const {data} = response
        if (data) setUserInfo(data)
      } catch (error) {}
    };
    if (user) sendUser();
  }, [user]);

  return <Container maxWidth="xs"></Container>;
}
