# Load Peaks, Graceful Degradation, and Observability

**Key message:** When demand exceeds capacity, protect essential user tasks and make system behaviour visible enough to respond deliberately.**

Peak demand can arise at registration opening, ticket release, or a submission deadline. Queues, rate limits, back-pressure, caching, and prioritisation can protect the service. Graceful degradation means preserving a smaller but honest useful function—for example read-only information or a waiting room—rather than failing unpredictably. Observability combines meaningful logs, metrics, traces, dashboards, and alerts so operators can understand what is happening without collecting unnecessary sensitive data.

## Review questions

1. What is graceful degradation?
2. Why are metrics alone insufficient for diagnosis?

## Glossary

**Back-pressure:** mechanism that slows incoming work when capacity is limited.  
**Observability:** ability to infer system state from its outputs.  
**Trace:** correlated record of a request across components.
