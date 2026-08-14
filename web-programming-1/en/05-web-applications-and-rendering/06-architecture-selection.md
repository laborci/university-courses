# Architecture selection criteria

A good web architecture is a proportional response to the needs of the given service. For a simple, static information page, minimal technical complexity is often an advantage, while a personal, real-time application may need a different structure. The choice is always a compromise: what makes the first load faster may not necessarily make personalization easy; the more flexible, the higher the cost of development and operation.

The word architecture in this topic means how we divide the tasks of a web service, where we create the page that the user sees, where we store the data, and how the components communicate with each other. The student encounters the consequences of architectures every day: a news page opens in seconds, an online store provides a personalized offer, and a mailman updates the number of unread messages seemingly immediately. The surfaces may be similar, but the needs behind them are significantly different.

Three commonly mentioned approaches will help start the conversation. A static page consists of pre-made files; the server essentially returns ready-made HTML, CSS, JavaScript, and image files. In server-side rendering, the server generates the HTML upon request, for example with content obtained from the database. In the client-side application, the browser downloads a larger JavaScript program, which requests data via APIs and builds a significant part of the interface. Real systems are often hybrid solutions: the first page comes from a server or pre-generated, later the browser takes over interactive parts.

It is not correct to automatically say that a "more modern" solution or one that uses more JavaScript is better. The question is more about what content and what user situation we serve.

### The nature and freshness of the content

First of all, it is necessary to clarify what the service provides and how quickly it changes. The content of a page with department contact information, policies and admission information is rarely changed. Here, the advantages of pre-made, static pages are strong: few moving parts, good performance, easy caching and little operational risk. If a deadline is rewritten in the afternoon, of course the page has to be rebuilt or published, but in most cases this is not a problem.

On the other hand, in a web store that shows stock information, the data can change quickly. The statement "only 2 left" may be incorrect if the product has been purchased by someone else in the meantime. Here, it's a good idea to separate what can safely be cached - such as product descriptions and images - from what must be fresh, such as the contents of the cart or inventory checked when placing an order. Freshness is not a binary quality. A split-second discrepancy may be acceptable for a viewership counter, but not for a bank balance.

### Interactivity and status

By interactivity we mean more than just spectacular animation. This includes filling out the form, narrowing the search, managing the cart, moving on the map and notifications. The question is whether the experience requires immediate browser response, or whether it is appropriate for the user to receive a new page after an action.Filtering the program of a conference can be more convenient if the selected speaker or topic changes the list immediately. This may warrant some client-side logic. At the same time, the server is responsible for actually saving the application, checking eligibility and checking the place: the code running in the browser is on the user's machine, so it cannot be considered a reliable decision-maker.

State is what the system needs to remember between two requests. The identity of the logged-in user, the contents of the shopping cart, a half-filled form or the list of unread messages are all states. The more states a system manages, the more questions arise: where do we store it, how do we synchronize it between multiple devices, what happens in the event of a connection failure, and who can access it? This is not an argument against the feature, but a warning that interactivity comes at a price.

### SEO and findability

Search engine optimization, or SEO for short, is not a collection of tricks, but rather helping search engines and other machine consumers understand your content. A public article, product page, or training description should usually be provided in well-indexed HTML. Semantic headlines, meaningful links, metadata, structured data, fast loading and stable URLs are all important.

If a page initially sends just an empty root element and a lot of JavaScript, search engines are often able to run the program later. However, this is not a good reason to make public content unnecessarily difficult to access. Rendering is resource-intensive, error-prone, and not all bots or sharing services behave the same. The SEO aspect can therefore lead to static or server-side generated first HTML for many public contents.

### Personalization and data protection

Personalization can be an innocuous convenience feature, such as the site remembering dark mode or preferred language. However, it can also be more sensitive: different content is displayed based on a recommendation system, previous purchases, geographic location or educational history. The more personal the data, the more important the clear purpose, data minimization and access control.

An architectural consequence is that the personal page must usually be generated upon request, linked to the logged-in user, or the browser must request data with an authenticated API request. We can't give each user a separate, publicly cacheable version of HTML. The shared cache cannot accidentally serve one user from the other's personal page. From the point of view of the GDPR, it is also important to understand: technical logs, cookies, identifiers and analysis data can also be personal data. Data protection requirements are not separate documentation tasks; influence what data we collect and how long we keep it.

### Cost and operability

The price of a system is not only the server bill. This includes development time, debugging, monitoring, security updates, content publishing, backups, and incident management. Publishing a simple static page can be cheap and load well. A system that manages a database, login, payment and background tasks requires more operational knowledge.

"Build microservices because it's scalable" is a common but misleading starting point. Many separate services mean more network failure opportunities, logs, permissions, deployment, and coordination. With a small team or few functions, a transparent and managed application is often a better decision. The possibility of later expansion is important, but it is not the same as solving every conceivable problem from the beginning.

### Accessibility and fault toleranceAccessibility is not just about screen reader users. The service must remain usable even when navigating on a slow network, on an old device, with a temporarily faulty script or keyboard. It is therefore worth designing the architecture in such a way that the main content and basic operations do not unduly depend on many client-side programs. The gradual development here is also a practical fault tolerance.

Fault tolerance looks at what happens if a component is slow or goes down. If the recommendation system is not available, the online store ideally still sells products, but does not show a personal recommendation. If the image service is problematic, continue reading the text of the article. A good system is not necessarily flawless, but it degrades understandably and safely: it indicates an error, preserves essential data, and does not make false promises.

## Worked example: a university event page

Imagine a public page that shows the program, speakers and location of a faculty professional day. The program mostly changes daily or weekly, and the organizers want it to be seen well by search engines and social shares. For basic pages, a quick CDN service of pre-generated HTML and content can be a good decision. This way, we get a fast, cheap, easily indexable and less vulnerable site.

The application form, however, is different. There are personal data, places and confirmation here, so server-side processing is required. Form fields can be immediately indicated by the browser if they are incomplete, but the server must also check them. The application page cannot be placed in a shared cache, and authorization management is required for the organizer interface. If the photos of the speakers are delayed, the page should still show the names and the program. This hybrid structure is not a "half solution", but a choice adapted to the different parts.

## Common misconceptions

| Claim | Clarification |
| --- | --- |
| "A single page application is always faster." | The interaction can be fast, but the first load and processing in the search engine can be even worse. |
| "A static site can only be a simple, outdated website." | Many content-centric, high-traffic sites use pre-generated content. |
| "Personalization is only a surface issue." | It has identification, privacy, caching and security implications. |
| "Fault tolerance means that there are never any errors." | The goal is partial functionality and understandable, safe error handling. |
| "Multiple components automatically scale better." | Communication and operation between the components also bring considerable complexity. |

## Review questions

1. For what content can the pre-generated page be justified, and why?
2. Why can the description of a product be treated differently than the inventory available at that moment?
3. How does SEO affect the way the public article page is rendered?
4. What is the risk if personal content is placed in a shared cache?
5. Give an example of an additional function that can be removed without the service's main function ceasing.

## Glossary

- **Architecture:** high-level structure of system components, responsibilities and their relationships.
- **Static generation:** generating and serving content as a pre-made file.
- **Server-side rendering:** Generate HTML on the server, typically on request.
- **Client-side rendering:** the interface created by the program running in the browser.
- **SEO:** is a set of practices that help the findability and machine interpretability of public web content.
- **Personalization:** adapting the interface or content to a user, setting or history.
- **Fault tolerance:** the system's ability to function meaningfully even in the event of a partial fault.
- **Gradual development:** a design principle in which the essential content and function are also available on a simple basis, and the surplus is built on this.
