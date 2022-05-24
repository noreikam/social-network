const {Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: [true, "reactionBody is required"],
      trim: true
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true
    },
    createdAt: {
      type: Date, 
      default: Date.now, 
      get: createdAtVal => dateFormat(createdAtVal)
    }
  }, 
  {
    toJSON: {
      getters: true
    }, 
    id: false
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "thoughtText is required"],
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
      type: String,
      required: [true, "username is required"]
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }, 
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;