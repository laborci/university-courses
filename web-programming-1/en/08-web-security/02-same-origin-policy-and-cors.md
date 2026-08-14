# Same-origin policy and CORS

The same-origin policy (SOP) exists to prevent the JavaScript of an open site from freely reading sensitive responses from another site that is already logged in. CORS is a controlled exception declared by the server: the server can decide which browser code coming from another origin can read its response.

## What does origin mean?

The origin consists of three parts: **scheme** (protocol), **host** and **port**. `https://tananyag.example.hu:443` and `https://tananyag.example.hu` mean the same origin, because 443 is the default port of HTTPS. `http://tananyag.example.hu' has a different origin: the schema is different. `https://api.example.hu' is also a different origin because the host is different. The same is true for the address `https://tananyag.example.hu:8443`, because the port is different.

This definition is intentionally strict. ``example.hu'' and ``api.example.hu'' may look like the same organization to a person, but the browser does not guess ownership relationships. It only makes a default decision based on the exact origin. The organization can grant permission later with CORS.

## What would we do without SOP?

Imagine that someone is logged into their bank's site and then opens another malicious or compromised site in the same browser. If this page could read the bank's answers without restriction, personal information linked to the login status would be at risk. Some of the cookies sent by the browser may be connected to the bank, but the SOP prevents the JavaScript of the foreign page from simply accessing the content of the response.

It is important to be precise: the SOP does not mean that nothing can reach other origins. For example, a page may load an image, style sheet, or embedded page from another location; the browser needs this for historical and operational reasons. In particular, the restriction protects what data the running program code can **read** from other origins. Displaying an external image and processing a logged API response is a completely different risk.

## Collaboration of the same origin

A page running under `https://portal.pelda.hu` can read the `https://portal.pelda.hu/api/targyak` endpoint called from the same origin without any problems. The browser assumes that they are part of the same web trust space. However, if the interface runs on a separate domain, for example `https://app.pelda.hu`, and the API `https://api.pelda.hu`, the two addresses are separate according to the rule of origin. This is where CORS comes into play.

## CORS: permission granted by the server

Cross-Origin Resource Sharing, CORS for short, is an agreement based on HTTP headers. For a cross-origin request, the browser indicates where the request originated, typically in the ``Origin'' request header. In its response, the server can send, for example:

```http
Access-Control-Allow-Origin: https://app.pelda.hu
```

This does not "open the Internet", but tells the browser exactly: the code running from `https://app.pelda.hu` origin can read this response. If the response lacks the appropriate permission, the request may still reach the server in some cases, but the browser will not return the response to the JavaScript code. The developer may therefore see a CORS error in the console; this is primarily a sign of protection enforced by the browser.

Since CORS is a browser rule, it is not a general access protection. A server-to-server connection or a command-line HTTP client is not forced to the same browser check. Therefore, real data access must always be protected with authentication and server-side authorization management. CORS complements this, not replaces it.

## Simple and pre-verified requestsCertain lower-risk, standard-form requests are sent directly by the browser. These are often called "simple" CORS requests. The `Access-Control-Allow-Origin' header of the response then decides on the readability of the response.

In other situations, the browser sends a short verification request before the actual request. This is called **preflight**. Its method is `OPTIONS`, and it can provide information such as whether the subsequent request will use the `PATCH` method or, for example, send an `Authorization` header. The server must clearly indicate whether the given origin, method and header are allowed.

A simplified example:

```http
OPTIONS /api/sockelas/42 HTTP/1.1
Origin: https://app.pelda.hu
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: authorization, content-type
```

The server may allow you to continue if you list the appropriate values in the response:

```http
Access-Control-Allow-Origin: https://app.pelda.hu
Access-Control-Allow-Methods: GET, PATCH
Access-Control-Allow-Headers: Authorization, Content-Type
```

Preflight is not a business operation: a permission request to the browser. The server can also make the authorization result cacheable for a short time using the `Access-Control-Max-Age` header. Regardless, the server must still perform all authentication and authorization checks on the actual request.

## Authenticated cross-origin requests

One of the most careful cases is when the browser can also send login data related to the other origin, such as cookies. In this case, the client-side request must request the authenticated mode separately, and the server must indicate in the response:

```http
Access-Control-Allow-Credentials: true
```

In this situation, the `*` denoting all origins cannot be used as the `Access-Control-Allow-Origin` value; a specific, reliable origin must be specified. This is important because too broad a permission can easily link a user's logged in state to code on a page that has no need for it.

Cookies' own rules also apply. The `SameSite`, `Secure` and `HttpOnly` attributes influence when a cookie can be sent, whether it can only be used on an encrypted connection, or whether it can be accessed by JavaScript running in the browser. CORS does not override these rules. The secure system plans cookie settings, CORS and server-side authorization management together.

## Worked example: separate interface and API

Let there be a university application whose interface runs from `https://orarend.egyetem.hu` origin, and whose API is available at `https://api.egyetem.hu`. The interface wants to retrieve the timetable of the logged-in student.

Since the host is different, the browser treats the case as a cross-origin request. The operator of the API consciously decides to allow only the official interface. In the response, therefore, specify exactly this origin and only those methods and headers that are really needed. If the request is linked to user identification, the solution selects the secure authentication mechanism and the server checks for each response: whether this user really requested his own timetable.

Let's assume that a test surface is also created later. It is not a good practice to grant permission to all origins for convenience. Rather, the origin of the test gets a separate, environment-related configuration. If a request comes from an unexpected website, the CORS response will not allow the browser code to access the API response. The API cannot, however, abandon its own identification: a different type of client does not fall under the CORS rules.

## Design advice

Let's start with the narrowest necessary permission. Specify the authorized origin(s), usable methods and headers. A different setting may be correct for a public, unauthenticated API than for an application that handles personal data. Do not confuse the two cases.The `Origin` header value should not be automatically treated as full identification; CORS is a browser rule, not a login proof. The configuration should be reviewed for each environment, and error paths should also be tested: for example, do error messages arrive with the expected CORS headers when necessary, without leaking sensitive details.

## Common misunderstandings

**"A CORS error means the API is not working."** Not necessarily. The API could respond, but the browser does not allow JavaScript running from the specified origin to be read.

**"CORS protects the API from unauthorized requests."** It is not a substitute for authentication and authorization. The server itself must be able to tell who and what can be retrieved or modified.

**"The subdomain has the same origin."** Nope. The origin contains the full hostname; `app.example.hu` and `api.example.hu` have separate origins.

**"`*` is always convenient and harmless."** It may be justified for public data, but it is incorrect for authenticated responses involving personal data and cannot be combined with an authenticated CORS request.

## Review questions

1. Which three components determine the origin of a URL?
2. What is the main purpose of the same-origin policy?
3. In the case of CORS, who decides whether an origin can read a response?
4. Why does the browser send a preflight before certain requests?
5. Why does CORS not replace server-side authorization management?

## Glossary

- **Origin:** combination of scheme, host and port.
- **Same-origin policy (SOP):** the browser's basic rule for separating data of different origins.
- **CORS:** Controlled permission given by HTTP headers for cross-origin browser reading.
- **Preflight:** permission request based on `OPTIONS` before the actual request.
- **Authenticated request:** a request for which the browser can also include identification data linked to the target origin.
- **Access-Control-Allow-Origin:** response header indicating the allowed origin.
