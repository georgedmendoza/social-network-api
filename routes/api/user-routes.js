const router = require('express').Router();

const {
    createUser,
    getAllUser,
    getSingleUserById,
    updateUserByID,
    deleteUserById,
    createFriend,
    deleteFriend
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

// add friend
router 
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)

module.exports = router;