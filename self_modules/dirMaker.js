const fs = require('fs');
const path = require('path');

const dirMaker = (name, target) => {
  const basePath = path.join( target, name );
  if(!fs.existsSync(target)){
    fs.mkdirSync(target)
  }
  if(!fs.existsSync(basePath)){
    fs.mkdirSync(basePath)
  }
};


module.exports = dirMaker;