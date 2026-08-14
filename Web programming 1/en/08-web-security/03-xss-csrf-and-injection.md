# XSS, CSRF and injection attacks

All three groups of errors appear where a system assumes too much about something: XSS about the content to be displayed, CSRF about the intent of the request, and injection about the meaning of the input. The common basis of the solution: separate the data from the code or instruction, and check the decisions on the appropriate, reliable page.

## XSS: when content becomes code in the browser

The name cross-site scripting can be misleading for a historical reason: it's not necessarily two different sites. The point is that a website displays some untrusted text in a way that can be interpreted by the visitor's browser as active code or dangerous markings. In this case, the attacker may try to take advantage of the content running in the environment of the trusted website.

Think of a forum post or a product review. The sentence entered by the user is basically data. If the system treats this as plain text, the page reader will see the sentence. However, if the system confuses the text with the structure or runtime behavior of the page, the situation changes. So the most important rule is that user content is data by default, not trusted HTML or program.

The three commonly mentioned forms of XSS are stored, reflected, and DOM-based. With **Stored XSS**, dangerous content can be permanently embedded in a data source, such as a comment or profile field, and later appear on other people's pages. With **Reflected XSS**, data from a request is immediately returned to the response, for example on a search results page. In **DOM-based XSS**, client-side code running in the browser transforms untrusted data in a dangerous way. The categories are useful for understanding the location of the error, but the basic principle of protection is the same for all of them: secure data management and context-appropriate coding.

## How do we protect against XSS?

First, use a template system or interface tool that displays variable data as text by default. Second, the output is always coded according to where it goes: HTML text, attributes, URLs, or as JavaScript data, other rules apply. A safe solution is not a single list of "forbidden characters".

If it is really necessary for the user to write formatted content, for example in a knowledge base article, then a reliable sanitization process with allowed elements and attributes is needed. This is a much safer approach than trying to manually block every imaginable dangerous pattern. The Content Security Policy (CSP) is an additional layer of protection: the server can specify from which source content can be loaded and run. CSP is not a substitute for correct output handling, but it can reduce the consequences of a possible error.

The `HttpOnly` cookie attribute is also valuable: it indicates to the browser that the cookie cannot be read by JavaScript. This does not eliminate the severity of XSS, because foreign code running in the browser can still do a lot of damage, but it can limit an important data access path.

## CSRF: when a valid request does not reflect the user's intent

In the case of CSRF, the problem is not that the system does not recognize the user. On the contrary, in some situations, the browser may automatically attach the login status of the target website to a request. Another site may try to exploit this by making the logged-in user's browser send a status change request to the target page.Consider a fictitious profile page where the user can change their notification settings. If the server assumes only that "the cookie is present, so the request must be the user's intention", then an important check is missing. In the case of a status change operation, it is also necessary to check whether the request really comes from the reliable interface of our own application and whether it is a clear initiative of the user.

The correct boundary is also important here: CORS is not general CSRF protection. CORS limits whether code running from a foreign origin can read the response; it may still be possible to send certain requests. Special, targeted protection against CSRF is required.

## Anti-CSRF layers

One common solution is the **anti-CSRF token**. The server adds a hard-to-guess value to the form or client application that is tied to the user's session or interface. When the status is changed, the server checks its presence and validity. An external page cannot usually get this value and return it properly.

The `SameSite` attribute of the cookie is also important. If set correctly, the browser limits when it sends the cookie in a cross-site situation. This can be an effective base layer, but it must be chosen based on how the application works: for example, with external login processes or other legitimate integrations, it can have an impact on the user journey.

An additional indication can be checking the `Origin' or in some cases the `Referer' header for state change requests. These should be used carefully, as one of several layers. The most important design principle is that actions that cause change cannot be easily triggered by simple, unprotected navigation, and the server also expects evidence related to the intent of the request.

## Injection: when the data is interpreted as an instruction

A common pattern of injection errors is that data from a user or other external source is inserted into a language or query that is interpreted by another system. This can be a database query, a command given to the operating system, a directory search term, or some other interpreted format. The danger does not lie in a specific character, but in the fact that the program mixes the data and the structure of the instruction with text concatenation.

In an online store, the user enters an article number, and the server makes a database query from it. A secure design does not build a long hand-constructed query text from the input. Instead, it uses a parameterized query or a secure API provided by the data manager used: the structure of the instruction is fixed, and the article number is transferred as separate data. That way, the database manager doesn't confuse the two.

Input control is an important addition to this. If, for example, only positive integer identifiers are meaningful in a field, then this must be checked according to type, range and business rules. This improves data quality and reduces the possibility of errors, but does not replace parameterization in itself. The input may later be placed in a different context; the appropriate secure fit should always be used at the point of execution.

## Implemented example: support ticket system

In a support system, the customer opens a ticket, and the administrator can filter, search and respond. Three different sources of danger can appear.

First, the customer description is not reliable content. When the clerk reads it, the system should display it as text or use strictly sanitized, authorized formatting. This is an anti-XSS measure.

Second, the agent can perform a status-changing action, such as closing a ticket. In addition to authentication, the server also applies CSRF protection and verifies authorization on the server side. It is not enough if the interface only shows the "Close" button to the appropriate roles.

Third, the data of the search field can be used in a database operation. The system uses a parameterized query, limits the meaningful size of the search, and does not return unnecessary error messages. This is an anti-injection and reliability aspect at the same time.This one example shows that protection is not a set of independent fixes. Content management, session, authorization, database access, and logging work together to shape system security.

## Common misunderstandings

**"It's enough to screen out some dangerous characters."** Not enough. The same data can end up in multiple contexts, and blacklists are usually incomplete. Structured, context-sensitive output management and parameterization are required.

**"XSS is just a bug."** Nope. Foreign content running in the environment of the trusted origin can mislead, read data or initiate actions on behalf of the user.

**"Signing in makes all requests secure."** Authentication answers who the request relates to; does not necessarily prove that the user initiated it intentionally. This is why CSRF protection is important.

**"The database only stores data, so it cannot be dangerous."** The query language is interpreted by the system. If the program confuses the structure of the query and the external data, incorrect or dangerous behavior can result.

## Review questions

1. Why should the text written by the user be treated as data by default?
2. What is the essential difference between XSS and CSRF?
3. Why is CORS alone not a complete CSRF protection?
4. What does the basic principle of a parameterized query mean?
5. How can output encoding, CSP and the `HttpOnly` cookie complement each other?

## Glossary

- **XSS:** is a web error resulting from dangerous, active interpretation of untrusted content.
- **Output encoding:** safe display of data according to the rules of the given context.
- **CSP:** set of rules given to the browser about permitted content sources.
- **CSRF:** a request that uses the user's logged-in state, but does not reflect their conscious intent.
- **Anti-CSRF token:** verification value bound to the legitimate interface and session.
- **SameSite:** cookie attribute that can limit cross-site submission.
- **Injection:** family of errors resulting from mixing up the structure of data and interpreted instruction.
- **Parameterized query:** database access method that separates the structure of the instruction and the data values.
