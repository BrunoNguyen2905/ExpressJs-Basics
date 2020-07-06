const Product = require('../models/product');
// const products = [];

exports.getProducts = (req, res, next) => { 
    // const products = adminData.products; no longer need cause already initialized
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        }); //use default template engine    
    });
};   

exports.getIndex = (req,res,next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/'
        }); //use default template engine    
    });
};

exports.getCart = (req,res,next) => {
    res.render('shop/cart', {
        pageTitle: 'Your Cart', 
        path: '/cart'
    }); //use default template engine    
};

exports.getOrders = (req,res,next) => {
    res.render('shop/orders', {
        pageTitle: 'Your Orders', 
        path: '/orders'
    }); //use default template engine    
};

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout', 
        path: '/checkout'
    }); //use default template engine    
};
   

