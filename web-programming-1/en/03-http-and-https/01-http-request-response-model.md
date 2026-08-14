# The HTTP request-response model

The basic dialogue of the web is simple: the client requests something, the server gives an answer. HTTP is the common language of this dialogue. It is not only used by browsers: a mobile application, a command line program or two server-side services can also communicate in the same way.

## A page load is actually a lot of dialogue

When someone opens the Web Programming I subject page in the university system, the browser first requests an HTML document. However, the document can reference style sheets, images, fonts, JavaScript files, and API data. The browser can initiate a request for these separately. The user perceives a single page load, but there are many HTTP conversations going on in the background.

This is important: a web page is not necessarily a file. A modern web interface is a collection of resources. It can contain HTML intended for humans, but it can also contain JSON data, an image, a video clip or the result of a login.

## Client, server, resource

A client is a program that requests a service. Most often, it is a browser, but a phone application or another server can also be a client. The server is the program or service that receives the request and produces a response. The word server can also mean a machine, but from an HTTP point of view, the service running on it is more interesting.

Roles are not permanent. An application server is a server for the browser, but can be a client when requesting data from a payment service provider. Therefore, we always interpret which party is the client and which is the server in the given relationship.

A resource is something identified by an address that the client interacts with. It can be a document, product image, user profile or data provided by an API endpoint. The URL tells us what we are referring to; and the method with what intention.

## Structure of a request

An HTTP request consists of a header, headers and, if necessary, a body. A simple request for example:

    GET /courses/webprog1?semester=2026-fall HTTP/1.1
    Host: peldaegyetem.hu
    Accept: text/html
    Accept-Language: hu
    User-Agent: Mozilla/5.0

In the initial line, GET is the method: the client wants to retrieve the resource. /kurzusok/webprog1 is the path, and the part after the question mark is a query parameter. The Host header is important because one IP address can host multiple websites. Accept tells what response types the client can process; Accept-Language specifies a language preference.

The header is additional information in the form of name-value. You can describe the conditions, format, authorization or caching of the content, not the content itself. The body is the actual data sent. GET usually has no body; In a POST request, however, the form or JSON document can be here.

## Structure of a response

The server response has a similar structure:

    HTTP/1.1 200 OK
    Content-Type: text/html; charset=utf-8
    Content-Language: hu
    Cache-Control: no-cache

    <!doctype html>
    <html lang="en"><body><h1>Web Programming I</h1></body></html>

200 OK is the status code and its short description. It means that the server successfully fulfilled the HTTP request; not that the site is useful for all business purposes. Content-Type indicates how the client should interpret the body. This is HTML with UTF-8 encoding.

The same works for JSON. For a GET /api/courses/webprog1 request, the server can send a 200 OK response with a Content-Type: application/json header and a body like this: {"code":"WEBPROG1","name":"Web Programming I","credits":3}. It is not a visible website, but full-fledged web communication takes place.

## Statelessness: why is it good and what is its difficulty?

HTTP is basically stateless. A request must be self-explanatory; the server does not have to remember the previous request. This is an advantage at high load: requests can be distributed among several servers, because any of them can process them if all the necessary information is received.This is not to say that web applications are stateless. Shopping cart, login, selected language and unread messages are all statuses. The connection can be established by a cookie, a server-side session or a token. If someone adds something to a basket, the next request should also indicate which basket it belongs to.

## Worked example: a time endpoint

A minimal server can serve the /time route. The browser sends a GET /time request to the address localhost:3000, the server reads the current time, then sends a 200 OK response with Content-Type: application/json header and, for example, this body: {"time":"2026-08-12T10:15:00.000Z"}.

The server does not write to the browser's screen, but returns data. The client decides whether to display this as plain text, as a clock, or as part of a table. This makes the client-server model tangible.

## Typical misconceptions

**HTTP is for HTML pages only.** No: you can use it for images, APIs, videos, files, and machine-to-machine communication.

**The server is always a machine.** Behind the address can be many machines, proxies and background services.

**200 means everything is OK.** Just that there was a successful response at the HTTP level.

**One page load is one request.** A page usually starts many requests, and there can be requests in the background without navigation.

## Review questions

1. What is the difference between a client and a server?
2. Which three main parts can an HTTP request consist of?
3. What does the Content-Type header say?
4. Why is statelessness beneficial for services using multiple servers?
5. How to connect two consecutive requests with the same user?
6. Why can there be multiple HTTP requests when loading a single page?

## Glossary

- **HTTP:** standard application protocol between client and server.
- **Client:** program or system requesting a service.
- **Server:** the service that processes the request and sends a response.
- A document, data or service identifiable by the title **Resource:**.
- **Method:** HTTP verb indicating the intent of the request.
- **Header:** additional information in the form of name-value in the message.
- **Body:** the actual content of the message.
- **Status code:** is the standard result indication of the response.
- **Statelessness:** the basic principle of independent handling of requests.
