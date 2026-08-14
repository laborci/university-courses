# Demo: Monitoring an HTTP request in the browser

## Target

The demo is not intended to teach you all the buttons of a development tool. The student can see with his own eyes that entering a URL consists of several requests, and each request has a method, status, headers, and often a body. By the end, you should be able to connect the concepts discussed in class with an actual web page.

## Preparation

The instructor should choose a simple, publicly accessible site that uses HTTPS and does not require a login. A good choice is a departmental news or documentation page. Pages showing personal, banking or health information should be avoided. The developer tools for Chrome, Edge, and Firefox may differ, but they all have a Network panel.

Ask students to open the developer tools (usually F12) and then select the Network panel. Check to keep the log if there is such an option and refresh the page. Let's explain: we are not "hacking" anything now; let's look at the messages sent and received by our own browser.

## Script, step by step

1. **Request list.** Many lines are visible after updating. Stylesheets, images, fonts, and JavaScript files are often displayed in addition to the first document request. Question for the group: which could have been the answer, which is the HTML page itself?

2. **Select a document request.** In the Type column, look for `document`. Let's look at the Request URL, Request Method (`GET`), Status Code (usually `200`) and Remote Address. Emphasis: `200` does not mean that "the website is good", only that the server gave a successful HTTP response.

3. **Reading headers.** In the Headers view, separate the request and response headers sections. Look for the ``Accept'' and ``User-Agent'' request headers, then the ``Content-Type'', ``Cache-Control'' and possibly ``Set-Cookie'' response headers. Let's ask: which header is the client's wish, and which is the server's statement about the sent content?

4. **Response body.** On the Response or Preview tab, show the source of the HTML. Let's look for a title line in it, which can also be seen on the screen. This is how the body of the response is connected to the rendered page. Let's also open a request for an image: here the Content-Type is probably `image/...', but the Response is not a human-readable text.

5. **Observation of cache.** Let's update again, then compare the two loads. The Size or Status column can indicate that a resource came from memory/disk cache. Let's look at the `Cache-Control` value of the same file. We do not promise that the exact same thing will happen on every browser: the state of the cache and the server settings will differ.

6. **Redirect.** Open a `http://` address that redirects to HTTPS or a known redirect URL knowingly. Look for the `301`, `302`, `307` or `308` response and the `Location` header. Explanation: the browser starts a new, separate HTTP request after the redirection.

7. **API example.** Let's open a public JSON endpoint in a new tab. In the Network panel, show that it is also an HTTP response, it can only contain `Content-Type: application/json`. Let's compare JSON with HTML: same transfer mechanism, different content and processing purpose.

## Conversation-starting questions

- Why does a seemingly simple page load twenty or a hundred resources?
- What would change if the `Content-Type` value of the response was incorrect?
- Does the appearance of the cookie prove that the site is secure?
- Why is it worth treating the response from the cache separately when judging the server error?

## Frequent jams

If the list is empty, update it after opening the Network panel. If too many lines are confusing, use ``Doc'', ``Fetch/XHR'' or ``Img'' filters. If a header is not visible, the page or browser may show it under a different name, in a different location; we do not evaluate the finding of a specific header, but the recognition of the request-response structure. Do not share the screenshot of the logged in page publicly, because the headers and URLs may also contain sensitive data.

## Short follow-up taskStudents should choose a public page, take a screenshot of a `document` type request and name it in their own note: URL, method, status code, a request header, a response header and the Content-Type of the response. Describe in one sentence what the two selected headers are for.

## Glossary

**Network panel:** browser tool for monitoring network requests. **Request headers:** headers sent by the client. **Response headers:** headers sent by the server. **Response body:** the content of the response. **Redirect:** HTTP response redirecting to a new URL.
