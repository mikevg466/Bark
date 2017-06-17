const router = require('express').Router();
const Pet = require('../db/models/pet');

module.exports = router;

/****-----   Root    -----*****/
router.get('/', (req, res, next) => {
  Pet.findAll()
    .then(petList => res.status(200).json(petList))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Pet.create(req.body)
    .then(petResult => res.status(201).json(petResult))
    .catch(next);
});


/****-----   params    -----*****/
router.param('petId', (req, res, next, id) => {
  Pet.findById(id)
    .then(petResult => {
      req.pet = petResult
      return next();
    })
    .catch(next);
});


/****-----   SinglePet    -----*****/
router.get('/:petId', (req, res, next) => {
  res.status(200).json(req.pet);
});

router.put('/:petId', (req, res, next) => {
  req.pet.update(req.body)
    .then(pet => res.status(201).json(pet))
    .catch(next);
});

router.delete('/:petId', (req, res, next) => {
  req.pet.destroy()
    .then(() => res.status(204).send('Successfully Deleted'))
    .catch(next);
});
