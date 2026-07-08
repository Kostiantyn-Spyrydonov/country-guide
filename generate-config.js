const fs = require('fs');

const apiKey = process.env.API_KEY;
fs.writeFileSync('config.js', `const API_KEY = '${apiKey}';\n`);
