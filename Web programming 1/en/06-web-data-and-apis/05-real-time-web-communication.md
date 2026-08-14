# Real-time communication on the web

## Goals

By the end of the material, the student understands why "real-time" is not the same as operation without delay. You can explain the basic idea of ​​polling, long polling, Server-Sent Events (SSE), WebSocket and WebRTC, and you can recognize situations where the simpler solution is more appropriate. You know the direction, relationship model and important compromises of each technique.

In a traditional HTTP request, the client initiates, the server responds, and then the message ends. If the server needs to deliver new information "by itself" to the user, a more persistent or repetitive communication pattern is needed. The appropriate pattern depends on event frequency, direction, delay requirements, and operational constraints.

## What does real time mean here?

When a chat message appears within a few tenths of a second, or a stock exchange rate is constantly updated, we call the experience real-time. This is not immediacy in the physical sense. The event must pass through the network, be processed by the server, and displayed by the client. Rather, the goal is to make the update fast and predictable enough for the task at hand.

The delivery status of a package updated every minute is perfectly acceptable. Tens and hundreds of milliseconds count in a multiplayer game. Before choosing "real-time technology", you must therefore ask: how fast should the change appear? Is it a one-way notification, or do both parties send data continuously? How many simultaneous connections are expected? What happens if the connection is lost?

## Polling: regular polling

Polling is the easiest solution. The browser sends a normal HTTP request at specified intervals, for example `GET /api/notifications` every five seconds. The server answers the status of the given moment or the events that have taken place since then.

This is sufficient in a surprising number of cases. On an admin site that only shows processing status that changes every few minutes, polling every five or thirty seconds is simple, reliable, and easy to debug. It uses the usual HTTP infrastructure, is well logged, and the client can stop when the page is not in the foreground.

The price is unnecessary asking. If 10,000 clients ask for it every second, 10,000 requests will be received even if there are no new notifications. With a short interval, the system feels faster, but server and network load and battery usage increase. It is cheaper with a long interval, but the information reaches the user later.

## Long polling: the response waits for the event

With long polling, the client requests an update, but the server does not respond immediately if there are no new events. It keeps the request open for a while and only responds when data arrives or a timeout expires. The client sends the request again immediately after the response.

This reduces the number of empty responses and the new event can reach the client almost immediately. For example, you can imagine that the customer service chat browser sends a `GET /events?after=125` request. When a new message arrives, the server responds; the client processes it and listens again with the value `after=126`.

The pattern is still a chain of HTTP requests, not a true two-way persistent channel. Watch out for timeouts, proxy behavior, and disconnections. At high load, many open requests can take up resources, so long polling is especially reasonable as a temporary or moderate-demand solution.

## Server-Sent Events: continuous stream of server-side events

SSE is an HTTP-based server-to-client event channel. The browser opens a connection, for example `GET /events`, and the server can send messages with content type `text/event-stream` one after the other:

```text
event: stockUpdate
id: 1042
data: {"symbol":"ACME","price":153.20}

event: stockUpdate
id: 1043
data: {"symbol":"ACME","price":153.10}

```The empty line separates the events. In the browser, the `EventSource` interface handles the connection and usually reconnects automatically after an error. The event ID can help the client to indicate how far it has come when reconnecting, so that the server can replace any events that may have been missed.

SSE is especially convenient for live news, status alerts, log streams, or one-way notifications. No need to learn a new protocol: it runs on HTTP and the server can send data as long as the connection is alive. Its limitation is that it is basically one-way. If the client wants to send a message to the server, it must use a separate standard HTTP request. It is not the most obvious choice for binary data either.

## WebSocket: two-way, persistent connection

WebSocket starts with an HTTP-based handshake at the beginning of the connection, and after a successful protocol switch, it turns into a separate, two-way message channel. From then on, both client and server can send text or binary messages at any time, without starting a new HTTP request.

For chat, joint document editing, live bidding, online gaming or a collaborative control panel, this is a natural model. In a chat, the client sends the new message, the server checks and stores it, and then it can immediately forward it to the other clients involved. A connection does not automatically mean a database connection: it is just a communication channel, behind which authentication, authorization, business logic and persistent storage are equally necessary.

