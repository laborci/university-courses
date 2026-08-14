# Shared responsibility of OWASP and security

## Goals

By the end of the topic, the student should understand that web security is not a single setting, not a separate "security phase", and not exclusively the responsibility of the developer. Be able to place the role of OWASP in the world of web systems, be able to differentiate between vulnerability, threat, attack, risk and defensive measure. Know the OWASP Top 10 approach enough to ask meaningful questions about a web service: what needs to be protected, what errors can lead to data loss or unauthorized access, and what can be done to mitigate risk.

Security is not a product that you "put on" an application at the end of development. Continuous risk management: the organization must assess what could be valuable to an attacker, what could go wrong, what the consequences would be, and where it is worthwhile to develop proportionate protection. The developer, the operator, the management and the user also participate in this work.

## What is OWASP and why should you care about it?

OWASP stands for *Open Worldwide Application Security Project*. It is not an authority, not a certification organization and not a manufacturer of a single software product, but an open community that collects, organizes and makes freely available practical knowledge of software and web application security in particular. It provides guidelines, tools, training materials, and a common language for developers, testers, operators, and decision makers to talk about the same problems.

A web system can contain many types of value: user data, passwords, health or financial information, business documents, order data, and even the ability for someone to use a service. A bug is not only serious if it "hacks the server". Even if an unauthorized person sees other people's orders, if the site invoices the wrong amount, or if the service becomes unavailable at an important submission deadline, it can be a significant loss.

OWASP is useful because it does not claim that all systems should be protected in the same way. Rather, it draws attention to recurring thinking errors. The question is not simply "do we have a firewall?", but also whether the system really checks the authorizations for each request; does it handle incoming data in the expected form; whether we would notice if something unusual were happening; and whether we have a plan to fix it.

## The language of risk: what do the basic concepts mean?

Concepts are often blurred in security discussions. This can lead to misunderstandings, so it makes sense to separate them.

An asset can be anything whose loss, modification or disclosure would cause damage. In a university system, this is the case with the student database, the exam results, the entry service and the reputation of the system.

A **threat** is a circumstance or actor that can cause harm. It could be a malicious attacker, a phishing message, a malfunctioning external service, accidental human error or even a power outage. A threat does not mean that harm is certain to occur.

A **vulnerability** is a weakness in the system: for example, a missing authorization check, a too-simple signal rule, an outdated dependency, a misconfiguration, or an error message that reveals too much detail. Vulnerabilities can be technical, process or human.

An **attack** occurs when someone or something exploits a vulnerability. It doesn't always require special expertise: many problems are caused by automated attempts, stolen passwords or exploiting publicly known bugs.

**Risk** is a combination of how likely an adverse event is and what its impact would be. A temporary outage of a public presentation site may be unpleasant, but a data leak of a healthcare appointment booking system is much more serious. Security work is therefore not about ticking off an endless list: the biggest and most likely damages must be reduced first.

## Risk management: zero risk is not the goalA completely risk-free system practically does not exist. All protection has a cost: it requires development time, operational attention, and sometimes comfort or performance. The good decision is not to do anything for security, but to ensure that the protection is proportionate to the value to be protected and the expected consequences.

A simple risk management cycle can be described as follows:

1. We identify what we protect and who uses the system.
2. We assume what can go wrong: unauthorized access, data loss, faulty transaction, service outage or misled user.
3. We examine where there are weaknesses in design, code, configuration and operational processes.
4. We prioritize risks based on probability and impact.
5. We introduce protective measures and then check whether they really work.
6. We monitor changes: a new function, a new external service provider or a new attack method can bring a new risk.

For example, a library web application might have a login, a loan history, and an email address. It may be a reasonable decision to require multi-factor authentication from administrators, while a strong password and secure password reset are sufficient for readers. Not because the readers' data is not important, but because the potential impact of obtaining an administrator account is greater.

## The OWASP Top 10 is an approach, not an exam list

The OWASP Top 10 summarizes the most important recurring risk categories for web applications. The specific editions change over time, so it is not worth treating them as eternal and unchanging ten commandments. The point is the pattern: what types of errors occur again and again, and what questions can be used to identify them already during planning.

One central category is **faulty access control**. In such cases, the system logs in the user, but does not check consistently enough whether he has the right to the given operation or data. It is not enough to hide an administration button in the menu: the server must decide for each request whether the given user can do what he requests.

An important area is **defective cryptographic protection**. These include when sensitive data is transmitted or stored unprotected, passwords are handled improperly, or an otherwise strong encryption solution is misused. HTTPS alone does not solve everything, but it is a basic condition: without it, the communication between the client and the server can be more easily monitored or modified.

The essence of **injection errors** is that the system treats data from the user as a command or instruction. The idea of ​​defense is simple: let the data remain data. The system should not generate a database query, command or interpretable code with uncontrolled concatenation.

The problem of **obsolete or vulnerable components** is particularly common because modern web applications are built from many external libraries, frameworks, and services. Installing a package is not a one-time decision: you need to keep track of what you build, monitor fixes, and plan for updates.

