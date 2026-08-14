# Web Programming I – How the Web Works, Its Standards, and Quality

The course enables students to understand the web as an open, distributed information system. It covers the web communication model, how browsers work, the role of web data and APIs, and the foundations of security, accessibility, performance, and data protection. The focus is on enduring concepts and relationships rather than on specific programming languages, frameworks, or operational tools.

## 1. session – What is the web?

**Objective:** Understand the place of the web within the Internet and learn about the core actors and standards of the web ecosystem.

- The relationship between the Internet and the World Wide Web
- Why learn web programming? The web as a general computing platform, communication medium, and user interface
- The evolution of the web: from document web to application-like web
- Key web actors: browser, server, search engine, and content provider
- The client–server model and the foundations of multi-tier systems
- Open standards and interoperability
- The role of W3C, WHATWG, and IETF

## 2. session – The path of a web request

**Objective:** Understand what happens from entering a URL to displaying content.

- URLs, URIs, domain names, IP addresses, and ports
- DNS resolution
- The role of TCP and TLS at a conceptual level
- Proxies, reverse proxies, and CDNs
- The lifecycle of a request from browser to server and back
- The impact of latency, bandwidth, and network failures

## 3. session – HTTP and HTTPS

**Objective:** Understand the web’s core communication protocol and the foundations of secure communication.

- The request–response model
- HTTP methods and their semantics
- Status codes: success, redirects, client errors, and server errors
- Headers, body, and content types
- Caching principles
- HTTPS, certificates, and TLS

## 4. session – Browsers and web documents

**Objective:** Explore the construction and processing of web content displayed in a browser.

- The roles of HTML, CSS, and JavaScript: structure, presentation, and behaviour
- Document structure and the DOM
- The rendering process
- The importance of semantic HTML
- Loading resources: images, fonts, scripts, and stylesheets
- Browser-side storage: cookies, localStorage, sessionStorage, IndexedDB, and Cache Storage
- Browser capabilities: 2D canvas, WebGL, media and file APIs, geolocation, and notifications
- The basic idea of service workers and offline operation
- Cross-browser compatibility

## 5. session – Web applications and rendering strategies

**Objective:** Understand the major web application models and their trade-offs.

- Multi-page and single-page applications
- Client-side, server-side, and static rendering
- Conceptual comparison of SPA, SSR, and SSG
- Interactivity, navigation, and client-side state
- Advantages, disadvantages, and typical use cases
- Architecture selection criteria

## 6. session – Web data and APIs

**Objective:** Learn the principles of data exchange and communication between web systems.

- The concept and role of APIs
- JSON, XML, and structured data exchange
- REST principles
- The place of GraphQL and RPC in the web ecosystem
- Webhooks, polling, Server-Sent Events, and WebSockets
- API versioning, compatibility, and documentation

## 7. session – State, identity, and access

**Objective:** Understand the core concepts of web identity, session management, and access control.

- Stateless HTTP and the problem of state
- Cookies, sessions, and tokens
- The difference between authentication and authorization
- The basic idea of OAuth 2.0 and OpenID Connect
- Single sign-on
- The process of signing in with an external provider

## 8. session – Web security fundamentals

**Objective:** Learn the most important web application security risks and defensive principles.

- Threat modelling: what and whom are we protecting?
- Same-origin policy and CORS
- XSS, CSRF, and injection attacks
- Passwords, multi-factor authentication, and session security
- HTTPS and secure communication
- The OWASP perspective and shared responsibility for security

## 9. session – The quality web

**Objective:** Learn the usability, accessibility, performance, and data-protection dimensions of web services.

- Accessibility and inclusive design
- Semantics, keyboard operation, and screen readers
- Responsiveness and device independence
- Performance from the user’s perspective
- Searchability: the basics of SEO and optimization for AI-based search and assistants (AIO)
- Data protection, tracking, cookie consent, and digital ethics
- Web-related aspects of the GDPR: personal data, lawful basis, transparency, data minimization, and data subject rights

## 10. session – Reliable and high-performance web services

**Objective:** Understand the foundations of web-service availability, performance, and error handling.

- What does service quality mean on the web?
- Availability, failures, and error handling
- Performance: response time, loading time, and resource requirements
- The role of caching on the web
- CDNs and the impact of geographic distance
- Load, traffic peaks, and graceful degradation
- Error messages and communication with users
- The basics of observability: logs, metrics, and alerts
- Trade-offs between performance, security, and cost
