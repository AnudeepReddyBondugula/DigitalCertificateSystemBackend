const {getData, saveData} = require("../src/services/IpfsManager")

async function main () {
    const data = "Hello World!";
    const cid = await saveData(data);
    console.log(`"CID : ${cid}`)
    const result = await getData(cid);
    console.log(`Result: ${result}`);
}

main();