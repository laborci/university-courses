# Cross-browser compatibility

The web is not a single program execution environment. A website is encountered in different browsers, operating systems, display sizes, network conditions and assistive technologies. A compatible website is not identical pixel by pixel everywhere, but its essential content, functionality and usability are reliably available in supported environments.

### What do we call compatibility?

A university subject admission site is compatible if the student can search for the subject in a supported browser, read the requirements, fill out the form and receive comprehensible feedback. It is not necessarily compatible if the shadow of a button, the drawing of a letter, or an animation consists of exactly the same number of pixels on all devices.

Compatibility has several layers. **content compatibility** means that the information is accessible and understandable. According to **functional compatibility**, important operations can be performed. **visual compatibility** examines whether the layout does not fall apart, whether the text is readable, whether the controls are usable. And **accessibility compatibility** also ensures that the interface remains usable with a screen reader, keyboard or zoomed-in view.

The last two aspects show why the "everywhere the same" goal is misleading. A telephone display is narrow, a large monitor is wide; one user can use zoom and another can use dark system theme. A good interface adapts to them. The goal is the same result and a predictable experience, not rigid image identity.

### Why are there differences between browsers?

A browser is much more than a document display program. It interprets HTML, applies CSS rules, runs JavaScript, manages network connections, stores data, and enforces security restrictions. Some of these tasks are performed by the **rendering engine** of the browser. The engine creates the drawable interface from HTML and CSS: it determines the size and position of the elements, loads the fonts, and then draws the pixels.

The most well-known engines are **Blink** used in Chromium-based browsers (such as Chrome, Edge, Opera and many others), Firefox's **Gecko** engine, and Apple Safari's **WebKit** engine. WebKit is usually running behind the browsers on iPhone and iPad, even if the application name is different. That's why it's not correct to think that "it's good in Chrome, so it's good everywhere": Chrome and Edge may share a lot of behavior, but that still requires Firefox and Safari to be checked separately.

Differences may be due to the fact that a new feature of a standard has not yet been completed everywhere; the implementation is faulty in some browsers; the system font is different; or a security and privacy decision limits the operation. The management of third-party cookies, automatic video playback or access to the clipboard, for example, is not only a technical issue, but also related to data protection and user protection decisions.

### Web standards as a common languageThe basis of compatibility is that web technologies are described by open standards. HTML, CSS, JavaScript, HTTP or accessibility recommendations are not proprietary formats of any browser manufacturer. Several actors are involved in standardization processes: the WHATWG mainly takes care of the living standard of HTML, the W3C is an important forum for several web recommendations and accessibility guidelines, and the IETF is known, among other things, for the standardization of Internet protocols, such as HTTP.

The standard is not a magic word. It does not guarantee that a new feature will be available in the same way in all browsers the next day. It ensures that manufacturers are targeting the same behavior and that developers can build on a documented foundation. Using standard HTML elements, valid CSS, and documented web APIs gives you a much better chance of having an interface that's portable in the long run than relying on a single browser's own non-standard solution.

A good example of this is a form. The standard `button`, `label` and `input` elements inherit many useful properties from the basic operation of the browser: they can be focused, operated with a keyboard, and in some situations have a role that is comprehensible to a screen reader. In the case of a "button" composed exclusively of `div' elements, this behavior would have to be imitated separately, often incorrectly.

### A feature detection: let's examine a capability, not a browser name

One of the old mistakes in web development is browser recognition, that is, trying to make the program decide based on a textual identifier: "this is Chrome", "this is Safari", and therefore runs one or another code. This method is fragile. Browsers often include the names of other products in their identifiers for compatibility reasons; browser version may vary; and the name alone does not tell you whether a particular function actually works.

The better question is not "what browser is this?", but "is the capability I need available here?". We call this feature detection. For example, an application can check that the storage is actually accessible before using `localStorage`. In the case of a modern CSS property, we can create a conditional style with the CSS `@supports` rule.

```css
.cards { display: block; }

