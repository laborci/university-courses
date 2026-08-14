# Client-server model and multi-layer systems

In web systems, the client requests a service and the server responds. Larger systems divide tasks into logical layers so that the interface, business rules and data management can be separated.

When a student clicks the "Add Course" button, they see a single action on the screen. For the system, however, this is a series of questions: who initiated the operation, is he entitled to it, is there still room, are the prerequisites met, and how should the result be recorded permanently? The client-server model and layering help you understand how to turn this single click into a secure and auditably executed process.

### 1. Client and server

A **client** is a program or device that requests a service. On the web, this is typically the browser. A **server** is a system that receives the request, processes it, and sends a response. The roles can be interpreted in terms of communication: the same computer can be a client in certain situations and a server in other situations.

For example, when the browser requests a product page, it acts as a client. The server of the online store responds as a server. While using the online store, you can also call the API of a payment service provider; in this connection, the web store application is the client, and the payment service provider is the server.

### 2. Request and response

The basic communication model of the web is the request-response model. The client formulates what resource or operation it requests, and the server responds with status, headers and, if necessary, data.

Simplified process:

1. The user opens a URL.
2. The browser sends a request to the server.
3. The server can check authorization, retrieve data, or process an operation.
4. The server sends a response.
5. The browser interprets and displays the response.

The request does not always request an entire web page. It can be an image, a JSON data, a search result, a login action or uploading a file.

### 3. Why do we divide systems into layers?

With a small system, all tasks can fit in a single application. As the system grows, it is beneficial to separate different responsibilities. The classic three-layer model is as follows:

| Layer | Main task | Example in a study system |
| --- | --- | --- |
| Presentation Layer | Communication with the user and display | Browser interface, forms, tables |
| Application or Business Layer | Rules, processes, authorizations | Checking the terms of course admission |
| Data Layer | Data storage and retrieval | Data of students, subjects, applications |

Layering helps ensure that a change does not necessarily affect the entire system. For example, changing the way a database is stored ideally does not require a complete redesign of the user interface.

### 4. Logical and physical separation

There is an important difference between logical and physical separation. Logically, we can talk about three layers even if everything runs on a single machine. However, in a larger system, these tasks can be distributed across multiple servers or services.

| Solution | Advantage | Limit |
| --- | --- | --- |
| One application, one machine | Simple operation and development | Limited expandability, one error can affect several functions |
| Logically layered system | Transparent responsibilities | It requires more design discipline |
| Physically separated layers | Better scalability and protection options | More complex communication and operation |

The goal is not always to use the most layers or the most servers. A good architecture matches the real needs of the system.

### 5. Example: course registration

When a student enrolls in a course in a browser-based learning system:1. The browser sends the listener's request.
2. The application layer checks whether the student is registered, has fulfilled the prerequisites, and whether there is a free seat.
3. The data layer queries and then modifies the relevant data.
4. The application layer prepares the result.
5. The browser displays the response about the successful or unsuccessful operation.

In this example, it is clear that the browser does not directly "overwrite the database"; the operation has rules and controls.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "A client is always a user's computer." | The client can be another server-side application. |
| "The server is a single machine." | A server role that can be filled by multiple machines or services. |
| “The three layers must run on three separate machines.” | Layers are primarily logical responsibilities. |
| "The browser connects directly to the database." | In general, the application layer mediates and enforces the rules. |

## Instructor questions

1. Does a mobile application count as a client? Compared to what?
2. Why is it risky if the user interface directly accesses the database?
3. What tasks would belong to the business layer of a library system?

## Short verification task

Draw three boxes for an online appointment booking system: browser, application and database. Write two tasks for each one, then mark the path of the request and response.

## Glossary

- **Client:** a program requesting a service or resource.
- **Server:** system that provides a service or resource over a network.
- **Request:** service or data request sent by the client.
- **Answer:** the server's processed result at the client's request.
- **Presentation layer:** the layer responsible for the user interface.
- **Business layer:** layer that manages the rules and processes of the system.
- **Data layer:** layer managing the storage and access of data.
