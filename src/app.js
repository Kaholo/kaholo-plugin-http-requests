const request = require('request');

function sendRequest(action){
    let auth;
    if (action.params.bearerToken){
        auth = {
            bearer: action.params.bearerToken,
            sendImmediately : true
        }
    } else if (action.params.username || action.params.password){
        auth = {
            user: action.params.username,
            pass: action.params.password,
            sendImmediately : false
        }
    }

    const requestOptions = {
        url : action .params.url,
        method : action .params.method,
        body : action .params.body,
        json : true,
        headers: action .params.headers || {},
        auth : auth
    };
    
    return new Promise((resolve,reject)=>{
        request(requestOptions,function (err, response, body) {
            if(err){
                return reject(err);
            }
            resolve(response);
        });
    })
}

module.exports = {
    sendRequest: sendRequest
}