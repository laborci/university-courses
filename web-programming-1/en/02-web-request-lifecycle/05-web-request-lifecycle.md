# The full path of a web request

## An ordinary operation with many characters

Let's say that Anna enters this address in the address bar of the browser:

`https://www.example.edu/articles/web`

For a human, this is a clear request: you want to open one of the article lists on the page called Example. However, text alone is not enough for the network. The browser has to find out which rules to communicate with, which machine to access, which resource to request, and then how to transform the received data into a visible interface.

It is worth imagining the process as a chain of library requests and deliveries. The title is not the book itself: it tells us which institution to contact and which copy to look for. DNS finds the network "address", the connection is established, HTTP is the formal language of the request and response, and the browser reads the received document and compiles the page from it. For a large website, additional systems—caches, load balancers, application servers, and databases—may work behind the librarian.

## 1. Address interpretation and first local decisions

The browser first parses the parts of the URL. The `https` scheme means that a secure HTTP connection must be used. `www.example.edu` is the host name for which a network address must be found. `/articles/web` is the path: the identifier of the requested resource on the server. If the address does not specify a separate port, HTTPS normally uses port 443.

Before the browser goes to the network, it may already have a usable response. You can check your browser's cache: a recently downloaded style sheet, image or even document may still be valid. This does not mean that the browser is "showing an old page"; the rules of the cache can determine how long a response can be considered fresh, and when at least confirmation must be requested from the server. A new navigation often does not start from scratch, but it is still worth going through the entire path in the explanation.

## 2. Name resolution: network address available from the domain name

`www.example.edu` is a human-readable name, but a network connection is established to an IP address. The browser therefore requests DNS resolution. This can return, for example, an IPv4 address such as `203.0.113.42`, an IPv6 address, or several addresses together. Resolution is often fast because the operating system, browser, local network, or DNS provider may store previous responses.

Multiple IP addresses are not an anomaly. It can help with load distribution and availability, and with a CDN you can direct the visitor to a geographically or network-close entry point. An important conclusion is that a domain name does not necessarily represent a single physical server. In the same way, a single IP address can be shared by many domains.

## 3. Connection building and the trust layer of HTTPS

Knowing the IP address, the browser initiates a connection. Traditional HTTPS traffic is based on TCP: the two endpoints agree that they are both ready to exchange data. In the modern case, both HTTP/3 and QUIC may occur; the user point is the same: the browser needs a reliable, properly sequenced and protected communication channel.

With HTTPS, the connection does not immediately start with an HTTP request. During the TLS handshake, the server issues a certificate, the browser verifies that it is valid for the requested domain, comes from a trusted authenticator, and is valid in time. Then they agree on the parameters of the encrypted communication. Encryption protects the data in transit, and the certificate helps ensure that the browser actually connects to the expected service.If an error occurs here, the browser can issue a warning before the page loads. This is not a simple "inconvenience": on public Wi-Fi, for example, it is particularly important that an attacker cannot impersonate another server without being noticed.

## 4. Send the HTTP request

When the secure connection is ready for use, the browser sends a request for the main document. Its conceptual form is, for example, like this:

```http
GET /articles/web HTTP/2
Host: www.example.edu
Accept: text/html
Accept-Language: hu-HU
User-Agent: Mozilla/5.0 ...
Cookie: session=abc123
```

`GET` indicates that the client is requesting to retrieve a resource. `Host` is particularly important because the same IP address can serve multiple websites; from this, the server knows which virtual website the request belongs to. ``Accept'' indicates the desired content types, and ``Cookie'' - if it is available and the rules allow - can carry the status from the previous visit, for example the login ID.

The application is often not directly in the way of the request. A CDN can return an already stored image or HTML, a reverse proxy can manage encryption and routing, a load balancer can choose a backend server. These layers are not "bypasses": they are a normal part of how the high-traffic web works. From the user's point of view, however, a request is still made to a single URL.

## 5. What does the server do behind the request?

For a simple static page, the server can return a cached HTML file. In a dynamic web application, the request comes to application code. The application can interpret the route, check the user's authorization, retrieve data from a database, call another service, and then generate HTML or JSON.

