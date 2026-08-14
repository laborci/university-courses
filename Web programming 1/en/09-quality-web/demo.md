# Demonstration: testing accessibility and performance

## Goals

This demo shows that "looks good on me" is not the same as a high quality website. Students will see how to get a first impression of accessibility and loading performance on the example of a public page that can be safely used for education. The test is not a full certification, not a penetration test, and not a final judgment. A short, repeatable audit from which improvement hypotheses are generated.

Accessibility and performance are not two after-the-fact checklists. Semantic structure, comprehensible captions, keyboard-friendly interface, appropriate contrast and economical use of resources are all part of the same quality approach. Automated tools can quickly spot many errors, but they cannot understand the task or the user's situation for us.

## Preparation and ethical boundary

The instructor should choose a simple, freely accessible page, or even better: a practice page created for this purpose. Do not use login, personal information, payment process or send modification requests. The monitoring functions of the browser's developer tools are sufficient. All measurements are snapshots: network, cache, geographic location and browser extensions can change the result.

Let's clarify what we're looking at right from the start. **Accessibility** examines whether the interface can be used with different abilities, devices and situations. **performance** is not only the response time of the server: it matters how quickly something meaningful appears, when the page becomes manageable, and how much data the user's device has to download and process.

## Tutorial scenario, part 1: human first impression

Open the page in a normal browser window. Let's not start with a toolbox. Ask students to answer in ten seconds: what is the purpose of the page, what is the main next step, and what information would they expect from a link or button? If the target is not visible quickly, it is already a sign of usability.

Then reduce the window to mobile size, and then increase the browser magnification. We look for whether text is cut off, whether the menu disappears, whether content slides on top of each other, or whether horizontal scrolling becomes forced. It is important to state: the responsive layout is not only phone size. Zoom can be used by people with low vision, and the window size can be changed by many situations.

## Tutorial script, part 2: semantics and naming

Open the Elements/Inspector view of the developer tools. Find the main content, navigation, header and footer. Ideally, HTML uses not only many nested `divs', but also elements that carry the meaning of the document: `header`, `nav`, `main`, `article`, `section`, `footer`, and real headings.

Let's show the order of the headings. `h1` is usually the main topic of the page; the subsections follow logically. Visually large text won't become a headline because CSS makes it a large font size. A screen reader user can navigate with headings, so structural jumps or empty, repetitive headings are real obstacles.

Let's examine some links and buttons. "Click here" alone says little, especially in a list of links. The "Registration for the web accessibility presentation" already carries the goal. A button makes sense if it initiates an action on the page; link for navigation. This is not just HTML style: the role affects keyboard operation and meaning conveyed by assistive technologies.

Let's look at the alternative text for pictures. An informational image must briefly convey its essence; in case of decoration, the picture can be omitted from the reading. A file name such as `hero-final2.png` is not an alternative description. The `alt' text of a graph, on the other hand, summarizes the main trend, and the detailed table or description may be available separately.

## Tutorial script, part 3: keyboard onlyClick in the title bar, then move the mouse aside. Use the `Tab' key to move through the interactive elements, and use `Shift+Tab' to go back. Say out loud what is happening: is the focus always visible, is the order logical, is the menu available, is it possible to open and close a dialog window? Disappearing the focus mark is a common visual design error; the person using the keyboard may then lose their place.

If there is a pop-up window, open it. The focus must go to the dialog, the background elements must not be accidentally traversable, and it must logically return to the start button after closing. Don't expect an automated checker to fully judge this: this is a good example of why you need a human test.

In the case of a form, we check whether each input field has a visible and programmed label. A field based only on placeholder text can be faulty: the explanation disappears when typing, and the connection is not always clear to the assistive technology. In the case of an error, the text should be specific: "The format of the email address is not correct", not just a red frame or "Error".

## Tutorial script, part 4: contrast and visual intelligibility

In the style or accessibility view of the developer tools, select a light gray text, a primary button, and an error message. The browser or a control tool can indicate the contrast ratio. Explain that good contrast is not just a matter of color blindness: it also helps in strong sunlight, with tired eyes or with a bad display.

