const fs = require("fs")
const INFURA_ID="";
const INFURA_SECRET_KEY=""
const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
async function ipfsClient() {  //creating ipfs client
    const { create } = await import("ipfs-http-client");
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
              headers: {
               authorization: auth, // infura auth credentails
           },
        }
    );
    return ipfs;
}


async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome ${new Date()}`);
    console.log(result);
}
//saveText();

async function saveFile() { //storing up the file to the ipfs

    let ipfs = await ipfsClient();

    let data = fs.readFileSync("./package.json")
    let options = {
        warpWithDirectory: false,
        progress: (prog) => console.log(`Saved :${prog}`)
    }
    let result = await ipfs.add(data, options);
    //let result = await ipfs.add({path:"abc.txt", content:"hello usama"});
    console.log(result)
}
//saveFile()

async function getData(hash) {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat(hash)

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data)
    }
}
getData("")