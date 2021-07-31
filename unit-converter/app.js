#! /usr/bin/env node
import minimist from "minimist"

function yoHelp() {
  console.log("Welcome to unit converter              ----> ")
  console.log(
    "Convert one unit to another unit                 ---->  --amount={amount}{unit}  --unit"
  )
  console.log("for example                            ---->  --amount=1000kg  --g")
}

const argv = minimist(process.argv.slice(2), {
  boolean: ["kg", "lbs", "g", "help"],
  string: ["amount"],
})

const toInt = n => parseInt(n, 10)
const getLastTwoLetters = s => s.slice(s.length - 2)
const getLastLetter = s => s.slice(s.length - 1)

const cutString = (s, len) => s.slice(0, len)

const formatInput = str => {
  switch (true) {
    case getLastTwoLetters(str) === "kg":
      return cutString(str, str.length - 2)
    case getLastLetter(str) === "g":
      return cutString(str, str.length - 1)
    default:
      break
  }
}
const kgToGram = n => toInt(n) * 1000
const gramToKg = n => toInt(n) / 1000

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
