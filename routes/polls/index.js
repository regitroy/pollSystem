const middleware = require('../../middleware');

module.exports = (app) => {
    app.use("/poll", middleware.userSessionCheck, require('./poll'));
    app.use("/poll/option", middleware.userSessionCheck, require('./options'));
    app.use("/poll/vote", middleware.userSessionCheck, require('./votes'));
}