const moongoose = require('mongoose');

moongoose.connect("mongodb://localhost:27017/myRegistrationList",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`connection successful`);
}).catch((error)=>{
    console.log(`no connection`);
})
