process.on("message", message => {
  // retrieve message from parent
  const result = isPrime(message.number)
  const jsonResponse = {
    number: message.number,
    isPrime: result ? "yes" : "no",
  }
  // send message to parent
  process.send(jsonResponse)
  process.exit()
})

function isPrime(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false
    }
  }
  return n > 1
}
