const path = require('path');
const fs = require('fs');

const removeDir = require('./removeDir');


const readDir = (base,  callbackOnFile, callbackOnFolder, del,done) => {
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
      del === true ? removeDir(base) : null;
      done(err);
    });

  });
};
module.exports = readDir;