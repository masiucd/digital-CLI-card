import {readFile, writeFile} from "fs/promises"
import minimist from "minimist"

const argv = minimist(process.argv.slice(2), {
  boolean: ["fallback"],
  string: ["email", "fullName", "age"],
})

// console.log(import.meta.url) // like __dirname.
const getFallbackInfo = () => ({
  email: "masiu@ex.com",
  fullName: "Marcell",
  age: 26,
})

const getInputArgs = () => {
  if (argv._.length < 3) {
    throw new Error(
      "Please fill all the input fields using: \n email='{email}'  fullName='{fullName}' age='{age}'\n"
    )
  }
  return argv._.map(x => x.split("=")).reduce((obj, [key, value]) => {
    if (!obj[key]) {
      obj[key] = value
    }
    return obj
  }, {})
}

const init = async () => {
  try {
    let file = await readFile(new URL("contract.txt", import.meta.url), "utf-8")
    for (const [key, value] of Object.entries(getInputArgs())) {
      file = file.replace(key, value)
      file = file.replace(/[{\\}\\]/g, "")
    }
    await writeFile(new URL("filled.txt", import.meta.url), file)
  } catch (err) {
    console.log(err.message)
  }
}
init()
