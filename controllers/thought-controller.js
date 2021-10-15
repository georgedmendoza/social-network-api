const { Thought, User } = require('../models');

const thoughtController = {
    // create new thought
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create( body )
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                // add to thought array in user model
                { $push: { thoughts: _id } },
                // return update array
                { new: true}
            )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No USER found with this id!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.json(err)
        })
    },

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        // get acutual commnet using populate
        // .populate({
        //     path: 'user',
        //     select: '-__v'
        // })
        .select('-__v')
        // return in order from newst
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get single thought
    getSingleThought({ params }, res ) {
        Thought.findOne({ _id: params.id })
        // .populate({ 
        //     path: 'user',
        //     select: '-__v'
        // })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no THOUGHT with that ID found!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // update thought by id
    updateSingleThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no THOUGHT with that ID found!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // delete thought
    deleteThought({ params }, res ) {
        Thought.findOneAndDelete({ _id: params.id })
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no THOUGHT with that ID found!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create a reation
    addReaction({ params, body }, res) {
        console.log(body);
        Thought.findOneAndUpdate(
            { _id: params.thougthId },
            { $push: {reactions: body } },
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no THOUGHT with that ID found!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // delete a reation
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thougthId },
            { $pull: {reactions: { reactionId: params.reactionId } } },
            {new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'no REACTION with that ID found!' });
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }

};


module.exports = thoughtController;