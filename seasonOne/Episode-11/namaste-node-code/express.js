const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/abhishek', (req, res) => {
  res.send('Hello Abhishek! Learning Express is fun.')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
