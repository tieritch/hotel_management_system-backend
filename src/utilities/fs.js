const fs = require("fs");
const readDir = (dir) => {
  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith("js") && file != "index.js");

  let exports = {};

  for (const file of files) {
    const path = require("path");
    const filePath = path.join(dir, `/${file}`);
    let exportFromModule = require(filePath);
    Object.assign(exports, exportFromModule);
  }
  return exports;
};
module.exports = readDir;
