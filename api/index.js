const express = require('express')

const app = express()

app.use((req, res) => {
    res.send('Hi')
})

app.listen(5000, () => {
    console.log('Server started at http://localhost:5000')
    console.log('Press Ctrl+C to stop')
})