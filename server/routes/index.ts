import type { Server } from '@hapi/hapi'
import Joi from 'joi'
import sql from '../db.js'

export function registerRoutes(server: Server) {
  server.route({
    method: 'GET',
    path: '/api/config',
    options: {
      description: 'Verificar configuracion del entorno',
      notes: 'Muestra si las variables de entorno estan configuradas',
      tags: ['api'],
    },
    handler: async (request, h) => {
      const hasDatabaseUrl = !!process.env.DATABASE_URL
      const databaseUrlLength = process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0

      return {
        configuracion: {
          databaseUrlConfigurado: hasDatabaseUrl,
          databaseUrlLength: databaseUrlLength,
          nodeEnv: process.env.NODE_ENV || 'development',
        },
      }
    },
  })

  server.route({
    method: 'GET',
    path: '/api/db-test',
    options: {
      description: 'Prueba de conexion a la base de datos',
      notes: 'Retorna la version de PostgreSQL',
      tags: ['api'],
    },
    handler: async (request, h) => {
      try {
        const result = await sql`SELECT version()`
        const { version } = result[0]
        return { mensaje: 'Conexion exitosa', version }
      } catch (error: any) {
        console.error('Error de conexion:', error)
        return h
          .response({
            error: 'Error de conexion a la base de datos',
            details: {
              message: error.message,
              name: error.name,
              code: error.code,
            },
          })
          .code(500)
      }
    },
  })

  server.route({
    method: 'GET',
    path: '/api/db-simple',
    options: {
      description: 'Prueba de conexion simple',
      notes: 'Prueba una consulta simple',
      tags: ['api'],
    },
    handler: async (request, h) => {
      try {
        const result = await sql`SELECT 1 as test`
        return {
          mensaje: 'Conexion simple exitosa',
          resultado: result[0],
        }
      } catch (error: any) {
        console.error('Error en conexion simple:', error)
        return h
          .response({
            error: 'Error en conexion simple',
            details: {
              message: error.message,
              name: error.name,
              code: error.code,
              stack: error.stack,
            },
          })
          .code(500)
      }
    },
  })

  server.route({
    method: 'GET',
    path: '/api/saludo',
    options: {
      description: 'Ruta de prueba',
      notes: 'Retorna un saludo',
      tags: ['api'],
      validate: {
        query: Joi.object({
          nombre: Joi.string().min(2).max(30).required().description('Nombre de la persona'),
        }),
      },
    },
    handler: (request, h) => {
      const { nombre } = request.query as { nombre: string }
      return { mensaje: `Hola, ${nombre}!` }
    },
  })
}
