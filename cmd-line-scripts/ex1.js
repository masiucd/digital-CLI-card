#! /usr/bin/env node
import minimist from "minimist"
import path from "path"
import {fileURLToPath} from "url"
import fs from "fs"
const __dirname = fileURLToPath(import.meta.url)

// *********************

function yoHelp() {
  process.stdout.write("ex1 usage:")
  process.stdout.write(" ex1.js --file={FILENAME}\n")
  process.stdout.write("--help          print this help\n")
  process.stdout.write("--file={FILENAME}          process the file\n")
}

const args = minimist(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
})

function init(args) {
  switch (true) {
    case args.help && args.file !== undefined:
      processFile(path.resolve(args.file))
      yoHelp()
    case args.help:
      // to make it excitable
      // run in your shell ➜ chmod u+x ex1.js, if you have a unix shell like bash or zsh
      yoHelp()
      break
    case args.file !== undefined:
      processFile(path.resolve(args.file))
      break

    default:
      error("incorrect usage", true)
  }
}

function error(message, includeHelp = false) {
  console.error(message)
  if (includeHelp) {
    yoHelp()
  }
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8")
  process.stdout.write(content + "\n")
}

init(args)
