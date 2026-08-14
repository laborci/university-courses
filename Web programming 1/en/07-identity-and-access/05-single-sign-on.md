# Single Sign-On

## Objectives

Students understand how single sign-on (SSO) differs from universal authorization, why it can improve usability and security, and what new dependencies it introduces.

**SSO centralises authentication, not every access decision. Each application remains responsible for deciding what an authenticated person may do.**

Without SSO, a student may need separate passwords for mail, learning management, library, and administration systems. SSO allows these relying applications to trust a common identity provider. After a user authenticates once, later applications can obtain an authenticated result without asking for the password again. This reduces password reuse and makes account lifecycle management more coherent.

The benefit is not automatic security. The identity provider becomes especially important: an outage can affect many services, and compromise can have broad consequences. Strong MFA, careful recovery procedures, monitoring, short-lived assertions or tokens, and clear emergency access arrangements matter. SSO also needs a distinction between signing out of one application and ending the central identity-provider session.

Applications should map a stable subject identifier, not merely a mutable display name or email address, to a local account. They must retain their own authorization logic. A user who can authenticate through the university identity system is not automatically allowed to edit every course, record, or administrative process.

## Walkthrough

A student opens the library portal and is redirected to the university identity provider. After a successful login, the portal validates the result and creates its own session. When the student later opens the learning platform, it can consult the same provider and avoid another password prompt. The two applications still hold different permissions and data.

## Common misconceptions

**“SSO gives every user the same access everywhere.”** It shares authentication; authorisation remains local.  
**“One password means one session.”** A local application session and a central provider session are different things.  
**“SSO removes account administration.”** It changes and often simplifies account lifecycle work, but does not remove it.

## Review questions

1. Which user problem does SSO address?
2. Why is an identity provider a high-value component?
3. Why must a relying application still perform authorization?
4. What is the difference between local and central logout?

## Glossary

**Single sign-on (SSO):** authentication through a common identity provider across multiple applications.  
**Identity provider (IdP):** the trusted service that authenticates a user.  
**Relying party:** an application that relies on the identity provider's assertion.
