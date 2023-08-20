const ObjectId = require('mongoose').Types
const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => {
            res.json(thoughts)
          })
          .catch((err) => res.status(500).json(err))
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thoughts) => 
        !thoughts
         ? res.status(404).json({ message: 'No thoughts with this ID'})
         : res.json({thoughts})
         )
         .catch((err) => {
            console.log(err)
            return res.status(500).json(err)
         })
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((data) => {
            return User.findOneAndUpdate(
                {_id: req.params.userId},
                {$push: { thoughts: data._id}},
                {new: true}
            )
        })
        .then((thoughts) => {
            if(!thoughts) {
                return res.status(404).json({ message: 'User not found' })
            }
            res.json(thoughts)
        })
        .catch((err) => res.status(500).json(err))

    },
updateThought(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            { $set: req.body },
            { new: true }
        )
        .then((thoughts) => {
            if(!thoughts) {
                return res.status(404).json({ message: 'Thought not found'})
            }
            res.json(thoughts)
        })
        .catch((err) => res.status(500).json(err))
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId})
        .then((thoughts) => {
            if(!thoughts) {
                return res.status(404).json({ message: 'Thought not found'})
            }
            return User.findOneAndUpdate(
                {thought: req.params.thoughtId}, 
                { $pull: { thought: req.params.thoughtId}},
                { new: true} 
                )
                .then((thoughts) => {
                    if(!thoughts) {
                        return res.status(404).json({ message: 'Thought not found'})
                    }
                    res.json({ message: 'thought has been deleted'})
                })
                .catch((err) => res.status(500).json(err))
        })
    },

    createReaction(req, res) {
       Thought.findByIdAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: { reactions: req.body} },
        {new: true, runValidators: true}
       )
       .then((thoughts) => {
        if(!thoughts) {
            return res.status(404).json({ message: 'Thought not found'})
        }
        res.json(thoughts)
       })
       .catch((err) => res.status(500).json(err))
    },
deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: { reactions: req.params.thoughtId } },
            {new: true, runValidators: true }
        )
        .then((thoughts) => {
            if(!thoughts) {
                return res.status(404).json({ message: 'Thought not found'})
            }
            res.json(thoughts)
           })
           .catch((err) => res.status(500).json(err))
    }

}
