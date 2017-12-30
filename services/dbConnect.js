const mssql = require('mssql');

// var sqlconfig = {
//     user: 'sysadmin', // update me
//     password: 'Obiron70', // update me
//     server: 'e4c.database.windows.net', // update me
//     database: 'E4C-GMSB-DEV', //update me
//     options: {
//         database: 'E4C-GMSB-DEV', //update me
//         encrypt: true
//     }
// }


var sqlconfig = {
    user: 'uniform', // update me
    password: 'password', // update me
    server: 'aarons_hp_g6', // update me
    database: 'Uniform', //update me
    options: {
        database: 'Uniform', //update me
        encrypt: false
    }
}

function queryDB(query, callback) {
    var conn = new mssql.ConnectionPool(sqlconfig);
    var req = new mssql.Request(conn);
    conn.connect((err) => {
        if (err) {
            console.log('Connection Error:', err);
            return;
        }
        req.query(query, (err, rs) => {
            if (err) {
                console.log('Select error: ', err);
            } else {
                callback(rs.recordsets[0]);
            }
            conn.close();
        });
    });
};



function q(query) {
    return new Promise(function(resolve, reject) {
        var conn = new mssql.ConnectionPool(sqlconfig);
        var req = new mssql.Request(conn);
        conn.connect((err) => {
            if (err) {
                console.log('Connection Error:', err);
                reject(err);
            }
            req.query(query, (err, rs) => {
                if (err) {
                    console.log('Select error: ', err);
                    reject(err)
                } else {
                    resolve(rs.recordsets[0]);
                }
                conn.close();
            });
        });

    })
}
module.exports = {
    queryDB,
    q
}