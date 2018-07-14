const express = require('express');
const glob = require('glob');
const fs = require('fs');

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug')

let templateOptions = JSON.parse(fs.readFileSync('data/templateOptions.json'));;
let setTemplateOptions = {};

app.get('*', (req, res) => {
    (new Promise((resolve, reject) => {
      try {
        for (option in templateOptions) {
          setTemplateOptions[option] = (templateOptions[option] == req.url.slice(1));
        }
        resolve(setTemplateOptions);
      } catch(err) {
        reject(new Error(err));
      }}))
      .then(options => {return res.render('master', options)})
      .catch(err => console.error(err))
})

// 404 is in build.js now, it should be moved here later
// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

app.use((err, req, res, next) => {
  res.send('Error: \n' + err);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
