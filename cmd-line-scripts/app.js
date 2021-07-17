#! /usr/bin/env node
import minimist from "minimist"
import fs from "fs"
import path from "path"
import util from "util"
import getStdin from "get-stdin"
import {fileURLToPath} from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// run in your shell ➜ chmod u+x app.js, if you have a unix shell like bash or zsh

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname)

const argv = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
})

function init(argv) {
  switch (true) {
    case argv.help:
      help()
      break
    case argv.in || argv._.includes("-"):
      // async
      // ➜ cat hello.txt | ./app.js --in
      getStdin().then(processFile).catch(error)
      break
    case argv.file !== undefined:
      fs.readFile(path.join(BASE_PATH, argv.file), (err, data) => {
        if (err) {
          error(err.message.toString())
        }
        processFile(data + "\n")
      })
      break
    default:
      error("Incorrect usage", true)
  }
}

init(argv)

function help() {
  print("app cmd script                  usage: \n\n")
  print("\n")
  print("--file={FILE_NAME}              process file \n")
  print("\n")
  print("--help                          to get some help \n")
  print("\n")
  print("--in,                           process stdin\n")
  print("\n")
}

function processFile(contents) {
  print(contents + "\n")
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

/**
 *
 * @param {string} arg
 */
function print(arg) {
  arg = arg.toUpperCase()
  process.stdout.write(arg)
}
