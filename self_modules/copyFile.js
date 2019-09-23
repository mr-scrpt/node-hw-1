const fs = require('fs');

const copyFile = (file, target, dest ,cb) =>{
  const rd = fs.createReadStream(target);
  rd.on('error', err=> console.log(`Ошибка ${err}`));

  const wr = fs.createWriteStream(dest);
  wr.on('error', err=> console.log(`Ошибка ${err}`))
    .on('close', () => {
      console.log(`Файл ${file} скоприован`);
      cb(target);
    });

  rd.pipe(wr);

};

module.exports = copyFile;