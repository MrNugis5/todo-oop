import express from "express"
import bodyparser from "body-parser"


const app = express()
app.use(bodyParser.json())

app.get("/json-test", (req, res) => {
    res.send({
        message: "json ok"
    }) 
} )

app.listen(3009, () => {
    console.log("Started at 3009");
    
} )