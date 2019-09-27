const fs = require('fs');

const checkExist = (path, cb) =>{
  fs.access(path, err => {
    if(!err){
      cb(path);
    }
  });
};
