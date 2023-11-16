const app = require("./app");
const {PORT} = require("./config/serverConfig")

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)
})