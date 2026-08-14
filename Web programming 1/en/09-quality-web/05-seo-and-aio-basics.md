# Basics of SEO and AIO

## Goals

By the end of the chapter, the student understands that search engine optimization is not a "collection of tricks", but rather the creation of accessible and understandable content for both search engines and people. You can distinguish between crawling, indexing and ranking and understand the role of semantic structure, metadata and structured data. You will also get an idea of ​​how clear, sourceable content can help AI-based search and assistant systems.

SEO and AIO are not a promise that a page will rank first in any search results list or appear in an AI response. The goal is for the content to be technically accessible, structurally clear, professionally reliable and useful for people. This quality is a value in itself, and searchability can be one of its consequences.

## How does a page get to the search result?

When someone searches for "how does DNA work," the searcher must first know that there is a page that answers that question. The first step in the process is **crawling**: automated programs – often called bots or crawlers – follow links or visit known addresses to discover content. Links from other pages lead to a well-accessible page, and the server allows the robot to retrieve the public document.

The next step is **indexing**. The system processes the text, structure, language, links and other signs of the page and can then add it to a searchable database. Indexing is not the same as ranking. Just because a page might be indexed, doesn't mean it will appear high for any search, or at all. **ranking** is the subsequent decision when the search engine tries to select relevant and useful results for a given query.

Separating these three concepts prevents misunderstanding. If the search engine cannot retrieve the page, the content cannot be crawled. If you can't understand it or don't think it's acceptable, it won't be indexed. If, on the other hand, it can be indexed, but there are better, more reliable or closer results for the question, it will not necessarily be ranked high. The search engine's exact ranking rules are not public and may change over time; no one can honestly guarantee first place.

## Searchability: what we want to find should be available

Crawlability is based on the server responding normally to the public page. Of course, an internal course material hidden behind a password or a client interface accessible only by logging in cannot be handled in the same way as a public article. The goal is always the intended visibility: not all pages need to be searchable.

Internal links help both the visitor and the crawler to understand which pages are related to each other. If there's only one hard-to-reach path to an important page created late by JavaScript, that's a risk. Traditional, meaningful links - with talkative anchor text - strengthen navigation. Instead of "click here", "Detailed explanation of HTTP status codes" is both more useful and informative.

The `robots.txt` and robots meta directives can control some crawling or indexing behavior, but they are not security tools. A secret document should not be expected to be hidden from this alone; it needs proper access control. A sitemap can help a search engine with a list of important public URLs, especially for pages with high or low internal links. However, it is not a substitute for good navigation and useful content.

## Semantic content: it should be clear to people first

Semantic HTML means that the markup doesn't just tell you "how something should look", but also "what it is". The real heading is `h1`, the paragraph is `p`, the navigation is `nav`, the main content is `main`, the article is `article`, and the list is `ul`, `ol` or `dl`. This also helps people using screen readers, maintainers and machine processing.A good article usually has a clear title, a logical subheading hierarchy, a short introduction, and an actual answer to the question. The fact that a keyword appears thirty times does not make it good. If someone asks, "What's the difference between cookie and localStorage?", the helpful page first gives a brief answer, then clarifies the properties, gives an example, and indicates the limitations. Repeated, unnatural keywords make the reading experience worse than better.

The address hierarchy is not a visual scaling tool. It is not a good practice to choose a smaller `h3` just because its font size is more attractive. CSS is about appearance; the task of headings is to divide the document into meaning. A well-structured document can be reviewed more easily by the student, the screen reader and the automated system.

## Metadata: short indications about the document

The metadata placed in the `head` part of the HTML document is not instead of the body text displayed for the visitor, but rather complements it. The `title` element can appear as a short, precise title in a browser tab, bookmark, and search environment. A good title differentiates the page from other pages on the site: "Web Programming" is less verbose than "HTTP Status Codes - Web Programming I".

The meta description (`meta name="description"`) can be a concise summary. Search engines may use this, but are not required to display exactly this; sometimes another part of the page is found more relevant to the user's question. For this reason, the description should not be treated as a promise or a pile of hidden keywords. Be human and tell the reader what to expect.

