# HTTP methods and their meaning

The URL tells what the client is directed to; and the HTTP method with what intent. A method is not a set piece. This allows the browser, proxy, cache, and developer to infer that the request is a query, creation, modification, or other operation.

## Why is the URL not enough?

The path /api/listeners/42 refers to the resource of listener 42. GET /api/listens/42 retrieves the data, DELETE /api/listens/42 expresses an intention to delete. Same address, different action.

This is better than an address such as GET /students/delete?id=42. A GET request can also be sent by a crawler, a previewer, or an accidental click. If this triggers deletion, the system is dangerous. The semantics of the methods is therefore a common contract.

## Safe and idempotent

Safe here does not mean encryption. It means that the purpose of the request is a query, it does not change the business state of the application. GET can retrieve a product, but cannot initiate a payment or delete a record. Logging may occur, but this is not the purpose of the request.

Repeated, identical execution of the idempotent method does not cause additional changes in terms of the desired end state. PUTing the same complete profile ten times will keep the same profile. After deleting the same resource several times with DELETE, it is not there at the end. The second request may respond with a 404; the target state is still the same.

| Method | Safe? | Idempotent? | Typical target |
| --- | --- | --- | --- |
| GET | yes | yes | request |
| HEAD | yes | yes | get metadata |
| POST | not | not necessarily | create or operate |
| PUT | not | yes | full replacement |
| PATCH | not | not necessarily | partial amendment |
| DELETE | not | yes | delete |
| OPTIONS | yes | yes | supported options |
| TRACE | yes | yes | diagnostic echo |
| CONNECT | not | not | proxy tunnel |

## GET - query

GET is used to retrieve a resource. Example: GET /api/courses?semester=2026-fall&instructor=Kovacs. Its parameters are often included in the URL, so the address can be shared, bookmarked, and in some cases cached. Passwords or tokens should not be used in query parameters, because URLs can also appear in history and logs. GET cannot be used for a real deletion, vote, or order.

## HEAD – request without content

HEAD is almost GET, but the response body is omitted. From a HEAD /downloads/installer.zip request, the client can learn the values of Content-Length, Content-Type, or Last-Modified without downloading the large file. It is useful for link checking and cache validation.

## POST – sending data or starting an operation

POST sends data for processing, can create a new resource or initiate an operation. Example: POST /api/subscribers, in body {"kurzus":"WEBPROG1","hallgatoAzonosito":"AB12CD"}. In the case of a new application, the server can send a 201 Created response and a Location: /api/applicants/815 header.

POST is not automatically more secure than GET: HTTPS, authorization check and input validation are required here as well. A POST sent twice can create two orders or applications, so it should be used with caution in network retries.

## PUT - replace entire representation

PUT means: this known address should contain the complete state of this resource. Example: PUT /api/profile/42, with body {"name":"Anna Kiss","email":"anna@example.test","notifications":true}. The server can overwrite the entire profile or create it in some systems. Repetition is usually idempotent. The documentation should explain what happens to omitted fields.

## PATCH - partial modification

PATCH sends only the changed part. The body of PATCH /api/profile/42 can be {"notifications":false}. That way, the name and email address do not have to be resent. Its format may vary by API. Not all PATCH requests are idempotent: repeating an “add 1 point” request can increase the value several times.

## DELETE – deletion intentDELETE requests the removal of a resource: DELETE /api/subscribers/815. The server can physically delete, but it can also use soft delete when the data is retained for audit purposes. From the client's point of view, the point is that the resource is no longer available. It is idempotent, but not secure, so never start it with an ordinary link.

## OPTIONS - what actions are possible?

OPTIONS asks about communication options related to the target. In browsers, CORS often appears as a preliminary check: OPTIONS /api/profile/42, Origin: https://student.example.edu, Access-Control-Request-Method: PATCH. The response may tell the browser whether PATCH from the other origin is allowed. The Allow header can list supported methods.

## TRACE - diagnostic echo

TRACE requests an echo of the request received by the server. It used to be used to scan proxies on the go. Since headers can contain sensitive data, modern servers often disable it. Worth knowing, we do not use it as a typical application endpoint.

## CONNECT - tunnel through proxy

CONNECT addresses an intermediate proxy and requests a tunnel to the destination: CONNECT api.example.edu:443. After a successful response, the proxy forwards the stream on which the client and target can establish a TLS connection. It is not a normal business API operation.

## An example of a minimal server

GET /time is natural because retrieving the time does not change business state. GET /add?a=2&b=3 is also an acceptable teaching example. If we were to save the calculation history, bill or change the balance, a POST or other appropriate status change endpoint is required.

## Review questions

1. What does the method express that the URL does not?
2. What does safe mean here and what is not?
3. Why is deletion implemented with GET dangerous?
4. What is the difference between PUT and PATCH?
5. Why is POST definitely not idempotent?
6. What can HEAD be used for?
7. Why can the browser start an OPTIONS request?
8. Who is CONNECT typically aimed at?

## Glossary

- **Safe method:** A method with the intention of querying and not modifying the business state.
- **Idempotency:** repeating the same request leads to the same target state.
- **Representation:** the state of the resource in a specific form, for example JSON.
- **Full replacement:** Overwriting the entire representation of a resource.
- **Partial modification:** update only selected fields.
- **CORS preflight:** preliminary OPTIONS check sent by the browser.
- **Proxy Tunnel:** A forwarded connection established by an intermediate proxy.
