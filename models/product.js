const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
// const products= [];
module.exports = class Product {
    constructor(t) {
        this.title = t;// create an obj based on this class where we can pass the prop of the class to constructor when we call new Product()
    }

    save() {
        // products.push (this); // prefer to obj created based on class
        const p = path.join(rootDir, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => { //Asynchronously reads the entire contents of a file.
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent); // transform content in file products.json to obj in js
            }
            products.push(this);  // prefer to obj created based on class
            fs.writeFile(p, JSON.stringify(products), (err)=> {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) { //fetchAll take cb which will execute when fetchAll is done
        const p = path.join(rootDir, 'data', 'products.json');
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                cb([]);
            }
            cb (JSON.parse(fileContent));
        });
    }
}