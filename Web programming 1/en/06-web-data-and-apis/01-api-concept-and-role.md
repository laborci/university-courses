# Concept and role of API

An API (Application Programming Interface) is a set of rules that describe how a program can request services or data from another program. On the web, this agreement mostly consists of HTTP requests and structured responses.

## Why doesn't everyone talk to everyone directly?

Imagine a university study system. The student looks at his/her recorded subjects in a browser, a mobile application sends a notification about the change, the instructor records the result on another interface, and an external identification service verifies access. These components must access the same business data, but none of them should be able to modify the database at will.

The API acts as a front desk here. The visitor does not enter the archive, but formulates his request at the reception: "I would like my own subjects". The reception checks who is asking, whether they are entitled to it, how the request should be interpreted, and then gives an answer in a regular form. The same isolation allows the browser interface to be replaced later by a mobile application without having to rewrite every detail of data management.

The API is therefore borderline. The internal implementation of the service provider's website - what database it uses, what language it is written in, how many servers it runs on - can vary. What is important for the consumer is that the public contract remains stable: where to send a request, what data is required, what response or error is expected.

## APIs aren't just on the web

The term API is broader than "Web API". A program requests a file or network connection through an operating system's API. A programming library's API tells you what functions can be called. The web API of a payment service provider, on the other hand, can be accessed over the network, typically using HTTP. In this subject, we mainly deal with the latter.

In a web environment, an API consumer can be JavaScript running in a browser, a mobile application, another server, a command-line tool, or an automated process. The service provider can be a self-developed back-end system or an external platform, such as a map service, weather data source or payment system. One usually sees a user interface; the program, on the other hand, uses an API.

## Guided through a request

Suppose a library page wants to display a list of searched books. The interface running in the browser can send this request:

```http
GET /api/books?author=Carinthia HTTP/1.1
Host: library.example.edu
Accept: application/json
Authorization: Bearer <access-token>
```

Here `GET` indicates that we are requesting data. The path selects the service for books, the `author` parameter narrows the search, and `Accept` says that we expect a response in JSON format. Identification is provided by the access token; in real systems this should never be shared in a screenshot, public repo, or message.

On success, this might be returned, for example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{"items":[{"id":42,"title":"Teacher please","author":"Karinthy Frigyes"}],"count":1}
```

The answer is not an HTML page: data. From this, the browser interface can decide how to display the title, author and number of results. The same answer can be used by a mobile application with a completely different look and feel.If the token is missing or expired, the server may return a `401 Unauthorized` status code, for example. If there is an incorrect parameter in the request, `400 Bad Request' may be the answer. It is part of the API contract that these situations are also predictable, not just the "happy way".

## What is included in the API contract?

The documentation for a usable API shall at least record the following:

- endpoints and access paths;
- supported HTTP methods;
- parameters, headers and body of the request;
- the format and fields of the answer;
- the success and failure status codes;
- authentication and authorization requirements;
- limitations such as query speed or paging;
- versioning and change rules.

The word "endpoint" often refers to a specific URL, but it is not enough by itself. `GET /books` and `POST /books` can represent two different operations on the same path. Therefore, the method, route, input, and response together make up the operation.

## Why is a good interface important?

A poorly designed API leaks too many internal details, uses inconsistent names, or is unclear about what happens when an error occurs. In such cases, clients rely on forced solutions, and any change is risky. A good API, on the other hand, is organized around the task of the consumer, provides clear data models, and enables evolution.

Importantly, the API is not automatically public. There are public APIs, APIs for partners, and APIs used only by an organization's internal systems. The method of access can be highly protected regardless. The fact that a request is visible in the Network panel of a browser does not mean that anyone can use it with authority.

## Common misconceptions

**"The API is a database."** Nope. The API is a regulated interface that can compile responses from multiple data sources and apply business rules.

**"An API is always JSON."** JSON is common today, but an API can use XML, a binary format, a file, or even HTML. The format is part of the contract.

**"If you have a URL, you can read anything from it."** Nope. The server may apply authentication, authorization, rate limiting, and other controls.

**"The API is only needed for an external service."** The connection between the client and server part of your own application is also an API.

## Review questions

1. What problem does the API solve by placing it between the user interface and the data?
2. Name two API consumers that can use the same service on different interfaces.
3. What parts does a web API operation consist of, and why is it not enough to just enter the URL?
4. Why is it important to also document an error response?
5. What is the difference between a public API and an API that can be used without authentication?

## Glossary

**API:** cooperation interface and rule system between programs.  
**API-consumer (client):** the program that calls the API.  
**API provider (server):** the system that processes the request and provides a response.  
**Endpoint:** an accessible operation of the API; often a combination of path and HTTP method.  
**Contract:** a documented agreement of the request, response, errors and rules.  
**Token:** typically time-limited data used for authentication or access.
