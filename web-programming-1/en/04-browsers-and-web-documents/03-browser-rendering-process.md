# Browser rendering process

The browser doesn't simply download a page and then render it all at once. It transforms resources into appearance in several overlapping processing steps. A fast web is not fast because it has few files, but because the content important to the user is displayed quickly, stably and responsively.

### Work before the visible page

When we open a news page, we often feel that "the page is loaded". In reality, loading consists of several different things. The browser must receive the HTML response, discover the associated CSS files, fonts, images, and JavaScript, download some of it, and then figure out where and how to display the elements. In the meantime, the user can already see something, but a large image can arrive later, a font can be replaced, or a button can only be used after JavaScript has run.

Therefore, performance should be interpreted as user experience. How long does it take for the first meaningful content to appear? When does the most important element appear? Does the text or a button move? How quickly does the site respond to clicks? These questions are closer to real-world usage than a single, technical "load time" value.

### HTML processing: DOM construction

The starting point of the process is usually HTML. The browser doesn't necessarily wait for the entire document to download: it parses bytes as they arrive. It recognizes members, attributes and text and then builds the DOM tree from them. The DOM is a runtime model of a document's structure; the browser later learns from this what elements exist and what kind of relationship they are.

During the analysis, the browser looks for additional resources. A `link rel="stylesheet"` indicates CSS, an `img` an image, a `script` JavaScript, a `video` a video. The browser tries to request them in parallel, where the protocol and resource type allow it. HTML is therefore not only content: it is also a kind of resource map.

If the HTML is wrong, the browser tries to build a meaningful DOM, but the result of error correction can sometimes be surprising. Badly nested elements can end up in a different place in the tree than the author intended. This is another reason for the document structure to be orderly and semantic.

### Processing CSS: CSSOM and styles

CSS is not part of the DOM. The browser also analyzes the style sheets and creates its own internal representation of them, often called a CSSOM model. This includes not only that `p` should be gray, but also the priority of selectors, inheritance rules, media conditions and competing declarations.

When the browser determines the actual style for a DOM element, it must compare all the rules for it: the browser's base styles, external style sheets, the element's inherited properties, and inline styling if necessary. "Cascading" means just this decision system. For example, the result might be that a paragraph is 16 pixels, dark gray, with a given font family, and part of a flexible layout.CSS is a critical resource because the browser doesn't want to show a cluttered or flickering interface. If you don't know the styles, you can't reliably calculate the final layout. Therefore, the style sheets required at the beginning of the document often delay the first stable rendering. This is not to say that CSS is bad or to be avoided: the lesson is that the styles required for the initial view should be reasonably sized and available in a timely manner.

### Render tree: what is actually displayed

The render tree is built from the intersection of the DOM and the style information. This contains the display representation of the elements that are involved in the design of the visible page, with their associated computed styles.

The render tree is not the same as the DOM. `head`, for example, is part of the DOM, but is not displayed on the screen. An element with style `display: none' is usually also not included in the display tree, because the browser does not need to create any space or image for it. On the other hand, a transparent element (`opacity: 0`) can be invisible, but it can still take up space, so it has a role in the rendering process.

This difference has practical consequences. A menu hidden with `display: none' is removed from the visual layout, while an element made only transparent can still influence the layout and even remain interactive. The right decision depends on what we want: to temporarily disappear something, animate it, or really remove it from the interface.

### Layout: calculation of locations and dimensions

Once the browser knows which elements are displayed and what style they have, it must calculate the geometry layout. This is the layout, also known as reflow. This is where you decide, for example, how many pixels wide a card is, how many lines a title breaks, where a button starts, or how many columns a grid uses for the current window size.

Layout is often a dependent task. The height of a parent element can be affected by the content of its children, the width of children can depend on the width of the parent, and wrapping text can change the required height. Because of this, a single change can propagate. If, for example, an image that loads late has not been given a known size in advance, you can push the content below it down when the image arrives. The user wants to click on a button and it moves: this is a typical usability error.

Responsive design is strongly linked to layout. We do not create a separate website for each device, but rather rules that rearrange the content based on the available space. A three-column card grid can become two-column and then one-column on a narrow screen. Content remains the same while reporting.

### Paint: generate pixels

During paint, i.e. drawing, the browser creates painting instructions based on the calculated boxes and styles. This includes drawing text, background, border, shadow, image and many other visual details. Paint doesn't necessarily mean that everything has instantly become the final pixel on the screen; rather a description of what needs to be drawn.