It is not enough to communicate status only by color. If the error field only turns red, the meaning may be lost. There must be text next to the icon, a label next to the graph, and a clear marking for the mandatory field. At the same time, too much flashing, automatically starting motion or a pop-up window covering the text can also make the experience worse.

## Tutorial script, part 5: Lighthouse-like verification

Open an audit panel built into your browser or a Lighthouse-like tool. Let's run a test preferably with a new load without a cache, and then emphasize: the score is a diagnostic sign, not a grade. The tool typically provides recommendations for performance, accessibility, best practices, and searchability.

Let's read three hits together, not just the number. If the tool indicates missing alt text, look for the image in the DOM. If it indicates a contrast problem, look at the specific text and background color. If you mention a form field without a label, let's try it with a keyboard. This transforms the “let's improve the score” reflex into real understanding.

Among other things, the automation cannot decide whether an `alt' text makes sense, whether the headlines really form a logical story, or whether the button label is misleading in the situation. A high score is therefore not proof of complete accessibility; and zero error does not trigger testing with real users.

## Tutorial script, part 6: network, images and loading

Switch to Network view, turn on disable cache, and reload the page. In the timeline, we look at the document, style sheets, JavaScript files, images, fonts, and external requests. Let's ask: which file is needed for the first meaningful part of the page to appear? Which one arrives late? What can be loaded only when really needed?

A waterfall diagram helps you understand that many small delays can add up. A large hero image, blocking script or multiple third-party providers can slow down the display of visible content. The goal is not to blindly have as few requests as possible, but to ensure that critical content arrives first and secondary resources arrive reasonably.

Select two pictures. Compare their displayed size with the size and resolution of the downloaded file. A photo that is 400 pixels wide on a phone and several thousand pixels wide can be unnecessary data and processing. Let's talk about modern formats, size variations, compression and delayed loading. However, delay is not good for everything: the most important image on the home screen can spoil the user experience by loading late.Let's also see if the images cause a layout jump. If the browser does not know the space requirements of the image in advance, it can push the already readable text down when loading. This is annoying and can even lead to misclicks. Specifying the dimensions in advance is therefore not cosmetic.

## Example: repair plan from three finds

On a fictional event page, testing indicates three issues: the menu has no visible focus, the faint text below the headline has poor contrast, and a high-resolution photo loads on the home screen. A remediation plan is not "let's run the audit again". First, we reset and design the focus marking, and then check it with a real keyboard test. Second, we choose a color pair that remains readable. Third, we create a suitable image size and format, while maintaining the image's position in the layout. Finally, we measure again and check with the human eye that the repair did not cause any new problems.

## Common misconceptions

**"Auto-audit is the ultimate truth."** It's a useful filter, but it doesn't understand the content meaning and the whole usage process.

**"Responsive site is barrier-free."** Adapting to a small screen is just one aspect; focus, semantics, captions and contrast are independent of this.

**"A fast site only means a strong server."** Images, scripts, fonts, client-side processing and network all matter.

**"Marking the error in red is enough."** The color alone is not accessible to everyone and does not explain what needs to be done.

## Review questions

1. Why is it worth starting the audit with a human walkthrough?
2. What is the difference between visually large text and a real headline?
3. What do we observe when navigating with `Tab'?
4. Why is a high accessibility score not enough?
5. What can we learn from the Network waterfall diagram?
6. Why can an image that is too large cause problems even if it ends up looking nice?
7. Name a problem that can be indicated by automation and one that requires human interpretation.

## Glossary

**Alternative text (`alt`):** text that conveys the meaning of images for assistive technologies.  
**Focus:** the state of the interactive element currently controlled by the keyboard.  
**Contrast:** degree of visual separation of foreground and background.  
**Lighthouse-like audit:** automatic quality control that can be run from a browser.  
**Semantic HTML:** the use of elements representing the structure and role of the content.  
**Water (fall) diagram:** view depicting the course of network requests over time.  
**Layout Jump:** Unexpected content displacement during loading.
