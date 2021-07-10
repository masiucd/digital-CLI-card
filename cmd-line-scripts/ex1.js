#! /usr/bin/env node
import minimist from "minimist"

// *********************

function yoHelp() {
  console.log("ex1 usage:")
  console.log(" ex1.js --help")
  console.log("")
  console.log("--help          print this help")
  console.log("")
}

const args = minimist(process.argv.slice(2), {
  boolean: ["help"],
  string: ["file"],
})

function init(args) {
  switch (true) {
    case args.help && args.file !== undefined:
      console.log(args.file)
      yoHelp()
    case args.help:
      // to make it excitable
      // run in your shell ➜ chmod u+x ex1.js, if you have a unix shell like bash or zsh
      yoHelp()
      break
    case args.file !== undefined:
      console.log(args.file)
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

init(args)
