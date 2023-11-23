const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/app.js', express.static(path.join(__dirname, 'app.js'), { 'Content-Type': 'application/javascript' }))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(port, () => {
  console.log(`ouvindo em http://localhost:${port}`)
})
