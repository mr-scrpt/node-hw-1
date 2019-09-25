const fs = require('fs');
const path = require('path');
const program = require('commander');

const removeFile = require('./self_modules/removeFile');
const getFirstLiter = require('./self_modules/getFirstLiters');
const dirMaker = require('./self_modules/dirMaker');
const copyFile = require('./self_modules/copyFile');
const readDir = require('./self_modules/readDir');

program
  .option('-f, --from <from>', 'расположение файлов', './sources')
  .option('-t, --to <to>', 'куда перенести файлы?', './result')
  .option('-d, --del <del>', 'Удалять исходники?', false);
program.parse(process.argv);

console.log(program.del);

const dir = {base: program.from, direction: program.to};



readDir(
  dir.base,
  (filePath, fileName, cb) => {
    const dest = path.join( dir.direction, getFirstLiter(fileName), fileName );
    dirMaker(getFirstLiter(fileName), dir.direction);

    copyFile(fileName, filePath, dest, ()=> {
      program.del === 'true' ?  removeFile(filePath) : null;
      cb()
    });

  },
  dir => {
    console.log("Directory: ", dir);
  },
  program.del,
  err => {
    console.log("Error: ", err);
  }
);