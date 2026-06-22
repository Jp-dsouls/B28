import Hapi from '@hapi/hapi'
import Inert from '@hapi/inert'
import Vision from '@hapi/vision'
import HapiSwagger from 'hapi-swagger'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { registerRoutes } from './routes/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL no esta configurado en el archivo .env')
  process.exit(1)
}

const init = async () => {
  const server = Hapi.server({
    port: Number(process.env.PORT) || 3000,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  const swaggerOptions = {
    info: {
      title: 'API Documentacion B28 Asistencia',
      version: '1.0.0',
    },
  }

  await server.register([
    Inert as any,
    Vision as any,
    {
      plugin: HapiSwagger as any,
      options: swaggerOptions,
    },
  ])

  registerRoutes(server)

  const clientDistPath = path.resolve(__dirname, '..', 'dist-client')
  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: clientDistPath,
        index: ['index.html'],
        redirectToSlash: true,
      },
    },
  })

  await server.start()
  console.log('Servidor corriendo en %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

init()
