# Kaholo HTTP Requests Plugin
This plugin send HTTP Requests using any of HTTP Request methods - GET, POST, PUT, PATCH, or DELETE. The plugin makes use of [npm package axios](https://www.npmjs.com/package/axios) to do this.

If authentication is required, use either username/password for basic HTTP authentication or provide a JWT Bearer Token. Bearer Tokens typically expire so it is common for pipelines to first call an authorization API with username/password and then use the resulting bearer token in a subsequent Action to submit the desired service request. This requires some orchestration in the code layer. Alternatively, the bearer token may be manually copied from the final result of the authorization request and pasted into the Kaholo vault for use with the service request.

The request body is text that will be parsed as a JSON object if possible, or otherwise used as-is.

Headers must be provided in JSON string format or as an object from the code layer. For example:
    
    {"Content-Type":"application/json","X-Atlassian-Token":"no-check"}

## Token vs Bearer Token
There are two types of HTTP "tokens". One is to be used as the password for basic authentication and requires the username also be supplied. The other is called a "Bearer Token", sent in an "Authorization" request header. Tokens that do not quickly expire are probably the former, often called personal access tokens (PAT). Bearer tokens are commonly associated with OAuth. If in doubt, try using your token both ways and see which works.

## Authentication
Authentication parameters for this plugin are managed using Kaholo Accounts. In Kaholo Settings | Plugins, the name of the plugin, "HTTP Requests", is a blue link to plugin-level settings. Accounts are on the 2nd tab. Here several accounts may be created with combinations of username, password/token, and bearer token. Then at the action level only the account name need be selected for each action.

It is unlikely that all three of username, password, and bearer token should be required for any request. Most accounts will use either username and password (or token), or bearer token alone.

### Dummy Account
Accounts are required for all actions, even if no authentication is required for the HTTP Request. It is suggested to make an account named "Dummy Account" and leave all three parameters unspecified for this use case.

## Plugin Installation
For download, installation, upgrade, downgrade and troubleshooting of plugins in general, see [INSTALL.md](./INSTALL.md).

## Method: Send HTTP Request
Sends an HTTP request to the specified URL. This method accepts several parameters, most of which are optional.

### Parameter: HTTP Request Method
Select an HTTP request type to send from GET/POST/PUT/PATCH/DELETE.

### Parameter: URL
Specify the URL to which the request will be sent.

### Parameter: Body
Specify the body of the HTTP request. The format of the body should match any "Content-Type" header specified in parameter Headers.

### Parameter: Headers (JSON or Object)
Specify headers as a JSON string. If using the code layer, as a JSON object.

### Parameter: Username
If using basic authentication, specify the username for authentication. The username is used as `username` in Axios `requestConfig.auth`.

### Parameter: Password or Token
If using basic authentication, specify the Kaholo Vault item containing the password for authentication. The password (or token) is stored in Kaholo Vault so it does not appear in the UI, logs, or error messages. This parameter is used as `password` in Axios `requestConfig.auth`.

### Parameter: Bearer Token
If using a bearer token, such as for OAuth, specify the Kaholo Vault item containing the bearer token here. The token will be included in the request header as `"Authorization":"Bearer <vault item content>"`. The Bearer Token is stored in Kaholo Vault so it does not appear in the UI, logs, or error messages.

If using one HTTP Request with basic authentication in order to get a short-lived OAuth Bearer Token, the bearer token may be included in the header using the code layer. This parameter is then not used. For example:

    const myHeaders = {
    "Content-Type":"application/json",
    "Authorization":`Bearer ${kaholo.actions.HTTPRequests1.result.oauth.token}`
    }

The `HTTPRequests1` must match the actual ID of the upstream HTTP Requests action in the pipeline. What comes after `result` depends on what is returned by the request to issue a bearer token, which varies depending on the type and version of server to which the quest is made.

Once headers are formed in the code layer (i.e. a JavaScript block in the pipeline), in the downstream HTTP Requests action, e.g. HTTPRequests2, toggle the code switch on parameter "Headers (JSON or Object)" and then specify just `myHeaders`. This will inject the token obtained in action `HTTPRequests1` into the header of action `HTTPRequests2`.