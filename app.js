const kaholoPluginLibrary = require("@kaholo/plugin-library");
const request = require("request");

function sendRequest({
  bearerToken,
  username,
  password,
  url,
  method,
  body,
  headers,
}) {
  let auth;
  if (bearerToken) {
    auth = {
      bearer: bearerToken,
      sendImmediately: true,
    };
  } else if (username || password) {
    auth = {
      user: username,
      pass: password,
      sendImmediately: true,
    };
  }

  const requestOptions = {
    url,
    method,
    body,
    auth,
    headers,
    json: true,
  };

  return new Promise((resolve, reject) => {
    request(requestOptions, (err, response) => {
      if (err) {
        reject(err);
      }
      resolve(response);
    });
  });
}

module.exports = kaholoPluginLibrary.bootstrap({
  sendRequest,
});
