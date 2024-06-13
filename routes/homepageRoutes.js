const express = require('express');
const wrapAsync = require('../utils/wrapAsync');
const router = express();

router.get('/', wrapAsync(async (req, res, next) => {
    res.render('index');
}));

router.get('/services', wrapAsync(async (req, res, next) => {
    res.render('services');
}));

module.exports = router;