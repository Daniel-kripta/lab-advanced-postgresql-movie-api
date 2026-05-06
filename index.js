require('dotenv').config()
const express = require('express')

require('./src/config/db')

const directoresRouter = require('./src/routes/directores')

const peliculasRouter = require('./src/routes/peliculas')

const auditoria = require('./src/middleware/auditoria')

const authRouter = require('./src/routes/auth')

const estadisticasRouter = require('./src/routes/estadisticas')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/directores', directoresRouter)

app.use('/api/peliculas', auditoria, peliculasRouter)

app.use('/api/estadisticas', estadisticasRouter)


app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Error interno del servidor' })
})

app.use((req, res) => {
  res.status(404).json({ error: `Ruta ${req.method} ${req.url} no encontrada` })
})

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`)
})
