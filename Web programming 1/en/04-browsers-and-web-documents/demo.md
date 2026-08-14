# Demo: DOM, resources and browser containers

The browser's developer tools are not "hacking tools", but monitoring tools that provide transparency. They show what a page is made of, what it downloads, what data it stores locally, and how JavaScript transforms the document. This makes the operation of the web seem less like magic: it consists of parts that can be requested, viewed and interpreted.

## Preparation

The instructor should choose a legally accessible, simple public page or a pre-prepared educational template. A university news site or a demo site that includes a title, paragraphs, image, external style sheet, JavaScript, and a simple setting (such as a light-dark theme) is a good choice. Do not use a system that requires login, personal data or a sensitive administration interface.

In Chrome and Edge, developer tools can typically be opened with `F12` or `Ctrl+Shift+I`; On macOS, a corresponding hotkey can be used. They are similarly available in Firefox. The names and layout of the tabs may differ slightly, but the gist is the same: **Elements/Inspector**, **Network** and **Application/Storage** will be required.

## Detailed tutorial script

### 1. Opening question: what do we see and what do we infer from it?

At first, the instructor only shows the finished website. It's worth asking: "How do we know this address is really an address? How do we know why the button is blue? And when we click the button, how do we know what changed?" Students usually start from the visual. The purpose of the demonstration is to tie this visible layer back to HTML, CSS, and JavaScript.

Then open the developer tools and highlight: what we see is the page downloaded and processed in our own browser. The elements of a public page are viewed in a normal user environment. This does not make it permissible to circumvent the server-side protection of the service or to learn about other people's data.

### 2. Elements or Inspector: the live structure of the document

Open the **Elements** (often **Inspector** in Firefox) panel. The HTML is usually displayed in tree form on the left side. Let's find a clearly visible headline. Use the element selection icon, then click on the title: the browser will highlight which HTML element the part on the screen belongs to.

Here it is worth stopping at the concept of DOM. The **DOM** (Document Object Model) is a tree-shaped model of the document that lives in the browser's memory. The `html` element contains `head` and `body` as its root; under `body` there can be header, main content, paragraph, image and button. The DOM is not simply the text of the originally downloaded HTML file. The browser can fix some bugs, extend the structure, and the DOM can continue to change while JavaScript is running.

Let's show a simple example. A button may initially be labeled "Details", and when clicked, JavaScript may rewrite it as "Close" and display additional text. In the Elements panel, students see the current, live status. If necessary, compare it with the "View page source" function of the browser: there is a greater chance that the originally received HTML will be visible, not the later modified DOM.

### 3. HTML: monitor the reportIn the Elements view, look for semantic elements: `header`, `nav`, `main`, `article`, `h1`, `h2`, `button`, `form`, `label` or `footer`. Let's ask what the difference would be if a main title were `h1` and if it was just an arbitrary `div`. They may look the same on the screen, but their meaning is different. For the browser, search engine and screen reader, the semantic element communicates more.

The role of structure is particularly visible on a form. Select a caption and its corresponding field. If the `label` is properly bound to the `input` element, the field can be focused by clicking on the label. This is not just a convenience detail: you can expect a lot on a smaller touch screen, when using a keyboard and with assistive technologies.

### 4. CSS: where does the visual come from?

When an element is selected, the **Styles** or **Computed** area on the right usually shows the CSS rules that apply to it. Select a button, then find the background color, font size, padding, margin, and layout properties.

Let's explain that the browser compiles the final appearance from several rules. It can be a default browser style, a rule from an external style sheet, a style specified directly by the author, and an inherited property. The **Computed** view is therefore useful: here you can see the final values ​​that are actually valid, even if several rules are "competing" for them.

As a harmless short experiment, select a `color` or `margin` declaration and turn it off with its check box. The change is only temporary in the local browser; is lost when the page is refreshed. This is a good time to say: the developer tool is for monitoring and experimenting, but it does not modify the source code stored on the site's server.

### 5. JavaScript: visible traces and modification of the DOM

Look for an element that turns into an interaction: a drop-down menu, a theme switcher, a search field or a "more content" button. Before the operation, note the relevant detail in the Elements panel, then click on the control. A new DOM element may appear, a CSS class or the value of an attribute may change. For example, `class="menu"` can be changed to `class="menu open"`. CSS reacts to this by making the menu visible.

