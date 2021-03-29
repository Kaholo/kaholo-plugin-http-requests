# kaholo-plugin-http-requests
HTTP requests plugin for Kaholo

## Method: Send Request
Lists all services enabled in the specified project.

### Parameters:
1. Method (string) **Required** - HTTP request type. POST/GET/PUT/PATCH/DELETE
2. URL (string) **Required** - The URL to send the request to.
3. Body (string) **Optional** - The body of the HTTP request.
4. Headers (object) **Optional** - An object contating the headers of the request.
5. Username (string) **Optional** - The username to authenticate with in case it's needed.
6. Password (vault) **Optional** - The password to authenticate with in case it's needed.
7. Bearer Token (string) **Optional** - Bearer Token to authenticate with. not needed if Username and password were passed