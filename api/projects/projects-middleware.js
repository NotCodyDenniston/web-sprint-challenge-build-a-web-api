// add middlewares here related to projects
const Projects = require('./projects-model')
const Actions = require('../actions/actions-model')


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
  [${new Date().toISOString()}] ${req.method} to ${req.url} `)
  next()
}

function validateProjectId(req, res, next) {
    // DO YOUR MAGIC
    Projects.get(req.params.id)
    .then(project => {
      if(!project) {
        res.status(404).json({
          message: "project not found"
        })
      } else {
        req.project = project
        next()
      }
    }) .catch(err => {
      res.status(500).json({
        message: 'problem finding project'
    })
  })
  }

function validateProject(req, res, next) {
    const {name, description, completed} = req.body
    if(!name || !description || completed == null){
       res.status(400).json({
            message: 'missing name or description'
        })
    }
    else {
        next()
    }
}

module.exports = {
    logger,
    validateProjectId,
    validateProject
}