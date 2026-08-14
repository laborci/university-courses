# The Flow of Third-Party Sign-In

## Objectives

Students can describe the browser-visible steps of a third-party sign-in flow and identify the checks that protect it.

**Third-party sign-in is a carefully bound exchange of redirects and verifiable results. The application never needs to receive the external provider password.**

The process begins when the application creates a login transaction. It generates high-entropy values such as `state` (and, in OIDC flows, a nonce), records them temporarily, and redirects the browser to an identity provider with a client identifier, requested scopes, and an exact redirect URI. The user sees and authenticates on the provider's domain, not on the application’s imitation of it.

After authentication and any consent, the provider redirects the browser back to the registered callback with a short-lived authorization code and the transaction-binding value. The application verifies the state before exchanging the code through a back-channel for tokens. In an OIDC flow it validates the ID token's signature and claims. It then links the external stable subject to a local account and establishes its own session.

The important protection is not one parameter alone. The redirect URI must be registered; state must be unpredictable and checked; codes must be short-lived and single-use; tokens must be validated and protected; and errors must not leak details or leave half-created accounts. Mobile and public clients commonly use PKCE to bind a code exchange to the client that initiated it.

## Example

If `study.example` accepts a result intended for `other.example`, skips state validation, or trusts an unverified email field, an attacker may be able to confuse the login transaction. A secure design treats every redirected value as untrusted until it has been verified according to the protocol.

## Common misconceptions

**“The callback is safe because it comes from a known provider.”** URL parameters still need binding and validation.  
**“The browser should receive every secret.”** Browser-visible data has a wider exposure surface; keep secrets and exchanges appropriately protected.  
**“An email address is a stable identity.”** Email addresses can change or be reassigned; use a provider’s stable subject identifier.

## Review questions

1. Why does the application create `state` before redirecting?
2. Why are redirect URIs tightly registered?
3. Why should an authorization code be short-lived and single-use?
4. What is the purpose of mapping an external identity to a local account?

## Glossary

**Redirect URI:** registered application address to which an authorization server returns a result.  
**Authorization code:** short-lived value exchanged for tokens.  
**State:** client-generated value binding a response to its initiating request.  
**PKCE:** a mechanism that protects authorization-code exchange for public clients.
