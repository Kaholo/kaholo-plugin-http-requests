const request = require("request");

function sendRequest(action) {
  let auth;
  if (action.params.bearerToken) {
    auth = {
      bearer: action.params.bearerToken,
      sendImmediately: true,
    };
  } else if (action.params.username || action.params.password) {
    auth = {
      user: action.params.username,
      pass: action.params.password,
      sendImmediately: true,
    };
  }

  const requestOptions = {
    url: action.params.url,
    method: action.params.method || "GET",
    body: action.params.body || undefined,
    json: true,
    headers: action.params.headers || {},
    auth,
  };

  return new Promise((resolve, reject) => {
    request(requestOptions, (err, response) => {
      if (err) {
        return reject(err);
      }
      return resolve(response);
    });
  });
}

module.exports = {
  sendRequest,
};
