# Node Js land

- [About](#about)
- [dirname](#dirname)

## [About](#about)

### What is Node Js?

Node Js is a runtime environment for javascript so we can run our javascript on the server and not just in the browser.
Node Js runs on Google chrome V8 engine, this is one reason why Node JS i very fast and preferment.
Node Js runs on a single process, without creating a new thread for every request.

When Node make a `IO` operation like accessing data from a database ,reading from a network or the file system, Node will not block the thread.
Instead Node will continue with the operation when the response comes back. This saves some valuable `CPU` cycles
With this approach Node can handle a lot of concurrent connections with a single server without instead of nasty complicated thread concurrency.

## [Dirname](#dirname)

`__dirname` is a environment variable that tells us the absolute path of the file we currently working in.

Let's say we have a basic `Node` project that had a structure that looks something like this.

```md
project
│ README.md
│ server.js
│
└───models
│ │ user.js
│ │ dog.js
│ │
│ └───helpers
│ │ util.js
│ │
│ │ ...
│
└───routes
│ user.js
│ dog.js
```

We can check which directory our files are located.

So working from `models/user.js` if we write:

```js
console.log(__dirname) // "/Users/marcis/node_js_land/models/user.js"
console.log(process.cwd()) // "/Users/marcis/node_js_land"
```

`process.cws()` will give us the location of the project even if we are in a sub directory.
Note that if we want to use `es-modules` we need to write something like this to get the same result for `(__dirname)`.
`process.cwd()` will works as usual.

```js
import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
console.log({__filename})
console.log(path.dirname(__filename))
```

We can even create new directories.
To create a new directory, in `server.js` add this line of code.

```js
import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)

const staticDir = path.join(path.dirname(__filename), "static")

const init = () => {
  fs.mkdirSync(staticDir)
}

if (process.argv[process.argv.length - 1] === "make") {
  init()
}
```

We will create a new directory named `static`, note that we are using `es-modules here`.
To create the directory run the script in tou terminal `node server.js make`.

We can even pont to different directories, for example in a express application we can use `__dirname` to point to a public directory that will contain different static files.

```js
express.static(path.join(__dirname, "public"))
```

or with `es-modules``

```js
import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
express.static(path.join(path.dirname(__filename), "static"))
```

lastly we can create new files

```js
import fs from "fs"

const init = () => {
  fs.writeFileSync("index.js", "Hello World")
}

if (process.argv[process.argv.length - 1] === "make") {
  init()
}
```
