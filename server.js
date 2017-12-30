//import { Promise } from './C:/Users/aaron_000/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/mssql';

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

app.get('/categories/add', (req, res) => {
    //res.send('in categories-add now');
    res.render('categories-add.hbs');
});

app.post('/categories/add', (req, res) => {
    //console.log(req.body);
    var vm = require('./models/categories');
    vm.addCategory(req.body,
        // res.send("category added"));
        res.redirect('/categories'));
})

app.get('/categories/show/:ID', (req, res) => {
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

app.get('/categories/edit/:ID', (req, res) => {
    var vm = require('./models/categories');
    let ID = req.params.ID;
    vm.getCategory(ID, (category) => {
        // console.log("before");
        console.log(category[0]);
        // console.log("after");
        res.render('categories-edit.hbs', {
            pageTitle: 'Edit Category: ' + category[0].Description,
            currentYear: new Date().getFullYear(),
            category: category[0] //Promise.resolve(getCategories()) //categories
        })
    })
})

app.post('/categories/update', (req, res) => {
    console.log(req.body);
    var vm = require('./models/categories');
    vm.updateCategory(req.body,
        // res.send("category added"));
        res.redirect('/categories'));
})



app.get('/categories', (req, res) => {
    var cat = require('./models/categories');
    // var con = require('./models/contacts');
    cat.getCategories((categories) => {
        //  con.getContacts((contacts) => {
        res.render('categories.hbs', {
                pageTitle: 'Catgories',
                currentYEar: new Date().getFullYear(),
                categories //,
                //        contacts
            })
            // })
    })
});

app.post('/login', (req, res) => {
    var login = require('./models/contacts').login;
    var email = req.body.email;
    login(email)
        .then(result => {
            /* 
            two possible outcomes: 
            1) user is already registered, in which case redirect to logged in status
            2) user is not registered, in which case redirect to registrations
            */
            console.log('result: ', result);

            if (result.isRegistered == true) {

                // res.render('/manage.hbs',{
                //     vm
                // })
                res.send('existing user');
            } else {
                res.render('./register.hbs', {
                        result
                    })
                    // res.send('new user');
            }
        })
        .catch(err => {
            console.log('there was an error: ', err)

        })
})

app.post('/register', (req, res) => {
    var data = req.body;
    var contacts = require('./models/contacts');
    var newContact = {
        EmailAddress: data.EmailAddress,
        MobileNumber: data.MobileNumber,
        FirstName: data.FirstName,
        LastName: data.LastName,
        isActive: true
    };

    contacts.register(newContact)
        .then(result => {
            res.send('Contact Created')
        })
        .catch(err => {
            console.log('Error creating contact: ', err);
            res.send('Problem creating contact:')
        })
})




app.get('/test', (req, res) => {
    var x = require('./models/categories').x();
    //x().then(data => res.json(data))
    x.then(categories => {
        res.render('categories.hbs', {
            pageTitle: 'new Categories',
            categories //,
            //contacts: []
        })


    })
})



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

app.get('/admin', (req, res) => {
    res.render('admin.hbs', {});
});


app.listen(3000);