The canonical title (`link rel="canonical"`) can help when the same or very similar content is available on several URLs, for example due to filtering parameters. Signaling suggests a preferred version, but is not a substitute for thoughtful URL and content management. For language versions, appropriate language markings can help clarify which page is intended for which audience.

## Structured data: facts in a machine-interpretable form

**Structured data** is a standardized notation with which certain facts of a page can be more explicitly described to machines. For example, an event page can indicate the name, time, location and organizer of the event; a recipe with preparation time and ingredients; a course page with the subject name and instructor. In many cases, the JSON-LD format is used for this, which describes the information as separate data in addition to the document.

Structured data does not entitle you to an automatic special search appearance. It is useful and responsible if the nominated information is actually available on the site for the user, accurate and up-to-date. It is not correct to write fictitious reviews, non-existent inventory or misleading price only in the machine markup. The principle is the same here: the information given to the machine must match the information given to the person.

## AIO: content in the age of AI assistants and response engines

**AIO** here is not the name of a single official, unified standard, but rather an effort to make the content easily understandable and referable to AI-based search engines, assistants or answer engines. These systems may operate differently and their access, selection or referral rules may vary. Therefore, it would be wrong to promise that with certain formatting we will definitely get into an answer given by AI.

The principles are surprisingly close to those of good documentation. A page should clearly answer what it claims; use descriptive titles; separate facts, examples and opinions; indicate the author, date and, when relevant, the original source. The important statement should be found in the actual page text, not just in an image written for illustration. The table can be useful for comparison, but it should also have an understandable header and introduction.For example, a university subject page can be interpreted well if it clearly contains the subject's name, purpose, prerequisites, dates, the date of the current semester and the official contact method. It is harder for an AI system and a student to process a page where everything is just a scanned, low-quality PDF image or an outdated social media post.

AIO does not mean writing text for a machine. Natural, accurate, well-structured professional content is the right goal. Artificially produced, shallow and unsourced text may look like many pages in the short term, but it does not build trust and is difficult to verify. Author responsibility, temporality and transparency of references are particularly important in health, financial, legal or educational matters.

## Example: improving a university lab page

Let's say that the title of the page describing the time and application for a lab is "Information", and the actual time is shown on a poster uploaded as an image. There is no clear title, the application deadline can be read in two separate paragraphs with different dates. For a searcher, a student using a screen reader, and an AI assistant alike, it is uncertain what information is authentic.

The title of the corrected page could be "Web programming I lab - application and dates, autumn 2026". The body includes a short summary, well-labeled sections, dates written as real text, a spoken application link, and the date of the update. If justified, you can also add structured event data. This does not guarantee search engine ranking or AI links, but the content can be used more reliably for everyone involved.

## Common misconceptions

- **"Repetition of SEO keywords as many times as possible."** Excessive repetition is not a substitute for a relevant, understandable answer.
- **"Indexing guarantees first place."** Getting indexed and ranking are different steps.
- **"The meta description is always displayed exactly."** The search engine can decide to show a different text fragment.
- **"Structured data will definitely give you a prominent result."** It can help with interpretation, but it does not promise a form of appearance or a ranking.
- **"AI text must be produced for AIO."** The goal is accurate, verifiable content that is also useful for humans.

## Review questions

1. What is the difference between crawling, indexing and ranking?
2. Why does spoken anchor text help the user and machine interpretation?
3. What is the role of semantic HTML in searchability?
4. What is `title` for and what is meta description for?
5. When is it ethical and useful to use structured data?
6. Why can't it be guaranteed that an AI assistant will use a given page?

## Glossary

- **Crawling:** automatic discovery and retrieval of web pages.
- **Indexing:** inclusion of the processed content in a searchable system.
- **Ranking:** determining the order of results for a given question.
- **Semantic HTML:** HTML structure expressing the meaning of the content.
- **Metadata:** the information describing the document, typically found in the `head` section.
- **Structured data:** a machine-interpretable set of facts given in a standard form.
- **AIO:** the practice of creating content that can be easily understood by AI-based search engines and assistants.
