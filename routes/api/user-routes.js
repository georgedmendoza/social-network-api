const router = require('express').Router();

const {
    createUser,
    getAllUser,
    getSingleUserById,
    updateUserByID,
    deleteUserById
} = require('../../controllers/user-controller')

// GET, POST routes
// api/users
router
    .route('/')
    .post(createUser)
    .get(getAllUser);

// new with ID for routes that require it (id)
router
    .route('/:id')
    .get(getSingleUserById)
    .put(updateUserByID)
    .delete(deleteUserById)

module.exports = router;