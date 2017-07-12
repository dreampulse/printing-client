import express from 'express'
import compression from 'compression'
import favicon from 'serve-favicon'
import basicAuth from 'basic-auth'
import morgan from 'morgan'
import {resolve} from 'path'

const ONE_HOUR = 60 * 60 * 100

const app = express()

app.use(compression())

app.use(favicon(
    resolve(`${__dirname}/../src/asset/image/favicon.png`
  ))
)

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))

  app.set('json spaces', 2)  // Pretty print json

  // Don't allow crawling
  app.get('/robots.txt', (req, res) => {
    res.set('Content-Type', 'text/plain')
    res.send(
      'User-agent: *\n' +
      'Disallow: /\n'
    )
  })
}

if (process.env.BASIC_AUTH) {
  const [username, password] = process.env.BASIC_AUTH.split(':')

  app.use((req, res, next) => {
    const user = basicAuth(req)

    if (!user || !user.name || !user.pass ||
      user.name !== username ||
      user.pass !== password
    ) {
      res.set('WWW-Authenticate', 'Basic realm="Authorization Required"')
      return res.status(401).send()
    }

    return next()
  })
}

app.use('/', express.static(
  resolve(`${__dirname}/../dist`), {maxAge: ONE_HOUR}
))

app.get('*', (req, res) =>
  res
    .status(200)
    .sendFile(resolve(`${__dirname}/../dist/index.html`))
)

const port = process.env.PORT || 8888
app.listen(port, () => {
  console.log(`Listening on port ${port}`) // eslint-disable-line no-console
})
