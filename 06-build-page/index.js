const fs = require('fs');
const path = require('path');


const creatHtml = async(foldrName) => {
    await fs.promises.rmdir(foldrName, {
        recursive: true
    });
    await fs.promises.mkdir(foldrName, {
        recursive: true
    });
}