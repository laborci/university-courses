# HTTPS and secure communication

## Goals

By the end of the material, the student understands why it is not enough for a website to "be on the Internet": the communication between the browser and the service must also be protected. Able to explain the purpose of HTTPS and TLS, the role of certificates and CAs, the importance of HSTS and mixed content. It also recognizes that HTTPS is an essential foundational layer, but it does not verify the integrity of a service or replace other security measures in an application.

**HTTPS is not a lock icon, but an essential security feature of a web connection: it helps protect data from being read and modified in transit, and it helps verify that the browser is connected to the expected service. However, a faulty or deceptive application does not by itself make it secure.**

## What's wrong with the unencrypted web?

Let's imagine that Bence opens an HTTP page on a public Wi-Fi network and then fills out a login form. Without encryption, multiple actors in the network – such as the operator of the access point, a poorly protected intermediate network device, or a malicious observer – can in principle read or modify the traffic. It is not only the password that is problematic: visited pages, form data, searches, session cookies and program code from the server can also be sensitive.

The danger of modification can easily be underestimated. If someone can rewrite an HTTP response along the way, they can not only display different text, but also insert, for example, advertising, tracking code, or malware code. The JavaScript downloaded by the browser is particularly sensitive: it runs with the permissions of the page, can access the interface and, in many cases, the data provided by the user. Confidentiality and integrity are therefore important together.

HTTPS is a TLS protected use of the HTTP protocol. In casual shorthand, we say "HTTPS encrypts", but the purpose has three parts. **Confidentiality** means that the content of the connection cannot be easily read by an unauthorized party. **integrity** means that the transferred data cannot be changed unnoticed. And **server identification** means that the browser has reason to believe that it is really communicating with the service belonging to the domain that we see in the address bar.

## What does TLS do?

TLS (Transport Layer Security) is the protocol family that provides the protection layer of the HTTPS connection. The browser and the server perform a so-called TLS handshake at the beginning of the connection. The details of this are cryptographically complex, but the conceptual picture is useful: the parties agree on the state-of-the-art security procedures they use; the server verifies its domain-related identity; then they jointly produce connection keys with which further traffic travels encrypted and integrity protected.

A good analogy is an identified, sealed courier service. We do not send our entire message publicly to the recipient, but first confirm the identity of the recipient, and then send further messages through a closed channel created for the relationship. True TLS is of course not a simple envelope, and its security is based on standards, browsers and server settings that have evolved over the years. The point here is that HTTP application-level messages now travel in a protected channel.

This does not mean that all information is invisible. At the network level, there may still be observable metadata, such as which IP address someone connects to, approximately when, and with how much data traffic. The method of DNA resolution can also matter. At the same time, HTTPS protects the content of a typical web request and response: the route, several parts of the header, form data, cookies, and the response body from intermediate actors in the network path.

## Certificates: why does the browser trust the server?If it were a purely encrypted connection, an attacker could offer his own encrypted channel while pretending to be a bank or university server. Therefore, the browser also needs proof of the identity of the server. This is what the digital certificate serves. Among other things, the certificate states that a public key belongs to a specific domain name, for example `tanulmanyi.pelda.hu`.

The browser does not know the operator of each website personally. Instead, it relies on certificates from trusted certificate authorities (Certificate Authority, CA) and the chain of trust leading to them. The browser or operating system's preinstalled trust store contains root certificates. A server's certificate is often linked to such a root through intermediate certificates. The browser checks whether the chain is valid, whether the certificate is for the requested domain, whether it has not expired, and whether the technical parameters of the connection are acceptable.

The certificate warning should not be bypassed routinely. It can be a harmless configuration error or development environment, but it can also indicate a real risk on a public network. However, the existence of the certificate is not a value judgment of the website: a phishing site can also obtain a valid certificate for its own, deceptive domain. The padlock therefore indicates that the connection between the browser and the domain in the address bar is protected; not that the service provider is reliable, that the content is true, or that the purchase is a good decision.

## HTTPS on the entire path

A website does not consist of a single file. In addition to the main HTML document, you can load style sheets, images, fonts, JavaScript files, API calls, analytics services, and embedded content. If the main page is HTTPS, but one of its important resources arrives via HTTP, we are talking about mixed content. This breaks the protection model: a modifiable script or style sheet can compromise an otherwise protected page.

Browsers typically block particularly dangerous active mixed content, such as JavaScript loaded over HTTP. Some passive elements like images may have behaved differently historically, but the developer's correct goal is simple: all resources, redirects, and API endpoints should use HTTPS. The Console and Network views of the developer tools show such problems well.

