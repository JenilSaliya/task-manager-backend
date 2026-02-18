// import mongoose from 'mongoose'
// import config from './config.js'

// // connect to database 
// const connectDB = async () => {

//     try {
        
//         const con = await mongoose.connect(config.db_URI)

//     } 
//     catch (err) {

//         console.log(`Database connect error: ${err.message}`)
//         process.exit(1)
        
//     }
// }

// connectDB()
// export default connectDB

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connect error:", err.message);
    process.exit(1);
  }
};

export default connectDB;