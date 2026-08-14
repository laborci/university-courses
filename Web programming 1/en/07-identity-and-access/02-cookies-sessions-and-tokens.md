# Cookies, Sessions, and Tokens

## Objectives

Students should understand that cookies, sessions, and tokens are not synonyms but building blocks that are often used together. They should be able to explain how a request can be connected to an earlier session and compare server-side sessions with self-contained tokens.

**A cookie is primarily a browser mechanism for sending data, a session is state associated with a period of use, and a token is a portable proof or identifier. None is secure by itself; meaning and protection depend on the design of the system.**

## Cookies are HTTP data, not merely consent banners

A cookie is a small name–value item that a server asks the browser to store and later return under defined conditions:

```http
Set-Cookie: session_id=F8vK...; Path=/; HttpOnly; Secure; SameSite=Lax
```

The browser may then send `Cookie: session_id=F8vK...` with a matching request. The value is not proof that its sender is the legitimate owner; it resembles a cloakroom ticket. The server must determine whether the identifier exists, is valid, has expired, has been revoked, and which session it denotes.

`Secure` limits transmission to HTTPS. `HttpOnly` prevents page JavaScript from reading the value, reducing the impact of some cross-site scripting incidents. `SameSite` controls when a browser sends the cookie with a request initiated from another site and contributes to CSRF protection. `Path`, `Domain`, expiry, and host-only settings further limit scope. Necessary login or basket cookies must be distinguished from tracking and marketing cookies: they use the same technical mechanism but have different purposes and privacy implications.

## Sessions and tokens

In a server-side session design, the meaningful state remains on the server. The browser usually carries only an unpredictable session identifier, while the server maps it to a user, expiry time, selected organisation, or completed MFA step. This supports central revocation: on logout or suspicious activity, the server can delete the session. The cost is shared state: when several servers answer requests, they need a common session store or carefully managed affinity.

A token is a value a client presents as evidence of authentication or access. It commonly appears in a header:

```http
Authorization: Bearer eyJhbGciOi...
```

“Bearer” means that possession is sufficient to use it, so a token must never leak into URLs, logs, screenshots, or chat messages. Some tokens are opaque random values whose meaning is looked up by the issuer. Others carry claims themselves. A JWT is usually a signed structure containing a header, payload, and signature. Base64url encoding is **not encryption**: payload data should not be treated as secret. The receiver must validate the signature, issuer, audience, expiry, and claims relevant to the service.

There is no religious choice between a session cookie and JWT. Sessions offer straightforward revocation and minimal client data. Short-lived signed tokens can be useful between independent services, but are harder to invalidate immediately. Choose after considering browser versus machine-to-machine use, logout requirements, services involved, devices, and risk.

## Walkthrough: a university portal

After Balázs signs in over HTTPS, the portal creates server-side session state and returns an `HttpOnly`, `Secure`, appropriately `SameSite`-restricted cookie. On each later request, the portal looks up the session and then still checks whether the requested grade belongs to Balázs. Logging out on a shared computer should invalidate the server-side session, not merely remove local browser data.

## Common misconceptions

**“JWTs are encrypted.”** Typical JWTs are signed, not automatically encrypted.  
**“Cookies are inherently bad.”** They are standard transport mechanisms; their settings and use determine risk.  
**“Deleting a cookie is always logout.”** Critical systems also need server-side invalidation and expiry.

## Review questions

1. What is the difference between a cookie and a session?
2. What do `HttpOnly`, `Secure`, and `SameSite` do?
3. Why must a JWT payload not be treated as confidential?
4. Why is an access token unsafe in a URL?

## Glossary

**Cookie:** HTTP data stored and conditionally returned by a browser.  
**Session identifier:** a random value referencing server-side session state.  
**Bearer token:** a token usable by whoever possesses it.  
**JWT:** a structured, usually signed JSON Web Token; it is not synonymous with encryption.
