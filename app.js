// const http = require('http'); //global module
const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./routes/admin');
const shopRoutes = require ('./routes/shop');
const path = require('path');
const errorController = require('./controllers/error');
const app = express();
app.set('view engine', 'ejs');
// app.set('view engine', 'pug'); //set default templating engines
app.set('views', 'views'); 

app.use(bodyParser.urlencoded({extended: true})); //do whole requests body parsing we did manually
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res, next) => {
//     console.log('This always runs!');
//     next();
// });

app.use('/admin',adminRoute);
app.use (shopRoutes);

app.use(errorController.get404);



// const server = http.createServer(app);



app.listen(3000);