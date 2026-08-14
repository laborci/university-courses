# Semantic HTML

HTML's primary job is not to draw boxes on the screen, but to tell you what those boxes mean. If the structure of the document carries meaning, then the content remains interpretable on multiple devices, for multiple users, and even in the possible absence of CSS.

### What does it mean to be semantic?

The word "semantic" means conveying meaning. An HTML element is semantic if its name or role defined in the standard tells us something about the content it contains. `p` represents a paragraph, `button` is an executable action control, `nav` is a group of navigation links. In contrast, `div` and `span` are generic, neutral container elements: they do not tell you whether they contain a title, menu, article, or warning.

Neutral elements have their place. They can be useful for a layout group, a CSS anchor, or a smaller section managed by JavaScript. The problem begins when an entire page is built exclusively from `divs', and then instead of the names of the elements, we try to guess their meaning only from class names: `div class="top"`, `div class="menu"`, `div class="content"`. This may serve the visual well, but the browser, screen reader and search engine will not get the same clear information.

Let's imagine two news sites. Both have the same title, text and image. In one of its codes, the news is in an `article`, the title is in `h1`, the date is in `time`, and related links are in `nav`. On the other side, everything is the same `div`. As a sighted mouse user, we might not notice any difference. However, a person using a screen reader can quickly navigate by headings and regions on the front page; in the second, you have to listen to many more texts in a row. The structure is therefore a user function, not just a matter of developer taste.

### Main regions of the document

Modern HTML provides many so-called delimiters and region markers. These can be used to describe the site map.

`header` is an introductory domain. This is often where the website name or logo, the title of a page, a search field, or perhaps the main navigation goes. It can not only occur at the top of the document: an ``article`''s own ``header`' section can also contain, for example, the title, author and publication date of the article. The `header' is therefore not simply an "upper bar", but rather the introduction of a content unit.

`nav` is a larger group of links that are primarily used for navigation. The main menu is a typical example, but `nav' can also be the table of contents within the article or the list of important pages at the bottom of the page. Not every link needs to be `nav`. A source link in a paragraph or a single link linked to an article is not necessarily a navigation region. The question is whether the links together form a separable unit for the user's information.

``main'' is the unique, central content of the document. There is usually exactly one of them per page. This is not the header, menu or footer that is repeated on every page, but the reason why the user opened the given URL: the description of an article, a product, a form or a course. This is especially useful for "Skip to main content" links: when using a keyboard or screen reader, you don't have to go through the long menu again every time you open the page.The `article` can be interpreted independently and is a content unit that can be distributed on its own. This is a news article, forum post, blog post, product review or comment. A good thought experiment: if we copied this section into an RSS reader, email, or other site, would it still make sense? If so, it is probably `article`.

The `section` is the thematic part of the document. It is justified if the part has its own subject, usually its own title. For example, an article can have separate `sections' for "Requirements", "Deadlines" and "Frequently Asked Questions". It doesn't automatically replace `div': just because we want to group two elements with CSS, there is no need to use `section'. If there is no content reason for the boundary, a neutral container is a more honest choice.

`aside' indicates content that is related, but does not belong to the main train of thought. This can be a definition box, a list of related articles, an author's introduction, an advertisement or an additional note to a longer text. In addition to omitting `aside' content, the main material must still remain coherent.

The footer contains the closing information of a page, section or article. Copyright information, contact information, data management information and secondary navigation are common in a site-level footer. Tags, author data or sharing links can be placed in the footer of an `article`. The `footer' cannot be interpreted exclusively at the bottom of the screen either: the question here is the role, not the pixel position.

### Title hierarchy: outline of the document

Headings (`h1`–`h6`) are not font size selectors, but represent the hierarchy of content. `h1` is the main heading of the document; it typically expresses the most important topic of the opened page. `h2` is the heading of the main sections, `h3` is the subheading within it, and so on. The headings of a well-structured page are like the table of contents of a well-written note: just by reading the heading list, you can see the thought process.

For example, on a "Web Programming I Requirements" page, `h1` is the title of the page itself. "Performance conditions" and "Recommended literature" can be `h2`. "Homework" is `h3` within the conditions of completion. It would be a bad practice to skip levels (`h1` immediately after ``h4`') or mark all headings as `h2` and then set them to different sizes with CSS.

Headlines are not only important from an SEO point of view. Many screen readers allow the user to navigate the page by jumping to headings only. In the case of a long university policy, it is as if the reader could move through the table of contents with one click. If the "headings" are actually bold paragraphs, this navigation option disappears.

