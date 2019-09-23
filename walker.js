const fs = require("fs");
const path = require("path");

const walk = function(dir, callbackOnFile, callbackOnFolder, done) {
  fs.readdir(dir, (err, list) => {
    if (err) return done(err);
    let i = 0;

    const next = function(doneList) {
      if (err) return doneList(err);

      let filePath = list[i++];

      if (!filePath) return doneList(null);

      filePath = path.join(dir, filePath);

      fs.stat(filePath, (_, stat) => {
        if (stat && stat.isDirectory()) {
          walk(
            filePath,
            callbackOnFile,
            callbackOnFolder,
            next.bind(null, doneList)
          );
        } else {
          callbackOnFile(filePath, next.bind(null, doneList));
        }
      });
    };

    next(err => {
      if (!err) callbackOnFolder(dir);
      done(err);
    });
  });
};

walk(
  "./WebstersEnglishDictionary",
  (filePath, cb) => {
    console.log("File: ", filePath);
    cb();
  },
  dir => {
    console.log("Directory: ", dir);
  },
  err => {
    console.log("Error: ", err);
  }
);

module.exports = walk;


// node walker ./input ./result true
// node walker --input ./input --output ./result --delete
// node walker -I ./input -O ./result -D