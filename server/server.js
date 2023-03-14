const path = require('node:path');
const express = require('express');
const app = express();

// eslint-disable-next-line no-unused-vars
const publicPath = path.join(__dirname, '../public');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server has been started on port: ${port}`);
});
