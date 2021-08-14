const express = require('express');
const path = require('path');
const app = new express();
const hbs = require('hbs');

require('./db/conn');
const Register = require('./models/register')

const port  = process.env.PORT || 3000;

const static_path = path.join(__dirname,'../public');
const views_path = path.join(__dirname,'../Templates/views')
const partials_path = path .join(__dirname,'../Templates/partials');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set('views',views_path)
app.set('view engine',"hbs");
hbs.registerPartials(partials_path)


app.get('/',(req,res)=>{
    res.render("home"); 

})

app.get('/register',(req,res)=>{
    res.render("register");

})

//create a new user in our database
app.post('/register',async (req,res)=>{
    try{

        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        if(password === confirmPassword){
            const registerEmployee = new Register({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email: req.body.email,
                gender:req.body.gender,
                phone:req.body.phoneNumber,
                age:req.body.age,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword
            })
        const registerd = await registerEmployee.save();
        res.status(201).render("home");

        }else{
            res.send("passwords are not matching");
        }
        

    }catch(error){
        res.status(400).send(error);
    }
})

app.get('/login',(req,res)=>{
    res.render("login");

})

app.listen(port,'127.0.0.1',()=>{
    console.log(`listening at port ${port}`);
})  