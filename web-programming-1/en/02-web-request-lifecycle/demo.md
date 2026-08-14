# Demo: DNS and traces of a network request

## Purpose and preparation

This demonstration shows that the important steps of opening a web page can be seen and measured. We don't teach command line or browser development tools for their own sake. The tools here serve as a magnifying glass: we make visible the same concepts that were discussed in the lecture - domain name, DNS, HTTPS, HTTP request, response, resource and timing.

Choose a stable, public HTTPS site for the instructor. A simple university or institutional site that does not ask for login and does not provide personalized content can be a good choice. Test the selected site in advance on the network of the room. In the examples, the name `www.example.edu` is used; in the actual demonstration, replace this with the domain of the chosen page.

Ask students to listen first and note three questions: for which name we are looking for an address, which request downloads the main document, and how many additional requests are made after it. In the end, they can answer these from their own observations.

## 1. The initial statement: the domain name is not an IP address

Write this URL on the board or project it:

`https://www.example.edu/learning-materials`

Ask, “Which part of the address can the network use directly to reach a machine?” The answer is that `www.example.edu` is a convenient name for the user, but network traffic needs an IP address. `https` identifies the communication scheme, and `/learning-materials` identifies the resource to be requested. DNS makes the network address available from the name.

Open a terminal and ask for the name using the appropriate tool for the system. On macOS and Linux, the following example works:

```text
nslookup www.example.edu
```

`nslookup' can be used in the same way under Windows, so we do not need to give a different conceptual explanation. In the result, show the DNS server used for the query and the answer separately. Do not ask for the exact numbers: due to a CDN or load balancing, the same name may give different addresses at a different time or from a different network.

If multiple titles appear, ask the question, "Is this a bug or an opportunity?" Explain that multiple addresses can improve availability, help distribute traffic, and allow a large service to choose a closer server. If an IPv6 address is included, highlight that the same name can have both IPv4 and IPv6 availability. The browser and operating system choose which path works correctly.

### What should you say during it?

"DNS is not a central phone book that always tells you the address of a single server. It is a distributed name system, its responses can be cached, and the service provider can knowingly provide multiple addresses." This prepares for the later observation that the ``Remote Address'' visible in the browser is not necessarily the same as the machine running the application: it can also be a CDN or reverse proxy entry point.

## 2. Open the Network view of the browser

Open the chosen page in a Chromium-based browser or Firefox. It is worth opening the Network panel of the developer tools before reloading. Turn on the preservation of the log (*Preserve log*) if the page can redirect to another address. We turn on the *Disable cache* option only when the developer tools are open, and we indicate that this is an artificial situation: in real browsing, the cache often helps to speed things up.

Then reload the page. Lines in the list are not "errors" or "background noise": each line is a network request. The very first or one of the very first `document' type lines is usually the main HTML document of the navigation. All other elements of the page - style sheet, image, font, JavaScript, parser or API call - follow from this first response and the programs that run after it.

Don't be intimidated by the many lines. Filter by `Doc` or `document` type, then select the main request. Ask students to identify the following: full URL, request method, status code, resource type, size, and duration.

## 3. Dissection of a request

For the selected main document, open the Headers tab. First, we read the **General** or general part together.- **Request URL:** this is the specific URL that the request ultimately went to. After redirection, it may differ from the originally entered address.
- **Request Method:** typically `GET', because the browser is requesting a document.
- **Status Code:** If `200` is a successful response. `301`, `302`, `307` or `308` can be part of a redirect chain.
- **Remote Address:** the network address and port to which the browser was actually connected. We link this back to the DNA lookup, but don't promise that it will match the address you saw earlier.
- **Referrer Policy:** according to which rules the browser can send referrer information to other requests.

Next, let's show a couple of request headers. For ``Host'' or HTTP/2, a corresponding destination identifier is needed because an IP address can be shared by several websites. `Accept` expresses what content format the client can accept. Based on `Accept-Language', the server can even provide a Hungarian language version. ``Cookie'' is only displayed if the given page previously placed a status in the browser and its sending is allowed; never project personal or login information. If in doubt, use an incognito window.

