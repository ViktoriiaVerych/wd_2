// In main index file create a server with some whitelisted origins;


// And add a few GET endpoints.

// For example 

// app.get(/html1, handler)

// app.get(/html2, handler)

// app.get(/file/:filename, handler)

// app.get(/objects/:type/:id, handler)

// app.get(/objects/:type, handler)

// app.get(/objects, handler)

// app.get(/info) - send json documentation about all your apis

//They should send you DIFFERENT pages

// const express = require('express');
// const app = express();


// const handler1 = (req, res) => res.send('HTML1 page');
// const handler2 = (req, res) => res.send('HTML2 page');
// const fileHandler = (req, res) => res.send(`File: ${req.params.filename}`);
// const objectTypeHandler = (req, res) => res.send(`Object Type: ${req.params.type}`);
// const objectIdHandler = (req, res) => res.send(`Object ID: ${req.params.id}`);
// const objectsHandler = (req, res) => res.send('Objects page');
// const infoHandler = (req, res) => res.json({info: 'API documentation'});

// app.get('/p1', handler1);
// app.get('/p2', handler2);
// app.get('/file/:filename', fileHandler);
// app.get('/objects/:type/:id', objectIdHandler);
// app.get('/objects/:type', objectTypeHandler);
// app.get('/objects', objectsHandler);
// app.get('/info', infoHandler);

// app.listen(3000, () => console.log('Server is running on port 3000'));




// const cors = require('cors');
// const express = require('express');
// const helmet = require('helmet');
// const compression = require('compression');
// const app = express();
// const handlers = require('./handlers/handlersGeneral');

// const whitelist = process.env.CORS_WHITELIST.split(',');

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

// app.use(cors(corsOptions));
// app.use(helmet());
// app.use(compression());

// app.get('/p1', handlers.html1Handler);
// app.get('/p2', handlers.html2Handler);
// app.get('/file/:filename', handlers.fileHandler);
// app.get('/objects/:type/:id', handlers.objectHandler);
// app.get('/objects/:type', handlers.objectsTypeHandler);
// app.get('/objects', handlers.objectsHandler);
// app.get('/info', handlers.infoHandler);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log('Server is running on port ' + port));


const cors = require('cors');
const fs = require('fs');
const os = require('os');
const express = require('express');  
const app = express();  
const bodyParser = require('body-parser')  
const path = require('path');
const handlers = require('./handlers/handlersGeneral'); 

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: originFunction,
};

function originFunction (origin, callback) {
    if (whitelist.includes(origin) || !origin) {
        callback(null, true);
    } else {
        callback(new Error('Not allowed by CORS'));
    }
}

app.use(cors(corsOptions)); 

app.get('/p1', handlers.p1Handler);
app.get('/p2', handlers.p2Handler);
app.get('/file/:filename', handlers.fileHandler);
app.get('/objects/:type/:id', handlers.objectHandler);
app.get('/objects/:type', handlers.objectsTypeHandler);
app.get('/objects', handlers.objectHandler);
app.get('/info', handlers.infoHandler);

app.listen(3000, () => console.log('Server is running on port 3000'));