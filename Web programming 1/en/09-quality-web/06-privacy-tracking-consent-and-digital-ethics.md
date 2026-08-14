# Privacy, tracking, cookie consent and digital ethics

## Goals

By the end of the material, the student will be able to distinguish between the techniques necessary for the operation of the website and the techniques that follow the user; you understand that a cookie is only a possible identifier; notices what decisions a contributing interface actually asks for; and is able to speak meaningfully about the data protection and ethical consequences of a web idea. The goal is not legal training and not judging the suitability of a particular service provider. The GDPR is a general reference framework here: a legal expert interpretation is required for a specific product or organization.

Web data management does not start when a page asks for a spectacular data sheet. Even one load can leave technical traces: the server sees the data required for the request, the browser can store settings, and external measurement codes can signal other actors. A good web system uses data purposefully, transparently and to the minimum extent necessary. Legality is important, but it is no substitute for fair design.

## What does data mean on the web?

Data can be a name, email address or date of birth, but seemingly insignificant details can also be linked to a person or device. This can be a login ID, a permanent advertising ID, an IP address, exact location data, purchase history or which articles someone has read. A single piece of data alone is sometimes not enough, but several pieces of data together can form a detailed profile.

It is worth asking from three points of view. **What data** is generated? **Who** gets it: only the operator, or also analytics, advertising, embedded video and social service providers? **For what purpose and for how long** is it kept? If there is no clear answer to these, the user cannot make a meaningful decision.

On an appointment booking page, for example, an email address may be reasonably necessary for notification. The language of the browser can help display the interface. However, building an interest profile is a different goal: it does not automatically follow from the reservation. Changing the goal is a particularly important planning moment.

## Cookies: small files, big role

HTTP is basically stateless: from two consecutive requests, the server cannot be sure whether they came from the same browser. A cookie is a name-value pair that the server can send in the response, and the browser returns for the corresponding subsequent requests. This way, for example, the logged-in session, the contents of the basket or the chosen language can be preserved.

The attributes of a cookie determine the behavior. `Secure` indicates that it can only be sent over an encrypted connection; `HttpOnly` reduces the chance of it being read by browser-side JavaScript; `SameSite` restricts sending for requests originating from other sites. A session cookie created without expiration typically lasts until the end of browsing, a persistent cookie can remain on subsequent visits. These are security and operational features, not automatic privacy waivers.

Not all cookies are tracking, and not all tracking is a cookie. A first-party login cookie is often required for the functionality requested by the user. At the same time, identification can be done with a value stored in `localStorage`, a URL parameter, login, server-side logs or by connecting several browser features. An example of the latter is a device or browser fingerprint: a combination of screen size, language, fonts, graphics capabilities, and other cues can make the returning device likely. This is often less visible than a cookie.

## First and third parties; measurement and profiling

The **first party** is the website that the user visited. **Third party** can be an analytical script, advertising network, map, font, chat module or social embedding loaded into the page. These may appear as separate requests in the browser's network view. A convenient embedding is therefore also a data flow decision.There is a big difference between the aggregated, short-term stored visit statistics and the long-term behavioral profile between individuals. For product development, it can be useful to find out at which step of a form many people get stuck. This does not necessarily require linking every click to a name or recognizing the same person on other sites. Appropriate measurement is often possible with less data.

## Contribution: real choice, not decoration

The cookie bar appears on many pages. In the best case, this is not just an obstacle, but a short and understandable decision point: what is necessary for operation, what is optional, what purposes the data should be used for, and how the choice can be modified later. The interface must not unreasonably hide or complicate the refusal. In addition to the big, colorful "I accept all" button, a small, multi-step rejection can be a bad user experience and an ethically problematic design pattern.

In practice, the consent should be broken down according to purposes, for example necessary, settings, measurement and personalized advertising. The name of the required category is not a magic word: only the technology without which the specifically requested service cannot function reasonably can be included here. The choice must be made available later in the same way as the acceptance. A comprehensible data management information sheet does not replace the banner, but its detailed background.

## GDPR as an approach

European data protection regulations, including the GDPR, emphasize the rights of data subjects and the responsibilities of data controllers. From an educational point of view, principles that are particularly useful are purposefulness, data economy, transparency, accuracy, limitation of retention time, and adequate security. These are not just documentation tasks. Design questions: do you really need the phone number? Why do we keep the event log? Who can access it? How do we inform people?

A person may generally have rights related to information, access, rectification, erasure, objection or portability. Exactly how these are applied in a specific case depends on the purpose and circumstances of the data management. Therefore, it is not correct to make a ready legal judgment about whether a real site is "GDPR-compliant" in the context of a subject. Rather, the developer's responsibility is to recognize the data flow in time, ask questions, and not treat protection as an afterthought.

## Digital ethics: what the rule does not yet settle

You might think something is technically allowed, but it's still unfair. Dark patterns are good examples of this: pre-ticked options, misleading wording, an embarrassing reject button, or a process that tricks the user into handing over more data. Algorithmic personalization is a similar issue: if a system knows vulnerable moments and exploits them to try to squeeze more time or money, "increases conversion" is not a sufficient reason.

The designer of the ethical system doesn't just ask if we can get the data. Also, whether the user understands the consequence, whether the benefit is proportional to the intervention, and who bears the risk in case of error or misuse. Data minimization is often also a security advantage: what is not collected cannot be leaked in the same way.

## Implemented example: newsletter and visit measurement

Imagine a university event site. It asks for an e-mail address for the newsletter, measures attendance on the event page, and displays an embedded video. The first step is to map the data stream. The e-mail is sent to the administrator of the subscription; the meter code sends events; the loading of the video may be connected to an external service provider. The second step is the separation of goals: managing the newsletter, operating the service and optional analysis are not the same.

The designer can then reduce the exposure. The video should only be loaded after clicking, so the service provider does not receive a request immediately. The measurement can be made with less detailed data stored for a shorter period of time. When signing up, it should be clear what emails to expect and how to unsubscribe. The consenting interface should be operable with a keyboard, and the rejection should be clear. The result is not "zero data", but considered data management.## Common misconceptions

**"All cookies are prohibited as long as there is no click."** The name or technical form of the cookie alone does not decide the question. There are storages related to the operation of the requested function; the exact assessment depends on the circumstances.

**"Incognito mode is completely anonymous."** Incognito mainly treats local browsing traces differently. Network providers and visited pages can still see data.

**"If we don't ask for a name, there's no personal data."** A persistent identifier or multiple tokens together can still be linked to a person or device.

**"The data protection information sheet solves the ethical problem."** A long, incomprehensible information sheet does not make a manipulative or disproportionate practice fair.

## Review questions

1. Why is there a need for some kind of state management in addition to HTTP?
2. What is the difference between the purpose of the required session cookie and the cross-site identifier?
3. Why can embedding an external font or video be a privacy issue?
4. Give two examples of how tracking can be implemented without cookies.
5. What makes a contributing interface a real decision-making situation?
6. How does data minimization help fairness and security at the same time?
7. Why does this material not provide a legal qualification of a specific website?

## Glossary

**Data minimization:** managing only the data necessary for the purpose.  
**Cookie:** small data stored by the browser that can be linked to requests.  
**First party / third party:** the operator of the visited page or the embedded external service provider.  
**Contribution:** the user's informed, voluntary decision about a specific goal.  
**Tracing:** Repeated recognition and association of a behavior or device.  
**Dark pattern:** a deceptive or disproportionate surface solution that affects the decision.  
**Fingerprint:** an identification mark formed from several browser and device characteristics.
