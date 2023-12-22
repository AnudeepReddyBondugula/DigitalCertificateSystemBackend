// Importing the Express application
const app = require("./app");

// Importing the PORT constant from the "serverConfig" module
const {PORT} = require("./config/serverConfig");

const connectMongodb = require("./config/dbConfig");

// Establishing a connection to MongoDB
connectMongodb()
.then(() => {

    // Once connection established, start the Express server
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})
    
