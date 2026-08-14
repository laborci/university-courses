# URL, URI, domain name, IP address and port

A URL is not just "a link". An address that provides guidance on several different levels: which communication rule to use, which service provider to look for, which network endpoint to reach, and which service resource to request.

When a student types `https://learning.example.edu/courses/webprog1` into their browser's address bar, a great deal happens before a single letter appears on the page. The browser must first interpret the address: which connection rules to use, which machine or service to find, and exactly which resource to request. This information is carried in different parts of the URL.

**URI** (Uniform Resource Identifier) ​​is a general term for identifying resources. A resource can be a document, image, video, user profile, API endpoint, or even an abstract concept. **URL** (Uniform Resource Locator) is a common type of URI: it not only identifies the resource, but also tells how and where it can be accessed. In everyday use on the web, the two are often interchanged, but it's useful to know that URL also refers to access.

Let's examine this address:

```text
https://www.example.org:443/catalogue/books?topic=web&page=2#recommendations
```

`https` is the **scheme** or protocol identifier. It tells the browser that it is using a secure TLS-protected version of the HTTP protocol. `www.example.org` is the **hostname**. This is the name that needs to be translated to an IP address using DNS. `:443` is the **port**; In the case of HTTPS, 443 is the default, so the user usually doesn't even see it. `/catalog/books` is the **path** that represents the logical location of the resource. The `tema=web&page=2` after the question mark is part of the **query parameters**: it gives additional data to the server. `#ajanlatok` is the so-called fragment; this is typically handled by the browser when you jump to a specific part of a document.

### Domain name: human name on the network

People are good at remembering names. ``www.example.org'' is conversational, easy to pronounce and related to the organization. Network devices, on the other hand, communicate based on IP addresses. The domain name is therefore like a name in a contact card, and the IP address is the technical address required for actual contact.

A domain name is not the same as a single website. Under the name `example.edu` you can have a main page, correspondence, course materials manager, several subdomains and many APIs. In the same way, a single web service can be available on several domain names or on several IP addresses. This could be due to load balancing, geographic servicing, security separation or simply historical legacy.

Domain names are hierarchical. In the name `tutorial.example.edu`, `edu` is the top-level domain, `example` is a registered name within it, and `tutorial` is a subdomain. The dots do not represent folders, but the namespace created in the name resolution system. `/courses', on the other hand, is already the path interpreted by the given web service.

### IP address: network availability

The network endpoint identifier of the **IP address**. In the case of IPv4, for example `203.0.113.10`, in the case of IPv6 it can be a longer, hexadecimal address. After DNS resolution, the browser can initiate a network connection using the IP address.

It is important that the IP address alone does not tell us which website we want to access. Several domains can operate on the same IP address. With an HTTPS connection, the browser also indicates which domain it wants to connect to when establishing the connection, and the ``Host'' header in the HTTP request also identifies the desired service. This makes it possible to have many different websites behind a single network address.

### Port: service selectionA computer can run many network programs at the same time. The IP address approximates the machine or network interface, **port** indicates which service we want to connect to. The browser traditionally uses port 443 for HTTPS and 80 for HTTP. For this reason, they are mostly hidden in the title.

If the service is not running on the default port, the port should be written as `http://localhost:3000/`. This is common in local development. In this case, `localhost` refers to your own machine, and `3000` is, for example, the port of a locally running Node.js application. This is a good example of how a web service doesn't necessarily reside "somewhere on the internet"; the same principles work on your own machine.

### Path, parameter and fragment

The path should not automatically be considered a directory in the server's file system. The path `/products/42` can be an actual file location, but more often it is just a signal to the application: "I want the product with ID 42". The server or application decides how to interpret it.

Query parameters provide additional information. In a search engine, `?q=web programming` indicates the search term, in a list, `?page=2` can request the second page. These are not necessarily confidential: they can be included in browsing history, logs and shared links as part of the URL. It is therefore not correct to send a password, personal ID or other sensitive data in a query parameter.

A fragment such as `#elerhetoseg` will typically not reach the server. The browser uses it to jump to the appropriate part of the already downloaded document. Because of this, the same HTML page can be referenced by several different fragments without the server having to create a separate page.

## Worked example

Let's say the user opens this address:

```text
https://learning.example.edu:443/course?id=17#tasks
```

1. The browser recognizes the `https` scheme, so it will build an encrypted connection.
2. It searches for an IP address for the name `learning.example.edu` through DNS.
3. It is connected to port 443 of the resulting IP address.
4. Sends an HTTP request for the `/course?id=17` resource.
5. The server identifies the requested course and sends an HTML response.
6. The browser displays the page, then scrolls to the corresponding part based on `#tasks`.

The application, name resolution, network, and browser-side interpretations appear together in a single address.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "The domain name is the server itself." | The domain name is a name; It can lead to one or more network addresses through DNS. |
| "The path is always a file on the server." | In modern web applications, it is often a logical path understood only by the application. |
| "The part after `#` is secret because it is not visible to the server." | Not secret: still visible to the user and browser, but typically not sent in the HTTP request. |
| "Port is only important during development." | All network connections use ports, only the default ports are mostly hidden. |

## Review questions

1. In which section do we indicate that we use HTTPS?
2. What is the role of DNS in the relationship between a domain name and an IP address?
3. Why can there be several websites on the same IP address?
4. Why is it not correct to pass a password in a query parameter?
5. What is the difference between `/chapters` and `#tasks`?

## Glossary

- **URI:** general resource identifier.
- **URL:** is a URI that specifies the location and method of accessing the resource.
- **Scheme:** part of the URL indicating the communication method, for example `https`.
- **Hostname:** is the name of the target service in the URL.
- **Domain name:** hierarchical, human-friendly network name.
- **IP address:** numerical address of a network endpoint.
- **Port:** identifier of a network service inside the machine.
- **Query parameter:** the additional data passed in the URL.
- **Fragment:** URL part pointing to a location within the document.
