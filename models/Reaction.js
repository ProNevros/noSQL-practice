const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reaction_Id: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reaction_body: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: Number,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
