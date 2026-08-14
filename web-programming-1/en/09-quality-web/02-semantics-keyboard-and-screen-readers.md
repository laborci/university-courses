# Semantics, keyboard usage and screen readers

## Goals

By the end of the material, the student should understand that the visible appearance of the website and its meaning structure are not the same. Learn the role of semantic HTML, the basics of keyboard navigation, the importance of focus, and how a screen reader converts a document into an audio or Braille interface.

The browser doesn't just draw pixels. It conveys document structure, controls, relationships, and states. If this meaning is lost by the developer, the visuals may be nice, but the interface becomes unmanageable for many users.

## The semantics: what does an element mean?

Let's look at two solutions for a navigation element. One is a `div` with a click handler, the other is a real `button` or `a` element. Both can be blue rounded rectangles on the screen. However, they are different for the browser and assistive technology. The link navigates to another location or resource; the button initiates an action, such as opening a dialog box or submitting a form.

Semantic HTML means choosing an element that fits the meaning of the document. `header`, `nav`, `main`, `article`, `aside` and `footer` provide orientation points. Headings `h1`-`h6` express a hierarchy. `p` is a paragraph, `ul` and `ol` are a list, `table` is tabular data, and `label` is a name belonging to a form field.

This structure is useful in several channels. A screen reader user can jump by headings. The search engine has a better understanding of what the main content is. The code will be more readable for both the browser and the subsequent maintainer. Semantics is therefore not a decorative rule, but a reusable meaning.

## Headings: not font sizes

A common mistake is that a caption intended for a title is just a bigger, bold `div` or `span`. This makes it look like a title, but the document will not have a heading. It is the same error if the elements `h1`-`h6` are selected only because of their size.

A page usually has a main heading, `h1`, then its topics are divided by `h2`s, and their parts by `h3`s. The most important rule is not the omission of the number, but the meaningful hierarchy. Let's imagine the page as a table of contents: if you can't understand the thought process, the heading structure needs to be improved.

## The keyboard is not a secondary input method

Many people use a mouse to use the web, but not everyone. Some people navigate with a keyboard for physical reasons, others because of workflow or personal preference. Typically, the Tab key moves to the next focusable element, Shift+Tab goes backwards. A link or button can be activated with Enter; space often operates a button, check box, or switch. The role of the arrow keys may depend on the control type, for example in a radio button group or menu.

Focus indicates where the next keyboard action will arrive. It should look like this. In CSS, the outline is sometimes removed for aesthetic reasons, for example by using `outline: none`. This is a serious mistake if you don't have a clear, well-contrasted focus mark instead. In this case, the user does not know which button to activate.

The order of focus should follow the logical order of the content. If the fields of a form are below each other on the screen, do not use Tab to jump to the footer and then back. The visual can be rearranged with CSS, but the order of the HTML still determines how the keyboard and screen reader proceed.

## Missing link and repeated navigation

A long menu repeated on every page can be comfortable with a mouse. However, with a keyboard, every time the page is opened, the user would have to go through it before reaching the main content. This is what the "Jump to main content" link is for. It is usually visually hidden, but becomes visible when focused. It's not a spectacular feature, but it saves a lot of repetitive actions.

## How does a screen reader "see"?

A screen reader is an assistive technology that conveys the digital interface through speech or a Braille display. It does not interpret the pixels of the screen as the human eye does, but the accessibility tree provided by the browser. It contains the element's role, name, status and value.For example, with a good button, the user might hear "Open cart, button." In the case of a faulty `div', just "Open shopping cart" or nothing at all. For an input field, the `label` connects the field to its question: "Email address, edit field". The `placeholder`, which only appears as a placeholder, does not replace this: it disappears when typing, its contrast can be weak, and it does not give a reliable name in all situations.

A screen reader user does not necessarily read the page in a linear fashion. You can list headings, links, form fields, or waypoints. That's why the many "Next" and "Click here" links are particularly confusing: in a list, only identical, meaningless tags appear one after the other. The text of the link itself says its purpose: "Opening the admission deadlines".

## Forms and bugs

In addition to the visible label in the forms, the connection should also be written mechanically. The `for` attribute of `label` points to the `id` value of the field. Thus, even by clicking on the label, the field is activated and the assistive technology names it correctly.

In case of error, don't just use red. The error message tells you which field it is, what the problem is, and possibly how to fix it. After submission, it is advisable to direct the focus to the summary of errors or to the first field with errors, so that the user does not have to search. In the case of dynamically changing states, it is important that the screen reader is also informed of the change, but do not flood it with unnecessary announcements.

## ARIA: important tool, but not first choice

ARIA attributes can add roles, names, and states to complex controls that have no native HTML equivalent. For example, in a self-made collapsible panel, `aria-expanded` can indicate whether the content is open. An icon button can be given a descriptive name using `aria-label`.

The principle: use native HTML first. `button` is already a button; there is no need to `div role="button"` and then replace the keyboard operation, focus and disabled state with a separate program. ARIA does not automatically enable an element, it only provides information about it. Specifying the wrong role can fool the screen reader. "ARIA only for reasons" means that we are filling a real gap with it, not overwriting the standard structure.

## Worked example: a modal dialog

A "Login" button opens a dialog box. With a mouse, this seems simple, but with a keyboard, more questions arise. When opened, the focus should go to the first meaningful element of the dialog, such as the address or email field. Use Tab to keep the focus within the open window; don't wander to the backend menu. It can be closed with the Esc key, if this does not cause data loss. On closing, focus should return to the "Login" button that opened it.

The dialog box must have a clear name, and the assistive technology must also understand the state change. You can see that this is not a "screen reader extra": a good focus management with both mouse and keyboard makes the interface more predictable.

## Simple check routine

Already during development, many errors can be discovered without special tools. Put the mouse aside, reload the page, and then try to do the main task using only Tab, Shift+Tab, Enter, Space and Esc. Is the focus visible at all times? Do we get to all the essential controls? Are we stuck in an open component and can't accidentally go to background content?

It is worth looking at the accessibility tree with the browser's built-in developer tools. Here, it is often immediately clear if an icon button has no name, a field label is not connected to it, or a caption that looks like a heading is actually just formatted text. This is not a substitute for proofreading with a screen reader, but it is a quick feedback on the actual meaning of the document.

## Common misconceptions

**"If it's clickable, it's accessible."** Clickable does not mean a keyboard-accessible, focusable, and correctly declared control.**"`tabindex` will fix the order."** Positive `tabindex` values ​​often produce unpredictable ordering. Correct HTML order is the basic solution.

**"A placeholder is a label for a field."** It's not. It can be a short help, but it does not replace the permanent label, which can also be identified from the program.

**"Everything needs ARIA."** Excessive or bad ARIA can actually make things worse. Semantic HTML solves many tasks from the start.

## Review questions

1. What is the difference between a link and a button?
2. Why is the complete disappearance of the focus signal a problem?
3. How does a screen reader use headings and landmarks?
4. Why is it not advisable to rearrange the focus with positive `tabindex` values?
5. Give an example of a case where ARIA might be justified and when native HTML is a better choice.

## Glossary

**Semantic HTML:** the use of HTML elements that match the role of the content and carry meaning.

**Focus:** the element that is the next target of keyboard input.

**Focus order:** the order in which elements are traversed during keyboard navigation.

**Screen reader:** assistive technology via speech or Braille display.

**Landmark:** structural element marking a larger page region, for example `main` or `nav`.

**ARIA:** a set of attributes that add accessibility information to dynamic and complex web controls.
