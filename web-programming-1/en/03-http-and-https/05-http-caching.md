# HTTP caching

A cache is a temporary, reusable copy that is kept so that the same data does not have to be retrieved or calculated every time. On the web, this is not just acceleration: it reduces server load, data traffic, cost and user waiting. However, cache is always a compromise between freshness and efficiency.

Imagine a `logo.svg` file belonging to a university website. It rarely changes, yet it is needed every time a page is loaded. It is reasonable for the browser to use the previously downloaded copy for a while. However, the situation is different with a list of exam tickets: displaying an outdated copy can be misleading. The cache rules tell exactly how long and under what conditions the previous answer is acceptable.

## Where can I cache?

Your browser's own cache is the closest. There may be an organizational proxy, an ISP or enterprise cache, a CDN edge server, and an application-level cache on the server itself. From an HTTP point of view, it is important that the headers of the response can also indicate the direction of intermediate actors. The response of a personal account page cannot be placed in a common, public cache; a public image does.

## Cache-Control: the main instruction

```http
Cache-Control: public, max-age=86400
```

This means that the response can be considered fresh for a day and can be stored in a shared cache. `max-age` is in seconds. For static, versioned files, even a very long value is correct:

```http
Cache-Control: public, max-age=31536000, immutable
```

`immutable' implies that the file will definitely not change during the recent period. This is only true if we use a new URL when changing, for example `app.4f8c2.js`, we don't silently overwrite the contents of `app.js`.

In case of a sensitive response:

```http
Cache-Control: no-store
```

This requests that no copies be stored. The name ``no-cache'' is misleading: it does not mean that it is forbidden to store, but that it must be revalidated with the server before use. ``private'' can still allow the browser to store, but not shared cache. ``public`' also allows shared cache.

## Fresh or rechecked?

If the `max-age' time has not yet expired, the cache can give a "fresh" response without asking the server. If it's expired, you don't necessarily need to download a full file. The server can provide an **ETag** identifier:

```http
ETag: "v7-8a9c"
```

In the following request, the client asks:

```http
If-None-Match: "v7-8a9c"
```

If the content is unchanged, the response is `304 Not Modified`, without a body. The client keeps its own copy. A similar but less precise mechanism is `Last-Modified` and `If-Modified-Since`. The ETag is a content or version ID, and the date is a timestamp; both are the basis of a conditional request.

## Why do I still see an old page?

The browser may be using the allowed cache response correctly. It may be an old copy left in a CDN, or a provider-side application provides cached data. In development, a "hard refresh" only changes the behavior of the local browser cache, not a bad server header or CDN configuration. In the Network view, it is worth looking at the `Cache-Control`, `Age`, `ETag` headers of the response and whether a network request was received at all.

## Design example

Images and versioned JavaScript files of a news portal can be cached for a long time. The HTML of the front page may be fresh for a short time because it changes frequently. The personal timetable of a logged-in student can be `private, no-cache': it can be stored in your own browser, but it will be checked before each use. ``no-store'' may be justified for a bank transaction response.

## Misconceptions and verification questions

It is not true that "the cache is always bad because it provides old data"; without it, the web would be significantly slower and more expensive. It is also not true that the cache is only a browser function. The question is the appropriate freshness rule.

1. What is the difference between `no-cache` and `no-store`?  
2. Why is it good to have the version identifier built into the file name?  
3. What do we gain with the `304 Not Modified` answer?  
4. Why is it dangerous to let a personal answer into `public` cache?

## Glossary**Cache:** reusable response copy. **Freshness:** how long it can be used without asking. **Revalidation:** checking the previous copy at the server. **ETag:** identifier indicating the version/content of the response. **CDN:** geographically distributed content server network.
