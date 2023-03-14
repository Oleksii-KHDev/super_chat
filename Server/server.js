let { PORT } = process.env;
const express = require('express');
const app = express();

PORT = PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`);
});
