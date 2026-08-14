# Principles of REST

REST is not a framework and is not synonymous with JSON. A set of constraints that builds on the existing concepts of the web - resources, a unified interface, addresses and HTTP messages - so that systems can operate in an understandable and more loosely interdependent manner.

## Resources: what does the API talk about?

The starting point of REST thinking is the resource. A resource can be a book, a student, an order, an application for a subject, or a search result. The point is not the database table, but the concept that can be interpreted by the application. A book can have, for example, a stable ID and contact information:

```text
/books
/books/42
/students/7/enrollments
```

A URL names the resource or collection by noun. `GET /books/42` means: please get the current representation of book 42. `DELETE /books/42` targets the same resource but expresses a different intent due to a different HTTP method. This is more transparent than `GET /deleteBook?id=42`, which hides a modifying operation in a method intended for querying.

The URL does not always reflect the entire internal data structure. A good URL is stable and meaningful to the consumer; it does not unnecessarily reveal which database table or microservice is serving it. Lowercase, consistent, mostly plural names are readable, but the real requirement is consistency.

## Unified interface: method and report

REST relies on the standard methods of HTTP. `GET` is for query, it cannot change state. A `POST` is often to create a new item in a collection or to initiate an operation that does not lend itself to a simple resource update. `PUT` means to create or replace the complete identifiable state of a specific resource. `PATCH' is suitable for partial modification. `DELETE` indicates an intention to delete. `HEAD` requests headers similar to `GET` without a response body, and `OPTIONS` can provide information about communication options.

The safe method does not modify the business state of the server: this is the case with `GET', `HEAD', ``OPTIONS'' in general. Repetition of the idempotent method leads to the same final state: sending an identical `PUT` or `DELETE` repeatedly does not, in principle, create another change. `POST` is usually not idempotent: creating two identical orders can result in two orders. These are non-decorative tags: they affect caching, retries, and error handling.

## Representation: what we actually transmit

The resource and its representation are not the same. The book is a resource; the JSON response is a specific, snapshot view of the resource. A user with different authorizations can receive different fields, or the same resource can be requested in XML. The header `Content-Type: application/json` indicates what format the server sends, `Accept` indicates what the client would accept.

```http
GET /books/42 HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{"id":42,"title":"Teacher please","available":true}
```

The representation often includes metadata: in the case of a paginated collection, item number, next page, filtering information. These are not necessarily the fields of the "original object", but they are still necessary for the client to use the service correctly.

## StatelessnessOne limitation of REST is that each request must contain enough information on its own to be processed. The server should not guess the meaning of the request by remembering a previous message sent in connection. This does not mean that the system has no state: there is a database, there is a state linked to a logged-in user, there can also be a session. The point is to have the context needed to process the request, such as credentials and parameters.

This improves scalability: any properly configured server instance can handle the next request. However, due to tokens, cookies and server-side sessions, real systems are rarely "pure REST". The aim of the concept is not religious purity, but the reduction of hidden addictions.

## Status codes as a common language

The first line of the HTTP response briefly indicates the result. `200 OK' is a successful query or modification, `201 Created' is the creation of a new resource, often with a `Location' header. `204 No Content` success, but no body to return. In case of `400 Bad Request`, the form of the request is incorrect; `401 Unauthorized` rather means that authentication is required or failed; In the case of `403 Forbidden`, the client may be identified, but has no rights; In case of `404 Not Found`, the resource is not found; `409 Conflict` may indicate a conflict; `422 Unprocessable Content` is syntactically processable, but commercially invalid data.

`500 Internal Server Error` is an unexpected server error. You should not send `200 OK` with a `{"error":"..."}` trunk for every problem, because clients, proxies and monitoring devices cannot use the standard signals of HTTP in this way. The status code itself is short; the respondent can provide a detailed but not sensitive error message.

## Worked example: creating a book

The client can create a new book by sending a `POST` request to the collection:

```http
POST /books HTTP/1.1
Content-Type: application/json
Accept: application/json

{"title":"Teacher, please","author":"Karinthy Frigyes"}
```

The server checks the login, authorization and fields and then creates the resource with the ID `42`. A good answer might be:

```http
HTTP/1.1 201 Created
Location: /books/42
Content-Type: application/json

{"id":42,"title":"Teacher, please","author":"Karinthy Frigyes"}
```

Then `GET /books/42` retrieves it, for example `PATCH /books/42` only changes its availability, and `DELETE /books/42` sends a deletion request. If the same `DELETE` is sent again, the result is still that the book is not present; the specific response code might be `404`, but idempotency refers to the final state.

## HATEOAS: navigation through links

Part of the original, stricter understanding of REST is HATEOAS (Hypermedia As The Engine Of Application State): in the response, the server communicates what the next possible step is with links or action links. For example:

```json
{
  "id":42,
  "title":"Teacher please",
  "_links": {
    "self":{"href":"/books/42"},
    "borrow":{"href":"/books/42/loans","method":"POST"}
  }
}
```

In this way, the client is less forced to follow predetermined routes. In practice, many so-called "REST API" services do not fully implement HATEOAS; this still makes it a good HTTP-based API, but it just doesn't meet all the restrictions of REST terminologically.

## Typical misuses

**Operation in URL:** `POST /createBook` or `GET /deleteBook?id=42` bypass HTTP methods. There are exceptional actions - such as canceling an order - but they should also be treated as resources or clearly modeled state transitions.

**For all `POST`:** cache flags for `GET` and `PUT`/`DELETE` are lost.

**All responses are `200`:** the error is not visible by default for intermediate and client-side tools.

**Exporting the internal model of a database:** the representation of an API should not automatically be all columns and internal relations. This can cause security and compatibility issues.**“REST = CRUD”:** CRUD is a good approximation in many situations, but REST is a broader architectural principle and not all business processes can be modeled as just four database operations.

## Review questions

1. What is a resource and how does it differ from its representation?
2. Why does `GET /deleteBook?id=42` usually fail?
3. Which methods are typically idempotent, and what practical advantage does this give?
4. When is `201 Created` justified and what header can be connected to it?
5. What does statelessness mean and what does it not mean?
6. What is the purpose of HATEOAS?

## Glossary

**REST:** is a set of architectural restrictions that build on the web's unified interface.  
**Resource:** a concept or entity that can be identified and interpreted by the API.  
**Representation:** The transmitted form of the resource, such as a JSON document.  
**Idempotency:** repeated request results in identical final state.  
**Stateless:** a request contains the context needed to process it.  
**HATEOAS:** possible next actions guided by hypermedia links.
