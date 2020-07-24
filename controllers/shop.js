const Product = require('../models/product');
const Cart = require('../models/cart');
// const products = [];

exports.getProducts = (req, res, next) => { 
    // const products = adminData.products; no longer need cause already initialized
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render('shop/product-list', {
                prods: rows, 
                pageTitle: 'All Products', 
                path: '/products'
            }) //use default template engine   
        })
        .catch(err => console.log(err));
   
}; 

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId; //cause we use productId in shop route in url => param
    Product.findById(prodId)
        .then(([product, fieldData]) => {
            console.log(product[0]);  //need to add [0] after product//product is an array w 1 element, view expect 1 single obj, not an array w 1 obj
            res.render('shop/product-detail', {
                product: product[0],
                pageTitle: product[0].title,
                path:'/products' 
            });
        })
        .catch(err => console.log(err));
    
    
}

exports.getIndex = (req,res,next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => { //destructing obj
            res.render('shop/index', {
                prods: rows, 
                pageTitle: 'Shop', 
                path: '/'
            }); //use default template engine  
        })
        .catch(err => console.log(err));
      
};

exports.getCart = (req,res,next) => { 
    Cart.getCart (cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) { //cause product has title, imageUrl, description, price; while cart has id, productPrice
                const cartProductData= cart.products.find(
                    prod => prod.id === product.id
                );
                if(cartProductData){ //id in cart equals id in product
                    cartProducts.push({productData: product, qty:cartProductData.qty});
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart', 
                path: '/cart',
                products: cartProducts
            }); //use default template engine   
        })
    })
     
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; //body cause name is productId in form
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart'); // redirect to get your cart page
};

exports.postCartDeleteProduct = (req, res, next) => {
    prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

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
   

