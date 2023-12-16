require("dotenv").config();
const fs = require("fs/promises")
async function main() {
    console.log(process.env.UPLOAD_PATH)
    const data = await fs.readFile(process.env.UPLOAD_PATH + "matlab1.pdf");
    console.log(data);
}

main();