For example, the `/products/42` page of an online store is not necessarily a pre-made file. The system can check whether product 42 exists, whether it is available in the visitor's country, at what price it should be displayed, and what recommendation is associated with it. The result is still returned as an HTTP response.

```http
HTTP/2 200 OK
Content-Type: text/html; charset=utf-8
Cache-Control: no-cache
Set-Cookie: session=def456; Secure; HttpOnly

<!doctype html>
<html>...</html>
```

The status code succinctly indicates the result. `200 OK` is a successful response; `301` or `302` can indicate a redirect, `404` means no such resource, and `500` is typically a server-side error. The headers describe, among other things, the format of the body, cache rules, and other instructions for the response. In the body, the HTML document itself arrives here.

## 6. An HTML response is not the end of the page, but the beginning

When the first document arrives, the browser starts reading the HTML and builds the DOM, the internal tree-shaped model of the document, from it. Meanwhile, you can find references such as a style sheet, JavaScript file, font, or image:

```html
<link rel="stylesheet" href="/styles/site.css">
<script src="/scripts/app.js"></script>
<img src="/images/university.jpg" alt="University building">
```

Each link can trigger another resource request. Modern browsers load many of these in parallel; that's why you can often see dozens or hundreds of requests in the Network view of the developer tools. Some resources may delay the display of others. For example, CSS is needed to make the page look the way you want, and JavaScript can modify the document or request additional data from the API later.

The browser calculates the layout based on the DOM, CSS rules, and resources, and then draws the pixels. A single spectacular website is therefore not a single downloaded file, but a collaboration of documents, images, fonts, styles, scripts and data.

## 7. Why can a page be slow or faulty?

If the page appears slowly, the error can occur in several places. The DNS response may be slow, the network latency may be high, the TLS connection may take a long time to establish, or the server may take a long time to get to the first byte of the response. Then, a large image, too much JavaScript, or blocking stylesheets can also delay the usable appearance. It is therefore not correct to automatically state that "the Internet is slow".Likewise, an error page indicates only one station. A `404` usually indicates that the request went to a server that could not find the given route. A certificate error, on the other hand, can stop the process before a secure connection is established. In the developer tools, the status code, remote address, timeline, and response headers work together to help you decide where to look next.

## Common misconceptions

- **"The URL is the address of a server."** Not exactly. A URL identifies a resource; after the domain name is resolved, it can even lead to several changing network addresses.
- **"Browser downloads a page."** Usually downloads a main document and many related resources, often with additional API calls.
- **"HTTPS just means there's a padlock."** TLS provides encryption and server identification; padlock does not guarantee that the website itself is a reliable business operator or an error-free application.
- **"404 means no internet."** On the contrary: it usually indicates that the server has been reached, only the requested resource cannot be found.

## Review questions

1. On the basis of which part of the URL does the browser select the rules of communication and on which basis the resource?
2. Why is DNS needed if the user has already entered the domain name?
3. What two basic purposes does TLS serve in an HTTPS connection?
4. Why is it not certain that the browser communicates directly with the application server?
5. What does the `Content-Type: text/html` header mean and what does the `200 OK` status code say?
6. What happens when the browser finds an `<img>` or `<script>` link in HTML?
7. List three different reasons that can cause a slow page load.

## Glossary

- **DNS resolution:** finding the IP address or addresses associated with a domain name.
- **Resource:** any identifiable content or data available on the web, such as HTML, an image, an API response, or a style sheet.
- **HTTP request and HTTP response:** standard message of the client's request and the server's result.
- **TLS:** is the encryption and authentication protocol layer used by HTTPS.
- **Status Code:** short result indication of the HTTP response, for example `200`, `404` or `500`.
- **Header:** a name-value pair carrying the metadata of the HTTP message, for example `Content-Type`.
- **CDN:** geographically distributed server network that can deliver content closer and faster.
- **DOM:** the tree-shaped model of the HTML document built by the browser, which can also be used by programs.
- **Rendering:** the process of drawing the document and styles to the screen.
