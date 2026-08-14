# OAuth 2.0 and OpenID Connect

## Objectives

Students understand the distinct purposes of OAuth 2.0 and OpenID Connect (OIDC), the main participants in an authorization flow, and why redirect-based login requires careful validation.

**OAuth 2.0 delegates access; OpenID Connect adds interoperable identity. Neither protocol means “send a password to another website.”**

OAuth 2.0 lets a resource owner grant a client limited access to a resource hosted by another service. Its usual actors are the resource owner, client application, authorization server, and resource server. The client redirects the user to the authorization server; the user authenticates there and consents to requested scope; the server returns a short-lived authorization result to a registered redirect URI. The client exchanges that result for tokens and uses an access token at the resource server.

OIDC is an identity layer on OAuth 2.0. In addition to an access token, it can provide an ID token containing claims about the authenticated user. A client must validate the token cryptographically and check issuer, audience, expiry, nonce/state-related binding, and expected redirect URI. Reading a name or email from an unverified token is not authentication.

Scopes should be narrow and meaningful: requesting basic profile information is different from requesting permission to read mail or modify files. A consent screen is not a substitute for careful design; the application should ask only for data it genuinely needs. Redirect URIs must be pre-registered and exact, since a loose redirect rule can leak authorization results.

## Walkthrough

When a student selects “Sign in with an identity provider”, the course application creates an unpredictable `state` value, remembers it, and redirects the browser to the provider. After authentication, the provider redirects back to the exact registered address. The application verifies that the returned state matches its original request and validates the received OIDC information before creating its own local session. The external identity is evidence; the local application still controls its own accounts and permissions.

## Common misconceptions

**“OAuth is a login protocol.”** Its central role is delegated authorization; OIDC provides standard authentication information.  
**“An access token is safe to expose because it expires.”** Until expiry, a bearer token may be usable by whoever obtains it.  
**“Consent means unlimited future access.”** Scope, duration, revocation, and user expectations still matter.

## Review questions

1. What problem does OAuth 2.0 solve?
2. What does OIDC add to OAuth 2.0?
3. Why must a client validate a redirect response and token claims?
4. Why should requested scopes be minimal?

## Glossary

**Authorization server:** service that authenticates users and issues authorization results or tokens.  
**Resource server:** service hosting protected data or operations.  
**Scope:** a bounded set of permissions requested by a client.  
**ID token:** OIDC token carrying authenticated identity claims.
