# HTTP status codes

The status code is the server's short, standard response to what happened with the request. It is not a mere debugging detail: the browser, crawler, API client and cache can also decide on the next step from this.

## The first line of the answer

For example, a response starts with HTTP/1.1 404 Not Found. The programs primarily interpret three-digit numbers. 404 means that the server could not find the requested resource at the specified address. It's not that there is no internet or that the whole website is definitely wrong.

| Family | Report |
| --- | --- |
| 1xx | information during processing |
| 2xx | successful request |
| 3xx | next step, usually a redirection |
| 4xx | the request cannot be fulfilled in this form |
| 5xx | server side or backend service problem |

4xx and 5xx are not about flawed people. 4xx can be a bad URL, a missing entry, or asking too quickly; 5xx may be a temporary overload. A good service gives the machine an exact code and an explanation that can be understood by humans.

## 1xx – processing

1xx responses are less often visible in a browser. 100 Continue can be used so that before sending the body of a large request, the client is sure that the server is willing to accept it. 101 Switching Protocols can indicate a protocol switch, for example when switching to a WebSocket connection. 103 Early Hints may refer to preloadable resources before a definitive answer. This shows that HTTP does not always consist of a single request and a final response.

## 2xx – success, but which kind?

200 OK is the most common successful response. For a GET /time request, the server can send a 200 OK response with Content-Type: application/json header and {"time":"2026-08-12T10:15:00.000Z"} body.

201 Created indicates that a new resource has been created. A good answer for a new application is 201 Created and Location: /api/jeldkezesek/815. 202 Accepted means that the server has accepted the request, but the lengthy processing is not yet complete - for example, video conversion or virus scanning is in progress. 204 No Content says the request was successful, but there is no response on purpose; after a frequent successful DELETE.

It is a myth that every success requires 200. The exact code helps: after 201 we know that a new object has been created, after 202 we can ask for status, and after 204 we don't try to process non-existent JSON.

## 3xx – redirects and cache

301 Moved Permanently indicates a permanent move, with the new address in the Location header. 302 Found is historically a common redirect code; in many cases, 303 See Other is clearer, which can instruct the browser to retrieve the result page with GET after POST. That way, when you update, you won't send the form again.

307 Temporary Redirect is a temporary redirect that preserves the original method. The 308 Permanent Redirect is the same in the permanent case. This is particularly important for POST. 304 Not Modified is for a cache check: the client has a cached copy and the server says it's still fresh. Not general business has not changed answer.

## 4xx - problem with the request

A 400 Bad Request is for a formally incorrect or incomprehensible request, such as corrupted JSON or a missing required parameter. The error body should be specific, for example {"error":"validation_error","field":"email","message":"A valid email address is required."}.

401 Unauthorized has a misleading name: it typically means missing or incorrect authentication. In the case of 403 Forbidden, the server knows who is asking, but does not allow the operation. A student can be logged in, but cannot see administrator data.

404 Not Found is a missing resource. 405 Method Not Allowed says that the path exists, but the given method cannot be used on it; the Allow header can show what is allowed. 406 Not Acceptable can come when the response format requested by the client is not available. According to 408 Request Timeout, the server is no longer waiting for incomplete requests.409 Conflict indicates a conflict with server status, for example registration with an already taken email address. 410 Gone says that the previously existing resource has been permanently removed. 413 Content Too Large is typical for an uploaded file that is too large. For example, 415 Unsupported Media Type is good if the API expects JSON, but the client sends a different type of body. 422 Unprocessable Content can be used for requests that are good in form but rejected in terms of content, for example in the case of an expired application deadline. 429 Too Many Requests indicates a speed limit; the Retry-After header can tell you when to retry.

## 5xx - the service failed to respond correctly

500 Internal Server Error means an unexpected internal error. The user should not be shown full error traces or secret data; a short message and error ID are enough. 501 Not Implemented says the server does not support the required feature; this is not the same as 405.

A 502 Bad Gateway is often a proxy or gateway response when it receives a bad response from a backend service. 503 Service Unavailable means temporary overload or maintenance. 504 Gateway Timeout means that an intermediate component has been waiting too long for a backend service. The exact code helps the operator and also whether the client should wait and try again.

## Worked example: home upload

A student uploads a submission. 401 can come without login. Logged in but with forbidden file type 415; with file too large 413; expired 422. Successful new submission 201 Created and submission URL is correct. If the virus scan is a background process, 202 Accepted is an honest response. If the site is under maintenance, a 503 is better than a misleading 200 response.

## Typical misconceptions

**A 404 is always a server error.** No; may also be an incorrect or outdated reference.

**401 means I'm not authorized.** More specifically, you're not properly authenticated. The known but forbidden operation 403.

**It is enough to return a 200 response with a failed result flag.** This misleads HTTP-level clients. Correct error code and detailed body together is better.

**500 is appropriate for all errors.** 503 is more accurate for overload, 504 for gateway timeout.

## Review questions

1. When would you choose 201 over 200?
2. Why is 202 different from 200?
3. In what situation does 304 make sense?
4. Explain the difference between 401 and 403.
5. Which code is for a too large uploaded file?
6. How are 502, 503 and 504 different?
7. Why is it misleading to answer 200 to an incorrect request?

## Glossary

- **Status code:** three-digit HTTP result signal.
- **Redirect:** response to a further request, often redirecting to another URL.
- **Location header:** specifies the address of a new or redirected resource.
- **Authentication:** verification of who the requester is.
- **Authorization management:** deciding what the identified requester can do.
- **Validation:** checking the form and content of submitted data.
- **Gateway:** component mediating to another background service.
- **Timeout:** the time given for communication has expired.
- **Cache validation:** checking the freshness of a previous answer.
