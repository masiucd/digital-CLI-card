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
    case str.slice(str.length - 2) === "kg":
      return str.slice(0, str.length - 2)
    case str.slice(str.length - 1) === "g":
      return str.slice(0, str.length - 1)
    default:
      break
  }
}
const kgToGram = n => toInt(n) * 1000
const gramToKg = n => {
  console.log("n", n)
  return toInt(n) / 1000
}

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
  let result
  switch (true) {
    case amount && isValidInput(amount) && g:
      console.log("converting to grams")
      result = kgToGram(formatInput(amount)) + "g"
      console.log(`${amount} in grams = `, result)
      break
    case amount && isValidInput(amount) && kg:
      console.log("converting to kg")
      result = gramToKg(formatInput(amount)) + "kg"
      console.log(`${amount} in kg = `, result)
      break
    case help:
      yoHelp()
      break
    default:
      yoHelp()
  }
}

init(argv)
