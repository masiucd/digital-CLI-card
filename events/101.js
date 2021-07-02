import events from "events"

const EventEmitter = events.EventEmitter

const myEventEmitter = new EventEmitter()

myEventEmitter.once("newListener", (event, fn) => {
  console.log({event})
  if (event === "run") {
    myEventEmitter.on("run", () => {
      console.log("Legia")
    })
  }
})

myEventEmitter.on("run", () => {
  console.log("CWKS")
})

myEventEmitter.emit("run")
