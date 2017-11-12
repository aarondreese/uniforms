const fs = require('fs')



var addNote = (title, body) => {
    try {
        var noteListString = fs.readFileSync('./scratch/scratch.json');
        var noteList = JSON.parse(noteListString);
    } catch (err) {
        // console.log('count not open file: error: ', err);
    }
    let newnote = { title: title, body: body };
    noteList.push(newnote);
    try {
        fs.writeFileSync('./scratch/scratch.json', JSON.stringify(noteList));
    } catch (err) {
        console.log('count not save file: error: ', err);
    }

};

var deleteNote = (title) => {
    console.log("deleteing note: ", title)
};

var getAll = () => {
    console.log('getting all notes')
};

var getOne = (title) => {
    console.log('getting one note: ', title)
}
module.exports = {
    addNote,
    deleteNote,
    getAll,
    getOne
}