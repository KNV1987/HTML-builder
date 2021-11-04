const fs = require('fs');
const path = require('path');
const folderDir = path.join(__dirname, 'files');
const newFolderDir = path.join(__dirname, 'files-copy');

const creatFolder = async (nameFolder) => {
    await fs.promises.mkdir(nameFolder, {
        recursive: true
    });
};

const copyDir = async (folderDir, nameOldFolder, newFolderDir, nameNewFolder) => {
    let oldFolder = path.join(folderDir, nameOldFolder);
    let newFolder = path.join(newFolderDir, nameNewFolder);
    creatFolder(newFolder);
    const files = await fs.promises.readdir(oldFolder, {
        withFileTypes: true
    });
    for (const file of files) {
        if (file.isFile()) {
            const oldFile = path.join(oldFolder, file.name);
            const newFile = path.join(newFolder, file.name);
            await fs.promises.copyFile(oldFile, newFile)
        } else {
            copyDir(oldFolder,  file.name, newFolder, file.name);
        }
    }
};

copyDir(__dirname, 'files', __dirname, 'files-copy');

