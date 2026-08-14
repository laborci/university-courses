# The main actors of the web: browser, server, search engine and content provider

The web is not just a direct connection between two actors – browser and server. Several interdependent actors are involved in the creation, storage, distribution, finding and use of content.

When opening a seemingly simple news page, the user only enters an address, but a chain of people in the background works together. The browser requests name resolution, establishes a connection with a server, downloads images from another geographic location, the search engine may have previously mapped the page, and the service provider may use external measurement or advertising systems. Web systems should therefore not be examined by themselves, but as an ecosystem.

### 1. User and browser

The user interacts with the web service through the browser. The browser does not simply display pages: it sends network requests, checks security certificates, processes documents, stores certain data, and limits the possibilities of websites according to its own security rules.

Examples of browsers: Chrome, Firefox, Safari, Edge. Although they support common standards, their behavior and support may differ in detail. This is why web interoperability is important.

### 2. Web server and application server

The **web server** receives HTTP requests from the browser and sends responses. In the simple case, it returns a file - such as an HTML page or image. For a more complex service, the request goes to an application that can retrieve data, check authorization, and generate a response based on the result.

It is not necessary to sharply separate the web server and the application server in every web system, but it is important to understand the roles:

- the web server can receive and forward web traffic;
- the application implements the business logic of the service;
- the data storage system preserves the data and makes it searchable.

### 3. Content provider

The content provider is the organization or person responsible for the information or service available on the web. It can be a university, news portal, company, private individual or public institution. He does not necessarily operate the server: storage, delivery or security infrastructure can also be provided by an external service provider.

This difference is particularly important for liability issues. The service provider is generally responsible for the content, data management and terms of the service, while the infrastructure can be partially operated by other organizations.

### 4. Search engines

Search engines help you discover web content. Automated programs – often called robots or crawlers – crawl publicly available pages, map links, and then build an index. When the user searches, the search engine selects and ranks results from this index.

A search engine is not the web itself and does not guarantee that it knows every web page. Searchability may depend on the structure of the content, access rules, links and the search engine's own ranking principles.

### 5. Intermediary and supporting actors

Additional actors may also participate in the operation of a web service:

- **internet service provider:** provides a network connection;
- **domain registrar:** manages domain name registration;
- **DNS provider:** assigns an IP address to the name;
- **CDN:** delivers content from several geographical locations;
- **authentication provider:** issues certificates for HTTPS;
- **external login service provider:** for example a central identification system;
- **advertising, analytics or payment service provider:** provides a special function for the website.

Because of this, when opening a single page, we can come into contact with several organizations and technical systems.## Example: actors of an online store

| Character | Task |
| --- | --- |
| Buyer and Browser | Search for products, use the basket, place an order |
| Online store application | Catalog, order, authorization and business process management |
| Database | Store products, inventory, orders and user data |
| Payment service provider | Online Payment Processing |
| Courier service | Manage Shipping Information |
| Search engine | Explore product and category pages |

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "A server is a single physical computer." | A server can be a software role, a virtual machine or a combination of several systems. |
| "The search engine creates the web pages." | The search engine finds and ranks content published by others. |
| "The hosting provider is responsible for everything on the site." | Content, data management and service rules are typically the responsibility of the content provider. |

## Instructor questions

1. What actors are involved in opening a university website?
2. Why can it be problematic if a page loads many external services?
3. Who is responsible for a page being found in a search engine?

## Short verification task

Choose a well-known service and draw five actors who can participate in its operation. Next to each arrow, write what information or service flows between them.

## Glossary

- **Client:** the program or device using the service.
- **Web server:** A system for receiving and responding to HTTP requests.
- **Content provider:** the actor responsible for the content or service available on the web.
- **Search engine:** service for mapping, indexing and making web content searchable.
- **CDN:** content delivery network operating in several geographical locations.
