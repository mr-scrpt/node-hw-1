const fs = require('fs');

const removeFile = (path) =>{
  fs.unlink(path, (err)=>{
    if (err) return console.log(`Ошибка ${err}`);
    console.log(`Удален файл ${path}`);
  })
};

module.exports = removeFile;