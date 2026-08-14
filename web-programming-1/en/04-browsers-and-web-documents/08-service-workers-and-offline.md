# Service workers and offline operation

The service worker is a background program running in the browser that can mediate between the website and the network. With its help, a web application can store certain resources in advance, return them offline, or provide a more meaningful response to the user in the event of a network error.

The classic website is highly dependent on the network: if the browser cannot reach the server, it cannot download the document or the files associated with it. However, today's users often change networks, travel, work with weak signal strength, or temporarily lose connection. For this reason, an important question for many services is what happens when the network is slow or unavailable.

A **service worker** is a JavaScript program that is not tied to rendering a specific page. The browser handles it in a separate life cycle, and can monitor and handle network requests from pages within its scope. It is not an inaccessible background process: it is subject to strict security rules and can typically only be registered by a page served over HTTPS.

### What does a service worker do?

A service worker can stand between the browser and the network. When the website requests a style sheet or data, for example, the service worker can decide whether to first search the local cache, request a fresh response from the network, or combine the two approaches. This can give your app a faster first experience and better fault tolerance.

The most common pattern is the so-called application shell (app shell). The basic interface of the service – HTML, CSS, JavaScript, icons – is pre-downloaded and cached. If there is no network later, the user can at least open this interface. Dynamic data, such as recent news or server-side status, is of course not available offline in all cases.

### Cache strategies

There is no single good cache solution for every situation. The **cache-first** strategy uses local storage first; this is fast and can work well for infrequently changing logos or versioned program files. **network-first** first tries to request fresh data from the network and returns to the stored version only in the event of an error; this can be useful for lists where freshness is important. **stale-while-revalidate** quickly returns the previous value, but in the process requests an update from the network for the next use.

These decisions have user consequences. A base map of a map or a previously opened curriculum of an educational application can be useful offline. However, a bank account balance or exam result cannot be misleadingly displayed as old data without the system clearly indicating its date.

### Progressive Web Apps

A service worker is an important element of progressive web applications. PWA is not a single technology, but an approach: the web service should be usable on different devices, gradually expand the available capabilities, and preferably be resistant even in bad network conditions. Some browsers also allow such pages to be "installed", that is, they can be started with their own icon in an application-like window.

Even this does not automatically make a PWA a native mobile app. Your browser and operating system still determine what capabilities are available. The service must also properly handle cross-browser differences, permissions, and offline status.

### Security and Lifecycle

The service worker is a big responsibility because it can relay requests and provide responses from cache. Therefore, browsers typically only allow its use in a secure environment. Its update is not immediate either: the browser downloads the new version, but the previous worker can still serve open pages. This sometimes creates a surprising situation for developers and users: part of the page is already fresh, and another part can still use an old cache.

For a good user experience, the app should indicate when you are offline, when the data was last updated, and which features cannot be used offline. Going offline doesn't mean pretending everything is fine; it means that we plan meaningful and honest behavior even in the limited situation.

## Worked example: curriculum reader application

A student opened the materials of a course the night before. The application cached documents, style sheets, and navigation. The next day, while traveling by train, you don't have a stable internet connection, but you can still read the chapters you opened earlier.

However, when you want to see a new submission deadline or a recent announcement, the application indicates: the data cannot be updated without a connection, it was last downloaded last night. This is a better solution than a blank page or old data that looks misleadingly current.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "The service worker is always running in the background." | The browser starts and stops as needed; not a traditional, continuous background process. |
| "All data is available in offline mode." | Only pre-stored or previously stored resources and the freshness of dynamic data may be limited. |
| "Cache is just acceleration." | It can provide fault tolerance and offline usability, but it can also cause freshness issues. |
| “A PWA can be installed on all devices in the same way.” | Browser and operating system support may vary. |

## Review questions

1. Why can a service worker only work on HTTPS in general?
2. Which cache strategy is good for an infrequently changing logo and which one is good for a list of recent news?
3. Why is it important to indicate to the user the time of the last update of the data?
4. What is the difference between a faster site and a site that can also be used offline?

## Glossary

- **Service worker:** the background program running in the browser, capable of mediating network requests.
- **Cache Storage:** browser-side storage for web requests and responses.
- **Offline-first:** a design approach that provides meaningful operation even in the event of a network failure.
- **PWA:** progressive web application.
- **App shell:** the basic, cacheable interface skeleton of the web application.
\n\n
