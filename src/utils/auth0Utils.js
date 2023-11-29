const uuid = require("uuid");
const buildReq = async (data, getAccessTokenSilently) => {
  const accessToken = await getAccessTokenSilently({
    authorizationParams: {
      audience: `https://gymspacebackend-production-421c.up.railway.app/`,
      scope: "read:current_user",
    },
  });
  

  const req = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    data: data,
  };

  return req;
};

const getUUID = async (auth0User) => {
  const userID = auth0User.split("|")[1];
  const userUUID = uuid.v5(userID, uuid.v5.URL);
  return userUUID;
};

module.exports = { buildReq, getUUID };
