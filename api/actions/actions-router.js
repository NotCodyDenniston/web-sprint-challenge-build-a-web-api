// Write your "actions" router here!
const express = require('express')
const Actions = require("./actions-model")
const router = express.Router()

const {validateAction, validateActionId, validateActionProjectId} = require('./actions-middlware')


router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        res.json(actions)
    })
    .catch(err => {
        res.status(500).json({
            message: "error retrieving actions"
        })
    })
})

router.get('/:id', validateActionId, (req, res) => {
    const actionsId = req.params.id
    Actions.get(actionsId)
    .then(action => {
        res.json(action)
    })
    .catch(err => {
        res.status(500).json({
            message: "error retrieving actions"
        })
    })
})

router.post('/', validateAction, validateActionProjectId, (req,res) => {
    Actions.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        res.status(500).json({
            message: "error creating action"
        })
    })
})

router.put('/:id', validateAction, validateActionId, validateActionProjectId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(newAction => {
        res.json(newAction)
    })
    .catch(err => {
        res.status(500).json({
            message: "error creating action"
        })
    })
})

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(removedAction => {
        res.status(204).json(removedAction)
    })
    .catch(err => {
        res.status(500).json({
            message:"error removing action"
        })
    })
})

module.exports = router