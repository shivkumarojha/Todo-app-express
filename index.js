// Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// Importing uuid for uniquely give id to each task
const { v4: uuidv4 } = require('uuid')

// Port 
const PORT = '3000'

// MiddleWare for bodyParser
app.use(bodyParser.json())

// Array of objects that will contain each task 
const tasks = []

// Get request handler for getting every todo element
app.get('/api/v1/tasks', (req, res) => {
    res.status(200). json(tasks)
})


// Creating a new task in todo app
app.post('/api/v1/tasks', (req, res) => {
    const title = req.body.title
    const details = req.body.details
    const date = req.body.date
    const time = req.body.time
    const repeat = req.body.repeat

    task = {
        id: uuidv4(),
        title: title,
        details: details,
        date: date,
        time: time,
        repeat: repeat
    }
    tasks.push(task)
    res.status(201).json(task)

})



// Starting the server
app.listen(PORT, () => 
{
    console.log(`Listening at port ${PORT}`)
})
    