const { Schema, model, Types } = require('mongoose');
const moment = require('moment')

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
        dafault: Date.now(),
        get: createdAt => moment(createdAt).format('YYYY-MM-DD hh:mm:ss a')
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
        default: Date.now(),
        get: createdAt => moment(createdAt).format('YYYY-MM-DD hh:mm:ss a')
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