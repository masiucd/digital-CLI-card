#! /usr/bin/env node
import minimist from "minimist"
import fs from "fs"
import path from "path"
import util from "util"
import stream from "stream"
import {fileURLToPath} from "url"
import zlib from "zlib"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const {Transform} = stream

// run in your shell ➜ chmod u+x app.js, if you have a unix shell like bash or zsh

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname)
let OUTPATH = path.join(BASE_PATH, "out.txt")

const argv = minimist(process.argv.slice(2), {
  boolean: ["help", "in", "out", "compress"],
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
      processFile(process.stdin)
      break
    case argv.file !== undefined:
      let filePath = fs.createReadStream(path.join(BASE_PATH, argv.file))
      processFile(filePath)
      break

    default:
      error("Incorrect usage", true)
  }
}

init(argv)

function help() {
  console.log("app.js usage:")
  console.log("")
  console.log("--help                      print this help")
  console.log("-, --in                     read file from stdin")
  console.log("--file={FILENAME}           read file from {FILENAME}")
  console.log("--uncompress                uncompress input file with gzip")
  console.log("--compress                  compress output with gzip")
  console.log("--out                       print output")
  console.log("")
  console.log("")
}

function processFile(inStream) {
  let stream = inStream
  let outStream

  if (argv.uncompress) {
    let gunzip = zlib.createGunzip()
    stream = stream.pipe(gunzip)
  }

  let upperStream = new Transform({
    /**
     *
     * @param {Buffer} chunk
     * @param {any} enc
     * @param {()=>void} next
     */
    transform(chunk, enc, next) {
      this.push(chunk.toString().toUpperCase())
      setTimeout(next, 500)
      // next()
    },
  })

  stream = stream.pipe(upperStream)

  if (argv.compress) {
    OUTPATH = `${OUTPATH}.gz`
    let gzipStream = zlib.createGzip()
    stream = stream.pipe(gzipStream)
  }

  if (argv.out) {
    outStream = process.stdout
  } else {
    outStream = fs.createWriteStream(OUTPATH)
  }

  stream.pipe(outStream)
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
