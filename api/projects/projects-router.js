// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const {
    validateProjectId,
    validateProject
} = require('./projects-middleware')

const router = express.Router()

router.get('/', (req,res) => {
    Projects.get()
    .then(projects => {
        res.json(projects)
    })
    .catch(err => {
        res.status(500).json({
            message: "Couldn't retrieve projects"
        })
    })
})

router.get('/:id', validateProjectId, (req,res) => {
   const projectId = req.params.id
    Projects.get(projectId)
    .then(project => {
        res.json(project)
    })
    .catch(err => {
        res.status(500).json({
            message: "Couldn't retrieve projects"
        })
    })
})

router.post('/', validateProject, (req,res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        res.status(500).json({
            message: "error creating user"
        })
    })
})

module.exports = router