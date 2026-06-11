/*const fs = require("fs");
const files = fs
  .readdirSync(__dirname)
  .filter((file) => file.endsWith("js") && file != "index.js");

let repositories = {};

for (const file of files) {
  const exportRepo = require("./" + file);
  let repo = { ...exportRepo };
  const key = Object.keys(repo);
  repositories[key] = repo[key];
}
*/

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
    const distructExport = { ...exportFromModule };
    const key = Object.keys(distructExport);
    if (key.length) exports[key] = distructExport[key];
  }
  return exports;
};
module.exports = readDir;
