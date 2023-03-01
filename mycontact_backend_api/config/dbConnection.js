const mongoose = require('mongoose');
connection_string = "mongodb+srv://sohaib:sohaib5544@cluster0.tyffpor.mongodb.net/mycontacts-backend?retryWrites=true&w=majority";
const connectDb = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connect = await mongoose.connect(connection_string);
        // const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connection Established Successfully", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log("Error to connect the DB : ", error);
        // process.exit(1) is often used to terminate the application if there is an error connecting to the database. 
        process.exit(1);
    }
}

module.exports = connectDb;

