# Accessibility and inclusive design

## Goals

By the end of the material, the student should understand that accessibility is not a discount given to a special user group, but a basic quality requirement of a usable web. Can distinguish temporary, situational and permanent obstacles; know the four principles of WCAG; and be able to recognize some obvious problems of a website from a user's point of view.

A website is accessible when people with their own devices and different abilities can understand, manage and use it reliably. Accessibility is not a "plus feature": it is a practical condition for the openness of the web.

## Why are we talking about this in a web subject?

Imagine a university admissions site. The student does not see the error message highlighted in red because it is misleading. Another student can only work with a keyboard for a few weeks due to a hand injury. Someone watches the video information on a noisy train, so they want subtitles. A fourth tries to read the page on a slow old phone in bright sunlight. The problem is not that these people are using the system in "abnormal" circumstances. The problem is if the system is only designed for an imagined user working with a mouse, with good eyesight, sitting on a fast network.

The original promise of the web was that information could be accessed regardless of device or location. Accessibility makes this promise a reality. There are legal, business and ethical reasons, but from a developer's point of view, the simplest reason is that a service only fulfills its task if the target audience can actually use it.

The term "inclusive design" emphasizes that we should not end up trying to fix the system for a narrow group. We ask already at the time of planning: who can be left out of this decision? A well-chosen, real button, for example, can be focused by default and activated with a keyboard. Retrofitting a clickable `div', on the other hand, brings with it many forgotten details.

## Obstacles: it's not just about disability

The obstacle can be permanent: a blind or partially sighted person can use a screen reader, a deaf user needs captions, and a person with reduced mobility does not necessarily use a mouse. It can also be temporary: a broken arm, eye surgery, a migraine or a temporary hearing problem. And it can be situational: the contrast of the display is weak in the sun, the user is holding a baby, or the sound of the video cannot be turned on in a library.

That's why it's useful to think along the 'ability spectrum'. You don't need to know every user personally to make better decisions. For example, subtitles are essential for deaf users, but they are also helpful for many other people when learning a language or watching videos without sound. The appropriate heading structure is a navigation tool for those working with screen readers, but it results in clearer content for everyone.

## WCAG view: POUR

The Web Content Accessibility Guidelines, WCAG for short, is a widely used guideline for web accessibility. Not checklist magic, but a framework for thinking. Its four principles can be noted with the acronym POUR: perceivable, operable, understandable, robust.

**Perceivable:** the information can be picked up by the user in some sensory or technical way. If a chart only distinguishes data by color, it is not perceptible to everyone. If an image has important text, it must also have a text equivalent. Subtitles may be required for video and transcripts for audio. This includes legible font size and sufficient contrast.

**Operable:** all essential functions can be operated. Don't assume the mouse, touch or fast reaction. Keyboard focus should be visible, navigation should be logical, and time limits should be justified or extended. An automatically moving content can be an obstacle even if it is spectacular.**Comprehensible:** the language, behavior and feedback of the interface should be consistent. For a form, the field label tells us what we're asking for, and the error message tells us what went wrong and how to fix it. "Faulty data" is no help; "The @ sign is missing in the email address" already is.

**Robust (robust):** the content should be interpreted in various browsers and with assistive technologies. The starting point for this is standard, semantic HTML. The screen reader doesn't read fancy CSS, but interprets the structure of the document and the accessibility information.

WCAG defines compliance in levels A, AA and AAA. In practice, the AA level is a common goal, but the point is not to get the sticker. Even a formally appropriate page can be difficult to use if real user tasks have not been tested.

## Contrast, color and readability

One of the common mistakes in the design is too pale gray text, the status indicated only in color or the inscription disappearing in front of the decorative background. Contrast expresses how much the text stands out from the background. As a general guideline, a contrast ratio of at least 4.5:1 for normal-sized text and at least 3:1 for large text is the often-referenced WCAG AA goal. This is not a matter of taste: even a sighted user can lose information on a bad display, with tired eyes or in low light.

Color should be an additional signal, not the only one. It is wrong if a form field is only marked with a red frame. It is better if a text message and a well-recognizable icon appear next to the frame. The same is true for graphs: the categories should also have a label, pattern or other distinguishing mark.

## Alternative text: we describe the meaning of the image

The `alt` attribute is not meant to repeat the file name. `chart-final-v2.png` says nothing with a screen reader. The alternative text conveys the role of the image in the given context.

In a product catalog `alt="Blue backpack front view"` is useful. In the case of a graph in an article that really supplements the text, the `alt` can briefly summarize the main message: `alt="The number of registrations increases continuously from January to June"`. If the image is merely a decoration, the empty `alt=""` is often the correct one: so the screen reader skips it, instead of burdening the user with noise. For a complex diagram, short alternative text is not enough; the detailed information or explanation is also given in the surrounding text.

## Worked example: an improved event page

Let's say that on the page of a faculty presentation, the date is listed next to a small calendar icon, and the application is a "Click here!" colored box, and the location can be seen on an embedded map. In a more inclusive version, the page is segmented with real headlines; the date can also be read as text; the application is a real, clearly labeled button or link: "Application for the lecture on September 18"; and below the map there is a text address and route information.

We have not created a separate page "for the blind". We made the same page more understandable for everyone. This is a typical example of good accessibility decisions.

## How to get started in practice?

Improving an existing page should start with the most important user paths: can the information be found, can the main action be initiated, and can the form be submitted? Then you can do a simple manual test: Go through the page with the Tab key, zoom in on the browser, turn off the sound for a video, and see if the interface remains comprehensible. Automated checkers are good companions in this case: they can quickly indicate missing labels or insufficient contrast. However, their results must always be interpreted with human judgment.

It is especially important that accessibility is not a single inspection day at the end of the project. When designing a new component, the team can immediately decide on the appropriate HTML element, focus state, error messages, and small screen behavior. Thus, much less subsequent repair is required.

## Common misconceptions

**"Accessibility is only important to blind users."** Nope. Sight, hearing, movement, attention, language, device and environment can also affect use.**"An automatic validation tool tells you everything."** Tools are valuable, but they cannot judge whether an alt text actually makes sense or a process is understandable.

**“ARIA solves problems.”** ARIA can add semantics, but when used incorrectly, it misleads assistive technology. First choice is the appropriate native HTML element.

**"Accessibility limits creativity."** Rather, it provides a framework: the visual is good if it remains clear, manageable and stable.

## Review questions

1. What do the four letters of POUR mean and give a web example of each?
2. Why is it not enough just to indicate an error condition with a color?
3. What is the difference between alternative text for decorative and informative images?
4. Why can subtitles also help a user who is not hearing impaired?
5. Why doesn't an automatic check replace the user test?

## Glossary

**Accessibility:** ensuring that the content can be used with different abilities and assistive technologies.

**Inclusive design:** a design approach that takes into account the diversity of users from the very beginning.

**WCAG:** a system of guidelines for accessibility of web content.

**Contrast ratio:** a measure of the brightness difference between the two colors; one of the important factors of readability.

**Alternative text (`alt`):** is a text replacement that conveys the role of the image.

**Assistive technology:** such as a screen reader, magnifier or alternative input device.
