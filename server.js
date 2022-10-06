var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

var app = express();

//app.use(express.json());

app.use(bodyParser.json());

// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
/*var distDir = __dirname + '/dist/';
app.use(express.static(distDir));*/

app.use(express.static(__dirname + '/dist/kamscapes-app'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/kamscapes-app/index.html'));
    //res.sendFile(path.join(__dirname));
    //res.sendFile(__dirname);
});

/*app.all('*', (req, res) => {
    res.sendFile(path.re)
})*/

app.post('/api/quotes', (req, res) => {
    const data = req.body;
    console.log(data);
    return res.status(201).json({
        message: 'success'
    });
});

/*app.get('/api/quotes', (req, res) => {
    return res.status(200).json({
        message: 'Hello there'
    });
});*/

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});



//http.createServer(app).listen(process.env.PORT || 8080);
