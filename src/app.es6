import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import path from 'path';

let app = express();
let server = require('http').createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

routes(app);

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../audio')));


server.listen('8888', '0.0.0.0', function () {
  console.log('Express server listening on %d', '8888');
});


exports = module.exports = app;





