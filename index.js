const path = require('path');
const fileUtils = require('./src/modules/server');

const testFile = path.join(__dirname, 'test.txt');

fileUtils.writeFile(testFile, 'Привет, мир!');

console.log('Содержимое файла:', fileUtils.readFile(testFile));

fileUtils.updateFile(testFile, 'Новое содержимое');
console.log('После изменения:', fileUtils.readFile(testFile));

fileUtils.clearFile(testFile);
console.log('После очистки:', fileUtils.readFile(testFile));