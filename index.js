import express from "express"
import todoRoutes from "./routes/todos.js"

const app = express()
app.use(express.json())

app.use("/todos", todoRoutes)

app.use(express.urlencoded({ extended: true }))

app.get("/json-test", (req, res) => {
    res.send({
        message: "json ok"
    })
})

app.listen(3009, () => {
    console.log("Started at 3009")
})