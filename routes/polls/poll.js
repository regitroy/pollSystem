const express = require("express");
const router = express.Router();
const core = require("../../core");
const model = require("../../models");

router.post('/', core.async(async (req, res) => {
    let need = {
        question: 'string'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    let options = req.body.options || "";
    options = options.split(",");

    await model.poll.createPollWithOptions({
        question: req.body.question,
        userId: req.user._id,
        options
    });

    core.rg.suc(res);
}));

router.post('/delete', core.async(async (req, res) => {
    let need = {
        pollId: 'string'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    await model.poll.deletePoll({pollId: req.body.pollId, userId: req.user._id});
    core.rg.suc(res);
}));

router.get('/:page', core.async(async (req, res) => {
    let polls = await model.poll.getPolls(req.params.page);

    core.rg.suc(res, polls);
}))

module.exports = router;