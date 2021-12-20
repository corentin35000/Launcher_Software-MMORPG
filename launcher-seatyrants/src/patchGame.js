const https = require('https');
const fs = require('fs');
const { net } = require("electron");

module.exports = async() => {
    const request = net.request('http://localhost:4242/patchgame')

    await request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`)

        response.on('data', async(data) => {
            console.log(`BODY: ${data}`)

            let result = JSON.parse(data)
            let i = 0;
            while (i < result.length)
            {
                // Récupère le chemin du dossier ou fichier
                const nameFileOrDir = String(result[i]).substr(9, result[i].length);

                // Regarde si il y a une extension (donc sera un fichier et pas un dossier)
                const typeFile = nameFileOrDir.includes(".");

                if (typeFile === true) {
                    // Telecharge un fichier
                    await download('https://seatyrants.com/' + result[i], '../jeu/' + nameFileOrDir);
                    console.log("New File successfully created.")
                }
                else {
                    // Creer un dossier
                    if (! fs.existsSync('../jeu/' + nameFileOrDir)){
                        await fs.mkdir('../jeu/' + nameFileOrDir, (err) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log("New directory successfully created.")
                            }
                        })
                    }
                }

                i++;
            }
        })
    })

    request.end();
}

const download = (url, dest, cb) => {
    const file = fs.createWriteStream(dest);

    const request = https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close(cb);
        });
    });
}