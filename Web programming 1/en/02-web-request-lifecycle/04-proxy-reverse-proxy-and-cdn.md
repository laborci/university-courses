# Proxy, reverse proxy and CDN

Mediation systems are not unnecessary detours in the path of web requests. Placed in the right place, they speed up, protect, distribute the load and simplify the operation of the service.

In the first client-server examples, the browser connects directly to an application server. This is a good starting point, but in reality there are often multiple relay systems running in front of a popular or sensitive web service. Most of the time, the user doesn't notice any of this: he enters a domain name and receives a response. However, in the background, the request may go through verification, cache, load balancer or geographically close content server.

### Proxy: intermediary on the client's side

A **proxy** connects to the remote service on behalf of the client. In an organizational network, for example, workstations do not access the Internet directly, but send their requests to a proxy. The proxy then forwards the request and returns the response.

This may be for security reasons: the organization may restrict certain dangerous or non-work-related traffic. There may be a reason for logging: the operator wants to see how the network is used. And there may be a performance reason: a proxy can store frequently requested, public resources so that every user doesn't have to download the same file again.

A proxy is not necessarily a malicious observer. In many cases, it is a deliberately installed, organizational infrastructure element. At the same time, it is an important question for the user who operates it, what kind of traffic they can see, and how they protect the data. In the case of HTTPS, the proxy cannot simply read the content of the encrypted connection by default, although there are verification solutions in a corporate environment that require a separate trust infrastructure.

### Reverse proxy: intermediary on the service provider's side

A **reverse proxy** is the entry point to the website itself from the outside. The browser connects to it, receives the HTTPS request, and then selects which internal application or server receives the task based on the request. It is usually invisible to the user how many machines or services are working in the background.

Imagine a university system in which a separate application manages login, course data and document downloads. The reverse proxy can receive requests to each domain ``tutorial.example.edu'' and then forward them based on the route: `/login' to the identity service, `/courses' to the application, and `/documents' to a file server. In this way, the outside world sees a uniform service, while internally the tasks can be separated.

A reverse proxy can perform several common tasks:

- manages TLS certificates and the construction of encrypted connections;
- forwards the request to the appropriate internal service;
- distributes the traffic between several identical application instances;
- you can serve static files directly;
- may cache certain responses;
- you can apply basic protection rules such as request restriction.

This is not to say that a reverse proxy "solves everything". If the app behind it is buggy, slow, or poorly designed, it won't fix it by itself. However, it separates the general tasks of the web entry point from the special business logic of the application.

### Load distribution

If a service needs to serve many users at the same time, a single application instance may not be enough. In this case, the reverse proxy or separate load balancer can distribute the requests between several back-end servers. One user's request goes to the first instance, and the next one goes to the second instance; if a server goes down, ideally no more new requests will be sent to it.One of its advantages is scalability: the service capacity can be increased by adding new instances. Another advantage is availability: the failure of a single machine does not necessarily make the entire service unavailable. However, it is important in system design to recognize that shared state, such as a login session, can complicate this model.

### CDN: content closer to the user

A **CDN** (Content Delivery Network) is a network of geographically distributed servers. They are most often used to quickly deliver content that many users need in the same way: images, videos, JavaScript files, style sheets, downloadable documents, or even full, static web pages.

If a Hungarian user opens a website hosted on an American server, the network distance causes a delay. A CDN's European hub can take over serving static files, so the browser doesn't have to go to the remote origin server for every image. This can result in a faster appearance and also reduces the load on the original infrastructure.

CDN usually works with caching. If a resource has already been requested by a node from the original server, it can serve it locally later. When it comes to caching, freshness is also a key issue here. An infrequently changing logo can be stored for a long time, while a live scoreboard or personal profile page cannot be served to all visitors from the same cache.

### Security and mediation systems

A provider-side entry point can be a good place to mitigate certain attacks. A reverse proxy can limit how often an IP address can send requests, filter out obviously malformed traffic, and hide the direct address of internal systems. Many CDNs also provide protection against certain forms of overloading attacks by absorbing or filtering suspicious traffic on a high-capacity, distributed network.

These solutions do not replace application security. Incorrect authorization management or poorly validated input cannot necessarily be corrected by the CDN. Protection is layered: network, entry point, application and data protection measures are required together.

## Worked example: popular ticket sales

When a concert ticket sale starts, many tens of thousands of users open the same page.

1. Browsers connect to your website's domain.
2. CDN can serve common images, stylesheets and JavaScript files.
3. The reverse proxy accepts dynamic requests.
4. The proxy distributes search and cart operations between multiple application instances.
5. The part that processes the order still requires stricter control because inventory and payment cannot be handled simply from a public cache.

Such a structure does not eliminate all problems, but it can prevent downloading many common static resources alone from overloading the critical ordering system.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "Proxy and reverse proxy are the same." | Both mediate, but the proxy is typically on the client's side, the reverse proxy is on the service provider's side. |
| "A CDN is only needed for video streaming." | It is also common for speeding up images, stylesheets, JavaScript files and static pages. |
| "A CDN is always faster." | The speedup depends on the cache hit, the nature of the content and the network path. |
| "The application is secure because of the reverse proxy." | It can help protect, but is not a substitute for secure application code and authorization management. |

## Review questions

1. Why is it advisable to entrust TLS management to a reverse proxy?
2. What type of content fits well in CDN-cache and what doesn't?
3. What problem does load balancing solve?
4. Why isn't a CDN a substitute for application-level security?
5. How does a client-side proxy differ from a reverse proxy?

## Glossary- **Proxy:** client-side intermediary that communicates on behalf of the client.
- **Reverse proxy:** server-side entry point that directs the request to the underlying service.
- **Load distribution:** distribution of requests between several servers.
- **CDN:** geographically distributed content delivery network.
- **Original server:** the infrastructure that stores the authentic source of the resource.
- **Cache hit:** when the requested data is already available in the cache.
