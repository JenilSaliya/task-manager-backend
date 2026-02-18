import dotenv from "dotenv"
dotenv.config()

// store all env in config 
const config = {

    host_URI: process.env.Host_URI,
    db_URI: process.env.Mongo_URI+"TMS",
    port:process.env.port,
    React_URI:process.env.React_URI
    
}


export default config