import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// **************
// pipe streams
// let's read a file through streams and pipe it into another text file using streams

fs.createWriteStream(path.join(__dirname, "dataInput.txt")).write("hellow world\n")

const a = fs.createReadStream(path.join(__dirname, "dataInput.txt"))
const b = fs.createWriteStream(path.join(__dirname, "dataOutput.txt"))
a.pipe(b)

fs.readFile(path.join(__dirname, "dataOutput.txt"), "utf8", (err, data) => {
  if (err) {
    console.error(err.message)
    return
  }
  process.stdin.write(data)
})
