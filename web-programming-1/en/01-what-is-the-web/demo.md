# Demo: exploring the main components of a website

## Preparation

- Open a simple, publicly accessible, preferably ad-free website.
- Use a browser with developer tools; it is opened by `F12` in most browsers, or by the developer menu on macOS.
- The goal of the demonstration is observation, not coding. Avoid complex web applications and too many external requests.

## Script

### 1. The visible page and the underlying document

Open the **Elements** or **Inspector** panel.

Show that:

- the browser shows the structure of the website in the form of a tree;
- the headline, paragraph, link and image are separate elements;
- the source of the page is not the same as the screenshot: the browser interprets the descriptive document.

**Teacher's question:** If we rewrite the text of an address in the scanner, does the real website change for all users?

**Expected answer:** No. The display only changes temporarily in your own browser.

### 2. Role of HTML, CSS and JavaScript

Select a visible element in the inspector and point to its associated style rules.

- **HTML:** structure and meaning of the element;
- **CSS:** color, font size, layout and appearance;
- **JavaScript:** interactive behavior, such as changing on button press or loading data.

No need to explain code. The goal is for students to understand that the three technologies perform different tasks.

### 3. Resources and Network Requests

Open the **Network** panel, then reload the page.

Show it in the request list:

- the request for the first HTML document;
- one or more CSS and JavaScript files;
- images or fonts;
- the status code;
- the type and size of the resource;
- the loading time.

**Key phrase:** The user sees one page, but the browser often downloads dozens of separate resources.

### 4. Brief examination of the request and the response

Select a document request in the Network panel.

Show me:

- URL of the request;
- the HTTP method;
- the status code;
- headers indicating some response types;
- the preview or content of the response.

Relate this back to the client-server model: the browser requests, the server responds, and the browser processes the response.

### 5. Final question

Ask: "If the layout of the page has already been rendered, but an image or font is loading later, which web component might be the problem?"

Make the students realize that the answer can be several: network, server, resource size, caching or the structure of the page itself.

## Common errors during the demonstration

- Do not use a site that requires login or personal information.
- Don't try to interpret every request of an entire modern web application in front of the students.
- Don't confuse the DOM with the original document stored on the server.
- Don't claim that every page is built with exactly the same amount or the same type of resources.

## Short student assignment

On a selected public website, search the developer tools:

1. an HTML document;
2. a style sheet;
3. an image or font;
4. a status code indicating a successful HTTP response.

They then describe in one sentence what the resource is for.
