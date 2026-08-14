# Performance: Response, Load, and Resources

**Key message:** Performance is a system property shaped by demand, latency, computation, storage, and network resources.

Response time includes queueing, network travel, processing, and transfer. Under load, a small slowdown can create queues, retries, and further load. Measure representative requests and user journeys, not only averages; tail latency often determines perceived quality. Reduce unnecessary work, set timeouts, use bounded resources, and avoid designs that let one expensive request exhaust capacity.

## Glossary

**Throughput:** completed work per unit time.  
**Tail latency:** slowest portion of responses.  
**Queueing:** waiting caused by limited capacity.
