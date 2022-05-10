import express from 'express'
import loginController from '../../app/controllers/v1/LoginControllers'

const router = express.Router()

router.get('/login', loginController.loginRender)


export default router