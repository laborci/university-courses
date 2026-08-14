# Load web resources

When a URL is opened, the browser does not download "a web page", but discovers and retrieves a network of additional resources from an initial HTML document. Which resource is needed when, how big it is, where it comes from, and whether it blocks rendering directly affects when the page becomes usable.

### HTML as a resource map

When the browser receives an HTML response from a page, it first starts processing the document. Meanwhile, it builds the DOM, or content object model, and requests additional files based on the links it finds. Indicates a `<link rel="stylesheet" href="/style.css">` style sheet; a `<script src="/app.js">` JavaScript; an `<img src="/kep.webp">` image. A font is often revealed from the `@font-face` rule in CSS, and a video from the resources of the `video` element.

Therefore, HTML is not only content, but also a kind of resource map. The browser does not know at the beginning of the connection how many images, what font or which external analytics service the page uses. You will discover these while analyzing the document. Resources discovered late will start downloading later, which may delay display or interactivity.

A modern page typically consists of HTML, CSS, JavaScript, images, icons, web fonts, videos, API requests that return data, and third-party scripts. So a 200kB HTML document does not mean that the page is 200kB in total. The network panel often shows dozens or even hundreds of requests. Among them, size, priority and dependencies matter at least as much as the number of pieces.

### CSS: a prerequisite for the visible page

External CSS files are usually referenced in the `head` section of the document. This is because the browser needs to know what the elements should look like before rendering them. If the style sheet arrives late, the user will first see a disorganized, basic page, and then the layout will suddenly be rearranged. This can cause flickering and instability.

The browser builds the CSSOM from CSS rules, and then together with the DOM determines which elements are visible and in what style. From this, the rendering tree is created, on the basis of which the layout and drawing can start. Therefore, the styles needed for the first, immediately visible part of the screen are especially important. CSS that is too large, too much, or chained can delay the first meaningful appearance.

It does not follow that all CSS must be written in HTML. The external stylesheet is reusable, cacheable and easier to maintain. The goal is to have the required styles available in time, not to have all files in one document.

### JavaScript: can be block, can be later work

Running JavaScript can modify the DOM and styles, so a traditional `<script src="/app.js"></script>` element can stop further processing of the HTML: the browser will download and run the script before continuing to read the document. This used to be a safe default, but for a large script it can cause significant lag.

The `defer` attribute indicates that the external script can be downloaded in parallel with the processing of the HTML, but only run after the document has been parsed. The order of several `defer` scripts in the document is preserved. This is a good choice for a lot of your own application code, because the DOM is already built at this point, and the loading is less stuck.The `async` script is also loaded in parallel, but runs immediately when it arrives; therefore, the order of multiple such scripts cannot be calculated. Often used for independent metric codes or ad tags. Faster loading is not automatically better: if your `async` code relies on an element or other script that isn't ready yet, it can create a race condition.

JavaScript is not only a download cost, but also an execution cost. The user's device must parse, compile, and run the code. Even on a fast network, a large package impairs usability on a weaker phone. Therefore, it is an important question whether each element intended to be interactive really needs its own library or external package.

### Images, letters and media

Images often provide the most information on a page. A photo can be several megabytes even if it only appears on the screen as a thumbnail. The right size image version, modern formats such as WebP or AVIF, as well as well-chosen compression can therefore bring more profit than many small code optimizations. The `srcset` and `sizes` attributes allow the browser to select a file that matches the display size and resolution.

In the case of an image, specifying the width and height is not just a formal detail. It helps the browser reserve space for the image before it arrives. Without it, elements of the page may jump during loading, for example, a paragraph being read suddenly moves down. This visual stability is part of usability.

The `loading="lazy"` attribute tells the browser to load the image only when it is expected to be close to the viewable area. For a long product list or gallery, this saves a lot of initial traffic. The immediately visible main image in the header is not a good candidate: it would start loading later, just when a quick display is needed. Lazy loading is therefore a priority decision, not a universal switch.

Web fonts affect appearance and readability, but additional network requests. Until the desired font is received, the browser may show a temporary font image or, with certain settings, hide the text for a short time. A limited font set, a well-chosen system font fallback, and proper use of `font-display` reduce confusing switching. A rarely used decorative font is not worth it if the main text is late to be read because of it.

For audio and video files, gradation is even more important. A large video that starts automatically not only consumes data traffic, but can also distract attention and cause accessibility problems. A ``poster'' preview image, user-initiated playback, subtitles, and multiple source formats are often a better choice than downloading the entire media immediately.

### Critical rendering path and user sense of time

The critical rendering path is the chain of steps and resources required to make the user see the page meaningfully for the first time. This includes receiving and parsing HTML, fetching and processing important CSS, connecting DOM and CSSOM, and initial layout and drawing. If there's a slow server, an oversized stylesheet, or a blocking script standing in the way, the page can appear blank or laggy, even if there's a lot of data moving in the background.

