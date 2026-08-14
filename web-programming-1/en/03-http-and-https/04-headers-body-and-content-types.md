# Headers, body and content types

When a browser requests a web page, it doesn't simply tell the server, "I want this page." Sends a well-structured HTTP message. The message begins with short instructions for the machine; these are the **headers** (headers). After them - if there is any - comes the sent content, the **message body** (body). This division explains many mundane phenomena: why a download dialog appears, how the server knows the user is logged in, or why an API call is allowed from one website and not from another.

## Reading a raw request

A simple browser request looks roughly like this:

```http
GET /tantargyak/webprog HTTP/1.1
Host: example.edu
Accept: text/html,application/xhtml+xml
Accept-Language: hu-HU,hu;q=0.9
User-Agent: Mozilla/5.0 (...)
Cookie: session=abc123

```

The first line is the initial line of the request: method, path and HTTP version. The following lines are headers. A header `Name: value` pair: not the content of the page, but the condition necessary to interpret the message. The empty line indicates the end of the headers. This `GET` request has no body; not all HTTP messages contain one.

The answer was divided in the same way:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: max-age=600
Content-Length: 248

<!doctype html><html><body><h1>Web programming</h1></body></html>
```

The first line here is a status line. The HTML after the response headers is the body. Important difference: `Content-Type` does not "make HTML" out of the text, but tells the receiving party how to handle it. If the same sequence of bytes is sent by the server as `text/plain`, the browser can display it as text, not as a document.

## Content type: what did we send, what do we ask for?

A **MIME type** or media type consists of two parts, for example `text/html`, `application/json`, `image/png`. In the response, `Content-Type` describes the actual body sent. For content with characters, the coding also matters: `text/html; charset=utf-8`. Without UTF-8, accented letters may be displayed incorrectly.

``Accept'' in the request is not the same: it expresses the client's preference. For example, a program might ask for:

```http
Accept: application/json
```

This says, "I can interpret a JSON response." The server may decide otherwise, or give a `406 Not Acceptable` response. When submitting a form, a typical header indicating the shape of the body is:

```http
POST /api/signup HTTP/1.1
Content-Type: application/json
Content-Length: 38

{"name":"Kiss Anna","year course":2}
```

`Content-Type` here refers to the sent body, not what the client expects as a response. This is a common mix-up. `application/x-www-form-urlencoded` occurs for forms, and `multipart/form-data` for file uploads; Today, we typically use JSON for APIs.

## Headers that influence real decisions

`User-Agent` is an identification description of the client. In the past, servers used this to determine which browser to give which page. This is a vulnerable approach: the value is easily spoofed, and the browser's name does not match its capabilities. A modern solution is responsive design and ability-based control.

``Cookie'' is small data sent back by the browser and previously received from the server. For example, the server sends the following in the response:

```http
Set-Cookie: session=abc123; Secure; HttpOnly; SameSite=Lax
```

Later, the browser sends `Cookie: session=abc123` according to the same rules. This is how a series of stateless HTTP requests can be combined into a logged-in session. The cookie is not a secure "personal identification card": sensitive data must not be entered. `Secure` only allows sending via HTTPS, and `HttpOnly` hides it from JavaScript; both are important layers of protection.

`Authorization` can also carry credentials, but for a different purpose and mechanism. Common for APIs:

```http
Authorization: Bearer eyJ...
```

This does not make the request automatically secure. Without HTTPS, the token can be intercepted, logged, or give too broad permissions. For the browser user session, the authorization header is often suitable for cookies and API calls between machines, but there is no universal rule.

``Location'' typically appears when redirecting:```http
HTTP/1.1 302 Found
Location: https://example.edu/bejlentkezes
```

The browser then initiates a new request. 301 and 308 are more permanent, 302 and 307 are for temporary redirection; their method retention may differ. It is important for the developer to generate the value of `Location` reliably: building a redirect from user input without checking can lead to phishing.

## CORS: not a server error, browser protection rule

By default, the browser's same-origin rule prevents the JavaScript of `https://student.example` from reading the response of `https://api.example.edu`. The origin is a combination of scheme, hostname and port. **CORS** (Cross-Origin Resource Sharing) is a deliberate, response-header-based solution:

```http
Access-Control-Allow-Origin: https://student.example
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Headers: Content-Type, Authorization
```

Before certain requests, the browser sends an `OPTIONS` pre-query. This happens not because "the API is bad", but because the browser checks whether the server allows the request coming from the other origin, for example using the Authorization header. `Access-Control-Allow-Origin: *` may be appropriate for public, unauthenticated data; it is dangerous or insufficient for authenticated cookie traffic.

## Common misconceptions

- "The header is invisible, so it doesn't matter." Most of the network operation and security policy are decided here.
- "The Content-Type is only informative." Your browser, proxy, and security protection can also rely on it.
- "The cookie is the login itself." Mostly just a session ID; its meaning is provided by the server.
- "CORS protects the API from all attackers." Valid only in browser; not limited to a direct programmed request.

## Review questions

1. Where does the header part of an HTTP message end?
2. What is the difference between `Accept` and `Content-Type`?
3. Why is it not advisable to make a business decision based on `User-Agent`?
4. What two cookie attributes help reduce the risk of token theft?
5. What does CORS allow and what does it not?

## Glossary

**Header:** name-value information to interpret an HTTP message.  
**Body:** The actual sent content of the message.  
**MIME type:** identifier indicating the format of the content.  
**Cookie:** small data stored and returned by the browser according to rules.  
**CORS:** the mechanism operating in the browser, regulating access between origins.
