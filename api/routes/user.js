const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/list', async (req, res) => {
  const sql = `
  SELECT * FROM "walking-rabbit"."user"
  ORDER BY id ASC 
  `;

  const result = await db.any(sql);
  console.log('xxx', result);
  res.json({
    status: 'success',
    message: 'Hello from serverMiddleware',
    data: result
  });
});

module.exports = router;