const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');
module.exports = class Cart {
    // constructor() {
    //     this.products = [];
    //     this.totalPrice = 0;
    // }

    static addProduct(id, productPrice) {
    //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }
        //analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add new product/ increase quantity
            if(existingProduct) {
                updatedProduct = { ...existingProduct};
                updatedProduct.qty =updatedProduct.qty + 1;
                cart.products = [...cart.products]; //copy old array
                cart.products[existingProductIndex] = updatedProduct; //cause find existing product, increase quantity

            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];//copy old array and add new product
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    } 
    static deleteProduct (id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
           if(err){
               return;
           }
           const updatedCart = {...JSON.parse(fileContent)};
           const product = updatedCart.products.find(prod => prod.id === id);  //find product id to get info abt product.qty
            if(!product){ // if product dont exist,means cart dont have that product, just return and dont continue remaining code
                return;
            }
           const productQty = product.qty;
           updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
           updatedCart.totalPrice = updatedCart.totalPrice - productPrice*productQty;
           fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
               console.log(err);
           })
        });
    }
    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }
            else {
                cb(cart);
            }
        })
    }

}