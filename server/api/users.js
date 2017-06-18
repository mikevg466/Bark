const router = require('express').Router();
const db = require('../db');
const User = require('../db/models/user');
const Pet = require('../db/models/pet');

module.exports = router;


/****-----   userId Param    -----*****/
router.param('userId', (req, res, next, id) => {
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});


/****-----   Root    -----*****/
router.get('/', (req, res, next) => {
  //login -- to revise later
  if(Object.keys(req.query).length){
    User.findOne({
      where: {
        email: req.query[email],
        password: req.query[password]
      }
    })
      .then(user => res.status(200).json(user))
      .catch(next);
  //get all users
  } else{
    User.findAll()
      .then(users => res.status(200).json(users))
      .catch(next);
  }
});

/****-----   Create User    -----*****/
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(next);
});


/****-----   Delete User    -----*****/
router.delete('/:userId', (req, res, next) => {
  req.user.destroy()
    .then(() => res.status(204).send('User Deleted!'))
    .catch(next);
})

/****-----   User Info    -----*****/
// get user's name
router.get('/name/:userId', (req, res, next) => {
  res.status(200).json(req.user.name);
});

// get user's email
router.get('/email/:userId', (req, res, next) => {
  res.status(200).json(req.user.email);
});


/****-----   Pet Associations    -----*****/
// interests
router.get('/interests/:userId', (req, res, next) => {
  req.user.getInterest()
    .then(interestList => res.status(200).json(interestList))
    .catch(next);
});

router.post('/interests/:userId', (req, res, next) => {
  Pet.findById(req.body.id)
    .then(pet => req.user.addInterest(pet))
    .then(() => req.user.getInterest())
    .then(interestList => res.status(201).json(interestList))
    .catch(next);
});

// rejects
router.get('/rejects/:userId', (req, res, next) => {
  req.user.getReject()
    .then(interestList => res.status(200).json(interestList))
    .catch(next);
});

router.post('/rejects/:userId', (req, res, next) => {
  Pet.findById(req.body.id)
    .then(pet => req.user.addReject(pet))
    .then(() => req.user.getReject())
    .then(interestList => res.status(201).json(interestList))
    .catch(next);
});
