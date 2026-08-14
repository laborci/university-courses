# The relationship between the Internet and the World Wide Web

The **internet** is a global infrastructure of interconnected computer networks. The **World Wide Web** is one of the standards-based services of this infrastructure: a system of resources connected by links accessible by browsers.

In short: the Internet is the road network; the web is one of the traffic that travels on this road network.

Imagine a student who checks his university mail in the morning, then opens the study system, and finally joins a video call. In everyday language, you would say all three are "internet". However, from an information technology point of view, it uses different services: mail, web interface and video call use the same global network infrastructure, but they do not work with the same rules and not for the same purpose. Understanding this difference accompanies the entire subject.

### 1. The Internet is infrastructure

The Internet is not a single central system, not owned by a single company, and is not the same as the pages displayed in the browser. Network of networks: universities, companies, internet service providers, data centers, home networks and mobile devices are connected based on common communication rules.

The basic task of the Internet is to deliver data packets from one endpoint to another. This requires addressing, routing and common protocols. The user typically only sees that their phone or computer is "connected to the Internet", but in the background many network actors work together.

The Internet includes, for example:

- the physical connection: optical cables, copper cables, mobile networks, Wi-Fi and satellite connections;
- network devices: routers, switches and firewalls;
- addressing and routing: IP addresses and routing rules;
- the communication protocols: for example IP, TCP and UDP.

These in themselves do not tell us what application we are using. Mail, video calls, file transfers, online games and websites can also work through the same Internet connection.

### 2. The World Wide Web service on the Internet

The World Wide Web, or Web or WWW for short, is an information system based on the Internet. On the web, we access documents, images, videos, applications and other resources using addresses - typically URLs. The connection between resources is provided by references, i.e. links.

Three basic, open standards are particularly important for the operation of the web:

- **URL:** the address of the resource, for example `https://example.org/learning-materials`;
- **HTTP or HTTPS:** the system of rules for communication between the browser and the server;
- **HTML:** language used to describe the structure of a web document.

When the student types an address into the browser, the browser searches the Internet infrastructure for the appropriate server, sends an HTTP request to it, and then displays the response. The response is often an HTML document that links to additional resources—style sheets, images, fonts, or program code.

### 3. Why do we confuse the two concepts?

In everyday language, "going online" often means opening a web page. This is understandable because the web is the most visible internet service for most users. However, from an information technology point of view, it is worthwhile to be precise.

If, for example, a web page does not load, it does not mean that there is "no internet". The Internet connection may be working, but the web server is down, the domain name cannot be resolved, or the web application is overloaded. Similarly, sending an email or playing an online game is Internet activity, but not necessarily Web use.

### 4. Services on the Internet, off the Web

The following are Internet services, but not part of the World Wide Web:| Service | What do we use it for? | Example protocol or technology |
| --- | --- | --- |
| Email | Correspondence | SMTP, IMAP |
| File Transfer | Transfer files | SFTP, SCP |
| Directory service | Resolve domain name to IP address | DNA |
| Remote machine access | Manage another computer | SSH |
| Online game | Real-time communication | Custom Application Protocols, UDP |

They may use the same network infrastructure, but have different purposes, protocols and client programs. The typical client program of the web is the browser; we use a mail program for correspondence, a terminal or other special client for remote access.

### 5. The browser is not the Internet itself

A browser is a client application. It is primarily used to download, interpret and display web resources. It is not the same as the Internet, just as a video player is not the same as the video file itself or the network through which it arrived.

This difference is also important for later topics:

- DNS and IP addressing are part of the Internet infrastructure;
- HTTP is the central element of the web's communication model;
- HTML, CSS and JavaScript are web technologies processed by the browser;
- cookies, web storage and the browser security model are linked to the operation of the web client.

## Example: opening a URL

Suppose the user opens this address: `https://www.example.org/katalogus`.

1. The browser must first know which IP address the name `www.example.org' belongs to. This is DNS resolution.
2. It then establishes a connection with the appropriate server via the Internet networks.
3. The browser sends an HTTPS request for the `/catalogue` resource.
4. The server sends a response, such as an HTML page and additional resources.
5. The browser processes and displays the response.

In this process, 1–2. step primarily for the infrastructure of the Internet, steps 3–5. and step one is related to the operation of the web.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "The web and the Internet are the same." | The web is a service of the internet. |
| "If the browser does not load a page, there is no Internet." | The error could be in the server, DNS, or the web application itself. |
| "Google is the Internet." | Google is a service provider; your search engine and many other services use the infrastructure of the Internet. |
| "Everything online is a website." | You can also use the Internet for e-mail, remote access, online gaming or file transfer without the Web. |

## Instructor questions

1. Can the internet be used without a web? Give me an example!
2. Can a website be accessible even if a mail server is down?
3. Why is it useful for an IT professional to separate the concepts of infrastructure and application service?
4. Do mobile apps use internet or web? In what cases both?

## Short verification task

In pairs, classify the following into one of the **internet infrastructure**, **World Wide Web**, or **other internet service** categories: DNS, HTML page, e-mail, HTTPS request, IP address, SSH, browser, router.

## Glossary

- **Internet:** system of globally connected computer networks.
- **World Wide Web (WWW):** a system of resources on the Internet connected by links and accessible from a browser.
- **Browser:** client application for downloading and displaying web resources.
- **Server:** a system that provides services or resources to other systems over a network.
- **Protocol:** a commonly accepted system of communication rules.
- **URL:** the address of a web resource.
