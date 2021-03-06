const router = require('express').Router();


router.use('/users', require('./users'));
router.use('/pets', require('./pets'));


router.use((req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;
