const express = require('express')
const app = express()
const PORT = '3000'

// Array of objects that will contain each task 
const tasks = []

// Get request handler for getting every todo element
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks)
})



// Starting the server
app.listen(PORT, () => 
{
    console.log(`Listening at port ${PORT}`)
})
    