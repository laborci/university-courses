# Threat model on the web

Web security is not a single switch that is "turned on" at the end of development. Thinking through what we protect, from whom, in what way and with what consequences is already part of the planning. We call this frame of mind the threat model.

## Why model threats?

Imagine a university course portal. The student logs in, sees his own results, uploads an application, and the instructor evaluates and writes feedback. At first glance, this seems like a simple application. Still, questions arise: who can see the results? What happens if you try to upload a submission on behalf of someone else? How long is the login valid? How do we handle an uploaded file that isn't what it says it is?

These are not exclusively programming details. The answers determine what data we request, how we build the pages, where we check authorization, what logs we keep, and what experience the user gets in the event of an error. The purpose of the threat model is to reduce uncertainty: it does not claim to anticipate every possible error, but helps to focus time and attention on the essential risks.

## The four basic concepts

A **value** or an asset to be protected is something whose loss, alteration or unauthorized disclosure would cause damage. This can be a password, a session ID, a student result, the availability of the service, or even the reputation of the organization.

A **threat** is an event or actor that can cause harm. For example, a stolen laptop, an incorrectly set authorization, a malicious third party or a faulty automation. A threat alone does not mean that it will succeed in causing harm.

A **vulnerability** is a weak point in a system that a threat can exploit. Examples can be too broad authorization, uncontrolled input, an expired software component, or if the server relies solely on a button hidden by the browser when making an authorization decision.

**Risk** is a combination of how likely an adverse event is and how much damage it would cause. Not all errors are equally urgent. Typing an internal test page and leaking the personal data of thousands of users is an event with completely different consequences. To make a good decision, you need to consider both the probability and the impact.

## What does the CIA trio mean?

Three of the properties to be protected are particularly common. **confidentiality** (confidentiality) means that only an authorized person or system can know the data. For example, in the case of a results list, this means that a student cannot browse other people's marks.

**integrity** (integrity) means that data or processes cannot be modified without authorization and without being noticed. If one could rewrite one's submission deadline or score, the problem would be primarily one of integrity.

**availability** (availability) means that authorized users have access to the service and data at the required time. During exam period, a collapsing study system shows damage to this quality. The three aspects sometimes conflict: a very strict access restriction can improve confidentiality, but if it is poorly designed, it can make the work of the authorized persons more difficult. Planning is therefore also a search for compromises.

## Who participates in the system?

When creating the threat model, we first simply draw the system. What are the components? A browser, a web server, a database, possibly a third-party identity provider, email provider, or analytics tool. Who is the user? What roles are there? What kind of data movement takes place between them?The **confidence limits** are especially important. For example, the connection between the user's browser and our own server, the API connection between our own system and an external payment service provider, or the transition between the public Internet and the internal administration interface can be considered a boundary. When crossing the border, you should not automatically trust the incoming data. The request from the browser is an external input even if the interface was created by us.

## Implemented example: appointment booking page

Let's say you're building an appointment booking website for a doctor's office. The patient requests an appointment, the office staff sees and manages the bookings, and the site sends an e-mail confirmation.

First, we list the values: the patient's name and contact information, the time and reason for the reservation, staff access, system availability, and e-mail sending authorization. Then we draw the path of the data: from the browser to the web application, from there to the database, and finally to an external mail service provider.

Then we will ask questions. Can someone view or rewrite another patient's booking if they know their ID? Could the user send text that we later display dangerously? Who decides whether a staff member is actually authorized to manage all calendars? What happens if the external email service is unavailable? The answers will become protection requirements: the server will check the authorization for each reservation; user data is handled securely before display; give minimal access according to roles; the reservation will not be taken away from the fact that the notification cannot be sent temporarily.

Note that there is no "magic security product" in this process. Protection consists of systemic decisions. Equally important, we do not immediately create a complex solution for every threat. In a small clinic, a simple, transparent authorization model and regular backups are probably more justified than an overloaded, difficult-to-operate infrastructure.

## A usable thought process

Five steps can be enough for a short threat modeling. First, we describe the purpose and scope of the system. Second, let's draw the components and data flows. Third, name the important data and actions. Fourth, let's find the confidence limits, and then ask the question: what can go wrong here? Finally, we rank the risks and write down the answer: prevent, reduce, transfer or consciously accept.

A reminder called STRIDE can also help. Its letters refer to threat groups such as spoofing, unauthorized modification of data (tampering), repudiation, information leakage, denial of service, and extension of privileges. This is not a magic word to be memorized in an exam, but a list that helps us not only think about one type of problem.

## Defense principles

According to the **principle of least privilege**, a user, process or service should only be given as many privileges as are necessary for their task. For example, an image upload service does not need full database administrator access.

**defense in depth** means that we don't rely on a single check. Encrypted connection, authentication, server-side authentication, logging, and secure defaults together are much stronger than either one alone.

According to the **safe default**, we prefer not to grant access in unknown or incorrect situations. "Then the interface hides it" is not a security boundary. In the same way, the **check at the confidence limit** principle says: the server should check the data and authorization, because we do not have full control over the client.

## Common misunderstandings

**"The application is secure with HTTPS."** HTTPS protects data transmission over the connection, but does not solve bad authorization management, bad business logic, or a deceived user.**"They only attack large companies."** Automated attempts do not consider the size of the organization. In addition, many security incidents are not targeted attacks but the result of errors, misconfigurations, or lost devices.

**"Security is the task of the operator."** Security is a joint task: the decisions of the designer, the developer, the operator, the content creator and the user also matter.

**“Everything must be protected with the same strength.”** Good risk management is not about that. High-impact and likely problems should be addressed first with a strong, proportionate response.

## Review questions

1. What is the difference between threat, vulnerability and risk?
2. Name a value related to confidentiality, integrity and availability in a web service.
3. Why is there a trust boundary between the browser and the server?
4. What does the principle of least authority mean on an administration interface?
5. Why HTTPS alone is not enough?

## Glossary

- **Value (asset):** data, function, resource or business interest to be protected.
- **Threat:** event, circumstance or actor capable of causing harm.
- **Vulnerability:** an exploitable weak point in a system.
- **Risk:** the combination of the probability and impact of an adverse event.
- **Confidence boundary:** a transition where the reliability of the data or request changes.
- **Confidentiality, integrity, availability:** the three basic protection goals of the CIA trio.
- **Minimum authority:** grant only the necessary accesses.
- **Deep protection:** application of complementary layers of protection.
