import {createServer} from "net"

const server = createServer(c => {
  console.log("client connected")
  c.on("data", data => {
    // data is a buffer
    console.log(`data received ${data.toString()}`)
  })
  c.on("end", () => {
    console.log("Client is disconnected")
  })
})

server.listen(5000, () => console.log("server has started"))

/**
 * run node app.js
 * in another tab from the terminal write = ➜ nc localhost 5000
 * and print  a message
 * got to the first tab to view the message
 */
