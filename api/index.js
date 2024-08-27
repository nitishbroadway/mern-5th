const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use((req, res) => {
    res.send('Hi')
})

app.listen(5000, async () => {
    console.log('Server started at http://localhost:5000')
    console.log('Press Ctrl+C to stop')
    await mongoose.connect("mongodb://127.0.0.1:27017/mern-vci5")
    console.log('MongoDB connected')
})