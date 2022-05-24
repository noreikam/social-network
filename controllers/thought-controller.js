const { Thought } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
    .populate(
      {
        path: 'reactions', 
        select: '-__v'
      }
    )
    .select('-__v')
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  }, 

  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
      })
  },
  
  createThought({ body }, res) {
    Thought.create(body)
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;