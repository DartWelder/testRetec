const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs-promise');
/*const fileUpload = require('express-fileupload');
const dbConnect = require('./libs/mongoose').dbConnect;*/



const PORT = 8888;



let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

/*app.use(fileUpload());*/
app.use('/static', express.static(path.join(__dirname, '/public')));


/*app = createRoutes(app);*/
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