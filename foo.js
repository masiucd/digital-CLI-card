const fruits = ["apple", "banana", "orange", "date", "tomato", "pineapple"]

const xs = fruits.filter(x => {
  return x.toLowerCase().indexOf("da") !== -1
})
console.log(xs)

console.log("app".indexOf("ab"))
