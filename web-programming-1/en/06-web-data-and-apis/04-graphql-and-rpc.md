# GraphQL and RPC in the web ecosystem

## Goals

By the end of the material, the student will be able to distinguish between resource-oriented REST, query-oriented GraphQL and operation-oriented RPC approaches. You understand what a GraphQL schema is for, how queries and modifications relate to it, and why no single solution is an automatic advantage for every system. It can conceptually accommodate both SOAP and gRPC.

An API is not just a collection of URLs: it's a contract between systems. REST, GraphQL, and RPC describe this contract differently. The right choice depends on the task, the consumers, the network environment and the operational requirements, not a matter of fashion.

## Three different questions

It is easy to see the difference on the example of a web store's mobile application. The product's name, price, first image, stock and three reviews must be displayed on the product page. In the case of REST, the client mostly requests resources: `GET /products/42`, then maybe `GET /products/42/reviews?limit=3`. The server decides in advance what form a response belongs to an endpoint.

In the case of GraphQL, the client rather says: "I now request exactly these fields from product 42". Not a new kind of HTTP, but an API query language and server runtime. It is often behind a single HTTP endpoint such as `/graphql`, but the underlying business logic, database, or other services still exist.

RPC (Remote Procedure Call) speaks a different language. Here, the client requests an action: `calculateShipping`, `sendInvoice` or `approveOrder`. This is closer to how we would call a function within a program. The name and input are more prominent than what resource the result comes from.

## GraphQL: schema as a common language

At the heart of the GraphQL system is the schema. This is a machine-readable description of what types of data, fields, and operations are available. A simplified schematic fragment might look like this:

```graphql
type Product {
  ID: ID!
  name: String!
  price: Int!
  inStock: Boolean!
  reviews(limit: Int = 10): [Review!]!
}

type Query {
  product(id: ID!): Product
}
```

The exclamation mark indicates that the value cannot be `null`. A schema is not a database table description: rather, it promises what kind of view a consumer of the API might get. The fields of a `Product` can come from a relational database, search index or even an external inventory management service.

The client's query can be, for example:

```graphql
query ProductCard {
  product(id: "42") {
    name
    price
    inStock
    reviews(limit: 3) {
      rating
      text
    }
  }
}
```

The structure of the response follows your request:

```json
{
  "data": {
    "product": {
      "name": "City Backpack",
      "price": 24990,
      "inStock": true,
      "reviews": [{"rating": 5, "text": "Comfortable."}]
    }
  }
}
```

The most important consequence of this is that the client can avoid unnecessary data (*over-fetching*) and shortages (*under-fetching*) resulting from many consecutive requests. A product card does not need to receive the entire product description and all ratings. At the same time, the server must resolve that the flexible request does not become an expensive, uncontrollable database operation.

## Inquiry, modification, subscription

GraphQL usually separates read-only operations as `query', and state-changing operations as `mutation'. For example, to add to a cart:

```graphql
mutation AddToCart($productId: ID!, $quantity: Int!) {
  addToCart(productId: $productId, quantity: $quantity) {
    cartId
    totalItems
  }
}
```

The variables are passed separately; this is more transparent and safer than "gluing" values ​​together as text in the query. There are also subscriptions (*subscription*) in GraphQL: the client can be notified of an event, such as a new chat message. The subscription is not the network protocol itself; the implementation may use WebSockets or another suitable channel.So-called resolvers in the server produce the values ​​of the fields. If a separate database query is started for each product for a `product.reviews` field, the N+1 problem can arise on a list page: one request for the products, then N requests for the reviews. So GraphQL is not "fast for free"; it requires a good data loading strategy, authorization management, depth and complexity limits.

## REST and GraphQL: not enemies

REST is often well-suited for clearly separated, well-cached resources. For a public image catalog, `GET /images/42` is a simple, easy-to-understand contract that naturally cooperates with HTTP caches. HTTP methods and status codes for REST endpoints carry meaning directly.

