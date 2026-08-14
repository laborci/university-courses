# Case Study: An Overloaded Ticketing or University System

At a known opening time, thousands of users may arrive simultaneously to buy tickets or register for courses. The system should define the essential task—fairly obtaining a place or receiving a reliable result—before optimising a secondary feature. A waiting room, queue position, rate limit, clear retry guidance, static information through a CDN, and protected write operations can preserve fairness and availability.

The service needs observability: demand, errors, queue length, dependency health, and completed transactions. It must avoid misleading success messages or duplicate reservations. After the event, review evidence, capacity assumptions, user reports, and recovery outcomes rather than blaming users for predictable peak behaviour.

## Questions

1. Which task is essential during the peak?
2. How can a queue improve fairness?
3. Which signals should operators monitor?

## Glossary

**Waiting room:** controlled admission mechanism during excess demand.  
**Capacity planning:** estimating resources needed for expected load.
