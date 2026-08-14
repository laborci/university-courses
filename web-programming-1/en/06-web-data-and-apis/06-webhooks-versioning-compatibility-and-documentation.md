# Webhook, API versioning, compatibility and documentation

An API is not just a collection of URLs, but a contract between two independently changing systems. A good contract is accurate, documented, preferably backwards compatible, and also makes it clear how information is received when something happens on the other side.

## The boundary of the questioner model

In the previous examples, the client initiated the contact: he asked if a new order had been received, if the status of a package had changed, or if a payment had been made. This is called polling. For example, an application might send a `GET /orders?status=new` request every minute. The model is simple, because the client is in control: he asks when he wants, and the answer corresponds directly to the request.

However, in many cases it is wasteful. If 10,000 merchants query the payment provider every minute, but there are only five transactions per day in a given store, the API will overwhelmingly respond that there is nothing new. Moreover, with a one-minute polling, an event reaches the system with a maximum of one minute delay. Faster polling can reduce latency, but increases traffic, cost, and burden on the service provider.

## What does the webhook solve?

A webhook is the reverse pattern of event notification. The receiving party provides its own address accessible via HTTPS, for example `https://bolt.example.hu/hooks/payment`. When an important event occurs in the payment provider, the provider sends an HTTP request to this address. It typically sends a `POST` request with a JSON body. The store therefore does not ask "has a payment already been made?", but receives a notification when it has been made.

A simplified message might look like this:

```http
POST /hooks/payment HTTP/1.1
Host: shop.example.hu
Content-Type: application/json
X-Event-Type: payment.succeeded
X-Signature: t=...,v1=...

{
  "event_id": "evt_8f2",
  "type": "payment.succeeded",
  "created_at": "2026-08-12T09:15:00Z",
  "data": {
    "payment_id": "pay_502",
    "order_id": "order_173",
    "amount": 12990,
    "currency": "HUF"
  }
}
```

In this case, the payment system is the sender, and the merchant's system is the receiver. This differs from the picture in which the browser is always the client and the server is always the responder. The roles "client" and "server" refer to a specific HTTP connection: in the webhook call, the service provider itself is the HTTP client.

## The webhook is not guaranteed, it is a one-time postman

It's easy to think that a webhook is a perfect one-time notification. The reality is more cautious. The address may be temporarily unavailable, the recipient may respond slowly, a network error may occur, or the sender may not know for sure whether he received the reply. Because of this, service providers typically retry a failed delivery. An event can arrive more than once, and the sequence of two different events is not necessarily the same as in which they were created at the service provider.

Therefore, the receiving side must be idempotent: repeated processing of the same `event_id` should not create a second order or a second credit. In practice, the application stores event IDs that have already been handled and returns a successful response on retry, but does not perform the business operation again. The webhook endpoint should respond quickly with a `2xx` status code; longer processing is often performed in a separate background process.For security reasons, you should not rely solely on the source IP address of the request or the secrecy of the URL. The service provider often sends a signature in the header. Based on the shared secret and the body of the raw request, the receiver checks whether the message was actually sent by the service provider, and the time stamp can be used to protect against old, replayed requests. Authentication is therefore also part of the API contract for webhooks.

## Variable contract: why should it be versioned?

Imagine a weather API that initially sends:

```json
{ "city": "Szeged", "temperature": 28 }
```

A client uses this `temperature` field. If the provider later renames the field to `temperature_celsius` with good intentions, the client may get blank data or an error overnight. The service provider's own system may work flawlessly, but it has broken the applications of external users. This is a backwards compatibility issue.

