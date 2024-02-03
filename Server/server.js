const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoute');
const { default: mongoose } = require('mongoose');
const cors = require('cors')

mongoose.connect("mongodb+srv://Shashwatmishra2411:niceninja467@cluster0.fdscgv8.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("connection established")
})

app.use(express.json())
app.use(cors())
app.use(express.static('./dist'))

app.use('/',userRoutes)

app.listen(3000, (port)=>{
    console.log("Server is running on port ", 3000)
})