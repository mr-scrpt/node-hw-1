const fs = require('fs');

const removeFile = (path, cb) =>{
  fs.unlink(path, (err)=>{
    if (err) return console.log(`Ошибка ${err}`);
    console.log(`Удален файл ${path}`);
    cb();
  })
};

module.exports = removeFile;