const { User } = require('../models');

const userController = {
    // Create a new user
    createUser({ body }, res){
        User.create( body )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    // Get all users
    getAllUser(req,res) {
        User.find({})
        .populate({
            // allso to get actual thoughts text
            path: 'thoughts',
            // - sign exlucludes, so v field is not include in output
            select: '-__v'
        })
        .select('-__v')
        // sort from newest to oldest by id
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        })
    },

    // Get one user by id
    // Instead of body, pass params. So its destructed 
    getSingleUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            // allos to get actual thoughts text
            path: 'thoughts',
            // - sign exlucludes, so v field is not include in output
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no USER with that ID found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Update user
    updateUserByID({ params, body }, res) {
        // new:true returns updated data
        // runValidators:true validates new input data 
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no USER with that ID found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Delete user
    deleteUserById({ params }, res ) {
        User.findOneAndDelete({ _id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no USER with that ID found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a friend for user
    createFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            // $push add to friends array
            { $push: {friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no FRIEND with that ID found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // delte friend
    deleteFriend({ params }, res) {
        console.log(params.userId)
        User.findOneAndUpdate(
            { _id: params.userId},
            // $pull will remove from friends array
            { $pull: {friends: params.friendId } },
            { new: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'no Friend with that ID found!' });
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}


module.exports = userController;