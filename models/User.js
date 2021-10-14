const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'you must have a username'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'you must input an email'],
        unquie: true,
        match: [/.+@.+\..+/]
    },
    thoughts:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]   
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
}
);

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);



module.exports = User;