The same goes for logging in. It is not enough if the form submission is directed to HTTPS, while the entry page itself was loaded via HTTP. The loaded form or the associated code may have been modified during the connection. A good starting point is that the entire service is HTTPS and HTTP requests are consistently routed to HTTPS.

## HSTS: fix the safe direction

Redirecting from HTTP to HTTPS is useful, but an unencrypted connection may still be established at the moment of the first HTTP request. HSTS (HTTP Strict Transport Security) is a rule communicated via a response header that the browser can remember: this domain should only be accessed via HTTPS in the future. If the user later writes `http://`, the browser can change it to HTTPS before sending the network request.

HSTS is not a panacea and requires careful implementation. There is not yet a strictly memorized rule on first encounter, although browsers may use a preloaded HSTS list for certain priority domains. In addition to a misconfigured domain or an expired certificate, a strict rule can make the site inaccessible, so the operator must pay attention to all subdomains, redirects and certificate lifecycles. From an educational point of view, the main message of HSTS is that a secure connection is not an occasional choice, but a default feature of the service.

## Worked example: logging into a university service

Bence enters the address of the university system into the browser. DNS helps you to the address of the service, and then the browser initiates an HTTPS connection. The server sends a certificate; the browser checks the domain name, validity period and trust chain. If the check is OK, the TLS connection is established. Only then will the HTML of the entry page, the corresponding CSS, JavaScript and images be loaded.Bence sends his password and the code for the second factor. The headers and body of the request travel in the channel protected by TLS. In case of success, the server sends a securely set session cookie in the `Set-Cookie` header. The browser returns this on subsequent HTTPS requests to the same service. You can also send an HSTS header to prevent the browser from trying HTTP next time.

Let's say that one of the old statistics scripts of the page is still at `http://`. The browser may indicate this as a warning or block. If the script could be loaded, a response modified on the way could even affect the login interface. The fix is ​​not to suppress the warning, but to serve the resource over HTTPS, from a trusted source, or to remove it.

## Limitations of HTTPS

HTTPS does not protect the user from entering their information on a fake site. If the address is `egyetem-belepes-pelda.hu', for example, the attacker can obtain a fully valid certificate for his own domain. That's why an accurate domain name, password manager warnings, and critical handling of phishing emails are still important.

It also doesn't fix the application's logic errors. An HTTPS system may have poor authorization management, may store too much personal data, may contain XSS vulnerabilities, or may send data to third parties in a way that is not transparent to the user. HTTPS protects the way data travels between the browser and the server; it does not determine whether the server handles it correctly when it arrives.

The protection of server-side logs, databases, backups and external integrations is also a separate task. Web security is layered: network communication, authentication, authorizations, application code, operation and data management rules together provide the level of protection.

## Common misconceptions

**"The lock means the site is trusted."** The lock indicates the security of the connection and the certificate bound to the domain, not the intent of the service provider.

**"HTTPS only required for checkout or login."** All web pages can protect sensitive browsing information and the unencrypted response can be modified.

**"HTTP→HTTPS redirect is perfect by itself."** Useful, but there is no encrypted connection before the first HTTP request; therefore, consistent HTTPS and HSTS where appropriate is important.

**"Certificate expiration is just an administrative detail."** In the case of an expired or incorrect certificate, the browser rightfully warns you because it cannot reliably check the connection.

**"If you have HTTPS, you don't need application security."** HTTPS is the base layer; it is not a substitute for input control, authorization control, or privacy design.

## Review questions

1. What are the three main features of using HTTPS/TLS?
2. Why is it dangerous if an HTTPS page loads JavaScript via HTTP?
3. What claim does a certificate verify and what does it not verify?
4. What is the purpose of HSTS and why should it be introduced with care?
5. Why can a phishing site also have a valid HTTPS certificate?
6. Name two security problems that HTTPS does not solve.

## Glossary

**HTTPS:** A form of HTTP communication protected with TLS.

**TLS:** protocol supporting confidentiality, integrity and server identification of network communication.

**Certificate:** A digital certificate linking a public key to a domain name.

**Certificate Authority (CA):** a trusted organization or infrastructure that issues certificates.

**Chain of Trust:** A verifiable link from the server's certificate to the root certificate known by the browser.

**Mixed content:** when some resources of an HTTPS page are loaded via HTTP.

**HSTS:** a rule given to the browser that forces subsequent access to a domain to HTTPS.

**Integrity:** the property of the fact that the data has not been imperceptibly modified during transmission.
