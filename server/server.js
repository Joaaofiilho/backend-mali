import express from 'express'
import { configureRoutes } from './routes.js'

const app = express()

configureRoutes(app)

export default app