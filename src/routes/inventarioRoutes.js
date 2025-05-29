import express from 'express'
import InventarioController from '../controllers/inventarioController.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import { roleMiddleware } from '../middlewares/roleMiddleware.js'

const router = express.Router()
const inventarioController = new InventarioController()

const inventarioRoutes = [
  {
    method: 'get',
    path: '/',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'getAll'
  },
  {
    method: 'get',
    path: '/by-user/:usuario',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'getByUser'
  },
  {
    method: 'get',
    path: '/by-rol/:rol',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'getByRol'
  },
  {
    method: 'post',
    path: '/create',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'create'
  },
  {
    method: 'put',
    path: '/update/:id',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'update'
  },
  {
    method: 'delete',
    path: '/delete/:id',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'delete'
  },
  {
    method: 'post',
    path: '/login',
    handler: 'login'
  },
  {
    method: 'post',
    path: '/logout',
    middleware: [authMiddleware],
    handler: 'logout'
  },
  {
    method: 'post',
    path: '/unlock/:id',
    middleware: [authMiddleware, roleMiddleware('admin')],
    handler: 'unlockUser'
  },
  {
    method: 'get',
    path: '/user',
    middleware: [authMiddleware],
    handler: 'getUserByUsername'
  }
]

inventarioRoutes.forEach(route => {
  //console.log('@@@ route => ', route)
  router[route.method](
    route.path,
    ...(route.middleware || []),
    inventarioController[route.handler].bind(inventarioController)
  )
})

export default router

