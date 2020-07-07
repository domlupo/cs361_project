const express = require('express');
const userRouter = require('./userRouter');

const router = express.Router();

/* GET api index page. */
router.use('/user', userRouter);
router.get('/', (req, res, next) => {
  res.send('hello world here');
});

module.exports = router;
