const fs = require('fs');
const path = require('path');
const program = require('commander');

const removeFile = require('./self_modules/removeFile');
const getFirstLiter = require('./self_modules/getFirstLiters');
const dirMaker = require('./self_modules/dirMaker');
const copyFile = require('./self_modules/copyFile');
const removeDir = require('./self_modules/removeDir');

program
  .option('-f, --from <from>', 'расположение файлов', './sources')
  .option('-t, --to <to>', 'куда перенести файлы?', './result');
program.parse(process.argv);


const dir = {base: program.from, direction: program.to};

const readDir = (base,  callbackOnFile, callbackOnFolder, done) => {
  fs.readdir(base, (err, files)=>{
    if (err) return done(err);
    let i = 0;

    const next = (doneList) =>{
      if (err) return doneList(err);

      const fileName = files[i++];

      if (!fileName) return doneList(null);

      const filePath = path.join(base, fileName);

      fs.stat(filePath, (err, stat) => {
        if (stat && stat.isDirectory()) {
          readDir(
            filePath,
            callbackOnFile,
            callbackOnFolder,
            next.bind(null, doneList)
          )
        }else {
          callbackOnFile(filePath, fileName, next.bind(null, doneList));
        }
      })

    };

    next(err => {
      if (!err) callbackOnFolder(base);
      console.log('Пусто ', base);
      removeDir(base);
      done(err);
    });

  });
};



readDir(
  dir.base,
  (filePath, fileName, cb) => {

    const dest = path.join( dir.direction, getFirstLiter(fileName), fileName );
    dirMaker(getFirstLiter(fileName), dir.direction);
    copyFile(fileName, filePath, dest, (target)=> console.log('тест', target));
    removeFile(filePath);
    cb()
  },
  dir => {
    console.log("Directory: ", dir);
  },
  err => {
    console.log("Error: ", err);
  }
);