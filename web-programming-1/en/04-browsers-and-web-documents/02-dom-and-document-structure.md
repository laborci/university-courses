# DOM and document structure

An HTML source is a textual starting point. The DOM is the in-memory tree built from this by the browser, which is used by the browser, assistive technologies, and JavaScript. The two are not the same: the browser can fix bad markup, and JavaScript can change the DOM after it's loaded. If the structure and meaning of the document is good, the interface is not only easier to develop, but also usable by more people.

### The website is a document, not an image

At first glance, a website looks like an image or interface: we see a title, menu, paragraphs, buttons and images. However, the browser does not receive a pre-made image. Typically, it downloads an HTML text and then tries to understand which part is which element, what is part of what, and what the content means. This interpretation gives rise to the DOM, the Document Object Model.

The word "model" is important here. DOM is not a file format or a second HTML file, but an internal model that can be manipulated by programs. For example, the browser registers the document, its `html`, `head` and `body` elements, a title, a link or a form field as objects. Objects have properties and relationships. A heading can have text content, an `id` attribute, and a CSS class; and a list has multiple list item children.

This allows a browser to not only display, but also manipulate the document. CSS works from the same model when it selects elements for formatting, JavaScript when it changes a paragraph at the click of a button, and the screen reader when it conveys the structure of the document to the user.

### The metaphor of the tree

The DOM is most easily thought of as a family tree or directory structure. The root of the tree is the document itself. The `html` element grows out of it, its children are `head` and `body`, and there are additional elements under `body`. A `main` element can contain `article`, under `article` there can be `h1`, several `p`s and one `ul`; and `li` elements below the list.

For example, this HTML:

```html
<main>
  <article>
    <h1>Exam period information</h1>
    <p>Application opens on Monday.</p>
    <a href="/exams">Exam dates</a>
  </article>
</main>
```

not three consecutive lines for the browser, but a tree containing part-whole relationships. `main` is the parent closer to the root, `article` is its child; `h1`, `p` and `a` are siblings because they have the same parent. The text itself is part of the tree: "Exam information" is not an independent HTML element, but a text child of the `h1` element.

These relationships are more than simple theoretical labels. In CSS, the `article p` rule can, for example, target paragraphs under `article`. In JavaScript, a developer can search for a specific element and then add a new child. The Elements or Inspector view of the browser's developer tools presents just this tree, usually as a drop-down hierarchy.

### HTML source and live DOM: why don't they always match?

The source of the page shows what the server sent. The DOM view of the developer tool is what the browser is currently working with. The two are often similar, but they are by no means identical.The first reason is that browsers are fault-tolerant. In the history of the web, a lot of incorrect or incomplete HTML has been published on the Internet, so the browser does not simply give up if, for example, the closing member of a paragraph is missing or an element is placed in an illegal place. He tries to build a usable tree based on rules of interpretation. For example, a missing `tbody` element in a table can be created by the browser in the DOM even though it was not present in the original source. However, this same goodwill is not a guarantee that the site will be understood in the same way in all browsers and with assistive technology.

The second reason is JavaScript. The server can send an empty container and a program that later loads the news, the user's name, or the contents of the cart. In this case, the source only shows this:

```html
<section id="news">
  <p>Loading news…</p>
</section>
```

A few moments later, JavaScript can replace this with three news articles. The DOM can therefore also change over time. That's why it can happen that in the "view source" function, we can't find the text on the screen, but in the developer tool, we can find it.

Important conclusion: if an important piece of information is displayed only after JavaScript, you should also think about what happens in the event of a slow network, a script error, or a device where the script does not run properly. Not all content has to be in the original HTML, but the decision should be a conscious one.

### Dynamic changes and events

The DOM is a living model. JavaScript can not only read, but also modify: add a new element, delete an existing one, rewrite text, change an attribute or CSS class. For example, a "More results" button can add new list items to the results list. A bad field on a form can get an error message and a class that results in a visible frame.

A simplified example:

```html
<p id="allapot">No time has been selected yet.</p>
<button id="booked">Select time</button>
```

```js
document.querySelector('#booking').addEventListener('click', () => {
  document.querySelector('#allapot').textContent =
    'Time selected.';
});
```