A simple color change often only requires a new drawing. However, changing the size or position of an element can trigger a new layout and then paint. For this reason, in a continuous animation it may be better to use properties that the browser can handle more efficiently, such as transparency or offset in some cases, rather than recomputing the width every frame. This is not an absolute rule, but it clearly shows that even a spectacular interface has a computational cost.

### Compositing: joining layers

During compositing, the browser puts the separate layers together in the correct order to form the final image of the screen. Certain elements, such as scrollable content, animated or transparent layers, may receive special treatment. One of the goals of this is to not have to redraw the entire page when a change is made.Layering is not magic and does not automatically provide a fast page. Too many complex layers can require memory and processing. Good performance requires measuring and understanding the actual user problem: it might not be drawing, but a slow network request or a long JavaScript task that is causing the latency.

### JavaScript and the issue of blocking

Traditional JavaScript placed with the `script` tag is in a special situation. When the HTML processor comes across such a script, the browser must usually download and run it before it is safe to continue parsing the document. This is necessary because the script can, in principle, modify the document, even write a new HTML fragment. This behavior can block DOM construction and rendering.

Two common attributes help you consciously manage this. `async` indicates that the script can be downloaded in parallel and run as soon as it arrives; this may be good for independent measurement or external scripts, but the running order is not guaranteed. `defer` also allows parallel downloading, but postpones the execution until after the HTML has been processed and preserves the order in the document. For most DOM-based custom scripts, `defer' is a more predictable choice.

The goal is not to hide or delay all JavaScript. Code for a login interface or instant interaction can be important. The goal is not to force the user to do unnecessary work on the first screen before the content appears.

### What should we pay attention to in terms of performance?

A modern browser can display many metrics, but the principle is simple. Important content should appear quickly; the layout should not jump; the surface should react within a short time; and the work running in the background should not obstruct the user. Large, unoptimized images, unnecessary fonts, too many external scripts, and too large JavaScript packages can all harm these goals.

Performance is not just a matter of comfort. The difficult site is less accessible on a slow mobile network, an older phone or a limited data frame. A fast, stable site can also be more favorable from the point of view of sustainability, because it requires less data and calculations.

## Worked example: the first appearance of an event page

Let's say a student opens the event page of a university conference. First comes the HTML, which includes the event's title, time, short description, a link to CSS, a large header image, and a JavaScript file. The browser builds a DOM from the HTML, recognizes the style sheet and the image, and therefore starts their download.

When the CSS processing is complete, the browser can build the render tree along with the DOM. The layout calculates so that the text and image are next to each other in desktop view, and below each other in mobile. Paint draws the background, letters and frames, and compositing puts the final image together.

If the size of the header photo is not specified in advance, the text may first appear higher and then suddenly jump lower when the image is loaded. If there is a large, blocking JavaScript file at the beginning of the document, the title may also appear later, even though it would be the most important information for the listener. In a better version, the image has a known scale, the non-vital script is given a `defer` attribute, and the styles required for the initial view are quickly available.

## Common misunderstandings| Claim | Clarification |
| --- | --- |
| "The page is ready after downloading the HTML." | HTML is just the beginning; the styles, images, scripts and rendering steps are still to come. |
| "The render tree is the same as the DOM." | The render tree uses the displayed parts of the DOM and its calculated styles; not all DOM elements are included. |
| "All modifications are equally expensive." | A color change, a new layout, and a complete page refresh can all involve different amounts of work. |
| "`async' is always better than normal script." | The execution order of `async` is not predictable; it can cause errors in code that builds on each other. |
| "A fast site is just a developer's convenience." | Performance affects usability, accessibility, cost and, in many cases, the bottom line. |

## Review questions

1. Why does the browser build DOM when processing HTML?
2. What is the role of CSSOM and why can CSS be a critical resource?
3. What is the difference between DOM and render tree?
4. What does the layout step calculate and why can a large image cause a layout jump?
5. What do paint and compositing mean in practice?
6. Why can a traditional `script` element block, and when is it justified to use `defer`?
7. Name three factors that can delay the appearance of the first content that is important to the user.

## Glossary

- **DOM:** the document object model built by the browser.
- **CSSOM:** the browser's internal model of CSS rules.
- **Render tree:** the tree of displayed elements and their calculated styles.
- **Layout (reflow):** calculating the size and position of elements.
- **Paint:** generating instructions for drawing visual details.
- **Compositing:** combining separately treated layers into a final image.
- **Blocking resource:** a resource that delays an important step in the processing or rendering of a document.
- **`async`:** script attribute for parallel downloading with non-guaranteed run order.
- **`defer`:** script attribute for parallel download, with sequential execution after HTML processing.
