#! /usr/bin/env node
import minimist from "minimist"
import fs from "fs"
import path from "path"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// run in your shell ➜ chmod u+x app.js, if you have a unix shell like bash or zsh

const argv = minimist(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
})

function init(argv) {
  switch (true) {
    case argv.help:
      help()
      break
    case argv.file !== undefined:
      processFile(argv.file)
      break
    default:
      error("Incorrect usage", true)
  }
}

init(argv)

function help() {
  print("app cmd script  usage: \n\n")
  print("\n")
  print("--file={FILE_NAME} \n")
  print("\n")
  print("run --help to get some help \n")
  print("\n")
}

function processFile(filePath) {
  const file = fs.readFileSync(path.join(__dirname, filePath), "utf-8")
  print(file + "\n")
}

/**
 *
 * @param {string} message
 */
function error(message, needHelp = false) {
  console.error(message)
  if (needHelp) {
    print("\n\n")
    help()
  }
}

function print(arg) {
  process.stdout.write(arg)
}
