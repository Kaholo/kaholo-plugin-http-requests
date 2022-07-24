# Kaholo HTTP Requests Plugin
This plugin send HTTP Requests using any of HTTP Request methods - GET, POST, PUT, PATCH, or DELETE. The plugin makes use of [npm package request](https://www.npmjs.com/package/request) to do this.

If authentication is required, use either username/password or provide a JWT Bearer Token. Bearer Tokens typically expire so it is common for pipelines to first call an authorization API with username/password and then use the resulting bearer token in a subsequent Action to submit the desired service request. This requires some orchestration in the code layer. Alternatively, the bearer token may be manually copied from the final result of the authorization request and pasted into the Kaholo vault for use with the service request.

Headers (other than bearer token) must be provided in JSON object format in the code layer. For example:

    header =
    {
        name: 'content-type',
        value: 'application/x-www-form-urlencoded'
    }

Then toggle the Code switch on the parameter and provide the variable name `header` as the code.

## Method: Send HTTP Request
Sends an HTTP request to the specified URL. This method accepts several parameters, most of which are optional.
* HTTP Request Method **Required** - Select an HTTP request type to send from GET/POST/PUT/PATCH/DELETE.
* URL **Required** - The URL the request is to be sent to
* Body - The body of the HTTP request
* Headers (object) - An object contating additional headers for the request
* Username - The username for username/password authentication
* Password - The password for username/password authentication, stored in Kaholo Vault so it does not appear in the UI, logs, or error messages
* Bearer Token - The Bearer Token to use for authentication, stored in Kaholo Vault so it does not appear in the UI, logs, or error messages
