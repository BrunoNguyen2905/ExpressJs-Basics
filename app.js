// const http = require('http'); //global module
const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require ('./routes/shop');
const path = require('path');

const app = express();

// app.use('/', (req, res, next) => {
//     console.log('This always runs!');
//     next();
// });

app.use(bodyParser.urlencoded({extended: true})); //do whole requests body parsing we did manually
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin',adminRoutes);
app.use (shopRoutes);

app.use((req, res, next) =>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404page.html'));
})



// const server = http.createServer(app);



app.listen(3000);