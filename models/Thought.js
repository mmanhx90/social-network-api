const { Schema, model } = require('mongoose');
const { reactionSchema } = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlenngth: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

reactionSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;