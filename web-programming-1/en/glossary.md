# Glossary

## Web and network fundamentals

- **Internet:** a global system of interconnected computer networks.
- **World Wide Web:** a system of interlinked resources accessible through browsers on the Internet.
- **Client:** a program, such as a browser, that requests a service or resource.
- **Server:** a system that provides a service or resource over a network.
- **Client–server model:** a model in which a client requests, a server processes, and a server responds.
- **Protocol:** an agreed set of communication rules.
- **URI:** a general identifier for a resource.
- **URL:** a URI that also specifies the location and access method of a resource.
- **Domain name:** a human-readable hierarchical network name.
- **DNS:** a distributed naming service that maps domain names to network information.
- **IP address:** a numerical address of a network endpoint.
- **Port:** an identifier for a network service on a host.
- **TCP:** a reliable, connection-oriented transport protocol.
- **TLS:** a security protocol that provides confidentiality, integrity, and authentication.
- **CDN:** a geographically distributed content delivery network.

## HTTP and browsers

- **HTTP:** the core protocol for client–server communication on the web.
- **HTTPS:** HTTP protected by TLS.
- **Request:** a client’s request for a service or data.
- **Response:** the server’s processed result for a request.
- **HTTP method:** the intended operation of a request, such as `GET` or `POST`.
- **Status code:** a standardized numerical indication of request processing.
- **Header:** a name–value pair carrying metadata about an HTTP message.
- **Body:** the actual content of an HTTP message.
- **Cache:** temporary storage of a prior response or resource for faster reuse.
- **HTML:** the language that describes the structure and semantics of a web document.
- **CSS:** the rule system that describes web-document presentation and layout.
- **JavaScript:** the browser programming language used for interactivity and client-side processing.
- **DOM:** the programmable document-object tree constructed by the browser.
- **Rendering:** the process of drawing a document and its styles on screen.
- **Service worker:** a browser-side background program that can mediate network requests.
- **PWA:** a progressive web application.

## Architectures and APIs

- **MPA:** multi-page application; navigation usually loads a new HTML document.
- **SPA:** single-page application; much of the interface changes through browser-side navigation.
- **CSR:** client-side rendering; the browser mainly constructs the interface using JavaScript.
- **SSR:** server-side rendering; the server generates HTML for a request.
- **SSG:** static site generation; pages are generally generated before publication.
- **API:** a programmable interface through which systems access data or operations.
- **Endpoint:** an API operation identified by an HTTP method and path.
- **JSON:** a text-based structured data exchange format.
- **REST:** a resource-oriented API approach built on HTTP semantics.
- **GraphQL:** a schema-driven query language and API approach.
- **RPC:** remote procedure call; an operation-oriented API approach.
- **Webhook:** an event-triggered HTTP notification initiated by a provider.
- **WebSocket:** a persistent, bidirectional communication channel between client and server.

## Identity and security

- **Authentication (AuthN):** proving who the requester is.
- **Authorization (AuthZ):** deciding what an authenticated requester may do.
- **Cookie:** small site-bound data that a browser may send to a server under defined conditions.
- **Session:** server-side record of state for a user interaction.
- **Token:** portable identifier or assertion associated with a requester or access grant.
- **OAuth 2.0:** a framework for delegated, limited access.
- **OpenID Connect:** an identity layer built on OAuth 2.0.
- **SSO:** single sign-on; one central authentication used across multiple services.
- **MFA:** multi-factor authentication.
- **Same-origin policy:** a browser security rule separating resources from different origins.
- **CORS:** controlled permission for cross-origin browser reads granted through HTTP headers.
- **XSS:** a risk caused by untrusted content being treated as executable code.
- **CSRF:** a request that uses a signed-in user’s state without reflecting that user’s conscious intent.
- **Injection:** a family of flaws caused by mixing data with executable instruction structure.
- **OWASP:** a community and knowledge base on web application security risks and defences.

## Quality, accessibility, and operations

- **Accessibility:** ensuring that a digital service can be used by people with diverse abilities.
- **ARIA:** accessibility roles and attributes that supplement HTML semantics when needed.
- **Responsiveness:** adaptation of an interface to different screens and devices.
- **SEO:** the practice of making content understandable and discoverable by search engines.
- **AIO:** the practice of making content understandable for AI-based search and assistants.
- **LCP:** a metric approximating the time until the largest visible content element appears.
- **INP:** a metric approximating the delay before visible feedback after an interaction.
- **CLS:** a metric summarizing unexpected visual layout shifts.
- **Availability:** the proportion of time a service is usable as intended.
- **SLI:** a metric that measures a service level.
- **SLO:** a target value set for an SLI.
- **SLA:** a contractually stated service commitment.
- **Observability:** the ability to infer internal system state from logs, metrics, and traces.
- **Rate limit:** deliberate limitation of request frequency for a client or identifier.
- **Graceful degradation:** controlled restriction of less important functions to preserve essential operation.
