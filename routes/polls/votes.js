const express = require("express");
const router = express.Router();
const core = require("../../core");
const model = require("../../models");

router.post('/', core.async(async (req, res) => {
    let need = {
        pollId: 'string',
        optionId: 'string'
    }

    if(!core.validator.validate(need, req, res)){
        return;
    }

    await model.poll.vote({
        userId: req.user._id,
        pollId: req.body.pollId,
        optionId: req.body.optionId
    });

    core.rg.suc(res);
}))

module.exports = router;