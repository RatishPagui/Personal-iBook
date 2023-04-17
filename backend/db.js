const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&directConnection=true&ssl=false"


const connectToMongo = async () => {
    // mongoose.connect(mongoURI, () => {
    //     console.log("Connected to MongoDB successfully")
    // })
    try {
       const connect = await mongoose.connect(mongoURI);
       console.log("Connected to MongoDB successfully")
    } catch (error) {
       console.log(error) 
    }
}

module.exports = connectToMongo;