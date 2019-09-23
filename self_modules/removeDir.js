const fs = require('fs');

const removeDir = (path) =>{
  console.log('Удаление ',path);
  fs.rmdir(path, err => {
    console.log(err);
  })
};


module.exports = removeDir;