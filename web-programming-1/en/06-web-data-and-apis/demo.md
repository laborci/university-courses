# Demo: public API interpretation

The first step in using an API is not to write code, but to clearly formulate the question and read the documentation. Together, the method, path, parameter, authentication, status code, and JSON tell us what happened in an HTTP request.

## Preparation and chosen example

It is worth choosing an API that can be tried without registration, has stable documentation, and provides human-friendly data. A good educational example is Open-Meteo's weather API: it provides current weather data by specifying latitude and longitude. A documentation page and a browser are sufficient for the demonstration. If the instructor finds it more convenient, he can also use an API testing interface instead of the browser address bar; the learning goal is the same.

It is important to state at the beginning of the lesson: not all public APIs work the same way. Many APIs ask for keys, accounts, payment information, or stricter terms of use. That is why the open weather example is just an entry; after that, we can observe the same concepts in a documentation that requires an ``Authorization'' header.

## Step 1: API request from a business question

Let's start with an ordinary question: "What is the current time in Budapest?" To a human, this seems accurate enough, but not to an API. Which Budapest? In what units do we ask for the temperature? Do you only need temperature, or also wind, precipitation and time? The essence of API usage is to translate these obscure parts into parameters accepted by the documentation.

The approximate coordinates of Budapest are 47.4979 and 19.0402. A possible request:

```text
https://api.open-meteo.com/v1/forecast?latitude=47.4979&longitude=19.0402&current=temperature_2m,wind_speed_10m
```

Ask students to break the URL into parts without seeing the answer. `https` is the scheme: we expect an encrypted HTTP connection. `api.open-meteo.com` is the hostname. `/v1/forecast` is the path that represents a resource or operation of the service. The question mark is followed by the query string; the ampersand-separated name-value pairs are parameters. The URL itself doesn't "calculate" the weather: the URL is a request description in standard form that the server interprets.

## Step 2: targeted reading of the documentation

First, look for the endpoint in the documentation. An endpoint is more than a path: it is a method and a path together. In our example `GET /v1/forecast`. `GET' means that we are retrieving data, not changing the state of the server. This should be compared to a later example, where `POST /orders' would mean creating a new order.

Then we look at the parameter table. Good documentation specifies the name, type, binding, default, range, and meaning of each parameter. ``latitude'' and ``longitude'' are numerical geographic coordinates. `current` is a list of current weather fields. You shouldn't guess based on the name: if the documentation says a `wind_speed_10m' field, it means the wind speed interpreted at a height of ten meters, not the concept of "wind" in general.Let's ask: what happens if we omit the `longitude' parameter? Based on the documentation, this is mandatory, so the request cannot be fully understood. What happens if `latitude=alma`? The server cannot interpret it as a number. With this, we prepare the students for mistakes: in an HTTP request, the parameters are not free text, but part of the contract.

## Step 3: imagine the raw request

When the browser opens the URL, a request similar to this is generated in the background:

```http
GET /v1/forecast?latitude=47.4979&longitude=19.0402&current=temperature_2m,wind_speed_10m HTTP/1.1
Host: api.open-meteo.com
Accept: application/json
User-Agent: Mozilla/5.0 ...
```

The browser adds part of the header automatically. `Host` tells us which server we are requesting; `Accept` indicates that we can process a JSON response; `User-Agent` identifies the requesting program. The header is not the same as the content of the response: the header is the metadata associated with the request, and the body is the data, if any. A `GET` request usually has no body; in a ``POST'' request, the sent data often travels there.

Here you should open the DevTools Network panel. After reloading, the tutor selects the API request and shows the Request URL, Request Method, Status, Request Headers, and Response Headers. The interface differs from browser to browser, but the idea of ​​the categories is the same. The goal is not to memorize the panels, but for the student to recognize that the concepts read in the documentation also appear in real network traffic.

## Step 4: response code and response headers

In case of success, the server typically returns:

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Cache-Control: public, max-age=...
```

`200 OK' does not mean "good weather", but that the server has returned a successful HTTP response as requested. If the request is syntactically incorrect, `400 Bad Request' may be received. If the API key is missing or incorrect, `401 Unauthorized` is common - more precisely: authentication required or failed. If the requester is identified, but not authorized to the given resource, `403 Forbidden` can be the response. `404 Not Found` for an unknown route, `429 Too Many Requests` for too many requests, and `500 Internal Server Error` for an internal server error are the typical signals.

