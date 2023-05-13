const { default: axios } = require('axios');
const fs = require('fs');
const { nextTick } = require('process');
const process = require('process');
const argv = process.argv

function read(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Can't read file, error: ${err}`);
            process.exit(1);
        }
        data = data.split("\n");
        getURLData(data);
    })
}

async function getURLData(data, next) {
    for (url of data) {
        if (url[0] === 'h') {
            try {
                let content = await axios.get(url);
                write(url, content.data);
            } catch (err) {
                console.error(`Couldn't download ${url}`);
            }
        }
    }
}

async function write(url, content, next) {
    const file = url.split('/');
    const hostname = file[2];
    try {
        await fs.writeFile(hostname, content, function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Wrote to ${hostname}`)
        })
    } catch (err) {
        console.error(`Couldn't write ${hostname}`);
    }
}

read(argv[2])