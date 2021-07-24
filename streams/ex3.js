import {Readable} from "stream"

const readableStream = new Readable({
  read() {
    this.push("Hello ")
    this.push("World \n")
    this.push("Again ")
    this.push("Hello \n")
    this.push(null) // stop
  },
})

readableStream.pipe(process.stdout)