Perceived speed is therefore not the same as total load time alone. It is important for the user that something meaningful appears quickly, that the page does not jump, and that the buttons respond relatively quickly. A well-designed page prioritizes the main content and code for the first action; leave inferior images, rare features and secondary widgets for later.

### Cache: when you don't need to download the same thing againThe cache is the temporary storage of previously downloaded resources. When the user visits the page again, the browser can use certain files locally or just check if they have changed. This is especially beneficial for common CSS, JavaScript, logos, or fonts.

Managing the cache correctly is a balance. If the browser can store a file for too short a time, downloads are repeated unnecessarily. If it takes too long, the user may get an old code. A common solution for this is a versioned or content-based file name, for example `app.4f72c1.js`: new content has a new name, and the old version can be safely cached for a longer period of time. The `Cache-Control` header provides instructions for the browser and intermediate caches about HTTP-level rules.

### Third-party resources: convenient, but not free

Many pages load a map, video player, font, traffic meter, chat box, advertising system or social media embedding from external sources. These promise fast development, but bring with them new DNS resolution, network connectivity, JavaScript, a privacy issue, and an error point. If a third-party service provider is slow or down, our own site can also be damaged.

On a university course page, for example, an embedded video or external calendar can be useful. However, it is worth asking: is it essential on the first screen? Can it be loaded only at the request of the user? What data does the third party receive when the page is opened? The aspects of performance and GDPR meet here: a measurement code is not just a few extra kilobytes, but also, where appropriate, a personal data management decision.

## Worked example: loading priorities of a course page

Have a course page with a main title, a short description, an application button, a photo of the instructor, a lower gallery and an embedded map. HTML references the common style sheet first, because without it the main content would be unorganized. It gets its own JavaScript `defer` attribute because the submit button behavior needs it, but it doesn't need it to stop reading the HTML.

The instructor photo, if visible on the first screen, loads normally, with specified `width` and `height` values. The images in the gallery, on the other hand, are given the `loading="lazy"` attribute, because the user only encounters them after scrolling. The map does not load automatically: initially there is an address and a "Show map" button. In this way, the visitor consciously starts the external service, and the first appearance of the page is not burdened by the map provider's script.

```html
<link rel="stylesheet" href="/assets/site.css">
<script src="/assets/course.js" defer></script>

<main>
  <h1>Web programming I.</h1>
  <p>Theoretical foundations of the operation of the modern web.</p>
  <a class="button" href="/apply">Apply</a>

  <img src="/images/oktato-640.webp" width="640" height="426"
       alt="The instructor in a lecture hall" />

  <section aria-labelledby="gallery-title">
    <h2 id="galeria-cim">Previous occasions</h2>
    <img src="/images/alkalom-1-480.webp" width="480" height="320"
         loading="lazy" alt="Students in group work" />
  </section>
</main>
```

In this example, not all resources are equal. The title, description, main style and application option are primary. The gallery is useful, but secondary. Careful prioritization does not mean that beautiful or comfortable elements are forbidden; it means that the website fulfills its basic task first and then gets rich.

## Common misunderstandings| Claim | Clarification |
| --- | --- |
| "The size of a page is just the size of the HTML." | CSS, JavaScript, images, fonts, media, and API responses all add up to the real load. |
| "All scripts must be loaded with `async'." | The execution order of `async` is not guaranteed; for many proprietary codes `defer` is more appropriate. |
| "Lazy loading makes every image faster." | You can delay the most important image on the first screen. |
| "Because of the cache, the user always sees an old page." | With good cache rules and versioned filenames, speed and freshness can be managed together. |
| "A third-party embed is just a short piece of code." | It means additional requests, execution cost, privacy impact and external dependency. |
| "For a fast site, all images should be omitted." | The goal is conscious size, format and priority, not empty content. |

## Review questions

1. Why is HTML the starting point for discovering additional resources?
2. What is the essential difference between traditional `defer` and `async` scripts?
3. Why do the `width` and `height` attributes of the image matter even if CSS scales the image later?
4. Which image would you use the `loading="lazy"` attribute on a long news page, and which would you not?
5. What performance and data protection risks can an external analytical or map service pose?

## Glossary

- **Resource:** a file or network response requested to build the web page, such as CSS, image or API data.
- **DOM:** the document object model built from HTML.
- **CSSOM:** the style model built from CSS rules.
- **Critical rendering path:** the series of processing and loading steps required for the appearance of the first visible content.
- **Blocking script:** JavaScript that, when downloaded or run, stops further processing of HTML.
- **`defer`:** method of loading an external script, which requests a parallel download and sequential execution after analyzing the document.
- **`async`:** method of loading an external script, which runs the code immediately upon arrival, without guaranteeing order.
- **Lazy loading:** delayed loading of resources not needed immediately.
- **Cache:** temporary storage of previously downloaded resources for faster reuse.
- **Third-party resource:** file or service coming from the domain of a service provider other than the owner of the website.
