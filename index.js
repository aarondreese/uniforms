console.log("in index.js");

const yargs = require('yargs');

const notes = require('./notes');
// var express = require('express');
// var app = express();
// // var template = require('./index.html');
// var template = `<html><body><h1>hello world</h1></body></html>`
// var port = 3000;
// app.get('/', (req, res) => res.send(template));


// app.listen(port, () => console.log(`Listening on port ${port}`));
const args = yargs.argv;
var command = process.argv[2];

if (command === 'add') {
    notes.addNote(args.title, args.body)
} else if (command === 'list') {
    console.log('Listing all notes')
}
// console.log(process.argv);