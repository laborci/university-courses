# Role of HTML, CSS and JavaScript



HTML tells you what is in a document and what it means. 
CSS is how it should be displayed. 
JavaScript tells how to behave and how to react to the user or changes in the environment. 
In a well-structured web interface, these three responsibilities are separated while working together.



When a user opens a web page, they usually see a single unified interface: title, text, images, buttons, menus, and possibly moving or changing elements. 
However, for the browser, this interface consists of several resources created for different purposes. 
The three most important building blocks are HTML, CSS and JavaScript.


These are sometimes simplified to HTML being the skeleton, CSS being the clothing, and JavaScript being the muscles or the nervous system. 
The analogy is not perfect, but it helps to remember the roles. 
HTML provides structure and meaning, CSS provides form and layout, and JavaScript provides dynamic behavior.


### HTML: structure and meaning of the document


HTML (HyperText Markup Language) is a descriptive language. 
It's not primarily for telling you what color a title should be or how many pixels tall a button should be. 
Describes whether a piece of content is a heading, paragraph, list, link, table, form, or quote. 
The browser builds the structure of the document from this.


A good HTML document helps not only the sighted user. 
Search engines, screen readers, translation tools and other programs also try to understand the content from the semantic structure. 
If a text is really a headline, it should be marked with the appropriate HTML heading element, not just as a paragraph with a larger font size.


Let's take a simple university news. 
The document can have a `header' part with an institutional identifier, a `main' part with the content, including an `article' element with the news, and a `footer' part with contact information. 
This information remains interpretable even if there is no CSS attached to it yet. 
The default display of the browser is not necessarily spectacular, but the logic of the document is already present.


### CSS: appearance and layout


CSS (Cascading Style Sheets) describes the appearance of the document. 
You can define fonts, colors, spacing, grid or flex layout, animations, and behavior for different screen sizes.


The word "cascading" refers to the fact that several style rules can apply to the same element, and the browser decides which one is valid based on the rules. 
For example, it matters how accurate the rule is, where it comes from and in what order it is listed. 
This is one of the strengths of CSS and at the same time one of the learning difficulties: not all formatting is a separate instruction, but the result of rules that interact with each other.


CSS makes it possible for the same HTML structure to work well on both phones and large screens. 
A navigation menu can be horizontal on a wide screen and vertical or hidden on a phone. 
This does not change the semantic meaning of the content; 
only its display adapts to the available space.


### JavaScript: behavior and programmability


JavaScript is a programming language that runs in the browser. 
With its help, the website can respond to the user's click, text input, scrolling or the result of a network request. 
JavaScript can load fresh data from an API, validate forms, modify part of a document, or store a setting in the browser.


However, this does not mean that every website needs JavaScript. 
An information page, policy or simple article can be used well with HTML and CSS. 
JavaScript is justified if it actually provides interactivity, updated data, or client-side processing. 
Unnecessary JavaScript can slow down loading, increase the chance of errors, and cause accessibility issues.


### What happens if one is missing?


Without CSS, the content is mostly still readable, just displayed with simple browser defaults. 
Without JavaScript, the basic information and navigation of a well-designed page will ideally still work. 
On the other hand, if the HTML structure is bad or missing, neither the appearance nor the behavior can be built on a stable foundation.


That's why the idea of ​​gradual development is important: first have a meaningful, accessible document; 
the appearance should be based on this; 
and then only in justified cases the interactive surplus. 
This way, the service remains more resilient even on a slow network, on an older device, or in the event of a temporarily incorrect script loading.


## Worked example: course registration page


In a course application interface, HTML represents the course name, requirements, application form and buttons. 
CSS ensures that the important deadline is visible, the table is legible, and the interface can also be used on a phone. 
JavaScript can show how many more characters can fit in a comment field or warn you when a required field is empty.


A business decision—for example, whether a student has actually completed a prerequisite—can't just be left to JavaScript running in the browser. 
It should also be checked on the server side. 
This shows that JavaScript is great for improving the user experience, but the final enforcement of critical rules is a server-side task.


## Common misunderstandings


| 
Claim | 
Clarification |

| 
--- | 
--- |

| 
"HTML is the programming language." 
| 
HTML is a descriptive language; 
denotes structure and meaning. 
|

| 
“CSS is just decoration.” 
| 
In addition to appearance, it also determines usability, responsiveness and readability. 
|

| 
"A site is not modern without JavaScript." 
| 
It is not necessary for many services or is only justified as a minor addition. 
|

| 
"Javascript form validation is pretty safe." 
| 
Client-side code can be modified or bypassed; 
the server must also validate the input. 
|


## Review questions


1. Why is the meaning more important in HTML than the direct description of the visual?

2. How can CSS help with accessibility?

3. Why is it beneficial to have basic information available without JavaScript?

4. What task would you assign to JavaScript in a web store, and what would you not entrust exclusively to it?


## Glossary


- **HTML:** language describing the structure and semantics of a web document.

- **CSS:** a system of rules describing the appearance and layout of a web document.

- **JavaScript:** programming language running in the browser for interactivity and client-side processing.

- **Semantics:** the meaning of the elements of the document.

- **Responsiveness:** adaptation of the interface to different screens and devices.

- **Gradual development:** A gradually expanding web approach based on stable foundations.
