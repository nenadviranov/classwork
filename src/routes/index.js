const router = require('express').Router();
const api = require('./api');
const pages = require('./pages');

router.use('/api', api);
router.use('/', pages);

router
  .route('/')
  .get((req, res, next) => {
    res.json({ message: 'Connected!' });
  })
  .post((req, res) => {
    res.status(200).json({ status: 'Success Post!', data: { body: req.body } });
  })
  .delete((req, res) => {
    res.status(200).json({ msg: 'welcome to DELETE' });
  });

module.exports = router;
