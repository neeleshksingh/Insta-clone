const mongoose = require('mongoose')
mongoose.set(`strictQuery`, true)
async function getConnection() {
    const uri = `mongodb+srv://Neelesh:Neelesh@cluster0.wsbqnfe.mongodb.net/?retryWrites=true&w=majority`
    await mongoose.connect(uri, (err)=>{
        if(err){
            console.log("Connection to mongoDB failed");
        }
        else{
            console.log("Connected to MongoDB successfully");
        }
    })
}
module.exports = getConnection