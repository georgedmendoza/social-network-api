const { Schema, model, Types } = require('mongoose');

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
    reactions: [ ReactionSchema]
},
{
    toJSON: {
        virtuals: true
    }
}
);

ThoughtSchema.virtual