In this example, a click is an event. The program searches for the button based on the ID, starts monitoring the click, and then modifies the text of the paragraph. The browser then updates the display. From the user's point of view, all that happens is that the caption changes; in the background, a text node has changed in the DOM.

Dynamism is not a virtue in itself. It is good if it makes the interface faster, more understandable or more convenient for the user. If instead of a simple link, complex JavaScript manipulation prevents normal navigation, the interface becomes more fragile. For DOM changes, it is therefore always worth asking: what has changed for the user, and is this change perceptible to everyone?

### Semantics and accessibility

The DOM tree is not only the basis of visual layout. A screen reader doesn't "see" pixels the way a sighted person does; it builds an accessible representation from the structure and semantics of the document. The fundamental source of this is whether we use real headings, lists, buttons, form tags and main content regions.

For example, a clickable `div' can be visually styled like a button, but it does not behave like a button on its own from a keyboard, and its purpose is not clear to assistive technologies. The real `button` element, on the other hand, can be focused from the start, can be handled with Enter or space, and its role is known. Similarly, `h2` is not just a capital letter: it means that a new, second-level chapter of the document begins.In the case of JavaScript changes, this aspect must also be preserved. If an error signal is only displayed as a red frame, it is easily missed by a colorblind person or a person using a screen reader. A textual error message linked to the field is required. If a modal window opens, it is advisable to direct the focus there and return it to a meaningful point after closing. These are not just "extra features": they are part of responsible use of the DOM and user interaction.

### The developer tool as an observation window

The browser developer tool is particularly useful for learning the DOM. When selecting an element, you can observe its tree position, attributes, inherited and applied styles, as well as which rule caused it to have the size or color it is. After one click, you can see whether the DOM has changed.

A good practical question is "Is the menu visually hidden, or is it actually not in the DOM?" In the first case, a screen reader or keyboard navigation can still reach you; not in the second one. The difference has user and accessibility consequences.

## Worked example: exam information panel

Imagine a university site where exam information for a course is displayed. In the initial HTML, the name of the course is displayed as a heading, the requirements are listed, and the exam locations are displayed as a table. This is a meaningful document in itself: it can be viewed based on the titles, the list can be read as a list, and the meaning of the columns can be determined from the table header.

The user then selects an exam date. JavaScript doesn't rebuild the entire page, it just updates the text of a `p` element: "Selected time: June 12, 10:00." If the selection is incorrect, for example the space is full, a well-worded message is displayed. The success or error message should be a logical part of the DOM, clearly placed and indicated to assistive technologies if necessary.

On the other hand, it would be a bad solution if there were colored `divs' instead of headings, clickable images instead of buttons, and texts pushed next to each other instead of tables. The visuals might be similar, but the document would lose its meaning. A good DOM structure is like a well-edited note: it can be followed even if it has not yet received a definitive typography.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "DOM is the same as HTML." | HTML is the source, DOM is its object model constructed by the browser and changing during runtime. |
| "The code you see in the dev tool must have come from the server that way." | The browser may have corrected, added, or JavaScript modified the document. |
| "If a `div' looks like a button, it's a button." | It may be visually similar, but its semantics and basic keyboard behavior are not the same. |
| "A JavaScript update always gives a better user experience." | Only if it remains comprehensible, fast and perceptible to all affected users. |
| "The DOM tree should only be understood by the frontend developer." | It is relevant for all web actors in terms of content, testability, searchability and accessibility. |

## Review questions

1. What is the difference between the HTML source downloaded from the server and the actual DOM of the browser?
2. Draw a `main` element in a tree shape with an `h1` heading and two paragraphs.
3. Why does it matter if an interactive control is a real button, not just an element that looks like it?
4. Give an example of a DOM change triggered by a user event.
5. In what situation can it lead you astray if we only look at the source of the page?
6. How does the semantic document structure help a person using a screen reader?

## Glossary- **DOM (Document Object Model):** the programmable object tree of the HTML document created in the browser.
- **Node:** An element of the DOM tree, such as a document, HTML element, attribute, or text.
- **Parent, child, sibling:** hierarchical relationships between the nodes of the tree.
- **HTML source:** the textual HTML response sent by the server.
- **Semantic HTML:** a markup that also expresses the content role of the element.
- **Event:** an event triggered by the user or the browser, such as a click or form submission.
- **Assistive technology:** a device or software that supports the use of the digital interface, such as a screen reader.
