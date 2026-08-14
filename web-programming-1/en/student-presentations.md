# Student presentations

## Purpose

Each session includes three optional short presentation topics. A presentation should connect concepts from the session to how the web works in practice, through a concrete example, case, or short piece of background research.

## Framework

- A presentation lasts **5 minutes**.
- Each student may give **one** presentation during the semester.
- The topic must relate to the relevant session.
- The goal is not to cover an entire subject, but to explain one clear question or example.
- Suggested structure: problem or question, brief explanation, concrete example, takeaway.
- Sources must be identified briefly in speaker notes or in `presentation.md`.

## Applying through GitHub

Apply in your public `webprog1-<neptun-code>` GitHub repository. Create a `presentation/` directory and add a `presentation.md` file based on the [template](presentation-template.md).

Upload the completed file before the application deadline. The timestamp of the GitHub commit verifies the application.

The file must include the selected session and topic, the presenter’s name and Neptun code, a publicly viewable Google Slides link in frontmatter, a short outline, and a source list.

Multiple students may apply for the same topic. If more than one valid application is submitted for a topic, the presenter will be selected by **random draw**. Students who are not selected must choose another available topic.

## Google Slides settings

Slides must be created in Google Slides, and the link in the `slides_url` frontmatter field must be publicly viewable. Set sharing to at least “Anyone with the link can view.” Do not make the presentation editable unless necessary.

## The role of slides

Slides are **not handouts**, notes, or text to be read aloud. They are demonstration tools that help the audience follow an argument and understand an example.

Good slides usually present one clear idea, use an image, simple diagram, chart, or short example, contain only a few words or brief bullet points, and are readable from a distance. Avoid full paragraphs, crowded bullet lists, tiny code, and screenshots of long text. The presenter supplies the explanation; detailed notes and sources belong in `presentation.md` or speaker notes.

## Preparation and delivery

Learn and rehearse the presentation. Do not read slides aloud or use slide text instead of an explanation. A presenter who reads from their slides **receives no credit** for the presentation.

Five minutes is short, so rehearsal matters. Time the talk, practise it aloud, and use slides only as prompts. A good presentation is not one that squeezes in the most information; it communicates one idea clearly, with an example.

## Available topics

### 1. What is the web?

- Why has the web become one of the most important general computing platforms?
- Browser wars and the importance of open web standards.
- Web 1.0, Web 2.0, and the platform web: what do these concepts mean?

### 2. The lifecycle of a web request

- How does DNS work, and why is it a critical part of the Internet?
- What is a CDN, and why can the same page load at different speeds in different countries?
- What happens when a domain name’s DNS record is faulty or unavailable?

### 3. HTTP and HTTPS

- Common HTTP status codes and the role of good error messages.
- Why is HTTPS important, and what does a certificate guarantee?
- HTTP/1.1, HTTP/2, and HTTP/3: which problems do they address?

### 4. Browsers and web documents

- HTML, CSS, and JavaScript: structure, presentation, and behaviour on a concrete site.
- Cookies, localStorage, and IndexedDB: what are they for, and how do they differ?
- Canvas and WebGL: how can complex graphics appear directly in a browser?

### 5. Web applications and rendering strategies

- SPA or multi-page application: when is each a better choice?
- Comparing server-side and client-side rendering.
- How do service workers enable offline use and progressive web applications?

### 6. Web data and APIs

- REST and GraphQL: which problems do they solve, and how do they differ?
- Real-time web: comparing polling, Server-Sent Events, and WebSockets.
- How to read public API documentation: what makes an API usable?

### 7. State, identity, and access

- Cookies, sessions, and tokens: three different approaches to handling state.
- What happens after clicking “Sign in with Google”?
- Passwords, multi-factor authentication, and passkeys: where is sign-in heading?

### 8. Web security fundamentals

- XSS: how can an apparently harmless text field become dangerous?
- CORS and same-origin policy: why can’t an arbitrary site access every piece of data?
- Phishing and deceptive websites: which signals help identify them?

### 9. The quality web

- Accessible web: how does a screen reader use a web page?
- SEO and AIO: how can content be found by search engines and AI-based assistants?
- GDPR on the web: what personal data may a website process, and under what conditions?

### 10. Reliable and high-performance web services

- Why do popular web services fail under peak traffic?
- Cache and CDN: how can they reduce load and loading time?
- How should a provider communicate with users during an outage?
