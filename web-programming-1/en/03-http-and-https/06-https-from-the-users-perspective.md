# HTTPS from the user's perspective

HTTPS is a secure, TLS-protected version of HTTP. When we see a padlock in the address bar of the browser, we get three basic promises: the traffic between the browser and the server cannot be easily read by others (**secrecy**), it cannot be changed without being noticed (**integrity**), and the browser has verified that the connection leads to a party with a certificate issued for the domain (**authentication**).

The lock is not a quality seal. It does not mean that the online store is honest, that the uploaded file is harmless, or that the user's identity is definitely real. It only says something about the security properties of the connection. A phishing site can have a perfectly valid HTTPS certificate; the fake domain name remains fake.

## What happens in the background?

At the beginning of an HTTPS connection, the browser and the server perform a TLS handshake. The server sends its certificate, which contains, among other things, the public key associated with the domain name. The browser checks whether the certificate is valid, whether it is for the requested name, and whether it can be verified through a chain of trusted certificate issuers. They then jointly create a temporary encryption key that is used to protect further HTTP traffic.

You don't need to remember the details of the math, but the model is important: it's not the server that "sends its secret key", and it's not the padlock that encrypts the website. TLS protects the transport channel between the browser and the server. If the application itself mishandles the password or asks for too much data, HTTPS will not fix it.

## What can an attacker see and change in HTTP?

On open Wi-Fi, the URL, the cookie, the password entered in the form and the full text of the response can be seen in the unencrypted HTTP request. A man-in-the-middle attacker can even insert another login form or advertisement. With HTTPS, the content of the connection is encrypted, so another participant on the same network cannot simply read it or rewrite it.

This does not mean complete invisibility: a network monitor can often see with which IP address we communicate, how much data moves and when. Some name resolution data may also be visible depending on configuration. The purpose of HTTPS is not to hide all metadata, but to protect web messages.

## Certificate errors and correct reaction

If the browser warns that the connection is not private, it may be due to an expired certificate, incorrect system time, a misconfigured server or an attack attempt. On an unknown page asking for login, this should not be routinely bypassed by clicking "continue". In the case of a university or workplace system, the operator must be notified. The public Wi-Fi login page can exceptionally cause a strange redirection, but enter a password only if the domain and certificate are OK.

## HTTPS and the web application

HTTPS is not an optional convenience feature today. Modern browsers provide many capabilities - such as geolocation, camera or some storage and service worker functions - only in a secure environment. The `Secure` cookie can only be sent via HTTPS. The server often redirects from HTTP to HTTPS and may provide an HSTS header:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

This tells the browser not to attempt unencrypted HTTP for that domain in the next period. Setting it up incorrectly can cause serious availability problems, so it should only be used with a working, full HTTPS operation.

## Misconceptions and verification questions

- "With HTTPS, the site is trusted." Not; the connection is protected, the business content is not necessarily.
- "Password storage is safe from the certificate." Not; database password management is a separate issue.
- "HTTP only occurs on old websites." We can still see it today, but it is unacceptable for login or personal data.

1. What are the three basic properties of TLS?  
2. What does the lock icon not say?  
3. Why is it risky to enter with a certificate error?  
4. Why is the `Secure' cookie attribute useful?

## Glossary**HTTPS:** HTTP over TLS. **TLS:** protocol protecting the confidentiality and integrity of the connection. **Certificate:** domain-bound cryptographic certificate. **Certificate authority (CA):** an actor in the chain of authenticity of certificates. **HSTS:** header requesting to enforce the use of HTTPS on the browser side.
