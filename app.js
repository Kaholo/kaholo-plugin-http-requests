const kaholoPluginLibrary = require("@kaholo/plugin-library");
const { default: axios } = require("axios");

const { safeParseJSON } = require("./helpers");

async function sendRequest(params) {
  const {
    bearerToken,
    username,
    password,
    url,
    method,
    body,
    headers,
  } = params;

  const requestHeaders = {
    ...headers,
  };
  if (bearerToken) {
    requestHeaders.Authorization = `Bearer ${bearerToken}`;
  }

  const requestConfig = {
    url,
    method,
    data: safeParseJSON(body),
    headers: requestHeaders,
  };

  const auth = {};
  if (username) {
    auth.username = username;
  }
  if (password) {
    auth.password = password;
  }
  if (Object.keys(auth).length > 0) {
    requestConfig.auth = auth;
  }

  const { data } = await axios(requestConfig);
  return data;
}

module.exports = kaholoPluginLibrary.bootstrap({
  sendRequest,
});
