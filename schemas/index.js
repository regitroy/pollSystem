const model = require("../core/db/model");

module.exports = {
    User: model.init('users'),
    Poll: model.init('polls'),
    PollOption: model.init('pollOptions'),
    Vote: model.init('votes')
}