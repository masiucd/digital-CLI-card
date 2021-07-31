#! /usr/bin/env node
import minimist from "minimist"

function yoHelp() {
  console.log("Welcome to unit converter              ----> ")
  console.log(
    "Convert one unit to another unit                 ---->  --amount={amount}unit  --unit"
  )
}

const argv = minimist(process.argv.slice(2), {
  boolean: ["kg", "lbs", "g", "help"],
  string: ["amount"],
})

const toInt = n => parseInt(n, 10)

const formatInput = str => {
  switch (true) {
    case str.includes("kg"):
      return str.slice(0, str.length - 2)
    default:
      break
  }
}
const kgToGram = n => toInt(n) * 1000

const isValidInput = input => {
  switch (true) {
    case input.slice(input.length - 2) === "kg":
      return true
    case input.slice(input.length - 2) === "lbs":
      return true
    case input.slice(input.length - 1) === "g":
      return true
    default:
      return false
  }
}

function init({kg, lbs, help, g, amount}) {
  switch (true) {
    case amount && isValidInput(amount) && g:
      console.log("converting to grams")
      const result = kgToGram(formatInput(amount)) + "g"
      console.log(`${amount} in grams = `, result)
      break
    case help:
      yoHelp()
      break
    default:
      yoHelp()
  }
}

init(argv)