Hence the division of labor: HTML gives the elements and their meaning, CSS rules tell how the `open' state should look, and JavaScript can change the state in response to a user event. It is important to clarify that JavaScript can not only be used for DOM modification: it can also request network data, access local storage, and manage a timer. However, the DOM change is the easiest to observe in the demo.

### 6. Network: what is downloaded and in what order?

Open the **Network** panel, then refresh the page so that the panel is already open. Each line in the list can represent a network request. Let's find the first document request; this often gives you HTML. CSS files, JavaScript files, images, fonts, and possibly additional API requests may then appear.

In the columns of the panel, we observe the name or URL of the request, the status code, the type of resource, the transferred size and the duration. A `200` usually means a successful answer. `304 Not Modified` can indicate that the browser can use the stored version because the server says the resource has not changed. A `404` indicates that the requested resource cannot be found. The status code always belongs to a specific request; a page can contain both a successful main document and an image that loads incorrectly.

Click on a CSS file, then an image, and compare the response headers. `Content-Type: text/css` indicates that the response is CSS, for example `image/webp` or `image/png`. With this, you can directly link back to the previous HTTP curriculum: the header tells metadata about the response, and the body is the binary content of the style sheet or image itself.Let's ask a student to say from the Network list: which resource is responsible for a big hero image, which one for an external font, and how you can guess that JavaScript is running on the page. Then don't just rely on the file extension: the Type and Content-Type columns are more reliable clues.

### 7. Application or Storage: what does the browser store?

The **Application** panel in Chromium-based browsers and the **Storage** panel in Firefox provide an overview of the local data linked to the website. Let's start with cookies. A cookie is a small piece of data that the browser associates with a website under specific rules. Often used to identify a session, maintain a login, or note settings. A cookie can display name, value, expiration, domain, path and security attributes such as `Secure`, `HttpOnly` and `SameSite`.

Important: the fact that a cookie is visible in your browser does not mean that a sensitive value must be shared in a screenshot or presentation. Use a logged-out, public page or your own sample system for demonstration. The goal is to understand that the cookie is part of an identification and state management mechanism, not to examine real session data.

Next, let's look at **localStorage** and **sessionStorage**. `localStorage` stores data in key-value pairs, typically for a longer period of time, linked to the same origin. A theme setting such as `theme = dark` would be a typical example. `sessionStorage` is also a browser-side key-value store, but it can usually be used for a shorter-lived state associated with a specific browser tab. A "draft form" or a temporary step in a process can be an illustrative case.

Please note that the browser cache is not a secure secret safe. The user can examine and modify the data stored in his client, therefore authorization, price, exam ticket or other commercially critical decisions should not be based solely on the value stored here. The server must enforce important rules.

### 8. Closure: layers of a page in one sentence

Finally, let's return to the first question. The page visible on the screen is a document structured by HTML, an interface formatted by CSS and sometimes behavior modified by JavaScript. The Network view showed the resources downloaded for this; and the Storage view shows what local state the browser can store for it. Students don't need to search for complex errors on their own yet, but they do need to know where to start looking if a page behaves differently, is slow, or unexpectedly "remembers" something.

## Suggested short lesson assignment

In pairs, open a public page designated by the instructor and complete an observation chart. Look for an `h1` element, an external CSS resource, a JavaScript file, an image, and a stored key-value pair or cookie. For each element, write a sentence about the role it plays. If the page does not use visible local storage, this can also be recorded as a correct statement.

## Common misconceptions

| Claim | Clarification |
| --- | --- |
| "The Elements panel shows exactly the server's HTML." | It mostly shows the current DOM that lives in the browser, which may have been modified by both JavaScript and the browser. |
| "If I rewrite the text in DevTools, it also changes on the site's server." | The modification is local and temporary; it usually disappears when you update. |
| "The Network panel is for debuggers only." | It also illustrates the network request lifecycle, resources, responses, and performance. |
| "The value stored in localStorage is trusted business data." | Client-side data can be viewed and modified by the user; check a critical decision on the server. |
| "All cookies are for tracking." | A cookie can also be used for a session or operational setting; the purpose and regulation are to be examined separately. |

## Review questions1. What is the difference between the original HTML source and the DOM shown in the Elements panel?
2. Which view would you use to find out what JavaScript file a page has downloaded?
3. What can a `304` status code visible in the Network panel refer to?
4. What role can the `Content-Type` header play in the case of a CSS file or image?
5. How do the typical uses of cookie, `localStorage` and `sessionStorage` differ?
6. Why should authorization not be granted solely based on a value stored in the browser?

## Glossary

- **Developer tools / DevTools:** browser's built-in tools for examining the structure, network and operation of websites.
- **DOM:** the tree-shaped document model that lives in the browser, on which program code can perform operations.
- **Elements / Inspector:** panel for viewing the DOM and the styles applied to it.
- **Network:** panel for monitoring network requests and responses initiated by the browser.
- **Application / Storage:** panel for overview of the browser-side storages associated with the website.
- **Cookie:** small data linked to a website, which the browser can send to the server under certain conditions.
- **localStorage:** origin-bound, browser-side key-value storage, which usually lasts longer than the session.
- **sessionStorage:** browser-side key-value storage, which is typically associated with the session of a specific tab.
- **Resource:** a file downloaded for the operation or appearance of the website, such as HTML, CSS, JavaScript, image or font.
