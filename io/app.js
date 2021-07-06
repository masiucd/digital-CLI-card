import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
console.log({__filename})
console.log(path.dirname(__filename))
console.log(process.cwd())
