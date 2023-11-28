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

module.exports = { buildReq };
