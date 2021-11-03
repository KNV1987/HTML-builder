const process = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const textDir = path.join(__dirname, 'text.txt');
const stream = new fs.createWriteStream(textDir, 'utf-8');

function exit(){
    process.stdout.write(`До свидания! \n`);
    stream.close();
    process.exit(0);
}

process.stdout.write(`Напиши мне что-нибудь: \n`);
process.stdin.on('data', data => {
    if(data.indexOf('exit') === -1) stream.write(data);
    else exit();
})
process.on('SIGINT', () => exit());