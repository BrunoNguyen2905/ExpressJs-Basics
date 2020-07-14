const express = require('express');
const path = require('path');
const router = express.Router();

// const rootDir = require('../util/path');
const adminController = require ('../controllers/admin');

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct );

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;

//  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
//     res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
//     res.render('add-product', {
//         pageTitle: 'Add Product', 
//         path: '/admin/add-product'