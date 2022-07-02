// add middlewares here related to actions
const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

function validateActionId(req, res, next) {
    // DO YOUR MAGIC
    Actions.get(req.params.id)
    .then(action => {
      if(!action) {
        res.status(404).json({
          message: "action not found"
        })
      } else {
        req.action = action
        next()
      }
    }) .catch(err => {
      res.status(500).json({
        message: 'problem finding action'
    })
  })
  }

function validateAction(req, res, next) {
    const {project_id, notes, description, completed} = req.body
    if(!project_id || !notes || !description || completed == null){
          res.status(400).json({
            message: 'missing body element'
        })
    }
    else {
        next()
    }
}

function validateActionProjectId(req, res, next) {
    // DO YOUR MAGIC
    const projectId = req.body.project_id
    Projects.get(projectId)
    .then(project => {
      if(!project) {
        res.status(404).json({
          message: "project not found"
        })
      } else {
       
        next()
      }
    }) .catch(err => {
      res.status(500).json({
        message: 'problem finding project'
    })
  })
  }
module.exports = {validateAction, validateActionId, validateActionProjectId}