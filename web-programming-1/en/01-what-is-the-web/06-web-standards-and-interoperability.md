# Web standards and interoperability

The web can work worldwide on different devices and products from different manufacturers because it is built on common, publicly accessible standards. Interoperability is not a secondary convenience feature, but one of the core values ​​of the web.

Think about what we expect when we send a university link to someone: the address must work on a phone, a laptop, another operating system and preferably another browser. Not because all tools are the same, but because the participants follow common rules. Standards make this tacit promise technically feasible.

### 1. Without common rules, there is no common web

The creator of a website cannot know in advance what computer, phone, operating system or browser the visitor is using. The web can function in such diverse environments if participants follow common rules.

Such a rule is, for example, what an HTML address means, how an HTTP request is structured, or how a URL should be interpreted. The standard does not specify the specific program code, but rather what observable behavior different implementations should provide.

### 2. Standard, specification and implementation

- The **standard** is a jointly accepted system of technical rules.
- The **specification** is a detailed, written description of this.
- An **implementation** is an implementation of a specific browser, server, or development tool that tries to follow the specification.

For example, the HTML standard defines the meaning and processing of an element. Chrome, Firefox, and Safari are different programs, but they should display the same HTML document as well as possible.

### 3. Important standardization communities

| Organization or Community | Main role | Examples |
| --- | --- | --- |
| W3C | Development of web recommendations and guidelines | accessibility guidelines, web technologies |
| WHATWG | Curating multiple living standards for the web platform used by browsers | HTML, DOM, URL Standards |
| IETF | Standardization of Internet Protocols | HTTP, TLS, DNS, IP related standards |

These organizations do not "run the Internet" from a single center. Rather, they provide open collaborative processes in which manufacturers, developers, researchers, and other interested parties can negotiate common solutions.

### 4. Interoperability

Interoperability means that different systems can work together. On the web, this is important on several levels:

- the same page can be used in several browsers;
- a server can communicate with several clients;
- an API can be accessed by applications written in different programming languages;
- the user is not forced into the entire ecosystem of a single manufacturer.

Interoperability is not perfect. There may be differences between browsers, different supported functions and limitations inherited from older systems. The purpose of standards and compatibility tests is precisely to reduce them.

### 5. Open standards and dependencies

The documentation of the open standard is accessible, and the standard can in principle be implemented by several independent actors. This supports competition, freedom of choice and long-term accessibility.

On the other hand, a solution based solely on one manufacturer's own technology can cause vendor lock-in, i.e. service provider dependency. In this case, it is more difficult for the user or the developer to switch to another device, service provider or platform.

## Example: "This page only works in this browser"

If a service can only be used in a single browser, it may be due to a faulty or incomplete implementation, the use of non-standard technology, or a lack of compatibility testing. For a critical service, such as a government agency or university system, this is particularly problematic because it limits access.

## Common misunderstandings| Claim | Clarification |
| --- | --- |
| "The standard prevents innovation." | Building on common foundations makes it easier to create new, widely applicable solutions. |
| "If a feature works in Chrome, it works everywhere." | Browser support and errors may vary. |
| "W3C is an authority that makes binding laws." | W3C develops recommendations and standards; the legal obligation may arise from another source. |

## Instructor questions

1. Why does it benefit the user if a web service works in several browsers?
2. Why can it be risky to build on the technology of a single manufacturer in an institutional system?
3. What standards have you already used today without knowing it?

## Short verification task

Compare the situation between an open web standard and a proprietary file format that can only be used in one application. What are the benefits and risks of the two approaches?

## Glossary

- **Standard:** a set of jointly accepted technical rules.
- **Specification:** a document describing the exact behavior of a technology.
- **Interoperability:** ability of different systems to work together.
- **Open standard:** publicly available standard that can be implemented by several actors.
- **Vendor lock-in:** dependence on a service provider or technology that is difficult to resolve.
