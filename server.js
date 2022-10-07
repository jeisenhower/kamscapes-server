var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');

var app = express();

// Redirect any http requests to https so we can avoid
// insecure traffic
app.use(function(req, res, next) {
    // If user has typed in the heroku default hosting address
    // (appname.herokuapp.com), redirect to the hosted site
    if (req.headers.host === 'kamscapes.herokuapp.com') {
        return res.redirect(301, 'https://www.kamscapes.com');
    }

    if (req.headers['X-forwarded-proto'] !== 'https') {
        // TODO: Check if the user has typed in just kamscapes.com to 
        // the browser. If that is the case, redirect to the actual
        // address (which is www.kamscapes.com)
        
        // Handle the http and force/redirect it to https
        return res.redirect('https://' + req.headers.host + req.url);
    } else {
        // If https is already being used, we do nothing and call next
        return next();
    }
});

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
        status: 201,
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
