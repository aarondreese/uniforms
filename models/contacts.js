function login(email) {
    return new Promise(function(resolve, reject) {
        var query = require('../services/dbConnect').q;
        query(`SELECT * FROM Contacts WHERE EmailAddress = '${email}'`)
            .then(data => {
                console.log('got data in X:', data);
                if (data.length == 0) {
                    /* the email does not exist*/
                    data.isRegistered = false;
                    data.email = email;
                } else {
                    data.isRegistered = true;
                }
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}


function register(newContact) {
    // TODO: validate new contact data
    return new Promise(function(resolve, reject) {
        var query = require('../services/dbConnect').q;
        var SQL = `INSERT INTO Contacts (EmailAddress,MobileNumber,FirstName,LastName,isActive) VALUES (
            '${newContact.EmailAddress}',
            '${newContact.MobileNumber}',
            '${newContact.FirstName}',
            '${newContact.LastName}',
           1)`;
        console.log(SQL);
        query(SQL)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

function getContacts(callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = 'SELECT * FROM Contacts';

    queryDB(query, (res, err) => {
            if (err) {
                console.log('Error in getContacts:', err);
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

function getContact(ID, callback) {
    var queryDB = require('../services/dbConnect').queryDB;
    var query = `SELECT * FROM Contacts WHERE ID = ${ID}`;

    queryDB(query, (res, err) => {
        if (err) {
            console.log('Error in getContacts:', err);
            return
        } else {
            callback(res);
        }
    })
}

module.exports = {
    getContacts,
    getContact,
    login,
    register
}