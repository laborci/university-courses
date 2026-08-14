# Server-side rendering (SSR)

With SSR, the browser receives meaningful HTML in the first response, so the content can be displayed sooner and is easier to process. However, this means server-side work for each request, especially if the response contains personalized or fresh data. JavaScript is often still responsible for interactivity: this connection is called hydration.

## The server doesn't just send files

In a simple static website, the server returns a ready-made HTML file. At SSR, HTML often does not pre-exist in all its versions. When the request is received, the server looks at the route, if necessary, the user's session, retrieves the data, and uses a template or component system to prepare the document that matches the given request.

Suppose someone opens `/konyvek/az-ido-terkepe` in a bookstore. The server identifies the book, retrieves its title, author, price and contact information, and then prepares the HTML containing the title, description, image and purchase option. This is what he sends back. The browser can immediately start processing the document, and the visitor can see the essential information of the product even if the JavaScript is slow to load or is limited.

## Worked example: a personalized bookstore

The visitor opens the above product page. The browser can also send a cookie to the request, from which the server recognizes that the visitor is logged in. The server manages two types of information: the book's public data and user-related status, for example, whether the book is on the wish list.

The server can first retrieve the book data. It then checks the session and then creates HTML from the values ​​it receives. The answer can already contain the exact address and description of the page, which is useful for the search engine and social sharing preview. The browser renders this HTML. The buy button can initially function as a simple form.

If the page also provides modern interactions - for example, the wish list button changes state without a complete reload - the server adds JavaScript in addition to the HTML. When this code loads, it recognizes the pre-existing DOM structure and attaches event handlers to it. This is called hydration (*hydration*). It does not redraw the visible page from scratch, but "brings to life" the interface created by the server.

## Benefits and price of hydration

Hydration is like not throwing away a printed exhibition map when the tour guide arrives: the map is ready to use, and the tour guide makes it interactive. The user sees content first, and the buttons, filters and drop-down panels work later.

The price is that the browser must still download and run JavaScript for interactivity. If all elements of the page are hydrated, the resource demand can be significant. Ten decorative or rarely used components of a long article page do not necessarily need to be made interactive at the same cost. Therefore, modern systems try to hydrate in a targeted manner, later or in smaller units.

An important error related to the concept is the hydration discrepancy. This happens when the HTML sent by the server differs from the state expected by the client-side JavaScript. For example, the server generated the "current time" label at 10:00, and the client calculates a different value at 10:01. In such cases, the interface may flash, an error message may be generated, or the client may be forced to rebuild a part. This clearly shows that the contract between SSR and client-side code must be consistent.

## Performance: which date are we looking at?SSR often improves the experience that the visitor quickly sees meaningful content. The server prepares the HTML, and the browser does not have to wait for all client-side application code and data retrieval to complete. This can be especially valuable for a public product page, documentation, or article.

At the same time, the server needs time to retrieve the data and compile the HTML. This is called the time elapsed until the start of the server response. If the server waits for a slow database, is overloaded or calls a lot of external services, the browser will get good HTML in vain: it will get it late. SSR is therefore not an automatic performance guarantee, but a shifted division of labor.

It's also possible that the content is already visible, but the button isn't responding yet because the hydration JavaScript hasn't run. The user may experience this as deceptive. A quality solution pays attention not only to the early appearance, but also to the actual availability of the interaction.

## Cache: how to reduce rework?

A popular book page that is the same for everyone does not need to be completely recreated for every visitor. The server, a reverse proxy or a CDN can cache the completed response. The next request can thus be answered much faster. With the help of HTTP cache headers, the system can also communicate how long the response is considered fresh and when it should be rechecked.

With the cache, there is always the issue of freshness. If the price of a book changes, we don't want to show the old price for hours. If the answer is personal - for example, it contains the name of the student or the contents of his basket - it should not be placed in a shared cache so that other users can also receive it. This is not only a faulty experience, it can also be a data protection incident.

This is why layered thinking is common: the public product description can be heavily cached, while the basket or discount based on eligibility comes from a separate, personalized request. There is no single cache setting that is good for all types of data.

## SEO, Accessibility and Gradual Operation

Since with SSR the essential content can be present in the first HTML, search robots and sharing services can interpret the page more directly. However, the right `title`, description, heading hierarchy, canonical URL and structured content still require conscious planning. SSR alone does not make for good SEO; it just adds a more reliable foundation.

The same is true for accessibility. Semantic HTML can already be interpreted without JavaScript. A form can work with appropriate labels and buttons, and then client-side code can add convenience features. We call this approach progressive enhancement: the basic function works stably, and more advanced capabilities improve the experience.

## Compromises and choice situations

SSR is well-suited for public content where quick first impressions, a shareable page, and searchability are important. This could be a news portal, product catalog, knowledge base or event page. It is less obvious if the interface is predominantly a log-in, highly personal and constantly interactive work tool. There, the cost of producing HTML per request and the limitation of the cache may be less favorable.

In reality, many systems are hybrids. A marketing site can use pre-built or server-side HTML, and internal administration can be a client-side application. A single page can have public content delivered via SSR and a personal widget loaded later. The right question is therefore not "SSR or CSR?", but which content, which user, and what they need at what time.

## Common misconceptions

**"SSR has no JavaScript."** SSR only tells you where the first HTML is generated. An interactive interface often requires client-side JavaScript and hydration.

**"SSR is always fast."** Server-side data retrieval and HTML generation can be slow. Performance must be measured in real traffic.**"The cache is just acceleration."** If set incorrectly, it can provide old data or even data belonging to another user. The cache is also a question of correctness and data protection.

**"Search engine optimization is solved with SSR."** Well-structured, relevant and accessible content still needs to be planned.

## Review questions

1. What are the steps involved in generating an SSR response for a product page?
2. What does hydration mean and why is it necessary?
3. Why can it happen that the content is visible on the SSR page, but the button does not work yet?
4. Which answers can be safely put into a shared cache, and which ones can't?
5. In what situation would you choose SSR, and in what situation would you prefer CSR?

## Glossary

- **SSR:** a rendering where the server generates the HTML associated with the request.
- **Hydration:** connecting client-side JavaScript behavior to the HTML sent by the server.
- **TTFB:** time elapsed from the start of the request to the first byte of the response.
- **Cache:** temporary storage for quickly serving repeatedly needed responses or resources.
- **Personalization:** adapting the content of the response to a specific user or session.
- **Gradual development:** is a design principle in which the basic function is available, and more advanced client-side capabilities are built on it.
