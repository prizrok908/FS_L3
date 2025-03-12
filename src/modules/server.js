const fs = require('fs');
const path = require('path');

function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data, 'utf8');
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function updateFile(filePath, newData) {
    writeFile(filePath, newData);
}

function clearFile(filePath) {
    writeFile(filePath, '');
}

function cleanFile(filePath) {
    let data = readFile(filePath);
    data = data.replace(/[0-9]/g, '').toLowerCase();
    writeFile(filePath, data);
}

function copyFile(sourcePath, destinationPath) {
    fs.copyFileSync(sourcePath, destinationPath);
}

function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
    }
}

function listFiles(dir, ignored = ['node_modules', '.git']) {
    let results = [];
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (ignored.includes(file)) return;
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(listFiles(fullPath, ignored));
        } else {
            results.push(fullPath);
        }
    });
    return results;
}

function clearProject(dir, ignored = ['node_modules', '.git']) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (!ignored.includes(file)) {
            if (fs.statSync(fullPath).isDirectory()) {
                deleteFolder(fullPath);
            } else {
                fs.unlinkSync(fullPath);
            }
        }
    });
}

module.exports = {
    writeFile,
    readFile,
    updateFile,
    clearFile,
    cleanFile,
    copyFile,
    createFolder,
    deleteFolder,
    listFiles,
    clearProject
};