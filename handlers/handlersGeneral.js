
//the function to handler for audio
// const fs = require('fs');

// function sendAudio(req, res, filepath) {
//     fs.readFile(filepath, function(err, data){
//         if (err) {
//             console.log(err);
//             res.writeHead(404, {'Content-Type': 'text/plain'});

//             return res.end('404 Not Found');
//         }
//         res.writeHead(200, {'Content-Type': 'audio/mp3'});
//         res.end('200 OK', data);

//     })
// }

// module.exports = sendAudio;



const fs = require('fs');
const path = require('path');

//for pages
exports.p1Handler = (req, res) => {
    const filePath = path.join(__dirname, '..', 'Data', 'pages', 'p1.html');
    res.sendFile(filePath);
};

exports.p2Handler = (req, res) => {
    const filePath = path.join(__dirname, '..', 'Data', 'pages', 'p1.html');
    res.sendFile(filePath);
};

//for files
exports.fileHandler = (req, res) => {
    const file = req.params.filename;
    const filePath = path.join(__dirname, '..', 'data', file);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
        } else {
            res.sendFile(filePath);
        }
    });
};

//for info
exports.infoHandler = (req, res) => {
    const infoPath = path.join(__dirname, '..', 'info.json');
    if (fs.existsSync(infoPath)) {
        res.sendFile(infoPath);
    } else {
        res.status(404).send('Info not found');
    }
};

//for objects
exports.objectHandler = (req, res) => {
    const dirPath = path.join(__dirname, '..', 'data', 'objects');
    fs.readdir(dirPath, (err, directs) => {
        if (err) {
            console.error(err);
            res.status(505).send(err.message);
        } else {
            const allObjects = directs.filter(dir => fs.statSync(path.join(dirPath, dir)).isDirectory());
            res.json(allObjects);
        }
    });
};

//for types
exports.objectsTypeHandler = (req, res) => {
    const dirPath = path.join(__dirname, '..', 'data', 'objects', 'types');

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send(err.message);
        } else {
            const fileObjects = files.map(file => ({ name: file }));
            res.json(fileObjects);
        }
    });
};
