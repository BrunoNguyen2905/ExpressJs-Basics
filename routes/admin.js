const express = require('express');
const path = require('path');
const router = express.Router();

// const rootDir = require('../util/path');
const productsController = require ('../controllers/products');

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct);

// /admin/add-product => POST
router.post('/product', productsController.postAddProduct );


module.exports = router;

//  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
//     res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//     res.render('add-product', {
//         pageTitle: 'Add Product', 
//         path: '/admin/add-product'