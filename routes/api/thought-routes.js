const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getSingleThought,
    deleteThought,
    updateSingleThought
} = require('../../controllers/thought-controller')


router
    .route('/')
    .post(addThought)
    .get(getAllThoughts)
router 
    .route('/:id')
    .get(getSingleThought)
    .delete(deleteThought)
    .put(updateSingleThought)
module.exports = router;