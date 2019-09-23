const fs = require('fs');
const path = require('path');
const unsortedFolder = './sources';
const sortedFolder = './sortedFolder';

const readDir = (base) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localDir = path.join(base, item);

    let state = fs.statSync(localDir);
    if (state.isFile()) {
      if (item.includes('.png') || item.includes('.jpg') || item.includes('.jpeg')){

        let index = item.substring(0,1).toUpperCase();
        if (!fs.existsSync(path.join(sortedFolder))){
          fs.mkdirSync(path.join(sortedFolder));
        }

        fs.copyFileSync(path.join(base, item), path.join( sortedFolder, index, item ));
      }


    } else {
      readDir(localDir);
    }
  })
};

readDir(unsortedFolder);