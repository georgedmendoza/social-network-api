const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: [true, 'You must give a body text'],
        maxLength: 280
    },
    username: {
        type: String,
        required: [true, 'you need a username']
    },
    createdAt: {
        type: Date,
        dafault: Date.now()
    }
},
{
    toJSON: {
        getters: true
    }
}
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'you need to provide some text'],
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        required: true,
        ref: 'User'
    },
    reactions: [ ReactionSchema ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;