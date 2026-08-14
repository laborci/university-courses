# Interactivity, navigation and client-side state

An interactive web application is not simply a "series of pages", but a system in a constantly changing state. A good interface allows you to read where the user is, what is being loaded, what has been saved, and why an operation failed. The state should always live where it is really needed: neither too far nor too close to its user.

## What do we call a state?

State is any information that affects what the user sees or can do at a given moment. On a simple search page, the search term, the currently selected filter, the list of results, the indication of loading and the possible error message can be like this. The same HTML structure can show a completely different interface in a different state.

Take the basket of an online store. The number of products in the cart is the status. It is also a state whether the basket panel is open. Also, whether the interface is currently sending the order, and whether the server has accepted it. These are not all data of the same nature, so it is not good to handle them in the same place.

## UI state: the current state of the interface

The **UI state** (user interface state) is directly related to appearance. For example, is a drop-down menu open, which tab is active, is a search field in focus, or is a dialog box visible. It's usually short-lived: if the user navigates away, closes the tab, or reloads the page, it's often perfectly fine for it to disappear.

A good rule of thumb: if the information is only needed for the internal functioning of a single component, it is advisable to store it there. The `open' state of a modal window rarely justifies a global, application-wide container. Unnecessarily global state makes it difficult to understand because it makes it invisible who can change the data and when.

## Server status: the data is not owned by the browser

**server state** is data that has an authentic version on the server or in a related data source. This includes a student's course enrollment, posts on a social media site, a bank balance or the actual inventory of a product. The browser only keeps a time-limited copy of these.

This has an important consequence: what the interface previously downloaded may already be out of date. Two users can modify the same resource at the same time; the browser's network may be interrupted; a request may arrive slower than a later request. Managing the server state is therefore not just a matter of a `fetch' call. The loading must be displayed, the error must be handled, and a decision must be made as to when the previous data is still acceptable.

For example, when loading a list, we distinguish between three basic states:

```text
loading → successful data → error
```

In a real application, there may be a fourth case: there is previously displayed data while an update is taking place in the background. This is usually a nicer experience than having the entire list disappear every time you update.

## Permanent state: which must be preserved later

**persistent state** is useful when information needs to persist after a page refresh or a new browser session. This could be choosing a dark theme, a non-responsive interface setting, or a locally saved sketch of an abandoned form. Several tools are available for this on the browser page: for example cookie, `localStorage`, `sessionStorage` or IndexedDB.Not all data is suitable for these. `localStorage` is a simple key-value store, but can be accessed by JavaScript running in the browser. This makes it not a good place for confidential credentials. Persistent storage does not replace server-side authorization management and does not prove that the user is entitled to something.

It is also important that the setting stored in the browser is linked to a specific device and browser profile. If the user opens the service on another computer, the selection of the dark theme will only follow if it is also stored on the server linked to the user account.

## Navigation: document switching and client-side route management

In the original navigation model of the web, by clicking on a link, the browser requests a new document from the server. Processing the new HTML triggers a new page load. This so-called full document navigation is a simple, reliable and still fundamental mechanism.

Many applications today use client-side navigation. In this case, the application captures the click of the internal link, modifies the URL, and uses JavaScript to update only the required view and data. The address bar of the browser may still show the path `/tantargyak/webprog1`, for example, but the entire document will not necessarily be reloaded.

This may feel faster, because the common framework – header, menu, already downloaded program code – remains. But client-side navigation is not an exemption from the basic principles of the web. Each important view should have a meaningful, shareable URL. Make the Back and Forward button work. Even after a page refresh, there should be a chance to restore the view. Links should preferably be implemented as real links, not as clickable `div' elements.

## URL as state bearer

A URL is not just an address. Shareable, recoverable state can be a useful place. Querying a product list `?q=keyboard&sort=price` tells the user what search and sort order they see. If you send this address to a friend, there is a good chance that the friend will end up in the same place.

However, it is not worth writing every detail in the URL. The moment a drop-down menu is open or the location of a mouse pointer is not information anyone wants to share. The URL contains the user-interpretable state that is valuable to restore or share.

A good design question is, "If I bookmark this page, will I get the same important view back?" If so, some of the state is probably well covered in the route or query parameters.

## Cache: useful copy, not eternal truth

A cache is a stored copy of a previously retrieved resource or data. It can be browser cache, HTTP cache, CDN cache or the application's own memory. The goal is not to re-request information for which the existing version is still good enough.

For server status, "still good enough" is a business decision. A weather forecast can be reasonably fresh for a few minutes. You have to be much more careful with the status of a payment transaction. The cache speeds up, reduces the network load and can provide a better experience, but it can also show outdated data.

A common pattern is updating in the background: the application first shows the list in the cache, and then starts a new request. When new data arrives, it updates the interface. This is convenient, but it must be made clear if the decision absolutely requires current data.

## State management: not the name of a directory

**state management** is the design task that tells you where the data lives, who can modify it, what happens when it is modified, and where the interface reads it from. A state management library can help, but it alone will not solve a bad data model or poorly chosen liability boundaries.In a smaller application, it may be enough that the state lives in the corresponding components. Information concerning several remote parts, such as the logged-in user or a brief summary of the shopping cart, can be shared at the application level. At the same time, the data coming from the server should be handled together with their own life cycle: when they are loaded, when they become obsolete, how they are updated after an error.

The goal of good state management is not to make all data global. The goal is that the path of the data can be followed and that the interface consistently reflects the real situation of the system.

## Worked example: subject search interface

Let's say that a student enters "web" on a subject search page. The current text of the search field is UI state. If the search is bookmarkable, the `q=web` parameter may also appear in the URL. The hit list is server state: the application requests it from an API, and the response may change later. The interface can remember the dark theme in `localStorage`; this is a persistent client-side state.

When clicked, the interface may show a loading signal for the first time. When the response is received, it displays the objects. If the network fails, an empty list should not be shown as if there were no results: a clear error message and a retry option should be provided. If the user quickly rewrites the search to "webp", the older "web" response may arrive later. The system must prevent this old answer from overwriting the result of a newer search.

## Typical errors

- **All data goes into global state.** This makes the system hard to track and a small change can affect many remote parts.
- **Treatment of server response as eternal truth.** Due to the network and other users, the data may become out of date.
- **Hide loading and error.** The blank screen doesn't explain that there are no hits or just no data yet.
- **Ignore the URL.** This makes the view unshareable and the back button unpredictable.
- **Writing sensitive data to persistent browser storage.** This is a security risk and does not replace server-side protection.
- **Neglecting race situations.** Responses to multiple parallel requests do not necessarily arrive in the order they were sent.

## Review questions

1. In which status type would you classify the open menu, the user's name and the dark theme setting?
2. Why is the stock of a product in server status even if the browser has already downloaded it?
3. What state should be stored in a URL and what should not be stored?
4. What are the benefits and risks of data displayed immediately from the cache?
5. Why is it important that the browser's Back button works for client-side navigation?
6. How would you differentiate the surface status of "empty result" and "failed to load"?

## Glossary

- **State:** current information of the system that affects the operation or appearance.
- **UI state:** the short-lived state of the interface, such as an open dialog.
- **Server status:** data managed authentically by the server, retrieved by the client and possibly out of date.
- **Permanent state:** information to be preserved even after a page update or a session.
- **Client-side navigation:** view change without reloading the entire document, using the application running in the browser.
- **URL parameter:** name-value data passed in the part of the URL after the question mark, for example `?q=web`.
- **Cache:** a stored copy of a previous response or resource for faster reuse.
- **Competition situation:** a situation where the order of arrival of the results of several parallel operations can affect error-free performance.
