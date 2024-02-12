//importing express
const express = require('express')
//calling router from express
const router = express.Router()
//importing controller for user
const userController = require('../Controllers/userController')
//importing controller for project
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

//route for register
router.post('/register',userController.register)

//route for login
router.post('/login',userController.login)

//route for addProject
//jwtMiddleware is a router specific middleware
router.post('/addproject',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)
//get home projects
router.get('/home-projects',projectController.getHomeProjects)
//get all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjects)
//get user projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjects)
//edit project
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject)
//remove project
router.delete('/project/remove/:pid',jwtMiddleware,projectController.removeProject)
//update user
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

module.exports = router
