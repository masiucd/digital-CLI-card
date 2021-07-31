import minimist from "minimist"

function yoHelp() {
  console.log("Welcome to unit converter       ---------------------->")
}

const argv = minimist(process.argv.slice(2), {
  boolean: ["kg", "lbs", "g", "help"],
  string: ["amount"],
})

console.log(argv)

const toInt = n => parseInt(n, 10)

const formatInput = str => {
  switch (true) {
    case str.includes("kg"):
      return str.slice(0, str.length - 2)
    default:
      break
  }
}
const kgToGram = n => toInt(n) / 1000

function init({kg, lbs, help, g, amount}) {
  switch (true) {
    case kg:
      console.log("in kg")
      break
    case lbs:
      console.log("in lbs")
      break
    case amount.includes("kg") && g:
      console.log("converting to grams")
      const result = kgToGram(formatInput(amount)) + "g"
      console.log("result", x)
      break
    case help:
      yoHelp()
      break
    default:
      yoHelp()
  }
}

init(argv)
