import fs from "fs"
import path from "path"

// With Callbacks
fs.readFile(path.resolve("io", "./text.txt"), (err, buffer) => {
  if (err) {
    console.log("ohh nooo")
    console.error(err)
    process.exit(1)
  }

  const file = buffer.toString()
  console.log(file)
})

// With Promises
fs.promises
  .readFile(path.resolve("io", "./text.txt"))
  .then(buffer => console.log(buffer.toString()))
  .catch(err => console.error(err))

const readFileAsync = async (folder, textFile) => {
  try {
    const buffer = await fs.promises.readFile(path.resolve(folder, textFile))
    const file = await buffer.toString()
    return file
  } catch (err) {
    console.log("Ohh noo")
    console.error(err.message)
  }
}

;(async () => {
  let res = await readFileAsync("io", "./text.txt")
  console.log(res)
})()