Highlight the value of `Content-Type` from the response headers. For example `text/html; charset=utf-8` says that the body of the response is HTML with UTF-8 character encoding. `Cache-Control` can show how to use the response later from the cache. ``Location'' is usually interesting for redirection: it tells you which address the browser should go to. Security headers can also appear on an HTTPS page, but here it is sufficient to emphasize that the header is not part of the content: the instruction and description of the communication.

## 4. Interpretation of the timeline

Open the Timing tab. The exact name may vary from browser to browser, but the basic phenomena are similar. This is where it becomes apparent that "load time" is not a single number.

- **Queueing/Stalled:** the request is waiting, for example because the browser is allocating a resource or searching for a connection.
- **DNS lookup:** search for an address for the name; it may even be missing from the cache or appear to be zero.
- **Initial connection:** the structure of the network connection.
- **SSL/TLS:** secure connection negotiation if a new HTTPS connection is required.
- **Waiting / TTFB:** the time elapsed after sending the request until the first response byte. This can include network path and server-side processing.
- **Content download:** actual download of the response data.

Let us point out that a short download phase does not prove a fast server: ``Waiting'' may be long. Conversely, a large image can take a long time to download even if the server starts sending it immediately. This is one of the most important diagnostic lessons: the components of the measurement must be interpreted, not a single number cited.

If it can be done safely, reload the page once with the cache and then once with the cache turned off. We look for the difference in the two results: the cached element may not even initiate a full network request, or only a check is performed with a `304 Not Modified` response. We indicate that `304` is not an error: it means that the existing copy of the browser can continue to be used.

## 5. From main document to full page

Let's go back to the request list and show a line of type `stylesheet` and `img`. Let's ask why their title appeared when we entered only one URL. The answer: they are referenced in the main HTML document. And in the case of a `script` type request, JavaScript can request additional data later from an API.

Let's compare the `Content-Type` header of the two responses. ``text/css'' for the style sheet, ``image/jpeg'', ``image/png'' or ``image/webp'' for the image. The browser does not decide solely on the basis of the file name: the type of content sent by the server is also part of how to interpret the response. The image request can be much larger, but that doesn't make it "bad"; the question is whether its size is justified, whether it is properly compressed and whether it obstructs the appearance of important content.

## Suggested closing and student assignmentAt the end, ask students to choose another public site and write a short observation note in 5-10 minutes. They don't need to write code. The note should include the main `document` request URL, method, status code, a request and a response header, and the content type of an image or style sheet. They also describe in one sentence why it does not automatically follow from a slow page that the user's Internet connection is bad.

## Common misconceptions and instructor reactions

- **"Remote Address is the website's server."** More precisely, the actual network partner. It can also be a CDN, proxy or load balancer.
- **"Every request has a DNS section."** Not necessarily: the DNS response and network connection can also be reused.
- **“A `304` is an error because it is not a `200`.”** No: cache revalidation indicating that previous content is unchanged.
- **"Each line of the Network list is a separate open web page."** Each line is a request, but most of them belong to a resource of the only open page.

## Review questions

1. What data does DNS search for, and why is the domain name not enough for this?
2. What does the `document` type request in the Network list indicate?
3. What can we use the `Remote Address` value for, and what conclusion should not be automatically drawn from it?
4. What is the difference between `Waiting (TTFB)` and `Content download`?
5. What does the `Content-Type: image/webp` response header mean?
6. Why is `304 Not Modified' considered a completely normal answer?

## Glossary

- **Network panel:** a view of the browser's developer tools that lists network requests and responses.
- **Remote Address:** IP address and port of the browser's actual network partner.
- **TTFB (Time To First Byte):** the time between sending the request and receiving the first byte of the response.
- **Request Header:** the HTTP metadata sent by the client that tells the characteristics of the request.
- **Response Header:** metadata associated with the server's response, such as the content type or cache rule.
- **Cache:** temporary storage of previously acquired data so that you don't have to download everything again.
- **Redirect:** an HTTP response that instructs the client to visit another URL.
