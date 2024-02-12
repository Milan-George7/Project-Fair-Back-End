//defining connection
//importing mongoose
const mongoose = require('mongoose')
const connectionString = process.env.connectionString
mongoose.connect(connectionString).then(()=>{
    console.log("MongoDB Atlas Connected with PFServer");

}
).catch((err)=>{
    console.log("MongoDB Connection Failed!!!",err);
})