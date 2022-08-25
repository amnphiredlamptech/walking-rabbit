const express = require('express');

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', (req, res) => {
  res.json({ 
    status: 'success',
    message: 'Hello from serverMiddleware',
    data: [1,2,3]
   });
});

app.use('/hello', router);

module.exports = app;
