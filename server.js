// import our dependencies
const express = require("express")
const app = express()
const mysql = require ('mysql2')
const dotenv = require('dotenv')


// configure environment varriables
dotenv.config();

// create a connection object
const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
})

// test connection
db.connect((err) =>{
    // if the connection is not successfull
    if(err) {
        return console.log("Error connectiong to the database: ",err)
    }
    // if the connection is successfull
    console.log("successfully connected to MSQL: ", db.threadId)
})

//  get. this is used to retieve data in a database
// post--- it is used to insert
// put------this is used to update
// delete-----delete is used to delete a data from the database

// This is not important for the asignment
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// Retrieve all patients
app.get('/patient', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("failed to get patients", err)
        }

        res.status(200).render('data', { data })
    })

})


app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("failed to get providers", err)
        }

        res.status(200).render('data', { data })
    })

});


app.get('/patient', (req, res) => {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("failed to get patients", err)
        }

        res.status(200).render('data', { data })
    })

})


app.get('/providers', (req, res) => {
    const getPatients = "SELECT provider_specialty FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("failed to get providerSpecialty", err)
        }

        res.status(200).render('data', { data })
    })

})





// create basic end point to say hello world
// app.get('/', (req, res) => {
// res.send("Hello World, Stella is writing her first backend code!") 
// })


// start and listen to the server
app.listen(3300, () => {
    console.log('server is running on port 3300...')
})


