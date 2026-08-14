# Case study: news site, online store and online mailer

There is no universally best web architecture. The right solution depends on who the user is, what the main promise of the service is, what data it handles, what needs to be fast or accurate, and what happens in the event of a partial failure. The three case studies use the same technology set with different emphases.

It is easy to think that all web systems can be traced back to the same scheme: there is a browser, a server, and a database. This point of view is true, but it is not enough for good decisions. The reader of a national news site primarily wants to get to the article quickly. A customer of an online store wants to be sure that the product can really be ordered and that the payment will not be doubled. And the user of an online mailer expects his private messages to be displayed exclusively for him and for the new mail to be visible as soon as possible.

During the comparison, we ask the same questions to all three systems: what is the content like, how fresh is it, how much interaction do you want, is SEO important, how important is personal data, how can costs and operations be handled, how accessible is it, and what should you do in case of errors.

### 1. News page: quick delivery of public content

A news site offers the same article to many visitors. The front page, coverage of an election result or background analysis is typically public. This favors caching: if 10,000 people read the same article, you don't have to completely recreate it 10,000 times. Images, style sheets, scripts and often the HTML of the article itself can be served from a CDN node close to the user.

Freshness, on the other hand, depends on the type of content. An analysis article can remain the same for hours or years; a live score tracker can change every minute. The news site can therefore choose a hybrid model: the body of the article is prepared in advance or cached, and the smaller part indicating live data is updated later. It is not necessary to use the same rendering mode for all elements.

SEO is especially important because a significant number of articles receive visitors from search engines, social sharing or news aggregators. The title, author, date, article body, descriptive metadata, and share preview all work well if they are clearly present in the public HTML. The "download a big app first, then draw the article later" model is usually a bad starting point here.

Personalization can be secondary: for example, the site remembers topics or recommends articles. This should not prevent you from reading the main article, and the site will still be useful if it is dropped. A good example of fault tolerance is if only a neutral block is visible when the recommender service fails, instead of a blank page. From an accessibility perspective, text, a logical heading structure, alt text for images, and a readable layout are much more important than a spectacular but distracting animation.

### 2. Online store: from information to reliable transaction

The online store is both a content-oriented and transactional service. Like the news page, the product image, description, category and public rating can be easily cached and are also important in search engines. A product page should therefore appear semantically, quickly and easily indexable. However, shopping is no longer just about display.Cart, logged in account, discount, shipping address and payment are personal or business critical status. The set is a particularly good example of the issue of freshness. A product page indicating "in stock" half a minute earlier may be informative, but the server must recheck the actual stock when finalizing the order. The price, discount or total amount sent by the browser cannot be considered authentic; these are established by the server based on its own data.

Interactivity can greatly enhance the experience. The customer can choose a size, color, filter category or see the amount of the basket. The interface can update these quickly on the client side as well. However, for critical operations, the server is the source of truth. Pressing the "Order" button several times, a broken network connection or a repeated request cannot result in two payments. Therefore, in transactional systems, idempotency, confirmation and error handling are not matters of detail.

The operation is more complex than with a news site. Payment service provider, inventory management, invoicing, e-mail notification and delivery integration can be connected to the system. These are not always available. Fault-tolerant behavior can be, for example, that the product catalog remains readable, but the system honestly indicates: payment is temporarily unavailable. It is a bad solution if the interface promises a successful order, while the server could not finalize it.

From a data protection point of view, the online store manages addresses, contact information, purchase history and possibly marketing contributions. The scope, retention time and access to the necessary data must be consciously planned. Most stores do not process bank card data themselves; it uses a specialized payment service provider for this. This can reduce both risk and operational burden.

### 3. Online mail: personal status and trust

The operation of the online mailer is almost reversed compared to the other two examples. The mailbox of the logged-in user is personal, so responses cannot be cached in the same way as a news article. For every request or API call, you must be sure who the user is and what they are authorized to do. Here, identification, session, authorization management and security are the core of the service, not an afterthought.

