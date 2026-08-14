# Cache, CDN, and Geographic Distance

**Key message:** Caching and content delivery reduce repeated work and distance, but must respect freshness, personalisation, and security boundaries.

A browser, intermediary, or server cache can reuse a safe response. Static public assets are strong candidates; personal pages and credentials are not. Cache-control rules define freshness and revalidation. A CDN places copies nearer users and can absorb traffic, but invalidation, regional behaviour, and third-party dependency must be understood. Never allow a shared cache to expose one user’s response to another.

## Glossary

**Cache:** stored response reused to avoid repeated work.  
**CDN:** distributed network for serving content near users.  
**Invalidation:** making a previously stored response no longer usable.
