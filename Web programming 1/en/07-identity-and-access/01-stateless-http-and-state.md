# Stateless HTTP and the Problem of State

## Objectives

By the end of this unit, students can distinguish the data in one HTTP request from the longer-lived state of a web application. They understand why HTTP is described as stateless, why this does not mean that web applications cannot remember anything, and what security, privacy, and operational questions follow from remembering.

**An HTTP request is a single, independent message. A continuous user experience is created by deliberate application state management.**

When a browser opens a page, it sends a request and the server returns a response. In HTTP's basic model, the server does not automatically know whether the same browser made a request yesterday or what the user did on the previous page. This simplicity is one reason the web can operate at enormous scale. A shopping basket, a signed-in account, and a multi-page form nevertheless need some remembered information.

## What statelessness means

Imagine a service desk where a different clerk sits down after every sentence. Unless the new clerk is given the earlier context, the customer must repeat their name and the purpose of the visit. HTTP is similar: each request must carry enough information for the server to answer it.

```http
GET /products/42 HTTP/1.1
Host: shop.example
Accept: text/html
```

This says which resource is requested, from which host, and which representation the client accepts. It does not automatically say who the requester is, whether they saw the product before, or what is in their basket. Statelessness does not mean that the server lacks a database, a cache, or logs. It means HTTP itself does not prescribe an automatic memory of an earlier conversation. The application designer decides what is retained, for how long, and to whom it is linked.

## Why the model is useful

Independent requests are easy to distribute. A load balancer can send two successive requests to different servers, and a failed machine need not prevent the next request from being served elsewhere. Shared caching also works well for public content: many readers can receive the same news article, image, or stylesheet. A personal response such as `/my-account/invoices`, by contrast, must not be served from a shared cache. State and personalisation are therefore security boundaries as well as convenience features.

## Types and locations of state

User session state includes whether someone is signed in or which step of a security flow they have completed. Business state includes an order, booking, draft, or submission and normally belongs in durable server-side storage. Interface state includes an open tab, a filter, a dark-mode choice, or a collapsed menu; it can often live in browser memory, the URL, or local storage. Operational state includes request identifiers and monitoring data.

There is no universally correct place for state. `?q=web&page=2` is useful in a URL because it is shareable and works with browser history. A login secret must not be placed there, because URLs can appear in bookmarks, histories, logs, and referrer headers. Browser memory is quick but may disappear on refresh. `localStorage` persists but is available to page JavaScript, so it is a poor home for sensitive credentials. Server-side storage gives more control and revocation, but requires shared infrastructure when several servers are used.

## Walkthrough: a shopping basket

Anna first opens `shop.example/products/42` without an identifier. After she adds the product, the application must link the next request to a basket. For a guest user, it may issue a random identifier in a cookie and associate that identifier with basket data on the server. Every later request still remains independent; it simply includes the identifier that lets the server look up earlier state. After Anna signs in, the basket can be associated with her account and become visible on another device. That introduces further design choices: expiry, concurrent edits, ownership, and auditability.

## Common misconceptions

**“Stateless HTTP means users cannot stay signed in.”** They can: every new request carries an identifier or proof that links it to a session.

**“A cookie makes the server know me automatically.”** A cookie is only data. The server must decide whether it is valid, current, and entitled to anything.

**“All state should be stored in the browser because it is fast.”** Speed does not replace security, reliable backup, multi-device access, or revocation.

## Review questions

1. What does it mean, precisely, that HTTP is stateless?
2. How do interface state and business state differ?
3. Why does a stateless request model help load balancing?
4. Why is a search filter suitable for a URL but a login secret is not?

## Glossary

**State:** data derived from earlier events that affects later behaviour.  
**Statelessness:** the absence of a mandated automatic prior-conversation context in HTTP.  
**Session:** usually short-lived state associated with a period of user activity.  
**Load balancer:** a component that distributes incoming requests across servers.
