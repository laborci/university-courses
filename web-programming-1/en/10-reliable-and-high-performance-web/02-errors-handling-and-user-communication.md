# Errors, Handling, and User Communication

**Key message:** Errors are normal system states; a quality service handles them safely and tells users what they can do next without exposing internal details.

Differentiate user-correctable validation errors, authentication or permission failures, temporary dependency failures, and unexpected server faults. Preserve useful context in protected logs, return suitable status codes, and give concise user-facing messages with next steps. Do not reveal stack traces, secrets, or account-existence details. For important operations, show whether the action succeeded, is pending, or should be retried; duplicate submissions must be considered.

## Review questions

1. Why should a user message differ from an internal log entry?
2. What information helps a user recover from a temporary failure?

## Glossary

**Graceful error handling:** safe failure with useful recovery guidance.  
**Idempotency:** repeated equivalent operation has no additional unintended effect.
