const path = require('path');
const express = require('express');
const router = express.Router();
// const adminData = require('./admin');
// const rootDir = require('../util/path');
const productsController = require('../controllers/products');

router.get('/', productsController.getProducts);

module.exports = router;