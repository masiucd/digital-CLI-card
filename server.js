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