The flexibility of WebSocket comes at an operational cost. Persistent connections require state and server capacity. In the case of several servers, an event sent by a client must also be delivered to the server instances to which other clients have connected; this often requires a central messaging or pub/sub system. Authentication on connection, revalidation of authority, protection against too fast messaging, heartbeat, reconnection, and message sequencing must be planned for.

Importantly, the delivery of a WebSocket message does not in itself guarantee that the user has seen it or that the application has successfully processed it. The trust level should be dictated by the application's protocol: is there a message identifier, acknowledgment, resend, sequence requirement, and expiration?

## WebRTC: direct media and data connection

WebRTC is primarily designed to support real-time voice, video and data connections in a browser. A typical example is a video call, where the goal may be to have the media flow directly between the participants. However, establishing a connection is complex: the parties have to find each other behind NATs and firewalls, with the help of STUN and, if necessary, TURN servers. For so-called signaling (*signaling*), WebRTC itself does not prescribe a single mandatory protocol; it is often served by WebSocket or HTTPS.

Therefore, we do not choose WebRTC for a simple notification list. It has the big advantage of real-time media, but the error handling, network environment, and infrastructure are much more complex than SSE or WebSocket.

## Same case: package tracking

On a package tracking page, the position of the courier rarely changes, and the customer only looks at the page for a few minutes. With polling, the browser can query the status every minute: a simple and proportionate solution. If an immediate update is important in the last minutes of delivery, with SSE the server can send the new statuses one-way. In a dispatch application, where the operator sends instructions to the courier, the bidirectional model of WebSocket may be justified.

In all three cases, the same security principle applies: the client can only receive events related to his own order. The event channel does not exempt you from access control, and due to the persistent connection, expired sessions and authorization changes must be handled particularly carefully.

## Design issues and trade-offsFirst, the nature of the event must be described. If the client asks for the current state, polling may be enough. If the server wants to communicate rare events to many clients, SSE is an easy choice. If fast, frequent exchange of messages in both directions is required, WebSockets may be needed. If live audio or video is the goal, WebRTC comes to the fore.

Second, reconnection must be ensured. The mobile network changes, the laptop goes to sleep, the proxy can close an idle connection. The client should therefore retry, preferably with a gradually increasing wait, not thousands of times per second. Events must be managed with an identifier and, if necessary, a persistent log if they cannot be lost.

Third, you have to look at scaling. A "send to everyone" message in a mass live system is expensive. Subscriptions divided by topics, rooms or users, limited message size, authorization check and load protection are required. Real-time features require logging and measurement just like any other web service.

## Common misconceptions

**"Polling is outdated and therefore prohibited."** Nope. It is the simplest and most reliable solution in many infrequently updated business cases.

**"WebSocket is faster, so all APIs should be."** A persistent two-way channel is more complex and expensive to operate. For normal queries, HTTP is still great.

**"SSE is the same as WebSocket."** SSE is basically a server→client, HTTP-based event stream. WebSocket can send messages in both directions over a persistent channel.

**"If I sent an event, it must have reached its destination."** Network interruptions, reloads or processing errors can occur at any time. The necessary delivery guarantee must be established by the application.

## Review questions

1. What is the main advantage and most important cost of polling?
2. How does long polling differ from short-term polling?
3. Of course, which direction of communication is SSE suitable for?
4. What happens at the beginning of a WebSocket connection?
5. Name three design tasks that appear in a WebSocket-based service.
6. Why might reconnection and event ID be necessary?
7. For what task would you choose WebRTC and why not use SSE for that?

## Glossary

- **Real-time communication:** data exchange whose delay is small enough for the given purpose of use.
- **Polling:** the client regularly checks whether a change has occurred with an HTTP request.
- **Long polling:** the server keeps an HTTP response open until a new event or a timeout.
- **SSE (Server-Sent Events):** HTTP-based, server→client event stream.
- **WebSocket:** persistent, two-way message channel between client and server.
- **WebRTC:** A set of technologies for real-time media and data connections in the browser.
- **Reconnection:** process of restoring connection after a loss of connection.
- **Pub/sub:** publish/subscribe pattern where messages are related to topics or channels.
