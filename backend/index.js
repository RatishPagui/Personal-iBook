const connectToMongo = require('./db')
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000

connectToMongo();

app.use(express.json());
app.use(cors())


// app.get('/', (req,res) => {
//     res.send("Hello Ratish")
// })
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.listen(port,
    console.log("Server running on port 5000"))