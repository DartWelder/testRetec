const express = require('express')
const path = require('path');

const PORT = 8888;

let app = express();

app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/messenger', (req, res) => {
    res.sendFile(__dirname + '/public/messenger.html')
})

app.get('/canvastable', (req, res) => {
    res.sendFile(__dirname + '/public/canvastable.html')
})

//404 page
app.use(function(req, res) {
    let text = req.custom_err || "<h1> Error 404</h1>"
    res.status(404).send(text)
});

app.listen(PORT, () => {
    console.log("Server has raised on port: " + PORT)
})