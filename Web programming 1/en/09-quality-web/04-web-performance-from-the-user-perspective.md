# Web performance from a user perspective

## Goals

By the end of the chapter, the student will be able to distinguish between technically measured and user-perceived speed. You understand what the Core Web Vitals metrics measure at a conceptual level, and you can recognize typical reasons that make a page load or use slow or jumpy. The goal is not to chase a single score, but to relate the measurement result to the real usage situation.

A fast website doesn't mean you get a small number in a lab test. It is good because the user quickly sees something meaningful, quickly understands what is happening, and the interface reacts to it without delay or unexpected movement. Performance is therefore also a matter of usability, accessibility and business.

## What does "fast" mean?

Let's imagine two online stores. The first one immediately draws a spectacular, but still empty interface: the letters, product images and the shopping cart button only arrive later. The second one does not show all decorative elements immediately, but in a moment the name of the product you are looking for, its price and a working "Add to Cart" button are displayed. It is possible that the first page "finishes" loading in a shorter time according to some technical measure, yet the second page seems to be faster. The user does not experience a network log, but the completion of a task.

It is therefore important to separate **measured performance** and **perceived performance**. Measured performance describes durations, sizes, processor usage or certain browser events. Perceived performance expresses when the visitor feels: "the page is now usable", "it responded to my click", or "I don't have to be afraid that the button will jump away". The two are related, but not identical.

The speed of a page is shaped by several sections. The browser must first find the server, establish a connection, request the document, and then download additional images, style sheets, fonts, and code. After that, the tool must process the received material: build the document, calculate the layout, draw the screen, and run the necessary JavaScript. On a weak phone, the same JavaScript can take much longer than on a developer's powerful laptop.

## Latency: file size isn't the only thing that matters

**Latency** is the time that elapses between initiating a request and receiving a response. This includes the physical distance, the network route, the server load and if you have to wait somewhere. Even a small response can be slow if the server only starts responding after a long time. Conversely, a larger image can also arrive acceptably if it is served up close, on a fast network and with a well-organized download.

It is useful to think separately about the first byte of the response and the entire response. If a dynamic page waits for the database, the browser receives nothing for a long time: then the visitor sees a blank screen. If the first substantial HTML part arrives quickly, the browser can already start showing content even if the further elements of the page are still loading. This is especially important on a mobile network, where transmission and connection setup are less predictable.

However, the network is only one half of the story. Many large or poorly scheduled scripts running on a page can occupy the browser's main thread of execution. In this case, the files may even have been downloaded, but the interface does not yet respond to scrolling, typing or clicking. It is therefore dangerous to look only at the "number of megabytes" in the performance discussion.

## Core Web Vitals: three perspectives on usability

Core Web Vitals is a set of widely used metrics that approach the user experience from the side of loading, interaction and visual stability. Incomplete ratings: they do not say whether the site is barrier-free, understandable or handles data legally. However, they do help you spot some very common, annoying problems.

### LCP - Largest Contentful Paint**LCP** monitors approximately when the largest content element visible to the user appears on the screen. This is often the headline, a product image, a featured image or a large block of text. The pointer is useful because it is the moment for the visitor when the main point of the page really starts to arrive.

On a news portal, for example, the title and opening image of the main article can be the LCP element. If the opening image is too large, in the wrong format, starts downloading late, or the server sends HTML slowly, LCP can be broken. The correct conclusion is not to "drop all images", but to deliver the image in the right size, in the right format and with the right priority. Optimizing a small, barely visible icon is of little help if the most important product image is 8 MB.

### INP - Interaction to Next Paint

**INP** approximates the experience of how much time elapses after a user action, such as a click, tap, or keystroke, until the next visible response. If nothing happens after clicking the "Pay" button for a long time, the user can press it again, think he made a mistake, or leave the page.

INP is not solely a measure of network response time. In many cases, it is bad because the browser is currently processing a large amount of JavaScript. A long task can occupy the main thread, waiting to process the click. It is a good design principle for the interface to give clear, immediate feedback first - for example, loading status or a disabled button - and to divide the expensive work into smaller parts whenever possible.

### CLS - Cumulative Layout Shift

