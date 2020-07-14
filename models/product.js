const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        }
        cb (JSON.parse(fileContent));
    });
}
// const products= [];
module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id =id;
        this.title = title;// create an obj based on this class where we can pass the prop of the class to constructor when we call new Product()
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price ;
    }

    save() {
        // products.push (this); // prefer to obj created based on class
        // const p = path.join(rootDir, 'data', 'products.json');
        getProductsFromFile( (products) => {
            if(this.id){ //if id availale, edit and replace existing product
                const exsitingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[exsitingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err)=> {
                    console.log(err);
                });

            }else {
                this.id = Math.random().toString(); //if if id not availale, add new product
                products.push(this);  // prefer to obj created based on class
                fs.writeFile(p, JSON.stringify(products), (err)=> {
                    console.log(err);
                });
            }
           
        });
    }

    static deleteById(id) {
        getProductsFromFile(products =>{
            const product = products.find(prod => prod.id === id); // find product id to get info abt product.price
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deleteProduct(id, product.price);
                }
            })
        });
    }
    static fetchAll(cb) { //fetchAll take cb which will execute when fetchAll is done
      getProductsFromFile(cb); 
    }

    static findById(id, cb){
        getProductsFromFile(products =>{
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}