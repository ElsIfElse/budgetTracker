const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();
const expenseRoute = require('./routes/expenses');
const connectDb = require('./db/connect')
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/input',(req,res)=>{
    res.sendFile(path.join(__dirname,'./input.html'))
})
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/display.html'))
})

app.use('/api/v1',expenseRoute)

const main = async function(){
    try {
        await connectDb(process.env.dbURI)
        console.log('Connected to database...')
        app.listen(5000,()=>{
            console.log('Server is listening on port 5000...')
        })
    } catch (error) {
        console.log(error)
    } 
}

main()