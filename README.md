# Node Js land

- [About](#about)
- [Directory name](#dirname)
- [Exit](#exit)
- [Resources](#resources)

## [About](#about)

### What is Node Js?

Node Js is a runtime environment for `JavaScript` so we can run our `JavaScript` on the server and not just in the browser.
Node Js runs on Google chrome V8 engine, this is one reason why Node JS i very fast and preferment.
Node Js runs on a single process, without creating a new thread for every request.

When Node make a `IO` operation like accessing data from a database ,reading from a network or the file system, Node will not block the thread.
Instead Node will continue with the operation when the response comes back. This saves some valuable `CPU` cycles
With this approach Node can handle a lot of concurrent connections with a single server without instead of nasty complicated thread concurrency.

`V8` is the `JavaScript` engine that power Google chrome, it also the engine that runs on `Node`.
`V8` is written in `C++
When it come to compellation,

`JavaScript` is generally considered an interpreted language, but modern `JavaScript` engines no longer just interpret `JavaScript`, they compile it.

This has been happening since 2009, SpiderMonkey introduced this idea and since then all `JavaScript` engines has jumped on the train
This is one reason why you may hear that `JavaScript` is no longer a regular `scripting` language since `v8` and compile thousands of `javaScript` code into machine code.
`JavaScript` has transformed from a slow scripting language that could only run a few lines of code at the time to be a really powerful and preferment programing language.

---

## [Directory name](#dirname)

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

---

## [Exit](#exit)

Exiting from a Node program is important to know. When we run Node in the console we usually use `ctr+c`, but in a program we ned some way to shut down the program for special reasons.
We can access the `process` core module which has some handy methods and functionality.
We can exit from a Node.js program using `process.exit(1)`.
When Node.js runs this line, the process is immediately forced to terminate.

This means that any callback that's pending, any network request still being sent, any filesystem access, or processes writing to stdout or stderr - all is going to be ungracefully terminated right away.

The exit method receives one argument, a number. By default it receives `0` which means success.
Read more on exit codes at [Exit codes](https://nodejs.org/api/process.html#process_exit_codes)

_This is a simple `Node Express` application_

```js
import express from "express"

const app = express()

const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.send("Welcome")
})

const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process has been shut down")
  })
})
```

If we would use `process.exit()` here we would not be able to shut down the process.
Instead we use the `process.on()` method here to terminate the request when we are done.

> `SIGTERM` is the signal that tells a process to gracefully terminate. It is one of many different signals that are sent from process managers like upstart for example.

---

## [Resources](#resources)

- [Nodejs.dev](https://nodejs.dev/)
- [Nodejs.org](https://nodejs.org/en/)
