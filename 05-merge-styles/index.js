const fs = require('fs');
const path = require('path');
const dirStyles = path.join(__dirname, 'styles');
const writeStream = new fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');

const infoFolder = async (dirFolder) => {
    const files = await fs.promises.readdir(dirFolder, {
        withFileTypes: true
    });
    for (const file of files) {
        if (file.isFile() && path.extname(file.name) === '.css') {
            let directory = path.join(dirFolder, file.name);
            const stream = new fs.createReadStream(directory, 'utf-8');
            stream.on('data', (data) => writeStream.write(data));
        }
    };
};

// function stylesFile(directory, arr) {
//     const stream = new fs.createReadStream(directory, 'utf-8');
//     stream.on('readable', function () {
//         const data = stream.read();
//         if (data !== null) return arr.push(data.toString());
        
//     });
//     console.log(arr);
// }

infoFolder(dirStyles);