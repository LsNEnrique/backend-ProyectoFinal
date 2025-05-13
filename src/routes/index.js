import express from 'express'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.get('/', (req,res) => { 
    res.json({ message: 'Servidor de API'})
})

router.use('/users', userRoutes)

export default router