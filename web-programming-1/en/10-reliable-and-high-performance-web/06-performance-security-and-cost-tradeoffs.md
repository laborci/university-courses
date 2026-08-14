# Performance, Security, and Cost Trade-offs

**Key message:** Web architecture is a series of context-dependent trade-offs; faster, cheaper, and more secure are not automatically aligned.**

Extra checks, encryption, redundancy, logging, and geographic distribution can add cost or latency while reducing risk. Aggressive caching can improve speed but harm freshness or privacy. Removing safeguards to improve a benchmark is not quality. State the user task, risk, expected load, budget, and legal obligations; then choose and document a proportionate compromise. Revisit decisions as the service and threat landscape change.

## Review questions

1. Give one cache-related privacy trade-off.
2. Why should architectural trade-offs be documented?

## Glossary

**Trade-off:** a choice that improves one property while constraining another.  
**Defence in depth:** layered safeguards rather than reliance on one control.
