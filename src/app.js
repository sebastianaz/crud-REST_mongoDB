const express = require("express");
const app =express();

const morgan = require('morgan')
const path = require('path');
const mongoose = require('mongoose');
const indexRoutes = require('./routes/index');

// connecting db
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('Db con'))
    .catch(err => console.log(err))
//settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'))
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended: false}));

//middlewares
app.use(morgan('dev'));
//routes
app.use('/',indexRoutes)

app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'))
})

