# Authentication and Authorization

## Objectives

Students distinguish authentication (AuthN) from authorization (AuthZ). They understand that discovering who sent a request is insufficient: every protected action must also be checked for permission.

**AuthN answers “who are you?”; AuthZ answers “may you do this?”. A successful sign-in never implies unrestricted access.**

Showing a library card resembles authentication: the library establishes the identity claimed by the visitor. Borrowing a rare manuscript, entering a store room, or editing catalogue data are authorization questions. Confusing these distinct decisions produces serious privacy and security failures.

## Authentication: evidence for identity

Authentication establishes whether the system has sufficient evidence to use a digital identity. Evidence is often grouped as something a person knows (a password, PIN, recovery code), has (an authenticator app, security key, smart card), or is (a biometric). Multi-factor authentication combines factors from different groups. Two screens are not automatically two independent factors: a password and a code delivered to the same compromised email account do not offer the intended independence.

Passwords are secrets, not identities. A service should store a slow, salted password hash rather than reversible passwords. Unique long passwords and a password manager substantially reduce user risk. A system can also request fresh proof for a high-risk action such as changing a bank account number or exporting personal data; this is step-up authentication.

## Authorization: scope of access

Authorization decides whether an authenticated—or occasionally anonymous—request may perform a particular operation on a particular resource. RBAC assigns permissions to roles such as student, instructor, and departmental administrator. It is understandable but may become unwieldy when there are many exceptions. ABAC makes decisions from attributes such as organisation, course assignment, resource ownership, time, and data sensitivity. ACLs list the rights of specific people or groups, which is intuitive for sharing a document but difficult to manage at scale.

Consider `GET /courses/webprog1/students/123/grade`. A session may establish that the requester is instructor `instructor-77`; that is AuthN. The server must still decide whether that instructor teaches this course, may record grades, whether student `123` is enrolled, and whether the action is currently allowed. Hiding an Edit button in the browser is not protection: the server must enforce every decision. Failure to check object-level access can allow an identifier change to expose someone else's data (an IDOR/BOLA-style flaw).

## External identity and least privilege

“Sign in with Google” should not give an application the user's Google password. OAuth 2.0 is chiefly a framework for delegated access to another service's resources; OpenID Connect adds standard identity information. A correctly designed client validates the issuer, audience, expiry, and binding of the result—not merely an email address in a response.

The principle of least privilege grants only the access needed for a current task. Access must also have a lifecycle: people join, change roles, leave courses, and contracts expire. Reviews, timely removal, and protected audit logs are essential.

## Common misconceptions

**“A signed-in user has access.”** Sign-in is AuthN; every protected action needs AuthZ.  
**“A role solves everything.”** Ownership, time, resource, and organisational relationship can matter.  
**“A hidden UI control protects an API.”** The browser is not a trusted security boundary.

## Review questions

1. Give an example that separates AuthN and AuthZ.
2. Why is an instructor role alone not enough to authorise a grade change?
3. What does least privilege mean in a course-management system?
4. How does OpenID Connect differ from the central purpose of OAuth 2.0?

## Glossary

**Authentication (AuthN):** establishing who sent a request.  
**Authorization (AuthZ):** deciding whether the requester may perform an action.  
**MFA:** use of multiple different authentication factors.  
**RBAC / ABAC:** role-based / attribute-based access control.  
**IDOR/BOLA:** an authorisation failure exposing another object's resource by changing an identifier.
