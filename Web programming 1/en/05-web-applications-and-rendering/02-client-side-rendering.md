# Client-side rendering (CSR)

With CSR, the server often does not provide ready-made pages, but data and files necessary to start the application. The screen is compiled by JavaScript running on the user's device. This can be effective for complex, interactive workflows, but the additional burden placed on the browser and downloaded code must be consciously managed.

## What does rendering mean?

Rendering is the process when an application's data becomes a displayable interface. For example, a product can be in the data source as a name, price, stock and image URL. However, the user sees a title, price, button and image. Rendering creates the connection between the state of the program and the interface that appears in the DOM.

In the case of CSR, this work is mostly done in the browser. The server can send minimal HTML, such as a `div` element with an ID of `app`, along with references to a style sheet and a JavaScript file. Once the JavaScript is downloaded, it runs, creates the components, and then requests data from an API when needed. The application fills the previously empty interface based on the API response.

## The history of initialization step by step

Consider a simple movie ticket booking application. The visitor opens `moziplusz.hu/filmek`. The browser retrieves the initial HTML. This document may contain a header and an empty main content area, but does not yet contain a list of movies. Then the CSS and JavaScript bundle will be downloaded.

When the bundle runs, the application first sets its own internal state: what route we are taking, is the user logged in, which language is used, are there any previously stored settings. Then you can display a loading status and then send a request like `GET /api/movies?het=current`. The server can send a JSON response to this:

```json
[
  { "id": 17, "cim": "Night screening", "length": 112 },
  { "id": 24, "title": "The Explorer", "length": 96 }
]
```

The client-side code generates the cards from this. From here, the user sees addresses, dates and booking buttons. If you set a filter, the interface can be updated without changing the entire document. The system either initiates a new API request or rearranges the already downloaded data. The visible result is simple, but state management, network request, error branches and DOM update work in the background.

## The importance of the bundle

A bundle is not a magic file, but a version of JavaScript written by developers and its dependencies prepared for the browser. During development, many modules and libraries can be in separate files; the release process often arranges these into optimized resources. The browser must download this, interpret it, translate it into an executable form, and then execute it.

Therefore, the size and complexity of the bundle is a real user issue. A modern, high-performance laptop can handle it quickly, but a cheap phone or unstable mobile network cannot. "Only 500 kB" is not necessarily enough either: in addition to the download, the processing time of the JavaScript and how much memory it requires are also important.

One tool for reduction is code slicing. You don't necessarily need to download code for administration, billing or rarely used statistical graphs for the movie searcher landing page. They only come when you really need them. The goal of optimization is not to achieve the smallest number, but to enable the user to quickly start the task that is important to him.

## APIs and interface connectionIn CSR, the boundary between server and client is often clearly visible. The server provides an API: it provides data via routes, performs operations, authenticates and checks authorization. The client displays the received data. This allows the same API to be used by a web interface, mobile application or external partner.

However, this separation does not mean that the client is a reliable security boundary. The code running in the browser can be viewed and modified by the user. Therefore, the server must verify all important permissions and inputs. It's useless for the interface to hide a "delete" button if the API executes the deletion without permission.

An API request may succeed, fail, or be delayed. A good CSR interface does more than just display a successful response: it indicates loading, handles network error in an understandable way, and differentiates, for example, the status "no results" from "the server was not reached".

## Benefits

The strength of CSR is rich interaction. On a data analysis interface, the user sets filters, organizes a table, selects several elements and switches views. If every operation involved a full document exchange, the experience would often be difficult. With client-side rendering, the change can appear directly on the relevant part.

The application may also retain certain data and settings locally. Thus, for example, the half-filled content of a form can be preserved in the event of a short network interruption, or the interface can return to a previous view more quickly. The cache and storage of modern browsers can help with this, but the storage of sensitive data must be planned especially carefully.

## Limitations and trade-offs

One of the classic problems of CSR is the blank start page. If the important content is only visible after running JavaScript and responding to the API, the visitor on a slow device will first experience a blank interface or a long rotating load indicator. This can be especially bad for a site where the visitor wants to quickly read public information.

Searchability also requires attention. The ability of search robots to run JavaScript is not the same, processing may be delayed, and sharing services often do not wait for client-side data loading. If the title, description and preview of an event page are generated only in the browser, the shared link may not show a good image.

Finally, the client is responsible for multiple states. Back button, refresh, deep links, errors, permission change and accessible focus management should be resolved. CSR is not a "simpler website", it puts complexity elsewhere.

## Common misconceptions

**"CSR equals SPA."** Many SPAs use CSR, but the concepts are not exactly the same. SPA is about the navigation and document model, CSR is about where the interface is produced.

**"The return of the API is already a rendering."** The JSON data, not a finished interface. When rendering, the data becomes HTML and interaction that can be interpreted by the user.

**"If the button is not visible, the operation is protected."** Authorization must be checked by the server, not the interface.

**"More JavaScript is more modern."** JavaScript is valuable when it serves the required interaction. An unreasonable amount of it can slow down and make a page more vulnerable.

## Review questions

1. What resources does the browser typically receive when launching a CSR application?
2. What steps lead from the JSON response of an API to the visible product card?
3. Why is a large JavaScript bundle a special burden on a mobile device?
4. What states should an interface using an API call handle in addition to a successful response?
5. In what case would you choose CSR instead of a public, content-oriented MPA?

## Glossary- **CSR:** a rendering where the interface is mainly produced by JavaScript running in the browser.
- **Initialization:** setting the startup state and operation of the application.
- **Bundle:** JavaScript package released for the browser.
- **Code slicing:** dividing the code into several parts loaded as needed.
- **API:** programmed interface through which systems access data and operations.
- **Empty status:** an interface that indicates that there is no data to display; is not the same as the error.
