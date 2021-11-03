const fs = require('fs');
const path = require('path');
const process = require('process');
const dirFolder = path.join(__dirname, 'secret-folder');

const infoFolder = async(dirFolder) => {
    const files = await fs.promises.readdir(dirFolder, {withFileTypes: true});
    for (const file of files) {
        if(file.isFile()) infoFile(file);
    }
};

const infoFile = async(file) =>{
    let fileType = path.extname(file.name);
    let fileName = path.basename(file.name, fileType);
    let filePatch = path.join(dirFolder, file.name);
    let size = (await fs.promises.stat(filePatch)).size / 1024;
    let sizeKb = Math.ceil(size)
    process.stdout.write(` ${fileName} - ${fileType} - ${sizeKb}kb\n `);
}
infoFolder(dirFolder);