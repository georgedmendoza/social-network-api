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
}
{
    toJSON: {
        virtuals: true,
    }
}
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friend) => total + friend.length + 1, 0);
})

const User = model('User', userSchema);



module.exports = User;