import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import timeFix from './middleware.js';
import router from './routes/routes.js';
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
var privateKey  = fs.readFileSync('/Users/schoolgunslinger/certs/localhost.key', 'utf8');
var certificate = fs.readFileSync('/Users/schoolgunslinger/certs/localhost.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

// app.use(timeFix);
// app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "public", "resources", "images"))); //middleware
app.use(router);

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => {
    console.log(`Server running at https://localhost:${PORT}`);
});
