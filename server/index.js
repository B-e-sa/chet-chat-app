require('dotenv').config()
PORT = process.env.PORT

const userRoutes = require('./routes/userRoute')

const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose');

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth", userRoutes)


mongoUrl = process.env.MONGO_URL

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Sucefully connect to DB')
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})