The approach of OWASP also draws attention to **incorrect design**. Not every error is a bad line of code. If a business process in the first place allows anyone to approve a high-value transaction for themselves, a later input check will not solve it. Security must be designed with the system's goals, roles, and business rules in mind.

A recurring theme is **identification and authentication failure**, **lack of security logging and monitoring**, and **misconfiguration**. Together, these can be dangerous: someone can try to take over a poorly protected account, and if the system doesn't limit repeated attempts, doesn't log well, or doesn't notify the operators, the problem can remain hidden for a long time.

## Protection in several layersGood web security is not the only obstacle. If one defense fails, another can still mitigate the damage. This is often called multi-layered protection. In a login system, for example, a secure connection, proper password management, management of failed attempts, session protection, authorization control, logging and user information all count together.

This does not mean that every system should be burdened with an infinite number of obstacles. A balance must be found. An overly complicated interface may encourage the user to cheat the rules, for example by storing their password in an insecure location. The goal is protection that matches the risk and is sustainable in real-world use.

## Whose responsibility is it?

### Responsibility of the developer and designer

The developer doesn't just implement functions. Your decisions affect what data the application requests, how it validates it, how it handles errors, and what defaults it provides. Secure development includes checking inputs, validating permissions on the server side, keeping secrets out of the code, knowing the components used, and security testing.

The designer has to ask already when formulating the function. Who can use it? What data is really needed? What happens if someone makes a mistake or uses it maliciously? How can the user be clearly informed? The best security patch is often the one that isn't needed later because the risky feature was designed differently in the first place.

### Responsibility of the operator

Even a carefully written application can be compromised in the wrong environment. Operations include managing updates, controlling access, protecting secret keys and configurations, creating backups and verifying their restoreability, monitoring logs, and maintaining an incident management plan.

It is especially important that the production system is not accidentally in development mode, that unnecessary services are not left open, and that changes can be tracked. Here, security is not a one-time installation task, but a daily operating discipline.

### Responsibility of the organization and management

Security costs money, time and expertise. If the organization only values ​​the delivery of new features, but doesn't have the time or responsibility for security fixes, then technical teams have little chance of consistently achieving good results. Management must determine the acceptable level of risk, provide resources, define responsibilities and support honest reporting of errors.

It's also a cultural issue. A team needs to be able to report a mistake without immediately looking for a scapegoat. In this way, problems surface more quickly and are less likely to develop into a defect causing a serious incident.

### Responsibility of the user

The user is not a security expert, so system errors cannot be transferred to him. However, it does have a role: you can use a unique, strong password, turn on multi-factor authentication, watch for suspicious messages, and notify you when you see unusual activity. The service's job is to make this simple and understandable, not to penalize the user for mistakes.

## Analysis example: an "internal use only" admin interface

Imagine the internal registration system of a small organization. The admin interface was initially designed for only a few colleagues, so the team believes that serious protection is not necessary. Over time, the system becomes accessible via the Internet, several administrators gain access, and sensitive personal data is included.

What questions should be asked? Who are administrators and do they need the same level of rights? Will access be revoked if someone leaves the organization? Do they log who exported data? How is password reset? Is there multi-factor login? What happens when the system reports an error: does it leak technical details? Is there a tested backup?The lesson in this example is not a single "big hack". Risk is the sum of small decisions: too broad permissions, missed review, uncertain logging, and the false assumption that the internal system is automatically secure.

## Common misconceptions

**"HTTPS means the site is secure."** HTTPS primarily helps to protect communications. An HTTPS page can also request too much data, contain incorrect authorization management, or deceive the user.

**"Security is the business of the security expert."** Expert knowledge is required, but most vulnerabilities arise or can be prevented in everyday planning, development and operational decisions.

**"Our system is too small to be a target."** Automated attempts don't pick between big names and small services. Moreover, a system can be interesting not only as a direct target: user accounts, resources or login data leading to other systems can also be valuable.

**"If we don't have a privacy incident, then everything is fine."** Maybe the bug hasn't surfaced yet, or the system wouldn't be able to tell you what happened. Good logging and regular review is not a sign of distrust, but part of responsible operation.

## Review questions

1. What is the difference between threat, vulnerability and risk?
2. Why is zero risk not a realistic goal, and what is the goal of risk management instead?
3. Why is the OWASP Top 10 an approach and not just a list to learn?
4. Give an example of faulty access control without writing a technical implementation.
5. Why can an application be vulnerable even if its own source code is carefully prepared?
6. Name two operational tasks that directly contribute to web security.
7. Why is it not fair to put all the responsibility on the user?
8. What questions would you ask when designing a new administration function?

## Glossary

**OWASP:** An open international community that publishes application security knowledge, guides, and tools.

**Asset to be protected:** A data, system, service or capability whose loss, modification or disclosure could cause damage.

**Threat:** A potentially harmful actor or event.

**Vulnerability:** A weakness in a system that can be exploited by a threat.

**Risk:** The combination of the chance of an adverse event occurring and its expected impact.

**Access Control:** Deciding and enforcing who is authorized to access which resources and operations.

**Multi-layer protection:** Application of complementary protection measures so that a single failure does not cause a complete protection failure.

**Logging:** Recording of important events in the system for debugging, verification and incident management.
