#! /usr/bin/env node
import fetch from "node-fetch"
import minimist from "minimist"
import fs from "fs"
import path from "path"

const BASE_URL = "https://swapi.dev/api/"
const PEOPLE = "people"
const PLANETS = "planets"
const STAR_SHIPS = "starships"

const printPeople = () =>
  ["luke", "c-3po", "dart vader"].forEach((p, i) => console.log(" ".repeat(i + 3) + p))

const argv = minimist(process.argv.slice(2), {
  boolean: ["help", "people-list"],
  string: [PEOPLE, STAR_SHIPS, PLANETS],
})

const getItem = (endPoint, id) => {
  fetch(BASE_URL + endPoint + id)
    .then(res => res.json())
    .then(r => console.log(r))
}

if (argv.help) {
  help()
}
if (argv["people-list"]) {
  printPeople()
}
if (argv.people) {
  if (argv.people.toLowerCase() === "luke") {
    getItem(PEOPLE, "/1")
  }
  if (argv.people.toLowerCase() === "c-3po") {
    getItem(PEOPLE, "/2")
  }
  if (argv.people.toLowerCase() === "darth vader") {
    getItem(PEOPLE, "/4")
  }
}

function help() {
  console.log("                                   Welcome to Star wars CLI \n")
  console.log("                                   to fetch star wars character simply run:\n")
  console.log(
    "                                                         --people={name}  for example --people='luke'"
  )
  console.log("                                  run --people-list to print list of characters")
  console.log("                                  --help to get help")
}
