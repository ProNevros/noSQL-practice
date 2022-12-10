const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thought_text: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id:false,
  }
);

thoughtSchema.virtual('thoughtCount').get(function () {
  return this.friends.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
