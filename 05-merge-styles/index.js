
// const fs = require('fs');
// const path = require('path');
// const dirStyles = path.join(__dirname, 'styles');

// const infoFolder = async (dirFolder) => {
//     const files = await fs.promises.readdir(dirFolder, {
//         withFileTypes: true
//     });
//     for (const file of files) {
//         if (file.isFile() && path.extname(file.name) === 'css') {
//             const stream = new fs.createReadStream(dirFolder, 'utf-8');
//             stream.on('readable', function () {
//                 const data = stream.read();
//                 if (data !== null) console.log(data);
//             });
//         }
//     }
// };
// infoFolder(dirStyles);