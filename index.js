// implement your API here

const express = require('express'); // import the express package
const db = require('./data/db') // brings data from db.js file.

const server = express(); // creates the server
server.use(express.json())


// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});


//Post

server.post('/api/users', (req, res) => {
   const user = req.body 
   db.insert(user)
   .then(
       user =>{
           res.status(201).json(user)
       }
   ).catch( err => {
       res.status(500).json({error: err, message: 'could not retrieve user!'})
   })
})

// Get /api/users

server.get('/api/users', (req, res) => {
    db
        .find()
        .then(db => {
            res.status(200).json(db)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'There was an error while saving the user to the database.'})
        })
})



// Get /api/users/:id

server.get('/api/users/:id', (req, res) => {
    const getId = req.params.id


    db
        .findById(getId)
        .then(user => {
            if ( user ) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(404).json({ error: err, message: 'The user information could not be retrieved.' })
        })
})

server.delete('/api/users/:id', (req, res)=>{
    const UserId = req.params.id
    db.remove(UserId)
    .then( user =>{
        if(user){
            db.remove(UserId).then(
                removeruser => {
                    res.status(201).json(removeruser)
                }
            )
        }else{
            res.status(404).json({ error: err, mesage : "The user with specified ID does no exist"})
        }
    })
    .catch(error =>{
        res.status(500).json({  message: "The user could not be removed"})
     })
})
server.put('/api/users/:id', (req, res) => {

    const userId =req.params.id
    const userBody = req.body 
    db.update(userId, userBody)
    .then( user =>{
        if(user){
            db.findById(userId).then(
                userupdate=> {
                    res.status(201).json(userupdate)
                }
            )

        }else{
            res.status(400).json({ error : err, message : "not found" })
        }
    })
    .catch(error =>{
        res.status(404).json({ message: 'Not Found'})
     })

})





server.listen(5000, () => {
    console.log('\n  API Running on Port 5000... \n')
})