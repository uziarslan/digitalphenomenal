if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const ExpressError = require('./utils/ExpressError');
const homepageRoutes = require('./routes/homepageRoutes');

const PORT = process.env.PORT || 3000;

// Setting up the app
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set(path.join(__dirname, 'views'));

// Using the app
app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(homepageRoutes);

// handling the error message
app.all("*", (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(status).render('error', { err });
});

// Listen for the port Number
app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});