const fs = require('fs');
const path = require('path');
const program = require('commander');

const removeFile = require('./self_modules/removeFile');
const getFirstLiter = require('./self_modules/getFirstLiters');
const dirMaker = require('./self_modules/dirMaker');
const copyFile = require('./self_modules/copyFile');
program
  .option('-f, --from <from>', 'расположение файлов', './sources')
  .option('-t, --to <to>', 'куда перенести файлы?', './result');
program.parse(process.argv);


const dir = {base: program.from, direction: program.to};

const readDir = (base, done) => {
  fs.readdir(base, (err, files)=>{
    if (err) return done(err);

    files.forEach(item => {

      let localBase = path.join(base, item);
      fs.stat(localBase, (err, stat)=>{
        if(err) return done(err);

        if (stat.isDirectory()) {
          readDir(localBase);
        } else {
          const dest = path.join( dir.direction, getFirstLiter(item), item );

          dirMaker(getFirstLiter(item), dir.direction);
          copyFile(item, localBase, dest, removeFile);
        }
      });

    });

  });
};


readDir(dir.base, err=>console.log(err));