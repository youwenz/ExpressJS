exports.get404 = (req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    // //set a status code
    res.status(404).render('404', { pageTitle: 'Page not found', path:'/404'});
}