GraphQL can be beneficial when multiple disparate clients—for example, web, mobile, and internal admin interfaces—require the same business data at different levels of detail. A single carefully designed schema can be a common entry point for the underlying services. The downside is that network monitoring, caching and authorization checks can become more complex. Most requests can also come as `POST`, so the traditional HTTP cache cannot be used in the same way as a typical `GET` response.

A schema becomes truly valuable when it is consciously developed. A new field can usually be added safely because the old client does not request it. However, changing or removing the meaning of an existing field may cause compatibility issues. Therefore, servers often mark a field as obsolete, document its successor, and remove it later based on usage data. This expresses the same principle in API design as in other contracts: existing consumers must be respected.

In real systems, mixing is mundane: file uploads and authentication can be REST, while complex screen data comes via GraphQL. The choice is not a religion, but a contract design decision.

## RPC, SOAP and gRPC

RPC uses the language of the business operation. In a banking system, `transferMoney` is not just an "update" of a resource: it has separate rules, checks, errors and logging. In this case, the procedure name is often clearer than a forced resource URL.

SOAP is an earlier XML-based messaging standard that lives on in many large enterprise environments. It offers a strong formal description such as WSDL and an extensive set of standards for transactions, security, messaging. Instead, it's more cumbersome and verbose than today's JSON-based web APIs. Not "bad REST": a compromise of a different era and different company needs.

gRPC is a modern RPC framework. It typically uses a schema-driven binary message format called a Protocol Buffer and operates over HTTP/2. It can be particularly well used for communication between internal services: based on the scheme, a client and server can be generated for several programming languages. However, it is not always possible to call from a browser as directly as a JSON/HTTP API; therefore, a gateway or gRPC-Web layer is often required. The speed of gRPC alone is not a reason to implement it if the system requires a simple, public browser API.

## Example: same operation in three styles

Imagine canceling an order. In REST, `DELETE /orders/731` may occur if canceling actually means removing the resource. If the order needs to be preserved for legal and accounting reasons, it might be cleaner to `POST /orders/731/cancellation` which creates a cancellation process. In GraphQL, a `cancelOrder(id: "731")` mutation can express the same thing. In RPC `cancelOrder(731)` is the procedure call.

There is no universal syntactic winner. When making a decision, let's ask: what is the real concept of a domain? Who consumes the API? Is the standard HTTP cache important? Need a lot of related data for a single screen? With what tools can the operation log, measure and protect the traffic?

## Common misconceptions**"GraphQL replaces REST."** Not necessarily. It provides a convenient language for other problems and is often built on top of REST or RPC services.

**"With GraphQL, the client can query anything."** You can only request what the schema allows and what the server's authorization rules allow. Flexible field selection does not mean giving up data protection limits.

**"RPC is not web."** RPC-like APIs are quite common on the web. The question is not whether it is "web-based" but whether an operations- or resource-centric contract is a better fit.

**"gRPC is always faster, so it's better."** Binary format and HTTP/2 are an advantage in many situations, but debugging, browser integration and cost of operation are also part of the decision.

## Review questions

1. How is a GraphQL schema different from a database schema?
2. What do over-fetching and under-fetching mean?
3. What is the role of `query` and `mutation`?
4. Give an example of a business operation for which the RPC approach is natural.
5. What is the N+1 problem and why is it dangerous on a larger list page?
6. Name two criteria on which you would decide between REST and GraphQL.
7. In what environment can the use of gRPC be particularly justified?

## Glossary

- **API contract:** the agreement between the client and the server specifying available operations and data formats.
- **GraphQL schema:** formal description of types and operations in a GraphQL system.
- **Resolver:** server-side logic that produces the value of the GraphQL field.
- **Query / mutation / subscription:** reading, state modification and event tracking in GraphQL.
- **Over-fetching / under-fetching:** transfer of unnecessary data or too many requests for the necessary data.
- **RPC:** remote procedure call; action-oriented API approach.
- **SOAP:** XML-based, highly standardized family of service protocols.
- **gRPC:** A schema-driven RPC framework, often using Protocol Buffer and HTTP/2.
