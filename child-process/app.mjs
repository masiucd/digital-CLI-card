import express from "express"
import {fork} from "child_process"
import path from "path"
import {fileURLToPath} from "url"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get("/isprime", (req, res) => {
  const childProcess = fork("./is-prime.js")
  // send to childProcess
  childProcess.send({number: parseInt(req.query.number)})
  // retrieve from childProcess
  childProcess.on("message", message => res.send(message))
})

app.listen(5000, () => console.log("Listening on 5000"))
