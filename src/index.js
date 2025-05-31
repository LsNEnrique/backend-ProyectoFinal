import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

//Configuracion del CORS
const corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
//Indicar el middleware para uso del JSON
app.use(bodyParser.json())
//Indicar la ruta principal
app.use('/api', routes)
//Poner en escucha el servidor
app.listen(PORT, () => {
    console.log(`Server running is ${PORT} 👍`)
})


