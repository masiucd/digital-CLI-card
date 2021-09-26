import http from "http"
import fs from "fs"
import path from "path"
import {fileURLToPath, parse} from "url"

const __filename = fileURLToPath(import.meta.url)

const server = http.createServer()

server.on("listening", () => console.log("listening...🚀"))
server.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")

  if (req.url === "/isprime") {
    const {query} = parse(req.url, true)
    console.log({query})
    console.log(query.number)
    const isNumberPrime = isPrime(parseInt(query.number, 10))
    res.end(fs.readFileSync(path.join(path.dirname(__filename), "/index.html")))
    return
  }
})

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return true
}

server.listen(5000)
