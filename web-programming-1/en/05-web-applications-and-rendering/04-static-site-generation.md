# Static Site Generation (SSG)

"Static" doesn't mean your website is outdated, static, or uninteresting. It means that the server does not have to rebuild the basic version of the page for every visitor's request: the HTML, style sheets, images and other resources are already prepared in advance. This can be faster, cheaper and more reliable at the same time, but only if the content of the page does not require a personalized decision for each request.

## The idea behind the static page

Let's imagine a department website. It contains an introduction, instructor profile, course description, news and downloadable documents. If someone opens the "Web Programming I" page, the content will most likely be the same for every visitor. There is no need to check who the visitor is before the page appears, and there is no need to reassemble the text from a database. In such cases, it makes sense for the server to simply provide a ready-made HTML file.

This is the idea of ​​a traditional static website. For example, a folder might contain `index.html`, a `objects/webprog1/index.html`, some CSS and JavaScript files, and images. The task of the web server is mostly to find and return the appropriate file based on the URL.

Today's static website generation provides a more convenient workflow. Authors do not necessarily write all pages by hand in HTML. They can write in Markdown format, use templates, components and data structures. The generator processes these before publication and then prepares the static files required by the browser. That is why the method is called static site generation, SSG for short.

## Build time and request time

The key to understanding SSG is separating the time points. **build time** is the moment when the developer or content manager prepares the website for publication. This is when the generator runs, reads the source materials, fills in the templates, optimizes images, creates a search index, and prepares the output files.

**request time**, on the other hand, is when a visitor opens the page. In the case of a statically generated page, the system typically only has to serve the finished result. The template does not run again, and there is no need to perform a database query for the given request.

For example, a post's source could be:

```md
---
title: HTTP basics
date: 2026-09-14
---

HTTP is the web's request-response protocol.
```

During the build, this can be made into a full page with navigation, header and footer content, meta description and referenced style sheets. The visitor will receive this finished page.

This does not mean that nothing on the website can change at runtime. A statically rendered page can also use JavaScript: it can open a menu, remember a setting in `localStorage`, or call an external API. SSG primarily decides how the initial content of the site is created.

## Why is this good for content sites?

For many pages, the content rarely changes compared to the number of visits. Such is a documentation page, course material, blog, conference page, portfolio, product presentation or institutional information. In these, visitors consume the same articles, descriptions and images. SSG takes advantage of this exact situation.Pre-built files are easy to cache. If a page file has the same name for a year, the browser or an intermediate cache can use it later even without a new download. When the content of a CSS or JavaScript file changes, the build tool often gives it a new, content-specific name, such as `app.7f32a.css`. This way, the old file can remain safely in the cache, and the new page already refers to the new name.

Another advantage is predictability. Without complex application code and databases behind every page open, there are fewer moving parts that can go wrong with a simple read request. Of course, the build itself can still fail, and the storage or the network can also be faulty, but the path to serving the page is shorter.

## CDN: ready files are closer to the visitor

A CDN, or content distribution network, consists of many geographically distributed servers. Static files are ideal for CDN distribution because they are identical to many visitors. A Budapest student's request can be answered by a nearby server, while an overseas visitor receives the same page from another instance closer to him.

It's not magic and it's not just a matter of speed. Smaller physical distance usually means lower latency, and many servers can reduce the chance of a single machine being a bottleneck. A popular article or call for proposals can thus serve many parallel readers without all requests going to a central application server.

A simple publishing process looks like this:

1. The author modifies the article or template.
2. The build process creates the new HTML, CSS, JavaScript, and media files.
3. The release uploads or validates them on the host and CDN.
4. The next visitor will receive the new version according to the cache rules.

Importantly, a CDN is not only for static websites; dynamic applications can also place images, stylesheets, and other static resources on it. However, in the case of SSG, a large part of the entire page can also be distributed in this way.

## Update: when will the page change?

The price of static generation is that the modification made in the source is not immediately visible to the visitor. A new build must be created first, and then it must be released. Improving the timetable of a course page or publishing a blog post is therefore tied to the publishing process.

This is perfectly acceptable in many cases. If a daily news summary is ten minutes late, it is often not a problem. If, on the other hand, the price of a flight ticket, inventory, stock exchange rate or personalized academic result is displayed, the pre-generated version can quickly become outdated.

There are several strategies for this. The website can be rebuilt for every content change. A content management system sends a notification to the build in this case. Some systems regenerate only changed pages, others update periodically. It also happens that the frame of the page is static, but the browser loads a smaller, current data later from the API.

With the latter solution, an important question is: what does the user see until the data has arrived? If inventory information or the name of the logged-in user is not displayed until later, the interface should indicate this fairly. "Static plus dynamic detail" is a strong pattern, but it doesn't eliminate the task of state and error handling.

## Compromises and limits

It is a misconception that SSG is always the fastest solution. Completely regenerating a huge catalog of hundreds of thousands of pages can take a long time. A very large image or search index is also expensive to produce. The build time is therefore a resource and a design aspect in itself.

Nor is it true that a static website requires no server-side thinking. There will still be a server-side service behind the contact form, payment, login, permissions and confidential data management. The question is whether all elements of the entire page should depend on it.SSG can be a good choice if the main content is public, the same for many readers, and an update delay of minutes or hours is acceptable. It's a less good choice for an application where each screen is built from login data, instant business processes, or rapidly changing shared state.

## Worked example: a conference page

A conference program, speaker list, and venue description are good SSG candidates. Organizers manage content in files or in an editing interface. At Build, each performer and program block has its own page, as well as the program list divided by days. The files are uploaded to a CDN so that many visitors can quickly open them on the day they are published.

The number of living spaces is another matter. If this needs to be shown to everyone exactly and immediately, it is worth requesting it from a separate API. Sending the application form also requires server-side processing. The conference page can therefore be largely static, while some targeted, dynamic functions complement it.

## Common misconceptions

- **"A static page can only be HTML."** Output can be HTML, CSS, JavaScript, image, font, data file and many other resources. The source material of the generator can be Markdown, a template or a component system.
- **"A static page cannot be interactive."** It can be. Interaction can come from JavaScript running in the browser or from external services.
- **"Cache rules are not needed with a CDN."** The CDN also caches, but the cooperation between the browser, the CDN and the original storage must be consciously set up.
- **“A build is always free.”** A build requires machine time, dependencies, error handling, and release discipline; for large sites, this can be a significant cost.

## Review questions

1. What happens at build time and what happens at the time of a visitor's request?
2. Why is it beneficial for a CDN if most visitors request the same file?
3. Name three types of sites that are good candidates for SSG and give a brief explanation.
4. What problem can arise if a rapidly changing stock information is only updated by the daily build?
5. How can a small dynamic function complement a static page?
6. Why doesn't the word "static" mean that there is no JavaScript on the page?

## Glossary

- **SSG (Static Site Generation):** generation of websites before release, in the form of ready-made files.
- **Build:** processing source material and creating publishable website files.
- **Build time:** the period of production, not the moment of the visitor's request.
- **CDN:** geographically distributed network that can deliver content from a server close to the visitor.
- **Cache:** temporary storage of previously downloaded or generated results for quick use later.
- **Content site:** A site that is primarily intended for reading and provides public information, such as a blog or documentation.
- **Deploy:** making the completed version available to visitors.
