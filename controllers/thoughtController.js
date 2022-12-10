const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        const thoughtObj = {
          thoughts,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thought_Id })
      .select('-__v')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought, head empty' })
          : res.json({
            thought,
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.user_id },
          { $addToSet: { thoughts: thought._id } },
          { new: true },
        )
      })
      .then((user) =>
        !user ? res.status(404).json({
          message: 'Nice thought, but your buddy does not exist',
        })
          : res.status(200).json('Thought created!')
      )
  },

  // Delete a thought from a user
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thought_Id })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No such thoughts exist' })
          : User.findOneAndUpdate(
            { thoughts: req.params.thought_Id },
            { $pull: { thoughts: req.params.thought_Id } },
            { new: true }
          )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
            message: 'User deleted, but no thoughts found',
          })
          : res.json({ message: 'Head emptied!' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a react to a thought
  addReact(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thought_Id },
      { $addToSet: { reacts: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(student)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove react from a thought
  removeReact(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thought_Id },
      { $pull: { reacts: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
