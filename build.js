const contentDirectory = 'pagecontent';

const glob = require('glob');
const fs = require('fs');

var getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};

getDirectories(contentDirectory, function (err, dirs) {
  if (err) {
    console.log('Error', err);
  } else {
    let templateOptions = {};
    dirs.forEach(dir => {
      if ( dir.indexOf('.html') !== -1 || dir.indexOf('.pug') !== -1 ) {
        let key = dir.replace(/\//g, '')
                    .replace('.pug' , '')
                    .replace('.html', '');
        while (Object.keys(templateOptions).indexOf(key) !== -1) {
          key += 'x'
        }
      templateOptions[key] = [dir];
      }
    })
    fs.writeFileSync('data/templateOptions.json', JSON.stringify(templateOptions));
    let templateContent = `extends layout\nblock content\n`;
    for (const [key, dir] of Object.entries(templateOptions)) {
      templateContent += `\tif ${key}\n\t\tinclude ../${dir}\n`;
    }
    templateContent += `\telse\n\t\th1 404 Page Not Found`
    fs.writeFileSync('./views/master.pug', templateContent);
  }
});
