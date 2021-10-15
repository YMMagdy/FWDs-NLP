// import path from "path"
// import body-parser from "body-parser";
// import * as fetch from "node-fetch"
// import sendFile from "node"
// import dotenv from 'dotenv';
// dotenv.config();
// import cors from "cors"
const dotenv = require('dotenv')
dotenv.config()
var path = require('path')
// import express from 'express'//Done
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const fetch=require('node-fetch')


const app = express()
// const cors=require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use(express.static('dist'))

console.log(__dirname)

const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const key=process.env.API_KEY

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT || 8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api',async function(req,res){
    let input=req.body.url
    console.log('Input is', input)
    const url=`${baseURL}key=${key}&url=${input}&lang=en`
    const response=await fetch(url)
    const data=await response.json() 
    res.send(data)
})
