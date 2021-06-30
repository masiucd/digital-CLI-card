# Node Js land

- [About](#about)

## [About](#about)

### What is Node Js?

Node Js is a runtime environment for javascript so we can run our javascript on the server and not just in the browser.
Node Js runs on Google chrome V8 engine, this is one reason why Node JS i very fast and preferment.
Node Js runs on a single process, without creating a new thread for every request.

When Node make a `IO` operation like accessing data from a database ,reading from a network or the file system, Node will not block the thread.
Instead Node will continue with the operation when the response comes back. This saves some valuable `CPU` cycles
With this approach Node can handle a lot of concurrent connections with a single server without instead of nasty complicated thread concurrency.
