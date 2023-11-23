import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../REDUX/actions";
import axios from "axios";

function Home() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch()

  useEffect(() => {
    const checkUser = async () => {
      if (user && isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://gymspacebackend-production-421c.up.railway.app/",
            scope: "read:current_user",
          },
        });
        const userDetailsByIdUrl = `https://gymspacebackend-production-421c.up.railway.app/users/${user.sub}`;
        const { data } = await axios.get(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (data) {
          dispatch(getUser(data))
        }
      }
    };
    checkUser();
  }, [user]);

  return (
    <div>
      <ImageCarousel></ImageCarousel>
    </div>
  );
}

export default Home;
