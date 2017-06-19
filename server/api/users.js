const router = require('express').Router();
const db = require('../db');
const User = require('../db/models/user');
const Pet = require('../db/models/pet');
const PetInterest = require('../db/models/pet_interest');
const Promise = require('bluebird');

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


// GET and POST messages from the basic user to the pet
router.get('/interests/:userId/basic/messages', (req, res, next) => {
  PetInterest.findAll({where: {userId: req.user.id, user_message: true}})
    .then(petInterestList => res.status(200).json(petInterestList))
    .catch(next);
});

router.post('/interests/:userId/basic/messages', (req, res, next) => {
  Pet.findById(req.body.id)
    .then(pet => {
      return PetInterest.findOne({where: {userId: req.user.id, petId: pet.id}})
    })
    .then(petInterest => {
      return petInterest.update({user_message: true})
    })
    .then(() => PetInterest.findAll({where: {userId: req.user.id, user_message: true}}))
    .then(petInterestList => res.status(201).json(petInterestList))
    .catch(next);
});



// rejects
router.get('/rejects/:userId', (req, res, next) => {
  req.user.getReject()
    .then(rejectList => res.status(200).json(rejectList))
    .catch(next);
});

router.post('/rejects/:userId', (req, res, next) => {
  Pet.findById(req.body.id)
    .then(pet => req.user.addReject(pet))
    .then(() => req.user.getReject())
    .then(rejectList => res.status(201).json(rejectList))
    .catch(next);
});

// adoptions
router.get('/adoptions/:userId', (req, res, next) => {
  req.user.getAdopt()
    .then(adoptList => res.status(200).json(adoptList))
    .catch(next);
})


router.post('/adoptions/:userId', (req, res, next) => {
  Pet.findById(req.body.id)
    .then(pet => req.user.addAdopt(pet))
    .then(() => req.user.getAdopt())
    .then(adoptList => res.status(201).json(adoptList))
    .catch(next);
});

// :petId
router.get('/interest/users/:petId', (req, res, next) => {
  Pet.findById(req.params.petId)
    .then(pet => PetInterest.findAll({ where: {
      petId: pet.id,
      user_message: true
    } }))
    .then(petInterestList => {
      return Promise.map(
        petInterestList,
        petInterest => User.findById(petInterest.userId)
      )
        .then(userList =>
          {
          return petInterestList
            .map((petInterest, idx) => {
              return Object.assign(
                {},
                petInterest.dataValues,
                { userName: userList[idx].email }
              );
            })
        })
    })
    .then(modifiedPetInterestList => {
        return res.status(200).json(modifiedPetInterestList)
    })
    .catch(next);
});


router.post('/messages/:userId/:petId', (req, res, next) => {
  PetInterest.findOne({ where: { userId: req.params.userId, petId: req.params.petId } })
    .then(petInterest => petInterest.update({ adopter_message: req.body.message }))
    .then(() => res.status(201).send('Successfully sent'))
    .catch(next);
});
