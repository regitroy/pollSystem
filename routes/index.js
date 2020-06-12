module.exports = (app) => {
    app.use('/', require('./auth'));
    require('./polls')(app);
}