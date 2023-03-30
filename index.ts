import express, { Express, NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { constants as cryptoConstants } from 'crypto'
import https from 'https'
import bodyParser from 'body-parser'
import mainConfig from './config/main.config'
import PetsRoute from './routes/pets'
import HttpError from './lib/HttpError'

const app: Express = express()
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}))
app.use(bodyParser.json())
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/', express.static('./swaggerui-dist'))
app.use('/pets', PetsRoute)
app.use(function (req: Request, res: Response) {
  console.warn('Route Not Found: ' + req.url)
  res.status(404).json({ code: 404, message: 'Not Found' })
})
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    // don't expose internal errors because of security
    if (err.status >= 400 && err.status < 500) {
      console.warn(err.toString()) // eslint-disable-line @typescript-eslint/no-base-to-string
      res.status(err.status).json({ code: err.status, message: err.message })
    } else {
      console.error(err.toString()) // eslint-disable-line @typescript-eslint/no-base-to-string
      res.status(err.status).json({ code: err.status, message: err.getHttpMessage() })
    }
  } else {
    console.error(err)
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
})
app.set('etag', false)
if (mainConfig.useHttps) {
  const credentials = {
    key: fs.readFileSync('/etc/ssl/server.key', 'utf8'),
    cert: fs.readFileSync('/etc/ssl/server.crt', 'utf8'),
    secureOptions: cryptoConstants.SSL_OP_NO_TLSv1 | cryptoConstants.SSL_OP_NO_TLSv1_1
  }
  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(mainConfig.port, function () {
    console.log(`${mainConfig.serviceName} is listening on https://127.0.0.1:${mainConfig.port}`)
  })
} else {
  app.listen(mainConfig.port, function () {
    console.log(`${mainConfig.serviceName} is listening on http://127.0.0.1:${mainConfig.port}`)
  })
}
