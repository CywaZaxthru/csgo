const express = require('express');
const path = require('path');
const APIhandler = require('./APIhandler');

const PORT = process.env.PORT || 4000;

const app = express();

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'build')));

const server = app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});

app.get('/', (request, response) => {
    const pathToFile = path.join(__dirname, 'build', 'index.html');
    response.sendFile(pathToFile);
});

app.get('/api', async (request, response) => {
    let answer = await APIhandler.caller(request.query.account);
    response.send(answer)
})

app.get('/answer', (request, response) => {
    const pathToFile = path.join(__dirname, 'build', 'index.html');
    response.sendFile(pathToFile);
});
