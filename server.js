const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

// Partials helps us to create reusable code like in
// headers and footers
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// this below statement is to access files to public
app.use(express.static(__dirname + '/public'));// This is Middleware

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// Helpers helps us to run some javascript code in handlebar templates
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to my website'
   }); 
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle Express'
    });
});

app.listen(3000, () => {
    console.log('Server is up on running on port 3000');
});