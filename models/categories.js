//import { Promise } from './C:/Users/aaron_000/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/mssql';
//import { resolve } from 'url';



function getCategories(callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = 'SELECT * FROM Categories';

    queryDB(query, (res, err) => {
        if (err) {
            console.log('Error in getCategories:', err);
            return
        } else {
            callback(res);
        }
    })
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

function getCategoryByName(categoryName, callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = `SELECT * FROM Categories WHERE Name ='${categoryName}'`;

    queryDB(query, (res, err) => {
        if (err) {
            console.log('Error in getCategoryByName:', err);
            return
        } else {
            callback(res);
        }
    })
}

function insertCategory(category, callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = `INSERT INTO Categories (Name,isActive,Description,Qty,NeedStock) 
                VALUES (
                        '${category.category}' 
                        ,'true'
                        ,'${category.description}'
                        ,${category.qty}
                        ,${category.needStock}
                        ) `;

    queryDB(query, (res, err) => {
        if (err) {
            console.log('Error in insertCategory:', err);
            return
        } else {
            callback(res);
        }
    })
}

function updateCategory(category, callback) {
    category.needStock = category.needStock ? 1 : 0;
    var queryDB = require('../services/dbConnect').queryDB;
    var query = `
                UPDATE Categories  
                SET 
                    Name = '${category.category}' 
                    ,Description =  '${category.description}'
                    , Qty = ${category.qty}
                    , NeedStock = ${category.needStock}
                WHERE
                        ID = ${category.id}
                `;
    console.log(query);
    console.log('checking for duplicate name: ', category.category)
    var currentRecord = getCategoryByName(category.category, (res, err, next) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            if (res.length > 1 || res.ID != category.ID) {
                /*we got more than one record or the IDs don't match*/
                console.log('duplicate names: res length = ', res.length)
                return ('That name already exists')
            } else {
                /*we are safe to post the update */
                queryDB(query, (res, err) => {
                    if (err) {
                        console.log('Error in insertCategory:', err);
                        return
                    } else {
                        return (res);
                    }
                })
            }
        }

    })
}



function addCategory(category, callback) {
    // console.log('in Add Category');
    // console.log('before: ', category);
    category.needStock = category.needStock ? 1 : 0;
    // console.log('after: ', category);
    /* check to see if category already exists?*/
    getCategoryByName(category.category, (res, err, next) => {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            console.log('We got the following back from the DB', res);
            if (res.length == 0) {
                /*The current Name does not exist so we can post to the database*/
                insertCategory(category, (res, err, next) => {
                    if (err) {
                        console.log('insert error:', err)
                        return (err);
                    } else {
                        return (res);
                    }
                })
            }
            return (res);
        }
    })
}

function x() {
    return new Promise(function(resolve, reject) {
        var q = require('../services/dbConnect').q;
        q('SELECT * FROM Categories')
            .then(data => {
                console.log('got data in X:', data);
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    getCategories,
    getCategory,
    addCategory,
    updateCategory,
    x
}