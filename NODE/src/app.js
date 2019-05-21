const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/userModel');
const userRouter = require('./routes/userRouter')(User);

const app = express();
const db = mongoose.connect('mongodb://localhost/usersData', { useNewUrlParser: true })

/* app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin' , '*');
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.append('Access-Control-Allow-Credentials', true);
    next();
}); */

app.use(cors())

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`My port is listening on ${port}`));

app.use('/api',userRouter);
app.get('/',(req,res)=>{
    res.redirect('/api')
})