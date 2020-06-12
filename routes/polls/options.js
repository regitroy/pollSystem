const express = require("express");
const router = express.Router();
const core = require("../../core");
const model = require("../../models");

router.post('/', core.async(async (req, res) => {
    let need = {
        pollId: 'string',
        options: 'string'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    let options = req.body.options.split(",");

    await model.poll.addOptions({
        options, 
        pollId: req.body.pollId, 
        userId: req.user._id
    });
    core.rg.suc(res);
}));

router.post('/delete', core.async(async (req, res) => {
    let need = {
        optionId: 'string'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    await model.poll.removeOption(
        req.body.optionId, 
        req.user._id
    );
    core.rg.suc(res);
}));

router.get('/:pollId', core.async(async (req, res) => {
    let options = await model.poll.getOptions(
        req.params.pollId
    );
    core.rg.suc(res, options);
}));

module.exports = router;