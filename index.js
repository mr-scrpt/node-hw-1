const fs = require('fs');
const path = require('path');
const program = require('commander');

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
          //delFolder(localBase);
        } else {
          dirMaker(getFirstLiter(item));
          copyFile(item, localBase, delFile);
        }

      });

    });

  });

};

const delFile = (path) =>{
  fs.unlink(path, (err)=>{
    if (err) return console.log(`Ошибка ${err}`);
    console.log(`Удален файл ${path}`);
  })
};

/*
const delFolder = (folder)=> {
  fs.readdir(folder, (err, files)=>{
    if (err) return console.log(`Ошибка ${err}`);
    if (!files.length) {
      fs.rmdir(folder, (err) => {
        if (err) return console.log(err);
        console.log(`Удалена папка ${folder}`);
      })
    }
  })
};
*/





const getFirstLiter = (string) => {
  return string[0];
};
const dirMaker = (name) => {
  const basePath = path.join( dir.direction, name );
  if(!fs.existsSync(dir.direction)){
    fs.mkdirSync(dir.direction)
  }
  if(!fs.existsSync(basePath)){
    fs.mkdirSync(basePath)
  }
};

const copyFile = (file, target, cb) =>{
  let cbCelled = false;
  const litera = getFirstLiter(file);
  const dest = path.join( dir.direction, litera, file );

  const rd = fs.createReadStream(target);
  rd.on('error', err=> console.log(`Ошибка ${err}`));

  const wr = fs.createWriteStream(dest);
  wr.on('error', err=> console.log(`Ошибка ${err}`))
    .on('close', () => {
      console.log(`Файл ${file} скоприован`);
      cb(target);
    });

  rd.pipe(wr);

  const done = (err) =>{
    if(!cbCelled){
      cb(err);
      cbCelled = true;
    }
  }

};



readDir(dir.base, err=>console.log(err));