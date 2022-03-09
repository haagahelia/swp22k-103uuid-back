const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/p/:uuid', (request, response) => {
    response.send('UUID is ' + request.params.uuid)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})



//URL with params: `/?uuid=${uuid}$countryid=${countryid}$ordertype=${ordertype}`