@supports (display: grid) {
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
    gap: 1rem;
  }
}
```

In this example, the default state gives you simple, stacked cards. The grid layout is only used if the browser knows it. Essential content is available in both cases; the more modern browser just gets a more convenient layout.

### Progressive enhancement: from stable base to surplus

**progressive enhancement**, gradual development in Hungarian, follows the principle of first creating the most widely usable basic experience, and then building the more advanced appearance and interaction on top of that. This does not mean that all pages should be designed for old browsers. It means that indispensable functions should not be unnecessarily based on a fragile technological layer.

On a consultation booking page, for example, the HTML form and server-side submission can provide the basis. CSS improves readability. As a convenience, JavaScript can immediately indicate when a date is already booked or offer a calendar view. If JavaScript fails to load, the user can still submit the form; the server checks the choice and returns a response. On the other hand, if the form is created only from JavaScript, a bug or a strict corporate environment can completely cut off the service.

Incremental development combines compatibility with performance and accessibility. On a slow network, meaningful HTML content may appear first, and JavaScript may load later. The semantic base is also better understood by assistive technologies.

### Polyfill: replacing a missing ability, consciouslyA **polyfill** is code or library that tries to implement a newer standard browser capability in an older environment. If an application relies on a built-in JavaScript method that is missing from a supported older browser, a polyfill can create or approximate that behavior.

For example, a small application can only load a replacement if the function it's looking for doesn't exist:

```js
if (!('IntersectionObserver' in window)) {
  // If necessary, an alternative solution or polyfill can be loaded here.
}
```

Polyfill is not a universal medicine. Some capabilities—especially the browser's deep security, graphics, or networking features—cannot be fully copied from JavaScript. Additionally, replacement increases the size of the code to be downloaded, the maintenance cost, and sometimes the chance of errors. First, it must be decided whether the new ability is really necessary, and what kind of basic experience can be provided without it. A polyfill is a good choice if it provides essential functionality for a reasonably defined support goal at little additional cost.

### Testing: targeted, not in endless combinations

In theory, there are an infinite number of combinations: browser versions, operating systems, displays, languages, network states, and assistive technologies. No one can test everything. The professional task is therefore to formulate a **support policy**. For example, a university system might state that current and previous major versions are checked for major tasks in the desktop Chrome, Firefox, Edge, and Safari browsers, as well as common mobile systems.

When testing, you don't just have to look at the landing page. It is worth going through the critical user journeys: login, search, form filling, error notification, payment or logout. Check for narrow view, keyboard navigation, bad or slow network, and what happens with disabled or broken JavaScript. Automated tests and browser emulation can help, but they are not a complete substitute for testing on a real browser and real device.

A common practical method is to gradually narrow the errors. First, we determine whether the problem occurs in only one engine. Then we reduce the phenomenon to a smaller independent example. This way, you can find out whether it is due to your own CSS rule, missing standards support, or an actual browser error. A short, reproducible example is one of the most powerful tools for developer communication.

## Worked example: card news site

Imagine a news site that displays articles in three columns on a large screen. The content is displayed in HTML as articles, one after the other. This base can now be read linearly on the phone and with a screen reader. With CSS modern grid layout you can arrange them in three columns if Grid is available. It changes to a single column on a smaller screen.

The page's JavaScript can automatically load additional articles when the user reaches the end of the list. If you use a modern monitoring API for this, you can check for support with feature detection. If the feature is missing or the network fails, a prominent "More Articles" link or button will still guide you. The essential task of reading does not depend on a single modern convenience function.

## Common misconceptions

| Claim | Clarification |
| --- | --- |
| "All browsers use the same engine." | There are several important engines; nor does the same brand name or Chromium base mean complete identity at all levels. |
| "It can only be compatible if all pixels are identical." | Function, readability and usability are more important than rigid image matching. |
| "Recognizing the browser name is enough." | Rather, the presence of the necessary ability must be examined. |
| "Polyfill solves all legacy browser problems." | Not all capabilities are fully replaceable, and replacement comes at a performance and maintenance cost. |
| "It's running on the developer's machine, so it's done." | It should also be tested in supported environments and critical user paths. |

## Review questions1. What is the difference between functional and visual compatibility?
2. Why is the code selection based on the browser name uncertain?
3. How does gradual development work in the `@supports` example above?
4. When is the use of polyfill justified, and what are the costs?
5. What three critical user journeys would you test on a university administration site?

## Glossary

- **Browser Compatibility:** Ensuring that a website works in designated environments in a usable and reliable manner.
- **Rendering engine:** the part of the browser that interprets and draws the web document.
- **Blink:** is the rendering engine used in Chromium-based browsers.
- **Gecko:** Firefox's rendering engine.
- **WebKit:** the rendering engine behind Safari and many iOS browsers.
- **Web standard:** an openly documented, jointly developed technical agreement on the operation of the web.
- **Feature detection:** checking whether the required capability is available in the current environment.
- **Progressive enhancement:** a development principle that builds a more advanced appearance and interaction on a stable basic function.
- **Polyfill:** missing program code, mostly replacing newer browser capabilities.
- **Support policy:** a documented decision about which browsers and environments the system should serve.
