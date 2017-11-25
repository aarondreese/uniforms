const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// const mssql = require('mssql');

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

// function queryDB(query, callback) {
//     var conn = new mssql.ConnectionPool(sqlconfig);
//     var req = new mssql.Request(conn);
//     conn.connect((err) => {
//         if (err) {
//             console.log('Connection Error:', err);
//             return;
//         }
//         req.query(query, (err, rs) => {
//             if (err) {
//                 console.log('Select error: ', err);
//             } else {
//                 callback(rs.recordsets[0]);
//             }
//             conn.close();
//         });
//     })
// }

// var queryDB = require('./dbConnect').queryDB;

// var query = 'SELECT top 10 * FROM Categories';

// function getCategories(callback) {
//     //setTimeout(function() {
//     queryDB(query, (res, err) => {
//             if (err) {
//                 console.log('Error in getCategories:', err);
//                 return
//             } else {
//                 callback(res);
//             }
//         })
//         //}, 3000)
// }


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => new Date().getFullYear());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: `This is the welcome message`
    });
});

app.get('/categories/:ID', (req, res) => {
    var vm = require('./models/categories');
    let ID = req.params.ID;
    vm.getCategory(ID, (data) => {
        res.render('categories.hbs', {
            pageTitle: 'Catgories',
            currentYEar: new Date().getFullYear(),
            categories: data //Promise.resolve(getCategories()) //categories
        })
    })
});

app.get('/categories', (req, res) => {
    var cat = require('./models/categories');
    var con = require('./models/contacts');
    cat.getCategories((categories) => {
        con.getContacts((contacts) => {
                res.render('categories.hbs', {
                    pageTitle: 'Catgories',
                    currentYEar: new Date().getFullYear(),
                    categories,
                    contacts
                })

            }

        )

    })
});


app.post('/categories', (req, res) => {
    console.log('in post categories');
    console.log('The body contains', req.body);
});



app.get('/contacts', (req, res) => {
    var vm = require('./models/contacts');
    vm.getContacts((contacts) => {
            res.render('contacts.hbs', {
                pageTitle: 'Catgories',
                currentYEar: new Date().getFullYear(),
                contacts
            })
        }

    )
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page by param',
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000);


//getCategories()