A backwards-compatible change could be, for example, adding a new, optional field: `humidity`. The old client can ignore it and the new one can already use it. Deleting or renaming a risky change field, changing the data type ("28 °C" instead of `28'), making a previously selectable parameter mandatory, or rewriting the meaning of a status code. Behavioral compatibility is equally important: the shape of the JSON remains the same in vain if, for example, the sorting or paging rules change.

The API version indicates which contract rules apply. A common solution is the version in the path: `https://api.example.com/v1/weather`. Other systems ask for the version in a header, for example `Accept: application/vnd.example.v2+json`, or use a date-based version. There is no perfect method for every situation. The route version is easy to see and easy to teach; the header-based solution clutters the URL less, but is less noticeable when trying it manually.

## Life cycle and derivation

Releasing a new major version does not mean that the old one disappears immediately. A responsible service provider publishes the change log, indicates the decommissioning date, provides a transition guide, and operates the old endpoint in parallel during a transition period. The "deprecated" marking means that the function can still be used, but it is no longer necessary to build a new development on it. Abruptly shutting down an outdated API leaves integrators vulnerable; on the other hand, the old version maintained indefinitely is a security and maintenance burden. Versioning is therefore a technical and collaborative issue at the same time.

With webhooks, special attention must be paid to the scheme of events. If the structure of the `payment.succeeded` message changes, it must be documented and versioned in the same way as the response of a queryable endpoint. It is good practice if the event type and schema version can be clearly identified and the receiver can safely ignore unknown fields.

## What makes an API documentation good?

The API documentation is not advertising text, but a user agreement. First, you need to tell what base URL (base URL) the requests are coming from, what environments there are, such as test and production, and how authentication is done. The HTTP method, path, parameter name, type, binding, and meaning must be visible per endpoint. Documentation should show specific request and response examples, including error responses.

It is also useful to clearly indicate the limits: how many requests are allowed per minute, how long a token is valid, how big the response can be, and how paging works. In the case of a webhook, the registration method, a list of possible event types, a description of signature verification, time limits and retry rules are required. A statement "OK for 200" is not documentation in itself: the developer needs to know what `400`, `401`, `403`, `404`, `409`, `429` or `500` situations can occur and what to do about them.The OpenAPI description format is used to make this contract readable by the machine. Tools can create interactive documentation, client code sketches or tests from it. This is convenient, but not a substitute for human explanation: business concepts, the cause of errors, and the intent of correct use still require clear text.

## Worked example: package tracking notification

An online store would like to automatically display when the courier has received the package. According to the courier service's documentation, the online store first registers for a `shipment.status_changed' event. Enter the host URL and set a secret. Later, the courier service sends a `POST` request to the specified address; the body contains the shipment ID, the old and new status, and a unique event ID.

The online store's system checks the signature first. It then checks to see if it has already processed the `evt_912` event. If so, it sends a `204 No Content` response: the message is considered delivered, but there is no need to change status again. If it is a new event, it stores the ID, updates the order, and then also returns a successful response. If the request is bad JSON, a `400 Bad Request` response may be correct; if there is a temporary database error, `500` tells the provider to try again. The contract must record all of this.

## Common misconceptions

- **"Webhook does not need to be authenticated because the URL is secret."** The URL can be leaked from logs, browser history or configuration. Signature verification is required.
- **“A webhook arrives exactly once.”** Reliable delivery may involve retries; the receiver must handle the duplication.
- **"Anything in the API can be renamed if we issue a changelog."** External clients are running systems. Breakthrough change requires a version, transition and communication.
- **"The documentation is only for the convenience of developers."** Without accurate documentation, two systems can interpret the same request differently, which becomes a business error.

## Review questions

1. What is the difference between polling and webhook initiator, traffic and latency?
2. Why is idempotency necessary when receiving a webhook?
3. Name two backwards compatible and two breaking API changes!
4. What information should a webhook documentation contain about security and error handling?
5. Why is it not enough to show only the successful JSON response in an API documentation?

## Glossary

- **Webhook:** HTTP-based notification that is sent by a service provider to a pre-specified receiving address as a result of an event.
- **Polling:** a regular query initiated by the client to check whether a change has occurred.
- **Idempotent operation:** Repeated execution gives the same final result as the one-time operation.
- **Backwards compatibility:** a new version can work together with the client created for the previous contract.
- **API Version:** An identifiable release of the API contract.
- **Deprecation:** official designation of a function that is still available but will be discontinued in the future.
- **Schema:** description of the structure, fields and data types of a message or response.
