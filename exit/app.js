import express from "express"

const app = express()

const PORT = process.env.PORT || 8080

app.get("/", (req, res) => {
  res.send("Welcome")
})

const server = app.listen(PORT, () => console.log(`server listening on port ${PORT}`))

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process has been shut down")
  })
})
