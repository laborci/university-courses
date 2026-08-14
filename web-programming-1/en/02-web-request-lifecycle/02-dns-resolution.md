# DNS resolution

DNS is the Internet's distributed directory. Users use colloquial names, network communication is based on IP addresses; DNA makes the connection between the two.

A domain name, such as `tutorial.example.edu`, is a label that makes sense to the user. However, network devices cannot send packets directly to this name: they need an IP address. The Domain Name System, DNS for short, performs the task of finding the network information associated with the name.

It makes sense to think of DNS not as one huge database, but as a system of many interoperating name servers. It would not be practical to have all Internet names on a single central computer: it would be slow, vulnerable, and a single failure would affect the entire Internet. DNA is therefore distributed and hierarchical.

### The hierarchy of the name

The name `curriculum.example.edu', read from right to left, represents a hierarchy. `edu` is a top-level domain. `example` is a registered name within this. The ``curriculum'' is the subdomain managed by the institution. In DNS, separate servers can be responsible for different parts of the hierarchy. For example, a root nameserver does not directly provide the IP address of the courseware server, but it can tell who knows about the `edu` domain. The name server of `edu` redirects you to the corresponding name server `example.edu`, which can finally answer the question `tunnyag.example.edu`.

This is typically not noticed by the user because the browser, operating system and Internet service provider usually use a cache. If we already opened the same page yesterday, the IP address may still be available locally, so a new DNS query is not necessary. This makes browsing faster, but at the same time, changes are not shown to everyone at the same time due to the cache.

### Recursive and authoritative nameservers

In most cases, the browser does not directly query all members of the DNS hierarchy. Instead, it uses a **recursive resolver**. This could be a server from your ISP, a corporate network, or a public DNS provider. The recursive resolver does the "investigation" instead of the client: if it doesn't have the answer, it asks the necessary name servers in turn, and then returns the result.

The final, reliable information for a given domain is provided by the **authoritative** or authentic name server. This is the server designated by the domain administrator to publish records for the zone. When a university changes its website address, it changes the corresponding record on its own authoritative name servers; the change then gradually travels through the caches to the users.

### DNA records

DNS isn't just for websites. Several types of records can be stored in the namespace.

| Record | Report | Example usage |
| --- | --- | --- |
| ``A'' | Assigns an IPv4 address to a domain name | `www.example.org` → `203.0.113.10` |
| `AAAA` | Assigns an IPv6 address to a domain name | modern IPv6 connection |
| `CNAME` | Connects a name to another name | `www` → `website.example.org` |
| `MX` | Indicates a mail server | path for emails from `example.org` |
| `TXT` | Textual, often verification or security data | SPF, domain certificate |
| ``NS'' | Names the name server responsible for the zone | who manages the records of that domain |

The DNS configuration of a web service can therefore be much more than "a name pointing to an IP address". A global service can return multiple `A` or `AAAA` records. This can help spread the load and help you get through failures. Another name can point via `CNAME` to a name managed by a CDN, so the content can come from a geographically closer server.

### Cache and TTLDNS responses typically include a **TTL** (Time To Live) value. This indicates, in seconds, how long the response is considered cacheable. If a record has a TTL of 3600 seconds, then the resolver can in principle use the previously received response for one hour without asking the authoritative server again.

A long TTL can speed up service and reduce the load on DNS servers, but it is more inflexible. If an incorrect address is added to the record or the service moves to a new infrastructure, the previous response may still live in different caches for hours. With a short TTL, changes can be made faster, but more DNS queries and a higher infrastructure load must be expected. This is a typical engineering compromise: there is no ideal value for every situation.

### DNS and web errors

If a web page won't open, DNS is just one possible fault. The domain may have expired, it may have received a wrong record, the name server may be temporarily unavailable, or there may be old data in the client's local cache. Otherwise, the DNS is working perfectly, but the web server is faulty or overloaded.

Therefore, an IT professional should not treat the statements "no internet" and "this page does not open" as the same. If a DNS query returns a meaningful IP address, but the site is still unavailable, the next step in the investigation may be at the connection, TLS, or HTTP level.

### Security considerations

DNS was not originally designed for privacy and strong authentication. Therefore, fake or manipulated DNS responses can pose a serious risk: the user may end up with the wrong IP address despite entering the expected domain name. DNSSEC is a set of technologies that use digital signatures to verify the origin of DNS data. For a web connection, the TLS certificate adds an additional layer of protection: if the browser were to reach another server, it would not necessarily have a valid certificate for the desired domain.

The DNS query itself can reveal what service the user wants to access. For this reason, solutions for the encrypted transmission of DNS requests have also appeared in modern systems. The goal here is not complete invisibility, but to reduce it so that unauthorized actors can easily observe or modify the name resolution.

## Worked example

Suppose someone opens `https://learning.example.edu` for the first time.

1. The browser requests an IP address for the domain name from the operating system.
2. There is no answer in the local DNS cache, so the query goes to the configured recursive resolver.
3. If necessary, the resolver uses the DNS hierarchy to find the name server responsible for the `example.edu` zone.
4. The authoritative name server returns the site's IPv4 address and TTL in an `A` record, for example.
5. The solver can store the answer and then send it to the client.
6. The browser then initiates an HTTPS connection to the IP address.

If another listener shortly thereafter opens the same page on the same network, the local resolver can respond to his query from the cache.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "DNS is a single central server." | A distributed, hierarchical system with many cooperating name servers. |
| "A domain has exactly one IP address." | There may be multiple IPv4 and IPv6 addresses, and these may change over time. |
| "DNS is only needed for websites." | It can also be used for mail, service discovery, and many other network tasks. |
| "If the DNS is working, the website will definitely open." | DNS only provides the relationship between name and network information; the connection and the web application may still fail. |

## Review questions

1. Why is it beneficial that DNS is a distributed system?
2. What is the difference between recursive and authoritative name servers?
3. What can an ``MX'' record be used for?
4. What kind of compromise does choosing TTL mean?
5. How can the same domain return a different IP address at different times or from different locations?

## Glossary- **DNS:** distributed name service that maps names to network information.
- **Name resolution:** search for a DNS record for a domain name.
- **Recursive resolver:** server following DNS queries instead of the client.
- **Authoritative name server:** a server that stores the authoritative records of a domain zone.
- **DNS zone:** a managed part of a namespace and its records.
- **TTL:** cacheability time.
- **DNSSEC:** Technologies for verifying the authenticity of DNS data.
