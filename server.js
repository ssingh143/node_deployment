const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port=process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString(),
        log = `${now}: ${req.method}: ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About us',
        description: "this is about us page"
    });
})


app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.listen(port, () => {
    console.log(`Server is on up on ${port}`);
});