Let's show that the `Content-Type: application/json' header tells how the body should be interpreted. JSON is human-readable text, but a regular data format: objects in braces, arrays in square brackets, keys in quotes, values ​​can be text, numbers, booleans, `null', objects or arrays. JSON is not JavaScript code, nor is it the same as "any data".

## Step 5: Read JSON response

The abbreviated form of the answer can be, for example:

```json
{
  "latitude": 47.5,
  "longitude": 19.0,
  "generationtime_ms": 0.08,
  "current_units": {
    "temperature_2m": "°C",
    "wind_speed_10m": "km/h"
  },
  "current": {
    "time": "2026-08-12T10:00",
    "temperature_2m": 26.4,
    "wind_speed_10m": 11.2
  }
}
```

Read this as a data model, not a single block of text. The topmost object contains geographic data and a nested object called `current`. The value of `current.temperature_2m` is 26.4, but the unit should not be assumed: according to the corresponding `current_units.temperature_2m`, it is degrees Celsius. `generationtime_ms` is the generation time measured by the server; it is not the same as the total load time experienced by the user, which includes DNS, network and browser.

Ask the students to formulate a sentence based solely on the answer: "On the coordinates returned by the service provider, at the given time, the temperature at two meters is 26.4 °C." This is a better statement than "It is now 26.4 degrees in Budapest" because it takes into account the measurement height, time and coordinate rounding. Such small precisions of data interpretation are also important in web systems.

## Step 6: demonstrate authentication from documentationSince the chosen weather API does not necessarily require a key, let's briefly open an authenticated endpoint from the documentation of another service. No need to use a live key. In the documentation we can see, for example:

```http
Authorization: Bearer eyJ...
```

Explain that a Bearer token is an access token that can be used by its presenter; therefore, it should be treated as a secret. It cannot be placed in a public GitHub repo, screenshot, or browser-side source code that can be downloaded by anyone. An API key can also be an identifier, but its exact role is always determined by the provider's documentation. Authentication proves who is asking; authority controls what you can do.

## Step 7: Deliberately Bad Requests

It's more instructive to interpret an error than just looking at `200 OK'. The instructor should change the coordinate to an invalid text or omit a required parameter. Then the status and body of the response are read together. Many APIs return JSON errors, such as:

```json
{
  "error": true,
  "reason": "Invalid latitude parameter"
}
```

The error message does not replace the status code: the code represents a category for machines and general HTTP tools, and the JSON provides application-specific details. In the same way, the meaning of `404` should not automatically be read as "no such data"; maybe the route is wrong or there was a typo. The correct debugging order is: documentation, method, path, parameters, authentication, status code, response body.

## Closing discussion

At the end of the demonstration, let's return to the original question. The browser opened a URL, but in the background a regularly structured `GET` request was sent. The server interpreted it according to the parameters recorded in the documentation and sent a response code, headers and JSON data. A mobile application, a server-side program or a command-line tool follows the same logic. It is not the fact that it can be called from code that makes an API a "programmer's topic", but the fact that it provides a regular, interpretable interface for another system.

## Common misconceptions

- **"The URL of the API is the data itself."** The URL is the address and parameterization of the request; the data comes in the body of the response.
- **"200 means business is OK."** Only indicates success of HTTP request. The application result must be interpreted based on the response data.
- **"JSON is a database."** The JSON exchange format; it can be data from a database, but it is not a storage system per se.
- **"A public API needs no security."** Public documentation and anonymous reading are not the same as unlimited access. Tokens, quotas and data protection rules must be respected.

## Review questions

1. In the weather example, what is the method, the route and what are the query parameters?
2. Why is it necessary to determine from the documentation whether a parameter is mandatory?
3. What does `Content-Type: application/json` response header mean?
4. What is the difference between `401`, `403` and `429`?
5. Where is the temperature unit in the sample answer and why should it not be assumed?
6. Why is it dangerous to put an `Authorization: Bearer ...` value in a public repo?

## Glossary

- **Public API:** documented programming interface available for external developers; access can be anonymous or subject to authentication.
- **Endpoint:** an API operation identified by an HTTP method and route.
- **Query parameter:** name-value data specified in the part of the URL after the question mark.
- **Request Header:** metadata about the HTTP request, such as accepted format or authentication.
- **Response Header:** Metadata of the server's response, such as format, caching, or limit.
- **HTTP status code:** standard, numerical indication of the processing of the request.
- **JSON:** regular text data exchange format for structured data.
- **Bearer token:** an access token that its holder can use for the service.
