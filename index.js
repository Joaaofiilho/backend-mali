import app from './server/server.js'

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Listening on port 3000')
});