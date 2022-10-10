import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';
import path from 'path';
import ejsMate from 'ejs-mate';
import ejs from 'ejs';
import timeFix from './middleware.js';
import router from './routes/routes.js';
import expressSession from 'express-session';
import expressVisitorCounter from 'express-visitor-counter';

const app = express();
app.set('port', 3000);
const PORT = process.env.PORT || app.get('port');
const counters = {};
const __dirname = path.resolve();
var privateKey  = fs.readFileSync('certs/localhost.key', 'utf8');
var certificate = fs.readFileSync('certs/localhost.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// app.use(timeFix);
app.use(expressSession({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(expressVisitorCounter({ hook: counterId => counters[counterId] = (counters[counterId] || 0) + 1 }));
app.enable('trust proxy');
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.use(expressSession({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(expressVisitorCounter({ hook: counterId => counters[counterId] = (counters[counterId] || 0) + 1 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "public", "resources", "images"))); //middleware
app.use(router);


var httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});
export default counters;