var express = require('express');
var hbs = require('hbs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getYear', () => new Date().getFullYear());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//app.use((q, r, n) => r.render('maintenance.hbs'))

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: `This is the welcome message`
    });
})
app.get('/bad', (req, res) => {
    res.send({
        error: 'bad request'
    })
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page by param',
        currentYear: new Date().getFullYear()
    });
})
app.listen(port);