The expectation of freshness is also high. When a new message arrives, the unread counter and the incoming list should be updated as soon as possible. There are several technical ways to do this: the browser can periodically inquire about new data, the server can keep an event channel open, or they can use a two-way, permanent connection. For the student, the name of the given technology is not the point, but the compromise: more frequent checks may give a faster feeling, but may cause unnecessary requests and energy use; a permanent connection may require more complex operation.

The online mailer has many interactive, state-dependent interfaces: folders, search, tags, drafts, attachments, selections and notifications. The client-side program is often given a greater role because the application must act as a work surface. However, it is not right to leave everything to the browser. The final status of an email being sent, deleted or tagged is on the server; in the event of a connection failure, it must be carefully indicated whether a modification has been sent, is only waiting locally, or failed.

SEO is essentially not the goal of this service: we do not want to index the personal mailbox. In contrast, accessibility remains fundamental. Without keyboard shortcuts, well-labeled buttons, clear focus, a screen reader-readable message list, and understandable error messages, a rich application can be unusable for many users.Avoiding data loss is particularly important for fault tolerance. If the connection is lost while writing a long letter, preferably keep the draft. If the sending of a letter is uncertain, the system should not encourage you to blindly resend, as this may result in a duplicate. The interface should honestly communicate the status: "Saved", "Sending", "Failed to send".

## Comparative analysis

| Aspect | News Page | Online store | Online mail |
| --- | --- | --- | --- |
| Main value | Quick access to public information | Trusted shopping | Manage personal communications |
| Contents | Mostly common and public | Joint catalog + personal transaction | Highly personal |
| Freshness | Varies by article | Important for stock and cart | Important for new messages and status |
| SEO | Extremely important | Important for the catalog | Not a target |
| Cache | Strongly usable | Good for the catalog, careful for the personal part | Very limited for personal data |
| Interactivity | Mostly supplementary | Important in the purchase process | The central part of the service |
| Fault tolerance | Keep the article readable | No incorrect or duplicate orders | Don't lose or leak data |

Even with the same components, the priorities are different. All three systems can use CDN, API, browser code and database, but not the same. In the case of the news site, mass access and quick start, in the case of the online store, the correctness of the transaction, and in the case of the e-mail, the security of the personal status shapes the decisions.

## Analysis task

Choose one of the three services and write a justification of up to one page based on the questions below.

1. Which three data or features are most important to the service promise?
2. Which of these can be safely cached, and which would be risky with an old or different user response?
3. Which function can work with simple HTML, and which requires a browser-side program?
4. What is the most unpleasant, but realistic partial failure of the system? How would you inform the user about this?
5. What accessibility or data protection requirements would you include in the first version of the design?

A good answer does not list technology names, but infers the purpose of the given service. For example, in the case of the online store, it is not enough to write that "a database is required"; you must state why you need a server-side stock and price check when ordering.

## Common misconceptions

| Claim | Clarification |
| --- | --- |
| "The news site doesn't need security." | Editorial accounts, the publishing process and visitor data also require protection. |
| "The price shown in the basket is the final price." | Final verification is done on the server, along with permissions and current business rules. |
| "A mailer is a client-side application, so the data is in the browser." | The browser manages the interface; authentic status and access require server-side control. |
| "If the server fails, a generic error page is enough." | The correct feedback depends on whether the operation was successful, whether it could be repeated, and whether data could be lost. |

## Review questions

1. Why is a CDN beneficial for a news site and why should personal sites be treated with caution?
2. Why can't the total amount sent by the browser be considered final in a web store?
3. In which example is SEO least relevant and why?
4. What would gradual deterioration mean in the case of the news page and the e-mailer?
5. How does the operational complexity change if an external payment or notification service is connected to a system?

## Glossary- **CDN:** geographically distributed server network that can return frequently requested resources close to the user.
- **Transaction:** a sequence of operations whose result must be handled consistently, for example as a one-time order.
- **Authentic status:** the data status registered by the server and considered final.
- **Indexing:** mapping public web content and making it searchable in a search system.
- **Partial failure:** an outage when one component of the system is faulty, but other parts can still function.
- **Idempotency:** the property of an action such that repeated execution does not cause multiple effects.
- **Personal data:** information linked to an identified or identifiable natural person.
