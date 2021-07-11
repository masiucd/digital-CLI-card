import fs from "fs"

const readStream = fs.createReadStream("./dataInput.txt")

const writeStream = fs.createWriteStream("./dataOutput.txt")
writeStream.write("fooo+\n")

readStream.on("data", data => {
  // or console.log(data.toString())
  process.stdout.write(data + "\n")
})
