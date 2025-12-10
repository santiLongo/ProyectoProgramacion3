import app from '../app.ts'
import '../utils/generic-methods/index.ts'
import debug from 'debug'
import http from 'http'
import figlet from 'figlet'
import mongoose from 'mongoose'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'
import { Server } from 'socket.io'
import { SocketHandler } from '../socket-handler/socket-handler.ts'

//Leo el package.json
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'))

//Activo espacio de debug
debug('api-prog-3:server')
console.log(process.env.NODE_ENV)
//Cargo las .env
const env_path = process.env.NODE_ENV ? `./configs/.env.${process.env.NODE_ENV}` : './configs/.env'
console.log(env_path)
dotenv.config({ path: env_path })

//Cargo el puerto
const port = process.env.PORT || 4000
app.set('port', port)

//Creo el servidor http
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

SocketHandler(io);

//Configuro los datos de la base datos
const db_url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/'
const db_name = process.env.MONGO_DB || 'test'

//Me conecto a la base con a travez de Mongoose
initDatabase()
  .then(() => console.log('Database connection established successfully!'))
  .catch((err) => console.log(err))

async function initDatabase() {
  await mongoose
    .connect(db_url + db_name)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err)
    })
}

// Inicio el servidor.
server.listen(port, printTitle)
server.on('error', onError)
server.on('listening', onListening)

// Funcion de manejo de errores.
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES': //El puerto requiere permisos de administrador
      console.error(bind + ' requires elevated privileges')
      process.exit(1) //Termino el proceso
      break
    case 'EADDRINUSE': //El puerto ya esta ocupado
      console.error(bind + ' is already in use')
      process.exit(1) //Termino el proceso
      break
    default:
      throw error
  }
}

// Metodo para impromor en consola si esta habilitada la depuracion.
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
  debug('Listening on ' + bind)
}

// Mostrar titulo en consola
function printTitle() {
  process.stdout.write('\n')
  process.stdout.write(`${figlet.textSync(`Prog 3!`, { font: 'Ogre' })}\n`)
  process.stdout.write('\n')
  process.stdout.write(
    `Version: ${pkg.version}, Environment: ${process.env.NODE_ENV || 'default'}\n`,
  )
  // process.stdout.write(`Version: ${version}, Environment: ${process.env.NODE_ENV || 'default'}\n`)
  if (process.env.toString() !== 'production') {
    process.stdout.write(`Listening on port ${port}\n`)
  }
}
