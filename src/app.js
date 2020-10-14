const request = require('request');
const methods = require('http').METHODS;

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
            sendImmediately : true
        }
    }

    const requestOptions = {
        url : action.params.url,
        method : action.params.method || "GET",
        body : action.params.body || undefined,
        json : true,
        headers: action.params.headers || {},
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


//////////////// Helpers //////////////
async function getAllMethods(query) {
    return methods.filter(method=>method.includes(query || '')).map(method=>{  
        return {id:method, value:method} 
    });
}

getAllMethods();
module.exports = {
    sendRequest: sendRequest,
    getAllMethods: getAllMethods
}