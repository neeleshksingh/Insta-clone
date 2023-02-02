const express = require('express')
const connection = require('./connection/connection')
const userRoutes = require('./routes/user')
const cors = require('cors')
connection()

const app = express()



app.use(cors())
app.use(userRoutes)

app.get("*", (req, res) => {
    res.status(404).send("API IS NOT FOUND");
})

app.listen(1517, () => { console.log("Listening on port 1517") })