import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', router);

// Middleware de errores
app.use(errorMiddleware);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
/*import express from 'express'
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
*/
