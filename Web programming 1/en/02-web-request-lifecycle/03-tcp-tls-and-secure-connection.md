# TCP, TLS and secure connection

Several layers work together in the web communication between the browser and the server. TCP helps create a reliable data stream, TLS protects and authenticates communication, and HTTP describes the web request-response dialogue over this connection. HTTPS is short for HTTP with TLS protection.

When a user opens an HTTPS website, it's easy to think that "the browser sends a page request and the server returns the page." In reality, this requires solving several separate problems. It must deliver the data to the other party, handle lost or swapped packets, prevent unauthorized reading and modification, and finally exchange HTTP messages that the application can understand.

### What does TCP solve?

The Internet is basically a packet-switched network. The data travels divided into smaller packets, and the packets can reach their destination via different routes. In theory, they could get lost, be late, or arrive in a different order. For many web applications, this in itself would not be convenient: incomplete or jumbled parts of an HTML document would be unusable.

TCP (Transmission Control Protocol) is a connection-oriented transport protocol that gives the two endpoints the feeling of a reliable, orderly flow of data. It uses serial numbers so the receiving party will notice if a piece is missing or arrives in the wrong order. It sends feedback and the sender resends the data if necessary. Therefore, the upper-layer application does not receive an uncertain set of packets, but a continuous sequence of bytes.

TCP performs connection establishment at the beginning of the connection. The purpose of this is for the two parties to make sure that they can reach each other and to agree on the basic parameters of communication. The connection can be closed later in an orderly manner. However, this reliability comes at a cost: feedback and retransmissions require time, network traffic, and state management.

Not all Internet applications use TCP. In some cases, a real-time video call or online game can handle a short piece of audio being lost rather than a system delay waiting for a retransmission. However, classic web communication was typically based on TCP for a long time, because the complete, orderly transfer of documents and transactions was important.

### Why is TCP not enough?

TCP helps ensure that data arrives, but does not guarantee that the data is secret, intact, or indeed from the expected server. Imagine a public Wi-Fi network in a coffee shop. If the communication is unencrypted, a malicious intermediary may attempt to observe, modify, or spoof the traffic.

This is where TLS (Transport Layer Security) comes in. TLS is a protocol that provides protection for application communication. On the web, it sits between HTTP and TCP: HTTP messages travel over TLS, and TLS typically uses a TCP connection. The user usually only sees that the URL starts with the prefix `https://`.

### Three basic purposes of TLS

The first goal of TLS is **secrecy**. The browser and the server use encryption, thanks to which intermediate actors in the path cannot easily read the password, personal data or the exact content of the page.

The second goal is **integrity**. The two parties must detect if someone changes the message in transit. Without it, it would be possible for an intermediary to transcribe, for example, the bank account number or the content of a downloaded program.

The third goal is **authentication**. The browser must have reason to believe that it has actually connected to the server whose name it sees in the address bar. It uses certificates and authentication providers to do this.

### Certificates and the structure of the connectionAt the start of an HTTPS connection, the server sends a digital certificate. This includes, among other things, which domain names the certificate can be used for, how long it is valid for, and which certification service provider certified it. The browser verifies this information and whether the chain of signatures leads to a root certificate it considers trustworthy.

If the browser finds a serious problem - for example, the certificate is not for the opened domain, has expired, or cannot be authenticated - it will display a warning. This is not a mere inconvenience. The browser indicates that it cannot reliably determine whether the user is actually connected to the desired service.

After verifying the certificate, the browser and the server establish shared session keys. These keys are suitable for symmetric encryption, which can be used quickly to transfer large amounts of data. The asymmetric cryptography applied at the beginning of the connection and the symmetric encryption later together solve it so that the two parties can securely create a shared secret without sending it openly.

### What does the lock icon actually mean?

The lock icon on the browser pretty much means that the connection is technically encrypted and the certificate check found no errors. This is very important, but it does not automatically mean that the service provider is reliable, that the site is not a phisher, or that the service handles data responsibly.

A fraudulent website can also obtain a valid certificate for its own domain. If someone reaches `bank-example-login.example`, the connection can be perfectly HTTPS-protected while the domain itself does not belong to the bank. For the user, the domain name, the context of the service, and the requested data are therefore important security signals.

### HTTP, HTTPS and HTTP/3

Classic HTTPS usually means HTTP over TLS, and TLS runs over a TCP connection. However, in the modern web, HTTP/3 is based on the QUIC protocol, which uses UDP. The essential user security principle does not change: communication is still encrypted and protected by authenticated TLS-like mechanisms. The development of the underlying technology aims to establish the connection faster and network errors to slow down the user experience less.

## Worked example: login on public Wi-Fi

A student opens the university study system on the library's Wi-Fi network.

1. The browser looks up the IP address of the system via DNS.
2. Builds a TCP connection to the server or, in modern cases, initiates a QUIC connection.
3. The server sends its certificate; the browser checks that it belongs to the desired domain.
4. The keys required for the encrypted session are created.
5. When sending the login form, the password is sent over the TLS-protected channel.
6. Typically, the network operator cannot simply read out the password or specific form data.

If the user ignores a fatal certificate failure, this chain of protection can be broken. Therefore, the browser warning is not a routine message, but can indicate a real risk.

## Common misunderstandings

| Claim | Clarification |
| --- | --- |
| "TCP encrypts traffic." | TCP facilitates reliable data transmission; encryption is provided by TLS. |
| "The lock icon means the page is trusted." | The lock says something about protecting the connection, not the intent or quality of the service provider. |
| "HTTPS is only needed for password-protected sites." | Today it is a general principle, because all web traffic can contain sensitive or modifiable information. |
| "Because of the encryption, no one knows anything about our relationship." | Some network metadata, such as the fact of the connection or the timing of the traffic, may still be visible. |

## Review questions

1. What problem does TCP solve and which one does it not?
2. What are the three main security goals of TLS?
3. What does the browser check on the server certificate?
4. Why can a phishing page be HTTPS?
5. Why does TLS use different cryptographic principles at different stages of the connection?

## Glossary- **TCP:** reliable, connection-oriented data transfer protocol.
- **TLS:** security protocol providing confidentiality, integrity and authentication.
- **HTTPS:** HTTP with TLS protection.
- **Certificate:** digital certificate for domain-related identification of the server.
- **Authentication provider:** an organization that issues and verifies certificates.
- **Symmetric encryption:** encryption using the same common key.
- **Asymmetric cryptography:** procedures based on public and secret key pairs.
