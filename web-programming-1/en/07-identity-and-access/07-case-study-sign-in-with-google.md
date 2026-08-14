# Case Study: “Sign in with Google”

## Objectives

Students apply the concepts of identity, delegated access, token validation, and local authorization to a familiar sign-in button.

**A convenient button hides a chain of trust decisions. The secure outcome depends on correct protocol validation and restrained local data handling.**

Suppose a course-planning service offers “Sign in with Google”. The service first sends the browser to Google with its registered client identity, exact callback address, and limited requested scopes. The user authenticates directly with Google. The service should never see the Google password.

When Google redirects back, the service must verify that the response belongs to the login transaction it started. It exchanges a valid short-lived code through the proper channel and validates the returned OIDC identity information: signature, issuer, audience, expiry, nonce where applicable, and stable subject identifier. Only then should it locate or create a local account and establish a local session.

The service should request the minimum data needed—for example a stable identifier and, only when justified, basic profile data. It should explain the purpose, avoid copying unrelated data into its own database, and give users a clear account-linking and deletion path. A Google-authenticated person may still require approval, enrolment, or a role before accessing a particular course feature.

## Questions for analysis

1. Which service authenticates the user, and which service authorizes access to course-planning data?
2. Which values must the application validate before trusting the result?
3. Why should the application rely on a stable subject rather than only an email address?
4. What minimum scope would meet the stated purpose?

## Glossary

**Account linking:** associating an external identity with a local application account.  
**Stable subject identifier:** identifier intended to remain stable for an account at an identity provider.  
**Consent:** the user-facing grant of a requested, bounded access scope.
