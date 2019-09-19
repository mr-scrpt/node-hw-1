const fs = require('fs');
const path = require('path');

const dir = {base: './sources', direction: './result'};
const readDir = (base, level) => {
  const files = fs.readdirSync(base);

  files.forEach(item => {
    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    if (state.isDirectory()) {
      readDir(localBase, level + 1);
    } else {
      dirMaker(getFirstLiter(item));
      copyFile(item, localBase);
    }

  });

};

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

const copyFile = (file, target) =>{
  const litera = getFirstLiter(file);
  const dest = path.join( dir.direction, litera, file );
  fs.copyFileSync(target, dest)
};

readDir(dir.base, 0);