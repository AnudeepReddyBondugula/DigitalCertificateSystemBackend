
const {saveData, getData, saveFile} = require("../src/services/IpfsManager");
const fs = require("node:fs");
async function main () {
    const cid = await saveFile("tmp/pdfs/matlab1.pdf");

    console.log(cid);

    const data = await getData(cid);
    console.log(data);
}

main();