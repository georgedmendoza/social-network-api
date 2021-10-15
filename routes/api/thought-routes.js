const router = require('express').Router();

const {
    addThought,
    getAllThoughts,
    getSingleThought,
    deleteThought,
    updateSingleThought,
    addReaction,
    deleteReaction
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

router
    .route('/:thougthId/reactions')
    .post(addReaction)

router
    .route('/:thougthId/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;