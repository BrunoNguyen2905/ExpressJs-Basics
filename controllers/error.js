exports.get404 = (req, res, next) =>{
    // res.status(404).sendFile(path.join(__dirname, 'views', '404page.html'));
    res.status(404).render('404page', {pageTitle: '404', path: ''});
}