
/**
 * Module dependencies.
 */

var express         = require('express'),
    bodyParser      = require('body-parser'),
    errorhandler    = require('errorhandler'),
    methodOverride  = require('method-override'),
    morgan          = require('morgan'), // request level logging
    multer          = require('multer'),
    path            = require('path'),
    config          = require('./lib/config.js').config;


var logger = require('./lib/logger');
var routes = require('./routes');
var user = require('./routes/user');

var app = express();

app.set('config', config);
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser());

// File upload middleware
app.use(multer(config.multer_options));
app.set('view engine', 'jade');

app.use(morgan({format:'dev'}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(methodOverride());


app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
  // app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/bootstrap', function(request, response){
    response.render('bootstrap.jade');
});


// Handle upload of files using multer. Return the list of filenames and paths
// to pre-fill out the next form
app.post("/upload", function (request, response) {                                               
    var filenames = []; 
    // logger.info("request", request);

    if (request && request.files && request.files['file[]']) {
        var files = request.files['file[]'];
        if (!files.length) {
            files = [files];
        }
        files.forEach(function (file_obj) {
            filenames.push(file_obj.name);
            logger.info("file name", file_obj.name);                                           
            logger.info("file path", file_obj.path);                                                       
        });
    } else {
        // Set flash message
        logger.info("no files");
        response.redirect('/');
    }

    // show the uploaded file name
    response.send(filenames);
    // response.render('results', { title: 'Express' });
});  

app.get("/postupload", function (request, response) { 
    var page_options ={};
    page_options.title = 'Express';

    var filenames = request.query.files || '';
    logger.info('filenames', filenames);                                              
    var filenames_arr = filenames.split(',');
    logger.info('filenames_arr', filenames_arr);                                              
    page_options.filenames = filenames_arr;


    response.render('postupload.jade', page_options);
}); 


var server = app.listen(app.get('port'), function(){
  logger.info('Express server listening on port ' + app.get('port'));
});
