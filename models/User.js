const { Schema, Types } = require('mongoose');
const { isEmail } = require('validator');
const { thoughtSchema } = require('./Thought');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      email: {
        validate: [isEmail, 'Invalid email'],
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

const User = model('user', userSchema);

module.exports = User;