### Semantics, screen readers and SEO

The screen reader conveys the programmed structure of the document by speech or on a Braille display. The user can list links, form fields, buttons, and headings, or jump to the main content with hotkeys. Native HTML elements already carry such information: `button` appears as a button, `a` as a link, `nav` as a navigation region in the accessibility tree. If everything is mocked with a `div', this meaning would have to be rebuilt separately, often incompletely, with ARIA attributes and keyboard behavior.

ARIA is a useful add-on toolkit, but not the first choice. Instead of a real button, for example, the `<div role="button">Save</div>` solution approximates the operation of the `button` only if we take care of focus, Enter and Space keys, disabled state and many other details separately. `<button>Save</button>` provides these by default with the support of the browser. A good rule of thumb is to first select an appropriate HTML element; Add ARIA only if native semantics really aren't enough.Search engines also try to deduce from the structure what the subject of the page is and which parts are important. The exact title, logical headings, separation of the content of the article, and descriptive reference text can help the interpretation. This does not guarantee a good ranking: SEO depends on many other factors, such as the quality of the content, technical availability and credibility of the website. However, semantic HTML is a foundation upon which both searchability and accessibility can be built.

## Worked example: structure of a course news

Let's say that a news item appears on the department's website: applications for a professional workshop are open. The following structure is not a visual design, but captures the meaning of the content:

```html
<header>
  <a href="/">Department of Informatics</a>
  <nav aria-label="Main navigation">
    <a href="/courses">Courses</a>
    <a href="/news">News</a>
  </nav>
</header>

<main>
  <article>
    <header>
      <h1>Registration for the web accessibility workshop</h1>
      <p>Published: <time datetime="2026-09-15">2026. September 15</time></p>
    </header>

    <section>
      <h2>Who is the workshop for?</h2>
      <p>The program is open to all IT students.</p>
    </section>

    <section>
      <h2>Application</h2>
      <p>The number of places is limited, so you should apply in time.</p>
    </section>

    <aside>
      <h2>Related material</h2>
      <p><a href="/barrier accessibility">Barrier accessibility basics</a></p>
    </aside>

    <footer>
      <p>Author: Web Working Group</p>
    </footer>
  </article>
</main>

<footer>
  <a href="/data management">Data management information</a>
</footer>
```

The page has a site-level header, with navigation within it. `main` indicates the beginning of the unique content. The news itself is an independent unit, therefore `article`. The two topics within the article are `sections' because they are content sections with their own titles. The related material is useful, but can be omitted without harming the meaning of the news, hence `aside`. Finally, a separate footer closes the article and the entire page.

It is worth noting that two `headers' and two `footers' can appear on the same page. This is not a mistake: they belong to different content units. And the `aria-label` appears on the `nav` so that if the page later has more navigation regions, the screen reader can clearly name this as the main menu.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "`div' is a bad element." | Not bad, just generic. We use it when there is no more precise semantic element. |
| "`section' can be used instead of all boxes." | It is only justified for a real, thematically separate section, mostly with a title. |
| "The `header' can only be at the very top of the page." | An `article` or `section` can also have its own introduction `header`. |
| "Heading size is set by `h1`-`h6`." | Level indicates meaning; the size must be adjusted with CSS. |
| "ARIA makes every `div' more semantic." | It is often better and more reliable to use a proper native HTML element. |
| "Semantic HTML alone guarantees good SEO." | It helps with interpretation, but is not a substitute for quality content and technical basics. |

## Review questions

1. What criteria can be used to decide whether a piece of content is ``article'' or rather ``section''?
2. Why is it not advisable to choose `h3` for the title of a main chapter just because of the font size?
3. Which three elements would you use to mark the main navigation, unique content, and global footer of a page?
4. Why is a `button` generally preferable to a `div role="button"`?
5. How does semantic structure help a student using a screen reader on a long course page?

## Glossary- **Semantic HTML:** a markup that describes the meaning and role of an element in addition to or instead of its appearance.
- **Region (landmark):** a clearly identifiable functional area of ​​the document, such as navigation or main content.
- **`main`:** the unique, central content of the page.
- **`article`:** a content unit that can be interpreted independently, for example an article or comment.
- **`section`:** a thematically related document section, typically with a title.
- **`aside`:** supplementary material related to the main content, but separate from it.
- **Title hierarchy:** the logical chapter structure marked with `h1`–`h6` elements.
- **Screen reader:** assistive technology that conveys the structure of the digital interface by speech or on a Braille display.
- **ARIA:** a system of accessibility roles and properties that complements HTML semantics when needed.
