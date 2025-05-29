import express from 'express'
import userRoutes from './userRoutes.js'
import inventarioRoutes from './inventarioRoutes.js'

const router = express.Router()

router.get('/', (req,res) => { 
    res.json({ message: 'Servidor de API'})
})

router.use('/users', userRoutes)
router.use('/product', product)

export default router