**CLS** describes unexpected layout jumps. Perhaps everyone has experienced that they are about to click on a link, when a slow-loading advertisement or image pushes the content down, and the click falls on another element. It's not just uncomfortable; when shopping, filling out a form or using a barrier-free aid, it can be a serious mistake.

A typical reason is that the image or embedded content does not have a pre-allocated space. When it arrives, the browser rearranges the page afterwards. The correct solution is to specify the expected size of the content and maintain a stable place for dynamic elements. Content that is deliberately displayed for the user's action - for example, an expanded menu - can of course change the layout; the problem is the unexpected change.

## Images, JavaScript and cache

Images often account for most of the data downloaded by the page. The problem can be caused by an unnecessarily high resolution, inadequate compression, or a mobile phone downloading the same giant image created for a wide desktop display. The image can not only be made smaller: modern browsers can be given several versions, so the device can request a reasonable size. However, the content is important: it is not advisable to delay the opening image in the same way as the not yet visible gallery at the bottom of the page.

JavaScript can provide rich interaction, but downloading, processing, and running it is a burden. An external metering code, chat window, ad system or redundant UI library can all add to the cost. The question is not "should we use JavaScript" but whether all code serves a real user purpose and when it needs to be loaded. If a feature is only needed by a small number of logged in users, it may not be a good idea to send it to all visitors at launch.

**cache** - cache - reuse of previously downloaded, still valid resources. A style sheet, logo or font is not necessarily needed every time a page is downloaded from the network. A cache can reduce waiting and traffic, but it requires caution: files that rarely change can be stored for a long time, but personal or rapidly changing content cannot accidentally end up in a shared cache. The cache is not "automatic magic", but a behavior to be designed, controlled by HTTP rules.

## What and how should we measure?Measuring on a development machine on a fast office network is useful, but not enough. When measuring in a laboratory, we get a repeatable result in the same, adjusted environment; this is good for comparing a change. Data collected from real-world usage, on the other hand, shows what is happening on visitors' actual devices and networks. Together, the two points of view are powerful: one helps to find fault, the other indicates how big the real impact is.

The network view in the browser's developer tools can show which request took how long, how long it returned, whether it came from a cache, and what started it. The performance profile can show if a long JavaScript task is blocking the interface. We cannot interpret these screens in isolation: always ask which user task is being broken and which change would improve it the most.

## Example: the slow product page

When opening a product page, the visitor sees a white screen for a long time, then a giant photo, several external scripts and an advertising bar appear at the same time. After the photo arrives, the "Add to Cart" button jumps down. When the visitor clicks on it, the button does not respond until late.

In this story, the late release of the main image on the LCP probably hurts; the image and advertising space not reserved in advance on CLS; and the many program codes running at the beginning on the INP. A reasonable fix would be to prioritize the correct version of the main image, fix the size of images and embeds, and load scripts that are not immediately needed later. The goal is not to embellish the indicators, but to enable the visitor to quickly find and safely use the purchase process.

## Common misconceptions

- **“Performance is all about the server.”** The server is important, but so are images, browser-side code, fonts, and third-party elements.
- **"On fast internet, every page is fast."** Connection speed does not solve slow server response, too many requests, or blocking JavaScript.
- **“A good Core Web Vitals score equals a good website.”** It only indicates a few important dimensions; it does not replace usability, accessibility and content testing.
- **"Everything must be cached."** An incorrect cache rule can serve old or even content for a different user.

## Review questions

1. Why can a site be technically fast, yet perceived as slow?
2. What phenomenon do LCP, INP and CLS approach?
3. Why can a large JavaScript task worsen the interaction experience?
4. How can an image cause a layout jump?
5. What is the difference between measurement based on laboratory and real user data?
6. When does cache help and why can it be risky?

## Glossary

- **Latency:** the waiting time between the request and the response.
- **LCP:** indicator approximating the appearance time of the largest visible content element.
- **INP:** indicator approximating the delay of the next visible feedback after user interaction.
- **CLS:** the index summarizing unexpected visual layout jumps.
- **Main thread:** the execution path of the browser, which is responsible for drawing the interface and many JavaScript tasks, among other things.
- **Cache:** cache that can reuse previously downloaded resources.
