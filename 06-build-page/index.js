const fs = require('fs');
const path = require('path');
const projectDir = path.join(__dirname, "project-dist");
const templDir = path.join(__dirname, "template.html");
const htmlFile = path.join(__dirname, "project-dist", "index.html");
const dirStyles = path.join(__dirname, 'styles');

const creatHtml = async(folderName) => {
    await fs.promises.rmdir(folderName, {
        recursive: true
    });
    await fs.promises.mkdir(folderName, {
        recursive: true
    });
    await fs.promises.copyFile(templDir, htmlFile);
    const indexHtml = await fs.promises.readFile(htmlFile, 'utf-8');
    let indexHtmlArr = indexHtml.match(/{{+[a-zA-Z0-9]+}}/g);
     for (let item of indexHtmlArr){
        let nameTag = item.replace('{{', '');
        nameTag = nameTag.replace('}}', '');
        const nameFileTag = path.join(__dirname, "components", `${nameTag}.html`);
        const readFileTag = await fs.promises.readFile(nameFileTag, 'utf-8');
        const newIndexHtml = await fs.promises.readFile(htmlFile, 'utf-8');
        const newItem = newIndexHtml.replace(`${item}`, readFileTag);
        await fs.promises.writeFile(htmlFile, newItem);
    };
};

const infoFolder = async (dirFolder) => {
    const writeStream = await new fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'), 'utf-8');
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

const copyDir = async (folderDir, nameOldFolder, newFolderDir, nameNewFolder) => {
    let oldFolder = path.join(folderDir, nameOldFolder);
    let newFolder = path.join(newFolderDir, nameNewFolder);
    await fs.promises.mkdir(newFolder, {
        recursive: true
    });
    const files = await fs.promises.readdir(oldFolder, {
        withFileTypes: true
    });
    for (const file of files) {
        if (file.isFile()) {
            const oldFile = path.join(oldFolder, file.name);
            const newFile = path.join(newFolder, file.name);
            await fs.promises.copyFile(oldFile, newFile);
        } else {
            copyDir(oldFolder, file.name, newFolder, file.name);
        }
    }
};
const deletDir = async (newFolderDir, nameNewFolder) => {
    let newFolder = path.join(newFolderDir, nameNewFolder);
    await fs.promises.rmdir(newFolder, {
        recursive: true
    });
};


const buildFolder = async () => {
    await creatHtml(projectDir);
    await infoFolder(dirStyles);
    await deletDir(path.join(__dirname, 'project-dist') , 'assets');
    await copyDir(__dirname, 'assets', path.join(__dirname, 'project-dist') , 'assets');
}
buildFolder();