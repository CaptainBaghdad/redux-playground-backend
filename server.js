let express = require('express');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let mongoose = require('mongoose');
let cors = require('cors');
let app = express();
let PORT = 3040;
const saltRounds = 10;


mongoose.connect('mongodb://127.0.0.1/trucker', {useNewUrlParser: true})
let Schema=  mongoose.Schema;
let DriverSchema = new Schema({
    name: String,
    email: String,
    password: String,
    companyName: String,
    exp: Number,
    trailer: String



})

const Driver = mongoose.model('drivers', DriverSchema);
app.use(bodyParser());
app.use(cors());

app.post('/register', (req, res) =>{
    console.log(req.body.name)
    if(req.body.name){
        bcrypt.hash(req.body.password, saltRounds, function(err, hash){

            new Driver({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                companyName: req.body.companyName,
                exp: req.body.exp,
                trailer: req.body.trailer
            })
            .save((err, savedDriver) =>{
                if(err){
                    console.log(err)
    
                }
                console.log(`This is the hased password ${hash}`);
                res.send(savedDriver)
            })
    

        })
     
    }



});


app.listen(PORT, () =>{
    console.log('Server is listening on port 3040')
})

