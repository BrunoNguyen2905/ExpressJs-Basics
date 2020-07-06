const Product = require('../models/product');
// const products = [];


exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product', 
        path: '/admin/add-product'
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    // products.push({title: req.body.title});
    product.save();
    
    res.redirect('/');
}

exports.getProducts = (req, res, next) => { 
    // const products = adminData.products; no longer need cause already initialized
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'}); //use default template engine    
    });
};       
   

