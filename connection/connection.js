const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

console.log(String(process.env.MONGO_URI))


const connectDB = async () => {
    try {
        //connecting to mongoDB : String
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Mongo DB has successfully connected : ${con.connection.host}`)

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB