function getCategories(callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = 'SELECT top 5 * FROM Categories';

    queryDB(query, (res, err) => {
            if (err) {
                console.log('Error in getCategories:', err);
                return
            } else {
                callback(res);
            }
        })
        // callback([
        //     { "Name": "one", "Description": "Description 1", "Qty": "7", "NeedStock": "1" },
        //     { "Name": "two", "Description": "Description 2", "Qty": "4", "NeedStock": "1" },
        //     { "Name": "three", "Description": "Description 3", "Qty": "8", "NeedStock": "1" },
        //     { "Name": "four", "Description": "Description 4", "Qty": "15", "NeedStock": "1" },
        //     { "Name": "five", "Description": "Description 5", "Qty": "8", "NeedStock": "1" }
        // ])
}

function getCategory(ID, callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = `SELECT * FROM Categories WHERE ID = ${ID}`;

    queryDB(query, (res, err) => {
        if (err) {
            console.log('Error in getCategories:', err);
            return
        } else {
            callback(res);
        }
    })
}

module.exports = {
    getCategories,
    getCategory
}