# Multi-page and single-page applications

MPA and SPA are not two mutually exclusive eras, but two different responses to how to convey the state and interface of the application to the user. The right choice follows from the task: an article reading page and an online editor do not require the same navigation experience, data traffic or initial loading.

## The difference behind two familiar experiences

When we open another article on a news portal, often a completely new document arrives in the browser. The page title, main content, menu, and associated styles are part of a new HTTP response. This is the classic multi-page operation. The browser replaces the previous document, builds the new DOM tree, and then renders the page. Of course, a new URL appears in the address bar, and the back button also follows the browser's usual history.

On the other hand, a mail program or a map interface often changes view without reloading the entire document. At startup, the application downloads an HTML framework and typically more significant JavaScript code. Later, JavaScript modifies parts of the screen, retrieves data from the backend service, and can handle the URL using the History API. This is the basic idea of ​​a single-page application: it creates several "page experiences" within a single document.

Importantly, from the user's point of view, a "page" is not the same as an HTML document. A SPA can have separate paths for a message, a setting, and a search, even if the browser has only received the full HTML document at startup. Conversely, an MPA can also provide an extremely fast and continuous experience if it makes good use of the browser's cache and only downloads the necessary resources.

## What happens during navigation?

In the case of MPA, the user clicks on the link `https://pelda.hu/termekek/42', for example. The browser makes an HTTP request to this URL. The server typically sends a full HTML response with links to CSS files, JavaScript, images, and fonts. The browser requests many of these in parallel. Not everything is transferred over the network again: the previously downloaded style sheet or logo may be in the browser's cache. So changing documents doesn't necessarily mean downloading every byte again, but the browser has to process a new document.

In the case of SPA, with the same click, the application's own route manager can capture the navigation. The browser does not request a new document, but the client-side code decides which view should be displayed. You can then request, for example, a `GET /api/products/42` response in JSON format, and update the existing interface with the data received from it. This often makes the shift feel very direct. At the same time, the application must handle several tasks accurately: loading status, error message, authorization, the operation of the back button, document title and also the appropriate transfer of focus.

## Worked example: a university course registration interface

Imagine a system where the student searches for items, opens an item's data sheet, and picks it up. In the MPA version, clicking on a search result starts a full page load: the server returns the object's data sheet. The record button sends a `POST' request, and then the server redirects you to the updated schedule. This is an easy-to-follow model: each important state has its own URL and server-generated page. If the user opens the item in a new tab or sends the link to a friend, the system should work naturally.In the SPA version, the subject list, data sheet and timetable are different views of the same application. Search results can be updated as you type, and only one area of ​​the screen changes after taking an item. This is convenient in a workflow where the user performs many interrelated actions. In return, the application must ensure that a directly opened `/objects/WEBPROG1` path also works, that the status is not lost after the update, and that the screen reader is also notified of the change of view.

The first version may be better for infrequent, simple transactions and a lot of public information. The second may be justified if the job involves rapid, repeated changes and complex client-side state. It is not the label that decides, but the situation of use.

## Resources and performance

A typical advantage of MPA is that the first rendering often requires less JavaScript. The server sends the meaningful HTML, so the reading material can appear quickly. There is a new document request and processing on every navigation, but the shared CSS, image or font usually comes from cache. With modern browsers and HTTP versions, this pattern is often faster than the "every page reloads" statement would suggest.

In the case of a SPA, the starting JavaScript package, *bundle*, can be large. Until the code is downloaded and running, the application may not be useful. However, later view changes can be fast because the framework and several common components are already in memory. This is why a good SPA can split the code: it doesn't prefetch all the resources of the rarely used admin view. This is called code splitting.

Don't just see the load time in seconds. Another question is when content is first visible, when the button reacts, how much mobile data traffic is consumed, and how fast the next operation is. A large starter package may seem acceptable on a fast network, but on an older phone it may result in a blank or stuttering interface for a long time.

## SEO and shareability

The essence of search engine optimization (SEO) is not to "trick" the search engine, but to ensure that both the search engine and the user find and understand the content. In traditional MPA, the content of the public page is often directly in the HTML, so it can be processed more easily by the search engine. Each article can have a natural URL, title, description and internal link.

A SPA can also be found, but it requires more attention. If the initial HTML is just an empty application container and the actual content comes later from JavaScript, some bots or share preview services might not see the same thing. For public, searchable content, many systems therefore supplement the client-side operation with server-side or pre-prepared HTML. This leads to the CSR, SSR and static generation models of the next classes.

## Accessibility and reliable navigation

When changing a full document, the browser has many built-in behaviors: the title of the document changes, the screen reader detects the new page, focus and the title bar work as usual. In SPA, the developer must consciously replace these. When changing views, a meaningful page title should be set, the focus should be directed towards the main content or a heading, and dynamic changes should be indicated if necessary.

This is not an argument against SPA, but a reminder: "soft" navigation is not automatically better navigation. The criterion for success is to be able to understand what happened with a mouse, keyboard, touch, screen reader and even on a slow network.

## Common misconceptions

**"SPA is always faster."** View switching may be faster, but initial load, JavaScript processing, and mobile device load may be less favorable. It should be measured, not assumed.

**"MPA is obsolete."** Many content-centric and business systems are deliberately multi-sited. The pattern builds on the basic functionality of the web and is still completely modern today.**"With SPA, there is no real URL."** There is: routes are handled by the client-side router and the History API. However, direct opening and server-side route management must be ensured.

**"SEO is just marketing."** Appropriate structure, titles, links and available HTML improve the findability and usability of information.

## Review questions

1. What is the essential difference between MPA and SPA navigation?
2. Why doesn't changing documents at an MPA necessarily mean re-downloading all resources?
3. What additional tasks does a SPA receive instead of the browser's built-in navigation behavior?
4. Why might a public article archive benefit from a full HTML solution?
5. Name an application where SPA can be justified and argue for it!

## Glossary

- **MPA:** a web application where navigation typically involves retrieving a new HTML document.
- **SPA:** an application that switches views within a loaded document using JavaScript.
- **Router:** component or logic that manages the connection between the URL and the view to be displayed.
- **History API:** browser functions to allow web application to manage history and URL without full reload.
- **Bundle:** JavaScript resource prepared for the browser, typically bundled together.
- **SEO:** improving the findability of content for search engines and users.
