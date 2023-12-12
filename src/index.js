const app = require("./app");
const {PORT} = require("./config/serverConfig");
const connectMongodb = require("./config/dbConfig");

connectMongodb()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`)
    })
})
    
